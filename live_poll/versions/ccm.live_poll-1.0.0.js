/**
 * @overview ccm component for live poll
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 * @version 1.0.0
 * @changes
 * version 1.0.0 (06.02.2019)
 */

( function () {

  const component = {

    name: 'live_poll',

    version: [ 1, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',

    config: {

      "html": {
        "main": {
          "id": "main",
          "inner": [
            {
              "id": "question",
              "inner": {
                "id": "text",
                "contenteditable": true,
                "oninput": "%oninput%",
                "inner": "%question%"
              }
            },
            { "id": "answers" },
            { "id": "results" },
            {
              "id": "button",
              "inner": {
                "tag": "button",
                "class": "button",
                "onclick": "%onclick%",
                "inner": "%button%"
              }
            },
            { "id": "members" }
          ]
        },
        "answer": {
          "id": "answer-%nr%",
          "class": "answer",
          "onclick": "%onclick%",
          "inner": [
            {
              "class": "text",
              "contenteditable": true,
              "oninput": "%oninput%",
              "onblur": "%onblur%",
              "inner": "%text%"
            },
            {
              "class": "icon",
              "inner": "%icon%"
            }
          ]
        },
        "member": {
          "id": "member-%member%",
          "class": "member",
          "inner": "%member%"
        }
      },
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/live_poll/resources/default.css" ],
      "data": {
        "store": [ "ccm.store" ],
        "key": "test"
      },
      "placeholder": {
        "start": "START",
        "finish": "FINISH",
        "reset": "RESET"
      },
      "converter": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/json2json.mjs", "type": "module", "import": "poll_to_highchart" } ],
      "chart": [ "ccm.component", "https://ccmjs.github.io/akless-components/highchart/versions/ccm.highchart-3.0.0.js" ],
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]

  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ]

    },

    Instance: function () {

      let $, dataset;
      const self = this;

      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // listen to datastore changes => restart
        if ( $.isDatastore( this.data.store ) ) this.data.store.onchange = this.start;

      };

      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // login user, if not logged in
        await this.user.login();

        /**
         * username of logged in member
         * @type {string}
         */
        const user = this.user.data().user;

        // get existing app state data
        dataset = await $.dataset( this.data );

        // correct reset of properties
        if ( dataset.active  === '' ) delete dataset.active;
        if ( dataset.members === '' ) delete dataset.members;

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, {
          question: dataset.question,                                                                                // question text
          button: this.placeholder[ dataset.active ? 'finish' : ( dataset.active === false ? 'reset' : 'start' ) ],  // caption of start/finish/reset button
          onclick: () => ( dataset.active ? finish : ( dataset.active === false ? reset : start ) )(),               // click event of start/finish/reset button
          oninput: async function ( event ) {                                                                        // input event for question text

            // update question text
            dataset.question = event.target.textContent;
            await save( true );

            // logging of 'input' event
            self.logger && self.logger.log( 'input', $.clone( dataset ) );

          }
        } ) );

        // prepare answers data
        if ( !dataset.answers ) dataset.answers = [];                                   // initial answers data
        dataset.answers = dataset.answers.filter( answer => answer && answer.trim() );  // remove empty answers
        dataset.active === undefined && dataset.answers.push( '' );                     // add one empty answer

        // render answers
        dataset.answers.forEach( ( answer, i ) =>
          this.element.querySelector( '#answers' ).appendChild( $.html( this.html.answer, {
            nr: ( i + 1 ).toString(),                                                        // answer number (1,2,...)
            icon: String.fromCharCode(65 + i ),                                              // letter of answer
            text: answer,                                                                    // answer text
            onclick: () => vote( i + 1 ),                                                    // click event of answer entry
            onblur: () => save(),                                                            // blur event for answer text
            oninput: async function ( event ) {                                              // input event for answer text

              // update answer text
              dataset.answers[ i ] = event.target.textContent;
              await save( true );

              // logging of 'input' event
              self.logger && self.logger.log( 'input', $.clone( dataset ) );

            }
          } ) )
        );

        // mark voted answer as selected
        dataset.members && dataset.members[ user ] && this.element.querySelectorAll( '.answer' )[ dataset.members[ user ] - 1 ].classList.add( 'selected' );

        // active poll? => mark as active in frontend and make question and answers not editable
        if ( dataset.active !== undefined ) {
          dataset.active && this.element.querySelector( '#main' ).classList.add( 'active' );
          this.element.querySelectorAll( '*[contenteditable]' ).forEach( div => div.removeAttribute( 'contenteditable' ) );
        }

        // has given chart component and poll is finished? => render result chart
        if ( this.chart && dataset.active === false ) {

          /**
           * votes data of members
           * @type {Object}
           */
          const votes = $.clone( dataset.members );

          // remove not voted members
          for ( const key in votes )
            if ( !votes[ key ] )
              delete votes[ key ];

          const config = this.converter( votes, $.clone( dataset.answers ) ); // convert votes to chart configuration
          config.root = this.element.querySelector( '#results' );             // set website area for chart
          this.chart.start( config );                                         // render chart

        }

        /**
         * indicates if main HTML template contains an optional members section
         * @type {boolean}
         */
        const has_member_section = !!this.element.querySelector( '#members' );

        // active poll with members section?
        if ( dataset.active && has_member_section ) {

          /**
           * number of answer that logged in member has been voted
           * @type {number}
           */
          const vote = dataset.members[ user ];

          // user not in member list? => add user and update app state data (implicit app restart)
          if ( vote === undefined ) { dataset.members[ user ] = 0; await save(); return; }

          // render member entries
          const members_div = this.element.querySelector( '#members' );
          for ( const member in dataset.members )
            if ( dataset.members.hasOwnProperty( member ) ) {
              members_div.appendChild( $.html( this.html.member, { member: member } ) );
              if ( dataset.members[ member ] ) members_div.lastChild.classList.add( 'done' );  // mark member as already voted
            }

        }

        /**
         * starts poll
         * @returns {Promise<void>}
         */
        async function start() {

          // set initial members data
          dataset.members = {};
          dataset.members[ user ] = 0;

          // set poll to active
          dataset.active = true;

          // logging of 'active' event
          self.logger && self.logger.log( 'active', $.clone( dataset ) );

          // update app state data (implicit app restart)
          await save();

        }

        /**
         * finishes poll
         * @returns {Promise<void>}
         */
        async function finish() {

          // set poll to finished
          dataset.active = false;

          // logging of 'finish' event
          self.logger && self.logger.log( 'finish', $.clone( dataset ) );

          await save();                                   // update app state data (implicit app restart)
          await $.onFinish( self, $.clone( dataset ) );   // perform finish actions

        }

        /**
         * reset poll
         * @returns {Promise<void>}
         */
        async function reset() {

          dataset.active = '';   // set poll to inactive (question and answers are editable)
          dataset.members = '';  // clear members data

          // logging of 'reset' event
          self.logger && self.logger.log( 'reset', $.clone( dataset ) );

          // update app state data (implicit app restart)
          await save();

        }

        /**
         * votes for an answer
         * @param {number} nr - answer number (1,2,...)
         * @returns {Promise<void>}
         */
        async function vote( nr ) {

          // poll is not active? => abort
          if ( !dataset.active ) return;

          // logging of 'vote' event
          self.logger && self.logger.log( 'vote', { answer: nr, before: dataset.members[ user ] } );

          dataset.members[ user ] = nr;  // remember voted answer
          await save();                  // update app state data (implicit app restart)

        }

        /**
         * updates app state data and restarts app
         * @param {boolean} [no_restart] - prevent implicit app restart
         * @returns {Promise<void>}
         */
        async function save( no_restart ) {

          // no datastore? => abort
          if ( !$.isDatastore( self.data.store ) ) return;

          await self.data.store.set( dataset );  // update app state data
          !no_restart && await self.start();     // restart app

        }

      };

      /**
       * returns current result data
       * @returns {Object} current result data
       */
      this.getValue = () => $.clone( dataset );

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
/**
 * @overview ccm component for live poll
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 * @version 2.0.0
 * @changes
 * version 2.0.0 (03.05.2019):
 * - added lock and unlock of editing mechanism
 * - added result mode
 * - uses ccm v20.1.0
 * version 1.0.0 (06.02.2019)
 */

( function () {

  const component = {

    name: 'live_poll', version: [ 2, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.1.0.js',

    config: {

      "html": {
        "main": {
          "id": "main",
          "inner": [
            {
              "id": "question",
              "inner": [
                {
                  "id": "text",
                  "contenteditable": "%editable%",
                  "oninput": "%oninput%",
                  "inner": "%question%"
                },
                {
                  "id": "lock",
                  "inner": "%lock%",
                  "onclick": "%onlock%"
                }
              ]
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
              "contenteditable": "%editable%",
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
      "admin": "guest",
      "placeholder": {
        "start": "START",
        "finish": "FINISH",
        "reset": "RESET",
        "locked": "🔒",
        "unlocked": "🔓"
      },
      "converter": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/json-to-json.js", "type": "module", "import": "poll_to_highchart" } ],
      "chart": [ "ccm.component", "https://ccmjs.github.io/akless-components/highchart/versions/ccm.highchart-3.0.0.js" ],
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]

  //  "show_results": true,
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ]

    },

    Instance: function () {

      let $, dataset, user;

      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // listen to datastore changes => restart
        if ( $.isDatastore( this.data.store ) ) this.data.store.onchange = this.start;

        // result mode? => change configuration for result mode
        if ( this.show_results ) { this.onfinish = null; this.user = null; }

      };

      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        /**
         * starts poll
         * @function
         * @returns {Promise<void>}
         */
        const start = async () => {

          // set initial members data
          dataset.members = {};
          dataset.members[ user ] = 0;

          // set poll to active
          dataset.active = true;

          // set question text as result value
          dataset.result = dataset.question;

          // logging of 'active' event
          this.logger && this.logger.log( 'active', $.clone( dataset ) );

          // update app state data (implicit app restart)
          await save();

        };

        /**
         * finishes poll
         * @function
         * @returns {Promise<void>}
         */
        const finish = async () => {

          // set poll to finished
          dataset.active = false;

          // logging of 'finish' event
          this.logger && this.logger.log( 'finish', $.clone( dataset ) );

          await save( true );                             // update app state data
          await $.onFinish( this, $.clone( dataset ) );   // perform finish actions

        };

        /**
         * reset poll
         * @function
         * @returns {Promise<void>}
         */
        const reset = async () => {

          dataset.active = '';   // set poll to inactive (question and answers are editable)
          dataset.members = '';  // clear members data

          // logging of 'reset' event
          this.logger && this.logger.log( 'reset', $.clone( dataset ) );

          // update app state data (implicit app restart)
          await save();

        };

        /**
         * votes for an answer
         * @function
         * @param {number} nr - answer number (1,2,...)
         * @returns {Promise<void>}
         */
        const vote = async nr => {

          // poll is not active? => abort
          if ( !dataset.active ) return;

          // logging of 'vote' event
          this.logger && this.logger.log( 'vote', { answer: nr, before: dataset.members[ user ] } );

          dataset.members[ user ] = nr;  // remember voted answer
          await save();                  // update app state data (implicit app restart)

        };

        /**
         * updates app state data and restarts app
         * @function
         * @param {boolean} [no_restart] - prevent implicit app restart
         * @returns {Promise<void>}
         */
        const save = async no_restart => {

          // no datastore? => abort
          if ( !this.data || !$.isDatastore( this.data.store ) ) return;

          await this.data.store.set( dataset );  // update app state data
          !no_restart && await this.start();     // restart app

        };

        /**
         * disabled/remove editable parts
         * @type {boolean}
         */
        let locked = false;

        // login user and remember username
        if ( this.user ) { await this.user.login(); user = this.user.data().user; }

        // get existing app state data
        dataset = await $.dataset( this.data );

        // result mode? => show only results
        if ( this.show_results ) {
          dataset.active = false;
          dataset.locked = true;
        }

        // correct reset of properties
        if ( dataset.active  === '' ) delete dataset.active;
        if ( dataset.members === '' ) delete dataset.members;

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // editing is locked? => disable/remove editable parts
        if ( dataset.locked && dataset.locked !== user ) locked = true;

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, {

          question: dataset.question,                                                                                // question text
          lock: dataset.locked ? this.placeholder.locked : this.placeholder.unlocked,                                // editing is locked or unlocked#
          button: this.placeholder[ dataset.active ? 'finish' : ( dataset.active === false ? 'reset' : 'start' ) ],  // caption of start/finish/reset button
          editable: !locked,                                                                                         // question is editable

          /** input event handler of editable question text */
          oninput: async event => {

            // update question text
            dataset.question = event.target.textContent;
            await save( true );

            // logging of 'input' event
            this.logger && this.logger.log( 'input', $.clone( dataset ) );

          },

          /** click event handler for lock icon */
          onlock: async () => {

            // not locked? => lock editing for other users
            if ( !dataset.locked )
              dataset.locked = user;
            // locked for other users? => unlock editing
            else if ( user === dataset.locked || user === this.admin )
              dataset.locked = '';
            // locked and cannot unlock? => abort without change of locked state
            else
              return;

            // save changed locked state
            await save();

          },

          /** click event handler for start/finish/reset button */
          onclick: () => ( dataset.active ? finish : ( dataset.active === false ? reset : start ) )()

        } ) );

        // editing is locked? => remove editable parts
        if ( locked ) {
          user !== this.admin && $.removeElement( this.element.querySelector( '#lock' ) );
          $.removeElement( this.element.querySelector( '#button' ) );
        }

        // prepare answers data
        if ( !dataset.answers ) dataset.answers = [];                                   // initial answers data
        dataset.answers = dataset.answers.filter( answer => answer && answer.trim() );  // remove empty answers
        dataset.active === undefined && !locked && dataset.answers.push( '' );          // add one empty answer

        // render answers
        dataset.answers.forEach( ( answer, i ) =>
          this.element.querySelector( '#answers' ).appendChild( $.html( this.html.answer, {

            nr: ( i + 1 ).toString(),             // answer number (1,2,...)
            icon: String.fromCharCode(65 + i ),   // letter of answer
            text: answer,                         // answer text
            editable: !locked,                    // answer is editable

            /** click event handler for answer entry */
            onclick: () => vote( i + 1 ),

            /** blur  event handler for answer text */
            onblur: () => save(),

            /** input event handler for answer text */
            oninput: async event => {

              // update answer text
              dataset.answers[ i ] = event.target.textContent;
              await save( true );

              // logging of 'input' event
              this.logger && this.logger.log( 'input', $.clone( dataset ) );

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

        // result mode? => remove answers
        this.show_results && $.removeElement( this.element.querySelector( '#answers' ) );

        // has given chart component and poll is finished? => render result chart
        if ( this.chart && dataset.members && dataset.active === false ) {

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
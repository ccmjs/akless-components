/**
 * @overview ccm component for live poll
 * @author André Kless <andre.kless@web.de> 2019-2020
 * @license The MIT License (MIT)
 * @version latest (2.4.0)
 * @changes
 * version 2.4.0 (29.03.2020):
 * - uses ccm v25.2.1
 * - uses ccm.highchart.js v3.0.2 as default
 * - uses helper.mjs v4.2.0 as default
 * - uses ccm.user.js v9.4.0 as default
 * - editing of question and answers is optional (default: true)
 * - optional password for finish of live poll (default: no password)
 * - bug fix for show diagram after finish
 * version 2.3.3 (18.02.2020):
 * - uses ccm v25.0.0
 * - changed default mark for locked state
 * version 2.3.2 (10.10.2019):
 * - uses ccm v24.0.1
 * version 2.3.1 (01.10.2019):
 * - bug fix for non-realtime live poll
 * - uses ccm v22.7.0
 * version 2.3.0 (18.07.2019):
 * - improved clarification of marked answer
 * - HTML template via HTML file
 * - uses ccm v22.1.1
 * version 2.2.0 (24.06.2019):
 * - support of live poll without realtime
 * - optional members section
 * - uses ccm v21.1.0
 * version 2.1.0 (07.05.2019):
 * - fast creating of answers via TAB (no loss of input field focus)
 * - HTML escape for question and answers
 * - ccm.helper.protect for questions and answers
 * version 2.0.1 (05.05.2019):
 * - show answers in result mode
 * - uses ccm v20.3.0
 * version 2.0.0 (03.05.2019):
 * - added lock and unlock of editing mechanism
 * - added result mode
 * - uses ccm v20.1.0
 * version 1.0.0 (06.02.2019)
 */

( () => {

  const component = {

    name: 'live_poll',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.2.1.js',

    config: {

      "admin": "guest",
      "chart": [ "ccm.component", "https://ccmjs.github.io/akless-components/highchart/versions/ccm.highchart-3.0.2.js" ],
      "converter": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/json2json.mjs", "type": "module", "import": "poll_to_highchart" } ],
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/live_poll/resources/styles.css" ],
      "data": { "store": [ "ccm.store" ] },
      "editable": true,
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.2.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/live_poll/resources/templates.html" ],
      "lock": true,
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.3.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
//    "no_members_section": true,
//    "password": "secret",
      "placeholder": {
        "start": "START",
        "finish": "FINISH",
        "reset": "RESET",
        "locked": "🔒 <span>Locked</span>",
        "unlocked": "🔓"
      },
      "prompt": "Enter Password to Finish the Live Poll",
//    "show_results": true,
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.4.0.js" ]

    },

    Instance: function () {

      let $, dataset, user;

      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper );

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

          // need password to finish? => only continue with correct password
          if ( this.password && prompt( this.prompt ) !== this.password ) return;

          // set poll to finished
          dataset.active = false;

          // logging of 'finish' event
          this.logger && this.logger.log( 'finish', $.clone( dataset ) );

          await save();                                  // update app state data (implicit app restart)
          await $.onFinish( this, $.clone( dataset ) );  // perform finish actions

        };

        /**
         * resets poll
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

          // no realtime? => update app state data
          if ( !realtime ) dataset = await $.dataset( this.data );

          // poll is no more active? => abort
          if ( !dataset.active ) return;

          // logging of 'vote' event
          this.logger && this.logger.log( 'vote', { answer: nr, before: dataset.members[ user ] } );

          dataset.members[ user ] = nr;  // remember voted answer
          await save();                  // update app state data (implicit app restart)

        };

        /**
         * updates app state data and restarts app
         * @function
         * @param {boolean} [no_restart] - prevent app restart
         * @returns {Promise<void>}
         */
        const save = async no_restart => {

          // no datastore? => abort
          if ( !this.data || !$.isDatastore( this.data.store ) ) return;

          await this.data.store.set( dataset );  // update app state data
          !no_restart && await this.start();     // restart app

        };

        /**
         * appends an questions answer
         * @param {string} [answer=''] - answer text
         * @param {number} [i=dataset.answers.length] - answer index (default: adds new answer)
         */
        const appendAnswer = ( answer, i = dataset.answers.length ) => {

          // maximum of 26 answers (A-Z)
          if ( i >= 26 ) return;

          /**
           * gets number of an answer
           * @param {Element} input - input field of answer text
           * @returns {number} answer number
           */
          const getAnswerNr = input => {

            // find corresponding answer tag
            let answer = input;
            do
              answer = answer.parentElement;
            while ( answer && !answer.classList.contains( 'answer' ) );

            // extract answer number from HTML ID
            return parseInt( answer.id.split( '-' ).pop() );

          };

          // append question answer
          this.element.querySelector( '#answers' ).appendChild( $.html( this.html.answer, {

            nr: ( i + 1 ).toString(),               // answer number (1,2,...)
            letter: String.fromCharCode( 65 + i ),  // letter of answer
            text: answer,                           // answer text
            editable: !locked,                      // answer is editable

            /** click event handler for answer input field */
            onclick: () => vote( i + 1 ),

            /** blur event handler for answer input field */
            onblur: async event => {

              // trim answer text
              event.target.textContent = event.target.textContent.trim();

              // empty answer?
              if ( !event.target.textContent.trim() )
                // not last answer?
                if ( getAnswerNr( event.target ) < dataset.answers.length ) {

                  // delete answer and
                  dataset.answers.splice( i, 1 );

                  // update app state data and restart app
                  await save();

                }

            },

            /** input event handler for answer input field */
            oninput: async event => {

              // is last answer?
              if ( getAnswerNr( event.target ) === dataset.answers.length )
                // empty answer?
                if ( event.target.textContent.trim() )
                  // less than 26 answers (A-Z)?
                  if ( dataset.answers.length < 26 ) {

                    // append empty answer
                    appendAnswer();
                    dataset.answers.push( '' );

                  }

              // update answer text
              dataset.answers[ i ] = $.escapeHTML( $.protect( event.target.textContent.trim() ) );

              // update app state data (no app restart)
              await save( true );

              // logging of 'input' event
              this.logger && this.logger.log( 'input', $.clone( dataset ) );

            }

          } ) )

        };

        /**
         * poll is realtime
         * @type {boolean}
         */
        const realtime = this.data.store.source().url && this.data.store.source().url.startsWith( 'ws' );

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

        // live poll is inactive and editable is disabled? => set live poll to active
        if ( dataset.active === undefined && !this.editable ) return start();

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // editing is locked? => disable/remove editable parts
        if ( dataset.locked && dataset.locked !== user ) locked = true;

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, {

          question: dataset.question,                                                                                // question text
          lock: dataset.locked ? this.placeholder.locked : this.placeholder.unlocked,                                // editing is locked or unlocked
          button: this.placeholder[ dataset.active ? 'finish' : ( dataset.active === false ? 'reset' : 'start' ) ],  // caption of start/finish/reset button
          editable: !locked,                                                                                         // question is editable

          /** click event handler for reload icon */
          onreload: this.start,

          /** input event handler of editable question text */
          oninput: async event => {

            // update question text
            dataset.question = $.escapeHTML( $.protect( event.target.textContent.trim() ) );
            await save( true );

            // logging of 'input' event
            this.logger && this.logger.log( 'input', $.clone( dataset ) );

          },

          /** click event handler for lock icon */
          onlock: async () => {

            // no realtime? => check app state data
            if ( !realtime ) {
              const locked = dataset.locked;
              dataset = await $.dataset( this.data );
              if ( dataset.locked !== locked ) return await this.start();
            }

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
          onclick: async () => {

            // no realtime? => check app state data
            if ( !realtime ) {
              const active = dataset.active;
              dataset = await $.dataset( this.data );
              if ( dataset.active !== active ) return await this.start();
            }

            // perform start, finish or reset
            ( dataset.active ? finish : ( dataset.active === false ? reset : start ) )()

          }

        } ) );

        // is realtime? => remove reload icon
        realtime && $.remove( this.element.querySelector( '#reload' ) );

        // disabled lock mechanism? => remove lock icon
        !this.lock && $.remove( this.element.querySelector( '#lock' ) );

        // editing is locked? => remove editable parts
        if ( locked ) {
          user !== this.admin && $.remove( this.element.querySelector( '#lock' ) );
          $.remove( this.element.querySelector( '#button' ) );
        }

        // prepare answers data
        if ( !dataset.answers ) dataset.answers = [];                                   // initial answers data
        dataset.answers = dataset.answers.filter( answer => answer && answer.trim() );  // remove empty answers
        dataset.active === undefined && !locked && dataset.answers.push( '' );          // add one empty answer

        // render answers
        dataset.answers.forEach( appendAnswer );

        // mark voted answer as selected
        dataset.members && user && dataset.members[ user ] && this.element.querySelectorAll( '.answer' )[ dataset.members[ user ] - 1 ].classList.add( 'selected' );

        // active poll? => mark as active in frontend and make question and answers not editable
        if ( dataset.active !== undefined ) {
          dataset.active && this.element.querySelector( '#main' ).classList.add( 'active' );
          this.element.querySelectorAll( '*[contenteditable]' ).forEach( div => div.removeAttribute( 'contenteditable' ) );
        }

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
         * members section
         * @type {Element}
         */
        const members_section = this.element.querySelector( '#members' );

        // active poll with members section?
        if ( dataset.active && !this.no_members_section && members_section ) {

          /**
           * number of answer that logged in member has been voted
           * @type {number}
           */
          const vote = dataset.members[ user ];

          // user not in member list? => add user and update app state data (implicit app restart)
          if ( vote === undefined ) { dataset.members[ user ] = 0; await save(); return; }

          // render member entries
          for ( const member in dataset.members )
            if ( dataset.members.hasOwnProperty( member ) ) {
              members_section.appendChild( $.html( this.html.member, { member: member } ) );
              if ( dataset.members[ member ] ) members_section.lastChild.classList.add( 'done' );  // mark member as already voted
            }

        }
        // remove no needed members section
        else $.remove( members_section );

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
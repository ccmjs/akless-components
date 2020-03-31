/**
 * @overview ccm component for live poll
 * @author André Kless <andre.kless@web.de> 2019-2020
 * @license The MIT License (MIT)
 * @version 3.0.0
 * @changes
 * version 3.0.0 (31.03.2020):
 * - admin has always full control
 * - editing of question and answers can be enabled/disabled via config
 * - lock button can be enabled/disabled via config
 * - optional password to finish a survey
 * - initial question and answers can be set via config
 * - removed property 'result' in result data
 * - uses helper.mjs v4.2.1 as default
 * (for older version changes see ccm.live_poll-2.4.0.js)
 */

( () => {

  const component = {

    name: 'live_poll', version: [ 3, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.2.1.js',

    config: {
//    "admin": "leader",
      "chart": [ "ccm.component", "https://ccmjs.github.io/akless-components/highchart/versions/ccm.highchart-3.0.2.js" ],
      "converter": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/json2json.mjs", "type": "module", "import": "poll_to_highchart" } ],
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/live_poll/resources/styles.css" ],
      "data": {
        "store": [ "ccm.store" ],
        "key": "test"
      },
      "denied": "Sorry, wrong password.",
      "editable": true,
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.2.1.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/live_poll/resources/templates.html" ],
//    "lock": true,
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
      "prompt": "Enter Password to Finish the Survey",
//    "question": "Question",
//    "answers": [ "Answer A", "Answer B", "Answer C" ],
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

          // logging of 'active' event
          this.logger && this.logger.log( 'active', this.getValue() );

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
          if ( this.password && prompt( this.prompt ) !== this.password ) return alert( this.denied );

          // set poll to finished
          dataset.active = false;

          // logging of 'finish' event
          this.logger && this.logger.log( 'finish', this.getValue() );

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
          this.logger && this.logger.log( 'reset', this.getValue() );

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

          // survey is no more active? => abort
          if ( !dataset.active ) return;

          // no realtime? => update app state data
          if ( !realtime ) dataset = await $.dataset( this.data );

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
         * @param {string} [answer = ''] - answer text
         * @param {number} [i = dataset.answers.length] - answer index (default: adds new answer)
         */
        const appendAnswer = ( answer, i = dataset.answers.length ) => {

          // maximum of 26 answers (A-Z)
          if ( i >= 26 ) return;

          /**
           * gets the number of an answer
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
            letter: String.fromCharCode( 65 + i ),  // letter of answer (A,B,...)
            text: answer,                           // answer text
            editable: this.editable && control,     // answer is editable

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
                // not empty answer?
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
              this.logger && this.logger.log( 'input', this.getValue() );

            }

          } ) )

        };

        // login user and remember username
        if ( this.user ) user = ( await this.user.login() ).user;

        // get existing app state data
        dataset = await $.dataset( this.data );

        // integrate initial question and answers
        if ( this.question && !dataset.question ) dataset.question = this.question;
        if ( this.answers  && !dataset.answers  ) dataset.answers  = this.answers;

        // result mode? => show only results
        if ( this.show_results ) {
          dataset.active = false;
          dataset.locked = true;
        }

        // correct reset of properties
        if ( dataset.active  === '' ) delete dataset.active;
        if ( dataset.members === '' ) delete dataset.members;

        // logging of 'start' event
        this.logger && this.logger.log( 'start', this.getValue() );

        /**
         * survey is realtime
         * @type {boolean}
         */
        const realtime = this.data.store.source().url && this.data.store.source().url.startsWith( 'ws' );

        /**
         * user has full control
         * @type {boolean}
         */
        const control = this.admin && this.admin === user || !this.lock || !dataset.locked || dataset.locked === user;

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, {

          question: dataset.question,                                                                                // question text
          lock: dataset.locked ? this.placeholder.locked : this.placeholder.unlocked,                                // editing is locked or unlocked
          button: this.placeholder[ dataset.active ? 'finish' : ( dataset.active === false ? 'reset' : 'start' ) ],  // caption of start/finish/reset button
          editable: this.editable && control,                                                                        // question is editable

          /** click event handler for reload icon */
          onreload: this.start,

          /** input event handler of editable question text */
          oninput: async event => {

            // update question text
            dataset.question = $.escapeHTML( $.protect( event.target.textContent.trim() ) );
            await save( true );

            // logging of 'input' event
            this.logger && this.logger.log( 'input', this.getValue() );

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
              if ( dataset.active === '' ) delete dataset.active;
              if ( dataset.active !== active ) return await this.start();
            }

            // perform start, finish or reset
            control && ( dataset.active ? finish : ( dataset.active === false ? reset : start ) )();

          }

        } ) );

        // remove unneeded buttons
        realtime && $.remove( this.element.querySelector( '#reload' ) );
        ( !this.lock || !control ) && $.remove( this.element.querySelector( '#lock' ) );
        !control && $.remove( this.element.querySelector( '#button' ) );

        // prepare answers data
        if ( !dataset.answers ) dataset.answers = [];
        dataset.answers = dataset.answers.filter( answer => answer.trim() );                     // remove empty answers
        dataset.active === undefined && this.editable && control && dataset.answers.push( '' );  // add one empty answer

        // render answers
        dataset.answers.forEach( appendAnswer );

        // mark voted answer as selected
        dataset.active && dataset.members && user && dataset.members[ user ] && this.element.querySelectorAll( '.answer' )[ dataset.members[ user ] - 1 ].classList.add( 'selected' );

        // active survey? => mark as active in frontend and make question and answers not editable
        if ( dataset.active !== undefined ) {
          dataset.active && this.element.querySelector( '#main' ).classList.add( 'active' );
          this.element.querySelectorAll( '*[contenteditable]' ).forEach( div => div.removeAttribute( 'contenteditable' ) );
        }

        // survey is finished and has chart component? => render result chart
        if ( dataset.active === false && this.chart && dataset.members ) {

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
          this.chart.start( config );                                         // render result chart

        }

        /**
         * members section
         * @type {Element}
         */
        const members_section = this.element.querySelector( '#members' );

        // active survey with members section?
        if ( dataset.active && !this.no_members_section && members_section ) {

          /**
           * number of the answer the user voted for
           * @type {number}
           */
          const vote = dataset.members[ user ];

          // user not in member list? => add user and update app state data (implicit app restart)
          if ( vote === undefined ) { dataset.members[ user ] = 0; await save(); return; }

          // render member entries
          for ( const member in dataset.members ) {
            members_section.appendChild( $.html( this.html.member, { member: member } ) );
            dataset.members[ member ] && members_section.lastChild.classList.add( 'done' );  // mark member as already voted
          }

        }
        // remove no needed members section
        else $.remove( members_section );

      };

      /**
       * returns current result data
       * @returns {Object}
       */
      this.getValue = () => $.clone( dataset );

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
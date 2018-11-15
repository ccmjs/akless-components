/**
 * @overview ccm component for quick decision
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 * @version 1.3.0
 * @changes
 * version 1.3.0 (15.11.2018):
 * - time limit support
 * - uses ccm v18.6.0
 * version 1.2.0 (02.11.2018):
 * - added config property 'interval'
 * - added timestamps in results data
 * version 1.1.0 (07.10.2018): define questions and answers via Light DOM; question and timer position switched
 * version 1.0.0 (07.10.2018)
 */

( function () {

  const component = {

    name: 'quick_decide',

    version: [ 1, 3, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.6.0.js',

    config: {

      "html": {
        "main": {
          "id": "main",
          "inner": [
            {
              "id": "timer",
              "inner": [
                { "tag": "a", "id": "min", "inner": "00" },
                { "tag": "a", "id": "sec", "inner": "00" },
                { "tag": "a", "id": "mil", "inner": "000" }
              ]
            },
            { "id": "question" },
            { "id": "answers" }
          ]
        },
        "answer": {
          "tag": "button",
          "class": "answer",
          "onclick": "%onclick%",
          "inner": "%answer%"
        }
      },
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/quick_decide/resources/default.css" ],
      "questions": [ { "answers": [] } ],
      "interval": 1

  //  "limit": 2000,
  //  "wait": 1000,
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ]

    },

    Instance: function () {

      let $, results, intervalID;

      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // no Light DOM? => skip
        if ( !this.inner ) return;

        /**
         * founded questions
         * @type {Object[]}
         */
        const questions = [];

        // search for questions
        [ ...this.inner.children ].forEach( child => {

          // no question tag? => skip
          if ( child.tagName !== 'QUESTION' ) return;

          /**
           * question dataset
           * @type {Object}
           */
          const question = { text: child.getAttribute( 'text' ), answers: [] };

          // search for answers
          [ ...child.children ].forEach( child => {

            // no answer tag? => skip
            if ( child.tagName !== 'ANSWER' ) return;

            // add founded answer to question
            question.answers.push( child.getAttribute( 'text' ) );

          } );

          // add founded question
          questions.push( question );

        } );

        // has founded questions? => use them with higher priority
        if ( questions.length > 0 && questions[ 0 ].answers.length > 0 ) this.questions = questions;

      };

      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        // set initial result data
        results = { details: [] };

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main ) );

        /**
         * website area for answer buttons
         * @type {Element}
         */
        const answers_elem = this.element.querySelector( '#answers' );

        /**
         * renders next question
         * @type {function}
         */
        const renderNext = () => {

          /**
           * finishes current question
           * @param {string} [answer] - given answer
           */
          const finish = ( answer='' ) => {

            /**
             * current time (in ms)
             * @type {number}
             */
            const time = new Date().getTime();

            /**
             * result data for current question
             * @type {Object}
             */
            const result = { question: question_data.text, answer: answer, time: time, duration: time - start };

            // logging of 'click' event
            this.logger && this.logger.log( 'click', $.clone( result ) );

            // set question result data
            results.details.push( result );

            // render next question or finish
            question_nr < this.questions.length ? renderNext() : onFinish();

          };

          /**
           * current question data
           * @type {Object}
           */
          const question_data = this.questions[ question_nr++ ];

          /**
           * current time (in ms)
           * @type {number}
           */
          const start = new Date().getTime();

          /**
           * indicates if question is already answered
           * @type {boolean}
           */
          let answered = false;

          // manage time limit
          if ( this.limit ) {
            intervalID = window.setInterval( () => {
              let ms = this.limit - ( new Date().getTime() - start );
              if ( ms <= 0 ) {
                ms = 0;
                if ( !answered ) {
                  answered = true;
                  [ ...answers_elem.querySelectorAll( '.answer' ) ].forEach( answer_elem => answer_elem.classList.add( 'disabled' ) );
                  $.wait( this.wait || 0, finish );
                }
                window.clearInterval( intervalID );
              }
              const now = new Date( ms );
              min_elem.innerHTML = now.getMinutes().toString().padStart( 2, '0' );
              sec_elem.innerHTML = now.getSeconds().toString().padStart( 2, '0' );
              mil_elem.innerHTML = now.getMilliseconds().toString().padStart( 3, '0' );
            }, this.interval );
          }

          // render question text
          $.setContent( this.element.querySelector( '#question' ), question_data.text );

          // clear answers
          $.setContent( answers_elem, '' );

          // render answer buttons
          question_data.answers.forEach( answer => $.append( answers_elem, $.html( this.html.answer, {
            answer: answer,
            onclick: event => {

              // abort if time limit exceeded or clear interval if answered in time
              if ( answered ) return; answered = true; this.limit && window.clearInterval( intervalID );

              // finish question
              finish( event.target.innerHTML );

            }
          } ) ) );

        };

        /**
         * when all questions are answered
         * @type {function}
         */
        const onFinish = () => {

          // set duration
          results.end = new Date().getTime();
          results.duration = results.end - start.getTime();

          // clear timer interval
          !this.limit && window.clearInterval( intervalID );

          // logging of 'finish' event
          this.logger && this.logger.log( 'finish', $.clone( results ) );

          // perform finish actions
          this.onfinish && $.onFinish( this );

        };

        /**
         * current question number
         * @type {number}
         */
        let question_nr = 0;

        // render first question
        renderNext();

        // prepare variables for timer handling
        const start = new Date();
        const timer = this.element.querySelector( '#timer' );
        const min_elem = timer.querySelector( '#min' );
        const sec_elem = timer.querySelector( '#sec' );
        const mil_elem = timer.querySelector( '#mil' );

        // start timer
        if ( this.limit ) return;
        results.start = start.getTime();
        intervalID = window.setInterval( () => {
          const now = new Date( new Date().getTime() - start.getTime() );
          min_elem.innerHTML = now.getMinutes().toString().padStart( 2, '0' );
          sec_elem.innerHTML = now.getSeconds().toString().padStart( 2, '0' );
          mil_elem.innerHTML = now.getMilliseconds().toString().padStart( 3, '0' );
        }, this.interval );

      };

      /**
       * returns current result data
       * @returns {Object} current result data
       */
      this.getValue = () => results;

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
/**
 * @overview ccm component for quick decision
 * @author André Kless <andre.kless@web.de> 2018-2019
 * @license The MIT License (MIT)
 * @version 2.0.3
 * @changes
 * version 2.0.3 (10.10.2019):
 * - uses ccm v24.0.1
 * version 2.0.2 (30.09.2019):
 * - uses ccm v22.7.0
 * version 2.0.1 (04.09.2019):
 * - clear interval if the app has no DOM contact
 * - uses ccm v22.5.0
 * version 2.0.0 (01.05.2019):
 * - added result mode
 * - renamed property 'details' to 'sections' in result data
 * - added answer number in sections of result data
 * (for older version changes see ccm.quick_decide-1.4.0.js)
 */

( () => {

  const component = {

    name: 'quick_decide', version: [ 2, 0, 3 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-24.0.1.js',

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
          "id": "answer-%nr%",
          "class": "answer",
          "onclick": "%onclick%",
          "inner": "%answer%"
        }
      },
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/quick_decide/resources/default.css" ],
      "questions": [ { "text": "First Question", "answers": [ "Answer A", "Answer B" ] } ],
      "interval": 1,
      "wait": 0

  //  "data": { "store": [ "ccm.store" ] },
  //  "feedback": true,
  //  "limit": 2000,
  //  "show_results": true,
  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onfinish": { "log": true }

    },

    Instance: function () {

      let $, results, intervalID, question_nr;

      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // result mode? => change configuration for result mode
        if ( this.show_results ) {
          this.feedback = true;
          this.limit = 0;
          this.wait = 0;
          this.onfinish = null;
          this.logger = null;
        }

        // no Light DOM? => skip
        if ( !this.inner ) return;

        /**
         * founded questions
         * @type {Object[]}
         */
        const questions = [];

        // search for questions
        [ ...this.inner.children ].forEach( $question => {

          // no question tag? => skip
          if ( $question.tagName !== 'QUESTION' ) return;

          /**
           * question data (generated out of question tag)
           * @type {Object}
           */
          const question = $.generateConfig( $question );

          // bring question data to correct form
          question.answers = [];

          // search for answers
          [ ...question.inner.children ].forEach( $answer => {

            // no answer tag? => skip
            if ( $answer.tagName !== 'ANSWER' ) return;

            /**
             * answer data (generated out of answer tag)
             * @type {Object}
             */
            const answer = $.generateConfig( $answer );

            // bring answer data to correct form
            if ( !answer.text ) answer.text = answer.inner; delete answer.inner;

            // remove no more needed properties in answer data
            delete answer.inner;

            // add answer data to answer data sets
            question.answers.push( answer );

          } );

          // remove no more needed properties in question data
          delete question.inner;

          // add question data to question data sets
          questions.push( question );

        } );

        // has founded questions? => use them with higher priority
        if ( questions.length > 0 && questions[ 0 ].answers.length > 0 ) this.questions = questions;

      };

      this.ready = async () => {

        // bring question data to uniform data structure
        this.questions.forEach( question => {

          // convert answers given as string to objects
          question.answers = question.answers.map( answer => typeof answer === 'string' ? { text: answer } : answer );

          // information about correct answers could be given as array or number in question data
          if ( question.correct ) {
            if ( Array.isArray( question.correct ) )
              question.correct.forEach( nr => question.answers[ nr - 1 ].correct = true );
            else
              question.answers[ question.correct - 1 ].correct = true;
            delete question.correct;
          }
        } );

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // set initial result data
        results = { correct: 0, total: this.questions.length, sections: [] };

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main ) );

        /**
         * website area for answer buttons
         * @type {Element}
         */
        const $answers = this.element.querySelector( '#answers' );

        /**
         * already existing result data
         * @type {boolean}
         */
        const dataset = this.show_results && await $.dataset( this.data );

        /**
         * renders next question
         * @type {function}
         */
        const renderNext = () => {

          /**
           * finishes current question
           * @param {number} [answer_nr] - given answer (counting starts with 1)
           */
          const finish = answer_nr => {

            /**
             * data of given answer
             * @type {Object}
             */
            const answer = answer_nr ? question.answers[ answer_nr - 1 ] : {};

            /**
             * current time (in ms)
             * @type {number}
             */
            const time = new Date().getTime();

            /**
             * result data for current question
             * @type {Object}
             */
            const result = { question: question.text, answer: answer.text, nr: answer_nr, correct: !!answer.correct, time: time, duration: time - start };

            // logging of 'click' event
            this.logger && this.logger.log( 'click', $.clone( result ) );

            // set question result data
            results.sections.push( result );

            // correct answered question? => increase number of correct given answers
            if ( answer.correct === true ) results.correct++;

            // show feedback for correctness
            feedback( answer_nr );

            // continue after wait time
            $.wait( this.wait, () => question_nr < this.questions.length ? renderNext() : onFinish() );

          };

          /**
           * shows feedback for current question
           * @param {number} answer_nr - given answer (counting starts with 1)
           */
          const feedback = answer_nr => {

            // disable answers
            [ ...$answers.querySelectorAll( '.answer' ) ].forEach( $answer => $answer.classList.add( 'disabled' ) );

            // no feedback? => abort
            if ( !this.feedback ) return;

            // show correctness
            this.questions[ question_nr - 1 ].answers.forEach( ( answer, i ) => {
              const $answer = this.element.querySelector( '#answer-' + ( i + 1 ) );
              if ( i === answer_nr - 1 )
                $answer.classList.add( answer.correct ? 'right' : 'wrong' );
              else if ( answer.correct )
                $answer.classList.add( 'correct' );
            } );

          };

          /**
           * current question data
           * @type {Object}
           */
          const question = this.questions[ question_nr++ ];

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

              // app has no DOM contact? => abort interval
              if ( !$.hasDomContact( this ) ) return clearInterval( intervalID );

              // check timer
              let ms = this.limit - ( new Date().getTime() - start );
              if ( ms <= 0 ) {
                ms = 0;
                window.clearInterval( intervalID );

                // finish question after timeout
                if ( !answered ) { answered = true; finish(); }

              }

              // update timer
              const now = new Date( ms );
              min_elem.innerHTML = now.getMinutes().toString().padStart( 2, '0' );
              sec_elem.innerHTML = now.getSeconds().toString().padStart( 2, '0' );
              mil_elem.innerHTML = now.getMilliseconds().toString().padStart( 3, '0' );

            }, this.interval );
          }

          // render question
          $.setContent( this.element.querySelector( '#question' ), question.text || '' );

          // clear website area for answer buttons
          $.setContent( $answers, '' );

          // render answers
          question.answers.forEach( ( answer, i ) => $.append( $answers, $.html( this.html.answer, {
            nr: i + 1,
            answer: answer.text,
            onclick: event => {

              // abort if time limit exceeded
              if ( answered ) return; answered = true;

              // clear interval if answered in time
              this.limit && window.clearInterval( intervalID );

              // finish question
              finish( parseInt( event.target.id.split( '-' )[ 1 ] ) );

            }
          } ) ) );

          // result mode? => show feedback directly
          this.show_results && feedback( dataset.sections[ question_nr - 1 ].nr );

        };

        /**
         * when all questions are answered
         * @type {function}
         */
        const onFinish = () => {

          // result mode? => restart
          if ( this.show_results ) return this.start();

          // set duration
          results.end = new Date().getTime();
          results.duration = results.end - start.getTime();

          // clear timer interval
          !this.limit && window.clearInterval( intervalID );

          // logging of 'finish' event
          this.logger && this.logger.log( 'finish', this.getValue() );

          // perform finish actions
          this.onfinish && $.onFinish( this );

        };

        // reset current question number
        question_nr = 0;

        // render first question
        renderNext();

        // prepare variables for timer handling
        const start = new Date();
        const timer = this.element.querySelector( '#timer' );
        const min_elem = timer.querySelector( '#min' );
        const sec_elem = timer.querySelector( '#sec' );
        const mil_elem = timer.querySelector( '#mil' );

        // no time limit or result mode? => abort
        if ( this.limit || this.show_results ) return;

        // start timer
        results.start = start.getTime();
        intervalID = window.setInterval( () => {

          // app has no DOM contact? => abort interval
          if ( !$.hasDomContact( this ) ) return clearInterval( intervalID );

          // update timer
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
      this.getValue = () => $.clone( results );

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
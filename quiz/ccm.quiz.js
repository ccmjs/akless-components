/**
 * @overview ccm component for quiz
 * @author André Kless <andre.kless@web.de> 2016-2018
 * @license The MIT License (MIT)
 * @version latest (3.0.0)
 * @changes
 * version 3.0.0 (06.11.2018):
 * - uses ccm v18.4.0
 * - removed privatization of instance members
 * - updated event handling and logging
 * - added getValue method
 * - bug fix for default correct answers
 * version 2.1.1 (04.06.2018):
 * - uses ccm v16.6.1
 * - bug fix for HTML escaping
 * version 2.1.0 (14.01.2018):
 * - tooltips work on mobile devices
 * version 2.0.0 (23.08.2017):
 * - uses ccm v11.5.0 instead of v8.1.0
 * - renaming of some instance properties
 * - reductions in HTML template for start button
 * - remove no more needed ccm.helper.protect calls
 * - remove no more needed ccm.helper.clone call
 * version 1.0.0 (04.08.2017)
 */

( function () {

  const component = {

    name: 'quiz',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {

      "html": {
        "start": {
          "id": "start",
          "inner": {
            "tag": "button",
            "inner": "Start",
            "onclick": "%%"
          }
        },
        "main": {
          "id": "main",
          "inner": [
            { "id": "questions" },
            {
              "id": "buttons",
              "inner": [
                { "id": "cancel" },
                { "id": "prev" },
                { "id": "submit" },
                { "id": "next" },
                { "id": "finish" },
                { "id": "timer" }
              ]
            }
          ]
        },
        "question": {
          "id": "%id%",
          "class": "question",
          "inner": [
            {
              "class": "title",
              "inner": [
                { "inner": "Question" },
                { "inner": "%nr%/%count%" },
                { "inner": "%text%" }
              ]
            },
            {
              "class": "description",
              "inner": "%description%"
            },
            { "class": "answers" }
          ]
        },
        "answer": {
          "id": "%id%",
          "class": "answer %class%",
          "inner": {
            "class": "entry",
            "inner": [
              {
                "class": "text",
                "inner": {
                  "tag": "label",
                  "inner": "%text%",
                  "for": "%id%-input"
                }
              },
              { "class": "comment" }
            ]
          }
        },
        "comment": {
          "class": "tooltip",
          "onclick": "%click%",
          "inner": [
            "i",
            {
              "tag": "div",
              "class": "tooltiptext",
              "inner": {
                "inner": {
                  "inner": "%comment%"
                }
              }
            }
          ]
        },
        "timer": {
          "tag": "span",
          "inner": "%%"
        }
      },
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/quiz/resources/default.css" ],
      "questions": [],
      "placeholder": {
        "cancel": "Cancel",
        "prev": "Previous",
        "submit": "Submit",
        "next": "Next",
        "correct": "Correct solution: ",
        "finish": "Finish"
      }

  //  "start_button": true,
  //  "cancel_button": true,
  //  "feedback": true,
  //  "navigation": true,
  //  "skippable": true,
  //  "anytime_finish": true,
  //  "time": 60,
  //  "shuffle": true,
  //  "random": true,
  //  "answers": [],
  //  "correct": [],
  //  "input": 'radio',
  //  "attributes": {},
  //  "escape": true,
  //  "swap": true,
  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onstart":                () => console.log( 'Quiz started' ),
  //  "oncancel":               () => console.log( 'Quiz canceled' ),
  //  "oninput":    ( data, elem ) => console.log( data, elem ),
  //  "onchange":   ( data, elem ) => console.log( data, elem ),
  //  "oncomment":  ( data, elem ) => console.log( data, elem ),
  //  "onprev":     ( data, elem ) => console.log( data, elem ),
  //  "onnext":     ( data, elem ) => console.log( data, elem ),
  //  "onvalidation": data => { console.log( data ); return true; },
  //  "onfeedback":   data =>   console.log( data ),
  //  "onfinish":  results =>   console.log( results )

    },

    Instance: function () {

      const self = this;
      let $, results;

      this.init = async () => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // support declarative way for defining a quiz via HTML
        evaluateLightDOM();

        /** finds Custom Component Elements for generating question data sets */
        function evaluateLightDOM() {

          // no Light DOM? => skip
          if ( !self.inner ) return;

          /**
           * question data sets (generated out of Custom Component Elements)
           * @type {Object[]}
           */
          const questions = [];

          // iterate over all children of Light DOM to search for question tags
          [ ...self.inner.children ].forEach( question_tag => {

            // no question tag? => skip
            if ( question_tag.tagName !== 'QUESTION' ) return;

            /**
             * question data (generated out of question tag)
             * @type {Object}
             */
            const question = $.generateConfig( question_tag );

            /**
             * answer data sets (generated out of question tag)
             * @type {Object[]}
             */
            question.answers = [];

            // iterate over all children of question tag to search for answer tags
            [ ...question.inner.children ].forEach( answer_tag => {

              // no answer tag? => skip
              if ( answer_tag.tagName !== 'ANSWER' ) return;

              /**
               * answer data (generated out of answer tag)
               * @type {Object}
               */
              const answer = $.generateConfig( answer_tag );

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

          // has founded question data sets? => use them for quiz (with higher priority)
          if ( questions.length > 0 ) self.questions = questions;

        }

      };

      this.ready = async () => {

        // support different forms of data structure
        uniformData();

        // logging of 'ready' event
        self.logger && self.logger.log( 'ready', $.privatize( self, true ) );

        /** brings given data to uniform data structure */
        function uniformData() {

          // iterate over all question data sets
          self.questions.forEach( ( question, i ) => {

            // each question knows her original number and HTML ID
            question.nr = i + 1; question.id = 'question-' + question.nr;

            // consider default values for question data from instance config
            self.questions[ i ] = question = $.integrate( $.filterProperties( self, 'text', 'description', 'answers', 'input', 'attributes', 'swap', 'escape', 'random', 'correct' ), question, true );

            // default input type is checkbox
            if ( !question.input ) question.input = 'checkbox';

            // set default information about correct answers
            if ( !question.correct && question.input !== 'radio' ) question.correct = [];

            // answer data sets could be given as single string (answer text) instead of object
            for ( i = 0; i < question.answers.length; i++ )
              if ( !$.isObject( question.answers[ i ] ) )
                question.answers[ i ] = { text: question.answers[ i ] };

            // information about correct answers of a multiple choice question could be given as integer array instead of boolean array
            if ( question.input === 'checkbox' && typeof question.correct[ 0 ] === 'number' ) {
              const correct = [];
              for ( i = 0; i < question.answers.length; i++ )
                correct.push( question.correct.indexOf( i ) >= 0 );
              question.correct = correct;
            }

            // fill up array of information about correct answers with default values (checkbox -> false, otherwise empty string)
            if ( Array.isArray( question.correct ) )
              for ( i = 0; i < question.answers.length; i++ )
                if ( question.correct[ i ] === undefined )
                  question.correct[ i ] = question.input === 'checkbox' ? false : '';

            // iterate over all answers
            question.answers.forEach( function ( answer, i ) {

              // each answer knows her original number, HTML class and HTML ID
              answer.nr = i + 1; answer.class = 'answer-' + answer.nr; answer.id = question.id + '-' + answer.class;

              // information about correct answers of a question could be given via answer data
              if ( answer.correct !== undefined )
                if ( question.input === 'radio' )
                  question.correct = i;
                else
                  question.correct[ i ] = question.input === 'number' ? parseInt( answer.correct ) : answer.correct;

              // consider default values for answer data from question data
              question.answers[ i ] = $.integrate( $.filterProperties( question, 'attributes', 'swap', 'escape' ), answer, true );

            } );

            // remove no more needed properties in question data
            delete question.attributes; delete question.swap;

          } );

          // remove no more needed properties in config
          delete self.text; delete self.description; delete self.answers; delete self.input; delete self.attributes; delete self.swap; delete self.escape; delete self.random; delete self.correct;

        }

      };

      this.start = async () => {

        // set initial result data
        results = { details: [] };

        // logging of 'render' event
        self.logger && self.logger.log( 'render' );

        // user must click on a start button before quiz starts? => render start button
        if ( self.start_button ) $.setContent( self.element, $.html( self.html.start, start ) );

        // no need for a start button? => start quiz directly
        else start();

        /** starts quiz */
        function start() {

          /**
           * index of current question
           * @type {number}
           */
          let current_question = 0;

          /**
           * stores which questions are already evaluated
           * @type {Object.<number,boolean>}
           */
          const evaluated = {};

          // logging of 'start' event
          self.logger && self.logger.log( 'start' );

          // prepare main HTML structure
          $.setContent( self.element, $.html( self.html.main ) );

          // select inner containers (mostly for buttons)
          const cancel_elem = self.element.querySelector( '#cancel' );
          const   prev_elem = self.element.querySelector( '#prev'   );
          const   next_elem = self.element.querySelector( '#next'   );
          const submit_elem = self.element.querySelector( '#submit' );
          const finish_elem = self.element.querySelector( '#finish' );
          const  timer_elem = self.element.querySelector( '#timer'  );

          // remove unneeded buttons
          if ( !self.cancel_button ) $.removeElement( cancel_elem );
          if ( !self.navigation    ) $.removeElement(   prev_elem );
          if ( !self.feedback      ) $.removeElement( submit_elem );
          if ( self.questions.length === 1 ) {
            $.removeElement( prev_elem );
            $.removeElement( next_elem );
          }

          // want random order for questions? => shuffle questions
          self.shuffle && $.shuffleArray( self.questions );

          // render all questions and show only first one
          self.questions.forEach( renderQuestion );
          showQuestion();

          // render timer (in case of time limited quiz)
          renderTimer();

          // perform 'start' callback
          self.onstart && self.onstart( self );

          /**
           * renders a specific question
           * @param {Object} question - question data
           * @param {number} i - question index
           */
          function renderQuestion( question, i ) {

            // each question knows her index
            question.i = i;

            // prepare HTML structure of question (each question knows her element)
            question.elem = $.html( self.html.question, {
              id:          question.id,
              nr:          i + 1,
              count:       self.questions.length,
              text:        question.escape ? $.escapeHTML( question.text ) : question.text,
              description: question.description
            } );

            // question has no description? => remove description element
            !question.description && $.removeElement( question.elem.querySelector( '.description' ) );

            // want random order for answers? => shuffle answers
            question.random && $.shuffleArray( question.answers );

            // render all question answers
            question.answers.forEach( renderAnswer );

            // add prepared question element to main HTML structure
            self.element.querySelector( '#questions' ).appendChild( question.elem );

            /**
             * renders a specific answer
             * @param {Object} answer - answer data
             */
            function renderAnswer( answer ) {

              // prepare HTML structure of answer (each answer knows her element)
              answer.elem = self.ccm.helper.html( self.html.answer, {
                id:    answer.id,
                class: answer.class,
                text:  answer.escape ? $.escapeHTML( answer.text ) : answer.text
              } );
              addInput();  // add input field of answer

              // add prepared answer container to HTML structure of question
              question.elem.querySelector( '.answers' ).appendChild( answer.elem );

              /** adds input field */
              function addInput() {

                /**
                 * ccm HTML data of input field
                 * @type {Object}
                 */
                let input = {
                  tag: 'input',
                  type: question.input,
                  name: answer.id,
                  id: answer.id + '-input',
                  oninput:  function () { onInputEvent.call( this, 'input'  ) },
                  onchange: function () { onInputEvent.call( this, 'change' ) }
                };

                // is a single choice answer? => set same name and different value for radio button
                if ( question.input === 'radio' ) { input.name = question.id; input.value = answer.nr - 1; }

                // add individual attributes to input field
                input = $.integrate( answer.attributes, input );

                // add input field to HTML structure of answer
                const entry_elem = answer.elem.querySelector( '.entry' );
                const input_elem = $.html( { class: 'input', inner: input } );
                entry_elem.insertBefore( input_elem, entry_elem.firstChild );
                if ( answer.swap ) {
                  entry_elem.insertBefore( entry_elem.children[ 1 ], input_elem );
                  entry_elem.classList.add( 'swap' );
                }

                /**
                 * when a specific input element event is triggered
                 * @param {string} event - name of specific input element event
                 */
                function onInputEvent( event ) {

                  /**
                   * event data of specific event
                   * @type {Object}
                   */
                  const event_data = { question: question.nr, answer: answer.nr, value: this.value };

                  // logging of specific event
                  self.logger && self.logger.log( event, $.clone( event_data ) );

                  // perform event specific callback
                  self[ 'on' + event ] && self[ 'on' + event ].call( self, $.clone( event_data ), this );

                }

              }

            }

          }

          /** shows current question (and hides all others) */
          function showQuestion() {

            // hide all questions and show only current question
            [ ...self.element.querySelectorAll( '.question' ) ].forEach( question_elem => question_elem.style.display = 'none' );
            self.questions[ current_question ].elem.style.display = 'block';

            // (re)render buttons
            updateButtons();

          }

          /** (re)renders buttons */
          function updateButtons() {

            /**
             * question data of current question
             * @type {Object}
             */
            const question = self.questions[ current_question ];

            // render 'cancel' button (if needed)
            self.cancel_button && $.setContent( cancel_elem, $.html( {
              tag: 'button',
              inner: self.placeholder.cancel,
              onclick: function () {

                // perform common event actions
                onButtonEvent.call( this, 'cancel' );

                // no individual 'cancel' callback? => restart
                !self.onchange && self.start();

              }
            } ) );

            // render 'prev' button (if needed)
            self.navigation && $.setContent( prev_elem, $.html( {
              tag: 'button',
              disabled: question.i === 0,
              inner: self.placeholder.prev,
              onclick: function () {

                // decrease index of current question
                current_question--;

                // show previous question
                showQuestion();

                // perform common event actions
                onButtonEvent.call( this, 'prev' );

             }
            } ) );

            // render 'next' button
            $.setContent( next_elem, $.html( {
              tag: 'button',
              disabled: question.i === self.questions.length - 1 || self.feedback && !self.skippable && !evaluated[ question.nr ],
              inner: self.placeholder.next,
              onclick: function () {

                // increase index of current question
                current_question++;

                // show next question
                showQuestion();

                // perform common event actions
                onButtonEvent.call( this, 'next' );

              }
            } ) );

            // render 'submit' button (if needed)
            self.feedback && $.setContent( submit_elem, $.html( {
              tag: 'button',
              disabled: evaluated[ question.nr ],
              inner: self.placeholder.submit,
              onclick: () => evaluate( question )
            } ) );

            // render 'finish' button
            $.setContent( finish_elem, $.html( {
              tag: 'button',
              disabled: !self.anytime_finish && ( question.i !== self.questions.length - 1 || self.feedback && !evaluated[ question.nr ] ),
              inner: self.placeholder.finish,
              onclick: onFinish
            } ) );

            /**
             * when a specific button element event is triggered
             * @param {string} event - name of specific button element event
             */
            function onButtonEvent( event ) {

              /**
               * question data of current question
               * @type {Object}
               */
              const question = self.questions[ current_question ];

              /**
               * event data of specific event
               * @type {Object}
               */
              const event_data = { question_nr: question.i + 1, original_nr: question.nr, number_of_questions: self.questions.length, results: results };

              // logging of specific event
              self.logger && self.logger.log( event, event_data );

              // perform event specific callback (default is a restart)
              self[ 'on' + event ] && self[ 'on' + event ].call( self, event_data, this );

            }

          }

          /**
           * evaluates a question
           * @param {Object} [question] - question data (default: evaluate all not already evaluated questions)
           */
          function evaluate( question ) {

            // no specific question? => evaluate all questions
            if ( !question ) return self.questions.forEach( evaluate );

            // question is already evaluated? => abort
            if ( results.details[ question.nr - 1 ] ) return;

            /**
             * event data of 'feedback' event
             * @type {Object}
             */
            const event_data = { question_nr: question.i + 1, original_nr: question.nr, number_of_questions: self.questions.length, input: getValues() };

            // has individual 'validation' callback? => perform it (abort evaluation if user input value is not valid)
            if ( self.onvalidation && !self.onvalidation.call( self, $.clone( event_data ) ) ) return;

            // add solution information to event data
            event_data.correct = question.correct;

            // logging of 'feedback' event
            self.logger && self.logger.log( 'feedback', $.clone( event_data ) );

            // remove no more needed properties in event data
            delete event_data.number_of_questions;

            // add result data of current question to result data of hole quiz
            results.details[ question.nr - 1 ] = event_data;

            // disable evaluated input fields
            [ ...question.elem.querySelectorAll( 'input' ) ].forEach( input_field => input_field.disabled = true );

            // show visual feedback for current question
            showFeedback();

            // remember that current question is evaluated
            evaluated[ question.nr ] = true;

            // perform 'feedback' callback
            self.onfeedback && self.onfeedback.call( self, $.clone( event_data ) );

            // (re)render buttons
            updateButtons();

            /**
             * get input field values of current question
             * @returns {Array|number}
             */
            function getValues() {

              const values = $.formData( question.elem );
              if ( question.input === 'radio' ) return parseInt( values[ Object.keys( values )[ 0 ] ] );
              const array = [];
              for ( const i in values )
                array[ i.split( '-' ).pop() - 1 ] = question.input === 'checkbox' ? !!values[ i ] : values[ i ];
              return array;

            }

            /** gives user a visual feedback */
            function showFeedback() {

              // iterate over all answer data sets of current question
              question.answers.forEach( answer => {

                // no information about correct answers? => abort
                if ( event_data.correct === undefined ) return;

                // current question is a single choice question? => skip
                if ( question.input === 'radio' ) return;

                /**
                 * correct value for this answer
                 * @type {boolean|number|string}
                 */
                const correct = event_data.correct[ answer.nr - 1 ];

                /**
                 * user input value for this answer
                 * @type {boolean|number|string}
                 */
                const input = event_data.input[ answer.nr - 1 ];

                // user gives correct value for this answer? => mark answer as right
                input !== '' && input !== false && input === correct && answer.elem.classList.add( 'right' );

                // user gives wrong value for this answer? => mark answer as wrong
                input !== '' && input !== false && input !== correct && answer.elem.classList.add( 'wrong' );

                // user gives no value for a (correct) multiple choice answer? => mark missed correct answer as correct
                input === false && correct !== false && answer.elem.classList.add( 'correct' );

                // number or text input field and user gives not correct value? => show user correct value (via placeholder attribute)
                if ( question.input !== 'checkbox' && correct !== '' && input !== correct )
                  answer.comment = self.placeholder.correct + correct + ( answer.comment ? '. ' + answer.comment : '' );

              } );

              // no information about correct answers? => abort and render answer comments
              if ( event_data.correct === undefined ) return renderComments();

              // is a single choice question?
              if ( question.input === 'radio' ) {

                /**
                 * correct value for current question
                 * @type {number}
                 */
                const correct = event_data.correct;

                /**
                 * user input value for current question
                 * @type {number}
                 */
                const input = event_data.input;

                /**
                 * prefix of HTML ID of an answer
                 * @type {string}
                 */
                const id_prefix = '#' + question.id + '-answer-';

                // user chooses correct answer? => mark correct answer as right
                if ( event_data.input === correct )
                  question.elem.querySelector( id_prefix + ( input + 1 ) ).classList.add( 'right' );
                else {
                  // user chooses wrong answer? => mark user answer as wrong
                  if ( !isNaN( event_data.input ) ) question.elem.querySelector( id_prefix + ( input + 1 ) ).classList.add( 'wrong' );
                  // mark missed correct answer as correct
                  question.elem.querySelector( id_prefix + ( correct + 1 ) ).classList.add( 'correct' );
                }

              }

              // render answer comments
              renderComments();

              /** renders comments of question answers (if any) */
              function renderComments() {

                // iterate over all answer data sets of current question
                question.answers.forEach( answer => {

                  // answer has a comment? => render it
                  answer.comment && $.setContent( answer.elem.querySelector( '.comment' ), $.html( self.html.comment, {
                    click: function () {

                      // show/hide comment (via tooltip)
                      [ ...self.element.querySelectorAll( '.clicked' ) ].forEach( elem => elem !== this && elem.classList.remove( 'clicked' ) );
                      this.classList.toggle( 'clicked' );

                      /**
                       * event data of 'comment' event
                       * @type {Object}
                       */
                      const event_data = { question: question.nr, answer: answer.nr };

                      // logging of 'comment' event
                      self.logger && self.logger.log( 'comment', $.clone( event_data ) );

                      // perform event specific callback
                      self.oncomment && self.oncomment.call( self, $.clone( event_data ), this );

                    },
                    comment: answer.escape ? $.escapeHTML( answer.comment ) : answer.comment,
                  } ) );

                } );

              }

            }

          }

          /** renders timer */
          function renderTimer() {

            // no limited time? => remove timer button and abort
            if ( !self.time ) return $.removeElement( timer_elem );

            /**
             * given seconds for working with quiz
             * @type {number}
             */
            let timer_value = self.time;

            // start timer
            timer();

            /** updates countdown timer (recursive function) */
            function timer() {

              // no existing finish button? => stop timer
              if ( !finish_elem ) return;

              // (re)render timer value
              $.setContent( timer_elem, $.html( self.html.timer, timer_value ) );

              // countdown
              if ( timer_value-- )
                $.wait( 1000, timer );  // recursive call
              else {

                // logging of 'timeout' event
                self.logger && self.logger.log( 'timeout', self.time );

                // finish quiz at timeout
                onFinish();

              }

            }

          }

          /** finishes quiz */
          async function onFinish() {

            // has user instance? => login user (if not already logged in)
            self.user && await self.user.login();

            // make sure that user could not use 'finish' button again
            $.removeElement( finish_elem );
            $.removeElement(  timer_elem );

            // evaluate all not already evaluated questions
            evaluate();

            // logging of 'finish' event
            self.logger && self.logger.log( 'finish', self.getValue() );

            // perform 'finish' actions and provide result data
            $.onFinish( self );

          }

        }

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
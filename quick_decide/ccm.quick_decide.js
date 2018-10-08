/**
 * @overview ccm component for quick decision
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (07.10.2018)
 */

( function () {

  const component = {

    name: 'quick_decide',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {

      "html": {
        "main": {
          "id": "main",
          "inner": [
            { "id": "question" },
            {
              "id": "timer",
              "inner": [
                { "tag": "a", "id": "min", "inner": "00" },
                { "tag": "a", "id": "sec", "inner": "00" },
                { "tag": "a", "id": "mil", "inner": "000" }
              ]
            },
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
      "questions": [ { "answers": [] } ]
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ]

    },

    Instance: function () {

      let $, results;

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

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
           * current question data
           * @type {Object}
           */
          const question_data = this.questions[ question_nr++ ];

          // render question text
          $.setContent( this.element.querySelector( '#question' ), question_data.text );

          // clear answers
          $.setContent( answers_elem, '' );

          // render answer buttons
          question_data.answers.forEach( answer => $.append( answers_elem, $.html( this.html.answer, {
            answer: answer,
            onclick: event => {

              /**
               * result data for current question
               * @type {Object}
               */
              const result = { question: question_data.text, answer: event.target.innerHTML };

              // logging of 'click' event
              this.logger && this.logger.log( 'click', $.clone( result ) );

              // set question result data
              results.details.push( result );

              // render next question or finish
              question_nr < this.questions.length ? renderNext() : onFinish();

            }
          } ) ) );

        };

        /**
         * when all questions are answered
         * @type {function}
         */
        const onFinish = () => {

          // clear timer interval
          window.clearInterval( intervalID );

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

        // start timer
        const start = new Date();
        const timer = this.element.querySelector( '#timer' );
        const min_elem = timer.querySelector( '#min' );
        const sec_elem = timer.querySelector( '#sec' );
        const mil_elem = timer.querySelector( '#mil' );
        let intervalID = window.setInterval( () => {
          const now = new Date( new Date().getTime() - start.getTime() );
          min_elem.innerHTML = now.getMinutes().toString().padStart( 2, '0' );
          sec_elem.innerHTML = now.getSeconds().toString().padStart( 2, '0' );
          mil_elem.innerHTML = now.getMilliseconds().toString().padStart( 3, '0' );
        }, 1 );

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
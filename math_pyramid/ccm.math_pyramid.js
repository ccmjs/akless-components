/**
 * @overview ccm component for math pyramids
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (07.03.2020)
 */

( () => {

  const component = {

    name: 'math_pyramid',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.1.0.js',

    config: {
      "captions": {
        "cancel": "Cancel",
        "feedback": "Feedback",
        "retry": "Retry",
        "finish": "Finish"
      },
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/math_pyramid/resources/styles.css" ],
      "feedback": true,
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.0.2.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/math_pyramid/resources/templates.html" ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "max": 1000,
      "min": 500,
  //  "numbers": [ 28, 53, 4, 17, 36 ],
  //  "oncancel": instance => console.log( instance ),
  //  "onchange": event => console.log( event ),
  //  "onfeedback": instance => console.log( instance ),
  //  "onfinish": { "log": true },
  //  "onretry": instance => console.log( instance ),
      "operator": "+",
  //  "retry": true,
      "size": 5,
  //  "solutions": true,
  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]
    },

    Instance: function () {

      let $, numbers, solutions, results = {};
      const self = this;

      this.ready = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper );

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // restore initial state
        numbers = solutions = undefined; results = {}; $.setContent( self.element, '' );

        calculateNumbers();      // calculate numbers of the lowest level of the math pyramid
        if ( !numbers ) return;  // calculation of numbers failed? => abort
        buildPyramid();          // build pyramid
        renderButtons();         // render buttons

        // logging of 'start' event
        this.logger && this.logger.log( 'start', numbers.splice() );

        /** calculates the numbers of the lowest level of the math pyramid */
        function calculateNumbers() {

          if ( Array.isArray( self.numbers ) )
            numbers = self.numbers.slice();
          else {
            let randoms, tries = 0;
            do {
              if ( tries++ > 1000000 ) return console.log( 'Calculation of numbers failed.' );
              randoms = [];
              let max;
              for ( let i = 0; i < self.size; i++ ) {
                switch ( self.operator ) {
                  case '+': max = self.max / self.size; break;
                  case '*': max = self.max / Math.pow( 2, self.size ); break;
                  default: max = self.max;
                }
                randoms.push( Math.floor( 1 + Math.random() * max ) );
              }
              solutions = calculateSolutions( randoms );
            } while ( solutions[ 0 ] < self.min || solutions[ 0 ] > self.max );
            numbers = randoms;
          }

          /**
           * calculates the solutions of the math pyramid
           * @param {number[]} numbers - numbers of the lowest level of the math pyramid
           * @returns {number[]} solution numbers of the math pyramid
           */
          function calculateSolutions( numbers ) {
            let solutions = numbers.slice();
            let tmp = [];
            while ( numbers.length > 0 ) {
              for ( let i = numbers.length - 1; i > 0; i-- )
                tmp.unshift( operator( numbers[ i ], numbers[ i - 1 ] ) );
              solutions = tmp.concat( solutions );
              numbers = tmp;
              tmp = [];
            }
            return solutions;

            function operator( a, b ) {
              switch ( self.operator ) {
                case '+': return a + b;
                case '*': return a * b;
              }
            }
          }

        }

        /** renders the math pyramid */
        function buildPyramid() {
          $.setContent( self.element, $.html( self.html.main ) );
          const max_number_length = ( self.max || solutions[ 0 ] ).toString().length + 1;
          const pyramid = self.element.querySelector( '#pyramid' );
          let brick;
          for ( let i = 0; i < numbers.length; i++ ) {
            for ( let k = 0, j = numbers.length - 1 - i; j < numbers.length; j++ ) {
              if ( i === numbers.length - 1 )
                $.append( pyramid, brick = $.html( { class: 'disabled', inner: numbers[ k ] } ) );
              else
                $.append( pyramid, brick = $.html( { contenteditable: true, oncopy: 'return false', oncut: 'return false', onpaste: 'return false', onkeypress: event => {
                  const char = String.fromCharCode( event.which );
                  if ( isNaN( char ) || event.target.innerText.length >= max_number_length - 1 ) event.preventDefault();
                } } ) );
              brick.style.gridColumnStart = numbers.length - i + 2 * k++;
            }
            brick.style.gridRowStart = i + 1;
          }
          pyramid.style.gridTemplateColumns = `repeat( ${ numbers.length * 2 }, ${ max_number_length / 2 }em )`;
          pyramid.style.gridTemplateRows = `repeat( ${ numbers.length }, auto )`;

          // set 'change' callback
          self.element.querySelectorAll( '#pyramid > div' ).forEach( ( brick, i ) =>
            brick.addEventListener( 'input', event => {
              const value = event.target.innerText;
              if ( value.startsWith( '0' ) && value !== '0' )
                event.target.innerText = parseInt( value );
              else
                self.onchange && self.onchange( { instance: self, element: event.target, section: i, value: parseInt( value ) } );
            } ) );
        }

        /** renders cancel, feedback and finish button */
        function renderButtons() {

          // render 'cancel' button (if needed)
          self.oncancel && renderButton( self.element.querySelector( '#cancel' ), self.captions.cancel, () => {
            self.logger && self.logger.log( 'cancel', self.getValue() );  // logging of 'cancel' event
            self.oncancel( self );                                        // perform 'cancel' callback
          } );

          // render 'feedback' button (if needed)
          self.feedback && renderButton( self.element.querySelector( '#feedback' ), self.captions.feedback, feedback );

          // render 'finish' button (if needed)
          self.onfinish && renderButton( self.element.querySelector( '#finish' ), self.captions.finish, onFinish );

          /** renders a single button */
          function renderButton( element, caption, click ) {
            $.setContent( element, $.html( self.html.button, { caption: caption, onclick: click } ) );
          }

          /** gives visual feedback about correctness of entered numbers */
          function feedback() {

            // iterate all bricks of the math pyramid
            self.element.querySelectorAll( '#pyramid > div' ).forEach( ( brick, i ) => {

              // skip lowest level of the math pyramid
              if ( brick.classList.contains( 'disabled' ) ) return;

              /**
               * entered user input equals solution
               * @type {boolean}
               */
              const correct = parseInt( brick.innerText ) === solutions[ i ];

              // give visual feedback
              brick.classList.remove( 'correct', 'wrong' );
              brick.contentEditable = false;
              brick.classList.add( correct ? 'correct' : 'wrong' );
              if ( self.solutions ) brick.innerText = solutions[ i ];

            } );

            self.logger && self.logger.log( 'feedback', self.getValue() );  // logging of 'feedback' event
            self.onfeedback && self.onfeedback( self );                     // perform 'feedback' callback
            updateFeedbackButton( true );                                   // (re)render 'feedback' button

            /**
             * (re)renders the feedback button
             * @param {boolean} [feedback] - user already sees feedback
             */
            function updateFeedbackButton( feedback ) {

              // no visual feedback? => abort
              if ( !self.feedback ) return;

              // user see's no feedback? => render 'feedback' button
              if ( !feedback )
                renderButton( self.element.querySelector( '#feedback' ), self.captions.feedback, feedback );
              // user see's feedback and retry is allowed? => render 'retry' button
              else if ( self.retry && !self.solutions )
                renderButton( self.element.querySelector( '#feedback' ), self.captions.retry, retry );
              // user see's feedback retry is not allowed? => disable 'feedback' button
              else
                self.element.querySelector( '#feedback button' ).disabled = true;

              /** removes the feedback and enables the input fields */
              function retry() {

                // remove visual feedback
                self.element.querySelectorAll( '#pyramid > div' ).forEach( brick => {
                  brick.classList.remove( 'correct', 'wrong' );
                  brick.contentEditable = true;
                } );

                self.logger && self.logger.log( 'retry', self.getValue() );  // logging of 'retry' event
                self.onretry && self.onretry( self );                        // perform 'retry' callback
                updateFeedbackButton();                                      // (re)render feedback button

              }

            }

          }

          /** removes 'finish' button and performs 'finish' actions */
          function onFinish() {
            $.remove( self.element.querySelector( '#finish' ) );          // remove 'finish' button
            self.logger && self.logger.log( 'finish', self.getValue() );  // logging of 'finish' event
            this.feedback && feedback();                                  // give visual feedback
            $.onFinish( self );                                           // perform 'finish' actions
          }

        }

      };

      /**
       * returns current result data
       * @returns {Object} current result data
       */
      this.getValue = () => {

        evaluate();                 // evaluate entered numbers
        return $.clone( results );  // return result data

        /** evaluates the entered numbers */
        function evaluate() {

          // set initial result data
          results = { sections: [], correct: 0, total: solutions.length - numbers.length };

          // iterate all bricks of the math pyramid
          self.element.querySelectorAll( '#pyramid > div' ).forEach( ( brick, i ) => {

            // skip lowest level of the math pyramid
            if ( brick.classList.contains( 'disabled' ) ) return;

            /**
             * entered user input equals solution
             * @type {boolean}
             */
            const correct = parseInt( brick.innerText ) === solutions[ i ];

            // add result data for this section
            correct && results.correct++;
            results.sections.push( {
              input:    parseInt( brick.innerText ),  // user input
              solution: solutions[ i ],               // correct solution
              correct:  correct                       // true: correct user input value
            } );

          } );

        }

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
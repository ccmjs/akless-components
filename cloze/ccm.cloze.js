/**
 * @overview ccm component for fill-in-the-blank texts
 * @author André Kless <andre.kless@web.de> 2017-2020
 * @license The MIT License (MIT)
 * @version latest (8.0.0)
 * @changes
 * version 8.0.0 (27.11.2020)
 * - uses ccm.js v26.1.0
 * - uses helper.mjs v6.0.0
 * - HTML templates based on lit-html
 * - input fields no more resizes on paste
 * - cancel button is now a reset button
 * - submit button is now a feedback button
 * - changed progress bar in conclusion area
 * - changed default instance configuration
 * - optional set of size for blank input field (config.size)
 * - updated behaviour of input field size
 * - updated minified component line
 * version 7.0.2 (11.11.2020):
 * - bug fix when text is given via object
 * version 7.0.1 (13.05.2020):
 * - uses ccm v25.5.2 as default
 * - uses helper.mjs v5.1.0 as default
 * version 7.0.0 (21.02.2020):
 * - progress bar on feedback is optional
 * - changed template property 'click' to 'onclick'
 * - uses HTML template file as default
 * - bug fix for no feedback on finish button
 * - uses helper.mjs v4.0.2 as default
 * - bug fix for HTML escaping
 * - updated dynamic placeholder size for solutions
 * - prevent escaped HTML in a keyword
 * (for older version changes see ccm.cloze-6.0.4.js)
 */

( () => {

  const component = {
    name: 'cloze',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.1.0.js',
    config: {
  //  "blank": true,
      "captions": {
        "start": "Start",
        "reset": "Reset",
        "feedback": "Feedback",
        "retry": "Retry",
        "finish": "Finish"
      },
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/cloze/resources/default.css" ],
  //  "data": { "store": [ "ccm.store" ] },
  //  "feedback": true,
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-6.0.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/cloze/resources/templates.mjs" ],
  //  "keywords": true,
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "mark": "*",
  //  "onchange": function ( instance, data ) { console.log( data ); },
  //  "onfeedback": function ( instance, data ) { console.log( data ); },
  //  "onfinish": { "restart": true },
  //  "oninput":  function ( instance, data ) { console.log( data ); },
  //  "onreset": function ( instance ) {},
  //  "onstart": function ( instance ) { console.log( 'Fill-in-the-blank text started' ); },
  //  "onvalidation": function ( instance, data ) { if ( data.gap % 2 ) data.correct = data.nearly = true; console.log( data ); },
  //  "progress_bar": true,
  //  "retry": true,
  //  "show_results": true,
  //  "size": 10,
  //  "solutions": true,
  //  "start_button": true,
      "text": "Hello, *(W)o(rl)d*! *Welcome*. This is an *Ex(amp)le*.",
  //  "time": 60,
  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "guest" ] ]
    },

    Instance: function () {
      const self = this; let $;

      /**
       * information data for each keyword
       * @type {Array}
       */
      const keywords_data = [];

      /**
       * result data
       * @type {Object}
       */
      let results = null;

      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // fill-in-the-blank text is given via inner HTML of own Custom Element? => use it with higher priority
        if ( this.inner && this.inner.innerHTML.trim() ) this.text = this.inner.innerHTML;

        // fill-in-the-blank text is given as object? => use the value of the 'inner' property
        if ( $.isObject( this.text ) ) this.text = this.text.inner;

        // change configuration for result mode
        if ( this.show_results ) {
          this.feedback = false;
          this.start_button = false;
          this.time = 0;
          this.onreset = false;
          this.onfinish = null;
        }

      };

      this.ready = async () => {

        const regex_keyword   = new RegExp( '\\' + this.mark + '.+?\\' + this.mark, 'g' );        // regular expression for finding all gaps/keywords in the text
        const regex_keyword_  = new RegExp( '\\' + this.mark + '.+?\\' + this.mark + '.', 'g' );  // regular expression for finding all gaps/keywords in the text plus next character
        const regex_given     = /\(.+?\)/g;                                                       // regular expression for finding all given characters of a keyword
        const regex_reference = /^#(\d+)$/;                                                       // regular expression for finding a gap reference

        // iterate all keywords in the text to determine the information data for each keyword
        ( this.text.match( regex_keyword ) || [] ).forEach( keyword => {

          // remove distinguishing characteristic '*'
          keyword = keyword.substr( 1, keyword.length - 2 );

          // prevent escaped HTML in a keyword
          keyword = $.unescapeHTML( keyword );

          // the same as a previous gap? => use reference of previous gap
          if ( regex_reference.test( keyword ) ) return keywords_data.push( keywords_data[ keyword.substr( 1 ) - 1 ] );

          const entry = [];
          const split = keyword.split( '/' );
          split.forEach( ( value, i ) => {
            if ( value.endsWith( '<' ) && i + 1 < split.length ) {
              split[ i + 1 ] = split[ i ] + '/' + split[ i + 1 ];
              return;
            }
            entry.push( determineKeywordData( value.trim() ) );
          } );
          keywords_data.push( entry );

          function determineKeywordData( keyword ) {

            // replace all given characters of a keywords with '*'
            const keyw__d = keyword.replace( '*', '#' ).replace( regex_given, given => {
              const length = given.length - 2;
              given = '';
              for ( let i = 0; i < length; i++ )
                given += '*';
              return given;
            } );

            // determine given characters and hold this information in a single number (disadvantage: possible positions
            let givens = 0;                                                      // for given letters in a word are 0-31
            for ( let i = 0; i < keyw__d.length; i++ )                           // because of data type limitations)
              if ( keyw__d.charAt( i ) === '*' ) givens += Math.pow( 2, i );

            // determine solution word
            keyword = keyword.replace( regex_given, given => given.substr( 1, given.length - 2 ) );

            // determine placeholder value
            let placeholder = '';
            if ( !self.blank )
              for ( let j = 0; j < keyword.length; j++ )
                placeholder += Math.pow( 2, j ) & givens ? keyword.charAt( j ) : '_';

            return { word: keyword, placeholder: placeholder };
          }

        } );

        // replace gaps/keywords with empty span elements
        this.text = this.text.replace( regex_keyword_, match => '<span class="gap"></span>' + ( match.slice( -1 ) === ' ' ? '&nbsp;' : match.slice( -1 ) ) );

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        results = { sections: [] };                  // set initial result data
        this.logger && this.logger.log( 'render' );  // logging of 'render' event

        // render start button or start fill-in-the-blank text directly
        if ( this.start_button )
          $.render( $.html( this.html.startButton, this.captions.start, start ), this.element );
        else
          await start();

        /** starts the fill-in-the-blank text */
        async function start() {

          const dataset = await $.dataset( self.data );                   // get initial values for text gaps
          self.logger && self.logger.log( 'start', $.clone( dataset ) );  // logging of 'start' event

          /**
           * predefined answers for text gaps
           * @type {string[]}
           */
          const keywords = self.keywords === true ? keywords_data.map( keyword => keyword[ 0 ].word ) : self.keywords;

          // generated list of predefined answers? => sort predefined answers lexicographical
          self.keywords === true && keywords.sort( ( a, b ) => a.localeCompare( b ) );

          $.render( $.html( self.html.main, self, keywords ), self.element );  // prepare main HTML structure
          self.element.querySelector( '#text' ).innerHTML = self.text;         // render text including gaps

          // determine size of longest solution word
          let max_length = 0;
          keywords_data.forEach( keyword => keyword.forEach( keyword => {
            if ( keyword.word.length > max_length ) max_length = keyword.word.length;
          } ) );

          // render a input field into each gap
          self.element.querySelectorAll( '.gap' ).forEach( ( gap_elem, i ) => {

            const value = $.deepValue( dataset, 'sections.' + i + '.input' );
            const size = self.blank ? this.size || max_length : keywords_data[ i ][ 0 ].word.length;
            const maxlength = self.blank ? '' : size;
            const onInput = () => {
              const event_data = { gap: 1 + i, input: this.value };
              self.logger && self.logger.log( 'input', $.clone( event_data ) );
              self.oninput && self.oninput( self, $.clone( event_data ) );
            };
            const onChange = () => {
              const event_data = { gap: 1 + i, input: this.value };
              self.logger && self.logger.log( 'change', $.clone( event_data ) );
              self.onchange && self.onchange( self, $.clone( event_data ) );
            };

            // render input field
            $.render( $.html( self.html.inputField, value, keywords_data[ i ][ 0 ].placeholder, size * 1.11, maxlength, onInput, onChange ), gap_elem );

          } );

          // render buttons
          $.render( $.html( self.html.buttons, self, self.onreset !== false && onReset, self.feedback && evaluate, null, self.onfinish && onFinish ), self.element.querySelector( '#buttons' ) );

          self.time && renderTimer();            // render countdown timer
          self.show_results && evaluate();       // enabled result mode? => show results directly
          self.onstart && self.onstart( self );  // trigger 'onstart' event

          /** callback when 'Reset' button is clicked */
          function onReset() {
            if ( self.onreset ) return self.onreset( self );
            $.render( $.html( self.html.conclusion ), self.element.querySelector( '#conclusion' ) );
            self.start();
          }

          /** evaluates the fill-in-the-blank text and shows feedback */
          function evaluate() {

            // set initial state for detail information's of the gap results
            results.sections = []; results.correct = 0;

            // iterate over all gap input fields
            self.element.querySelectorAll( '.gap input' ).forEach( ( gap, i ) => {

              /**
               * event data (contains information's about the input field)
               * @type {Object}
               */
              const event_data = {
                gap:      1 + i,      // number of the text gap
                input:    gap.value,  // user input
                solution: [],         // list of correct solution words
                correct:  false,      // true: correct user input value
                nearly:   false       // true: almost correct user input value
              };

              // add solution information to event data
              event_data.solution = [];
              keywords_data[ i ].forEach( keyword => {
                event_data.solution.push( keyword.word );

                // determine correctness of the user input value
                if ( keyword.used ) return;
                gap.value = gap.value.trim();
                if ( gap.value === keyword.word ) { event_data.correct = true; results.correct++; }
                if ( gap.value.toLowerCase() === keyword.word.toLowerCase() ) { event_data.nearly = true; keyword.used = true; }
                self.onvalidation && !self.onvalidation( self, event_data );  // trigger individual 'validation' callback
              } );

              // give visual feedback for correctness
              gap.disabled = true;
              if ( self.feedback ) {
                if ( !event_data.nearly && self.solutions ) gap.value = '';
                if ( self.solutions ) {
                  let placeholder = '';
                  for ( let j = 0; j < keywords_data[ i ].length; j++ )
                    if ( !keywords_data[ i ][ j ].used ) { placeholder = keywords_data[ i ][ j ].word; break; }
                  gap.setAttribute( 'placeholder', placeholder );
                }
                gap.parentNode.classList.add( event_data.correct ? 'correct' : ( event_data.nearly ? 'nearly' : 'wrong' ) );
              }

              // set detail information's for current gap result
              results.sections.push( event_data );

            } );

            // restore original keywords information data
            keywords_data.forEach( keyword => keyword.forEach( keyword => delete keyword.used ) );

            if ( results.sections.length === 0 ) return;                       // no evaluation results? => abort
            self.logger && self.logger.log( 'feedback', $.clone( results ) );  // logging of 'feedback' event
            self.onfeedback && self.onfeedback( self, $.clone( results ) );    // trigger individual 'feedback' callback

            // update buttons
            $.render( $.html( self.html.buttons, self, self.onreset !== false && onReset, null, self.retry && retry, self.onfinish && onFinish ), self.element.querySelector( '#buttons' ) );

            // render progress bar in conclusion area
            self.progress_bar && self.feedback && $.render( $.html( self.html.conclusion, results.correct, keywords_data.length ), self.element.querySelector( '#conclusion' ) );

          }

          /** removes the feedback and enables the input fields */
          function retry() {

            // logging of 'retry' event
            self.logger && self.logger.log( 'retry' );

            // remove visual feedback from each text gap
            self.element.querySelectorAll( '.gap' ).forEach( ( gap, i ) => {
              gap.classList.remove( 'correct', 'nearly', 'wrong' );
              const input = gap.querySelector( 'input' );
              input.disabled = false;
              input.placeholder = keywords_data[ i ][ 0 ].placeholder;
            } );

            // update buttons
            $.render( $.html( self.html.buttons, self, self.onreset !== false && onReset, evaluate, null, self.onfinish && onFinish ), self.element.querySelector( '#buttons' ) );

            // hide conclusion area
            $.render( $.html( self.html.conclusion ), self.element.querySelector( '#conclusion' ) );

          }

          /** finishes the fill-in-the-blank text */
          async function onFinish() {

            results.sections.length === 0 && evaluate();                     // no evaluation results? => evaluate now
            results.total = results.sections.length;                         // add total number of gaps in result data

            // update buttons and remove progress bar
            $.render( $.html( self.html.buttons, self, onReset ), self.element.querySelector( '#buttons' ) );
            $.render( $.html( self.html.conclusion ), self.element.querySelector( '#conclusion' ) );

            self.logger && self.logger.log( 'finish', $.clone( results ) );  // logging of 'finish' event
            $.onFinish( self );                                              // trigger finish actions

          }

          /** renders the countdown timer */
          function renderTimer() {

            /**
             * number of seconds remaining
             * @type {number}
             */
            let countdown = self.time;

            // start timer
            timer();

            /** updates countdown timer (recursive function) */
            function timer() {

              if ( results.total ) return;                                // is already finished? => stop timer
              const timer_elem = self.element.querySelector( '#timer' );  // HTML element that contains the timer value
              $.setContent( timer_elem, countdown );                      // (re)render timer value

              // countdown
              if ( countdown-- )
                window.setTimeout( timer, 1000 );  // recursive call
              else
                self.feedback ? evaluate() : onFinish();  // finish at timeout

            }

          }

        }

      };

      /**
       * returns current result data
       * @returns {Object} result data
       */
      this.getValue = () => results;

    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
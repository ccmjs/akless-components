/**
 * @overview ccm component for fill-in-the-blank texts
 * @author André Kless <andre.kless@web.de> 2017-2020
 * @license The MIT License (MIT)
 * @version 7.0.0
 * @changes
 * version 7.0.0 (21.02.2020):
 * - progress bar on feedback is optional
 * - changed template property 'click' to 'onclick'
 * - uses HTML template file as default
 * - bug fix for no feedback on finish button
 * - uses helper.mjs v4.0.2 as default
 * - bug fix for HTML escaping
 * (for older version changes see ccm.cloze-6.0.4.js)
 */

( () => {

  const component = {

    name: 'cloze', version: [ 7, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.0.0.js',

    config: {
  //  "blank": true,
  //  "cancel_button": true,
      "captions": {
        "start": "Start",
        "cancel": "Cancel",
        "submit": "Submit",
        "retry": "Retry",
        "finish": "Finish"
      },
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/cloze/resources/default.css" ],
  //  "data": { "store": [ "ccm.store" ] },
      "feedback": true,
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.0.2.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/cloze/resources/templates.html" ],
      "keywords": true,
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "mark": "*",
  //  "oncancel": function ( instance ) { console.log( 'Fill-in-the-blank text canceled' ); },
  //  "onchange": function ( instance, data ) { console.log( data ); },
  //  "onfeedback": function ( instance, data ) { console.log( data ); },
  //  "onfinish": { "restart": true },
  //  "oninput":  function ( instance, data ) { console.log( data ); },
  //  "onstart": function ( instance ) { console.log( 'Fill-in-the-blank text started' ); },
  //  "onvalidation": function ( instance, data ) { if ( data.gap % 2 ) data.correct = data.nearly = true; console.log( data ); },
  //  "progress_bar": true,
      "retry": true,
  //  "show_results": true,
  //  "solutions": true,
  //  "start_button": true,
      "text": "Hello, *(W)o(rl)d*! *Welcome*. This is an *Ex(amp)le*.",
  //  "time": 60,
  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]
    },

    Instance: function () {

      const self = this;
      let $;

      /**
       * information data for each keyword
       * @type {Array}
       */
      let keywords = [];

      /**
       * result data
       * @type {Object}
       */
      let results = null;

      this.init = async () => {

        // fill-in-the-blank text is given via inner HTML of own Custom Element? => use it with higher priority
        if ( self.inner && self.inner.innerHTML.trim() ) self.text = self.inner.innerHTML;

        // change configuration for result mode
        if ( self.show_results ) {
          self.feedback = false;
          self.start_button = false;
          self.time = 0;
          self.cancel_button = false;
          self.onfinish = null;
        }

      };

      this.ready = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, self.ccm.helper, self.helper );

        const regex_keyword   = new RegExp( '\\' + self.mark + '.+?\\' + self.mark, 'g' );  // regular expression for finding all gaps/keywords in the text
        const regex_given     = /\(.+?\)/g;                                                 // regular expression for finding all given characters of a keyword
        const regex_reference = /^#(\d+)$/;                                                 // regular expression for finding a gap reference

        // iterate all keywords in the text to determine the information data for each keyword
        ( self.text.match( regex_keyword ) || [] ).forEach( keyword => {

          // remove distinguishing characteristic '*'
          keyword = keyword.substr( 1, keyword.length - 2 );

          // the same as a previous gap? => use reference of previous gap
          if ( regex_reference.test( keyword ) ) return keywords.push( keywords[ keyword.substr( 1 ) - 1 ] );

          const entry = [];
          keyword.split( /(?<!<)\// ).forEach( keyword => entry.push( determineKeywordData( keyword.trim() ) ) );
          keywords.push( entry );

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

            return {
              word: keyword.replace( regex_given, given => given.substr( 1, given.length - 2 ) ),
              givens: givens
            };

          }

        } );

        // replace gaps/keywords with empty span elements
        self.text = self.text.replace( regex_keyword, '<span class="gap"></span>' );

        // logging of 'ready' event
        self.logger && self.logger.log( 'ready', $.privatize( self, true ) );

      };

      this.start = async () => {

        // set initial result data
        results = { sections: [] };

        // logging of 'render' event
        self.logger && self.logger.log( 'render' );

        // user must click on a start button before fill-in-the-blank text is starting? => render start button
        if ( self.start_button ) $.setContent( self.element, $.html( self.html.start, { caption: self.captions.start, onclick: start } ) );
        // no need for a start button? => start fill-in-the-blank text directly
        else await start();

        /** starts the fill-in-the-blank text */
        async function start() {

          // get initial values for input fields
          const dataset = await $.dataset( self.data );

          // logging of 'start' event
          self.logger && self.logger.log( 'start', $.clone( dataset ) );

          // prepare main HTML structure
          const main_elem = $.html( self.html.main );

          // select inner containers (mostly for buttons)
          const   text_elem = main_elem.querySelector( '#text'   );
          const cancel_elem = main_elem.querySelector( '#cancel' );
          const submit_elem = main_elem.querySelector( '#submit' );
          const finish_elem = main_elem.querySelector( '#finish' );
          const  timer_elem = main_elem.querySelector( '#timer'  );

          // remove unneeded buttons
          !self.cancel_button && $.remove( cancel_elem );
          !self.feedback      && $.remove( submit_elem );

          // add content for inner containers
          renderKeywords();
          renderText();
          renderInitialButtons();
          renderTimer();

          // set content of own website area
          $.setContent( self.element, main_elem );

          // enabled result mde? => show results directly
          self.show_results && evaluate();

          // has individual 'start' callback? => perform it
          self.onstart && self.onstart( self );

          /**
           * @summary renders given keywords for text gaps
           * @description
           * Keywords could be given (individual) via instance configuration (my.keywords is string array)
           * or (automatic generated) via private variable 'keywords' (my.keywords is boolean true).
           */
          function renderKeywords() {

            /**
             * container for keywords
             * @type {Element}
             */
            const keywords_elem = main_elem.querySelector( '#keywords' );

            // rendering of given keywords not wanted? => abort and remove container for keywords and abort
            if ( !self.keywords ) return $.remove( keywords_elem );

            /**
             * contains inner container for each keyword
             * @type {Array}
             */
            const entries = [];

            // prepare keyword containers
            ( self.keywords === true ? keywords : self.keywords ).forEach( keyword => {
              entries.push( $.html( self.html.keyword, {
                keyword: $.escapeHTML( self.keywords === true ? keyword[ 0 ].word : keyword ),
                onclick: function () { this.classList.toggle( 'marked' ); }
              } ) );
            } );

            // generated keyword list? => sort keywords lexicographical (keyword order gives no hint about correct solution)
            if ( self.keywords === true )
              entries.sort( ( a, b ) => a.innerHTML.localeCompare( b.innerHTML ) );

            // add each inner keyword container to container for keywords
            entries.forEach( entry => keywords_elem.appendChild( entry ) );

          }

          /** renders the fill-in-the-blank text */
          function renderText() {

            // render text with containing gaps
            text_elem.innerHTML = self.text;

            let size = 0;
            keywords.forEach( keyword => keyword.forEach( keyword => {
              if ( keyword.word.length > size ) size = keyword.word.length;
            } ) );

            // iterate over all gap => render input field into each gap
            [ ...main_elem.querySelectorAll( '.gap' ) ].forEach( ( gap_elem, i ) => {

              // prepare ccm HTML data for the input field
              const input = $.html( self.html.input, { oninput: onInput, onchange: onChange } );

              // set initial value
              if ( dataset && dataset.sections && dataset.sections[ i ] && dataset.sections[ i ].input ) input.value = dataset.sections[ i ].input;

              // resizing of the input field
              input.onkeypress = input.onkeydown = function () { this.size = this.value.length > 10 ? this.value.length : 10; };
              input.onpaste = function () { window.setTimeout( () => this.size = this.value.length > 10 ? this.value.length : 10, 0 ); };

              // no blank input fields? => set placeholder attribute (gives informations about the characters of the searched word)
              if ( !self.blank ) {
                const keyword = keywords[ i ][ 0 ].word;
                input.placeholder = '';
                for ( let j = 0; j < keyword.length; j++ )
                  input.placeholder += Math.pow( 2, j ) & keywords[ i ][ 0 ].givens ? keyword.charAt( j ) : '_';
              }

              // render input field in the current gap
              gap_elem.appendChild( $.html( input ) );

              /** callback for 'input' event */
              function onInput() {

                /**
                 * event data (contains informations about the input field)
                 * @type {Object}
                 */
                const event_data = { gap: 1 + i, input: this.value };

                // logging of 'input' event
                self.logger && self.logger.log( 'input', $.clone( event_data ) );

                // has individual 'input' callback? => perform it
                self.oninput && self.oninput( self, $.clone( event_data ) );

              }

              /** callback for 'change' event */
              function onChange() {

                /**
                 * event data (contains informations about the input field)
                 * @type {Object}
                 */
                const event_data = { gap: 1 + i, input: this.value };

                // logging of 'change' event
                self.logger && self.logger.log( 'change', $.clone( event_data ) );

                // has individual 'change' callback? => perform it
                self.onchange && self.onchange( self, $.clone( event_data ) );

              }

            } );
          }

          /** renders the buttons */
          function renderInitialButtons() {

            // render 'cancel' button (if needed)
            self.cancel_button && renderButton( cancel_elem, self.captions.cancel, () => self.oncancel ? self.oncancel( self ) : self.start( callback ) );

            // render 'submit' button (if needed)
            self.feedback && renderButton( submit_elem, self.captions.submit, evaluate );

            // render 'finish' button (if needed)
            self.onfinish && renderButton( finish_elem, self.captions.finish, onFinish );

          }

          /** renders the timer */
          function renderTimer() {

            // no limited time? => remove timer button and abort
            if ( !self.time || ( !self.onfinish && !self.feedback ) ) return $.remove( timer_elem );

            /**
             * given seconds for working with the quiz
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
                window.setTimeout( timer, 1000 );  // recursive call
              else
                self.feedback ? evaluate() : onFinish();  // finish at timeout

            }

          }

          /** evaluates the fill-in-the-blank text and shows feedback */
          function evaluate() {

            // set initial state for detail informations of the gap results
            results.sections = []; results.correct = 0;

            // iterate over all gap input fields
            [ ...main_elem.querySelectorAll( '.gap input' ) ].forEach( ( gap, i ) => {

              /**
               * event data (contains informations about the input field)
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
              keywords[ i ].forEach( keyword => {
                event_data.solution.push( keyword.word );

                // determine correctness of the user input value
                if ( keyword.used ) return;
                gap.value = gap.value.trim();
                if ( gap.value === keyword.word ) { event_data.correct = true; results.correct++; }
                if ( gap.value.toLowerCase() === keyword.word.toLowerCase() ) { event_data.nearly = true; keyword.used = true; }
                self.onvalidation && !self.onvalidation( self, event_data );  // has individual 'validation' callback? => perform it
              } );

              // give visual feedback for correctness
              gap.disabled = true;
              if ( self.feedback ) {
                if ( !event_data.nearly && self.solutions ) gap.value = '';
                if ( self.solutions ) {
                  let placeholder = '';
                  for ( let j = 0; j < keywords[ i ].length; j++ )
                    if ( !keywords[ i ][ j ].used ) { placeholder = keywords[ i ][ j ].word; break; }
                  gap.setAttribute( 'placeholder', placeholder );
                  placeholder.length <= 0 ? gap.size = gap.value.length || gap.size : gap.size = placeholder.length || gap.size;
                }
                gap.parentNode.classList.add( event_data.correct ? 'correct' : ( event_data.nearly ? 'nearly' : 'wrong' ) );
              }

              // set detail informations for current gap result
              results.sections.push( event_data );

            } );

            // restore original keywords information data
            keywords.forEach( keyword => keyword.forEach( keyword => delete keyword.used ) );

            // no evaluation results? => abort
            if ( results.sections.length === 0 ) return;

            // logging of 'feedback' event
            self.logger && self.logger.log( 'feedback', $.clone( results ) );

            // has individual 'feedback' callback? => perform it
            self.onfeedback && self.onfeedback( self, $.clone( results ) );

            // change buttons
            updateButtons( true );

            // render feedback for results
            self.progress_bar && self.feedback && renderProgressBar( results.correct );

            function renderProgressBar( correct ) {
              $.setContent( main_elem.querySelector( '#conclusion' ), $.html( self.html.feedback, { points: correct + '/' + keywords.length } ) );
              const goal = correct * main_elem.querySelector( '#feedback' ).offsetWidth / keywords.length; //parseInt( self.element.querySelector( '#progress-bar' ).style.width, 10);
              let width = 1;
              let id = setInterval( frame, 10 );

              function frame() {
                if ( width >= goal || !main_elem.querySelector( '#progress-bar' ) )
                  clearInterval( id );
                else {
                  width++;
                  main_elem.querySelector( '#progress-bar' ).style.width = width + 'px';
                }
              }

            }

          }

          /** removes the feedback and enables the input fields */
          function retry() {

            // clear conclusion area
            $.setContent( main_elem.querySelector( '#conclusion' ), '' );

            // iterate over all gap input fields
            [ ...self.element.querySelectorAll( '.gap' ) ].forEach( gap => {

              // remove visual feedback
              gap.classList.remove( 'correct', 'nearly', 'wrong' );
              const input = gap.querySelector( 'input' );
              input.disabled = false;

            } );

            // logging of 'retry' event
            self.logger && self.logger.log( 'retry' );

            // change buttons
            updateButtons( false );

          }

          /**
           * (re)renders the buttons
           * @param {boolean} evaluated - fill-in-the-blank text is evaluated
           */
          function updateButtons( evaluated ) {

            // no visual feedback? => abort
            if ( !self.feedback ) return;

            // the fill-in-the-blank text is not evaluated? => render 'submit' button
            if ( !evaluated )
              renderButton( submit_elem, self.captions.submit, evaluate );
            // evaluated and retry is allowed? => render 'retry' button
            else if ( self.retry && !self.solutions )
              renderButton( submit_elem, self.captions.retry, retry );
            // evaluated without retry? => disable 'submit' button
            else
              submit_elem.querySelector( 'button' ).disabled = true;

          }

          /** renders a single button */
          function renderButton( element, caption, click ) {

            $.setContent( element, $.html( self.html.button, {
              caption: caption,
              onclick: click
            } ) );

          }

          /** finishes the fill-in-the-blank text */
          async function onFinish() {

            // no finish button? => abort
            if ( !self.onfinish ) return;

            // no evaluation results? => evaluate fill-in-the-blank text
            results.sections.length === 0 && evaluate();

            // make sure that user could not use 'finish' button again
            $.remove( finish_elem );
            $.remove(  timer_elem );

            // add total number of gaps in result data
            results.total = results.sections.length;

            // logging of 'finish' event
            self.logger && self.logger.log( 'finish', $.clone( results ) );

            // perform 'finish' actions and provide result data
            $.onFinish( self );

          }

        }

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
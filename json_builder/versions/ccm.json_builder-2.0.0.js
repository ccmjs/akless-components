/**
 * @overview ccm component for JSON builder
 * @author André Kless <andre.kless@web.de> 2018-2020
 * @license The MIT License (MIT)
 * @version 2.0.0
 * @changes
 * version 2.0.0 (25.02.2020):
 * - uses ccm v25.0.0
 * - uses HTML template file as default
 * - uses editor codemirror.js
 * - changed event object parameters
 * (for older version changes see ccm.json_builder-1.4.3.js)
 */

( () => {

  const component = {

    name: 'json_builder', version: [ 2, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.0.0.js',

    config: {

      "autofocus": true,
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/json_builder/resources/default.css" ],
      "data": {},
  //  "directly": true,
      "editor": [ 'ccm.load', [
        "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/codemirror.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/codemirror.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/addon/fold/foldgutter.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/mode/javascript/javascript.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/addon/edit/matchbrackets.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/addon/lint/json-lint.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/addon/fold/foldcode.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/addon/fold/foldgutter.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/addon/fold/brace-fold.min.js",
        "https://codemirror.net/addon/display/autorefresh.js"
      ] ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.0.2.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/json_builder/resources/templates.html" ],
  //  "ignore": { "defaults": { "foo": "baz" } },
      "line_numbers": true,
      "line_wrapping": true,
      "fold_code": true,
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "nosubmit": true,
  //  "oninput": event => console.log( 'input event', event.instance.getValue() ),
  //  "onchange": event => console.log( 'change event', event.instance.getValue() ),
  //  "onfinish": ( instance, results ) => console.log( results ),
  //  "replacer": ( key, value ) => typeof value === 'string' ? undefined : value,
      "space": 2

    },

    Instance: function () {

      let $, dataset, tmp;

      this.ready = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper );

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // get dataset that contains initial JSON
        dataset = await $.dataset( this.data );

        // given default values? => integrate them as defaults into initial values
        if ( this.ignore ) dataset = await $.integrate( this.ignore.defaults, dataset, true );

        // get data management properties to safety
        tmp = $.privatize( dataset, 'key', 'meta', 'created_at', 'updated_at', '_' );

        // prepare dataset
        if ( this.directly ) dataset = { json: dataset };
        if ( !dataset.json ) dataset.json = {};
        if ( !dataset.valid ) dataset.valid = true;

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // prepare main HTML structure
        $.setContent( this.element, $.html( this.html, {
          onclick: event => {

            // prevent page reload
            event && event.preventDefault();

            // logging of 'finish' event
            this.logger && this.logger.log( 'finish', this.getValue() );

            // provide result data
            $.onFinish( this );

          }
        } ) );

        // no submit button? => remove it
        this.nosubmit && $.remove( this.element.querySelector( '#button' ) );

        // put JSON string in input element
        this.element.querySelector( '#input' ).value = $.stringify( dataset.json, this.replacer, this.space );

        // transform textarea to code editor
        const editor = CodeMirror.fromTextArea( this.element.querySelector( '#input' ), {
          autofocus: this.autofocus,
          autoRefresh: true,
          lineNumbers: this.line_numbers,
          lineWrapping: this.line_wrapping,
          lint: true,
          matchBrackets: true,
          mode: { name: 'javascript', json: true },
          foldGutter: this.fold_code,
          gutters: [ 'CodeMirror-linenumbers', 'CodeMirror-foldgutter' ],
        } );
        editor.on( 'blur', async () => {

          // logging of 'change' event
          this.logger && this.logger.log( 'change', this.getValue() );

          // perform individual 'change' callback
          this.onchange && await this.onchange( { instance: this, editor: editor } );

        } );
        editor.on( 'change', async () => {

          /**
           * input element value
           * @type {string}
           */
          let value = editor.getValue();

          // add evaluated JSON to result data
          try { dataset.json = $.solveDotNotation( $.parse( value ) ); dataset.valid = true; } catch ( err ) { dataset.valid = false; }

          // show feedback for valid/invalid JSON
          this.element.querySelector( '.CodeMirror' ).classList[ dataset.valid ? 'remove' : 'add' ]( 'invalid' );

          // button is disabled when JSON is invalid
          const button = this.element.querySelector( '#button' );
          if ( button )
            if ( dataset.valid )
              button.removeAttribute( 'disabled' );
            else
              button.setAttribute( 'disabled', true );

          // logging of 'input' event
          this.logger && this.logger.log( 'input', this.getValue() );

          // perform individual 'input' callback
          this.oninput && await this.oninput( { instance: this, editor: editor } );

        } );

      };

      /**
       * returns true if current result data is valid
       * @returns {boolean}
       */
      this.isValid = () => dataset.valid;

      /**
       * returns current result data
       * @returns {Object} result data
       */
      this.getValue = () => Object.assign( this.directly ? dataset.json : dataset, tmp );

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
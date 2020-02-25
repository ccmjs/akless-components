/**
 * @overview ccm component for JSON builder
 * @author André Kless <andre.kless@web.de> 2018-2019
 * @license The MIT License (MIT)
 * @version latest (1.4.3)
 * @changes
 * version 1.4.3 (19.10.2019):
 * - uses ccm v24.1.1
 * version 1.4.2 (10.10.2019):
 * - uses ccm v24.0.1
 * version 1.4.1 (05.07.2019):
 * - meta property is not editable
 * - uses ccm v21.1.1
 * version 1.4.0 (03.06.2019):
 * - added config property 'nosubmit'
 * - uses ccm v20.7.2
 * version 1.3.0 (23.01.2019):
 * - added instance method 'isValid():boolean'
 * - uses ccm v20.0.0
 * version 1.2.0 (15.11.2018): accepts defaults for initial data
 * version 1.1.1 (15.11.2018):
 * - solved dot notation in result data
 * - bug fix for event and logging data
 * - uses ccm v18.6.0
 * version 1.1.0 (25.09.2018): added directly mode
 * version 1.0.0 (23.09.2018)
 */

( () => {

  const component = {

    name: 'json_builder',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-24.1.1.js',

    config: {

      "html": {
        "tag": "form",
        "onsubmit": "%onclick%",
        "inner": [
          {
            "tag": "textarea",
            "id": "input",
            "oninput": "%oninput%",
            "onchange": "%onchange%"
          },
          {
            "tag": "input",
            "id": "button",
            "type": "submit",
            "onclick": "%onclick%"
          }
        ]
      },
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/json_builder/resources/default.css" ],
      "data": {},
      "space": 2,
      "editor": [ 'ccm.load', [ "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/codemirror.min.js"],
       [ "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/codemirror.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/mode/javascript/javascript.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/addon/edit/matchbrackets.min.js",
         "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/addon/lint/json-lint.min.js" ]
      ],

  //  "replacer": ( key, value ) => typeof value === 'string' ? undefined : value,
  //  "directly": true,
  //  "nosubmit": true,
  //  "ignore": { "defaults": { "foo": "baz" } },
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "oninput": function ( event ) { console.log( 'input event', this.getValue(), event.target ) },
  //  "onchange": function ( event ) { console.log( 'change event', this.getValue(), event.target ) },
  //  "onfinish": ( instance, results ) => console.log( results )

    },

    Instance: function () {

      let $, dataset, tmp;

      const self = this;

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

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
          onchange: event => {

            // logging of 'change' event
            this.logger && this.logger.log( 'change', code_editor.getValue() );

            // perform individual 'change' callback
            this.onchange && this.onchange.call( this, event );

          },
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
        this.nosubmit && $.removeElement( this.element.querySelector( '#button' ) );

        // put JSON string in input element
        this.element.querySelector( '#input' ).value = $.stringify( dataset.json, this.replacer, this.space );

        let code_editor = CodeMirror.fromTextArea( this.element.querySelector( '#input' ), {
          value:  this.element.querySelector( '#input' ).value,
          autofocus: true,
          lineNumbers: true,
          lineWrapping: true,
          foldGutter: true,
          matchBrackets: true,
          autoCloseBrackets: true,
          mode: "application/ld+json",
          lint: true
      }).on( 'change' , function ( editor ) {
          /**
           * input element value
           * @type {string}
           */
          let value = editor.getValue();

          // add evaluated JSON to result data
          try { dataset.json = $.solveDotNotation( $.parse( value ) ); dataset.valid = true; } catch ( err ) { dataset.valid = false; }

          // show feedback for valid/invalid JSON
          feedback( dataset.valid );

          // button is disabled when JSON is invalid
          const button = self.element.querySelector( '#button' );
          if ( button )
            if ( dataset.valid )
              button.removeAttribute( 'disabled' );
            else
              button.setAttribute( 'disabled', true );

          // logging of 'input' event
          self.logger && self.logger.log( 'input', editor.getValue() );

          // perform individual 'input' callback
          self.oninput && self.oninput.call( self, editor );

          /** shows feedback for valid/invalid JSON */
          function feedback( valid ) { self.element.querySelector( '.CodeMirror' ).classList[ valid ? 'remove' : 'add' ]( 'invalid' ) }

        } );

      };

      /**
       * returns true if current result data is valid
       * @returns {boolean}
       */
      this.isValid = () => dataset.valid;

      /**
       * returns current result data
       * @returns {Object} current result data
       */
      this.getValue = () => Object.assign( this.directly ? dataset.json : dataset, tmp );

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
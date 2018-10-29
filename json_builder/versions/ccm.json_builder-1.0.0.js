/**
 * @overview ccm component for JSON builder
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 * @version 1.0.0
 * @changes
 * version 1.0.0 (23.09.2018)
 */

( function () {

  const component = {

    name: 'json_builder',

    version: [ 1, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.0.0.js',

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
      "space": 2

  //  "replacer": ( key, value ) => typeof value === 'string' ? undefined : value,
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "oninput": ( instance, expression ) => console.log( expression ),
  //  "onchange": ( instance, expression ) => console.log( expression ),
  //  "onfinish": ( instance, results ) => console.log( results )

    },

    Instance: function () {

      let $, dataset;

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // get dataset that contains initial JSON
        dataset = await $.dataset( this.data );

        // set required properties
        if ( !dataset.json ) dataset.json = {};
        if ( !dataset.valid ) dataset.valid = true;

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // prepare main HTML structure
        $.setContent( this.element, $.html( this.html, {
          oninput: () => {

            /**
             * input element
             * @type {Element}
             */
            const input_elem = this.element.querySelector( '#input' );

            /**
             * input element value
             * @type {string}
             */
            let value = input_elem.value;

            // add evaluated JSON to result data
            try { dataset.json = JSON.parse( value ); dataset.valid = true; } catch ( err ) { dataset.valid = false; }

            // show feedback for valid/invalid JSON
            feedback( dataset.valid );

            // button is disabled when JSON is invalid
            const button = this.element.querySelector( '#button' );
            if ( button )
              if ( dataset.valid )
                button.removeAttribute( 'disabled' );
              else
                button.setAttribute( 'disabled', true );

            // logging of 'input' event
            this.logger && this.logger.log( 'input', $.clone( dataset ) );

            // perform individual 'input' callback
            this.oninput && this.oninput( this, $.clone( dataset ) );

            /** shows feedback for valid/invalid JSON */
            function feedback( valid ) { input_elem.classList[ valid ? 'remove' : 'add' ]( 'invalid' ) }

          },
          onchange: () => {

            // logging of 'change' event
            this.logger && this.logger.log( 'change', $.clone( dataset ) );

            // perform individual 'change' callback
            this.onchange && this.onchange( this );

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

        // put JSON string in input element
        this.element.querySelector( '#input' ).value = JSON.stringify( dataset.json, this.replacer, this.space );

      };

      /**
       * returns current result data
       * @returns {Object} current result data
       */
      this.getValue = () => $.clone( dataset );

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
/**
 * @overview ccm-based web component for submitting data
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 * @version 3.1.0
 * @changes
 * version 3.1.0 (04.05.2018):
 * - Light DOM could be given as ccm HTML data
 * version 3.0.0 (02.05.2018): support of browser validation for input fields
 * - content is wrapped with a form element
 * - optional submit button must look like <input type="submit">
 * - added getValue() method for instances
 * - uses ccm v16.5.0
 * version 2.2.0 (29.04.2018)
 * - give only deep copies of results to outside
 * - bugfix for ccm-based input elements
 * - uses ccm v16.3.3
 * version 2.1.0 (14.04.2018): uses ccm v16.1.0 to support HTML encoding
 * version 2.0.0 (26.03.2018)
 * - without submit button no data can be sent (useful if you only want to display current state)
 * - a missing submit button will not be added automatically anymore
 * - uses ccm v16.0.0
 * version 1.0.1 (23.02.2018): bugfix for accepting string as Light DOM
 * version 1.0.0 (26.01.2018)
 */

{
  var component  = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'submit',

    /**
     * component version
     * @type {number[]}
     */
    version: [ 3, 1, 0 ],

    /**
     * reference to used framework version
     * @type {Object}
     */
    ccm: {
      url: 'https://ccmjs.github.io/ccm/versions/ccm-16.5.0.js',
      integrity: 'sha384-T7G337W0ODDj5MTIONvKmlJKZsbg6aNvkBXN/Yn7RZWGM7SUEZ0Qe2346QErahsU',
      crossorigin: 'anonymous'
    },

    /**
     * default instance configuration
     * @type {Object}
     */
    config: {

      "data": { "store": [ "ccm.store" ] }

  //  "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-4.0.0.js" ],
  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-4.0.1.js", { "realm": "demo" } ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onfinish": { "log": true }

    },

    /**
     * for creating instances of this component
     * @constructor
     */
    Instance: function () {

      /**
       * own reference for inner functions
       * @type {Instance}
       */
      let self = this;

      /**
       * privatized instance members
       * @type {Object}
       */
      let my;

      /**
       * shortcut to help functions
       * @type {Object}
       */
      let $;

      /**
       * contains collected data for each ccm-based input element
       * @type {Object[]}
       */
      const inputs = [];

      /**
       * contains the Light DOM and thus also the input elements
       * @type {Element}
       */
      let element;

      /**
       * is called once after the initialization and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.ready = callback => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        // no given Light DOM? => abort
        if ( !my.inner ) return callback();

        // Light DOM is given as string? => convert to DOM structure
        if ( typeof my.inner === 'string' ) {
          const div = document.createElement( 'div' );
          div.innerHTML = my.inner;
          my.inner = div;
        }

        // Light DOM is given as ccm HTML data? => convert it to Element Node
        if ( !$.isElementNode( my.inner ) ) my.inner = $.html( my.inner );

        // iterate all input elements
        [ ...my.inner.querySelectorAll( 'input' ) ].map( input => {

          const type = input.getAttribute( 'type' );
          switch ( type ) {
            case 'button':
            case 'checkbox':
            case 'color':
            case 'date':
            case 'datetime-local':
            case 'email':
            case 'file':
            case 'hidden':
            case 'image':
            case 'month':
            case 'number':
            case 'password':
            case 'radio':
            case 'range':
            case 'reset':
            case 'search':
            case 'submit':
            case 'tel':
            case 'text':
            case 'time':
            case 'url':
            case 'week':
              break; // do not touch standard HTML input elements

            default: // manage ccm-based input elements

              // check whether there is a dependent subcomponent in this config for this input type
              if ( !my[ type ] ) return;

              // create a loading symbol
              let loading = $.loading( self );

              // remember this loading element, the type und the name of this input element
              inputs.push( {
                elem: loading,
                type: type,
                name: input.name
              } );

              // replace input element with the loading symbol
              input.parentNode.replaceChild( loading, input );

          }

        } );

        // has logger instance? => log 'ready' event
        self.logger && self.logger.log( 'ready', $.clone( my ) );

        callback();
      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = callback => {

        // no given Light DOM? => abort
        if ( !my.inner ) { callback && callback(); return; }

        // has given content component? => process the Light DOM via the content component
        my.content ? my.content.start( { inner: my.inner }, proceed ) : proceed();

        /** @param {Object} content - ccm instance of content component */
        function proceed( content ) {

          // put LightDOM into ShadowDOM
          $.setContent( self.element, content ? content.root : my.inner );

          // remember element that contains the Light DOM
          element = content ? content.element : self.element;

          /**
           * submit button
           * @type {Element}
           */
          const submit = element.querySelector( 'input[type=submit]' );

          // has submit button?
          if ( submit ) {

            // submit button is disabled until all subcomponents are ready
            submit.disabled = true;

            // wrap own content with a form tag to support browser validation on input fields
            const form = document.createElement( 'form' );
            element.parentNode.replaceChild( form, element );
            form.appendChild( element );

            // set submit event
            form.onsubmit = () => {

              // has user instance? => login user (if not already logged in)
              if ( self.user ) self.user.login( proceed ); else proceed();

              // prevent page reload
              return false;

              function proceed() {

                /**
                 * resulting form data
                 * @type {Object}
                 */
                let results = self.getValue();

                // should events be logged? => log submit event
                if ( self.logger ) self.logger.log( 'submit', results );

                // perform 'finish' actions and provide result data
                self.onfinish && $.onFinish( self, results );

              }

            };

          }

          // get start values for input elements
          $.dataset( my.data, dataset => {

            // has logger instance? => log 'start' event
            self.logger && self.logger.log( 'start', $.clone( dataset ) );

            // fill input elements with the start values
            $.fillForm( element, dataset );

            /**
             * counter for parallel asynchronous operations
             * @type {number}
             */
            let counter = 1;

            // iterate over all collected data for ccm-based input elements
            inputs.map( input => {

              // start of a new asynchron operation => increment counter
              counter++;

              // create and start a ccm instance for each ccm-based input element
              my[ input.type ].start( {
                data: {
                  store: [ 'ccm.store', { config: dataset[ input.name ] } ],
                  key: 'config'
                }
              }, instance => {

                // add instance to collected data of this ccm-based input element
                input.instance = instance;

                // replace loading symbol with the instance content
                input.elem.parentNode.replaceChild( instance.root, input.elem );

                // check if this was the last asynchronous operation
                check();

              } );

            } );

            // check if no asynchronous operations were started
            check();

            /** check if all started asynchronous operations have been completed */
            function check() {

              // a asynchronous operation is finished => decrease counter
              counter--;

              // another started asynchronous operations is not finished yet? => abort
              if ( counter > 0 ) return;

              // submit button is enabled when all ccm-based input elements are ready
              if ( submit ) submit.disabled = false;

              // rendering completed => perform callback
              callback && callback();

            }

          } );

        }

      };

      /**
       * returns the resulting form data
       * @returns {Object} resulting form data
       */
      this.getValue = () => {

        /**
         * result data
         * @type {Object}
         */
        let results = $.formData( element );  // fetch values from HTML input elements

        // fetch values from ccm-based input elements (convention: ccm instance must have a 'getValue()' method)
        inputs.map( input => results[ input.name ] = input.instance.getValue() );

        // give only deep copies of results to outside
        return $.clone( results );

      }

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}
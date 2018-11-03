/**
 * @overview ccm component for submitting data
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 * @version 4.2.0
 * @changes
 * version 4.2.0 (29.10.2018): config property 'defaults' for default input values
 * version 4.1.0 (29.10.2018):
 * - added change callback
 * - uses ccm v18.1.0
 * version 4.0.0 (09.09.2018):
 * - uses ccm v18.0.0
 * - removed privatization of instance members
 * - ccm custom elements are no more replaced with normal div as root
 * version 3.1.2 (14.05.2018):
 * - bugfix for ccm-based input elements
 * version 3.1.1 (07.05.2018):
 * - deep copy of initial given Light DOM
 * - uses ccm v16.5.1
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

( function () {

  const component = {

    name: 'submit',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.1.0.js',

    version: [ 4, 2, 0 ],

    config: {

      "data": { "store": [ "ccm.store" ] }

  //  "defaults": { "name": "value" },
  //  "onchange": function ( event ) { console.log( 'change event', this, event, event.target ) },
  //  "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.0.js" ],
  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onfinish": { "log": true }

    },

    Instance: function () {

      let $;

      /**
       * contains collected data for each ccm-based input element
       * @type {Object[]}
       */
      let inputs;

      /**
       * contains the Light DOM and thus also the input elements
       * @type {Element}
       */
      let element;

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // no Light DOM? => abort
        if ( !this.inner ) return;

        /**
         * deep copy of initial Light DOM
         * @type {Element}
         */
        const inner = this.inner.cloneNode( true );

        // reset data for ccm-based input elements
        inputs = [];

        // iterate all input elements
        [ ...inner.querySelectorAll( 'input' ) ].forEach( input => {

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
              if ( !this[ type ] ) return;

              // create a loading symbol
              let loading = $.loading( this );

              // remember this loading element, type and name of this input element
              inputs.push( {
                elem: loading,
                type: type,
                name: input.name
              } );

              // replace input element with loading symbol
              input.parentNode.replaceChild( loading, input );

          }

        } );

        // iterate all submit relevant elements
        [ ...inner.querySelectorAll( '[name]' ) ].forEach( elem => {

          // set 'change' event
          elem.onchange = event => {

            /**
             * new element value
             * @type {*}
             */
            const value = $.deepValue( this.getValue(), elem.name );

            // logging of 'change' event
            this.logger && this.logger.log( 'change', { name: elem.name, value: $.clone( value ) } );

            // perform individual 'change' callback
            this.onchange && this.onchange.call( this, { name: elem.name, value: $.clone( value ), event: event } );

          };

        } );

        // has given content component? => process Light DOM via content component
        const content = this.content && await this.content.start( { inner: inner } );

        // put LightDOM into ShadowDOM
        $.setContent( this.element, content ? content.root : inner );

        // remember element that contains Light DOM
        element = content ? content.element : this.element;

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
          form.onsubmit = async event => {

            // prevent page reload
            event.preventDefault();

            // has user instance? => login user (if not already logged in)
            this.user && await this.user.login();

            /**
             * resulting form data
             * @type {Object}
             */
            let results = this.getValue();

            // logging of 'submit' event
            this.logger && this.logger.log( 'submit', results );

            // perform 'finish' actions and provide result data
            this.onfinish && await $.onFinish( this, results );

          };

        }

        // get start values for input elements
        let dataset = await $.dataset( this.data );

        // given default values? => integrate them as defaults into initial values
        dataset = $.integrate( this.defaults, dataset, true );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // fill input elements with the start values
        $.fillForm( element, dataset );

        // iterate over all collected data for ccm-based input elements
        for ( let i = 0; i < inputs.length; i++ ) {

          // create and start a ccm instance for each ccm-based input element
          const instance = await this[ inputs[ i ].type ].start( {
            data: {
              store: [ 'ccm.store', { config: dataset[ inputs[ i ].name ] } ],
              key: 'config'
            },
            onchange: () => {

              /**
               * current results of ccm instance
               * @type {Object}
               */
              const value = this.getValue();

              // logging of 'change' event
              this.logger && this.logger.log( 'change', { name: inputs[ i ].name, value: $.clone( value ), builder: instance } );

              // perform individual 'change' callback
              this.onchange && this.onchange.call( this, { name: inputs[ i ].name, value: $.clone( value ), builder: instance } );

            }
          } );

          // add instance to collected data of this ccm-based input element
          inputs[ i ].instance = instance;

          // replace loading symbol with the instance content
          inputs[ i ].elem.parentNode.replaceChild( instance.root, inputs[ i ].elem );

        }

        // submit button is enabled when all ccm-based input elements are ready
        if ( submit ) submit.disabled = false;

      };

      /**
       * returns resulting form data
       * @returns {Object} resulting form data
       */
      this.getValue = () => {

        /**
         * result data
         * @type {Object}
         */
        let results = $.formData( element );  // fetch values from HTML input elements

        // fetch values from ccm-based input elements (convention: ccm instance must have a 'getValue()' method)
        inputs.forEach( input => results[ input.name ] = input.instance.getValue() );

        // give only deep copies of results to outside
        return $.clone( results );

      }

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
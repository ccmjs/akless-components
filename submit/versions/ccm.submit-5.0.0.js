/**
 * @overview ccm component for submitting data
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 * @version 5.0.0
 * @changes
 * version 5.0.0 (05.11.2018):
 * - config property 'defaults' has moved inside new config property 'ignore'
 * - consider dot notation for initial value for ccm-based input elements
 * version 4.4.0 (03.11.2018): more than one input element inside of <several> elements
 * version 4.3.0 (03.11.2018):
 * - <several> elements for support of indefinite number of inputs
 * - uses ccm v18.3.0
 * - removed loading icon
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

    version: [ 5, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.3.0.js',

    config: {

      "html": {
        "class": "section",
        "inner": [
          { "class": "items" },
          {
            "class": "buttons",
            "inner": [
              {
                "tag": "a",
                "class": "del",
                "inner": " - ",
                "onclick": "%del%"
              },
              {
                "tag": "a",
                "class": "add",
                "inner": " + ",
                "onclick": "%add%"
              }
            ]
          }
        ]
      },
      "data": { "store": [ "ccm.store" ] }

  //  "ignore": { "defaults": { "name": "value" } },
  //  "onchange": function ( event ) { console.log( 'change event', this, event, event.target ) },
  //  "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.0.js" ],
  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onfinish": { "log": true }

    },

    Instance: function () {

      const self = this;
      let $;

      /**
       * contains collected data for each ccm-based input element
       * @type {Object[]}
       */
      let inputs;

      /**
       * contains Light DOM and thus also input elements
       * @type {Element}
       */
      let element;

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // add submit property with own component reference (for recursive reuse)
        this.submit = this.component;

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // no Light DOM? => abort
        if ( !this.inner ) return;

        // get start values for input elements
        let dataset = await $.dataset( this.data );

        // given default values? => integrate them as defaults into initial values
        if ( this.ignore ) dataset = $.integrate( this.ignore.defaults, dataset, true );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // reset data for ccm-based input elements
        inputs = [];

        /**
         * Light DOM
         * @type {Element}
         */
        const inner = $.html( this.inner );

        // handle <several> elements for support of indefinite number of inputs
        await handleSeveral();

        // handle special input types for support of ccm-based input elements
        await $.asyncForEach( [ ...inner.querySelectorAll( 'input' ) ], handleSpecials );

        // fill standard HTML input elements with start values
        $.fillForm( inner, dataset );

        // set change event of submit relevant standard HTML input elements
        [ ...inner.querySelectorAll( '[name]' ) ].forEach( elem => elem.onchange = event => {

          /**
           * new element value
           * @type {*}
           */
          const value = $.deepValue( this.getValue(), elem.name );

          // logging of 'change' event
          this.logger && this.logger.log( 'change', { name: elem.name, value: $.clone( value ) } );

          // perform individual 'change' callback
          this.onchange && this.onchange.call( this, { name: elem.name, value: $.clone( value ), event: event } );

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

        // has submit button? => abort
        if ( !submit ) return;

        // wrap own content with a form tag to support browser validation on standard HTML input fields
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
          this.logger && this.logger.log( 'submit', $.clone( results ) );

          // perform 'finish' actions and provide result data
          this.onfinish && await $.onFinish( this, $.clone( results ) );

        };

        /**
         * Replaces <several> element with a section element which contains an items area and a buttons area.
         * Buttons area contains a add button for add a new item and a remove button for remove of last item.
         * Each item contains inner of <several> element.
         */
        async function handleSeveral() {

          // select all <several> elements in Light DOM
          return $.asyncForEach( [ ...inner.querySelectorAll( 'several' ) ], async several => {

            // has name attribute? => manage contained input elements with another instance out of own component
            if ( several.hasAttribute( 'name' ) ) {
              const input = $.html( { tag: 'input', type: 'submit', name: several.getAttribute( 'name' ) } );
              input.setAttribute( 'inner', several.innerHTML );
              $.setContent( several, input );
            }

            /**
             * template for new item
             * @type {Element}
             */
            const template = $.html( { class: 'item' } );

            // move all children of <several> element to template
            while ( several.childNodes.length ) template.appendChild( several.childNodes[ 0 ] );

            /**
             * section element (contains items and buttons area)
             * @type {Element}
             */
            const section = $.html( self.html, { add: addItem, del: delItem } );

            // replace <several> with section element
            $.replace( section, several );

            const name = template.querySelector( '[name]' ).name;                          // name attribute
            if ( !dataset[ name ] ) return addItem();                                      // no initial values? => add one first item
            dataset[ name ].forEach( ( value, i ) => dataset[ name + '.' + i ] = value );  // convert start values for input elements of this section
            for ( let i = 0; i < dataset[ name ].length; i++ ) await addItem();            // add initial items
            delete dataset[ name ];                                                        // delete no more needed property

            /** adds a new item */
            async function addItem () {

              const items = section.querySelector( '.items' );  // items area
              const item = template.cloneNode( true );          // new item element
              const input = item.querySelector( '[name]' );     // input element of new item
              $.append( items, item );                          // append new item

              // set name attribute of new item
              input.name = input.name + '.' + ( items.childElementCount - 1 );

              // replace all <nr> with item number
              [ ...item.querySelectorAll( 'nr' ) ].forEach( nr => $.replace( $.html( { tag: 'span', inner: items.childElementCount } ), nr ) );

              // manage ccm-based input elements of this section
              await handleSpecials( input );

            }

            /** deletes last item */
            function delItem () {

              const items = section.querySelector( '.items' );                  // contains item elements
              items.childElementCount && items.removeChild( items.lastChild );  // remove last item

            }

          } );

        }

        /**
         * prepares a ccm-based input element
         * @type {Element} input - input element
         */
        async function handleSpecials( input ) {

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
            case 'tel':
            case 'text':
            case 'time':
            case 'url':
            case 'week':
              break; // do not touch standard HTML input elements

            default: // manage ccm-based input elements

              // check whether there is a dependent subcomponent in this config for this input type
              if ( !self[ type ] ) return;

              // <input type=submit> without name attribute counts as standard HTML input element
              if ( type === 'submit' && !input.getAttribute( 'name' ) ) return;

              /**
               * ccm instance of ccm-based input element
               * @type {Object}
               */
              const instance = await self[ type ].start( {
                inner: input.getAttribute( 'inner' ) || undefined,
                data: {
                  store: [ 'ccm.store', { config: $.deepValue( dataset, input.name ) } ],
                  key: 'config'
                },
                onchange: function () {

                  /**
                   * current results of ccm instance
                   * @type {Object}
                   */
                  const value = this.getValue(); delete value.key;

                  // logging of 'change' event
                  self.logger && self.logger.log( 'change', { name: input.name, value: $.clone( value ), builder: instance } );

                  // perform individual 'change' callback
                  self.onchange && self.onchange.call( self, { name: input.name, value: $.clone( value ), builder: instance } );

                }
              } );

              // replace input element with root element of ccm instance
              $.replace( instance.root, input );

              // remember ccm instance for this ccm-based input field
              inputs.push( { instance: instance, name: input.name } );

          }

        }

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
        inputs.forEach( input => {
          const result = input.instance.getValue();
          delete result.key;
          $.deepValue( results, input.name, result );
        } );

        return $.clone( results );
      }

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
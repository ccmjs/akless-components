/**
 * @overview ccm-based web component for submitting data
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 * @version 6.4.0
 * @changes
 * version 6.4.0 (22.11.2018):
 * - added optional config property 'disabled' (then all standard HTML input elements are disabled)
 * - uses ccm v18.6.3
 * - bug fix: render missing callout for inner submit-based inputs
 * version 6.3.0 (22.11.2018):
 * - support of input type 'object' via special data structure
 * - uses ccm v18.6.2
 * version 6.2.0 (22.11.2018):
 * - support individual config for ccm-based input types
 * - uses ccm v18.6.1
 * version 6.1.0 (17.11.2018): component dependency can also be set in deeper property
 * version 6.0.0 (15.11.2018):
 * - changed config key for special HTML data structure ('entries' instead of 'html.main')
 * - uses ccm v18.6.0
 * version 5.1.1 (14.11.2018):
 * - bug fix for initial values with dot notations for ccm-based input elements
 * - uses ccm v18.5.0
 * version 5.1.0 (11.11.2018):
 * - supports special HTML data structure
 * - css is passed to recursive submit instances
 * - uses ccm v18.4.0
 * version 5.0.0 (06.11.2018):
 * - config property 'defaults' has moved inside new config property 'ignore'
 * - consider dot notation for initial value for ccm-based input elements
 * - bug fix for onchange of added items
 * - submitting own config to other recursive needed submit instances
 * - added bootstrap as default
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

    version: [ 6, 4, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.6.3.js',

    config: {

      "html": {
        "entry": {
          "class": "form-group"
        },
        "label": {
          "tag": "label",
          "class": "item-label",
          "inner": "%label%"
        },
        "info": {
          "tag": "span",
          "class": "info",
          "inner": [
            {
              "tag": "input",
              "type": "checkbox",
              "id": "%id%"
            },
            {
              "tag": "label",
              "for": "%id%",
              "inner": {
                "tag": "span",
                "class": "info-icon glyphicon glyphicon-info-sign"
              }
            },
            {
              "tag": "span",
              "class": "alert alert-info",
              "inner": "%info%"
            }
          ]
        },
        "section": {
          "class": "section",
          "inner": [
            { "class": "items" },
            {
              "class": "buttons btn-group",
              "inner": [
                {
                  "tag": "a",
                  "class": "add btn btn-default btn-sm",
                  "role": "button",
                  "inner": {
                    "tag": "span",
                    "class": "glyphicon glyphicon-plus"
                  },
                  "onclick": "%add%"
                },
                {
                  "tag": "a",
                  "class": "del btn btn-default btn-sm",
                  "role": "button",
                  "inner": {
                    "tag": "span",
                    "class": "glyphicon glyphicon-minus"
                  },
                  "onclick": "%del%"
                }
              ]
            }
          ]
        }
      },
      "css": [ "ccm.load",
        { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap/css/font-face.css" },
        "https://ccmjs.github.io/akless-components/libs/bootstrap/css/bootstrap.css",
        "https://ccmjs.github.io/akless-components/submit/resources/default.css"
      ],
      "data": { "store": [ "ccm.store" ] }

  //  "disabled": true,
  //  "entries": [ "ccm.get", "https://ccmjs.github.io/akless-components/submit/resources/datasets.js", "demo.data" ],
  //  "ignore": { "defaults": { "name": "value" } },
  //  "onchange": function ( event ) { console.log( 'change event', this, event, event.target ) },
  //  "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.1.js" ],
  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
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

        // submitting own config to other recursive needed submit instances
        this.submit.config = $.integrate( JSON.parse( this.config ), this.submit.config );
        delete this.submit.config.inner;
        delete this.submit.config.data;

        // support special HTML data structure
        if ( this.entries && !this.inner ) convertData( $.clone( this.entries ) );

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

        /**
         * converts special HTML structure to main HTML structure
         * @param {Object} data - special HTML structure (for example see submit/resoruces/datasets.js)
         */
        function convertData( data ) {

          self.inner = document.createDocumentFragment();
          data.forEach( ( entry, i ) => self.inner.appendChild( newItem( entry, i ) ) );

          /**
           * creates a new entry element (contains label, info icon, input element and bootstrap layout)
           * @param {Object} entry - entry of special HTML data
           * @param {number} i - array index of entry
           * @returns {Element}
           */
          function newItem( entry, i ) {
            entry = $.format( entry, { nr: '<nr>' } );
            if ( !$.isObject( entry ) || !entry.type ) return $.html( entry );
            entry.id = 'item-' + ( i + 1 );
            let entry_elem = $.html( self.html.entry );
            if ( entry.label ) {
              entry_elem.appendChild( $.html( self.html.label, entry ) );
              if ( entry.info ) entry_elem.querySelector( '.item-label' ).appendChild( $.html( self.html.info, entry ) );
            }
            delete entry.info; delete entry.id;
            switch ( entry.type ) {
              case 'color':
              case 'date':
              case 'datetime-local':
              case 'email':
              case 'file':
              case 'hidden':
              case 'month':
              case 'number':
              case 'password':
              case 'range':
              case 'search':
              case 'tel':
              case 'text':
              case 'time':
              case 'url':
              case 'week':
                delete entry.label;
                entry.tag = 'input';
                entry.class = 'form-control';
                entry_elem.appendChild( $.html( entry ) );
                break;
              case 'checkbox':
                delete entry.label;
                entry.tag = 'input';
                entry_elem.appendChild( $.html( { class: 'checkbox', inner: { tag: 'label', inner: entry } } ) );
                break;
              case 'multi-checkbox':
                entry.type = 'checkbox';
              case 'radio':
                delete entry.label;
                entry.tag = 'input';
                entry.items.forEach( item => {
                  const label = item.label;
                  delete item.label;
                  item = $.integrate( entry, item );
                  delete item.items;
                  entry_elem.appendChild( $.html( { class: entry.type, inner: { tag: 'label', inner: [ item, label ] } } ) );
                } );
                break;
              case 'multi-select':
                entry.multiple = true;
              case 'select':
                delete entry.label;
                entry.tag = 'select';
                delete entry.type;
                entry.class = 'form-control';
                const items = entry.items;
                delete entry.items;
                const select_elem = $.html( entry );
                items.forEach( item => {
                  item.tag = 'option';
                  if ( item.label && !item.inner ) { item.inner = item.label; delete item.label; }
                  select_elem.appendChild( $.html( item ) );
                } );
                entry_elem.appendChild( select_elem );
                break;
              case 'textarea':
                delete entry.label;
                entry.tag = 'textarea';
                delete entry.type;
                entry.class = 'form-control';
                entry_elem.appendChild( $.html( entry ) );
                break;
              case 'contenteditable':
                delete entry.label;
                delete entry.type;
                entry.contenteditable = true;
                entry_elem.appendChild( $.html( entry ) );
                break;
              case 'object':
                entry.type = 'several';
                entry.items = [
                  { label: 'Key'  , name: 'property', type: 'text' },
                  { label: 'Value', name: 'value'   , type: 'text' }
                ];
              case 'several':
                if ( entry.name ) {
                  const callout_elem = $.html( { class: 'callout callout-primary' } );
                  const several_elem = $.html( { tag: 'several', name: entry.name } );
                  entry.items.forEach( ( item, i ) => callout_elem.appendChild( newItem( item, i ) ) );
                  several_elem.appendChild( callout_elem );
                  entry_elem.appendChild( several_elem );
                }
                else {
                  const several_elem = $.html( { tag: 'several' } );
                  const item_elem = newItem( entry.item );
                  item_elem.classList.add( 'callout', 'callout-primary' );
                  several_elem.appendChild( item_elem );
                  entry_elem.appendChild( several_elem );
                }
                break;
              case 'submit':
                delete entry.label;
                entry.tag = 'input';
                entry.class = 'form-control';
                entry_elem.appendChild( $.html( entry.name ? { class: 'callout', inner: entry } : entry ) );
                break;
              default:
                delete entry.label;
                entry.tag = 'input';
                entry.class = 'form-control';
                entry_elem.appendChild( $.html( { class: 'callout', inner: entry } ) );
                break;
            }
            return entry_elem;
          }

        }

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
        [ ...inner.querySelectorAll( '[name]' ) ].forEach( elem => {
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
          if ( this.disabled ) elem.disabled = true;
        } );

        // has given content component? => process Light DOM via content component
        const content = this.content && await this.content.start( { inner: inner, css: JSON.parse( this.config ).css } );

        // put LightDOM into ShadowDOM
        $.setContent( this.element, content ? content.root : inner );

        // remember element that contains Light DOM
        element = content ? content.element : this.element;

        // add HTML class for Light DOM
        element.classList.add( 'main' );

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
            const section = $.html( self.html.section, { add: addItem, del: delItem } );

            // replace <several> with section element
            $.replace( section, several );

            const name = template.querySelector( '[name]' ).name;  // name attribute
            if ( !dataset[ name ] ) return addItem();              // no initial values? => add one first item

            // initial value is object? => convert to array for key-value inputs
            if ( $.isObject( dataset[ name ] ) ) {
              const obj = dataset[ name ];
              dataset[ name ] = [];
              for ( const key in obj )
                dataset[ name ].push( { property: key, value: obj[ key ] } );
            }

            dataset[ name ].forEach( ( value, i ) => dataset[ name + '.' + i ] = value );  // convert start values for input elements of this section
            for ( let i = 0; i < dataset[ name ].length; i++ ) await addItem();            // add initial items
            delete dataset[ name ];                                                        // delete no more needed property

            /** adds a new item */
            async function addItem () {

              const items = section.querySelector( '.items' );  // items area
              const item = template.cloneNode( true );          // new item element
              const input = item.querySelector( '[name]' );     // input element of new item
              $.append( items, item );                          // append new item

              // set name attribute
              input.name = input.name + '.' + ( items.childElementCount - 1 );

              // set change event
              input.onchange = event => {

                /**
                 * new element value
                 * @type {*}
                 */
                const value = $.deepValue( self.getValue(), input.name );

                // logging of 'change' event
                self.logger && self.logger.log( 'change', { name: input.name, value: $.clone( value ) } );

                // perform individual 'change' callback
                self.onchange && self.onchange.call( self, { name: input.name, value: $.clone( value ), event: event } );

              };

              // replace all <nr> with item number
              [ ...item.querySelectorAll( 'nr' ) ].forEach( nr => $.replace( $.html( { tag: 'span', inner: items.childElementCount } ), nr ) );

              // manage ccm-based input elements of this section
              await handleSpecials( input );

            }

            /** deletes last item */
            function delItem () {

              const items = section.querySelector( '.items' );
              inputs = inputs.filter( input => !items.lastChild.querySelector( '[id]' ) || input.instance.index !== items.lastChild.querySelector( '[id]' ).id );
              items.childElementCount && items.removeChild( items.lastChild );

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
              if ( !$.deepValue( self, type ) ) return;

              // <input type=submit> without name attribute counts as standard HTML input element
              if ( type === 'submit' && !input.getAttribute( 'name' ) ) return;

              /**
               * ccm instance of ccm-based input element
               * @type {Object}
               */
              let instance; instance = await $.deepValue( self, type ).start( $.integrate( {
                data: {
                  store: [ 'ccm.store', { config: $.deepValue( $.solveDotNotation( dataset ), input.name ) } ],
                  key: 'config'
                },
                onchange: function () {

                  /**
                   * current results of ccm instance
                   * @type {Object}
                   */
                  const value = this.getValue(); delete value.key;

                  // logging of 'change' event
                  instance && self.logger && self.logger.log( 'change', { name: input.name, value: $.clone( value ), builder: instance } );

                  // perform individual 'change' callback
                  instance && self.onchange && self.onchange.call( self, { name: input.name, value: $.clone( value ), builder: instance } );

                }
              }, $.generateConfig( input ) ) );

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
          const keys = Object.keys( result );
          if ( keys.length === 2 && keys.every( key => [ 'property', 'value' ].includes( key ) ) )
            $.deepValue( results, input.name.substr( 0, input.name.lastIndexOf( '.' ) ) + '.' + result.property, result.value );
          else
            $.deepValue( results, input.name, result );
        } );

        return $.clone( results );
      }

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
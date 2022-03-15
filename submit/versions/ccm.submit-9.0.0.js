/**
 * @overview ccm-based web component for submitting data
 * @author André Kless <andre.kless@web.de> 2018-2022
 * @license The MIT License (MIT)
 * @version 9.0.0
 * @changes
 * version 9.0.0 (15.03.2021)
 * - uses ccmjs v27.3.1 as default
 * - uses helper.mjs v8.1.0 as default
 * - getValue() considers initial values
 * (for older version changes see ccm.submit-8.2.1.js)
 */

( () => {
  const component = {
    name: 'submit',
    version: [ 9, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.3.1.min.js',
    config: {
  //  "autosave": true,
  //  "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-6.1.0.min.js" ],
      "css": [ "ccm.load",
        [  // serial
          [  // parallel
            "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
            { "url": "https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp", "type": "css" },
            { "url": "https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp", "type": "css", "context": "head" }
          ],
          "https://ccmjs.github.io/akless-components/submit/resources/default_b4.min.css"
        ]
      ],
      "data": { "store": [ "ccm.store" ] },
  //  "disabled": true,
  //  "enabled_only": true,
  //  "entries": [ "ccm.get", "https://ccmjs.github.io/akless-components/submit/resources/datasets.min.js", "demo.data" ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.1.0.min.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/submit/resources/templates_b4.html" ],
  //  "ignore": { "defaults": { "name": "value" } },
  //  "lang": [ "ccm.instance", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.min.js" ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.1.0.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.min.js", "greedy" ] ],
  //  "no_submit_button": true,
  //  "onchange": event => console.log( event ),
  //  "onfinish": { "log": true },
  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "guest" ] ]
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
       * initial values for input elements
       * @type {Object}
       */
      let dataset;

      /**
       * contains Light DOM and thus also input elements
       * @type {Element}
       */
      let element;

      this.ready = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // add submit property with own component reference (for recursive reuse)
        this.submit = this.component;

        // submitting own config to other recursive needed submit instances
        this.submit.config = await $.integrate( JSON.parse( this.config ), this.submit.config );
        this.submit.config.parent = this;
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
              case 'app':
                delete entry.label;
                entry.tag = 'input';
                entry.class = 'form-control';
                entry_elem.appendChild( $.html( entry ) );
                break;
              case 'key':
              case 'hidden':
                entry.tag = 'input';
                entry_elem = $.html( entry );
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
                  item = Object.assign( item, entry );
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
                  const callout_elem = $.html( { class: 'callout callout-info' } );
                  const several_elem = $.html( { tag: 'several', name: entry.name } );
                  entry.items.forEach( ( item, i ) => callout_elem.appendChild( newItem( item, i ) ) );
                  several_elem.appendChild( callout_elem );
                  entry_elem.appendChild( several_elem );
                }
                else {
                  const several_elem = $.html( { tag: 'several' } );
                  const item_elem = newItem( entry.item );
                  item_elem.classList.add( 'callout', 'callout-info' );
                  several_elem.appendChild( item_elem );
                  entry_elem.appendChild( several_elem );
                }
                break;
              case 'submit':
                delete entry.label;
                entry.tag = 'input';
                entry.class = 'btn btn-primary';
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
        dataset = await $.dataset( this.data );

        // given default values? => integrate them as defaults into initial values
        if ( this.ignore ) dataset = await $.integrate( this.ignore.defaults, dataset, true );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // reset data for ccm-based input elements
        inputs = [];

        /**
         * Light DOM
         * @type {Element}
         */
        const inner = $.html( this.inner );

        // has given content component? => process Light DOM via content component
        const content = this.content && await this.content.start( { inner: inner, css: JSON.parse( this.config ).css } );

        // put LightDOM into ShadowDOM
        $.setContent( this.element, content ? content.root : inner );

        // remember element that contains Light DOM
        element = content ? content.element : this.element;

        // add HTML class for Light DOM
        element.classList.add( 'main' );

        // wrap own content with a form tag to support browser validation on standard HTML input fields
        const form = document.createElement( 'form' );
        element.parentNode.replaceChild( form, element );
        form.appendChild( element );

        // handle <several> elements for support of indefinite number of inputs
        await $.asyncForEach( [ ...element.querySelectorAll( 'several' ) ], handleSeveral );

        // fill standard HTML input elements with start values
        $.fillForm( element, dataset );

        // handle special input types for support of ccm-based input elements
        await $.asyncForEach( [ ...element.querySelectorAll( 'input' ) ], handleSpecial );

        // set change event of submit relevant standard HTML input elements
        [ ...element.querySelectorAll( '[name]' ) ].forEach( elem => {
          elem.onchange = event => {

            // user feedback for changed/unchanged value
            feedback( event.target );

            // not valid? => abort
            if ( !elem.checkValidity() ) return;

            /**
             * new element value
             * @type {*}
             */
            const value = $.deepValue( this.getValue(), elem.name );

            // logging of 'change' event
            this.logger && this.logger.log( 'change', { name: elem.name, value: $.clone( value ) } );

            // perform individual 'change' callback
            this.onchange && this.onchange( { name: elem.name, value: $.clone( value ), instance: this, event: event } );

            // perform autosave
            this.autosave && autosave();

          };
          if ( this.disabled ) elem.disabled = true;
        } );

        // user feedback for changed/unchanged value
        feedback();

        /**
         * submit button
         * @type {Element}
         */
        const submit = element.querySelector( 'input[type=submit]' );

        // no submit button wanted? => remove it
        submit && this.no_submit_button && $.remove( submit );

        // translate content
        this.lang && this.lang.translate();

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

          // update user feedback for changed/unchanged value
          dataset = results; feedback();

          // perform 'finish' actions and provide result data
          this.onfinish && await $.onFinish( this, $.clone( results ) );

        };

        /**
         * Replaces <several> element with a section element which contains an items area and a buttons area.
         * Buttons area contains a add button for add a new item and a remove button for remove of last item.
         * Each item contains inner of <several> element.
         * @param {Element} several - <several> element
         */
        async function handleSeveral( several ) {

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
          let template = $.html( { class: 'item' } );

          // move all children of <several> element to template
          while ( several.childNodes.length ) template.appendChild( several.childNodes[ 0 ] );

          // make deep copy of template
          template = template.cloneNode( true );

          /**
           * name attribute of input element
           * @type {string}
           */
          const name = template.querySelector( '[name]' ).getAttribute( 'name' );

          /**
           * section element (contains items and buttons area)
           * @type {Element}
           */
          const section = $.html( self.html.section, {
            name: name,
            value: template.innerHTML.includes( 'property' ) && template.innerHTML.includes( 'value' ) ? '{}' : '[]',
            add: addItem,
            del: delItem
          } );

          // replace <several> with section element
          $.replace( several, section );

          /**
           * initial value
           * @type {*}
           */
          let value = $.deepValue( dataset, name );

          // no initial values? => set empty array as default
          if ( !value ) value = $.deepValue( dataset, name, [] );

          // initial value is object? => convert to array for key-value inputs
          if ( $.isObject( value ) ) {
            const arr = [];
            $.deepValue( dataset, name, arr );
            for ( const key in value )
              arr.push( { property: key, value: value[ key ] } );
            value = arr;
          }

          value.forEach( ( value, i ) => dataset[ name + '.' + i ] = value );  // convert start values for input elements of this section
          for ( let i = 0; i < value.length; i++ ) await addItem( true );      // add initial items
          delete dataset[ name ];                                              // delete no more needed property

          /**
           * adds a new item
           * @param {boolean} initial - is initial item
           */
          async function addItem( initial ) {

            const items = section.querySelector( '.items' );  // items area
            const item  = template.cloneNode( true );         // new item element
            const input = item.querySelector( '[name]' );     // input element of new item
            $.append( items, item );                          // append new item

            // set name attribute
            input.setAttribute( 'name', input.getAttribute( 'name' ) + '.' + ( items.childElementCount - 1 ) );

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
              self.onchange && self.onchange( { name: input.name, value: $.clone( value ), instance: self, event: event } );

            };

            // replace all <nr> with item number
            [ ...item.querySelectorAll( 'nr' ) ].forEach( nr => $.replace( nr, $.html( { tag: 'span', inner: items.childElementCount } ) ) );

            // handle several element inside of several element
            if ( input.tagName === 'SEVERAL' ) await handleSeveral( input );

            // manage ccm-based input elements of this section
            await handleSpecial( input );

            // perform individual 'change' callback
            initial !== true && self.onchange && self.onchange( { name: input.name, value: $.deepValue( self.getValue(), input.name ), event: event, instance: self } );

          }

          /** deletes last item */
          function delItem () {

            const items = section.querySelector( '.items' );
            if ( !items.hasChildNodes() ) return;
            inputs = inputs.filter( input => !items.lastChild.querySelector( '[id]' ) || input.instance.index !== items.lastChild.querySelector( '[id]' ).id );
            items.childElementCount && items.removeChild( items.lastChild );

            // perform individual 'change' callback
            self.onchange && self.onchange( { instance: self } );

          }

        }

        /**
         * prepares a ccm-based input element
         * @type {Element} input - input element
         */
        async function handleSpecial( input ) {

          if ( !input || !input.type ) return;

          const type = input.getAttribute( 'type' );
          switch ( type ) {
            case 'hidden':
            case 'button':
            case 'checkbox':
            case 'color':
            case 'date':
            case 'datetime-local':
            case 'email':
            case 'file':
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

            case 'app':
              // convert instance dependency to app URL
              const app = dataset[ input.name ];
              if ( !app ) return;
              input.value = $.appURL( app[ 1 ], Array.isArray( app[ 2 ] ) ? { store: app[ 2 ][ 1 ], key: app[ 2 ][ 2 ] } : app[ 2 ] || {}, undefined, this.ccm );
              break;

            case 'key':
              // hidden input field for key with no value? => use a generated unique key
              if ( !input.value ) input.value = $.generateKey(); input.type = 'hidden';
              break;

            default: // manage ccm-based input elements

              // check whether there is a dependent subcomponent in this config for this input type
              if ( !$.deepValue( self, type ) ) return;

              // <input type=submit> without name attribute counts as standard HTML input element
              if ( type === 'submit' && !input.getAttribute( 'name' ) ) return;

              /**
               * ccm instance of ccm-based input element
               * @type {Object}
               */
              let instance; instance = await $.deepValue( self, type ).start( await $.integrate( {
                data: {
                  store: [ 'ccm.store', { config: $.deepValue( $.solveDotNotation( dataset ), input.name ) } ],
                  key: 'config'
                },
                onchange: event => {

                  /**
                   * current results of ccm instance
                   * @type {Object}
                   */
                  const value = self.getValue(); delete value.key;

                  // logging of 'change' event
                  instance && self.logger && self.logger.log( 'change', { name: input.name, value: $.clone( value ), builder: instance } );

                  // perform individual 'change' callback
                  instance && self.onchange && self.onchange( { name: input.name, value: $.clone( value ), instance: self, event: event, builder: instance } );

                  // perform autosave
                  self.autosave && autosave();

                }
              }, $.generateConfig( input ) ) );

              // replace input element with root element of ccm instance
              $.replace( input, instance.root );

              // remember ccm instance for this ccm-based input field
              inputs.push( { instance: instance, name: input.name } );

          }

        }

        /** performs an automatic save of result data */
        function autosave() {
          if ( $.isObject( self.onfinish ) && self.onfinish.store ) {
            let store = self.onfinish.store;
            if ( store === true ) {
              store = $.clone( self.data );
              store.settings = store.store;
              delete store.store;
            }
            store.settings.parent = self;
            $.onFinish( { store: store, login: self.onfinish.login }, self.getValue(), self.user );
          }
        }

        /**
         * user feedback for changed/unchained values
         * @param {Element} [elem] - input element
         */
        function feedback( elem ) {

          if ( !elem ) return [ ...element.querySelectorAll( '[name]' ) ].forEach( feedback );
          const name = elem.getAttribute( 'name' );
          const input_value = $.deepValue( self.getValue(), name );
          const  data_value = $.deepValue( $.solveDotNotation( dataset), name );
          elem.classList.remove( 'changed', 'unchanged' );
          elem.classList.add( $.stringify( input_value ) === $.stringify( data_value ) || !input_value === !data_value === true ? 'unchanged' : 'changed' );

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
        let results = $.formData( element, { enabled_only: this.enabled_only } );  // fetch values from HTML input elements

        // convert app URL back to ccm instance dependency
        [ ...element.querySelectorAll( 'input[type="app"]' ) ].forEach( input => {
          if ( !results[ input.name ] ) return;
          const app = $.decomposeAppURL( results[ input.name ], this.ccm );
          let config;
          if ( app.config && app.config.store && app.config.key )
            config = [ 'ccm.get', app.config.store, app.config.key ];
          else if ( app.url && app.name && app.key )  // backwards compatibility
            config = [ 'ccm.get', { name: app.name, url: app.url }, app.key ];
          else
            config = app.config || {}
          const instance = [ 'ccm.instance', app.component, config ];
          results[ input.name ] = instance;
        } );

        // fetch values from ccm-based input elements (convention: ccm instance must have a 'getValue()' method)
        inputs.forEach( input => {
          let result = input.instance.getValue() || {};
          delete result.key;
          const keys = Object.keys( result );
          if ( keys.length === 1 && keys[ 0 ] === 'inner' ) result = result.inner;
          if ( keys.length === 2 && keys.every( key => [ 'property', 'value' ].includes( key ) ) )
            result.property && $.deepValue( results, input.name.substr( 0, input.name.lastIndexOf( '.' ) ) + '.' + result.property, result.value );
          else
            $.deepValue( results, input.name, result );
        } );

        return $.solveDotNotation( $.assign( $.clone( dataset ), results ) );
      }

    }

  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
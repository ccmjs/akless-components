/**
 * @overview ccm component for submitting data
 * @author André Kless <andre.kless@web.de> 2018-2020
 * @license The MIT License (MIT)
 * @version latest (7.3.3)
 * @changes
 * version 7.3.3 (03.02.2020):
 * - bug fix when ccm-based input element returns no result
 * - uses ccm v25.0.0
 * - uses helper.mjs v4.0.1
 * - uses HTML template file
 * version 7.3.2 (19.11.2019):
 * - uses ccm v24.2.0
 * version 7.3.1 (19.11.2019):
 * - uses ccm v24.1.1
 * version 7.3.0 (16.10.2019):
 * - support of <input type="app">
 * - uses ccm v24.0.4
 * version 7.2.3 (10.10.2019):
 * - uses ccm v24.0.1
 * version 7.2.2 (20.09.2019):
 * - bug fix for handle of <several> elements
 * - uses ccm v23.0.2
 * version 7.2.1 (20.09.2019):
 * - bug fix for fill form with values together with using content component
 * - uses ccm v23.0.1
 * version 7.2.0 (20.09.2019):
 * - added multilingualism support
 * version 7.1.5 (16.09.2019):
 * - uses ccm v22.6.1
 * version 7.1.4 (10.09.2019):
 * - layout change for submit button
 * - uses ccm v22.5.0
 * version 7.1.3 (04.06.2019):
 * - bug fix for handling of <several>
 * version 7.1.2 (01.06.2019):
 * - bug fix for feedback of changes/unchanged value
 * - uses ccm v20.7.2
 * version 7.1.1 (29.05.2019):
 * - bug fix for default array value of <several>
 * - uses ccm v20.7.1
 * version 7.1.0 (16.05.2019):
 * - user feedback for changed/unchained values
 * - uses ccm v20.4.1
 * version 7.0.1 (15.05.2019):
 * - no report of invalid data to user at change events
 * - uses ccm v20.4.0
 * version 7.0.0 (30.01.2019):
 * - input type 'hidden' without value has no more an unique generated key as value, use new input type 'key' for this instead
 * - new input type 'key' for hidden input fields with generated unique key as default value
 * - hidden elements in special HTML structure do not consume space in frontend
 * - uses ccm v20.0.0
 * (for older version changes see ccm.submit-6.7.2.js)
 */

( () => {

  const component = {

    name: 'submit',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.0.0.js',

    config: {

      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/submit/resources/templates.html" ],
      "css": [ "ccm.load",
        { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap/css/font-face.css" },
        "https://ccmjs.github.io/akless-components/libs/bootstrap/css/bootstrap.css",
        "https://ccmjs.github.io/akless-components/submit/resources/default.css"
      ],
      "data": { "store": [ "ccm.store" ] },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.0.1.mjs" ]

  //  "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.3.0.js" ],
  //  "disabled": true,
  //  "entries": [ "ccm.get", "https://ccmjs.github.io/akless-components/submit/resources/datasets.js", "demo.data" ],
  //  "ignore": { "defaults": { "name": "value" } },
  //  "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js" ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "no_submit_button": true,
  //  "onchange": function ( event ) { console.log( 'change event', this, event, event.target ) },
  //  "onfinish": { "log": true },
  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]

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
        $ = Object.assign( {}, this.ccm.helper, this.helper );

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
        let dataset = await $.dataset( this.data );

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
            this.onchange && this.onchange.call( this, { name: elem.name, value: $.clone( value ), event: event } );

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

        // has submit button? => abort
        if ( !submit ) return;

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
              self.onchange && self.onchange.call( self, { name: input.name, value: $.clone( value ), event: event } );

            };

            // replace all <nr> with item number
            [ ...item.querySelectorAll( 'nr' ) ].forEach( nr => $.replace( nr, $.html( { tag: 'span', inner: items.childElementCount } ) ) );

            // handle several element inside of several element
            if ( input.tagName === 'SEVERAL' ) await handleSeveral( input );

            // manage ccm-based input elements of this section
            await handleSpecial( input );

            // perform individual 'change' callback
            initial !== true && self.onchange && self.onchange.call( self, { name: input.name, value: $.deepValue( self.getValue(), input.name ) } );

          }

          /** deletes last item */
          function delItem () {

            const items = section.querySelector( '.items' );
            if ( !items.hasChildNodes() ) return;
            inputs = inputs.filter( input => !items.lastChild.querySelector( '[id]' ) || input.instance.index !== items.lastChild.querySelector( '[id]' ).id );
            items.childElementCount && items.removeChild( items.lastChild );

            // perform individual 'change' callback
            self.onchange && self.onchange.call( self );

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
              input.value = $.appURL( app[ 1 ], Array.isArray( app[ 2 ] ) ? { store: app[ 2 ][ 1 ], key: app[ 2 ][ 2 ] } : app[ 2 ] || {} );
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
                onchange: function () {

                  /**
                   * current results of ccm instance
                   * @type {Object}
                   */
                  const value = self.getValue(); delete value.key;

                  // logging of 'change' event
                  instance && self.logger && self.logger.log( 'change', { name: input.name, value: $.clone( value ), builder: instance } );

                  // perform individual 'change' callback
                  instance && self.onchange && self.onchange.call( self, { name: input.name, value: $.clone( value ), builder: instance } );

                }
              }, $.generateConfig( input ) ) );

              // replace input element with root element of ccm instance
              $.replace( input, instance.root );

              // remember ccm instance for this ccm-based input field
              inputs.push( { instance: instance, name: input.name } );

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
        let results = $.formData( element );  // fetch values from HTML input elements

        // convert app URL back to ccm instance dependency
        [ ...element.querySelectorAll( 'input[type="app"]' ) ].forEach( input => {
          if ( !results[ input.name ] ) return;
          const app = $.decomposeAppURL( results[ input.name ] );
          const instance = [ 'ccm.instance', app.component, app.config && app.config.store && app.config.key ? [ 'ccm.get', app.config.store, app.config.key ] : app.config || {} ];
          results[ input.name ] = instance;
        } );

        // fetch values from ccm-based input elements (convention: ccm instance must have a 'getValue()' method)
        inputs.forEach( input => {
          const result = input.instance.getValue();
          delete result.key;
          const keys = Object.keys( result );
          if ( keys.length === 2 && keys.every( key => [ 'property', 'value' ].includes( key ) ) )
            result.property && $.deepValue( results, input.name.substr( 0, input.name.lastIndexOf( '.' ) ) + '.' + result.property, result.value );
          else
            $.deepValue( results, input.name, result );
        } );

        return $.clone( results );
      }

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
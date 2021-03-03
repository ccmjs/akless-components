/**
 * @overview ccmjs-based web component for a menu
 * @author André Kless <andre.kless@web.de> 2015-2016, 2018-2021
 * @license The MIT License (MIT)
 * @version latest (3.0.1)
 * @changes
 * version 3.0.1 (03.03.2021):
 * - uses ccmjs v26.1.1 as default
 * - uses helper.mjs v7.0.0 as default
 * - updated minified component line
 * version 3.0.0 (14.04.2020):
 * - changed parameters in logged data
 * - removed optional 'onclick' callback
 * - removed 'actions' property in menu entry data
 * - added onchange callback (use this instead of 'onclick' and 'actions')
 * - changed append of optional language chooser
 * - added public method: disable(entry_id,boolean):void
 * - added public method: getEntryData(entry_id):entry_data
 * - added public method: getEntryElem(entry_id):entry_elem
 * - added public method: getSelectedEntry():entry_id
 * - getValue returns app data instead of selected entry
 * - added public method: next():void
 * - added public method: prev():void
 * - added public method: async refresh(app_data):void
 * - added public method: async select(entry_id,noclick):void
 * (for older version changes see ccm.menu-2.11.0.js)
 */

( () => {

  const component = {
    name: 'menu',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.1.1.js',
    config: {
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/menu/resources/default.css" ],
      "data": { "store": [ "ccm.store" ] },
//    "deselectable": true,
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.0.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/menu/resources/default.html" ],
//    "keyboard_control": true,
//    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
//    "onchange": event => console.log( event ),
//    "routing": [ "ccm.instance", "https://ccmjs.github.io/akless-components/routing/versions/ccm.routing-2.0.5.js", { "app": true } ],
//    "selected": 1,
//    "touch_control": true,
//    "trigger_selected": true
    },

    Instance: function () {

      let $, app;

      this.init = async () => {

        // determine data for menu entries via Light DOM
        if ( !this.inner ) return;
        const entries = [];
        [ ...this.inner.children ].forEach( child => {
          if ( child.tagName && child.tagName === 'ENTRY' )
            entries.push( { title: child.getAttribute( 'title' ), content: child.innerHTML } );
        } );
        this.data = { entries: entries };

      };

      this.ready = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );  // shortcut to help functions
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );      // logging of 'ready' event
      };

      this.start = async () => {

        // get existing app data, log 'start' event and render main HTML structure
        app = await $.dataset( this.data );
        app.entries = app.entries.map( entry => typeof entry === 'string' ? { title: entry } : entry );
        this.logger && this.logger.log( 'start', this.getValue() );
        $.setContent( this.element, $.html( this.html.main, { onprev: this.prev, onnext: this.next } ) );

        // keyboard + remote control
        this.keyboard_control && document.addEventListener( 'keydown', event => {
          if ( event.key === 'ArrowRight' || event.key === 'PageDown' )
            this.next();
          else if ( event.key === 'ArrowLeft' || event.key === 'PageUp' )
            this.prev();
        } );

        // touch control
        let x_start = null;
        if ( this.touch_control ) {
          this.element.addEventListener( 'touchstart', event => {
            const getTouches = event => event.touches || event.originalEvent.touches;
            const firstTouch = getTouches( event )[ 0 ];
            x_start = firstTouch.clientX;
          } );
          this.element.addEventListener( 'touchmove', event => {
            if ( !x_start || !event ) return;
            this[ x_start - event.touches[ 0 ].clientX > 0 ? 'prev' : 'next' ]();
            x_start = null;
          } );
        }

        // render language chooser, menu entries and setup routing
        if ( this.lang ) { $.append( this.element.querySelector( '#top' ), this.lang.root ); this.lang.start(); }
        await renderEntries( this.selected );
        this.routing && this.routing.define( { entry: id => this.select( parseInt( id ) || id ) } );

      };

      /**
       * disables or enables a menu entry (not persistent, only local)
       * @param {string|number} entry_id - id or number of menu entry
       * @param {boolean} disable - true: disable, false: enable
       */
      this.disable = ( entry_id, disable ) => {
        getEntry( entry_id ).disabled = disable;
        renderEntry( entry_id );
      };

      /**
       * returns the data of a menu entry
       * @param {string|number} entry_id - id or number of menu entry
       * @returns {Object}
       */
      this.getEntryData = entry_id => $.clone( getEntry( entry_id ) );

      /**
       * returns the container of a menu entry
       * @param {string|number} entry_id - id or number of menu entry
       * @returns {Element}
       */
      this.getEntryElem = entry_id => typeof entry_id === 'string' ? this.element.querySelector( '#entry-' + entry_id ) : this.element.querySelectorAll( '.entry' )[ entry_id - 1 ];

      /**
       * returns the id of the selected menu entry
       * @returns {string|number}
       */
      this.getSelectedEntry = () => {
        const entry_elem = this.element.querySelector( '.entry.active' );
        return entry_elem && ( parseInt( entry_elem.dataset.id ) || entry_elem.dataset.id );
      };

      /**
       * returns current result data
       * @returns {Object} current app data
       */
      this.getValue = () => $.clone( app );

      /** selects next menu entry */
      this.next = () => {
        const entry_elem = this.getEntryElem( this.getSelectedEntry() );
        entry_elem && ( entry_elem.nextElementSibling || this.element.querySelector( '#entries' ).firstElementChild ).click();
      };

      /** selects previous menu entry */
      this.prev = () => {
        const entry_elem = this.getEntryElem( this.getSelectedEntry() );
        entry_elem && ( entry_elem.previousElementSibling || this.element.querySelector( '#entries' ).lastElementChild ).click();
      };

      /**
       * updates own content and local app data after app data has changed
       * @param {Object} [dataset] - updated app data (default: local app data)
       * @returns {Promise<void>}
       */
      this.refresh = async ( dataset = app ) => renderEntries( app = dataset );

      /**
       * selects or deselects a menu entry
       * @param {string|number} [entry_id] - id or number of menu entry (default: deselect active menu entry)
       * @param {boolean} [noclick] - prevent trigger of click actions (menu entry is only marked as selected)
       * @returns {Promise<void>}
       */
      this.select = async ( entry_id, noclick ) => {

        // get menu entry container and remember if already selected menu entry is clicked
        const entry_elem = this.getEntryElem( entry_id ); if ( !entry_elem ) return;
        const is_selected = entry_elem && entry_elem.classList.contains( 'selected' );

        // unselect selected menu entry
        const selected_entry = this.element.querySelector( '.entry.selected' );
        if ( selected_entry ) {
          selected_entry.classList.remove( 'selected', 'active' );
          selected_entry.firstChild.classList.remove( 'active' );
        }

        if ( !entry_id ) return;                                       // only deselect active menu entry? => abort
        const entry_data = getEntry( entry_id );                       // menu entry data
        this.routing && this.routing.set( 'entry-' + entry_data.id );  // update route

        // select clicked menu entry
        if ( !is_selected || !this.deselectable ) {
          entry_elem.classList.add( 'selected', 'active' );
          entry_elem.firstChild.classList.add( 'active' );
        }

        // update container for central menu entry title
        const title_elem = this.element.querySelector( '#title' );
        if ( title_elem ) {
          if ( this.lang )
            title_elem.dataset[ this.lang.component.name ] = entry_data.title;
          else
            $.setContent( title_elem, $.html( entry_data.title ) );

          // show fade effect for menu entry title
          title_elem.classList.remove( 'fading' );
          void title_elem.offsetWidth;
          title_elem.classList.add( 'fading' );
        }

        this.lang && this.lang.translate();  // update translations
        if ( noclick ) return;               // trigger of click actions has to be prevented? => abort

        // deselection of selected menu entry only clears the menu entry content without click actions
        this.deselectable && $.setContent( this.element.querySelector( '#content' ), '' );
        if ( is_selected && !this.trigger_selected ) return;

        await renderContent( entry_id );  // render menu entry content

        // log 'click' event and trigger 'onchange' callback
        this.logger && this.logger.log( 'click', { id: entry_id, entry: $.clone( entry_data ) } );
        this.onchange && this.onchange( { id: this.getSelectedEntry(), entry: $.clone( entry_data ), element: entry_elem, instance: this } );

      };

      /**
       * returns the data of a menu entry
       * @param {string|number} entry_id - id or number of menu entry
       * @returns {Object}
       */
      const getEntry = entry_id => app.entries[ typeof entry_id === 'string' ? [ ...this.element.querySelector( '#entries' ).children ].indexOf( this.getEntryElem( entry_id ) ) : entry_id - 1 ];

      /**
       * renders the menu entries in the main HTML structure
       * @param {string|number} [selected] - id or number of preselected menu entry
       * @returns {Promise<void>}
       */
      const renderEntries = async selected => {

        // render menu entries and trigger preselected menu entry
        app.entries && app.entries.forEach( ( entry, i ) => renderEntry( i + 1 ) );
        if ( selected && ( !this.routing || !this.routing.get() ) ) await this.select( selected );
        this.lang && this.lang.translate();  // translate the multilingual content of the app

      };

      /**
       * replaces or appends a single menu entry in the menu entries container
       * @param {string|number} entry_id - id or number of the menu entry
       */
      const renderEntry = entry_id => {

        const entry_data = getEntry( entry_id );         // get menu entry data
        if ( !entry_data ) return;                       // no entry data? => abort
        if ( !entry_data.id ) entry_data.id = entry_id;  // set HTML ID of menu entry

        /**
         * container of the menu entry
         * @type {Element}
         */
        const new_entry = $.html( this.html.entry, { id: entry_data.id, click: onClick } );

        // add menu entry title
        const title_elem = new_entry.querySelector( '.title' );
        if ( title_elem )
          if ( this.lang )
            title_elem.dataset[ this.lang.component.name ] = entry_data.title;
          else
            $.setContent( title_elem, $.html( entry_data.title ) );

        // disabling of menu entry
        if ( entry_data.disabled ) {
          new_entry.disabled = true;
          new_entry.classList.add( 'disabled' );
          new_entry.removeEventListener( 'click', onClick );
        }

        // replace or append the menu entry in the menu entries container
        const old_entry = this.getEntryElem( entry_id );
        if ( old_entry )
          $.replace( old_entry, new_entry );
        else
          $.append( this.element.querySelector( '#entries' ), new_entry );

      };

      /** when menu entry is clicked */
      const onClick = async event => {
        const id = event.target.closest( '.entry' ).dataset.id;
        await this.select( parseInt( id ) || id );
      };

      /**
       * renders the content for a specific menu entry
       * @param {string|number} entry_id - id or number of the menu entry
       * @returns {Promise<void>}
       */
      const renderContent = async entry_id => {

        const entry_data = getEntry( entry_id );                             // data of the menu entry
        entry_data.content = await $.solveDependency( entry_data.content );  // content is given as ccm dependency? => solve dependency
        if ( !entry_data.content ) return;                                   // no menu entry content? => abort
        const content_elem = this.element.querySelector( '#content' );       // container for menu entry content

        // render content
        if ( $.isComponent( entry_data.content ) ) await entry_data.content.start( { parent: this, root: content_elem } );
        else if ( this.content ) await this.content.start( { root: content_elem, inner: entry_data.content } );
        else $.setContent( content_elem, $.html( entry_data.content ) );

        // show fade effect for content
        content_elem.classList.remove( 'fading' );
        void content_elem.offsetWidth;
        content_elem.classList.add( 'fading' );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
/**
 * @overview ccmjs-based web component for building an image map
 * @author André Kless <andre.kless@web.de> 2020, 2022
 * @license The MIT License (MIT)
 * @version latest (4.0.0)
 * @changes
 * version 4.0.0 (29.03.2022):
 * - uses Bootstrap 5 as default
 * - set default for dark mode setting to false
 * - added preview
 * - added submit button
 * - uses Quill as text editor for map info and area tooltip
 * - uses Moveable.js for moveable and resizable areas
 * - removed ccm.submit.js
 * - edit of areas via double click on the area at the map
 * - area settings via modal dialog
 * - uses ccm.image_map.js v4.0.0 as default
 * - areas can be deleted
 * - adding of areas directly on the map
 * - default texts and labels are in german
 * - added support for multilingualism
 * - added language selection and user login in header
 * (for older version changes see ccm.image_map_builder-3.0.0.js)
 */

( () => {
  const component = {
    name: 'image_map_builder',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.3.1.min.js',
    config: {
      "blank": "https://akless.github.io/akless/resources/images/blank/1x1.svg",
      "css": [ "ccm.load",
        [
          "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap.min.css",
          "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap-dark.min.css",
          "https://ccmjs.github.io/akless-components/config_builder/resources/styles.min.css",
          "https://ccmjs.github.io/akless-components/image_map_builder/resources/styles.min.css"
        ],
        "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap-icons.min.css",
        { "url": "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap-fonts.min.css", "context": "head" }
      ],
      "dark": false,
      "data": {},
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.1.0.min.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/image_map_builder/resources/templates.mjs" ],
      "ignore": { "defaults": {
        "dark": false
      } },
      "image_map": [ "ccm.component", "https://ccmjs.github.io/akless-components/image_map/versions/ccm.image_map-4.0.0.min.js" ],
//    "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.min.js" ],
      "libs": [ "ccm.load",
        "https://ccmjs.github.io/akless-components/libs/bootstrap-5/js/bootstrap.bundle.min.js",
        "https://ccmjs.github.io/akless-components/libs/moveable/moveable.min.js"
      ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.min.js", "greedy" ] ],
//    "onchange": event => console.log( 'onchange', event.instance.getValue() ),
//    "onfinish": { "log": true },
//    "onstart": event => { console.log( 'onstart', event ); return event.config; },
      "preview": true,
      "quill": {
        "comp": [ "ccm.component", "https://ccmjs.github.io/akless-components/quill/versions/ccm.quill-2.0.0.min.js", {
          "html": true
        } ],
        "map": {
          "options.modules.toolbar": [
            [ { "header": [ 1, 2, 3, 4, 5, 6, false ] } ],
            [ "bold", "italic", "underline", "strike" ],
            [ { "script": "super" }, { "script": "sub" } ],
            [ { "list": "ordered" }, { "list": "bullet" } ],
            [ "link", "image", "video" ],
            [ "clean" ]
          ]
        },
        "area": {
          "options.modules.toolbar": [
            [ { 'header': 1 } ],
            [ "bold", "italic", "underline", "strike" ],
            [ { "script": "super" }, { "script": "sub" } ],
            [ "link" ],
            [ "clean" ]
          ]
        }
      },
      "shadow": "none",
      "submit": true,
      "text": [ "ccm.load", "https://ccmjs.github.io/akless-components/image_map_builder/resources/resources.mjs#en" ],
      "tool": [ "ccm.component", "https://ccmjs.github.io/akless-components/image_map/versions/ccm.image_map-4.0.0.min.js" ],
//    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js" ]
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * initial app configuration
       * @type {Object}
       */
      let config = {};

      /**
       * image map instance that is used for the placement of areas
       * @type {Object}
       */
      let image_map;

      /**
       * text editor instance that is used for the map info
       * @type {Object}
       */
      let quill_map;

      /**
       * text editor instance that is used for the tooltip a new area on the map
       * @type {Object}
       */
      let quill_area;

      /**
       * when the instance is created, when all dependencies have been resolved and before the dependent sub-instances are initialized and ready
       * @returns {Promise<void>}
       */
      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // pass setting for dark mode to child instances
        if ( this.lang ) this.lang.dark = this.dark;
        if ( this.user ) this.user.dark = this.dark;

      };

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {

        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );  // logging of 'ready' event
        this.element.classList.add( this.component.name );                     // add HTML class as prefix for CSS rules

        // setup dark mode
        this.dark === 'auto' && this.element.classList.add( 'dark_auto' );
        this.dark === true && this.element.classList.add( 'dark_mode' );

      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // user authentication
        this.user && await this.user.login();

        // set initial app configuration (priority order: [high] this.data -> this.ignore.defaults -> this.tool.config [low])
        config = await $.integrate( await $.dataset( this.data ), await $.integrate( this.ignore.defaults, this.tool.config ) );

        // set default values
        if ( !config.ignore ) config.ignore = {};
        if ( !config.ignore.areas ) config.ignore.areas = [];

        // trigger 'onstart' callback
        if ( this.onstart ) config = await this.onstart( { instance: this, config: config } );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( config ) );

        // render main HTML structure
        this.html.render( this.html.main( config, this, events ), this.element );

        // render text editor
        quill_map = await this.quill.comp.start( {
          data: { value: config.info },
          root: this.element.querySelector( '#' + this.component.name + '-map-info' ),
          src: this.quill.map
        } );

        // create modal dialog instance for area settings
        new bootstrap.Modal( this.element.querySelector( '#' + this.component.name + '-modal' ) );

        // placement of areas
        await renderAreaPlacement();

        // render language selection and user login/logout
        const header = this.element.querySelector( '#' + this.component.name + '-header' );
        if ( header ) {
          header && this.lang && !this.lang.getContext() && $.append( header, this.lang.root );
          header && this.user && $.append( header, this.user.root );
        }

      };

      /**
       * returns current result data (app configuration)
       * @returns {Object} result data
       */
      this.getValue = () => {
        const value = $.assign( $.clone( config ), $.formData( this.element.querySelector( '#' + this.component.name + '-form' ) ) );
        value.info = quill_map.getValue().value;
        value.ignore.areas.forEach( area => {
          delete area.quill;
          if ( !area.height )
            delete area.height;
        } );
        return value;
      };

      /**
       * contains all event handlers
       * @type {Object.<string,Function>}
       */
      const events = {

        /**
         * when the 'add area' button is clicked
         * @returns {Promise<void>}
         */
        onAddArea: async () => openAreaModal(),

        /**
         * when a map settings has changed
         * @returns {Promise<void>}
         */
        onChange: () => renderAreaPlacement(),

        /**
         * when an area is double clicked
         * @param {number} area_nr - area number
         * @returns {Promise<void>}
         */
        onDblClickArea: async area_nr => openAreaModal( area_nr ),

        /**
         * when the 'delete area' button is clicked
         * @returns {Promise<void>}
         */
        onDeleteArea: async () => {
          config.ignore.areas.splice( parseInt( this.element.querySelector( '#' + this.component.name + '-modal [name="nr"]' ).value ) - 1, 1 );
          await renderAreaPlacement();
        },

        /**
         * when the 'delete all areas' button is clicked
         * @returns {Promise<void>}
         */
        onDeleteAreas: async () => {
          if ( !confirm( this.lang ? this.lang.translate( 'confirm' ) : this.text.confirm ) ) return;
          config.ignore.areas = [];
          await renderAreaPlacement();
        },

        /** when 'preview' button is clicked */
        onPreview: () => {
          const preview_body = this.element.querySelector( '#' + this.component.name + '-preview .modal-body' );
          $.setContent( preview_body, '' );
          this.logger && this.logger.log( 'preview', $.clone( config ) );               // logging of 'preview' event
          this.tool.start( Object.assign( this.getValue(), { root: preview_body } ) );  // render app in preview
        },

        /**
         * when 'submit' event of the main HTML form is triggered
         * @param {Object} event
         */
        onSubmitMap: event => {
          event.preventDefault();
          const config = this.getValue();                                 // get resulting app configuration
          this.logger && this.logger.log( 'finish', $.clone( config ) );  // logging of 'finish' event
          $.onFinish( this, config );                                     // trigger finish actions
        },

        /**
         * when 'submit' event of the area form is triggered
         * @param {Object} event
         * @returns {Promise<void>}
         */
        onSubmitArea: async event => {
          event.preventDefault();
          const $modal = this.element.querySelector( '#' + this.component.name + '-modal' );
          const { area, nr } = $.formData( $modal );
          const areas = config.ignore.areas;
          if ( !nr ) areas.push( $.assign( area, { width: 64, height: 64 } ) );
          const area_data = areas[ parseInt( nr || areas.length ) - 1 ];
          area_data.image = area.image;
          area_data.info = ( area_data.quill || quill_area ).getValue().value;
          area_data.app = area.app;
          bootstrap.Modal.getInstance( $modal ).hide();
          if ( !nr ) await renderAreaPlacement();
        }

      };

      /**
       * renders the image map for area placements
       * @returns {Promise<void>}
       */
      const renderAreaPlacement = async () => {
        const copy = this.getValue();
        const preload = [ 'ccm.load' ];
        copy.ignore.areas.forEach( area => { delete area.app; delete area.info; area.image && preload.push( area.image ) } );
        delete copy.info; delete copy.user; delete copy.lang; delete copy.routing; copy.libs = false;
        copy.dark = this.dark;
        copy.root = this.element.querySelector( '#' + this.component.name + '-placement' );
        await $.solveDependency( preload );
        if ( image_map ) {
          image_map.image = copy.image;
          image_map.ignore.areas = copy.ignore.areas;
          await image_map.start();
        }
        else
          image_map = await this.image_map.start( copy );
        image_map.element.querySelectorAll( '.area' ).forEach( ( $area, i ) => {
          $area.style.backgroundColor = 'rgba( 128, 128, 128, 0.2 )';
          $area.addEventListener( 'dblclick', () => events.onDblClickArea( i + 1 ) );
          const area = config.ignore.areas[ i ];
          new Moveable( image_map.element.querySelector( '#map' ), {
            target: $area,
            draggable: true,
            resizable: true,
            origin: false,
            keepRatio: false,
            renderDirections: [ 'e', 's', 'se' ]
          } ).on( 'drag', ( { target, left, top } ) => {
            target.style.left = `${ left }px`;
            target.style.top = `${ top }px`;
            area.x = left;
            area.y = top;
          } ).on( 'resize', ( { target, width, height, delta } ) => {
            delta[ 0 ] && ( target.style.width = `${ area.width = width }px` );
            delta[ 1 ] && ( target.style.height = `${ area.height = height }px` );
          } );
        } );
      };

      /**
       * opens the modal dialog for area settings
       * @param {number} [area_nr] - area number (not needed in case of a new area)
       * @returns {Promise<void>}
       */
      const openAreaModal = async area_nr => {
        const $modal = this.element.querySelector( '#' + this.component.name + '-modal' );
        const areas = config.ignore.areas;
        const area_data = areas[ area_nr - 1 ] || { image: this.blank, app: '', info: '' };
        $.fillForm( $modal, { area: area_data, nr: area_nr || '' } );
        $modal.querySelector( '#' + this.component.name + '-delete' ).style.display = area_nr ? 'block' : 'none';
        if ( area_data.quill )
          area_data.quill.setHTML( area_data.info );
        else
          area_data.quill = quill_area = await this.quill.comp.start( { data: { value: area_data.info }, src: this.quill.area } );
        $.setContent( $modal.querySelector( '#' + this.component.name + '-area-info' ), area_data.quill.root );
        bootstrap.Modal.getInstance( $modal ).show();
      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
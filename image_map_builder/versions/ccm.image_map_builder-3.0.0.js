/**
 * @overview ccmjs-based web component for building an image map
 * @author André Kless <andre.kless@web.de> 2020, 2022
 * @license The MIT License (MIT)
 * @version 3.0.0
 * @changes
 * version 3.0.0 (03.03.2022):
 * - uses ccmjs v27.3.1 as default
 * - uses helper.mjs v8.1.0 as default
 * - uses ccm.submit.js v8.2.1 as default
 * - uses ccm.image_map.js v3.1.0 as default
 * - added optional dark mode (not completely finished)
 * - image URL's instead of large base64 data via image upload
 * - canceled quest map support
 * - changes parameters for event callbacks
 * - removed infobox in image map for area placement
 * (for older version changes see ccm.image_map-2.1.1.js)
 */

( () => {
  const component = {
    name: 'image_map_builder',
    version: [ 3, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.3.1.min.js',
    config: {
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/image_map_builder/resources/styles.min.css" ],
      "dark": false,
      "data": {},
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.1.0.min.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/image_map_builder/resources/templates.html" ],
      "ignore": { "defaults": {} },
      "image_map": [ "ccm.component", "https://ccmjs.github.io/akless-components/image_map/versions/ccm.image_map-3.0.0.min.js" ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.min.js", "greedy" ] ],
  //  "onchange": event => console.log( 'onchange', event.instance.getValue() ),
  //  "onstart": event => { console.log( 'onstart', event ); return event.config; },
      "submit": [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-8.2.1.js", [ "ccm.load", "https://ccmjs.github.io/akless-components/image_map_builder/resources/resources.mjs#submit_config" ] ],
      "tool": [ "ccm.component", "https://ccmjs.github.io/akless-components/image_map/versions/ccm.image_map-3.1.0.min.js" ],
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
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {

        $ = Object.assign( {}, this.ccm.helper, this.helper );                 // set shortcut to help functions
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );  // logging of 'ready' event

        // setup dark mode
        this.dark === 'auto' && this.element.classList.add( 'dark_auto' );
        this.dark === true && this.element.classList.add( 'dark_mode' );

      };

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

        this.logger && this.logger.log( 'start', $.clone( config ) );  // logging of 'start' event
        $.setContent( this.element, $.html( this.html.main ) );        // render main HTML structure

        // render submit builder
        const submit = await this.submit.start( {
          root: this.element.querySelector( '#submit' ),
          data: {
            store: [ 'ccm.store', { app: $.clone( config ) } ],
            key: 'app'
          },
          'ignore.defaults': this.ignore && this.ignore.defaults,
          onchange: async () => {
            const results = submit.getValue();
            results.image = results.image || config.image;
            results.ignore.areas.forEach( ( area, i ) => {
              area.image = area.image || config.ignore.areas[ i ] && config.ignore.areas[ i ].image;
              area.x = config.ignore.areas[ i ] && config.ignore.areas[ i ].x || 0;
              area.y = config.ignore.areas[ i ] && config.ignore.areas[ i ].y || 0;
              if ( !area.size ) area.size = 5; if ( !area.x ) area.x = 0; if ( !area.y ) area.y = 0;
            } );
            config = await $.integrate( results, config );
            await placement();
            this.onchange && this.onchange( { instance: this } );
          }
        } );

        /** renders area placement */
        const placement = async () => {
          const copy = $.clone( config );
          copy.ignore.areas.forEach( area => {
            if ( area.x === undefined ) area.x = area.y = 1;
            delete area.app;
            area.info = '';
          } );
          delete copy.info; delete copy.user; delete copy.lang; delete copy.routing;
          copy.root = this.element.querySelector( '#placement' );
          const image_map = await this.image_map.start( copy );
          const draggable = ( element, i ) => {
            element.style.backgroundColor = 'rgba( 0, 0, 0, 0.2 )';
            element.onmousedown = event => {
              let x, y;
              event.preventDefault();
              const grid_x = parseInt( this.element.querySelector( '#grid-x' ).value ) / 10;
              const grid_y = parseInt( this.element.querySelector( '#grid-y' ).value ) / 10;
              const rect = image_map.element.querySelector( '#map' ).getBoundingClientRect();
              const calc = ( x, y ) => [ ( x - rect.x ) * 100 / rect.width, ( y - rect.y ) * 100 / rect.height ];
              image_map.element.onmousemove = event => {
                event.preventDefault();
                [ x, y ] = calc( event.clientX, event.clientY );
                if ( x >= 0 && x <= 100 ) element.style.left = ( x = ( x - x % grid_x ) ) + '%';
                if ( y >= 0 && y <= 100 ) element.style.top  = ( y = ( y - y % grid_y ) ) + '%';
              };
              this.element.onmouseup = () => {
                this.element.onmouseup = null;
                image_map.element.onmousemove = null;
                config.ignore.areas[ i ].x = x * 10;
                config.ignore.areas[ i ].y = y * 10;
                element.style.width = ( config.ignore.areas[ i ].width / 10 ) + "%";
                this.onchange && this.onchange( { instance: this } );
              };
            };
          };
          image_map.element.querySelectorAll( '.area' ).forEach( draggable );
        };

        // render area placement
        await placement();

      };

      /**
       * returns current result data (app configuration)
       * @returns {Object} result data
       */
      this.getValue = () => $.clone( config );

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
/**
 * @overview ccmjs-based web component for an image map
 * @author André Kless <andre.kless@web.de> 2019-2020, 2022
 * @license The MIT License (MIT)
 * @version 3.0.0
 * @changes
 * version 3.0.0 (02.03.2022):
 * - uses ccmjs v27.3.1 as default
 * - uses helper.mjs v8.1.0 as default
 * - changed default caption for 'back to map' button
 * - added optional dark mode
 * - renamed action property in area data
 * (for older version changes see ccm.image_map-2.1.0.js)
 */

( () => {
  const component = {
    name: 'image_map',
    version: [ 3, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.3.1.min.js',
    config: {
      "back": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-map\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" d=\"M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z\"/></svg> <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-arrow-return-left\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" d=\"M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z\"/></svg>",
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/image_map/resources/styles.min.css" ],
      "dark": "auto",
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.1.0.min.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/image_map/resources/templates.html" ],
      "ignore": { "areas": [] },
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  //  "info": "",
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.min.js", "greedy" ] ],
  //  "max_width": "400px",
  //  "onchange": event => console.log( 'onchange', event ),
  //  "onmouseout": event => console.log( 'onmouseout', event ),
  //  "onmouseover": event => console.log( 'onmouseover', event ),
  //  "onstart": event => console.log( 'onstart', event ),
  //  "preclick": event => { console.log( 'preclick', event ); return true; },
  //  "render": event => console.log( 'render', event )
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * when the instance is created, when all dependencies have been resolved and before the dependent sub-instances are initialized and ready
       * @returns {Promise<void>}
       */
      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // adjust areas data
        this.ignore.areas.map( area => {
          if ( !area.image ) area.image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
          area.x /= 10; area.y /= 10; area.size /= 10;
          if ( !area.order ) area.order = 0;
          return area;
        } );

      };

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {

        // setup dark mode
        this.dark === 'auto' && this.element.classList.add( 'dark_auto' );
        this.dark === true && this.element.classList.add( 'dark_mode' );

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      }

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        this.logger && this.logger.log( 'start' );                                                 // logging of 'start' event
        $.setContent( this.element, $.html( this.html.main, { image: this.image } ) );             // render main HTML structure
        if ( this.max_width ) this.element.querySelector( '#main' ).style.width = this.max_width;  // set maximum width for the image map
        await $.asyncForEach( this.ignore.areas, this.renderArea );                                // add areas in the image map
        this.renderInfo( this.info );                                                              // render map information's in info section
        this.onstart && await this.onstart( { instance: this } );                                  // trigger 'onstart' callback

        // show map information's when map is hovered
        this.element.querySelector( '#map' ).addEventListener( 'mouseover', () => this.renderInfo( this.info ) );

      };

      /**
       * renders an area of the image map
       * @param {Object} area_data
       */
      this.renderArea = async area_data => {

        const $area = $.html( this.html.area, $.clone( area_data ) );  // prepare area HTML structure
        if ( area_data.disabled ) $area.classList.add( 'disabled' );   // disabled area? => mark area as disabled in frontend
        $.append( this.element.querySelector( '#map' ), $area );       // append area to image map

        // trigger 'mouseout' callback on mouseout event and set 'mouseover' event
        $area.addEventListener( 'mouseout', () => this.onmouseout && this.onmouseout( { area_data: $.clone( area_data ), element: $area, instance: this } ) );
        $area.addEventListener( 'mouseover', event => {
          this.onmouseover && this.onmouseover( { area_data: $.clone( area_data ), element: $area, instance: this } );  // trigger mouseover callback
          this.renderInfo( area_data.info );  // render area information's in info section
          event.stopPropagation();            // prevents trigger of 'mouseover' event of the map
        } );

        // trigger 'onrender' callback and set click event
        this.onrender && this.onrender( { area_data: $.clone( area_data ), element: $area, instance: this } );
        area_data.app && $area.addEventListener( 'click', async () => {

          // disabled area? => abort
          if ( area_data.disabled ) return;

          // trigger 'preclick' callback
          if ( this.preclick && !( await this.preclick( { area_data: $.clone( area_data ), element: $area, instance: this } ) ) ) return;

          // show app
          $.setContent( this.element, $.html( this.html.app, { caption: this.back, onclick: this.start } ) );
          const $app = this.element.querySelector( '#app' );
          if ( !$.isInstance( area_data.app ) ) {
            $.setContent( $app, $.loading( this ) );
            area_data.app = await $.appDependency( area_data.app ).then( app => $.solveDependency( app, this ) );
          }
          $.setContent( $app, area_data.app.root );

          // log 'click' event and trigger 'onchange' callback
          this.logger && this.logger.log( 'click', { area_data: $.clone( area_data ) } );
          this.onchange && await this.onchange( { area_data: $.clone( area_data ), instance: this } );

        } );

      };

      /**
       * renders content of info section
       * @param {ccm.types.html} content
       */
      this.renderInfo = content => {
        const info_elem = this.element.querySelector( '#info' );  // select info section
        info_elem.style.display = !content ? 'none' : 'block';    // no content? => hide info section
        $.setContent( info_elem, $.html( content ) );             // render content of info section
      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
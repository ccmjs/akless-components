/**
 * @overview ccmjs-based web component for an image map
 * @author André Kless <andre.kless@web.de> 2019-2020, 2022
 * @license The MIT License (MIT)
 * @version latest (4.0.0)
 * @changes
 * version 4.0.0 (29.03.2022):
 * - changed default caption of 'back to map' button
 * - config.max_width='original' sets the limit to the original width of the image
 * - area.x, area.y and area.size are no more divided by 10
 * - added area.width and area.height (area.size can still be used)
 * (for older version changes see ccm.image_map-3.1.0.js)
 */

( () => {
  const component = {
    name: 'image_map',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.3.1.min.js',
    config: {
      "back": "⇽ Back to Map",
      "css": [ "ccm.load",
        [
          "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap.min.css",
          "https://ccmjs.github.io/akless-components/image_map/resources/styles-v2.min.css"
        ],
        { "url": "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap-fonts.min.css", "context": "head" }
      ],
      "dark": false,
//    "height": 500,
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.1.0.min.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/image_map/resources/templates.mjs" ],
      "ignore": { "areas": [] },
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAEsCAQAAACfsolDAAACkUlEQVR42u3TAQ0AAAzCsOPf9AXggLQSliwHzIsEYHTA6IDRAaMDRgeMDhgdMDoYHTA6YHTA6IDRAaMDRgeMDkYHjA4YHTA6YHTA6IDRAaOD0QGjA0YHjA4YHTA6YHTA6IDRweiA0QGjA0YHjA4YHTA6YHQwOmB0wOiA0QGjA0YHjA4YHYwOGB0wOmB0wOiA0QGjA0YHjA5GB4wOGB0wOmB0wOiA0QGjg9EBowNGB4wOGB0wOmB0wOhgdMDogNEBowNGB4wOGB0wOmB0MDpgdMDogNEBowNGB4wOGB2MDhgdMDpgdMDogNEBowNGB6MDRgeMDhgdMDpgdMDogNEBo4PRAaMDRgeMDhgdMDpgdMDoYHTA6IDRAaMDRgeMDhgdMDoYHTA6YHTA6IDRAaMDRgeMDhgdjA4YHTA6YHTA6IDRAaMDRgejA0YHjA4YHTA6YHTA6IDRweiA0QGjA0YHjA4YHTA6YHTA6GB0wOiA0QGjA0YHjA4YHTA6GB0wOmB0wOiA0QGjA0YHjA5GB4wOGB0wOmB0wOiA0QGjA0YHowNGB4wOGB0wOmB0wOiA0cHogNEBowNGB4wOGB0wOmB0MDpgdMDogNEBowNGB4wOGB0wOhgdMDpgdMDogNEBowNGB4wORgeMDhgdMDpgdMDogNEBo4PRAaMDRgeMDhgdMDpgdMDogNHB6IDRAaMDRgeMDhgdMDpgdDA6YHTA6IDRAaMDRgeMDhgdjA4YHTA6YHTA6IDRAaMDRgejSwBGB4wOGB0wOmB0wOiA0QGjg9EBowNGB4wOGB0wOmB0wOhgdMDogNEBowNGB4wOGB0wOhgdMDpgdMDogNEBowNGB4wOGB2MDhgdMDpgdMDogNEBowPtAV1EAS0sGKQOAAAAAElFTkSuQmCC",
//    "info": "",
      "libs": [ "ccm.load", [
        "https://ccmjs.github.io/akless-components/libs/bootstrap-5/js/popper.min.js",
        "https://ccmjs.github.io/akless-components/libs/bootstrap-5/js/bootstrap.bundle.min.js"
      ] ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.min.js", "greedy" ] ],
//    "onchange": event => console.log( 'onchange', event ),
//    "onmouseout": event => console.log( 'onmouseout', event ),
//    "onmouseover": event => console.log( 'onmouseover', event ),
//    "onstart": event => console.log( 'onstart', event ),
//    "preclick": event => { console.log( 'preclick', event ); return true; },
//    "render": event => console.log( 'render', event ),
//    "width": 500,
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // setup dark mode
        this.dark === 'auto' && this.element.classList.add( 'dark_auto' );
        this.dark === true && this.element.classList.add( 'dark_mode' );

        // preload map and area images and set initial width
        await Promise.all( this.ignore.areas.map( preload ).concat( preload( this ) ) );

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      }

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        // render map
        $.setContent( this.element, $.html( this.html.map( {
          image: this.image,
          width: this.width,
          height: this.height,
          info: this.info
        } ) ) );

        // render areas
        this.ignore.areas.forEach( this.renderArea );

        // initialize bootstrap tooltips
        this.libs && [ ...this.element.querySelectorAll( '[data-bs-toggle="tooltip"]' ) ].forEach( tooltipTriggerEl =>
          new bootstrap.Tooltip( tooltipTriggerEl, { container: this.element, html: true, placement: 'auto' } )
        );

        // trigger 'onstart' callback
        this.onstart && await this.onstart( { instance: this } );

      };

      /**
       * renders an area on the image map
       * @param {Object} area_data
       */
      this.renderArea = area_data => {

        // render area in map
        const $map = this.element.querySelector( '#map' );
        const $area = $.html( this.html.area( area_data ) );
        $map.appendChild( $area );

        // listen to mouseout event => trigger callback
        $area.addEventListener( 'mouseout', () => this.onmouseout && this.onmouseout( { area_data: $.clone( area_data ), element: $area, instance: this } ) );
        $area.addEventListener( 'mouseover', () => this.onmouseover && this.onmouseover( { area_data: $.clone( area_data ), element: $area, instance: this } ) );

        // trigger 'onrender' callback
        this.onrender && this.onrender( { area_data: $.clone( area_data ), element: $area, instance: this } );

        // set click event
        area_data.app && $area.addEventListener( 'click', async () => {

          // disabled area? => abort
          if ( area_data.disabled ) return;

          // trigger 'preclick' callback
          if ( this.preclick && !( await this.preclick( { area_data: $.clone( area_data ), element: $area, instance: this } ) ) ) return;

          // render HTMl template for an clicked app
          $.setContent( this.element, $.html( this.html.app, { caption: this.back } ) );

          // set click event for 'back to map' button
          this.element.querySelector( '#back' ).addEventListener( 'click', this.start );

          // show app
          const $app = this.element.querySelector( '#app' );
          if ( !$.isInstance( area_data.app ) ) {
            $.setContent( $app, $.loading( this ) );
            area_data.app = await $.appDependency( area_data.app ).then( app => $.solveDependency( app, this ) );
          }
          $.setContent( $app, area_data.app.root );

          // log 'click' event
          this.logger && this.logger.log( 'click', { area_data: $.clone( area_data ) } );

          // trigger 'onchange' callback
          this.onchange && await this.onchange( { area_data: $.clone( area_data ), instance: this } );

        } );

      };

      /**
       * preloads an image and sets the initial width
       * @param {Object} obj - contains the image and the width
       */
      const preload = obj => obj.image && !obj.width && new Promise( ( resolve, reject ) => {
        const img = new Image();
        img.onload = () => { if ( !obj.width ) obj.width = img.width; resolve(); }
        img.onerror = reject;
        img.src = obj.image;
      } );

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
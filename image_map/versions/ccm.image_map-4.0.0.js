/**
 * @overview ccmjs-based web component for an image map
 * @author André Kless <andre.kless@web.de> 2019-2020, 2022
 * @license The MIT License (MIT)
 * @version 4.0.0
 * @changes
 * version 4.0.0 (23.03.2022):
 * - changed default caption of 'back to map' button
 * - config.max_width='original' sets the limit to the original width of the image
 * - area.x, area.y and area.size are no more divided by 10
 * - added area.width and area.height (area.size can still be used)
 * version 3.1.0 (19.03.2022):
 * - added bootstrap 5 with popper.js for tooltips as default
 * - tooltips on mouseover for app regions
 * - infobox moves to top in default layout
 * - infobox only shows map info
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
    version: [ 4, 0, 0 ],
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
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.1.0.min.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/image_map/resources/templates.mjs" ],
      "ignore": { "areas": [] },
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  //  "info": "",
      "libs": [ "ccm.load", [
        "https://ccmjs.github.io/akless-components/libs/bootstrap-5/js/popper.min.js",
        "https://ccmjs.github.io/akless-components/libs/bootstrap-5/js/bootstrap.bundle.min.js"
      ] ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.min.js", "greedy" ] ],
  //  "max_width": "original",
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
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // setup dark mode
        this.dark === 'auto' && this.element.classList.add( 'dark_auto' );
        this.dark === true && this.element.classList.add( 'dark_mode' );

        // the original width of the map image can be used as maximum width of the map
        if ( this.max_width === 'original' )
          await new Promise( (resolve, reject ) => {
            const img = new Image();
            img.onload = () => resolve( this.max_width = img.width + 'px' );
            img.onerror = reject;
            img.src = this.image;
          } );

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
          info: this.info,
          max_width: this.max_width
        } ) ) );

        // render areas
        this.ignore.areas.forEach( this.renderArea );

        // initialize bootstrap tooltips
        this.libs && [ ...this.element.querySelectorAll( '[data-bs-toggle="tooltip"]' ) ].forEach( tooltipTriggerEl =>
          new bootstrap.Tooltip(tooltipTriggerEl, { container: this.element, html: true, placement: 'auto' } )
        );

        // trigger 'onstart' callback
        this.onstart && await this.onstart( { instance: this } );

      };

      /**
       * renders an area on the image map
       * @param {Object} area_data
       */
      this.renderArea = area_data => {

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

          // show app
          $.setContent( this.element, $.html( this.html.app, { caption: this.back } ) );

          // set click event for 'back to map' button
          this.element.querySelector( '#back' ).addEventListener( 'click', this.start );

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

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
/**
 * @overview ccm component for an image map
 * @author André Kless <andre.kless@web.de> 2019-2020
 * @license The MIT License (MIT)
 * @version latest (1.1.0)
 * @changes
 * version 1.1.0 (02.02.2020):
 * - uses ccm v25.5.2
 * - uses helper.mjs v5.1.0 as default
 * - added 'onrender' callback
 * - added 'preclick' callback
 * - areas could be disabled
 * version 1.0.1 (02.02.2020):
 * - uses ccm v25.0.0
 * version 1.0.0 (19.11.2019)
 */

( () => {

  const component = {

    name: 'image_map',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.5.2.js',

    config: {
      "back": "← Back to Map",
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/image_map/resources/styles.css" ],
      "data": { "areas": [] },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-5.1.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/image_map/resources/templates.html" ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onchange": event => console.log( event ),
  //  "onmouseout": event => console.log( event ),
  //  "onmouseover": event => console.log( event ),
  //  "onstart": event => console.log( event ),
  //  "preclick": event => console.log( event ),
  //  "render": event => console.log( event )
    },

    Instance: function () {

      let $;

      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper );

      };

      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        /**
         * dataset for rendering
         * @type {Object}
         */
        const dataset = await $.dataset( this.data );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, $.clone( dataset ) ) );

        /**
         * renders an area of the image map
         * @param {Object} area - area data
         */
        const renderArea = async area => {

          /**
           * area element
           * @type {Element}
           */
          const $area = $.html( this.html.area, $.clone( area ) );

          // render HTML structure of an area
          $.append( this.element.querySelector( '#map' ), $area );

          // perform mouseout callback on mouseout event
          $area.addEventListener( 'mouseout', () =>
            this.onmouseout && this.onmouseout( { data: $.clone( area ), element: $area, instance: this } )
          );

          // set mouseover event
          $area.addEventListener( 'mouseover', event => {

            // perform mouseover callback
            this.onmouseover && this.onmouseover( { data: $.clone( area ), element: $area, instance: this } );

            renderInfo( area.info );    // render info in info section
            event.stopPropagation();    // stop event propagation

          } );

          // trigger 'onrender' callback
          this.onrender && this.onrender( { data: $.clone( area ), elem: $area, instance: this } );

          // set click event
          area.action && $area.addEventListener( 'click', async () => {

            // disabled area? => abort
            if ( area.disabled ) return;

            // trigger 'preclick' callback
            if ( this.preclick && !( await this.preclick( { data: $.clone( area ), elem: $area, instance: this } ) ) ) return;

            // perform action
            if ( $.isDependency( area.action ) ) {
              area.action[ 2 ] = await $.solveDependency( area.action[ 2 ] );
              area.action[ 2 ].parent = this;
            }
            const action = await $.solveDependency( area.action );
            if ( $.isInstance( action ) ) {
              $.setContent( this.element, $.html( this.html.app, { caption: this.back, onclick: this.start } ) );
              $.setContent( this.element.querySelector( '#app' ), action.root );
              await action.start();
            }
            else $.action( action );

            // perform change callback
            this.onchange && await this.onchange( { data: $.clone( area ), instance: this } );

          } );

        };

        // render areas of image map
        await $.asyncForEach( dataset.areas, renderArea );

        /**
         * info section
         * @type {Element}
         */
        const $info = this.element.querySelector( '#info' );

        /**
         * renders content of info section
         * @param {ccm.types.html} content
         */
        const renderInfo = content => {

          // no info content? => hide info section
          $info.style.display = content === undefined ? 'none' : 'block';

          // render content in info section
          $.setContent( $info, $.html( content ) );

        };

        // render default content of info section
        renderInfo( dataset.info );

        // render info on hover
        this.element.querySelector( '#map' ).addEventListener( 'mouseover', () => renderInfo( dataset.info ) );

        // perform start callback
        this.onstart && await this.onstart( { data: $.clone( dataset ), instance: this } );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
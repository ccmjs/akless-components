/**
 * @overview ccm component for an image map
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (19.11.2019)
 */

( () => {

  const component = {

    name: 'image_map',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-24.1.1.js',

    config: {
      "back": "← Back to Map",
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/image_map/resources/styles.css" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/image_map/resources/templates.html" ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onchange": event => console.log( event ),
  //  "onmouseout": event => console.log( event ),
  //  "onmouseover": event => console.log( event ),
  //  "onstart": event => console.log( event )

    },

    Instance: function () {

      let $;

      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

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
         * map section
         * @type {Element}
         */
        const $map = this.element.querySelector( '#map' );

        // render background image with scaled parameters
        const width = $map.clientWidth;
        const factor = width / dataset.width;
        const height = dataset.height * factor;
        $map.style.backgroundImage = `url('${dataset.image}')`;
        $map.style.backgroundSize = `${width}px ${height}px`;
        $map.style.width = `${width}px`;
        $map.style.height = `${height}px`;

        /**
         * renders an area of the image map
         * @param {Object} area - area data
         */
        const renderArea = area => {

          /**
           * area element
           * @type {Element}
           */
          const $area = $.html( this.html.area, $.clone( area ) );

          // render HTML structure of an area
          $.append( this.element.querySelector( '#map' ), $area );

          // render background image with scaled parameters
          const width = area.width * factor;
          const height = area.height * factor;
          $area.style.setProperty( 'left', `${area.x * factor}px` );
          $area.style.setProperty( 'top', `${area.y * factor}px` );
          $area.style.backgroundImage = `url('${area.image}')`;
          $area.style.backgroundSize = `${width}px ${height}px`;
          $area.style.width = `${width}px`;
          $area.style.height = `${height}px`;

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

          // set click event
          area.action && $area.addEventListener( 'click', async () => {

            // perform action
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
        dataset.areas.forEach( renderArea );

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

        // resize image map on window resize event
        let waiting = false;
        const onResize = async () => {
          if ( waiting ) return; waiting = true;                // already waiting? => abort
          window.removeEventListener( 'resize', onResize );     // remove event listener
          await $.sleep( 1000 );                                // wait a second
          await this.start();                                   // resize image map
        };
        window.addEventListener( 'resize', onResize );

        // perform start callback
        this.onstart && await this.onstart( { data: $.clone( dataset ), instance: this } );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
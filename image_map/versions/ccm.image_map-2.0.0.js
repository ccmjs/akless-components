/**
 * @overview ccm component for an image map
 * @author André Kless <andre.kless@web.de> 2019-2020
 * @license The MIT License (MIT)
 * @version 2.0.0
 * @changes
 * version 2.0.0 (11.05.2020):
 * - changed configuration properties
 * - changes parameters of callbacks
 * (for older version changes see ccm.image_map-1.1.0.js)
 */

( () => {

  const component = {

    name: 'image_map', version: [ 2, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.5.2.js',

    config: {
      "areas": [],
      "back": "← Back to Map",
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/image_map/resources/styles.css" ],
      "data": { "areas": [] },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-5.1.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/image_map/resources/templates.html" ],
      "ignore": { "apps": [] },
      "image": "",
      "info": "",
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

      this.ready = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper );                 // set shortcut to help functions
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );  // logging of 'ready' event
      };

      this.start = async () => {

        this.logger && this.logger.log( 'start' );                                      // logging of 'start' event
        $.setContent( this.element, $.html( this.html.main, { image: this.image } ) );  // render main HTML structure
        for ( let i = 0; i < this.areas.length; i++ )                                   // add areas in the image map
          await this.renderArea( this.areas[ i ], this.ignore.apps[ i ] );
        this.renderInfo( this.info );                                                   // render map information's in info section
        this.onstart && await this.onstart( { instance: this } );                       // trigger 'onstart' callback

        // show map information's when map is hovered
        this.element.querySelector( '#map' ).addEventListener( 'mouseover', () => this.renderInfo( this.info ) );

      };

      /**
       * renders an area of the image map
       * @param {Object} area_data - area data
       * @param {Array} [app_dependency] - instance dependency of the app that is rendered when area will be clicked
       */
      this.renderArea = async ( area_data, app_dependency ) => {

        const $area = $.html( this.html.area, $.clone( area_data ) );  // prepare area HTML structure
        if ( area_data.disabled ) $area.classList.add( 'disabled' );   // disabled area? => mark area as disabled in frontend
        $.append( this.element.querySelector( '#map' ), $area );       // put prepared HTML structure into frontend map

        // trigger 'mouseout' callback on mouseout event and set 'mouseover' event
        $area.addEventListener( 'mouseout', () => this.onmouseout && this.onmouseout( { area_data: $.clone( area_data ), app: $.clone( app_dependency ), element: $area, instance: this } ) );
        $area.addEventListener( 'mouseover', event => {
          this.onmouseover && this.onmouseover( { area_data: $.clone( area_data ), app: $.clone( app_dependency ), instance: this } );  // trigger mouseover callback
          this.renderInfo( area_data.info );  // render area information's in info section
          event.stopPropagation();            // prevents trigger of 'mouseover' event of the map
        } );

        // trigger 'onrender' callback and set click event
        this.onrender && this.onrender( { area_data: $.clone( area_data ), app: $.clone( app_dependency ), element: $area, instance: this } );
        app_dependency && $area.addEventListener( 'click', async () => {

          // disabled area? => abort
          if ( area_data.disabled ) return;

          // trigger 'preclick' callback
          if ( this.preclick && !( await this.preclick( { area_data: $.clone( area_data ), app: $.clone( app_dependency ), element: $area, instance: this } ) ) ) return;

          // show app
          app_dependency[ 2 ] = await $.solveDependency( app_dependency[ 2 ] );
          app_dependency[ 2 ].parent = this;
          const app_instance = await $.solveDependency( app_dependency );
          delete app_dependency[ 2 ].parent;
          $.setContent( this.element, $.html( this.html.app, { caption: this.back, onclick: this.start } ) );
          $.setContent( this.element.querySelector( '#app' ), app_instance.root );
          await app_instance.start();

          // trigger 'onchange' callback
          this.onchange && await this.onchange( { area_data: $.clone( area_data ), app: $.clone( app_dependency ), instance: this } );

        } );

      };

      /**
       * renders content of info section
       * @param {ccm.types.html} content
       */
      this.renderInfo = content => {
        const info_elem = this.element.querySelector( '#info' );             // select info section
        info_elem.style.display = content === undefined ? 'none' : 'block';  // no content? => hide info section
        $.setContent( info_elem, $.html( content ) );                        // render content of info section
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
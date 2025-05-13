/**
 * @overview ccmjs-based web component for routing
 * @author André Kless <andre.kless@web.de> 2019-2025
 * @license MIT License
 * @version 4.0.1
 * @changes
 * version 4.0.1 (13.05.2025):
 * - bugfix: no lost of pathname in URL
 * - no parse of integer in routes
 * version 4.0.0 (18.07.2024):
 * - configurable separator for route parameters
 * - default separator for route parameters is '*' (instead of '-')
 * - uses ccmjs v27.5.0 as default
 * (for older version changes see ccm.routing-3.0.0.js)
 */

( () => {
  const component = {
    name: 'routing',
    version: [4, 0, 1],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.5.0.min.js',
    config: {
//    "app": "1558132111384X2108359471753687",
      "separator": "*"
    },
    Instance: function () {

      /**
       * defined app routes
       * @type {Object.<string,Function>}
       */
      let routes;

      /**
       * current app route
       * @type {string}
       */
      let current_route = '';

      /**
       * is first use
       * @type {boolean}
       */
      let first = true;

      /**
       * when the instance is created, when all dependencies have been resolved and before the dependent sub-instances are initialized and ready
       * @returns {Promise<void>}
       */
      this.init = async () => {

        // no app ID? => use component name
        if ( !this.app && this.parent ) this.app = this.parent.component.name;

      };

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {
        if ( !this.app && this.parent ) this.app = this.parent.component.name;  // no app ID? => use component name
        window.addEventListener( 'popstate', this.refresh );                    // check route on 'popstate' event
      };

      /**
       * defines app routes
       * @param {Object.<string,Function>} _routes
       * @example routing.define( { home: async () => {}, page: async page_nr => {} } );
       */
      this.define = _routes => { routes = _routes; };

      /**
       * gets current app route
       * @returns {string}
       */
      this.get = () => new URLSearchParams( location.search ).get( 'ccm-' + this.app ) || '';

      /**
       * sets current app route
       * @param {string} route
       * @example routing.set('home')
       * @example routing.set('page-5')
       */
      this.set = route => {
        if ( route === current_route ) return;
        const url = new URL( location.href );
        url.searchParams.set( 'ccm-' + this.app, current_route = route );
        window.history[ ( first ? 'replace' : 'push' ) + 'State' ]( '', '', '?' + url.toString() );
        first = false;
      }

      /**
       * performs route specific function
       * @returns {Promise<void>}
       */
      this.refresh = async () => {
        const route = this.get();
        if ( route === current_route ) return;
        const split = route.split( this.separator );
        current_route = route;
        if ( routes[ split[ 0 ] ] )
          await routes[ split[ 0 ] ].apply( undefined, split.slice( 1 ) )
        else if ( this.parent )
          await this.parent.start();
      }

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
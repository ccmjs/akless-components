/**
 * @overview ccmjs-based web component for routing
 * @author André Kless <andre.kless@web.de> 2019-2021
 * @license MIT License
 * @version 3.0.0
 * @changes
 * version 3.0.0 (22.10.2021): reimplementation
 * (for older version changes see ccm.routing-2.0.7.js)
 */

( () => {
  const component = {
    name: 'routing',
    version: [ 3, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.1.1.min.js',
    config: {
//    "app": "1558132111384X2108359471753687"
    },
    Instance: function () {

      /**
       * defined app routes
       * @type {Object.<string,Function>}
       */
      let routes;

      /**
       * search params of the URL
       * @type {URLSearchParams}
       */
      const searchParams = new URLSearchParams( location.search );

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {
        // no app ID? => use component name
        if ( !this.app && this.parent ) this.app = this.parent.component.name;
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
      this.get = () => {
        const route = searchParams.get( 'ccm-' + this.app );
        return route && route.split( '-' ).map( value => parseInt( value ) || value ) || '';
      }

      /**
       * sets current app route
       * @param {string} route
       * @example routing.set('home')
       * @example routing.set('page-5')
       */
      this.set = route => {
        searchParams.set( 'ccm-' + this.app, route );
        window.history.replaceState( '', '', '?' + searchParams.toString() );
      }

      /**
       * performs route specific function
       * @returns {Promise<void>}
       */
      this.refresh = async () => {
        const route = this.get();
        route && routes[ route[ 0 ] ] && routes[ route[ 0 ] ].apply( undefined, route.slice( 1 ) );
      }

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
/**
 * @overview ccm component for routing
 * @author André Kless <andre.kless@web.de> 2019
 * @license MIT License
 * @version latest (2.0.3)
 * @changes
 * version 2.0.3 (05.07.2019):
 * - bug fixes for change of current app route
 * - uses ccm v21.1.1
 * version 2.0.2 (19.06.2019):
 * - bug fix for change of current app route
 * - uses ccm v21.0.1
 * version 2.0.1 (01.06.2019):
 * - bug fix: added async await for define and refresh
 * - uses ccm v20.7.2
 * version 2.0.0 (29.05.2019):
 * - define routes includes reset of last route and a refresh
 * - uses ccm v20.7.1
 * (for older version changes see ccm.routing-1.2.2.js)
 */

( () => {

  const component = {

    name: 'routing',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {
//    "app": "1558132111384X2108359471753687",
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ]
    },

    Instance: function () {

      let $, flag = false, last_route = ''; const _routes = {};

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // app ID is given as function? => determine app ID by function
        if ( this.app === true && this.parent ) this.app = ( await ccm.load( { "url": "https://ccmjs.github.io/akless-components/modules/md5.js", "type": "module", "import": "md5" } ) )( this.parent.config );

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

        // listen to hash change event => perform route specific functions
        window.addEventListener( 'hashchange', () => flag ? flag = false : this.refresh() );

      };

      /**
       * defines routes
       * @param {Object.<string,function>} routes
       * @example routing.define( { home: async () => {}, show_items: async () => {} } );
       *
       */
      this.define = async routes => { Object.assign( _routes, routes ); last_route = ''; await this.refresh(); };

      /**
       * returns current app route of location hash
       * @returns {string} route name and parameters
       * @example home
       * @example show_items-item_a-item_b
       */
      this.get = () => {

        let route = '';
        window.location.hash.substr( 1 ).split( '&' ).forEach( entry => {
          entry = entry.split( '=' );
          if ( entry.length === 1 && !this.app )
            route = entry[ 0 ];
          else if ( entry.length > 1 && this.app === entry[ 0 ] )
            route = entry[ 1 ];
        } );
        return route;

      };

      /**
       * changes current app route in location hash
       * @param {string} route - route name
       * @example routing.set( "home" );
       * @example routing.set( "show_items" );
       */
      this.set = route => {

        // abort if route hasn't changed
        if ( route === last_route ) return; else last_route = route;

        /**
         * route already exists in location hash
         * @type {boolean}
         */
        let exist = false;

        // prevent trigger of hash change event
        flag = true;

        // update route in location hash (if exists)
        if ( window.location.hash.length > 1 ) {
          const hash = '#' + window.location.hash.substr( 1 ).split( '&' ).map( entry => {
            const split = entry.split( '=' );
                 if ( split.length === 1 &&               !this.app ) { split[ 0 ] = route; exist = true; }
            else if ( split.length === 2 && split[ 0 ] === this.app ) { split[ 1 ] = route; exist = true; }
            return split.join( '=' );
          } ).join( '&' );
          if ( exist ) window.location.hash = hash;
        }

        // route not exists in location hash? => add route in location hash
        if ( !exist )
          if ( !this.app )
            window.location.hash = '#' + route + ( window.location.hash.length > 1 ? '&' : '' ) + window.location.hash.substr( 1 );
          else
            window.location.hash = window.location.hash + ( window.location.hash.length > 1 ? '&' : '' ) + this.app + '=' + route;

      };

      /** evaluates location hash, checks routes and performs route specific function */
      this.refresh = async () => {

        let route = this.get();
        if ( route === last_route ) return;
        last_route = route;
        const params = route.split( '-' );
        route = params.shift();
        _routes[ route ] && await _routes[ route ].apply( undefined, params );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
/**
 * @overview ccmjs-based web component for data logging
 * @author André Kless <andre.kless@web.de> 2016-2018
 * @license The MIT License (MIT)
 * @version 3.1.0
 * @changes
 * version 3.1.0 (25.04.2018)
 * - prevent logging of complex objects
 * - uses ccm v16.2.0
 * version 3.0.0 (18.04.2018)
 * - uses ccm v16.1.0
 * - uses ccm.user.js v4.0.0
 * version 2.0.1 (12.01.2018)
 * - accepts lib and module for pseudonymization
 * - bugfix for logging specific subset settings
 * version 2.0.0 (06.12.2017)
 * - supports logging of specific subsets
 * - uses ECMAScript 6
 * - uses module instead of lib for md5
 * - for pseudonymization, md5 is applied only once
 * - uses ccm v12.12.0
 * version 1.0.0 (19.10.2017)
 */

{
  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'log',

    /**
     * component version
     * @type {number[]}
     */
    version: [ 3, 1, 0 ],

    /**
     * reference to used framework version
     * @type {Object}
     */
    ccm: {
      url: 'https://ccmjs.github.io/ccm/versions/ccm-16.2.0.js',
      integrity: 'sha384-4RvrFed/8lyOSSe6yUX6uSVdG8X5TSM83+JAKGQR+Ejt1WR40lpWw148jLRPxsHE',
      crossorigin: 'anonymous'
    },

    /**
     * default instance configuration
     * @type {Object}
     */
    config: {

  //  events:  {string[]|Object.<string,string[]>} logged events, default: all (object -> individual setting which information should be recorded at which events)
  //  logging: {string[]|object} logged informations, default: all
  //  logging.data:    {boolean|string[]} log event specific informations (string[] -> log this only for these events)
  //  logging.browser: {boolean|string[]} log browser informations
  //  logging.parent:  {boolean|string[]} log ccm context parent information
  //  logging.root:    {boolean|string[]} log ccm context root information
  //  logging.user:    {boolean|string[]} log user informations
  //  logging.website: {boolean|string[]} log website informations
  //  only: {Object.<string,string[]|object>} settings for logging only specific subsets
  //  hash: [ 'ccm.module', 'https://ccmjs.github.io/akless-components/modules/md5.mjs' ]
  //  onfinish: function ( instance, results ) { console.log( results ); }

    },

    /**
     * for creating instances out of this component
     * @constructor
     */
    Instance: function () {

      /**
       * own reference for inner functions
       * @type {Instance}
       */
      const self = this;

      /**
       * privatized instance members
       * @type {Object}
       */
      let my;

      /**
       * shortcut to help functions
       * @type {Object.<string,function>}
       */
      let $;

      /**
       * global unique id of this instance
       * @type {string}
       */
      let id;

      /**
       * is called once after the initialization and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.ready = callback => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        // generate global unique instance id
        id = $.generateKey();

        // support different forms of data structure
        uniformData();

        callback();

        /** brings given data to uniform data structure */
        function uniformData() {

          // accept arrays for event settings
          if ( my.events ) {
            $.arrToObj( my, 'events' );
            for ( const key in my.events )
              $.arrToObj( my.events, key );
          }

          // accept arrays for logging settings
          if ( my.logging ) {
            $.arrToObj( my, 'logging' );
            for ( const key in my.logging )
              $.arrToObj( my.logging, key );
          }

          // accept arrays for specific subset settings
          if ( my.only )
            for ( const key in my.only )
              $.arrToObj( my.only, key );

        }

      };

      /**
       * logs event data
       * @param {string} event - unique event index
       * @param {*} [data] - event specific informations
       */
      this.log = ( event, data ) => {

        // ignored event? => abort
        if ( my.events && !my.events[ event ] ) return;

        /**
         * result data
         * @type {Object}
         */
        let results = { session: id, event: event };

        // log event specific informations
        if ( data !== undefined && check( 'data' ) )
          results.data = prepareData( data );

        // add browser informations
        if ( check( 'browser' ) )
          results.browser = {
            appCodeName: navigator.appCodeName,
            appName: navigator.appName,
            appVersion: navigator.appVersion,
            language: navigator.language,
            oscpu: navigator.oscpu,
            platform: navigator.platform,
            userAgent: navigator.userAgent
          };

        // log ccm context parent informations
        if ( self.parent && check( 'parent' ) )
          results.parent = {
            name:    self.parent.component.name,
            version: self.parent.component.version
          };

        // log ccm context root informations
        if ( self.parent && check( 'root' ) ) {
          const root = self.ccm.context.root( self );
          results.root = {
            name:    root.component.name,
            version: root.component.version
          };
        }

        // log user informations
        if ( check( 'user' ) ) {
          const user = self.ccm.context.find( self, 'user' );
          if ( user ) {
            const obj = { realm: user.getRealm() };
            if ( user.isLoggedIn() ) {
              const userdata = user.data();
              obj.user = my.hash ? ( $.isObject( my.hash ) ? my.hash.md5( userdata.user ) : md5( userdata.user ) ) : userdata.user;
            }
            results.user = obj;
          }
        }

        // log website informations
        if ( check( 'website' ) )
          results.website = window.location.href;

        // log only specific subsets
        if ( my.only )
          for ( const kind in my.only ) {
            if ( typeof results[ kind ] !== 'object' ) continue;
            const specific = {};
            for ( const key in my.only[ kind ] ) {
              const value = $.deepValue( results[ kind ], key );
              if ( value !== undefined )
                $.deepValue( specific, key, value );
            }
            results[ kind ] = specific;
          }

        // provide result data
        $.onFinish( self, $.protect( results ) );

        /**
         * checks if an event must be logged
         * @param {string} kind - kind of event
         * @returns {boolean}
         */
        function check( kind ) {

          if ( my.events && $.isObject( my.events[ event ] ) && !my.events[ event ][ kind ] ) return false;
          if ( my.logging ) {
            if ( !my.logging[ kind ] ) return false;
            if ( $.isObject( my.logging[ kind ] ) && !my.logging[ kind ][ event ] ) return false;
          }
          return true;

        }

        /**
         * prevents logging of complex objects
         * @param {*} data
         * @returns {*}
         */
        function prepareData( data ) {

          $.clone( data );

          if ( $.isDatastore( data ) )
            return data.source();

          if ( $.isComponent( data ) || $.isInstance( data ) )
            return data.index;

          if ( $.isNode( data ) )
            return undefined;

          if ( $.isObject( data ) || Array.isArray( data ) )
            for ( const i in data )
              data[ i ] = prepareData( data[ i ] );

          return data;

        }

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}
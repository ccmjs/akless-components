/**
 * @overview ccmjs-based web component for data logging
 * @author André Kless <andre.kless@web.de> 2016-2020
 * @license The MIT License (MIT)
 * @version 4.0.4
 * @changes
 * version 4.0.4 (10.04.2020)
 * - uses ccm v25.4.0
 * - uses helper.mjs v5.0.0 as default
 * version 4.0.3 (21.03.2020)
 * - uses ccm v25.1.0
 * - no privatize of instance members
 * version 4.0.2 (06.02.2019)
 * - uses ccm v20.0.0
 * version 4.0.1 (03.09.2018)
 * - bug fix for cloning event specific informations
 * version 4.0.0 (02.09.2018)
 * - uses ccm v18.0.0
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

( () => {

  const component = {

    name: 'log', version: [ 4, 0, 4 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.4.0.js',

    config: {

      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-5.0.0.mjs" ]

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

    Instance: function () {

      const self = this;
      let $;

      /**
       * global unique id of this instance
       * @type {string}
       */
      let id;

      this.ready = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper );

        // generate global unique instance id
        id = $.generateKey();

        // support different forms of data structure
        uniformData();

        /** brings given data to uniform data structure */
        function uniformData() {

          // accept arrays for event settings
          if ( self.events ) {
            $.arrToObj( self, 'events' );
            for ( const key in self.events )
              $.arrToObj( self.events, key );
          }

          // accept arrays for logging settings
          if ( self.logging ) {
            $.arrToObj( self, 'logging' );
            for ( const key in self.logging )
              $.arrToObj( self.logging, key );
          }

          // accept arrays for specific subset settings
          if ( self.only )
            for ( const key in self.only )
              $.arrToObj( self.only, key );

        }

      };

      /**
       * logs event data
       * @param {string} event - unique event index
       * @param {*} [data] - event specific informations
       */
      this.log = ( event, data ) => {

        // ignored event? => abort
        if ( self.events && !self.events[ event ] ) return;

        /**
         * result data
         * @type {Object}
         */
        let results = { session: id, event: event };

        // log event specific informations
        if ( data !== undefined && check( 'data' ) )
          results.data = prepareData( $.clone( data ) );

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
              obj.user = self.hash ? ( $.isObject( self.hash ) ? self.hash.md5( userdata.user ) : md5( userdata.user ) ) : userdata.user;
            }
            results.user = obj;
          }
        }

        // log website informations
        if ( check( 'website' ) )
          results.website = window.location.href;

        // log only specific subsets
        if ( self.only )
          for ( const kind in self.only ) {
            if ( typeof results[ kind ] !== 'object' ) continue;
            const specific = {};
            for ( const key in self.only[ kind ] ) {
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

          if ( self.events && $.isObject( self.events[ event ] ) && !self.events[ event ][ kind ] ) return false;
          if ( self.logging ) {
            if ( !self.logging[ kind ] ) return false;
            if ( $.isObject( self.logging[ kind ] ) && !self.logging[ kind ][ event ] ) return false;
          }
          return true;

        }

        /**
         * prevents logging of complex objects
         * @param {*} data
         * @returns {*}
         */
        function prepareData( data ) {

          if ( $.isDatastore( data ) )
            return data.source();

          if ( $.isComponent( data ) || $.isInstance( data ) )
            return data.index;

          if ( $.isSpecialObject( data ) || typeof data === 'function' )
            return undefined;

          if ( $.isObject( data ) || Array.isArray( data ) )
            for ( const i in data ) {
              const value = prepareData( data[ i ] );
              if ( value === undefined )
                delete data[ i ];
              else
                data[ i ] = value;
            }

          return data;

        }

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
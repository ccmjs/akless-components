/**
 * @overview ccmjs-based web component for data logging
 * @author André Kless <andre.kless@web.de> 2016-2021
 * @license The MIT License (MIT)
 * @version 5.0.1
 * @changes
 * version 5.0.1 (04.03.2021):
 * - uses ccmjs v26.1.1 as default
 * - uses helper.mjs v7.0.0 as default
 * - updated minified component line
 * version 5.0.0 (19.04.2020)
 * - changed config parameters
 * - uses object mask to define specific subset of event data
 * - added optional logging of document.referrer
 * - uses helper.mjs v5.1.0 as default
 * (for older version changes see ccm.log-4.0.4.js)
 */

( () => {

  const component = {
    name: 'log',
    version: [ 5, 0, 1 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.1.1.js',
    config: {
//    "events": [ "ready", "start", "change" ],
//    "hash": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/md5.mjs" ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.0.0.mjs" ],
//    "mask": {},
//    "onfinish": { "log": true }
    },

    Instance: function () {

      let $, id;

      this.ready = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // generate global unique instance id
        id = $.generateKey();

        // convert event settings from array to object
        if ( Array.isArray( this.events ) ) this.events = $.arrToObj( this.events );

      };

      /**
       * logs event data
       * @param {string} event - unique event index
       * @param {*} [data] - event specific information's
       */
      this.log = ( event, data ) => {

        if ( this.events && !this.events[ event ] ) return;  // log only wanted events
        const event_data = { session: id, event: event };    // initial event data

        // add event specific information's
        if ( data !== undefined ) event_data.data = $.clone( data );

        // add browser information's
        event_data.browser = $.filterProperties( navigator, 'appCodeName', 'appName', 'appVersion', 'language', 'oscpu', 'platform', 'userAgent' );

        // add ccm context parent information's
        if ( this.parent ) event_data.parent = $.filterProperties( this.parent.component, 'index', 'name', 'version' );

        // add ccm context root information's
        if ( this.parent ) event_data.root = $.filterProperties( this.ccm.context.root( this ).component, 'index', 'name', 'version' );

        // add user information's
        const user = ( this.ccm.context.highestByProperty( this, 'user' ) || {} ).user;
        if ( user ) {
          event_data.user = { realm: user.getRealm() };
          if ( user.isLoggedIn() ) {
            const user_key = user.getValue().key;
            event_data.user.key = this.hash ? ( $.isObject( this.hash ) ? this.hash.md5( user_key ) : md5( user_key ) ) : user_key;
          }
        }

        // add website and referrer information
        event_data.website = window.location.href;
        event_data.referrer = document.referrer;

        // trigger finish actions with final prepared and filtered event data
        $.onFinish( this, prepareData( $.filterData( event_data, this.events && $.isObject( this.events[ event ] ) ? this.events[ event ] : this.mask ) ) );

      };

      /**
       * prevents logging of special objects and undefined properties
       * @param {*} data
       * @returns {*}
       */
      const prepareData = data => {
        if ( $.isDatastore( data ) ) return data.source();
        if ( $.isComponent( data ) || $.isInstance( data ) ) return data.index;
        if ( $.isSpecialObject( data ) || typeof data === 'function' ) return undefined;
        if ( $.isObject( data ) || Array.isArray( data ) )
          for ( const i in data ) {
            const value = prepareData( data[ i ] );
            value === undefined || value === '' ? delete data[ i ] : data[ i ] = value;
          }
        return data;
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
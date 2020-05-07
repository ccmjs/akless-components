/**
 * @overview ccm component for quest maps
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (06.05.2020)
 */

( () => {

  const component = {

    name: 'quest_map',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.5.2.js',

    config: {
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/quest_map/resources/styles.css" ],
      "data": { "store": [ "ccm.store" ] },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-5.1.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/quest_map/resources/templates.html" ],
      "image_map": [ "ccm.component", "https://ccmjs.github.io/akless-components/image_map/versions/ccm.image_map-1.1.0.js" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
//    "onchange": event => console.log( event ),
//    "onstart": event => console.log( event ),
//    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.6.0.js" ]
    },

    Instance: function () {

      let $, app_data, user_app_data;

      this.init = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper );  // set shortcut to help functions
        if ( this.user ) this.user.onchange = this.start;       // listen to login/logout events => restart
      };

      this.ready = async () => {
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );  // logging of 'ready' event
      };

      this.start = async () => {

        $.setContent( this.element, $.loading( this ) );  // render loading icon
        app_data = await $.dataset( this.data );          // get app data
        user_app_data = this.user && this.user.isLoggedIn() && await this.user.getAppData( this.app_key );
        if ( !app_data.areas ) app_data.areas = [];       // set default values

        for ( let i = app_data.areas.length - 1; i >= 0; i-- ) {
          const area = app_data.areas[ i ];
          if ( area.action && area.postcondition )
            area.action[ 2 ] = { key: area.action[ 2 ], onfinish: async () => {
              await performPostcondition( area.postcondition );
              await this.start();
            } };
          area.disabled = !( await checkPrecondition( area.precondition_enabled ) );
          if ( !( await checkPrecondition( area.precondition_visible ) ) ) app_data.areas.splice( i, 1 );
        }

        this.logger && this.logger.log( 'start', $.clone( app_data ) );  // logging of 'start' event
        const main_elem = $.html( this.html.main );                      // prepare main HTML structure

        // render top container
        if ( this.user ) { $.append( main_elem.querySelector( '#top' ), this.user.root ); this.user.start(); }

        // render image map
        await this.image_map.start( {
          root: main_elem.querySelector( '#image_map' ),
          data: {
            store: [ 'ccm.store', { app: app_data } ],
            key: 'app'
          }
        } );

        // show prepared main HTML structure (removes loading icon) and perform 'start' callback
        $.setContent( this.element, main_elem );
        this.onstart && await this.onstart( { data: $.clone( app_data ), instance: this } );

      };

      const checkPrecondition = async condition => {
        if ( !condition ) return true;
        if ( !user_app_data ) return false;
        const check = ( key, value ) => {
          const user_value = $.deepValue( user_app_data, key );
          if ( typeof value === 'string' )
            return value.startsWith( '>' ) && user_value > parseInt( value.substr( 1 ) );
          if ( typeof value === 'boolean' )
            return user_value;
          return user_value == value;
        };
        for ( const key in condition )
          if ( !check( key, condition[ key ] ) )
            return false;
        return true;
      };
      const performPostcondition = async condition => {
        if ( !this.user || !this.user.isLoggedIn() ) return;
        if ( !user_app_data ) user_app_data = {};
        for ( const key in condition ) {
          const value = condition[ key ];
          const user_value = $.deepValue( user_app_data, key );
          if ( typeof value === 'string' && value.startsWith( '+' ) )
            $.deepValue( user_app_data, key, parseInt( user_value || 0 ) + parseInt( value.substr( 1 ) ) );
          else
            $.deepValue( user_app_data, key, value );
        }
        await this.user.setAppData( this.app_key, $.clone( user_app_data ) );
      }

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
/**
 * @overview ccm component for quest maps
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 * @version latest (2.0.0)
 * @changes
 * version 2.0.0 (12.05.2020)
 * - uses ccm.image_map.js v2.0.0 as default
 * - changes config properties (added: goal, success_msg, failed_msg, ignore.areas, removed: data)
 * - added public method 'getImageMap():Object'
 * - added '<' in preconditions
 * - added '-' in postconditions
 * version 1.0.0 (06.05.2020)
 */

( () => {

  const component = {

    name: 'quest_map',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.5.2.js',

    config: {
//    "app_key": "quest_map_test",
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/quest_map/resources/styles.css" ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-5.1.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/quest_map/resources/templates.html" ],
//    "failed_msg": "",
      "goal": 100,
      "ignore": { "areas": [] },
      "image_map": [ "ccm.component", "https://ccmjs.github.io/akless-components/image_map/versions/ccm.image_map-2.0.0.js" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
//    "onchange": event => console.log( event ),
//    "onstart": event => console.log( event ),
//    "success_msg": "",
//    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.6.0.js" ]
    },

    Instance: function () {

      let $, image_map, user_app_data;

      this.init = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper );  // set shortcut to help functions
        if ( this.user ) this.user.onchange = this.start;       // listen to login/logout events => restart
      };

      this.ready = async () => {
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );  // logging of 'ready' event
      };

      this.start = async () => {

        $.setContent( this.element, $.loading( this ) );                          // render loading icon
        try { this.user && await this.user.login(); } catch ( e ) { return; }     // app can only be used by logged in users
        user_app_data = this.user && await this.user.getAppData( this.app_key ) || {};  // get app-specific user data
        const areas = $.clone( this.ignore.areas );                               // prevent change of original areas data

        // set 'onfinish' events for apps behind image map areas and check area preconditions (disabled or hidden areas)
        for ( let i = areas.length - 1; i >= 0; i-- ) {
          const area = areas[ i ];
          if ( area.action && area.postcondition && !area.action[ 2 ].key )
            area.action[ 2 ] = { key: area.action[ 2 ], onfinish: async results => {
              if ( !results.total )
                await performPostcondition( area.postcondition );
              else {
                results = results.correct / results.total * 100;
                if ( results >= ( area.goal || this.goal ) ) {
                  if ( area.success_msg || this.success_msg )
                    alert( ( area.success_msg || this.success_msg ).replace( '%%', results + '%' ) );
                  await performPostcondition( area.postcondition );
                }
                else if ( area.failed_msg || this.failed_msg )
                  alert( ( area.failed_msg || this.failed_msg ).replace( '%%', results + '%' ) );
              }
              await this.start();
            } };
          area.disabled = !( await checkPrecondition( area.precondition_enabled ) );
          if ( !( await checkPrecondition( area.precondition_visible ) ) ) areas.splice( i, 1 );
        }

        this.logger && this.logger.log( 'start' );               // logging of 'start' event
        $.setContent( this.element, $.html( this.html.main ) );  // render main HTML structure

        // render login/logout area and image map
        if ( this.user ) { $.append( this.element.querySelector( '#top' ), this.user.root ); this.user.start(); }
        image_map = await this.image_map.start( {
          'ignore.areas': areas,
          onchange: this.onchange,
          onstart: this.onstart,
          root: this.element.querySelector( '#image_map' )
        } );

      };

      this.getImageMap = () => image_map;

      const checkPrecondition = async condition => {
        if ( !condition || !Object.keys( condition ).length ) return true;
        if ( !this.user ) return false;
        const check = ( key, value ) => {
          if ( parseInt( value ) !== NaN ) value = parseInt( value );
          if ( value === 'true' ) value = true;
          if ( value === 'false' ) value = false;
          const user_value = $.deepValue( user_app_data, key );
          if ( typeof value === 'string' && value.startsWith( '>' ) )
            return user_value > parseInt( value.substr( 1 ) );
          if ( typeof value === 'string' && value.startsWith( '<' ) )
            return user_value < parseInt( value.substr( 1 ) );
          if ( typeof value === 'boolean' )
            return user_value;
          return ( user_value || '' ) == value;
        };
        for ( const key in condition )
          if ( !check( key, condition[ key ] ) )
            return false;
        return true;
      };
      const performPostcondition = async condition => {
        if ( !condition || !this.user || !this.user.isLoggedIn() ) return;
        if ( !user_app_data ) user_app_data = {};
        for ( const key in condition ) {
          const value = condition[ key ];
          const user_value = $.deepValue( user_app_data, key );
          if ( typeof value === 'string' && value.startsWith( '+' ) )
            $.deepValue( user_app_data, key, parseInt( user_value || 0 ) + parseInt( value.substr( 1 ) ) );
          else if ( typeof value === 'string' && value.startsWith( '-' ) )
            $.deepValue( user_app_data, key, parseInt( user_value || 0 ) - parseInt( value.substr( 1 ) ) );
          else
            $.deepValue( user_app_data, key, value );
        }
        await this.user.setAppData( this.app_key, $.clone( user_app_data ) );
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
/**
 * @overview ccmjs-based web component for user authentication
 * @author André Kless <andre.kless@web.de> 2017-2021
 * @license The MIT License (MIT)
 * @version 9.7.1
 * @changes
 * version 9.7.1 (03.03.2021):
 * - uses ccm.js v26.1.1
 * - uses helper.mjs v7.0.0
 * - updated minified component line
 * (for older version changes see ccm.user-9.7.0.js)
 */

( () => {

  const component = {
    name: 'user',
    version: [ 9, 7, 1 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.1.1.js',
    config: {
      "css": [ "ccm.load", [
        "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
        "https://ccmjs.github.io/akless-components/cloze_builder/resources/default-1.css"
      ] ],
//    "guest": "guest",
//    "hash": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/md5.mjs" ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.0.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/user/resources/templates.mjs" ],
//    "logged_in": true,
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
//    "map": user => user.user === 'john' ? 'Teacher' : 'Student',
//    "norender": true,
//    "onchange": event => console.log( 'User has logged ' + ( event ? 'in' : 'out' ) + '.' ),
      "picture": "https://ccmjs.github.io/akless-components/user/resources/icon.svg",
      "realm": "guest",
//    "restart": true,
//    "store": "ccm-user",
      "title": "Guest Mode: Please enter any username"
//    "url": "ccm2.inf.h-brs.de"
    },
    Instance: function () {
      const self = this;
      let $, my, data, context = this;

      this.init = async () => {

        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );  // set shortcut to help functions
        my = $.privatize( this, 'realm', 'store' );  // privatize authentication relevant instance members

        // set context to highest user instance with same realm and adjust onchange callback
        let instance = this;
        while ( instance = instance.parent )
          if ( $.isInstance( instance.user ) && instance.user.getRealm() === this.getRealm() )
            context = instance.user;
        if ( context === this ) {
          context = null;
          this.onchange = this.onchange ? [ this.onchange ] : [];
        }
        else if ( this.onchange )
          context.onchange.push( this.onchange );
      };

      this.ready = async () => {
        $.setContent( this.element, '' );                                          // clear own website area
        if ( this.logged_in || sessionStorage.getItem( 'ccm-user-' + my.realm ) )  // immediate login?
          await this.login( true );                                                // => login user
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );      // logging of 'ready' event
      };

      this.start = async () => {

        // higher user instance with same realm exists? => redirect method call
        if ( context ) return context.start();

        // logging of 'start' event
        this.logger && this.logger.log( 'start', this.isLoggedIn() );

        // correct state is already rendered or no login/logout button wanted? => abort
        if ( this.isLoggedIn() && this.element.querySelector( '#logged_in' )
          || !this.isLoggedIn() && this.element.querySelector( '#logged_out' )
          || this.norender ) return;

        // render logged in or logged out view
        if ( this.isLoggedIn() )
          $.setContent( this.element, $.html( this.html.logged_in, {
            click: this.logout,
            user: this.getUsername()
          } ) );
        else
          $.setContent( this.element, $.html( this.html.logged_out, {
            click: this.login
          } ) );

      };

      /**
       * logs in user
       * @param {boolean|function} not - prevent all or a specific onchange callback from being triggered
       * @returns {Promise<Object>}
       */
      this.login = async not => {

        // higher user instance with same realm exists? => redirect method call
        if ( context ) return context.login( not || this.onchange );

        // user already logged in? => abort
        if ( this.isLoggedIn() ) return this.getValue();

        // choose authentication mode and proceed login
        let result = sessionStorage.getItem( 'ccm-user-' + my.realm );
        if ( result )
          result = $.parse( result );
        else
          do {
            switch ( my.realm ) {
              case 'cloud':
                result = await renderLogin( this.title, true );
                if ( !result ) { await this.start(); throw new Error( 'login aborted' ); }
                if ( result.user.charAt( result.user.length - 2 ) === '2' ) {
                  result = await this.ccm.load( {
                    url: 'https://kaul.inf.h-brs.de/cors/token.php',
                    method: 'POST',
                    params: { realm: 'hbrsinfkaul', user: result.user, password: result.token }
                  } );
                  /*
                  result = await this.ccm.load( {
                    url: 'https://kaul.inf.h-brs.de/cors/login.php',
                    method: 'GET',
                    params: { realm: 'hbrsinfkaul' },
                    headers: {
                      'Authorization': 'Basic ' + btoa( result.user + ':' + result.token )
                    }
                  } );
                  */
                  if ( $.isObject( result ) ) {
                    result.key = result.user;
                    result.token = result.user + '#' + result.token;
                  }
                }
                else {
                  if ( this.hash ) result.token = this.hash.md5( result.token );
                  result.realm = my.realm;
                  result.store = my.store;
                  try { result = await this.ccm.load( { url: this.url, params: result } ); } catch ( e ) { result = undefined; }
                }
                break;
              case 'guest':
                if ( this.guest )
                  result = { user: this.guest === true ? $.generateKey() : this.guest };
                else {
                  result = await renderLogin( this.title );
                  if ( !result ) { await this.start(); throw new Error( 'login aborted' ); }
                }
                result.key = result.token = result.user;
                break;
              case 'hbrsinfkaul':
                result = await this.ccm.load( { url: 'https://kaul.inf.h-brs.de/login/login.php', method: 'JSONP', params: { realm: my.realm } } );
                if ( $.isObject( result ) ) {
                  result.key = result.user;
                  result.token = result.user + '#' + result.token;
                }
                break;
              case 'hbrsinfpseudo':
                result = await this.ccm.load( { url: 'https://kaul.inf.h-brs.de/login/login_pseudonym.php', method: 'JSONP', params: { realm: my.realm } } );
                if ( $.isObject( result ) ) {
                  result.key = result.user;
                  result.token = result.user + '#' + result.token;
                }
                break;
              case 'lea':
                result = { user: sessionStorage.getItem( 'ccm@lea-user' ), token: sessionStorage.getItem( 'ccm@lea-token' ) };
                if ( !( $.isObject( result ) && result.user && $.regex( 'key' ).test( result.user ) && typeof result.token === 'string' ) ) return alert( 'Authentication failed' );
                break;
              default:
                result = await renderLogin( this.title, true );
                if ( !result ) { await this.start(); throw new Error( 'login aborted' ); }
                result = await this.ccm.load( { url: this.url, method: 'POST', params: { realm: my.realm, user: result.user, token: result.token } } );
            }
          } while ( !( $.isObject( result ) && result.user && $.regex( 'key' ).test( result.user ) && typeof result.token === 'string' ) && !alert( 'Authentication failed' ) );

        // remember user data
        data = $.clone( result );
        delete data.apps;
        data.realm = my.realm;
        if ( !data.picture && this.picture ) data.picture = this.picture;

        sessionStorage.setItem( 'ccm-user-' + my.realm, $.stringify( data ) );

        // logging of 'login' event
        this.logger && this.logger.log( 'login' );

        // (re)render own content
        await this.start();

        // perform 'onchange' callbacks
        not !== true && await $.asyncForEach( this.onchange, async onchange => onchange !== not && await onchange( this.isLoggedIn() ) );

        return this.getValue();

        /**
         * renders login form
         * @param {string} title - login form title
         * @param {boolean} password - show input field for password
         * @returns {Promise}
         */
        async function renderLogin( title, password ) { return new Promise( resolve => {

          /**
           * Shadow DOM of parent instance
           * @type {Element}
           */
          const shadow = self.parent && self.parent.element && self.parent.element.parentNode;

          /**
           * parent of own root element
           * @type {Element}
           */
          const parent = shadow ? self.root.parentNode || document.createElement( 'div' ) : null;

          // is not a standalone instance? => show login form in website area of parent instance
          if ( shadow ) {

            // hide content of parent instance
            self.parent.element.style.display = 'none';

            // move own root element into Shadow DOM of parent instance
            shadow.appendChild( self.root );

          }

          // render login form
          $.setContent( self.element, $.html( self.html.login, {
            title: title,
            login: event => { event.preventDefault(); finish( $.formData( self.element ) ); },
            abort: () => finish()
          } ) );

          // no password needed? => remove input field for password
          !password && $.remove( self.element.querySelector( '#password-entry' ) );

          /**
           * finishes login form
           * @param {Object} [result] - user data
           */
          function finish( result ) {

            // is not a standalone instance?
            if ( shadow ) {

              // move own root element back to original position
              parent[ parent.nodeType === 11 ? 'removeChild' : 'appendChild' ]( self.root );

              // show content of parent instance
              self.parent.element.style.removeProperty('display' );

            }

            resolve( result );
          }

        } ); }

      };

      /**
       * logs out user
       * @param {boolean|function} not - prevent all or a specific onchange callback from being triggered
       * @returns {Promise}
       */
      this.logout = async not => {

        // higher user instance with same realm exists? => redirect method call
        if ( context ) return context.logout( this.onchange );

        // user already logged out? => abort
        if ( !this.isLoggedIn() ) return;

        // choose authentication mode and proceed logout
        switch ( my.realm ) {
          case 'cloud':
            if ( data.user.charAt( data.user.length - 2 ) === '2' )
              await this.ccm.load( { url: 'https://kaul.inf.h-brs.de/login/logout.php', method: 'JSONP', params: { realm: 'hbrsinfkaul' } } ).catch( () => {} );
          case 'guest':
            break;
          case 'hbrsinfkaul':
          case 'hbrsinfpseudo':
            await this.ccm.load( { url: 'https://kaul.inf.h-brs.de/login/logout.php', method: 'JSONP', params: { realm: my.realm } } ).catch( () => {} );
            break;
          case 'lea':
            sessionStorage.removeItem( 'ccm@lea-user' );
            sessionStorage.removeItem( 'ccm@lea-token' );
            break;
          default:
            await this.ccm.load( { url: this.url, method: 'POST', params: { realm: my.realm, token: data.token } } );
            break;
        }

        // clear user data
        data = undefined;
        sessionStorage.removeItem( 'ccm-user-' + my.realm );

        // logging of 'logout' event
        this.logger && this.logger.log( 'logout' );

        // restart after logout?
        if ( this.restart && this.parent ) {
          $.setContent( this.parent.element, $.loading() );   // clear parent content
          await this.parent.start();                          // restart parent
        }
        // (re)render own content
        else await this.start();

        // perform 'onchange' callbacks
        not !== true && this.onchange.forEach( onchange => onchange !== not && onchange( this.isLoggedIn() ) );

      };

      /**
       * checks if user is logged in
       * @returns {boolean}
       */
      this.isLoggedIn = () => {

        // higher user instance with same realm exists? => redirect method call
        if ( context ) return context.isLoggedIn();

        return !!data;
      };

      /**
       * returns current result data
       * @returns {Object} user data
       */
      this.getValue = () => {

        // higher user instance with same realm exists? => redirect method call
        if ( context && context.getValue ) return context.getValue();

        return $.clone( data );
      };

      /** @deprecated */
      this.data = this.getValue;

      /**
       * returns displayed username
       * @returns {string}
       */
      this.getUsername = () => {
        const user = $.clone( this.getValue() );
        return this.map && this.map( user ) || user.name || user.user || user.key;
      };

      /**
       * returns authentication mode
       * @returns {string}
       */
      this.getRealm = () => my.realm;

      /**
       * gets app-specific user data
       * @param {string} key - unique app key
       * @returns {Promise<void>}
       */
      this.getAppData = async key => {
        if ( context && context.getAppData ) return context.getAppData( key );
        return await this.ccm.get( { name: my.store, url: this.url, parent: this }, this.getValue().key + '.apps.' + key );
      };

      /**
       * sets app-specific user data
       * @param {string} app_key - unique app key
       * @param {Object} data
       * @returns {Promise<void>}
       */
      this.setAppData = async ( app_key, data ) => {
        if ( context && context.setAppData ) return context.setAppData( app_key, data );
        const priodata = { key: this.getValue().key, _: { access: { get: 'creator', set: 'creator', del: 'creator' } } };
        const user_data = await this.ccm.get( { name: my.store, url: this.url, parent: this }, this.getValue().key );
        if ( user_data )
          priodata[ 'apps.' + app_key ] = data;
        else {
          priodata.apps = {};
          priodata.apps[ app_key ] = data;
        }
        await this.ccm.store( { name: my.store, url: this.url, parent: this } ).then( store => store.set( $.clone( priodata ) ) );
      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
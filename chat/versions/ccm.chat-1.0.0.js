/**
 * @overview ccm component for chat
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 * @version 1.0.0
 * @changes
 * version 1.0.0 (22.03.2020)
 */

( () => {

  const component = {

    name: 'chat', version: [ 1, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.1.0.js',

    config: {
      "button": "Send",
      "css": [ "ccm.load",
        "https://ccmjs.github.io/akless-components/chat/resources/default.css",
        { "context": "head", "url": "https://ccmjs.github.io/akless-components/resources/fonts/WeblySleekUI/font.css" }
      ],
      "data": { "store": [ "ccm.store" ], "key": {} },
//    "hide_login": true,
      "editor": [ "ccm.start", "https://ccmjs.github.io/tkless-components/editor/versions/ccm.editor-4.0.0.js" ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.1.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/chat/resources/templates.html" ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.3.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "moment": [ "ccm.load", "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js" ],
      "picture": "https://ccmjs.github.io/akless-components/user/resources/icon.svg",
  //  "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.1.js" ]
    },

    Instance: function () {

      let $;

      /**
       * local datastore that contains all chat messages
       * @type {Object}
       */
      let store;

      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper );

        // listen to login/logout events => restart
        if ( this.user ) this.user.onchange = this.start;

        // listen to datastore changes => (re)render own content
        this.data.store.onchange = this.refresh;

      };

      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // store all chat messages in a local datastore
        store = await this.ccm.store( await $.dataset( this.data ) );

        /**
         * chat messages
         * @type {{key: string, picture: string, user: string, created_at: string, text: string}[]}
         */
        const messages = await store.get();

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( messages ) );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main ) );

        // render login/logout area
        this.user && !this.hide_login && $.append( this.element.querySelector( '#top' ), this.user.root );

        // render messages
        messages.forEach( message => {
          message = $.clone( message );
          if ( !message.picture ) message.picture = this.picture;
          message.timestamp = message.created_at && this.moment && moment ? moment( message.created_at ).fromNow() : '';
          message.timestamp_tooltip = message.created_at && this.moment && moment ? moment( message.created_at ).format( 'MMMM Do YYYY, h:mm:ss a' ) : '';
          $.append( this.element.querySelector( '#messages' ), $.html( this.html.message, message ) )
        } );

        // render text editor and send button
        if ( this.user && this.user.isLoggedIn() && this.editor ) {
          $.setContent( this.element.querySelector( '#input' ), this.editor.root );
          $.append( this.element.querySelector( '#input' ), $.html( this.html.button, {
            caption: this.button,
            onclick: async () => {

              /**
               * current user input from text editor
               * @type {{inner: string}}
               */
              let value = this.editor.getValue();

              // is empty? => abort
              if ( !$.html( value ).innerText.trim() ) return;

              /**
               * user data
               * @type {{name: string, realm: string, user: string, key: string, picture: string, token: string, realm: string}}}
               * @example {
               *   "key": "igel",
               *   "user": "igel",
               *   "name": "Igel",
               *   "picture": "https://akless.github.io/akless/resources/images/hedgehog.jpg",
               *   "realm": "cloud",
               *   "token": "cc03e747a6afbbcbf8be7668acfebee5",
               * }
               */
              const user = await this.user.login();  // login user if not logged in

              // prepare data of new message
              const dataset = {
                picture: user.picture,
                user: user.name || user.user || user.key,
                text: value.inner
              };

              await this.data.store.set( dataset );   // create new message in remote datastore
              await this.refresh( dataset );          // update local chat messages
              this.editor.get().root.innerHTML = '';  // clear user input in text editor

            }
          } ) );
        }

      };

      /**
       * updates chat messages after a message has changed
       * @param {{key: string, picture: string, user: string, created_at: string, text: string}} message - changed or new message
       * @example refresh( {
       *   "key": "1584906097862X7971332042469572",
       *   "picture": "https://akless.github.io/akless/resources/images/hedgehog.jpg",
       *   "user": "Igel",
       *   "created_at": "2020-03-22T20:41:37+01:00",
       *   "text": "Hallo Welt!"
       * } );
       */
      this.refresh = async message => {

        /**
         * existing message element
         * @type {Element}
         */
        const element = this.element.querySelector( '#msg-' + message.key );

        // adjust message data
        message = $.clone( message );
        if ( !message.picture ) message.picture = this.picture;

        // update message in local datastore
        await store.set( message );

        // continue adjust message data
        if ( !element && this.moment ) message.created_at = new Date();
        message.timestamp = message.created_at && this.moment ? moment( message.created_at ).fromNow() : '';
        message.timestamp_tooltip = message.created_at && this.moment ? moment( message.created_at ).format( 'MMMM Do YYYY, h:mm:ss a' ) : '';

        // replace existing message or append new message in frontend
        if ( element )
          $.replace( element, $.html( this.html.message, message ) );
        else
          $.append( this.element.querySelector( '#messages' ), $.html( this.html.message, message ) )

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
/**
 * @overview ccmjs-based web component for chat
 * @author André Kless <andre.kless@web.de> 2020-2021
 * @license The MIT License (MIT)
 * @version 2.3.0
 * @changes
 * version 2.3.0 (12.07.2021):
 * - text editor can also be a textarea
 * - focus text editor after submit of a new message
 * version 2.2.1 (16.04.2021):
 * - uses ccmjs v26.3.1 as default
 * version 2.2.0 (07.04.2021):
 * - onchange callback is also triggered on realtime updates
 * - messages are sorted by timestamp
 * - uses ccmjs v26.3.0 as default
 * - uses helper.mjs v7.1.0 as default
 * - added optional reload icon
 * version 2.1.0 (05.03.2021):
 * - uses ccmjs v26.2.0 as default
 * - permission settings for new chat messages can be set via config.data.permissions
 * - permission settings for new chat messages are optional (enabled by default)
 * - changed key for new chat messages
 * - refresh on realtime updates only for relevant datasets
 * version 2.0.0 (17.02.2021):
 * - uses ccmjs v26.1.1 as default
 * - uses helper.mjs v7.0.0 as default
 * - updated minified component line
 * - many different chats stored in one datastore
 * - HTML escaping for new messages
 * - changed default editor toolbar options
 * (for older version changes see ccm.chat-1.0.2.js)
 */

( () => {

  const component = {
    name: 'chat',
    version: [ 2, 3, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.3.1.js',
    config: {
      "button": "Send",
      "css": [ "ccm.load",
        "https://ccmjs.github.io/akless-components/chat/resources/snack.css",
        { "context": "head", "url": "https://ccmjs.github.io/akless-components/resources/fonts/WeblySleekUI/font.css" }
      ],
      "data": {
        "store": [ "ccm.store" ],
        "permissions": {
          "access": {
            "get": "all",
            "set": "creator",
            "del": "creator"
          }
        }
      },
//    "hide_lang": true,
//    "hide_login": true,
      "editor": [ "ccm.start", "https://ccmjs.github.io/tkless-components/editor/versions/ccm.editor-4.0.0.js", {
        "editor": [ "ccm.load",
          "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js",
          "https://ccmjs.github.io/tkless-components/libs/quill/quill.js",
          "https://cdn.quilljs.com/1.2.0/quill.snow.css"
        ],
        "settings": {
          "modules": {
            "toolbar": [
              [ "bold", "italic", "strike", "link" ]
            ]
          },
          "placeholder": "",
          "theme": "snow"
        }
      } ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.1.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/chat/resources/templates_v2.html" ],
//    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
//    "map": user => user.name === 'john' ? 'Teacher' : 'Student' + user.nr,
      "moment": [ "ccm.load", "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment-with-locales.min.js" ],
//    "onchange": event => console.log( event ),
//    "onstart": instance => console.log( instance ),
      "picture": "https://ccmjs.github.io/akless-components/user/resources/icon.svg",
//    "reload": true,
      "time_format": "Do MMMM YYYY, H:mm:ss",
//    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js" ]
    },

    Instance: function () {

      let $; const mapping = {};

      /**
       * local datastore that contains all chat messages
       * @type {Object}
       */
      let store;

      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        if ( this.lang ) this.lang.onchange = this.start;  // listen to change language event => restart
        if ( this.user ) this.user.onchange = this.start;  // listen to login/logout events => restart
        this.data.key = { chat: this.data.key };           // change key to query

        // listen to datastore changes => update chat messages
        this.data.store.onchange = async message => {
          if ( message.chat !== this.data.key.chat ) return;
          await this.refresh( message );
          this.onchange && this.onchange( { instance: this, message: $.clone( message ), extern: true } );
        };

      };

      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // get already existing chat messages
        let messages = await $.dataset( this.data );

        // sort messages by timestamp
        if ( this.moment && moment ) messages = messages.sort( ( a, b ) => moment( a.created_at ).diff( b.created_at ) );

        store = await this.ccm.store( messages );                             // store all chat messages in a local datastore
        this.logger && this.logger.log( 'start', $.clone( store.local ) );    // logging of 'start' event
        moment.locale( this.lang && this.lang.getValue() );                   // set time format language
        $.setContent( this.element, $.html( this.html.main, this.start ) );   // render main HTML structure
        !this.reload && $.remove( this.element.querySelector( '#reload' ) );  // no refresh button wanted? => remove refresh button

        // render language and login/logout area
        if ( this.lang && !this.hide_lang  ) { $.append( this.element.querySelector( '#top' ), this.lang.root ); this.lang.start(); }
        if ( this.user && !this.hide_login ) { $.append( this.element.querySelector( '#top' ), this.user.root ); this.user.start(); }

        // iterate all chat messages => render each message
        ( await store.get() ).forEach( this.refresh );

        // render text editor and send button
        if ( this.user && this.user.isLoggedIn() ) {
          $.setContent( this.element.querySelector( '#input' ), $.isInstance( this.editor ) ? this.editor.root : this.html.input );
          $.append( this.element.querySelector( '#input' ), $.html( this.html.button, {
            caption: this.button,
            onclick: async () => {

              /**
               * current user input from text editor
               * @type {{inner: string}}
               */
              let value = $.isInstance( this.editor ) ? this.editor.getValue() : this.element.querySelector( '#input textarea' ).value;

              // is empty? => abort
              if ( !$.html( value ).innerText.trim() ) return;

              /**
               * user data
               * @type {{name: string, realm: string, user: string, key: string, picture: string, token: string, realm: string}}}
               * @example {
               *   "key": "igel",
               *   "user": "igel@zoo.de",
               *   "name": "Igel",
               *   "picture": "https://akless.github.io/akless/resources/images/hedgehog.jpg",
               *   "realm": "cloud",
               *   "token": "cc03e747a6afbbcbf8be7668acfebee5",
               * }
               */
              const user = await this.user.login();  // login user if not logged in

              // prepare data of new message
              const message = {
                key: this.data.key.chat + '-message-' + $.generateKey(),
                chat: this.data.key.chat,
                picture: user.picture,
                user: this.user.getValue().key,
                name: this.user.getUsername(),
                text: $.escapeHTML( value.inner || value ),
                _: this.data.permissions || undefined
              };

              message.key = await this.data.store.set( message );  // create new message in remote datastore
              await this.refresh( message );                       // update local chat messages

              // clear user input in text editor and set focus
              if ( $.isInstance( this.editor ) ) {
                this.editor.get().root.innerHTML = '';
                setTimeout( () => this.editor.get().focus(), 500 );
              }
              else {
                this.element.querySelector( '#input textarea' ).value = '';
                this.element.querySelector( '#input textarea' ).focus();
              }

              this.logger && this.logger.log( 'change', $.clone( message ) );                     // log 'change' event
              this.onchange && this.onchange( { instance: this, message: $.clone( message ) } );  // perform 'change' callback

            }
          } ) );
          $.isInstance( this.editor ) ? setTimeout( () => this.editor.get().focus(), 500 ) : this.element.querySelector( '#input textarea' ).focus();
        }

        this.onstart && this.onstart( this );  // perform 'start' callback
        this.lang && this.lang.translate();    // translate content

      };

      /**
       * updates chat messages after a message has changed
       * @param {Object} message - changed or new message
       * @example refresh( {
       *   "key": "1584906097862X7971332042469572",
       *   "picture": "https://akless.github.io/akless/resources/images/hedgehog.jpg",
       *   "user": "Igel",
       *   "created_at": "2020-03-22T20:41:37+01:00",
       *   "text": "Hallo Welt!"
       * } );
       */
      this.refresh = async message => {

        // create/update message in local datastore
        await store.set( $.clone( message ) );

        /**
         * existing message element
         * @type {Element}
         */
        const element = this.element.querySelector( '#msg-' + message.key );

        // adjust message data
        message = $.clone( message );
        if ( !message.picture ) message.picture = this.picture;
        if ( !mapping[ message.user ] ) mapping[ message.user ] = Object.keys( mapping ).length + 1;
        if ( this.map ) message.name = this.map( { key: message.user, name: message.name, nr: mapping[ message.user ] } );
        const has_timestamp = !element || message.created_at;
        const time = this.moment && moment && moment( message.created_at || !element && new Date() );
        message.timestamp = has_timestamp ? ( time ? time.fromNow() : message.created_at ) : '';
        message.timestamp_tooltip = has_timestamp ? ( time ? time.format( this.time_format ) : message.created_at ) : '';

        // replace existing message or append new message in frontend
        if ( element )
          $.replace( element, $.html( this.html.message, message ) );
        else
          $.append( this.element.querySelector( '#messages' ), $.html( this.html.message, message ) );

        // add message text and translate content
        $.setContent( this.element.querySelector( '#msg-' + message.key + ' .text' ), message.text );
        this.lang && this.lang.translate();

      };

      /**
       * returns current result data
       * @returns {Object} current chat messages
       */
      this.getValue = () => $.clone( store.local );

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();

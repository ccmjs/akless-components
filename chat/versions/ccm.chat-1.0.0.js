/**
 * @overview ccmjs-based web component for chat
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 * @version 1.0.0
 * @changes
 * version 1.0.0 (23.03.2020)
 */

( () => {

  const component = {

    name: 'chat', version: [ 1, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.2.0.js',

    config: {
      "button": "Send",
      "css": [ "ccm.load",
        "https://ccmjs.github.io/akless-components/chat/resources/snack.css",
        { "context": "head", "url": "https://ccmjs.github.io/akless-components/resources/fonts/WeblySleekUI/font.css" }
      ],
      "data": { "store": [ "ccm.store" ], "key": {} },
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
              [ "bold", "italic", "strike", "link" ],
              [ { "list": "ordered" }, { "list": "bullet" } ],
              [ "image", "video" ]
            ]
          },
          "placeholder": "",
          "theme": "snow"
        }
      } ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.1.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/chat/resources/templates.html" ],
//    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.3.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
//    "map": user => user.name === 'john' ? 'Teacher' : 'Student' + user.nr,
      "moment": [ "ccm.load", "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment-with-locales.min.js" ],
//    "onchange": event => console.log( event ),
//    "onstart": instance => console.log( instance ),
      "picture": "https://ccmjs.github.io/akless-components/user/resources/icon.svg",
      "time_format": "Do MMMM YYYY, H:mm:ss",
//    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.4.0.js" ]
    },

    Instance: function () {

      let $; const mapping = {};

      /**
       * local datastore that contains all chat messages
       * @type {Object}
       */
      let store;

      this.init = async () => {

        $ = Object.assign( {}, this.ccm.helper, this.helper );  // set shortcut to help functions
        if ( this.lang ) this.lang.onchange = this.start;       // listen to change language event => restart
        if ( this.user ) this.user.onchange = this.start;       // listen to login/logout events => restart
        this.data.store.onchange = this.refresh;                // listen to datastore changes => (re)render own content

      };

      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        store = await this.ccm.store( await $.dataset( this.data ) );       // store all chat messages in a local datastore
        this.logger && this.logger.log( 'start', $.clone( store.local ) );  // log 'start' event
        moment.locale( this.lang && this.lang.getValue() );                 // set time format language
        $.setContent( this.element, $.html( this.html.main ) );             // render main HTML structure

        // render language and login/logout area
        if ( this.lang && !this.hide_lang  ) { $.append( this.element.querySelector( '#top' ), this.lang.root ); this.lang.start(); }
        if ( this.user && !this.hide_login ) { $.append( this.element.querySelector( '#top' ), this.user.root ); this.user.start(); }

        // iterate all chat messages => render each message
        ( await store.get() ).forEach( this.refresh );

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
               *   "user": "igel@zoo.de",
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
                user: this.user.getValue().key,
                name: this.user.getUsername(),
                text: value.inner,
                _: {
                  access: {
                    get: 'all',
                    set: 'creator',
                    del: 'creator'
                  }
                }
              };

              await this.data.store.set( dataset );   // create new message in remote datastore
              await this.refresh( dataset );          // update local chat messages
              this.editor.get().root.innerHTML = '';  // clear user input in text editor

              this.logger && this.logger.log( 'change', $.clone( dataset ) );                  // log 'change' event
              this.onchange && this.onchange( { instance: this, data: $.clone( dataset ) } );  // perform 'change' callback

            }
          } ) );
          setTimeout( () => this.editor.get().focus(), 500 );
        }

        this.onstart && this.onstart( this );  // perform 'start' callback
        this.lang && this.lang.translate();    // translate content

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

        // translate content
        this.lang && this.lang.translate();

      };

      /**
       * returns current result data
       * @returns {Object} current chat messages
       */
      this.getValue = () => $.clone( store.local );

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
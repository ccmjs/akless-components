/**
 * @overview ccm component for chat
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (21.03.2020)
 */

( () => {

  const component = {

    name: 'chat',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.1.0.js',

    config: {
      "button": "Send",
      "css": [ "ccm.load",
        "https://ccmjs.github.io/akless-components/chat/resources/default.css",
        { "context": "head", "url": "https://ccmjs.github.io/akless-components/resources/fonts/WeblySleekUI/font.css" },
  //    "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
  //    { "url": "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css", "context": "head" }
      ],
      "data": { "store": [ "ccm.store" ], "key": {} },
      "picture": "https://ccmjs.github.io/akless-components/user/resources/icon.svg",
      "editor": [ "ccm.start", "https://ccmjs.github.io/tkless-components/editor/versions/ccm.editor-4.0.0.js" ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.1.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/chat/resources/templates.html" ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.3.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]
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
        if ( $.isDatastore( this.data.store ) ) this.data.store.onchange = update;

      };

      function update() {
        console.log( arguments );
      }

      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // store all chat messages in a local datastore
        store = await this.ccm.store( await $.dataset( this.data ) );

        /**
         * chat messages
         * @type {Object[]}
         */
        const messages = await store.get();

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( messages ) );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main ) );

        // render login/logout area
        this.user && $.append( this.element.querySelector( '#top' ), this.user.root );

        // render messages
        messages.forEach( message => $.append( this.element.querySelector( '#messages' ), $.html( this.html.message, Object.assign( { picture: this.picture }, message ) ) ) );

        // render text editor and send button
        if ( this.user && this.user.isLoggedIn() && this.editor ) {
          $.setContent( this.element.querySelector( '#input' ), this.editor.root );
          $.append( this.element.querySelector( '#input' ), $.html( this.html.button, {
            caption: this.button,
            onclick: () => { console.log( this.editor.getValue() ); }
          } ) );
        }

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
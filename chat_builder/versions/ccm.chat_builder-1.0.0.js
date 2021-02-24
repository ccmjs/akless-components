/**
 * @overview ccmjs-based web component for building a chat
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version 1.0.0
 * @changes
 * version 1.0.0 (23.02.2021)
 */

( () => {

  const component = {
    name: 'chat_builder',
    version: [ 1, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.1.1.js',
    config: {
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
          "https://ccmjs.github.io/akless-components/chat_builder/resources/default.css"
        ]
      ],
  //  "data": { "store": [ "ccm.store" ] },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.0.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/chat_builder/resources/templates.mjs" ],
      "ignore": {
        "css": {
          "snack": {
            "key": "snack",
            "title": "Snack",
            "value": [ "ccm.load", "https://ccmjs.github.io/akless-components/chat/resources/snack.css" ]
          }
        },
        "defaults": {
          "data": {
            "store": [ "ccm.store", { "name": "chat-data", "url": "https://ccm2.inf.h-brs.de" } ]
          },
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
          "hide_lang": true,
          "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js", {
            "translations": {
              "de": {
                "flag": "https://ccmjs.github.io/tkless-components/lang/resources/de.svg",
                "send": "Senden"
              },
              "en": {
                "flag": "https://ccmjs.github.io/tkless-components/lang/resources/en.svg",
                "send": "Send"
              }
            },
            "active": "en"
          } ],
        },
        "user": {
          "guest": {
            "key": "guest",
            "title": "Guest Mode",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "guest" ] ]
          },
          "cloud": {
            "key": "cloud",
            "title": "Digital Makerspace Account",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "cloud" ] ]
          },
          "hbrsinfkaul": {
            "key": "hbrsinfkaul",
            "title": "H-BRS FB02 Account",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "hbrsinfkaul" ] ]
          },
          "hbrsinfpseudo": {
            "key": "hbrsinfpseudo",
            "title": "H-BRS FB02 Account with Pseudonym",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "hbrsinfpseudo" ] ]
          },
          "pseudo": {
            "key": "pseudo",
            "title": "One-time Pseudonym",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "pseudo" ] ]
          }
        }
      },
      "libs": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/jquery-3/jquery.min.js",
          "https://ccmjs.github.io/akless-components/libs/bootstrap-4/js/bootstrap.bundle.min.js"
        ]
      ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "preview": "Preview",
  //  "onfinish": { "restart": true },
      "shadow": "none",
      "submit": "Submit",
      "tool": [ "ccm.component", "https://ccmjs.github.io/akless-components/chat/versions/ccm.chat-2.0.0.js" ]
    },

    Instance: function () {
      let $, chat_config;

      this.ready = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );  // set shortcut to help functions
        delete this.tool.config.parent;                                            // remove no needed parent reference
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );      // logging of 'ready' event
      };

      this.start = async () => {

        chat_config = await $.dataset( this.data );                            // get existing app configuration data
        if ( !chat_config.data ) chat_config[ 'data.key' ] = $.generateKey();  // new chat? => set unique chat key

        // get initial app configuration (priority order: [high] this.data -> this.defaults -> this.tool.config [low])
        chat_config = await $.integrate( chat_config, await $.integrate( this.ignore.defaults, this.tool.config ) );

        this.logger && this.logger.log( 'start', $.clone( chat_config ) );  // logging of 'start' event
        this.render( chat_config );                                         // render main HTML template
        jQuery( '[data-toggle=popover]' ).popover();                        // initialize popovers for info icons

        // listen to change events of the input fields
        this.element.querySelectorAll( '*[name]' ).forEach( input => input.addEventListener( 'change', () => this.render() ) );

        // update app preview in modal dialog
        jQuery( '#cb-preview' ).on( 'show.bs.modal', () => this.tool.start( Object.assign( this.getValue(), { root: this.element.querySelector( '#cb-preview-body' ) } ) ) );

        // listen to submit event of the HTML form
        this.submit && this.element.querySelector( 'form' ).addEventListener( 'submit', event => {
          event.preventDefault();
          const result_data = this.getValue();                                 // get result data
          this.logger && this.logger.log( 'finish', $.clone( result_data ) );  // logging of 'finish' event
          $.onFinish( this, result_data );                                     // trigger finish actions
        } );

      };

      /**
       * renders the main HTML template
       * @param {Object} [config = this.getValue()] - app configuration
       */
      this.render = ( config = this.getValue() ) => {
        this.html.render( this.html.main( config, this ), this.element );
      }

      /**
       * returns current result data
       * @returns {Object} app configuration
       */
      this.getValue = () => {
        const config = Object.assign( chat_config, $.formData( this.element ) );
        //config.css = this.ignore.css[ config.css ].value;
        if ( config.user ) config.user = this.ignore.user[ config.user ].value;
        config.editor[ 2 ].settings.modules.toolbar = [ [] ];
        for ( const key in config.toolbar )
          if ( config.toolbar[ key ] )
            config.editor[ 2 ].settings.modules.toolbar[ 0 ].push( key );
        delete config.toolbar;
        config.hide_lang = config.language !== 'lang';
        config.lang[ 2 ].active = config.language !== 'lang' ? config.language : 'en';
        delete config.language;
        return config;
      };
    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
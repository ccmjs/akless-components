/**
 * @overview ccmjs-based web component for vocabulary
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 */

( () => {
  const component = {
    name: 'vocabulary',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.1.1.min.js',
    config: {
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap.min.css",
          "https://ccmjs.github.io/akless-components/qa_slidecast_builder/resources/styles.min.css"
        ],
        "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap-icons.min.css",
        { "url": "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap-fonts.min.css", "context": "head" },
      ],
      "data": { "store": [ "ccm.store" ] },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.8.0.min.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/vocabulary/resources/templates.mjs" ],
      "libs": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/bootstrap-5/js/bootstrap.bundle.min.js" ]
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * app state data
       * @type {Object}
       */
      let data;

      /**
       * when the instance is created, when all dependencies have been resolved and before the dependent sub-instances are initialized and ready
       * @returns {Promise<void>}
       */
      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

      };

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {

      }

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // get app state data
        data = $.assign( { languages: [ '', '' ], translations: [ [ '', '' ] ] }, await $.dataset( this.data ) );

        // render main HTML structure
        render();

      };

      /**
       * returns the current app state data
       * @returns {Object}
       */
      this.getValue = () => $.clone( this.translations );

      /** updates main HTML template */
      const render = () => this.html.render( this.html.main( data, events ), this.element );

      /**
       * contains all event handlers
       * @type {Object.<string,Function>}
       */
      const events = {
        onChangeLanguage: async ( value, col ) => {
          data.languages[ col ] = value;
          await this.store.set( data );
        },
        onChangeVocabulary: async ( value, row, col ) => {
          data.translations[ col ][ row ] = value;
          await this.store.set( data );
          render();
        }
      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
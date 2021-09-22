/**
 * @overview ccmjs-based web component for building an app configuration
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version 1.0.0
 * @changes
 * version 1.0.0 (22.09.2021)
 */

( () => {
  const component = {
    name: 'config_builder',
    version: [ 1, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.4.4.js',
    config: {
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap.css",
          "https://ccmjs.github.io/akless-components/config_builder/resources/styles.css"
        ]
      ],
//    "data": { "store": [ "ccm.store" ] },
      "defaults": {},
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.5.0.mjs" ],
//    "html": [ "ccm.load", "templates.mjs" ],
      "libs": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/bootstrap-5/js/bootstrap.bundle.min.js" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "onfinish": { "log": true },
      "shadow": "none",
//    "text": {
//      "preview": "Preview",
//      "preview_title": "App Preview",
//      "submit": "Submit"
//    },
//    "tool": [ "ccm.component", "ccm.tool.js" ]
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );  // set shortcut to help functions
        delete this.tool.config.parent;                                            // remove no needed parent reference
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );      // logging of 'ready' event
      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        /**
         * initial app configuration (priority order: [high] this.data -> this.defaults -> this.tool.config [low])
         * @type {Object}
         */
        const config = await $.integrate( await $.dataset( this.data ), await $.integrate( this.defaults, this.tool.config ) );

        this.logger && this.logger.log( 'start', $.clone( config ) );  // logging of 'start' event
        this.render( config );                                         // render webpage area

      };

      /**
       * renders the webpage area
       * @param {Object} [config = this.getValue()] - initial app configuration
       */
      this.render = ( config = this.getValue() ) => this.html.render( this.html.main( config, this, events ), this.element );

      /**
       * returns current resulting app configuration
       * @returns {Object} current resulting app configuration
       */
      this.getValue = () => $.formData( this.element.querySelector( 'form' ) );

      /**
       * contains all event handlers
       * @type {Object.<string,Function>}
       */
      const events = {

        /** when the value of an input field changes */
        onChange: () => this.render( this.getValue() ),

        /**
         * when 'preview' button is clicked
         */
        onPreview: () => {
          const preview_body = this.element.querySelector( '#pvb-preview .modal-body' );
          $.setContent( preview_body, '' );
          this.tool.start( Object.assign( this.getValue(), { root: preview_body } ) );
        },

        /**
         * when 'submit' event of the main HTML form is triggered
         * @param {Object} event
         */
        onSubmit: event => {
          event.preventDefault();
          const config = this.getValue();                                 // get resulting app configuration
          this.logger && this.logger.log( 'finish', $.clone( config ) );  // logging of 'finish' event
          $.onFinish( this, config );                                     // trigger finish actions
        }

      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
/**
 * @overview ccmjs-based web component for building an app configuration
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.1.0)
 * @changes
 * version 1.1.0 (29.12.2021):
 * - added optional multilingualism
 * - added optional user authentication
 * - added HTML class for CSS prefixing
 * - uses ccmjs v27.1.2 as default
 * version 1.0.0 (19.10.2021)
 */

( () => {
  const component = {
    name: 'config_builder',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.1.2.min.js',
    config: {
      "bootstrap": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/bootstrap-5/js/bootstrap.bundle.min.js" ],
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap.min.css",
          "https://ccmjs.github.io/akless-components/config_builder/resources/styles.min.css"
        ],
        "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap-icons.min.css",
        { "url": "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap-fonts.min.css", "context": "head" },
      ],
//    "data": { "store": [ "ccm.store" ] },
      "defaults": {},
      "ignore": { "defaults": {} },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.8.0.min.mjs" ],
//    "html": [ "ccm.load", "templates.mjs" ],
//    "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.0.0.min.js" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.min.js", "greedy" ] ],
//    "onfinish": { "log": true },
//    "onstart": initial_app_config => initial_app_config,
      "preview": true,
      "shadow": "none",
//    "text": {
//      "preview": "Preview",
//      "preview_title": "App Preview",
//      "submit": "Submit"
//    },
//    "tool": [ "ccm.component", "ccm.tool.js" ],
//    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js" ]
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * initial app configuration
       * @type {Object}
       */
      let config;

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );  // set shortcut to help functions
        this.element.classList.add( 'config_builder' );
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );      // logging of 'ready' event
      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // user authentication
        this.user && await this.user.login();

        // set initial app configuration (priority order: [high] this.data -> this.defaults -> this.ignore.defaults -> this.tool.config [low])
        config = await $.integrate( await $.dataset( this.data ), await $.integrate( this.defaults, await $.integrate( this.ignore.defaults, this.tool.config ) ) );

        // generate unique key for app state data
        if ( config.data && config.data.store && !config.data.key ) config.data.key = $.generateKey();

        if ( this.onstart ) config = await this.onstart( this, config );  // trigger 'onstart' callback
        this.logger && this.logger.log( 'start', $.clone( config ) );     // logging of 'start' event
        this.render( config );                                            // render webpage area

        // render language selection and user login/logout
        const header = this.element.querySelector( 'header' );
        if ( header ) {
          header && this.lang && !this.lang.getContext() && $.append( header, this.lang.root );
          header && this.user && $.append( header, this.user.root );
        }

      };

      /**
       * renders the webpage area
       * @param {Object} [config = this.getValue()] - initial app configuration
       */
      this.render = ( config = this.getValue() ) => {
        this.html.render( this.html.main( config, this, events ), this.element );
        this.lang && this.lang.translate();
      }

      /**
       * returns current resulting app configuration
       * @returns {Object} current resulting app configuration
       */
      this.getValue = () => {
        let form_data = $.formData( this.element.querySelector( 'form' ) );
        for ( const key in this.ignore.mapping )
          form_data[ key ] = this.ignore.mapping[ key ][ form_data[ key ] ].value;
        return Object.assign( {}, config, form_data );
      };

      /**
       * contains all event handlers
       * @type {Object.<string,Function>}
       */
      const events = {

        /** when the value of an input field changes */
        onChange: () => this.render( this.getValue() ),

        /** when 'preview' button is clicked */
        onPreview: () => {
          const preview_body = this.element.querySelector( '.modal-body' );
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
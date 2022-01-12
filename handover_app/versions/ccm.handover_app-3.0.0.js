/**
 * @overview ccmjs-based web component for an app handover
 * @author André Kless <andre.kless@web.de> 2019-2020, 2022
 * @license The MIT License (MIT)
 * @version 3.0.0
 * @changes
 * version 3.0.0 (08.01.2022): reimplementation
 * (for older version changes see ccm.handover_app-2.0.0.js)
 */

( () => {
  const component = {
    name: 'handover_app',
    version: [ 3, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.1.2.min.js',
    config: {
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap.min.css",
          "https://ccmjs.github.io/akless-components/handover_app/resources/styles.min.css"
        ],
        "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap-icons.min.css",
        { "url": "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap-fonts.min.css", "context": "head" },
      ],
      "enabled": {
        "embed": true,
        "url": true,
        "qr_code": true,
        "html": true,
        "scorm": true,
        "ibook": false,
        "bookmarklet": true,
      },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.0.0.min.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/handover_app/resources/templates.mjs" ],
      "ignore": { "config": {} },
//    "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.0.0.min.js" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
//    "qr_code": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/qrcode-generator/qrcode.min.js" ],
      "text": [ "ccm.load", "https://ccmjs.github.io/akless-components/handover_app/resources/resources.mjs#en" ],
      "tool": "https://ccmjs.github.io/akless-components/blank/ccm.blank.min.js",
      "url": "https://ccmjs.github.io/akless-components/handover_app/resources/app.html",
//    "window": [ "ccm.component", "https://ccmjs.github.io/akless-components/window/versions/ccm.window-2.0.0.min.js" ]
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * when the instance is created, when all dependencies have been resolved and before the dependent sub-instances are initialized and ready
       * @returns {Promise<void>}
       */
      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // app configuration is stored in a local datastore? => use app configuration without datastore
        if ( $.isDatastore( this.ignore.config.store ) && !this.ignore.config.store.source().name ) {
          this.ignore.config = await this.ignore.config.store.get( this.ignore.config.key );
          delete this.ignore.config.key; delete this.ignore.config._;
        }

      };

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        /**
         * app URL
         * @type {string}
         */
        const app_url = this.url && $.appURL( this.url, this.tool, this.ignore.config );

        /**
         * different forms of how the app configuration is provided
         * @type {{embed: string, url: string}}
         */
        const config = {
          embed: this.enabled.embed && $.embedCode( this.tool, this.ignore.config ),
          url: this.enabled.url && app_url,
          qr_code: this.enabled.qr_code && this.qr_code,
          html: this.enabled.html,
          scorm: this.enabled.scorm,
          ibook: this.enabled.ibook,
          bookmarklet: this.enabled.bookmarklet
        };

        /**
         * contains all event handlers
         * @type {Object.<string,Function>}
         */
        const events = {

          /**
           * when a copy button is clicked
           * @param {string} id - corresponding HTML ID
           */
          onCopy: id => $.copyToClipboard( this.element.querySelector( '#' + id + ' input' ) ),

          /** when the button is clicked via which the app can be downloaded as an HTML file */
          onHTML: () => $.downloadApp( config.embed ),

          /** when the button is clicked via which the app can be downloaded as a SCORM package */
          onSCORM: () => $.scorm( config.embed ),

          /** when the button is clicked via which the app can be downloaded as an iBook Widget */
          oniBook: () => $.iBookWidget( config.embed ),

        };

        // render main HTML structure
        this.html.render( this.html.main( config, this.text, events ), this.element );

        // translate content
        this.lang && this.lang.translate();

        // render language selection
        this.lang && !this.lang.getContext() && $.append( this.element.querySelector( 'header' ), this.lang.root );

        // render QR code
        const qr_code = qrcode( 0, 'M' );
        qr_code.addData( app_url );
        qr_code.make();
        const div = document.createElement( 'div' );
        div.innerHTML = qr_code.createImgTag();
        $.setContent( this.element.querySelector( '#qr_code' ), div.firstChild );

        // provide App via Bookmarklet
        this.enabled.bookmarklet && this.element.querySelector( '#bookmarklet' ).setAttribute( 'href', $.bookmarklet( this.window.url, Object.assign( this.window.config, { app: [ 'ccm.start', this.tool, this.ignore.config ] } ) ) );

      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
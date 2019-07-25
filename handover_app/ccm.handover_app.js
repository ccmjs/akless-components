/**
 * @overview ccm component for handover of an app
 * @author André Kless <andre.kless@web.de> 2019
 * @license MIT License
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (25.07.2019)
 */

( () => {

  const component = {

    name: 'handover_app',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-22.2.1.js',

    config: {

      "css": [ "ccm.load",
        "https://ccmjs.github.io/akless-components/handover_app/resources/styles.css",
        "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
        { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css" }
      ],
      "data": { "store": [ "ccm.store" ] },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/helper.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/handover_app/resources/template.html" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
//    "qr_code": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/qrcode-generator/qrcode.min.js" ],
      "title": "Handover of the App",
//    "url": "https://ccmjs.github.io/ccm-comonents/name/versions/ccm.name-1.0.0.js",
//    "window": [ "ccm.component", "https://ccmjs.github.io/akless-components/window/versions/ccm.window-1.0.0.js" ]

    },

    Instance: function () {

      let $, dataset;

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // get app dataset
        dataset = await $.dataset( this.data );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html, $.clone( dataset ) ) );

        /**
         * app configuration is managed in a local JavaScript object
         * @type {boolean}
         */
        const is_local = !this.data.store.source().name;

        /**
         * dataset key of app configuration
         * @type {string}
         */
        let app_id = dataset.key;

        // prepare data store settings (needed for embed code)
        let store_settings = this.data.store.source(); if ( is_local ) { store_settings = {}; store_settings[ app_id ] = dataset; }

        /**
         * embed code for saved app
         * @type {string}
         */
        const embed_code = this.helper.embedCode ? await this.helper.embedCode( this.url, store_settings, app_id, undefined, this.ccm ) : undefined;

        // provide App via Embed Code
        if ( embed_code ) {
          this.element.querySelector( '#embed_code' ).value = embed_code;
          this.element.querySelector( '#embed_copy' ).addEventListener( 'click', () => this.helper.copyToClipboard( this.element.querySelector( '#embed_code' ) ) );
        }
        else $.removeElement( this.element.querySelector( '#embed' ) );

        // provide App ID
        this.element.querySelector( '#app_id'  ).value = app_id;
        this.element.querySelector( '#id_copy' ).addEventListener( 'click', () => this.helper.copyToClipboard( this.element.querySelector( '#app_id' ) ) );

        // provide App via URL
        const app_url = this.helper.appURL( this.url, store_settings, app_id );
        this.element.querySelector( '#app_url'  ).value = app_url;
        this.element.querySelector( '#url_copy' ).addEventListener( 'click', () => this.helper.copyToClipboard( this.element.querySelector( '#app_url' ) ) );

        // provide App via QR Code
        if ( this.qr_code && qrcode ) {
          let demoQRCode = qrcode( 0, 'M' );
          demoQRCode.addData( app_url );
          demoQRCode.make();
          let qrCodeSVGTag = document.createElement( 'div' );
          qrCodeSVGTag.innerHTML = demoQRCode.createImgTag();
          $.setContent( this.element.querySelector( '#qr_code' ), qrCodeSVGTag.firstChild );
        }
        else $.removeElement( this.element.querySelector( '#qr_code' ) );

        // provide App via Download as HTML File
        if ( embed_code && this.helper.downloadApp )
          this.element.querySelector( '#download' ).addEventListener( 'click', () => this.helper.downloadApp( embed_code ) );
        else
          $.removeElement( this.element.querySelector( '#download' ) );

        // provide App via Bookmarklet
        if ( this.window ) {
          const window = await this.window.instance( { app: [ 'ccm.start', this.url, this.getValue() ] } );
          this.element.querySelector( '#bookmarklet' ).setAttribute( 'href', window.bookmarklet() );
        }
        else
          $.removeElement( this.element.querySelector( '#bookmarklet' ) );

        // provide App via iBook Widget
        if ( embed_code && this.helper.iBookWidget )
          this.element.querySelector( '#ibook' ).addEventListener( 'click', () => this.helper.iBookWidget( embed_code ) );
        else
          $.removeElement( this.element.querySelector( '#ibook' ) );

        // provide App via SCORM
        if ( embed_code && this.helper.scorm )
          this.element.querySelector( '#scorm' ).addEventListener( 'click', () => this.helper.scorm( embed_code ) );
        else
          $.removeElement( this.element.querySelector( '#scorm' ) );

      };

      /** @returns {Object} instance configuration for target component */
      this.getValue = () => $.clone( dataset );

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
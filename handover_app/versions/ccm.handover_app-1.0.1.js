/**
 * @overview ccm component for handover of an app
 * @author André Kless <andre.kless@web.de> 2019
 * @license MIT License
 * @version 1.0.1
 * @changes
 * version 1.0.1 (18.09.2019)
 * - bug fix for copy app id to clipboard
 * - uses ccm v22.6.1
 * version 1.0.0 (26.07.2019)
 */

( () => {

  const component = {

    name: 'handover_app', version: [ 1, 0, 1 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-22.6.1.js',

    config: {

//    "app_url": "https://ccmjs.github.io/digital-maker-space/app.html",
//    "component_url": "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.4.1.js",
      "css": [ "ccm.load",
        "https://ccmjs.github.io/akless-components/handover_app/resources/styles.css",
        "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
        { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css" }
      ],
      "data": { "store": [ "ccm.store" ] },
      "enabled": {
        "embed_code": true,
        "app_id": true,
        "app_url": true,
        "qr_code": true,
        "download_app": true,
        "bookmarklet": true,
        "ibook_widget": true,
        "scorm": true
      },
//    "embed_template": "https://ccmjs.github.io/akless-components/resources/templates/embed.html",
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-1.0.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/handover_app/resources/template.html" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
//    "qr_code": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/qrcode-generator/qrcode.min.js" ],
//    "window": [ "ccm.component", "https://ccmjs.github.io/akless-components/window/versions/ccm.window-1.0.0.js" ]

    },

    Instance: function () {

      let $;

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        /**
         * app configuration
         * @type {Object}
         */
        const dataset = await $.dataset( this.data );

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
         * dataset key of the app configuration
         * @type {string}
         */
        let app_id = dataset.key;

        // prepare data store settings (needed for embed code)
        let store_settings = this.data.store.source(); if ( is_local ) { store_settings = {}; store_settings[ app_id ] = dataset; }

        /**
         * embed code of the app
         * @type {string}
         */
        const embed_code = this.helper.embedCode ? await this.helper.embedCode( this.component_url, store_settings, app_id, this.embed_template, this.ccm ) : undefined;

        /**
         * URL of the app
         * @type {string}
         */
        const app_url = this.helper.appURL( this.component_url, store_settings, app_id, this.app_url );

        // provide App via Embed Code
        if ( this.enabled.embed_code && embed_code ) {
          this.element.querySelector( '#embed_code-input' ).value = embed_code;
          this.element.querySelector( '#embed_copy' ).addEventListener( 'click', () => this.helper.copyToClipboard( this.element.querySelector( '#embed_code-input' ) ) );
        }
        else $.removeElement( this.element.querySelector( '#embed_code' ) );

        // provide App ID
        if ( this.enabled.app_id ) {
          this.element.querySelector( '#app_id-input'  ).value = app_id;
          this.element.querySelector( '#id_copy' ).addEventListener( 'click', () => this.helper.copyToClipboard( this.element.querySelector( '#app_id-input' ) ) );
        }
        else $.removeElement( this.element.querySelector( '#app_id' ) );

        // provide App via URL
        if ( this.enabled.app_url && app_url ) {
          this.element.querySelector( '#app_url-input'  ).value = app_url;
          this.element.querySelector( '#url_copy' ).addEventListener( 'click', () => this.helper.copyToClipboard( this.element.querySelector( '#app_url-input' ) ) );
        }
        else $.removeElement( this.element.querySelector( '#app_url' ) );

        // provide App via QR Code
        if ( this.enabled.qr_code && app_url && this.qr_code && qrcode ) {
          let demoQRCode = qrcode( 0, 'M' );
          demoQRCode.addData( app_url );
          demoQRCode.make();
          let qrCodeSVGTag = document.createElement( 'div' );
          qrCodeSVGTag.innerHTML = demoQRCode.createImgTag();
          $.setContent( this.element.querySelector( '#qr_code' ), qrCodeSVGTag.firstChild );
        }
        else $.removeElement( this.element.querySelector( '#qr_code' ) );

        // provide App via Download as HTML File
        if ( this.enabled.download_app && embed_code && this.helper.downloadApp )
          this.element.querySelector( '#download' ).addEventListener( 'click', () => this.helper.downloadApp( embed_code ) );
        else
          $.removeElement( this.element.querySelector( '#download' ) );

        // provide App via Bookmarklet
        if ( this.enabled.bookmarklet && this.window ) {
          const window = await this.window.instance( { app: [ 'ccm.start', this.component_url, $.clone( dataset ) ] } );
          this.element.querySelector( '#bookmarklet' ).setAttribute( 'href', window.bookmarklet() );
        }
        else
          $.removeElement( this.element.querySelector( '#bookmarklet' ) );

        // provide App via iBook Widget
        if ( this.enabled.ibook_widget && embed_code && this.helper.iBookWidget )
          this.element.querySelector( '#ibook' ).addEventListener( 'click', () => this.helper.iBookWidget( embed_code ) );
        else
          $.removeElement( this.element.querySelector( '#ibook' ) );

        // provide App via SCORM
        if ( this.enabled.scorm && embed_code && this.helper.scorm )
          this.element.querySelector( '#scorm' ).addEventListener( 'click', () => this.helper.scorm( embed_code ) );
        else
          $.removeElement( this.element.querySelector( '#scorm' ) );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
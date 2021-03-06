/**
 * @overview ccm component for handover of an app
 * @author André Kless <andre.kless@web.de> 2019-2020
 * @license MIT License
 * @version latest (2.0.0)
 * @changes
 * version 2.0.0 (05.02.2020)
 * - allows embed code and app URL with directly integrated app configuration
 * - no backwards compatibility to older forms of embed code and app ID
 * - no QR Code when app configuration size is to much
 * - uses ccm v25.0.0
 * (for older version changes see ccm.handover_app-1.0.1.js)
 */

( () => {

  const component = {

    name: 'handover_app', version: [ 2, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.0.0.js',

    config: {

//    "component_url": "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-6.0.3.js",
      "css": [ "ccm.load",
        "https://ccmjs.github.io/akless-components/handover_app/resources/styles.css",
        "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
        { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css" }
      ],
      "data": {},
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
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.0.1.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/handover_app/resources/template.html" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
//    "qr_code": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/qrcode-generator/qrcode.min.js" ],
//    "window": [ "ccm.component", "https://ccmjs.github.io/akless-components/window/versions/ccm.window-1.0.0.js" ]

    },

    Instance: function () {

      let $;

      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper );

      };

      this.ready = async () => {

        // app configuration is stored in a local datastore? => use app configuration without datastore
        if ( $.isDatastore( this.data.store ) && !this.data.store.source().name ) {
          this.data = await this.data.store.get( this.data.key );
          delete this.data.key; delete this.data._;
        }

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
        $.setContent( this.element, $.html( this.html ) );

        /**
         * dataset key of the app configuration
         * @type {string}
         */
        let app_id = dataset.key;

        /**
         * embed code of the app
         * @type {string}
         */
        const embed_code = this.component_url && $.embedCode( this.component_url, this.data );

        /**
         * URL of the app
         * @type {string}
         */
        const app_url = this.component_url && $.appURL( this.component_url, this.data );

        // provide App via Embed Code
        if ( this.enabled.embed_code && embed_code ) {
          this.element.querySelector( '#embed_code-input' ).value = embed_code;
          this.element.querySelector( '#embed_copy' ).addEventListener( 'click', () => $.copyToClipboard( this.element.querySelector( '#embed_code-input' ) ) );
        }
        else $.remove( this.element.querySelector( '#embed_code' ) );

        // provide App ID
        if ( this.enabled.app_id && app_id ) {
          this.element.querySelector( '#app_id-input'  ).value = app_id;
          this.element.querySelector( '#id_copy' ).addEventListener( 'click', () => $.copyToClipboard( this.element.querySelector( '#app_id-input' ) ) );
        }
        else $.remove( this.element.querySelector( '#app_id' ) );

        // provide App via URL
        if ( this.enabled.app_url && app_url ) {
          this.element.querySelector( '#app_url-input'  ).value = app_url;
          this.element.querySelector( '#url_copy' ).addEventListener( 'click', () => $.copyToClipboard( this.element.querySelector( '#app_url-input' ) ) );
        }
        else $.remove( this.element.querySelector( '#app_url' ) );

        // provide App via QR Code
        if ( this.enabled.qr_code && app_url && app_id && this.qr_code && qrcode ) {
          try {
            const demoQRCode = qrcode( 0, 'M' );
            demoQRCode.addData( app_url );
            demoQRCode.make();
            const qrCodeSVGTag = document.createElement( 'div' );
            qrCodeSVGTag.innerHTML = demoQRCode.createImgTag();
            $.setContent( this.element.querySelector( '#qr_code' ), qrCodeSVGTag.firstChild );
          } catch ( e ) {
            $.remove( this.element.querySelector( '#qr_code' ) );
          }
        }
        else $.remove( this.element.querySelector( '#qr_code' ) );

        // provide App via Download as HTML File
        if ( this.enabled.download_app && embed_code )
          this.element.querySelector( '#download' ).addEventListener( 'click', () => $.downloadApp( embed_code ) );
        else
          $.remove( this.element.querySelector( '#download' ) );

        // provide App via Bookmarklet
        if ( this.enabled.bookmarklet && this.window ) {
          const window = await this.window.instance( { app: [ 'ccm.start', this.component_url, $.clone( dataset ) ] } );
          this.element.querySelector( '#bookmarklet' ).setAttribute( 'href', window.bookmarklet() );
        }
        else $.remove( this.element.querySelector( '#bookmarklet' ) );

        // provide App via iBook Widget
        if ( this.enabled.ibook_widget && embed_code )
          this.element.querySelector( '#ibook' ).addEventListener( 'click', () => $.iBookWidget( embed_code ) );
        else
          $.remove( this.element.querySelector( '#ibook' ) );

        // provide App via SCORM
        if ( this.enabled.scorm && embed_code )
          this.element.querySelector( '#scorm' ).addEventListener( 'click', () => $.scorm( embed_code ) );
        else
          $.remove( this.element.querySelector( '#scorm' ) );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
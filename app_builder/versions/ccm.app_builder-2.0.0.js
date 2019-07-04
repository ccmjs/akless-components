/**
 * @overview ccm component for building apps
 * @author André Kless <andre.kless@web.de> 2018-2019
 * @license The MIT License (MIT)
 * @version 2.0.0
 * @changes
 * version 2.0.0 (18.02.2019):
 * - changed default instance configuration
 * - more ways for handover app (Embed Code, App ID, URL, QR Code, Download, iBook Widget and SCORM)
 * - more ways for loading existing app (Embed Code, App ID and URL)
 * - use of modal dialogs
 * - outsourcing of help functions to ES6 module
 * - uses Bootstrap v4 instead of v3
 * (for older version changes see ccm.app_builder-1.4.0.js)
 */

( function () {

  const component = {

    name: 'app_builder', version: [ 2, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',

    config: {

      "html": {
        "main": {
          "id": "element",
          "inner": [
            {
              "id": "maker",
              "inner": [
                { "id": "builder" },
                {
                  "id": "app",
                  "inner": [
                    { "tag": "b", "inner": "Preview:" },
                    { "id": "preview" }
                  ]
                }
              ]
            },
            {
              "id": "buttons",
              "class": "d-flex justify-content-around flex-wrap bg-dark",
              "inner": [
                {
                  "id": "button-update",
                  "class": "btn btn-success disabled",
                  "onclick": "%onUpdate%",
                  "inner": "Save Changes"
                },
                {
                  "id": "button-read",
                  "class": "btn btn-primary",
                  "onclick": "%onRead%",
                  "inner": "Load App"
                },
                {
                  "id": "button-create",
                  "class": "btn btn-warning",
                  "onclick": "%onCreate%",
                  "inner": "Create As New"
                },
                {
                  "id": "button-delete",
                  "class": "btn btn-danger disabled",
                  "onclick": "%onDelete%",
                  "inner": "Delete"
                }
              ]
            }
          ]
        },
        "handover": {
          "id": "handover",
          "inner": [
            {
              "class": "d-flex",
              "inner": [
                {
                  "inner": [
                    {
                      "id": "embed",
                      "class": "input-group mb-3",
                      "inner": [
                        {
                          "class": "input-group-prepend",
                          "inner": {
                            "tag": "span",
                            "class": "input-group-text",
                            "inner": "Embed"
                          }
                        },
                        {
                          "tag": "input",
                          "readonly": true,
                          "type": "text",
                          "id": "embed_code",
                          "class": "form-control bg-white",
                          "aria-label": "Embed Code"
                        },
                        {
                          "class": "input-group-append",
                          "inner": {
                            "tag": "button",
                            "id": "embed_copy",
                            "class": "btn btn-success",
                            "type": "button",
                            "inner": "Copy"
                          }
                        }
                      ]
                    },
                    {
                      "class": "input-group mb-3",
                      "inner": [
                        {
                          "class": "input-group-prepend",
                          "inner": {
                            "tag": "span",
                            "class": "input-group-text",
                            "inner": "App ID"
                          }
                        },
                        {
                          "tag": "input",
                          "readonly": true,
                          "type": "text",
                          "id": "app_id",
                          "class": "form-control bg-white",
                          "aria-label": "App ID"
                        },
                        {
                          "class": "input-group-append",
                          "inner": {
                            "tag": "button",
                            "id": "id_copy",
                            "class": "btn btn-success",
                            "type": "button",
                            "inner": "Copy"
                          }
                        }
                      ]
                    },
                    {
                      "class": "input-group mb-3",
                      "inner": [
                        {
                          "class": "input-group-prepend",
                          "inner": {
                            "tag": "span",
                            "class": "input-group-text",
                            "inner": "URL"
                          }
                        },
                        {
                          "tag": "input",
                          "readonly": true,
                          "type": "text",
                          "id": "app_url",
                          "class": "form-control bg-white",
                          "aria-label": "URL"
                        },
                        {
                          "class": "input-group-append",
                          "inner": {
                            "tag": "button",
                            "id": "url_copy",
                            "class": "btn btn-success",
                            "type": "button",
                            "inner": "Copy"
                          }
                        }
                      ]
                    }
                  ]
                },
                { "id": "qr_code", "class": "pl-2" }
              ]
            },
            {
              "class": "text-center",
              "inner": [
                {
                  "tag": "button",
                  "type": "button",
                  "id": "download",
                  "class": "btn btn-primary mr-2",
                  "inner": [
                    {
                      "tag": "span",
                      "class": "fas fa-file-download"
                    },
                    " File"
                  ]
                },
                {
                  "tag": "a",
                  "id": "bookmarklet",
                  "class": "btn btn-secondary mr-2",
                  "inner": [
                    {
                      "tag": "span",
                      "class": "fas fa-bookmark"
                    },
                    " Bookmarklet"
                  ]
                },
                {
                  "tag": "button",
                  "type": "button",
                  "id": "ibook",
                  "class": "btn btn-info mr-2",
                  "inner": [
                    {
                      "tag": "span",
                      "class": "fas fa-book"
                    },
                    " iBook Widget"
                  ]
                },
                {
                  "tag": "button",
                  "type": "button",
                  "id": "scorm",
                  "class": "btn btn-danger",
                  "inner": [
                    {
                      "tag": "span",
                      "class": "fas fa-archive"
                    },
                    " SCORM"
                  ]
                }
              ]
            }
          ]
        },
        "read": {
          "id": "read",
          "inner": [
            {
              "tag": "p",
              "inner": "Use one of the following ways to load an app:"
            },
            {
              "id": "embed",
              "class": "input-group mb-3",
              "inner": [
                {
                  "class": "input-group-prepend",
                  "inner": {
                    "tag": "span",
                    "class": "input-group-text",
                    "inner": "Embed"
                  }
                },
                {
                  "tag": "input",
                  "type": "text",
                  "id": "embed_code",
                  "class": "form-control",
                  "aria-label": "Embed Code"
                },
                {
                  "class": "input-group-append",
                  "inner": {
                    "tag": "button",
                    "id": "embed_load",
                    "class": "btn btn-primary",
                    "type": "button",
                    "inner": "Load",
                    "onclick": "%embed%"
                  }
                }
              ]
            },
            {
              "class": "input-group mb-3",
              "inner": [
                {
                  "class": "input-group-prepend",
                  "inner": {
                    "tag": "span",
                    "class": "input-group-text",
                    "inner": "App ID"
                  }
                },
                {
                  "tag": "input",
                  "type": "text",
                  "id": "app_id",
                  "class": "form-control",
                  "aria-label": "App ID"
                },
                {
                  "class": "input-group-append",
                  "inner": {
                    "tag": "button",
                    "id": "id_copy",
                    "class": "btn btn-primary",
                    "type": "button",
                    "inner": "Load",
                    "onclick": "%app_id%"
                  }
                }
              ]
            },
            {
              "class": "input-group mb-3",
              "inner": [
                {
                  "class": "input-group-prepend",
                  "inner": {
                    "tag": "span",
                    "class": "input-group-text",
                    "inner": "URL"
                  }
                },
                {
                  "tag": "input",
                  "type": "text",
                  "id": "app_url",
                  "class": "form-control",
                  "aria-label": "URL"
                },
                {
                  "class": "input-group-append",
                  "inner": {
                    "tag": "button",
                    "id": "url_copy",
                    "class": "btn btn-primary",
                    "type": "button",
                    "inner": "Load",
                    "onclick": "%url%"
                  }
                }
              ]
            }
          ]
        }
      },
      "css": [ "ccm.load",
        "https://ccmjs.github.io/akless-components/app_builder/resources/versions/default-2.0.0.css",
        "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
        { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css" }
      ],
      "data": { "store": [ "ccm.store" ] },
      "warning": "Are you sure you want to delete this App?",
      "builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.0.0.js", [ "ccm.get", { "name": "submit", "url": "https://ccm2.inf.h-brs.de" }, "cloze_builder" ] ],
      "app": [ "ccm.component", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-5.0.3.js" ],
      "helper": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/helper.js", "type": "module" } ],
      "modal_dialog": [ "ccm.component", "https://ccmjs.github.io/tkless-components/modal/versions/ccm.modal-2.0.0.js", {
        "css": [ "ccm.load",
          "https://use.fontawesome.com/releases/v5.6.3/css/all.css",
          { "context": "head", "url": "https://use.fontawesome.com/releases/v5.6.3/css/all.css" }
        ]
      } ],
      "bookmarklet": [ "ccm.component", "https://ccmjs.github.io/akless-components/window/versions/ccm.window-1.0.0.js" ],
      "qr_code": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/qrcode-generator/qrcode.min.js" ],
  //  "blockchain": [ "ccm.start", "https://ccmjs.github.io/rmueller-components/certificate_request/versions/ccm.certificate_request-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/rmueller-components/certificate_request/resources/config.js", "all" ] ],
      "icon": "https://ccmjs.github.io/akless-components/dms/resources/component.png"
  //  "convert": { "app_to_builder": json => json, "builder_to_app": json => json },
  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onchange"

    },

    Instance: function () {

      let $; const self = this;

      /**
       * current app-specific builder instance
       * @type {Object}
       */
      let builder;

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // set function for JSON conversion of app configuration
        if ( $.isObject( this.data ) && this.convert ) this.data.convert = this.convert.app_to_builder;

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        /**
         * app configuration
         * @type {Object}
         */
        let dataset = await $.dataset( this.data );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        /**
         * current App-ID
         * @type {string}
         */
        let app_id = dataset.key; delete dataset.key;

        // render main HTML structure
        $.replace( this.element, this.element = $.html( this.html.main, {
          onCreate: createApp,
          onRead:   readApp,
          onUpdate: updateApp,
          onDelete: deleteApp
        } ) );

        /**
         * website area for app building
         * @type {Element}
         */
        const builder_elem = this.element.querySelector( '#builder' );

        /**
         * website area for app preview
         * @type {Element}
         */
        const preview_elem = this.element.querySelector( '#preview' );

        /**
         * website area for CRUD buttons
         * @type {Element}
         */
        const buttons_elem = this.element.querySelector( '#buttons' );

        /**
         * app configuration is managed in a local JavaScript object
         * @type {boolean}
         */
        const is_local = !this.data.store.source().name;

        /**
         * starting with new app configuration
         * @type {boolean}
         */
        let is_new = !Object.keys( dataset ).length;

        // render initial app state
        await renderApp();

        /**
         * renders loaded app and updates preview
         * @returns {Promise}
         */
        async function renderApp() {

          // render new app-specific builder with loaded app configuration as start values
          builder = await self.builder.start( {
            root: builder_elem,
            data: {
              store: [ 'ccm.store', { app: dataset } ],
              key: 'app'
            },
            onchange: updatePreview
          } );

          // activate/disable "Update" and "Delete" button
          if ( app_id && !is_new )
            !is_local && buttons_elem.querySelectorAll( '.disabled' ).forEach( button => button.classList.remove( 'disabled' ) );
          else {
            buttons_elem.querySelector( '#button-update' ).classList.add( 'disabled' );
            buttons_elem.querySelector( '#button-delete' ).classList.add( 'disabled' );
          }

          // update preview of build app
          await updatePreview();

        }

        /** when "Create" button has been clicked */
        async function createApp() {

          // has user instance? => perform login
          self.user && await self.user.login();

          // get current app configuration from app-specific builder
          dataset = self.getValue(); delete dataset.key;

          // add permission settings
          if ( self.user ) dataset._ = { access: { get: 'all', set: 'creator', del: 'creator' } };

          // save app configuration
          app_id = await self.data.store.set( dataset ); delete dataset.key;

          // no more a new app configuration
          is_new = false;

          // logging of 'create' event
          self.logger && self.logger.log( 'create', $.clone( dataset ) );

          // perform certificate request
          self.blockchain && self.blockchain.request( app_id );

          // give app to user
          await handoverApp();

          // has 'change' callback? => perform it
          self.onchange && self.onchange( self, 'create' );

        }

        /** when "Read" button has been clicked */
        async function readApp() {

          // logging of 'read' event
          self.logger && self.logger.log( 'read' );

          /**
           * modal dialog content for loading an existing app
           * @type {Element}
           */
          const content = $.html( self.html.read, {
            embed: async () => {

              /**
               * decomposed embed code
               * @type {Object}
               */
              const result = self.helper.decomposeEmbedCode( content.querySelector( '#embed_code' ).value.trim() );

              // load app
              result && await load( result.key, result.store.name ? await ccm.store( result.store ) : undefined );

            },
            app_id: async () => await load( content.querySelector( '#app_id' ).value.trim() ),
            url: async () => {

              /**
               * decomposed app URL
               * @type {Object}
               */
              const result = self.helper.decomposeAppURL( content.querySelector( '#app_url' ).value.trim() );

              // load app
              result && await load( result.key, result.store.name ? await ccm.store( result.store ) : undefined );

            }
          } );

          // render modal dialog
          const dialog = await self.modal_dialog.start( {
            "modal_title": "Loading an existing App",
            "modal_content": content,
            "footer": null
          } );

          /**
           * loads a ccm-based app
           * @param {string|string[]} key - app ID
           * @param {Object} store - settings for the ccm data store that contains the ccm-based app instance configuration
           * @returns {Promise<void>}
           */
          async function load( key, store=self.data.store ) {

            // has user instance? => perform login
            self.user && await self.user.login();

            // no app ID? => abort
            if ( !key ) return;

            // load app configuration
            dataset = await store.get( key );

            // app configuration not exists? => abort
            if ( !dataset ) return;

            // remove modal dialog
            dialog.close();

            // logging of 'load' event
            self.logger && self.logger.log( 'load', $.clone( dataset ) );

            // remember App ID
            app_id = dataset.key; delete dataset.key;

            // starts not from new app configuration
            is_new = false;

            // render loaded app
            await renderApp();

            // perform 'change' callback
            self.onchange && self.onchange( self, 'read' );

          }

        }

        /** when "Save Changes" button has been clicked */
        async function updateApp() {

          // invalid state? => abort
          if ( !app_id || is_new || is_local ) return;

          // has user instance? => perform login
          self.user && await self.user.login();

          // get current app configuration from app-specific builder
          dataset = builder.getValue();

          // add App-ID to app configuration (to save app under same App-ID again)
          dataset.key = app_id;

          // logging of 'update' event
          self.logger && self.logger.log( 'update', $.clone( dataset ) );

          // save app configuration
          app_id = await self.data.store.set( dataset ); delete dataset.key;

          // give app to user
          await handoverApp();

          // has 'change' callback? => perform it
          self.onchange && self.onchange( self, 'update' );

        }

        /** when "Delete" button has been clicked */
        async function deleteApp() {

          // invalid state or user is not sure about deletion? => abort
          if ( !app_id || is_new || is_local || !confirm( self.warning ) ) return;

          // has user instance? => perform login
          self.user && await self.user.login();

          // logging of 'delete' event
          self.logger && self.logger.log( 'delete', $.clone( app_id ) );

          // delete app configuration
          await self.data.store.del( app_id );

          // forget App-ID
          app_id = undefined;

          // up to now a new app configuration
          is_new = true;

          // continue with new empty app configuration
          dataset = { key: $.generateKey() };

          // update frontend
          await renderApp();

          // has 'change' callback? => perform it
          self.onchange && self.onchange( self, 'delete' );

        }

        /** gives app to user */
        async function handoverApp() {

          // activate "Update" and "Delete" button
          !is_local && buttons_elem.querySelectorAll( '.disabled' ).forEach( button => button.classList.remove( 'disabled' ) );

          /**
           * modal dialog content for handover of the app
           * @type {Element}
           */
          const content = $.html( self.html.handover );

          // render modal dialog
          await self.modal_dialog.start( {
            "modal_title": "Handover of the App",
            "modal_content": content,
            "footer": null
          } );

          // prepare data store settings (needed for embed code)
          let store_settings = self.data.store.source(); if ( is_local ) { store_settings = {}; store_settings[ app_id ] = dataset; }

          /**
           * embed code for saved app
           * @type {string}
           */
          const embed_code = self.helper.embedCode ? await self.helper.embedCode( self.app.url, store_settings, app_id, undefined, self.ccm ) : undefined;

          // provide App via Embed Code
          if ( embed_code ) {
            content.querySelector( '#embed_code' ).value = embed_code;
            content.querySelector( '#embed_copy' ).addEventListener( 'click', () => copyToClipboard( content.querySelector( '#embed_code' ) ) );
          }
          else $.removeElement( content.querySelector( '#embed' ) );

          // provide App ID
          content.querySelector( '#app_id'  ).value = app_id;
          content.querySelector( '#id_copy' ).addEventListener( 'click', () => copyToClipboard( content.querySelector( '#app_id' ) ) );

          // provide App via URL
          const app_url = self.helper.appURL( self.app.url, store_settings, app_id );
          content.querySelector( '#app_url'  ).value = app_url;
          content.querySelector( '#url_copy' ).addEventListener( 'click', () => copyToClipboard( content.querySelector( '#app_url' ) ) );

          // provide App via QR Code
          if ( self.qr_code && qrcode ) {
            let demoQRCode = qrcode( 0, 'M' );
            demoQRCode.addData( app_url );
            demoQRCode.make();
            let qrCodeSVGTag = document.createElement( 'div' );
            qrCodeSVGTag.innerHTML = demoQRCode.createImgTag();
            $.setContent( content.querySelector( '#qr_code' ), qrCodeSVGTag.firstChild );
          }
          else $.removeElement( content.querySelector( '#qr_code' ) );

          // provide App via Download as HTML File
          if ( embed_code && self.helper.downloadApp )
            content.querySelector( '#download' ).addEventListener( 'click', () => self.helper.downloadApp( embed_code ) );
          else
            $.removeElement( content.querySelector( '#download' ) );

          // provide App via Bookmarklet
          if ( self.bookmarklet )
            content.querySelector( '#bookmarklet' ).setAttribute( 'href', ( await self.bookmarklet.instance( {
              app: [ 'ccm.start', self.app.url, self.getValue() ],
              icon: self.icon
            } ) ).bookmarklet() );
          else
            $.removeElement( content.querySelector( '#bookmarklet' ) );

          // provide App via iBook Widget
          if ( embed_code && self.helper.iBookWidget )
            content.querySelector( '#ibook' ).addEventListener( 'click', () => self.helper.iBookWidget( embed_code ) );
          else
            $.removeElement( content.querySelector( '#ibook' ) );

          // provide App via SCORM
          if ( embed_code && self.helper.scorm )
            content.querySelector( '#scorm' ).addEventListener( 'click', () => self.helper.scorm( embed_code ) );
          else
            $.removeElement( content.querySelector( '#scorm' ) );

          /**
           * copies text inside a HTML element to clipboard
           * @param element
           */
          function copyToClipboard( element ) {

            const range = document.createRange();
            range.selectNode( element );
            const selection = window.getSelection();
            selection.removeAllRanges();
            if ( !selection.containsNode( element ) )
              selection.addRange( range );
            document.execCommand( 'copy' );

          }

        }

        /** updates website area for app preview */
        async function updatePreview() {

          // no preview element? => abort
          if ( !preview_elem ) return;

          // prepare app configuration
          let config = self.getValue();
          if ( self.convert && self.convert.builder_to_app ) config = self.convert.builder_to_app( config );
          config.root = preview_elem;

          // render app in preview element
          await self.app.start( config );

        }

      };

      /**
       * returns resulting instance configuration for target component
       * @returns {Object} instance configuration for target component
       */
      this.getValue = () => builder && builder.getValue && $.clone( builder.getValue() ) || null;

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
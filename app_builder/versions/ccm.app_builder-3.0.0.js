/**
 * @overview ccm component for app creation
 * @author André Kless <andre.kless@web.de> 2018-2019
 * @license The MIT License (MIT)
 * @version 3.0.0
 * @changes
 * version 3.0.0 (05.07.2019):
 * - specifying metadata when creating a new app
 * - delete of app deletes app configuration and also metadata
 * - change event is triggered also when app configuration has changed
 * - abort if login process was canceled by user
 * - bug fix for copy to clipboard
 * - uses ccm v21.1.3
 * (for older version changes see ccm.app_builder-2.0.0.js)
 */

( () => {

  const component = {

    name: 'app_builder', version: [ 3, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-21.1.3.js',

    config: {
      "app": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.4.1.js" ],
//    "window": [ "ccm.component", "https://ccmjs.github.io/akless-components/window/versions/ccm.window-1.0.0.js" ],
      "builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.4.1.js", { "directly": true, "nosubmit": true } ],
//    "convert": { "app_to_builder": json => json, "builder_to_app": json => json },
      "css": [ "ccm.load",
        "https://ccmjs.github.io/akless-components/app_builder/resources/styles.css",
        "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
        { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css" }
      ],
      "data": { "store": [ "ccm.store" ] },
//    "form": [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.3.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/app_builder/resources/resources.js", "form" ] ],
      "helper": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/helper.mjs", "type": "module" } ],
      "html": {
        "main": {
          "id": "main",
          "inner": [
            {
              "id": "header",
              "inner": [
                { "id": "lang" },
                { "id": "user" }
              ]
            },
            {
              "id": "maker",
              "inner": [
                { "id": "builder" },
                {
                  "id": "preview",
                  "inner": [
                    { "tag": "b", "inner": "Preview:" },
                    { "id": "app" }
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
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
//    "meta_store": [ "ccm.store" ],
      "modal_dialog": [ "ccm.component", "https://ccmjs.github.io/tkless-components/modal/versions/ccm.modal-2.0.0.js", {
        "css": [ "ccm.load",
          "https://use.fontawesome.com/releases/v5.6.3/css/all.css",
          { "context": "head", "url": "https://use.fontawesome.com/releases/v5.6.3/css/all.css" }
        ]
      } ],
//    "onchange": ( instance, event ) => { console.log( event, instance.getValue() ); },
//    "qr_code": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/qrcode-generator/qrcode.min.js" ],
//    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
      "warning": "Are you sure you want to delete this App?"
    },

    Instance: function () {

      let $; const self = this;

      /**
       * currently used builder instance
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
         * dataset key of app configuration
         * @type {string}
         */
        let app_id = dataset.key; delete dataset.key;

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

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, {
          onCreate: createApp,
          onRead:   readApp,
          onUpdate: updateApp,
          onDelete: deleteApp
        } ) );

        // select relevant web page areas
        const builder_elem = this.element.querySelector( '#builder' );
        const app_elem = this.element.querySelector( '#app' );
        const buttons_elem = this.element.querySelector( '#buttons' );

        // render login/logout and multilingualism area
        this.lang && $.setContent( this.element.querySelector( '#lang' ), this.lang.root );
        this.user && $.setContent( this.element.querySelector( '#user' ), this.user.root );

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
            onchange: async () => {
              self.onchange && self.onchange( self, 'change' );   // perform 'onchange' callback
              await updatePreview();                              // update preview section
            }
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

          // user has to be logged in
          try { self.user && await self.user.login(); } catch ( e ) { return; }

          // get metadata from user
          const metadata = await getMetadata();

          // get current app configuration from app-specific builder
          dataset = self.getValue(); delete dataset.key;

          // add permission settings and dataset key of metadata
          if ( self.user ) dataset._ = { access: { get: 'all', set: 'creator', del: 'creator' } };
          dataset.meta = [ self.meta_store.source(), metadata.key ];

          // save app configuration
          app_id = await self.data.store.set( dataset ); delete dataset.key;

          // has metadata?
          if ( metadata ) {

            // add app ID to source information
            metadata.source = [ metadata.source, app_id ];

            // save metadata
            await self.meta_store.set( metadata );

          }

          // logging of 'create' event
          self.logger && self.logger.log( 'create', { config: $.clone( dataset ), metadata: $.clone( metadata ) } );

          // no more a new app configuration
          is_new = false;

          // perform 'onchange' callback
          self.onchange && self.onchange( self, 'create' );

          // give app to user
          await handoverApp();

          /**
           * renders publish form for app metadata and returns resulting app metadata
           * @returns {Promise<Object>} app metadata
           */
          function getMetadata() { return new Promise( resolve => {

            // no datastore for metadata or no form component or app configuration is managed locally? => no metadata
            if ( !self.meta_store || !self.form || is_local ) return resolve( null );

            // hide main area
            self.element.querySelector( '#main' ).style.display = 'none';
            $.append( self.element, $.html( { id: 'form' } ) );

            // render publish form
            self.form.start( {
              root: self.element.querySelector( '#form' ),
              onfinish: async form => {

                // user has to be logged in
                try { self.user && await self.user.login(); } catch ( e ) { return; }

                // show main area
                $.removeElement( self.element.querySelector( '#form' ) );
                self.element.querySelector( '#main' ).style.display = 'block';

                /**
                 * app metadata
                 * @type {Object}
                 */
                const meta = form.getValue();

                // prepare metadata
                meta.metaFormat = 'ccm-meta';
                meta.metaVersion = '2.0.0';
                meta.version = 1;
                meta.creator = self.user.data().name || self.user.data().user;
                meta.date = new Date().toISOString().split( 'T' )[ 0 ];
                meta.format = 'application/json';
                meta.path = self.app.url || self.app.index;
                meta.source = self.data.store.source();
                meta.license = 'CC0';
                meta.tags = meta.tags.filter( tag => tag );
                meta.key = $.generateKey();

                // set permission settings
                meta._ = { access: { get: 'all', set: 'creator', del: 'creator' } };

                resolve( meta );
              }
            } );

          } ); }

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
            modal_title: 'Loading an existing App',
            modal_content: content,
            footer: null
          } );

          /**
           * loads a ccm-based app
           * @param {string|string[]} key - app ID
           * @param {Object} [store=self.data.store] - settings for the ccm data store that contains the ccm-based app instance configuration
           * @returns {Promise<void>}
           */
          async function load( key, store = self.data.store ) {

            // user has to be logged in
            try { self.user && await self.user.login(); } catch ( e ) { return; }

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

            // perform 'onchange' callback
            self.onchange && self.onchange( self, 'read' );

          }

        }

        /** when "Save Changes" button has been clicked */
        async function updateApp() {

          // invalid state? => abort
          if ( !app_id || is_new || is_local ) return;

          // user has to be logged in
          try { self.user && await self.user.login(); } catch ( e ) { return; }

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

          // delete app metadata
          if ( dataset.meta && self.meta_store && !is_local ) {
            dataset = await self.data.store.get( app_id );
            await self.meta_store.del( dataset.meta[ 1 ] );
          }

          // delete app configuration
          await self.data.store.del( app_id );

          // forget App-ID
          app_id = undefined;

          // up to now: creation of a new app configuration
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
            modal_title: 'Handover of the App',
            modal_content: content,
            footer: null
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
          if ( self.window ) {
            const window = await self.window.instance( { app: [ 'ccm.start', self.app.url, self.getValue() ] } );
            content.querySelector( '#bookmarklet' ).setAttribute( 'href', window.bookmarklet() );
          }
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
           * @param {Element} element - HTML element
           */
          function copyToClipboard( element ) {

            element.select();
            document.execCommand( 'copy' );

          }

        }

        /** updates website area for app preview */
        async function updatePreview() {

          // no preview element? => abort
          if ( !app_elem ) return;

          // prepare app configuration
          let config = self.getValue();
          if ( self.convert && self.convert.builder_to_app ) config = self.convert.builder_to_app( config );
          config.root = app_elem;

          // render app in preview section
          await self.app.start( config );

        }

      };

      /** @returns {Object} instance configuration for target component */
      this.getValue = () => builder && builder.getValue && $.clone( builder.getValue() ) || null;

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
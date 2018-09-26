/**
 * @overview ccm component for building apps
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (25.09.2018)
 */

( function () {

  const component = {

    name: 'app_builder',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {

      "html": {
        "main": {
          "id": "main",
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
              "class": "text-center",
              "inner": {
                "class": "btn-group",
                "inner": [
                  {
                    "id": "button-create",
                    "class": "btn btn-primary",
                    "onclick": "%onCreate%",
                    "inner": "Create"
                  },
                  {
                    "id": "button-read",
                    "class": "btn btn-default",
                    "onclick": "%onRead%",
                    "inner": "Read"
                  },
                  {
                    "id": "button-update",
                    "class": "btn btn-primary disabled",
                    "onclick": "%onUpdate%",
                    "inner": "Update"
                  },
                  {
                    "id": "button-delete",
                    "class": "btn btn-danger disabled",
                    "onclick": "%onDelete%",
                    "inner": "Delete"
                  }
                ]
              }
            },
            {
              "id": "advance",
              "class": "container-fluid"
            }
          ]
        },
        "usage": {
          "id": "usage",
          "inner": [
            {
              "tag": "p",
              "id": "success",
              "class": "lead text-success",
              "inner": "Saved successfully"
            },
            {
              "tag": "legend",
              "class": "text-primary",
              "inner": "How can you use the App?"
            },
            {
              "tag": "p",
              "class": "text-info",
              "inner": [
                "Add the following ",
                {
                  "tag": "code",
                  "inner": "EMBED CODE"
                },
                " to your page:"
              ]
            },
            {
              "tag": "p",
              "inner": {
                "tag": "code",
                "id": "embed_code"
              }
            },
            {
              "tag": "legend",
              "class": "text-primary",
              "inner": "If you want to change the created App..."
            },
            {
              "tag": "p",
              "class": "alert alert-info",
              "role": "alert",
              "inner": [
                {
                  "tag": "span",
                  "class": "glyphicon glyphicon-exclamation-sign"
                },
                " Note this ID: ",
                {
                  "tag": "span",
                  "class": "text-danger",
                  "id": "id"
                }
              ]
            }
          ]
        },
        "read": {
          "id": "read",
          "inner": [
            {
              "tag": "legend",
              "class": "text-primary",
              "inner": "Loading an existing App"
            },
            {
              "tag": "p",
              "class": "text-info",
              "inner": "Give here your App Identifier:",
            },
            {
              "class": "input-group",
              "inner": [
                {
                  "tag": "input",
                  "id": "key",
                  "class": "form-control",
                  "type": "text",
                  "placeholder": "App-ID..."
                },
                {
                  "tag": "span",
                  "class": "input-group-btn",
                  "inner": {
                    "tag": "button",
                    "id": "button-load",
                    "class": "btn btn-info",
                    "onclick": "%loadApp%",
                    "inner": "Load App"
                  }
                }
              ]
            },
            {
              "tag": "p",
              "id": "failed",
              "class": "text-danger hidden",
              "inner": "App-ID not found"
            }
          ]
        },
        "loaded": {
          "id": "loaded",
          "inner": {
            "tag": "p",
            "id": "success",
            "class": "lead text-success",
            "inner": "App was loaded successfully."
          }
        },
        "deleted": {
          "id": "deleted",
          "inner": {
            "tag": "p",
            "id": "success",
            "class": "lead text-danger",
            "inner": "App was deleted successfully."
          }
        }
      },
      "css": [ "ccm.load",
        "https://ccmjs.github.io/akless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap/css/font-face.css" },
        "https://ccmjs.github.io/akless-components/app_builder/resources/default.css"
      ],
      "data": { "store": [ "ccm.store" ] },
      "warning": "Are you sure you want to delete this App?"

  //  "builder"
  //  "app"
  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onchange"

    },

    Instance: function () {

      let $;

      /**
       * current app-specific builder instance
       * @type {Object}
       */
      let builder;

      this.ready = async () => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        const self = this;

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
        $.setContent( this.element, $.html( this.html.main, {
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
         * website area for advanced content
         * @type {Element}
         */
        const advance_elem = this.element.querySelector( '#advance' );

        /**
         * app configuration is managed in a local JavaScript object
         * @type {boolean}
         */
        const isLocalStore = !this.data.store.source().name;

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
            onchange: () => { updatePreview(); clearAdvance(); }
          } );

          // activate "Update" and "Delete" button
          !isLocalStore && [ ...buttons_elem.querySelectorAll( '.disabled' ) ].map( button => button.classList.remove( 'disabled' ) );

          // update preview of build app
          await updatePreview();

        }

        /** when "Create" button has been clicked */
        async function createApp() {

          // has user instance? => perform login
          self.user && await self.user.login();

          // get current app configuration from app-specific builder
          dataset = builder.getValue(); delete dataset.key;

          // add permission settings
          if ( self.user ) dataset._ = { access: 'creator' };

          // save app configuration
          app_id = await self.data.store.set( dataset ); delete dataset.key;

          // logging of 'create' event
          self.logger && self.logger.log( 'create', $.clone( dataset ) );

          // give app to user
          handoverApp();

          // has 'change' callback? => perform it
          self.onchange && self.onchange( self );

        }

        /** when "Read" button has been clicked */
        function readApp() {

          // logging of 'read' event
          self.logger && self.logger.log( 'read' );

          // render an input field via which an App-ID can be entered
          $.setContent( advance_elem, $.html( self.html.read, {

            /** when "Load App" button has been clicked */
            loadApp: async () => {

              // has user instance? => perform login
              self.user && await self.user.login();

              /**
               * entered App-ID
               * @type {string}
               */
              const key = advance_elem.querySelector( '#key' ).value.trim();

              // no key entered? => show failed message
              if ( !key ) return failed();

              // load app configuration
              dataset = await self.data.store.get( key );

              // no app configuration with entered App-ID exists? => show failed message
              if ( !dataset ) return failed();

              // logging of 'load' event
              self.logger && self.logger.log( 'load', $.clone( dataset ) );

              // remember App-ID
              app_id = dataset.key; delete dataset.key;

              // render loaded app
              await renderApp();

              // render success message (and slowly fade it out)
              $.setContent( advance_elem, $.html( self.html.loaded ) );
              fadeOut( advance_elem.querySelector( '#success' ) );

              // perform 'change' callback
              self.onchange && self.onchange( self );

              /** shows failed message */
              function failed() {

                const failed_elem = advance_elem.querySelector( '#failed' );
                failed_elem.classList.remove( 'hidden' );
                fadeOut( failed_elem );

              }

            }

          } ) );

        }

        /** when "Update" button has been clicked */
        async function updateApp() {

          // invalid state? => abort
          if ( !app_id || isLocalStore ) return;

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
          handoverApp();

          // has 'change' callback? => perform it
          self.onchange && self.onchange( self );

        }

        /** when "Delete" button has been clicked */
        async function deleteApp() {

          // invalid state or user is not sure about deletion? => abort
          if ( !app_id || isLocalStore || !confirm( self.warning ) ) return;

          // has user instance? => perform login
          self.user && await self.user.login();

          // logging of 'delete' event
          self.logger && self.logger.log( 'delete', $.clone( app_id ) );

          // delete app configuration
          await self.data.store.del( app_id );

          // forget App-ID
          app_id = undefined;

          // render success message (and slowly fade it out)
          $.setContent( advance_elem, $.html( self.html.deleted ) );
          fadeOut( advance_elem.querySelector( '#success' ) );

          // disable "Update" and "Delete" button
          buttons_elem.querySelector( '#button-update' ).classList.add( 'disabled' );
          buttons_elem.querySelector( '#button-delete' ).classList.add( 'disabled' );

          // has 'change' callback? => perform it
          self.onchange && self.onchange( self );

        }

        /** gives app to user */
        function handoverApp() {

          // activate "Update" and "Delete" button
          !isLocalStore && [ ...buttons_elem.querySelectorAll( '.disabled' ) ].map( button => button.classList.remove( 'disabled' ) );

          // render app usage informations
          $.setContent( advance_elem, $.html( self.html.usage ) );
          advance_elem.querySelector( '#embed_code' ).innerHTML = getEmbedCode();
          advance_elem.querySelector( '#id'         ).innerHTML = app_id;

          // fade out the success message
          fadeOut( advance_elem.querySelector( '#success' ) );

          /**
           * returns embed code for saved app
           * @returns {string} embed code of saved app
           */
          function getEmbedCode() {

            const index = $.getIndex( self.app.url );
            let store_settings = self.data.store.source(); if ( isLocalStore ) { store_settings = {}; store_settings[ app_id ] = dataset; }
            return $.escapeHTML( '<script src="' + self.app.url + '"></script><ccm-' + index + ' key=\'["ccm.get",' + JSON.stringify( store_settings ) + ',"' + app_id + '"]\'></ccm-' + index + '>' );

          }

        }

        /**
         * fades out an element
         * @param {Element} elem
         */
        function fadeOut( elem ) {
          elem.style.opacity = 1;
          ( function fade() {
            if ( ( elem.style.opacity -= .005 ) >= 0 ) requestAnimationFrame( fade );
          } )();
        }

        /** clears website area for advanced content */
        function clearAdvance() {
          $.setContent( advance_elem, '' );
        }

        /** updates website area for app preview */
        async function updatePreview() {

          preview_elem && $.setContent( preview_elem, ( await self.app.start( self.getValue() ) ).root );

        }

      };

      /**
       * returns resulting instance configuration for target component
       * @returns {Object} instance configuration for target component
       */
      this.getValue = () => builder && builder.getValue && builder.getValue() || null;

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
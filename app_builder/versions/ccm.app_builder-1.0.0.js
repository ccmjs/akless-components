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

    version: [ 1, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.0.0.js',

    config: {

      "html": {
        "main": {
          "id": "main",
          "inner": [
            {
              "id": "maker",
              "inner": [
                { "id": "builder" },
                { "id": "preview" }
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
      "builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.1.0.js", {
        "html.inner.1": "",
        "directly": true,
        "data": {
          "store": [ "ccm.store", "https://ccmjs.github.io/akless-components/content/resources/configs.js" ],
          "key": "demo"
        }
      } ],
      "app": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.0.js" ],
      "store": [ "ccm.store" ],
      "warning": "Are you sure you want to delete this App?"

  //  "data": {},
  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onchange"

    },

    Instance: function () {

      let $;

      /**
       * current app builder instance
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

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

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

        // render app builder
        builder = await this.builder.start( {
          root: builder_elem,
          onchange: () => { updatePreview(); clearAdvance(); }
        } );

        // render preview
        await updatePreview();

        /**
         * current App-ID
         * @type {string}
         */
        let app_id;

        /**
         * app configuration is managed in a local JavaScript object
         * @type {boolean}
         */
        const isLocalStore = !this.store.source().name;

        /** when "Create" button has been clicked */
        async function createApp() {

          // has user instance? => perform login
          self.user && await self.user.login();

          /**
           * current app configuration from app builder
           * @type {Object}
           */
          const config = builder.getValue();

          // add permission settings
          if ( self.user ) config._ = { access: 'creator' };

          // remove existing key (than new key will be generated)
          delete config.key;

          // save app configuration in datastore and give app to user
          const key = await self.store.set( config );

          // add generated App-ID to app configuration
          config.key = key;

          // logging of 'create' event
          self.logger && self.logger.log( 'create', $.clone( config ) );

          // give app to user
          handoverApp( config );

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

              // has user instance? => perform login
              self.user && await self.user.login();

              // load app configuration
              const config = await self.store.get( key );

              // no app configuration with entered App-ID exists? => show failed message
              if ( !config ) return failed();

              // logging of 'load' event
              self.logger && self.logger.log( 'load', $.clone( config ) );

              // render new app builder instance with loaded app configuration as start values
              const datastore = {}; datastore[ key ] = config;
              const builder_inst = await self.builder.start( {
                root: builder_elem,
                target: [ 'ccm.component', self.app.url ],
                data: {
                  store: [ 'ccm.store', datastore ],
                  key: key
                },
                onchange: clearAdvance
              } );

              // remember App-ID and app builder instance
              app_id = key; builder = builder_inst;

              // activate "Update" and "Delete" button
              !isLocalStore && [ ...buttons_elem.querySelectorAll( '.disabled' ) ].map( button => button.classList.remove( 'disabled' ) );

              // render success message (and slowly fade it out)
              $.setContent( advance_elem, $.html( self.html.loaded ) );
              fadeOut( advance_elem.querySelector( '#success' ) );

              // has onchange callback? => perform it
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

          // has no existing App-ID? => abort
          if ( !app_id || isLocalStore ) return;

          // has user instance? => perform login
          self.user && await self.user.login();

          /**
           * current app configuration from the app builder
           * @type {Object}
           */
          const config = builder.getValue();

          // add App-ID to the app configuration (to save the app under the same App-ID again)
          config.key = app_id;

          // logging of 'update' event
          self.logger && self.logger.log( 'update', $.clone( config ) );

          // save app configuration in datastore
          await self.store.set( config );

          // give app to user
          handoverApp( config )

        }

        /** when "Delete" button has been clicked */
        async function deleteApp() {

          // has no existing App-ID or user is not sure about the deletion? => abort
          if ( !app_id || isLocalStore || !confirm( self.warning ) ) return;

          // has user instance? => perform login
          self.user && await self.user.login();

          // has logger instance? => log 'delete' event
          self.logger && self.logger.log( 'delete', app_id );

          // delete app configuration in datastore
          await self.store.del( app_id );

          // has onchange callback? => perform it
          self.onchange && self.onchange( self );

          // forget App-ID
          app_id = undefined;

          // render success message (and slowly fade it out)
          $.setContent( advance_elem, $.html( self.html.deleted ) );
          fadeOut( advance_elem.querySelector( '#success' ) );

          // disable "Update" and "Delete" button
          buttons_elem.querySelector( '#button-update' ).classList.add( 'disabled' );
          buttons_elem.querySelector( '#button-delete' ).classList.add( 'disabled' );

        }

        /**
         * gives the app to the user
         * @param {Object} config - app configuration
         */
        function handoverApp( config ) {

          // remember the App-ID
          app_id = config.key;

          // activate "Update" and "Delete" button
          !isLocalStore && [ ...buttons_elem.querySelectorAll( '.disabled' ) ].map( button => button.classList.remove( 'disabled' ) );

          // render app usage informations
          $.setContent( advance_elem, $.html( self.html.usage ) );
          const store_settings = self.store.source(); if ( isLocalStore ) store_settings[ config.key ] = config;
          advance_elem.querySelector( '#embed_code' ).innerHTML = getEmbedCode( self.app.url, $.getIndex( self.app.url ), store_settings, config.key );
          advance_elem.querySelector( '#id'         ).innerHTML = config.key;

          // fade out the success message
          fadeOut( advance_elem.querySelector( '#success' ) );

          // has onchange callback? => perform it
          self.onchange && self.onchange( self );

          /**
           * returns the embed code for the saved app
           * @param {string} url - component URL
           * @param {string} index - component index
           * @param {Object} store_settings - settings of datastore that contains the app configuration
           * @param {string} key - dataset key of app configuration (App-ID)
           * @returns {string} embed code of saved app
           */
          function getEmbedCode( url, index, store_settings, key ) {

            return $.escapeHTML( '<script src="' + self.app.url + '"></script><ccm-' + index + ' key=\'["ccm.get",' + JSON.stringify( store_settings ) + ',"' + key + '"]\'></ccm-' + index + '>' );

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
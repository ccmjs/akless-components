/**
 * @overview ccm component for Create/Read/Update/Delete a ccm-based app
 * @author André Kless <andre.kless@web.de>, 2018
 * @license The MIT License (MIT)
 * @version latest (2.0.0)
 * @changes
 * version 2.0.0 (01.05.2018)
 * - updated default instance configuration
 * - updated logging of events
 * - clear advance element on app builder changes
 * - support of 'Create' and 'Read' for local datastores
 * - failed message when loading a unknown app
 * - use of app builder property 'data' instead of 'start_values'
 * - escaped HTML for all parts of embed codes
 * - uses ccm v16.5.0
 * version 1.0.0 (09.02.2018)
 */

{
  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'crud_app',

    /**
     * component version
     * @type {number[]}
     */
    version: [ 2, 0, 0 ],

    /**
     * reference to used framework version
     * @type {Object}
     */
    ccm: {
      url: 'https://ccmjs.github.io/ccm/versions/ccm-16.5.0.js',
      integrity: 'sha384-T7G337W0ODDj5MTIONvKmlJKZsbg6aNvkBXN/Yn7RZWGM7SUEZ0Qe2346QErahsU',
      crossorigin: 'anonymous'
    },

    /**
     * default instance configuration
     * @type {Object}
     */
    config: {
      "html": {
        "main": {
          "id": "main",
          "inner": [
            { "id": "builder" },
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
        "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" }
      ],
      "builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/cloze_builder/versions/ccm.cloze_builder-2.2.0.js", { "submit_button": false } ],
      "url": "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-4.1.0.js",
      "store": [ "ccm.store" ],
      "warning": "Are you sure you want to delete this App?"

  //  "user"
  //  "logger"
  //  "onchange"

    },

    /**
     * for creating instances out of this component
     * @constructor
     */
    Instance: function () {

      /**
       * own reference for inner functions
       * @type {Instance}
       */
      const self = this;

      /**
       * privatized instance members
       * @type {Object}
       */
      let my;

      /**
       * shortcut to help functions
       * @type {Object.<string,function>}
       */
      let $;

      /**
       * current app builder instance
       * @type {Object}
       */
      let builder;

      /**
       * is called once after the initialization and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.ready = callback => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        // has logger instance? => log 'ready' event
        self.logger && self.logger.log( 'ready', $.clone( my ) );

        callback();
      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = callback => {

        // has logger instance? => log 'start' event
        self.logger && self.logger.log( 'start' );

        // render main HTML structure
        $.setContent( self.element, $.html( my.html.main, {
          onCreate: () => createApp(),
          onRead:   () =>   readApp(),
          onUpdate: () => updateApp(),
          onDelete: () => deleteApp()
        } ) );

        /**
         * website area of the app builder
         * @type {Element}
         */
        const builder_elem = self.element.querySelector( '#builder' );

        /**
         * website area of the buttons
         * @type {Element}
         */
        const buttons_elem = self.element.querySelector( '#buttons' );

        /**
         * website area for advanced content
         * @type {Element}
         */
        const advance_elem = self.element.querySelector( '#advance' );

        // render app builder
        my.builder.start( {
          root: builder_elem,
          target: [ 'ccm.component', my.url ],
          onchange: clearAdvance
        }, builder_inst => {

          // remember the app builder instance
          builder = builder_inst;

          // rendering completed => perform callback
          callback && callback();

        } );

        /**
         * current App-ID
         * @type {string}
         */
        let app_id;

        /**
         * app configuration is managed in a local JavaScript object
         * @type {boolean}
         */
        const isLocalStore = Object.keys( my.store.source() ).length === 0;

        /** when the "Create" button has been clicked */
        function createApp() {

          // has user instance? => perform login
          self.user ? self.user.login( proceed ) : proceed();

          function proceed() {

            /**
             * current app configuration from the app builder
             * @type {Object}
             */
            const config = builder.getValue();

            // add permission settings
            if ( self.user ) config._ = { access: 'creator' };

            // remove existing key (than new key will be generated)
            delete config.key;

            // save app configuration in datastore and give app to user
            my.store.set( config, key => {

              // add generated App-ID to app configuration
              config.key = key;

              // has logger instance? => log 'create' event
              self.logger && self.logger.log( 'create', $.clone( config ) );

              // give app to user
              handoverApp( config ) } );

          }

        }

        /** when "Read" button has been clicked */
        function readApp() {

          // has logger instance? => log 'read' event
          self.logger && self.logger.log( 'read' );

          // render an input field via which an App-ID can be entered
          $.setContent( advance_elem, $.html( my.html.read, {

            /** when "Load App" button has been clicked */
            loadApp: () => {

              // has user instance? => perform login
              self.user ? self.user.login( proceed ) : proceed();

              function proceed() {

                /**
                 * entered App-ID
                 * @type {string}
                 */
                const key = advance_elem.querySelector( '#key' ).value.trim();

                // no key entered? => show failed message
                if ( !key ) return failed();

                // load app configuration
                my.store.get( key, config => {

                  // no app configuration with entered App-ID exists? => show failed message
                  if ( !config ) return failed();

                  // has logger instance? => log 'load' event
                  self.logger && self.logger.log( 'load', $.clone( config ) );

                  // render new app builder instance with the loaded app configuration as start values
                  const datastore = {}; datastore[ key ] = config;
                  my.builder.start( {
                    root: builder_elem,
                    target: [ 'ccm.component', my.url ],
                    data: {
                      store: [ 'ccm.store', datastore ],
                      key: key
                    },
                    onchange: clearAdvance
                  }, builder_inst => {

                    // remember App-ID and app builder instance
                    app_id = key; builder = builder_inst;

                    // activate "Update" and "Delete" button
                    !isLocalStore && [ ...buttons_elem.querySelectorAll( '.disabled' ) ].map( button => button.classList.remove( 'disabled' ) );

                    // render success message (and slowly fade it out)
                    $.setContent( advance_elem, $.html( my.html.loaded ) );
                    fadeOut( advance_elem.querySelector( '#success' ) );

                    // has onchange callback? => perform it
                    self.onchange && self.onchange( self );

                  } );

                } );

                /** shows failed message */
                function failed() {

                  const failed_elem = advance_elem.querySelector( '#failed' );
                  failed_elem.classList.remove( 'hidden' );
                  fadeOut( failed_elem );

                }

              }

            }

          } ) );

        }

        /** when "Update" button has been clicked */
        function updateApp() {

          // has no existing App-ID? => abort
          if ( !app_id || isLocalStore ) return;

          // has user instance? => perform login
          self.user ? self.user.login( proceed ) : proceed();

          function proceed() {

            /**
             * current app configuration from the app builder
             * @type {Object}
             */
            const config = builder.getValue();

            // add App-ID to the app configuration (to save the app under the same App-ID again)
            config.key = app_id;

            // has logger instance? => log 'update' event
            self.logger && self.logger.log( 'update', $.clone( config ) );

            // save app configuration in datastore and give app to user
            my.store.set( config, () => handoverApp( config ) );

          }

        }

        /** when "Delete" button has been clicked */
        function deleteApp() {

          // has no existing App-ID or user is not sure about the deletion? => abort
          if ( !app_id || isLocalStore || !confirm( my.warning ) ) return;

          // has user instance? => perform login
          self.user ? self.user.login( proceed ) : proceed();

          function proceed() {

            // has logger instance? => log 'delete' event
            self.logger && self.logger.log( 'delete', app_id );

            // delete app configuration in datastore
            my.store.del( app_id, () => {

              // has onchange callback? => perform it
              self.onchange && self.onchange( self );

              // forget App-ID
              app_id = undefined;

              // render success message (and slowly fade it out)
              $.setContent( advance_elem, $.html( my.html.deleted ) );
              fadeOut( advance_elem.querySelector( '#success' ) );

              // disable "Update" and "Delete" button
              buttons_elem.querySelector( '#button-update' ).classList.add( 'disabled' );
              buttons_elem.querySelector( '#button-delete' ).classList.add( 'disabled' );

            } );

          }

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
          $.setContent( advance_elem, $.html( my.html.usage ) );
          const store_settings = my.store.source(); if ( isLocalStore ) store_settings[ config.key ] = config;
          advance_elem.querySelector( '#embed_code' ).innerHTML = getEmbedCode( my.url, $.getIndex( my.url ), store_settings, config.key );
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

            return $.escapeHTML( '<script src="' + my.url + '"></script><ccm-' + index + ' key=\'["ccm.get",' + JSON.stringify( store_settings ) + ',"' + key + '"]\'></ccm-' + index + '>' );

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

        /** clears website area of advanced content */
        function clearAdvance() {
          $.setContent( advance_elem, '' );
        }

      };

      /**
       * returns the resulting instance configuration for the target component
       * @returns {Object} instance configuration for target component
       */
      this.getValue = () => builder && builder.getValue && builder.getValue() || null;

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}
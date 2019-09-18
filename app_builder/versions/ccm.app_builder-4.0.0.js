/**
 * @overview ccm component for app creation
 * @author André Kless <andre.kless@web.de> 2018-2019
 * @license The MIT License (MIT)
 * @version 4.0.0
 * @changes
 * version 4.0.0 (18.09.2019):
 * - changed config parameters
 * - many config properties are now optional
 * - can work without modal dialogs, handover app and app metadata
 * - uses ccm v22.6.1
 * (for older version changes see ccm.app_builder-3.1.0.js)
 */

( () => {

  const component = {

    name: 'app_builder', version: [ 4, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-22.6.1.js',

    config: {
//    "app": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.4.1.js" ],
      "builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.4.1.js", { "directly": true, "nosubmit": true } ],
//    "convert": json => json,
      "css": [ "ccm.load",
        "https://ccmjs.github.io/akless-components/app_builder/resources/styles.css",
        "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
        { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css" }
      ],
      "data": { "store": [ "ccm.store" ] },
//    "form": [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.5.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/submit/resources/configs.js", "app_meta_create" ] ],
//    "handover_app": [ "ccm.component", "https://ccmjs.github.io/akless-components/handover_app/versions/ccm.handover_app-1.0.0.js" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/app_builder/resources/templates.html" ],
//    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
//    "meta_store": [ "ccm.store" ],
//    "modal_dialog": [ "ccm.component", "https://ccmjs.github.io/tkless-components/modal/versions/ccm.modal-2.0.0.js" ],
//    "onchange": ( instance, event ) => { console.log( event, instance.getValue() ); },
//    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]
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

        // remove no needed areas
        if ( !this.app ) $.removeElement( this.element.querySelector( '#preview' ) );

        // render language area
        if ( this.lang ) { $.append( this.element.querySelector( '#top' ), this.lang.root ); this.lang.start(); }

        // render login/logout area
        if ( this.user ) $.append( this.element.querySelector( '#top' ), this.user.root );

        // render initial app state
        await renderApp();

        /**
         * renders loaded app and updates preview
         * @returns {Promise}
         */
        async function renderApp() {

          // render new app-specific builder with loaded app configuration as start values
          builder = await self.builder.start( {
            root: self.element.querySelector( '#builder' ),
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
            !is_local && self.element.querySelectorAll( '.disabled' ).forEach( button => button.classList.remove( 'disabled' ) );
          else {
            self.element.querySelector( '#button-update' ).classList.add( 'disabled' );
            self.element.querySelector( '#button-delete' ).classList.add( 'disabled' );
          }

          // update preview of build app
          await updatePreview();

        }

        /** when "Create" button has been clicked */
        async function createApp() {

          // user has to be logged in
          try { self.user && await self.user.login(); } catch ( e ) { return; }

          // get app metadata from user
          const metadata = await getMetadata();

          // get current app configuration from app-specific builder
          dataset = self.getValue(); delete dataset.key;

          // add permission settings and dataset key of metadata
          if ( self.user ) dataset._ = { access: { get: 'all', set: 'creator', del: 'creator' } };
          if ( metadata ) dataset.meta = [ self.meta_store.source(), metadata.key ];

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

          // no component for modal dialog? => abort
          if ( !self.modal_dialog ) alert( 'App created successfully. App ID: ' + app_id );

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
              data: {
                store: [ 'ccm.store', self.data.store.source() ]
              },
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

                /**
                 * user data
                 * @type {Object}
                 */
                const user = self.user.data();

                // expand metadata
                Object.assign( meta, {
                  key: $.generateKey(),
                  metaFormat: 'ccm-meta',
                  metaVersion: '2.0.0',
                  format: 'application/json',
                  license: 'CC0',
                  path: self.app.url || self.app.index,
                  source: self.data.store.source(),
                  version: 1,
                  creator: user.name || user.user || user.key || '',
                  tags: [],
                  ignore: { demos: [], builders: [] },
                  _: { access: { get: 'all', set: 'creator', del: 'creator' } }
                } );

                resolve( meta );
              }
            } );

          } ); }

        }

        /** when "Read" button has been clicked */
        async function readApp() {

          // logging of 'read' event
          self.logger && self.logger.log( 'read' );

          // has component for modal dialog? => load app via modal dialog
          if ( self.modal_dialog ) {

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

                // remove modal dialog
                dialog.close();

              },
              app_id: async () => {

                // load app
                await load( content.querySelector( '#app_id' ).value.trim() );

                // remove modal dialog
                dialog.close();

              },
              url: async () => {

                /**
                 * decomposed app URL
                 * @type {Object}
                 */
                const result = self.helper.decomposeAppURL( content.querySelector( '#app_url' ).value.trim() );

                // load app
                result && await load( result.key, result.store.name ? await ccm.store( result.store ) : undefined );

                // remove modal dialog
                dialog.close();

              }
            } );

            // render modal dialog
            const dialog = await self.modal_dialog.start( {
              modal_title: 'Loading an existing App',
              modal_content: content,
              footer: null
            } );

          }
          else await load( prompt( 'Please enter the App-ID' ) );

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
            if ( !key ) return alert( 'Invalid App ID' );

            // load app configuration
            dataset = await store.get( key );

            // app configuration not exists? => abort
            if ( !dataset ) return alert( 'App ID not exists' );

            // logging of 'load' event
            self.logger && self.logger.log( 'load', $.clone( dataset ) );

            // remember App ID
            app_id = dataset.key; delete dataset.key;

            // starts not from new app configuration
            is_new = false;

            // no component for app preview? => success message
            if ( !self.app ) alert( 'App successfully loaded' );

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

          // no component for modal dialog? => abort
          if ( !self.modal_dialog ) alert( 'App updated successfully. App ID: ' + app_id );

          // has 'change' callback? => perform it
          self.onchange && self.onchange( self, 'update' );

          // give app to user
          await handoverApp();

        }

        /** when "Delete" button has been clicked */
        async function deleteApp() {

          // invalid state or user is not sure about deletion? => abort
          if ( !app_id || is_new || is_local || !confirm( self.warning ) ) return;

          // user has to be logged in
          try { self.user && await self.user.login(); } catch ( e ) { return; }

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

          // perform 'onchange' callback
          self.onchange && self.onchange( self, 'delete' );

        }

        /** gives app to user */
        async function handoverApp() {

          // activate "Update" and "Delete" button
          !is_local && self.element.querySelectorAll( '.disabled' ).forEach( button => button.classList.remove( 'disabled' ) );

          // render modal dialog for handover of the app
          self.modal_dialog && await self.modal_dialog.start( {
            modal_title: 'Handover of the App',
            modal_content: ( await self.handover_app.start( {
              data: self.data,
              component_url: self.app.url
            } ) ).root,
            footer: null
          } );

        }

        /** updates website area for app preview */
        async function updatePreview() {

          // no app component? => abort
          if ( !self.app ) return;

          // prepare app configuration
          let config = self.getValue();
          if ( self.convert ) config = await self.convert( config );
          config.root = self.element.querySelector( '#app' );

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
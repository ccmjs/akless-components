/**
 * @overview ccm component for managing an app
 * @author André Kless <andre.kless@web.de> 2019-2020
 * @license MIT License
 * @version 2.0.0
 * @changes
 * version 2.0.0 (17.02.2020)
 * - uses ccm v25.0.0
 * - changes for optional logged data
 * - changes for parameters of 'onchange' callback
 * - added 'onstart' callback
 * version 1.4.0 (18.09.2019)
 * - added onchange callback
 * version 1.3.1 (16.09.2019)
 * - bug fix for delete app
 * - bug fix for replace of placeholders in app metadata
 * - uses ccm v22.6.1
 * version 1.3.0 (10.09.2019)
 * - supports optional multilingualism
 * version 1.2.0 (10.09.2019)
 * - added login/logout area
 * - updated logging support
 * - "App not found" if app metadata not exists
 * - "App Configuration not found" if app configuration not exists
 * - app icon can be disabled
 * - editable app metdata (only app creator)
 * - app can be deleted (must be confirmed)
 * - fullscreen button is optional
 * - editable app metadata is optional
 * version 1.1.0 (05.09.2019)
 * - render of app metadata by using content component
 * - uses ccm v22.5.0
 * version 1.0.0 (26.07.2019)
 */

( () => {

  const component = {

    name: 'app_manager', version: [ 2, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.0.0.js',

    config: {
//    "app_details": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.3.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/content/resources/configs.js", "app_meta" ] ],
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/app_manager/resources/styles.css" ],
      "data": { "store": [ "ccm.store" ] },
//    "default_icon": "https://ccmjs.github.io/akless-components/dms/resources/img/default.png",
//    "form": [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.5.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/submit/resources/configs.js", "app_meta_edit" ] ],
//    "handover_app": [ "ccm.component", "https://ccmjs.github.io/akless-components/handover_app/versions/ccm.handover_app-1.0.1.js" ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.0.1.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/app_manager/resources/templates.html" ],
//    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
//    "onchange": console.log,
//    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]
    },

    Instance: function () {

      let $;

      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper );

        // listen to login/logout events => restart
        if ( this.user ) this.user.onchange = this.start;

      };

      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        /**
         * app metadata
         * @type {Object}
         */
        const dataset = await $.dataset( this.data );

        // metadata not exists? => abort
        if ( !dataset || Object.keys( dataset ).length <= 1 ) return $.setContent( this.element, $.html( this.html.empty, 'App' ) );

        // no app icon? => use default
        if ( !dataset.icon ) dataset.icon = this.default_icon || '';

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, await $.integrate( $.clone( dataset ), {

          /** when fullscreen button is clicked */
          fullscreen: () => {

            // show app in fullscreen mode
            $.fullscreen( this.element.querySelector( '#app' ) );

            // logging of 'fullscreen' event
            this.logger && this.logger.log( 'fullscreen', { store: this.data.store.source(), key: dataset.key } );

          },

          /** when edit button is clicked (only visible for app creator) */
          edit: async () => {

            // remember main HTML structure
            const main = this.element.querySelector( '#main' );

            // render view for editing app matadata
            $.setContent( this.element, $.html( this.html.edit, {

              /** when cancel button is clicked */
              cancel: () => {

                // restore main HTML structure
                $.setContent( this.element, main );

                // logging of 'cancel' event
                this.logger && this.logger.log( 'cancel', { store: this.data.store.source(), key: dataset.key } );

              },

              /** when delete button is clicked */
              del: () => {

                // check if the user knows what he is doing
                if ( !confirm( 'Are you sure? Metadata and configuration of the app will be deleted. The app will no longer work anywhere on the web.' ) ) return;

                // delete app metadata
                this.data.store.del( dataset.key ).then( async () => {

                  // delete app configuration
                  dataset.source[ 0 ].parent = this;
                  await this.ccm.del.apply( null, dataset.source );

                  // logging of 'delete' event
                  this.logger && this.logger.log( 'delete', { store: this.data.store.source(), dataset: $.clone( dataset ) } );

                  // restart app
                  await this.start();

                  // perform 'onchange' callback
                  this.onchange && this.onchange( { event: 'delete', instance: this, dataset: $.clone( dataset ) } );

                } );

              }

            } ) );

            // render form for editing app metadata
            const form = await this.form.start( {
              root: this.element.querySelector( '#form' ),
              data: {
                store: [ 'ccm.store', this.data.store.source() ],
                key: dataset.key
              },
              onfinish: {
                store: true,
                callback: async results => {

                  // logging of 'update' event
                  this.logger && this.logger.log( 'update', { store: this.data.store.source(), dataset: results } );

                  // restart
                  await this.start();

                  // perform 'onchange' callback
                  this.onchange && this.onchange( { event: 'update', instance: this, dataset: results } );

                }
              }
            } );

            // translate content
            this.lang && this.lang.translate();

            // logging of 'edit' event
            this.logger && this.logger.log( 'edit', { store: this.data.store.source(), dataset: $.clone( dataset ) } );

            // perform 'onchange' callback
            this.onchange && this.onchange( { event: 'edit', instance: this, form: form, dataset: $.clone( dataset ) } );

          }

        } ) ) );

        // remove no needed areas
        if ( !dataset.icon        ) $.remove( this.element.querySelector( '#icon'        ) );
        if ( !dataset.abstract    ) $.remove( this.element.querySelector( '#abstract'    ) );
        if ( !dataset.description ) $.remove( this.element.querySelector( '#description' ) );
        if ( !this.user || !this.user.isLoggedIn() || this.user.data().user !== dataset._.creator || !this.form )
          $.remove( this.element.querySelector( '#edit_button' ) );

        // render language area
        if ( this.lang ) { $.append( this.element.querySelector( '#top' ), this.lang.root ); this.lang.start(); }

        // render login/logout area
        if ( this.user ) $.append( this.element.querySelector( '#top' ), this.user.root );

        // render app
        if ( await this.ccm.get.apply( null, dataset.source ) )
          this.ccm.start( dataset.path, {
            key: [ 'ccm.get', dataset.source[ 0 ], dataset.source[ 1 ] ],
            parent: this,
            root: this.element.querySelector( '#app .content' )
          } );
        else
          $.setContent( this.element.querySelector( '#app .content' ), $.html( this.html.empty, 'App Configuration' ) );

        // render app metadata
        if ( this.app_details )
          this.app_details.start( {
            root: this.element.querySelector( '#details .content' ),
            json2json: json => {
              json.category = json.category || '';
              if ( json.language ) json.language = json.language.filter( Boolean ).join( ', ' ).toUpperCase();
              json.tags = json.tags.join( ', ' );
              json.language = json.language || '';
              json.created_at = json.created_at ? new Date( json.created_at ).toLocaleString() : '';
              json.component = $.convertComponentURL( json.path ).index;
              return json;
            },
            placeholder: $.clone( dataset )
          } );
        else
          $.remove( this.element.querySelector( '#details' ) );

        // render handover of the app
        if ( this.handover_app )
          this.handover_app.start( {
            root: this.element.querySelector( '#handover .content' ),
            component_url: dataset.path,
            data: {
              store: [ "ccm.store", dataset.source[ 0 ] ],
              key: dataset.source[ 1 ]
            }
          } );
        else
          $.remove( this.element.querySelector( '#handover' ) );

        // perform 'onstart' callback
        this.onstart && await this.onstart( this );

        // translate content
        this.lang && this.lang.translate();

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
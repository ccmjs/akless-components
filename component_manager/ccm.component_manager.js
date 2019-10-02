/**
 * @overview ccm component for managing a component
 * @author André Kless <andre.kless@web.de> 2018-2019
 * @license MIT License
 * @version latest (3.2.4)
 * @changes
 * version 3.2.4 (02.10.2019):
 * - bug fix for create similar app
 * - uses ccm v22.7.1
 * version 3.2.3 (24.09.2019):
 * - bug fix for menu handling
 * - uses ccm.menu.js v2.8.2 as default
 * version 3.2.2 (24.09.2019):
 * - bug fix for demo section
 * version 3.2.1 (20.09.2019):
 * - bug fix for translation
 * - removed unneeded awaits
 * version 3.2.0 (16.09.2019):
 * - updated default HTML and CSS
 * - added back buttons in edit section
 * - component metadata is rendered via content component
 * - added login/logout area
 * - added multilingualism support
 * - optional default component icon
 * - added rating and rating results in reviews section
 * - bug fix for create similar app button
 * - uses ccm v22.6.1
 * version 3.1.0 (28.07.2019):
 * - uses ccm v22.3.1
 * - HTML template via HTML file
 * - uses ccm.menu.js v2.8.0
 * version 3.0.0 (08.07.2019):
 * - uses ccm v21.1.3
 * - editing of component metadata via setup button (only visible for creator)
 * - added routing support
 * - demos and builder could be added/changes/removed by creator via setup button
 * - current state of app configuration is taken over when changing app builder
 * - supports deletion of component metadata
 * - empty reviews section
 * - optional default builder
 * (for older version changes see ccm.component_manager-2.2.6.js)
 */

( () => {

  const component = {

    name: 'component_manager',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-22.7.1.js',

    config: {
//    "builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/app_builder/versions/ccm.app_builder-3.1.0.js" ],
//    "component_details": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.3.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/content/resources/configs.js", "component_meta" ] ],
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/component_manager/resources/css/styles.css" ],
      "data": {},
//    "default_icon": "https://ccmjs.github.io/akless-components/dms/resources/img/default.png",
//    "form": [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.2.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/submit/resources/configs.js", "component_meta_edit" ] ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/component_manager/resources/templates.html" ],
      "ignore": {
//      "builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.4.1.js", { "directly": true, "nosubmit": true } ],
        "configs": [ "ccm.store" ]
//      "create_similar_app": {}
      },
//    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "menu_app": [ "ccm.component", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.8.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/component_manager/resources/resources.js", "menu_app" ] ],
      "menu_top": [ "ccm.component", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.8.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/component_manager/resources/resources.js", "menu_top" ] ]
//    "rating": [ "ccm.component", "https://ccmjs.github.io/tkless-components/star_rating/versions/ccm.star_rating-4.0.0.js" ],
//    "rating_result": [ "ccm.component", "https://ccmjs.github.io/tkless-components/star_rating_result/versions/ccm.star_rating_result-4.0.0.js" ],
//    "routing": [ "ccm.instance", "https://ccmjs.github.io/akless-components/routing/versions/ccm.routing-2.0.3.js" ],
//    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]
    },

    Instance: function () {

      let $;

      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // listen to login/logout events => restart
        if ( this.user ) this.user.onchange = this.start;

      };

      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        /**
         * component metadata
         * @type {Object}
         */
        const dataset = await $.dataset( this.data );

        // metadata not exists? => abort
        if ( !dataset || Object.keys( dataset ).length <= 1 ) return $.setContent( this.element, $.html( this.html.empty, 'Component' ) );

        // no app icon? => use default
        if ( !dataset.icon ) dataset.icon = this.default_icon || '';

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, $.integrate( $.clone( dataset ), {

          /** when edit button is clicked (only visible for app creator) */
          edit: async () => {

            // remember main HTML structure
            const main = this.element.querySelector( '#main' );

            // render view for editing published component
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
                if ( !confirm( 'Are you sure? Metadata of the component will be deleted. Apps created from the component will still work.' ) ) return;

                // delete component metadata
                this.data.store.del( dataset.key ).then( async () => {

                  // logging of 'delete' event
                  this.logger && this.logger.log( 'delete', { store: this.data.store.source(), key: dataset.key } );

                  // restart app
                  this.start();

                } );

              }

            } ) );

            // render form for editing
            this.form.start( {
              root: this.element.querySelector( '#form' ),
              data: {
                store: [ 'ccm.store', this.data.store.source() ],
                key: dataset.key,
                convert: json => {

                  // adjust demos
                  json.demos = [];
                  json.ignore.demos.forEach( demo =>
                    json.demos.push( {
                      title: demo.title,
                      app: demo.app[ 2 ][ 2 ]
                    } )
                  );

                  // adjust builders
                  json.builders = [];
                  json.ignore.builders.forEach( builder =>
                    json.builders.push( {
                      title: builder.title,
                      component: $.getIndex( builder.app[ 1 ] ),
                      app: builder.app[ 2 ][ 2 ]
                    } )
                  );

                  // remove no needed properties
                  delete json.ignore;

                  return json;
                }
              },
              onfinish: {
                convert: async json => {

                  // adjust metadata
                  json.key = $.getIndex( json.path );
                  json.tags = json.tags.filter( tag => tag );
                  json.ignore = { demos: [], builders: [] };
                  if ( !json.icon ) delete json.icon;

                  // adjust demos
                  this.ignore.configs && json.demos.forEach( demo =>
                    demo.title && demo.app && json.ignore.demos.push( {
                      title: demo.title,
                      app: [ 'ccm.instance', json.path, [ 'ccm.get', this.ignore.configs[ 1 ], demo.app ] ]
                    } )
                  );
                  delete json.demos;

                  // adjust builders
                  this.ignore.configs && await $.asyncForEach( json.builders, async builder => {
                    const component = builder.component && await this.data.store.get( builder.component );
                    builder.title && component && builder.app && json.ignore.builders.push( {
                      title: builder.title,
                      app: [ 'ccm.component', component.path, [ 'ccm.get', this.ignore.configs[ 1 ], builder.app ] ]
                    } );
                  } );
                  delete json.builders;

                  // component name or version has changes? => abort
                  if ( json.key !== dataset.key ) return;

                  return json;
                },
                store: true,
                callback: this.start
              }
            } );

            // translate content
            this.lang && this.lang.translate();

            // logging of 'edit' event
            this.logger && this.logger.log( 'edit', { store: this.data.store.source(), key: dataset.key } );

          }

        } ) ) );

        // remove no needed areas
        if ( !dataset.icon ) $.removeElement( this.element.querySelector( '#icon' ) );
        if ( !this.user || !this.user.isLoggedIn() || this.user.data().user !== dataset._.creator || !this.form )
          $.removeElement( this.element.querySelector( '#edit_button' ) );

        // render language area
        if ( this.lang ) { $.append( this.element.querySelector( '#top' ), this.lang.root ); this.lang.start(); }

        // render login/logout area
        if ( this.user ) $.append( this.element.querySelector( '#top' ), this.user.root );

        /**
         * content area
         * @type {Element}
         */
        const content = this.element.querySelector( '#content' );

        /**
         * render functions for each frontend view
         * @type {Function[]}
         */
        const view = {

          // Overview
          overview: async () => {

            // update route
            this.routing && this.routing.set( 'overview' );

            // render HTML structure of overview section
            $.setContent( content, $.html( this.html.overview, $.clone( dataset ) ) );

            // remove no needed areas
            if ( !dataset.subject     ) $.removeElement( this.element.querySelector( '#abstract'    ) );
            if ( !dataset.description ) $.removeElement( this.element.querySelector( '#description' ) );

            // render component metadata
            if ( this.component_details )
              this.component_details.start( {
                root: this.element.querySelector( '#details .content' ),
                json2json: json => {
                  if ( !json.category ) json.category = '';
                  json.tags = json.tags.join( ', ' );
                  json.created_at = json.created_at ? new Date( json.created_at ).toLocaleString() : '';
                  return json;
                },
                placeholder: $.clone( dataset )
              } );
            else
              $.removeElement( this.element.querySelector( '#details' ) );

            // render demo section
            if ( dataset.ignore.demos && dataset.ignore.demos.length && this.ignore.configs ) {

              /**
               * app configuration of selected demo
               * @type {Object}
               */
              let config;

              // render demo section
              $.setContent( content.querySelector( '#demo .content' ), $.html( this.html.collection ) );

              // append 'Create Similar App' button
              $.append( content.querySelector( '#aside' ), $.html( this.html.create_similar_app, async () => {
                this.ignore.create_similar_app = config;
                menu.select( 'creation' );
              } ) );

              // render demo menu
              this.menu_app.start( {
                root: content.querySelector( '#menu-app' ),
                data: { entries: dataset.ignore.demos.map( demo => demo.title ) },
                'routing.2': this.routing && this.routing.app && { app: this.routing.app + '_demo' },
                onclick: async event => {
                  const app_dependency = $.clone( dataset.ignore.demos[ event.nr - 1 ].app );
                  app_dependency[ 2 ] = await $.solveDependency( app_dependency[ 2 ] );
                  app_dependency[ 2 ].parent = this;
                  const app = await $.solveDependency( app_dependency );
                  $.setContent( content.querySelector( '#app' ), app.root );
                  app.start();
                }
              } );

            }
            else
              return $.removeElement( content.querySelector( '#demo' ) );

            // translate content
            this.lang && this.lang.translate();

          },

          // Reviews
          reviews: async () => {

            // update route
            this.routing && this.routing.set( 'reviews' );

            // render HTML structure of reviews section
            $.setContent( content, $.html( this.html.reviews ) );

            // render rating results
            let results;
            if ( this.rating_result )
              results = await this.rating_result.start( {
                root: content.querySelector( '#results .content' ),
                'data.key': dataset.key
              } );
            else
              $.removeElement( content.querySelector( '#results' ) );

            // render rating
            if ( this.rating )
              this.rating.start( {
                root: content.querySelector( '#rating .content' ),
                'data.key': dataset.key,
                onchange: results.start
              } );
            else
              $.removeElement( content.querySelector( '#rating' ) );

            // translate content
            this.lang && this.lang.translate();

          },

          // App Creation
          creation: async () => {

            // update route
            this.routing && this.routing.set( 'creation' );

            // no builders? => clear content and abort
            if ( ( !dataset.ignore.builders || !dataset.ignore.builders.length ) && !this.ignore.builder ) return $.setContent( content, '' );

            /**
             * current state of app configuration
             * @type {Object}
             */
            let config = this.ignore.create_similar_app; delete this.ignore.create_similar_app;

            // render app creation section
            $.setContent( content, $.html( this.html.collection, { caption: 'Choose Builder' } ) );

            // render builder menu
            const entries = dataset.ignore.builders.map( builder => builder.title );
            this.ignore.builder && entries.push( 'Default Builder' );
            this.menu_app.start( {
              root: content.querySelector( '#menu-app' ),
              data: { entries: entries },
              'routing.2': this.routing && this.menu_app.config.routing && this.routing.app && { app: this.routing.app + '_builder' },
              onclick: event => {
                const builder = dataset.ignore.builders[ event.nr - 1 ];
                renderBuilder.call( this, builder ? builder.app : this.ignore.builder );
              }
            } );

            // remove area under menu
            $.removeElement( content.querySelector( '#menu-below' ) );

            /** renders app builder */
            function renderBuilder( builder ) {

              this.builder.start( {
                root: content.querySelector( '#app' ),
                data: { store: this.ignore.configs, key: [ 'ccm.get', { local: { app: config } }, 'app' ] },
                app: [ 'ccm.component', dataset.path, config ],
                builder: builder,
                onchange: ( instance, event ) => {
                  if ( event !== 'change' ) return;
                  const value = instance.getValue();
                  if ( config ) value.key = config.key;
                  config = value;
                }
              } );

            }

          }

        };

        // render header menu
        const menu = await this.menu_top.start( {
          root: this.element.querySelector( '#menu-top' ),
          onclick: event => view[ event.id ](),
          selected: this.ignore && this.ignore.create_similar_app ? 'creation' : ( this.routing && this.routing.get() ? null : undefined )
        } );

        // translate content
        this.lang && this.lang.translate();

        // define and check routes
        this.routing && this.routing.define( {
          overview: () => menu.select( 'overview' ),
          reviews:  () => menu.select( 'reviews'  ),
          creation: () => menu.select( 'creation' )
        } );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
/**
 * @overview ccm component for managing a component
 * @author André Kless <andre.kless@web.de> 2018-2019
 * @license MIT License
 * @version latest (3.0.0)
 * @changes
 * version 3.0.0 (06.07.2019):
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

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-21.1.3.js',

    config: {
//    "builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/app_builder/versions/ccm.app_builder-3.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/app_builder/resources/resources.js", "demo" ] ],
      "css": [ "ccm.load",
        "https://ccmjs.github.io/akless-components/component_manager/resources/default-v2.css",
        "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
        { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css" }
      ],
//    "create_similar_app": { "key": "app" },
      "data": {},
//    "form": [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.3.js" ],
      "html": [ "ccm.get", "https://ccmjs.github.io/akless-components/component_manager/resources/resources.js", "html" ],
      "ignore": {
        "apps": [ "ccm.store" ],
        "configs": [ "ccm.store" ]
//      "builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.4.1.js", { "directly": true, "nosubmit": true } ]
      },
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "menu_app": [ "ccm.component", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.7.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/component_manager/resources/resources.js", "menu_app" ] ],
      "menu_top": [ "ccm.component", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.7.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/component_manager/resources/resources.js", "menu_top" ] ]
//    "routing": [ "ccm.instance", "https://ccmjs.github.io/akless-components/routing/versions/ccm.routing-2.0.3.js" ],
//    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]
    },

    Instance: function () {

      let $, dataset;

      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // has user instance? => show/hide setup button on login/logout event
        if ( this.user )
          this.user.onchange = login =>
            this.element.querySelector( '#setup' ).style.visibility = login && this.user.data().key === dataset._.creator ? 'visible' : 'hidden';

      };

      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // get component dataset
        dataset = await $.dataset( this.data );

        // dataset not exists? => abort
        if ( !dataset || Object.keys( dataset ).length <= 1 ) return $.setContent( this.element, '' );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // convert timestamps
        dataset.created_at = dataset.created_at ? new Date( dataset.created_at ).toLocaleString() : '';
        dataset.updated_at = dataset.updated_at ? new Date( dataset.updated_at ).toLocaleString() : '';

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, $.integrate( { setup: () => setupComponent.call( this ) }, dataset ) ) );

        /**
         * content area
         * @type {Element}
         */
        const content = this.element.querySelector( '#content' );

        /**
         * render functions for each frontend view
         * @type {Function[]}
         */
        const view = [

          // Overview
          async () => {

            // update route
            this.routing && this.routing.set( 'overview' );

            // render info and demo section
            $.setContent( content, $.html( this.html.overview, $.integrate( dataset, {
              index: dataset.key,
              subject: '',
              description: '',
              category: '-',
              tags: '-',
              license: 'MIT'
            } ) ) );
            $.setContent( content.querySelector( '#tags' ), dataset.tags.join( ', ' ) || '-' );

            // no demos? => remove demo section and abort
            if ( !dataset.ignore.demos || !dataset.ignore.demos.length || !this.ignore.configs ) return $.removeElement( content.querySelector( '#demo' ) );

            /**
             * app configuration of selected demo
             * @type {Object}
             */
            let config;

            // render app creation section
            $.setContent( content.querySelector( '#demo-main' ), $.html( this.html.collection, {
              caption: 'Choose Demo',
              button: '♺ Create Similar App',
              onclick: async () => {
                this.create_similar_app = config;
                await menu.select( 3 );
              }
            } ) );

            // render demo menu
            await this.menu_app.start( {
              root: content.querySelector( '#menu-app' ),
              data: { entries: dataset.ignore.demos.map( demo => demo.title ) },
              'routing.2': this.routing && this.routing.app && { app: this.routing.app + '_demo' },
              onclick: async event => {
                config = await $.solveDependency( await dataset.ignore.demos[ event.nr - 1 ].app[ 2 ] );
                $.setContent( content.querySelector( '#app' ), ( await $.solveDependency( dataset.ignore.demos[ event.nr - 1 ].app ) ).root );
              }
            } );

          },

          // Reviews
          () => {

            // update route
            this.routing && this.routing.set( 'reviews' );

            // clear content area
            $.setContent( content, '' );

          },

          // App Creation
          async () => {

            // update route
            this.routing && this.routing.set( 'creation' );

            // no builders? => clear content and abort
            if ( ( !dataset.ignore.builders || !dataset.ignore.builders.length ) && !this.ignore.builder ) return $.setContent( content, '' );

            /**
             * current state of app configuration
             * @type {Object}
             */
            let config = this.create_similar_app; delete this.create_similar_app;

            // render app creation section
            $.setContent( content, $.html( this.html.collection, { caption: 'Choose Builder' } ) );

            // render builder menu
            const entries = dataset.ignore.builders.map( builder => builder.title );
            this.ignore.builder && entries.push( 'Default Builder' );
            await this.menu_app.start( {
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
            async function renderBuilder( builder ) {

              this.builder.start( {
                root: content.querySelector( '#app' ),
                data: { store: this.ignore.configs, key: [ 'ccm.get', { local: { app: config } }, 'app' ] },
                meta_store: this.ignore.apps,
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

        ];

        // render header menu
        const menu = await this.menu_top.start( {
          root: this.element.querySelector( '#menu-top' ),
          onclick: event => view[ event.nr - 1 ](),
          selected: this.routing && this.routing.get() ? null : undefined
        } );

        // render login/logout area
        this.user && $.setContent( this.element.querySelector( '#user' ), this.user.root );

        // no logged in user? => remove setup button
        if ( !this.user || !this.user.isLoggedIn() || this.user.data().key !== dataset._.creator )
          this.element.querySelector( '#setup' ).style.visibility = 'hidden';

        // define and check routes
        this.routing && this.routing.define( {
          overview: () => menu.select( 1 ),
          reviews:  () => menu.select( 2 ),
          creation: () => menu.select( 3 )
        } );

        /** renders setup component view */
        async function setupComponent() {

          // no user or no data store or no form? => abort
          if ( !this.user || !this.data.store || !this.form ) return $.setContent( content, '' );

          // hide menu and setup button
          this.element.querySelector( '#menu-top' ).style.display = 'none';
          this.element.querySelector( '#setup' ).style.display = 'none';

          // render publish component form in content area
          await this.form.start( {
            root: content,
            'data.key': dataset.key,
            'data.convert': dataset => {
              dataset.demos = [];
              dataset.ignore.demos.forEach( demo => {
                dataset.demos.push( {
                  title: demo.title,
                  app: demo.app[ 2 ][ 2 ]
                } );
              } );
              dataset.builders = [];
              dataset.ignore.builders.forEach( builder => {
                dataset.builders.push( {
                  title: builder.title,
                  component: $.getIndex( builder.app[ 1 ] ).replace( /\./g, '-' ),
                  app: builder.app[ 2 ][ 2 ]
                } );
              } );
              delete dataset.ignore;
              return dataset;
            },
            onfinish: async form => {

              // log in user, if not already logged in
              await this.user.login();

              /**
               * component metadata
               * @type {Object}
               */
              const meta = form.getValue();

              // prepare metadata
              let version = $.getIndex( meta.path ).split( '-' );
              const identifier = version.shift();
              version = version.join( '.' );
              meta.key = identifier + '-' + version.split( '.' ).join( '-' );
              meta.tags = meta.tags.filter( tag => tag );
              meta.ignore = { demos: [], builders: [] };

              // prepare demos
              this.ignore.configs && await $.asyncForEach( meta.demos, async demo => {
                demo.title && demo.app && meta.ignore.demos.push( {
                  title: demo.title,
                  app: [ 'ccm.start', meta.path, [ 'ccm.get', this.ignore.configs[ 1 ], demo.app ] ]
                } );
              } );
              delete meta.demos;

              // prepare builders
              await $.asyncForEach( meta.builders, async builder => {
                if ( !builder.title || !builder.component || !builder.app ) return;
                meta.ignore.builders.push( {
                  title: builder.title,
                  app: [ 'ccm.component', ( await this.data.store.get( builder.component ) ).path, [ 'ccm.get', this.ignore.configs[ 1 ], builder.app ] ]
                } );
              } );
              delete meta.builders;

              // component name or version has changes? => abort
              if ( meta.key !== dataset.key ) return;

              // update component metadata
              await this.data.store.set( meta );
              dataset = await $.dataset( this.data );

              // restart
              await this.start();

            }
          } );

          // support deletion of component metadata
          $.append( content, $.html( { tag: 'button', inner: 'DELETE Component', onclick: async () => {
            if ( !confirm( 'Are you sure?' ) ) return;
            await this.data.store.del( dataset.key );
            await this.start();
          } } ) );

        }

      };

      /** @returns {Object} instance configuration currently being worked on */
      this.getValue = () => this.builder && this.builder.getValue && $.clone( this.builder.getValue() ) || null;

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
/**
 * @overview ccm component for digital makerspace
 * @author André Kless <andre.kless@web.de> 2018-2019
 * @license MIT License
 * @version 4.0.2
 * @changes
 * version 4.0.2 (16.10.2019):
 * - added analytics in home section
 * - uses ccm v24.0.4
 * version 4.0.1 (09.10.2019):
 * - changed handle of loading components, apps and ratings
 * - added app route
 * - uses ccm v24.0.1
 * version 4.0.0 (04.10.2019):
 * - changed config property for components datastore
 * - load all components only where necessary
 * - load all component ratings once when enter component sections
 * - changed routes for component manager
 * (for older version changes see ccm.dms-3.0.3.js)
 */

( () => {

  const component = {

    name: 'dms', version: [ 4, 0, 2 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-24.0.4.js',

    config: {
//    "analytics": [ "ccm.component", "https://ccmjs.github.io/akless-components/dms_analytics/versions/ccm.dms_analytics-1.0.0.js" ],
//    "app_manager": [ "ccm.component", "https://ccmjs.github.io/akless-components/app_manager/versions/ccm.app_manager-1.4.0.js" ],
//    "apps": [ "ccm.store" ],
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/dms/resources/css/dms.css" ],
//    "component_manager": [ "ccm.component", "https://ccmjs.github.io/akless-components/component_manager/versions/ccm.component_manager-3.2.4.js" ],
//    "components": [ "ccm.store" ],
//    "default_icon": "https://ccmjs.github.io/akless-components/dms/resources/img/default.png",
//    "form": [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.2.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/submit/resources/configs.js", "component_meta" ] ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/dms/resources/html/dms.html" ],
//    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js" ],
//    "listing": { "apps": [ "ccm.component", ... ], "components": [ "ccm.component", ... ] },
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
//    "logo": "https://ccmjs.github.io/akless-components/dms/resources/img/component.png",
      "menu": [ "ccm.component", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.8.3.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/dms/resources/resources.js", "menu" ] ],
//    "rating": { "apps": { "component": [ "ccm.component", ... ], "store": [ "ccm.store", ... ] }, { "components": { "component": [ "ccm.component", ... ], "store": [ "ccm.store", ... ] } },
//    "routing": [ "ccm.instance", "https://ccmjs.github.io/akless-components/routing/versions/ccm.routing-2.0.4.js" ],
      "title": "Digital Makerspace"
//    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/dms/resources/resources.js", "user" ] ]
    },

    Instance: function () {

      let $;

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        // load all published apps and components
        const apps       = await this.ccm.store( await this.apps      .get() );
        const components = await this.ccm.store( await this.components.get() );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, { logo: this.logo, title: this.title } ) );

        // select content area
        const content = this.element.querySelector( '#content' );

        /**
         * render functions for each frontend view
         * @type {Function[]}
         */
        const view = [

          // Home
          async () => {

            // update route
            this.routing && this.routing.set( 'home' );

            // clear content area
            $.setContent( content, $.html( this.html.home ) );

            // render Digital Makerspace analytics
            await this.analytics.start( { root: content.querySelector( '#analytics' ) } );

          },

          // Apps
          async () => {

            // update route
            this.routing && this.routing.set( 'apps' );

            // no listing component and no app datastore? => abort
            if ( !this.listing || !this.listing.apps || !this.apps ) return $.setContent( content, '' );

            /**
             * local datastore with all app ratings
             * @type {Object}
             */
            const ratings = await this.ccm.store( await this.rating.apps.store.get() );

            // render listing with all apps
            this.listing.apps.start( {
              root: content,
              convert: async json => {
                const meta = await components.get( $.getIndex( json.path ) );
                if ( !meta ) return json;
                json.component = meta.title;
                json.version = meta.key.split( '-' );
                json.version.shift();
                json.version = json.version.join( '.' );
                return json;
              },
              data: await apps.get(),
              defaults: { icon: '' },
              sort: ( a, b ) => {
                const title_x = a.title.toLowerCase();
                const title_y = b.title.toLowerCase();
                const creator_x = ( a.creator || '' ).toLowerCase();
                const creator_y = ( b.creator || '' ).toLowerCase();
                if ( title_x < title_y ) return -1;
                if ( title_x > title_y ) return 1;
                if ( creator_x < creator_y ) return -1;
                if ( creator_x > creator_y ) return 1;
                return 0;
              },
              onrender: async event => {

                // app has no own icon => use component icon or default icon
                const icon = event.entry.querySelector( '.icon' );
                if ( !icon.getAttribute( 'src' ) ) {
                  const component = await components.get( $.getIndex( event.data.path ) );
                  icon.setAttribute( 'src', component && component.icon || this.default_icon );
                }
                if ( !icon.getAttribute( 'src' ) ) $.removeElement( event.entry.querySelector( '.icon-area' ) );

                // no component information? => remove element for component information
                if ( !event.data.component || !event.data.version ) $.removeElement( event.entry.querySelector( '.component' ) );

                // render rating
                this.rating && this.rating.apps && this.rating.apps.component.start( {
                  root: event.entry.querySelector( '.rating' ),
                  'data.store': ratings,
                  'data.key': event.data.key
                } );

              },
              onclick: async event => showApp( event.data.key )
            } );

          },

          // Components
          async () =>  {

            // update route
            this.routing && this.routing.set( 'components' );

            // no listing component? => abort
            if ( !this.listing || !this.listing.components ) return $.setContent( content, '' );

            // filter highest version of each component
            const store = await this.ccm.store( await components.get() );
            await $.asyncForEach( await store.get(), async component => {
              let highest = component;
              const results = await store.get( { identifier: component.identifier } );
              results.forEach( result => {
                const compare = $.compareVersions( result.version, highest.version );
                compare > 0 && store.del( highest.key );
                compare < 0 && store.del( result.key );
              } );
            } );

            /**
             * local datastore with all component ratings
             * @type {Object}
             */
            const ratings = await this.ccm.store( await this.rating.components.store.get() );

            // render listing with all components
            await this.listing.components.start( {
              root: content,
              data: await store.get(),
              defaults: {
                icon: this.default_icon,
                subject: ''
              },
              sort: ( a, b ) => {
                const title_x = a.title.toLowerCase();
                const title_y = b.title.toLowerCase();
                const creator_x = ( a.creator || '' ).toLowerCase();
                const creator_y = ( b.creator || '' ).toLowerCase();
                if ( title_x < title_y ) return -1;
                if ( title_x > title_y ) return 1;
                if ( creator_x < creator_y ) return -1;
                if ( creator_x > creator_y ) return 1;
                return 0;
              },
              onrender: event => {

                // no component icon? => remove header
                if ( !event.data.icon && !this.default_icon ) $.removeElement( event.entry.querySelector( '.header' ) );

                // render rating
                this.rating && this.rating.components && this.rating.components.component.start( {
                  root: event.entry.querySelector( '.rating' ),
                  'data.store': ratings,
                  'data.key': event.data.key
                } );

              },
              onclick: event => this.component_manager && showComponent( event.data.key )
            } );

          },

          // Publish
          () => {

            // update route
            this.routing && this.routing.set( 'publish' );

            // no user or no data store or no form? => abort
            if ( !this.user || !this.components || !this.form ) return $.setContent( content, '' );

            // render publish component form
            this.form.start( {
              root: content,
              data: { store: [ 'ccm.store', this.components.source() ] },
              onfinish: {
                convert: async json => {

                  /**
                   * user data
                   * @type {Object}
                   */
                  const user = this.user.data();

                  // expand metadata
                  Object.assign( json, {
                    key: $.getIndex( json.path ),
                    metaFormat: 'ccm-meta',
                    metaVersion: '2.0.0',
                    format: 'application/js',
                    license: 'MIT Licence',
                    creator: user.name || user.user || user.key || '',
                    tags: [],
                    ignore: { demos: [], builders: [] },
                    _: { access: { get: 'all', set: 'creator', del: 'creator' } }
                  } );

                  // set identifier and version
                  json.version = json.key.split( '-' );
                  json.identifier = json.version.shift();
                  json.version = json.version.join( '.' );

                  return json;
                },
                login: true,
                store: true,
                alert: 'Congratulations! You have successfully published a component.',
                callback: async ( instance, result ) => {
                  this.routing && this.routing.set( 'component-' + result.key );
                  await this.start();
                }
              }
            } );

          }

        ];

        /**
         * shows a component
         * @param {string} id - app ID
         * @returns {Promise<void>}
         */
        const showApp = async id => {

          // update route
          this.routing && this.routing.set( `app-${id}` );

          // no app manager? => abort
          if ( !this.app_manager ) return $.setContent( content, '' );

          // render app manager
          await this.app_manager.start( {
            root: content,
            data: {
              store: [ 'ccm.store', this.apps.source() ],
              key: id
            },
            default_icon: this.default_icon,
            onchange: async event => {

              // restart if an app was deleted
              if ( event.event !== 'delete' ) return;
              this.start();

            }
          } );

          /**
           * app metadata
           * @type {Object}
           */
          const meta = await apps.get( id );

          // render 'Create Similar App' button
          $.append( content, $.html( {
            "tag": "button",
            "style": "font-size: large; padding: 0.5em; margin: 0.5em;",
            "inner": "Create Similar App",
            "onclick": async () => await showComponent( $.getIndex( meta.path ), await $.solveDependency( [ 'ccm.get', meta.source[ 0 ], meta.source[ 1 ] ] ) )
          } ) );

        };

        /**
         * shows a component
         * @param {string} index - component index
         * @param {Object} [config] - initial app configuration for app creation
         * @returns {Promise<void>}
         */
        const showComponent = async ( index, config ) => {

          // update route
          this.routing && this.routing.set( `component-${index}` );

          // no component manager? => abort
          if ( !this.component_manager ) return $.setContent( content, '' );

          // render component manager
          const component_manager = await this.component_manager.start( {
            root: content,
            data: {
              store: this.components,
              key: index
            },
            'ignore.create_similar_app': $.clone( config ),
            'routing.2.app': this.routing.app + '_' + index.replace( /-/g, '_' )
          } );

          // replace version number with selector box
          const version_number = component_manager.element.querySelector( '#version_number' );
          if ( !version_number ) return;
          const options = [];
          let version = index.split( '-' );
          const identifier = version.shift();
          version = version.join( '.' );
          ( await this.ccm.get( this.components, { identifier: identifier } ) ).map( component => component.version ).sort( $.compareVersions ).reverse().forEach( value => options.push( { tag: 'option', inner: value, selected: value === version } ) );
          options.length > 1 && $.replace( version_number, $.html( { tag: 'select', id: 'version_number', class: 'text-muted', inner: options, onchange: event => showComponent( `${identifier}-${event.target.value.split('.').join('-')}` ) } ) );

        };

        // render header menu
        const menu = await this.menu.start( {
          root: this.element.querySelector( '#menu' ),
          onclick: event => view[ event.nr - 1 ](),
          selected: this.routing && this.routing.get() ? null : undefined
        } );

        // render language area
        if ( this.lang ) { $.append( this.element.querySelector( '#top' ), this.lang.root ); this.lang.start(); }

        // render login/logout area
        if ( this.user ) $.append( this.element.querySelector( '#top' ), this.user.root );

        // translate content
        this.lang && this.lang.translate();

        // define and check routes
        this.routing && await this.routing.define( {
          home:       () => menu.select( 'home' ),
          apps:       () => menu.select( 'apps' ),
          components: () => menu.select( 'components' ),
          publish:    () => menu.select( 'publish' ),
          app:        showApp,
          component:  ( name, major, minor, patch ) => showComponent( `${name}-${major}-${minor}-${patch}` )
        } );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
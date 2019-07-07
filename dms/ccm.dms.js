/**
 * @overview ccm component for digital makerspace
 * @author André Kless <andre.kless@web.de> 2018-2019
 * @license MIT License
 * @version latest (2.0.0)
 * @changes
 * version 2.0.0 (06.07.2019):
 * - uses ccm v21.1.2
 * - improved routing support
 * - handling multiple versions of a published component
 * - changed header menu
 * - changed listing of components
 * - changed publish component section
 * - empty home and apps section
 * - uses ccm.component_manager.js v3.0.0
 * - passes default app builder to component manager
 * (for older version changes see ccm.dms-1.0.7.js)
 */

( () => {

  const component = {

    name: 'dms',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-21.1.2.js',

    config: {
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/dms/resources/default-v2.css" ],
//    "component_manager": [ "ccm.component", "https://ccmjs.github.io/akless-components/component_manager/ccm.component_manager-3.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/component_manager/resources/resources.js", "demo" ] ],
      "data": {
        "store": [ "ccm.store" ],
        "key": {}
      },
      "default_icon": "https://ccmjs.github.io/akless-components/dms/resources/default.png",
//    "form": [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.3.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/dms/resources/resources.js", "form" ] ],
      "html": [ "ccm.get", "https://ccmjs.github.io/akless-components/dms/resources/resources.js", "html" ],
      "ignore": {
        "apps": [ 'ccm.store' ],
        "configs": [ 'ccm.store' ],
        "builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.4.1.js", { "directly": true, "nosubmit": true } ]
      },
//    "listing": [ "ccm.component", "https://ccmjs.github.io/akless-components/listing/versions/ccm.listing-3.1.3.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/dms/resources/resources.js", "listing" ] ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
//    "logo": "https://ccmjs.github.io/akless-components/dms/resources/component.png",
      "menu": [ "ccm.component", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.7.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/dms/resources/resources.js", "menu" ] ],
//    "rating": [ "ccm.component", "https://ccmjs.github.io/tkless-components/star_rating_result/versions/ccm.star_rating_result-4.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/dms/resources/resources.js", "rating" ] ],
//    "routing": [ "ccm.instance", "https://ccmjs.github.io/akless-components/routing/versions/ccm.routing-2.0.3.js" ],
      "title": "Digital Makerspace"
//    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]
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

        /**
         * component datasets
         * @type {Object[]}
         */
        let components = await $.dataset( this.data );

        // filter highest version of each component
        const store = await this.ccm.store( components );
        await $.asyncForEach( components, async component => {
          let highest = component;
          const results = await store.get( { identifier: component.identifier } );
          results.forEach( result => {
            const compare = $.compareVersions( result.version, highest.version );
            compare > 0 && store.del( highest.key );
            compare < 0 && store.del( result.key );
          } );
        } );
        const filtered_components = await store.get( {} );

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
          () => {

            // update route
            this.routing && this.routing.set( 'home' );

            // clear content area
            $.setContent( content, '' );

          },

          // Apps
          () => {

            // update route
            this.routing && this.routing.set( 'apps' );

            // clear content area
            $.setContent( content, '' );

          },

          // Components
          async () =>  {

            // update route
            this.routing && this.routing.set( 'components' );

            // no listing? => abort
            if ( !this.listing ) return $.setContent( content, '' );

            // render listing with all components
            await this.listing.start( {
              root: content,
              data: filtered_components,
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
              onrender: event => this.rating && this.rating.start( {
                root: event.entry.querySelector( '.rating' ),
                'data.key': event.data.key
              } ),
              onclick: event => showComponent( event.data.key )
            } );

          },

          // Publish
          () => {

            // update route
            this.routing && this.routing.set( 'publish' );

            // no user or no data store or no form? => abort
            if ( !this.user || !this.data.store || !this.form ) return $.setContent( content, '' );

            // render publish component form
            this.form.start( {
              root: content,
              onfinish: async form => {

                // log in user, if not already logged in
                const user = await this.user.login();

                /**
                 * component metadata
                 * @type {Object}
                 */
                const meta = form.getValue();

                // prepare metadata
                meta.metaFormat = 'ccm-meta';
                meta.metaVersion = '2.0.0';
                meta.icon = meta.icon || this.default_icon;
                meta.version = $.getIndex( meta.path ).split( '-' );
                meta.identifier = meta.version.shift();
                meta.version = meta.version.join( '.' );
                meta.creator = user.name || user.user;
                meta.date = new Date().toISOString().split( 'T' )[ 0 ];
                meta.format = 'application/javascript';
                meta.license = 'MIT';
                meta.tags = meta.tags.filter( tag => tag );
                meta.ignore = { demos: [], builders: [] };

                // set data set key and permission settings
                meta.key = meta.identifier + '-' + meta.version.split( '.' ).join( '-' );
                meta._ = { access: { get: 'all', set: 'creator', del: 'creator' } };

                // save meta data (component is published)
                await this.data.store.set( meta );

                // show published component
                this.routing && this.routing.set( 'component-' + meta.key );
                await this.start();

              }
            } );

          }

        ];

        /**
         * shows a component
         * @param {string} index - component index
         * @returns {Promise<void>}
         */
        const showComponent = async index => {

          // update route
          this.routing && this.routing.set( `component-${index}` );

          // no component manager? => abort
          if ( !this.component_manager ) return $.setContent( content, '' );

          // render component manager
          const component_manager = await this.component_manager.start( {
            root: content,
            data: {
              store: this.data.store,
              key: index
            },
            'ignore.apps': this.ignore.apps,
            'ignore.configs': this.ignore.configs,
            'ignore.builder': this.ignore.builder
          } );

          // replace version number with selector box
          const version_number = component_manager.element.querySelector( '#version_number' );
          if ( !version_number ) return;
          const options = [];
          let version = index.split( '-' );
          const identifier = version.shift();
          version = version.join( '.' );
          ( await this.ccm.get( components, { identifier: identifier } ) ).map( component => component.version ).sort( $.compareVersions ).reverse().forEach( value => options.push( { tag: 'option', inner: value, selected: value === version } ) );
          options.length > 1 && $.replace( version_number, $.html( { tag: 'select', class: 'text-muted', inner: options, onchange: event => showComponent( `${identifier}-${event.target.value.split('.').join('-')}` ) } ) );

        };

        // render header menu
        const menu = await this.menu.start( {
          root: this.element.querySelector( '#menu' ),
          onclick: event => view[ event.nr - 1 ](),
          selected: this.routing && this.routing.get() ? null : undefined
        } );

        // render login/logout area
        this.user && $.setContent( this.element.querySelector( '#user' ), this.user.root );

        // define and check routes
        this.routing && await this.routing.define( {
          home:       () => menu.select( 1 ),
          apps:       () => menu.select( 2 ),
          components: () => menu.select( 3 ),
          publish:    () => menu.select( 4 ),
          component:  ( name, major, minor, patch ) => showComponent( `${name}-${major}-${minor}-${patch}` )
        } );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
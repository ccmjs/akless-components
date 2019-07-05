/**
 * @overview ccm component for digital maker space
 * @author André Kless <andre.kless@web.de> 2018-2019
 * @license MIT License
 * @version latest (2.0.0)
 * @changes
 * version 2.0.0 (02.07.2019):
 * - ...
 * version 1.0.7 (27.04.2019):
 * - uses ccm.star_rating_result.js v4.0.0
 * - uses ccm.component_manager.js v2.2.6
 * version 1.0.6 (06.02.2019):
 * - navigation bug fix
 * - uses ccm v20.0.0
 * - uses ccm.listing.js v2.0.3
 * - uses ccm.submit.js v7.0.0
 * - uses ccm.component_manager.js v2.2.5
 * version 1.0.5 (13.01.2019):
 * - uses ccm v19.0.0
 * - uses ccm.star_rating_result.js v3.0.1
 * version 1.0.4 (09.01.2019):
 * - uses ccm v18.6.8
 * - uses ccm.component_manager.js v2.2.4
 * - uses ccm.submit.js v6.7.0
 * version 1.0.3 (07.11.2018): removed footer
 * version 1.0.2 (02.11.2018):
 * - uses ccm.component_manager.js v2.2.2
 * - uses ccm.listing.js v2.0.2
 * - uses ccm v18.2.0
 * version 1.0.1 (25.10.2018): update to versions 1.0.0 of resource finder and publish
 * version 1.0.0 (13.09.2018)
 */

( () => {

  const component = {

    name: 'dms',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {
      "css": [ "ccm.load", "../dms/resources/default.css" ],
//    "component_manager": [ "ccm.component", "../component_manager/ccm.component_manager.js" ],
      "data": {
        "store": [ "ccm.store" ],
        "key": {}
      },
      "default_icon": "https://ccmjs.github.io/akless-components/dms/resources/default.png",
//    "form": [ "ccm.component", "../submit/ccm.submit.js" ],
      "html": [ "ccm.get", "../dms/resources/resources.js", "html" ],
      "ignore": {
        "apps": [ 'ccm.store' ],
        "configs": [ 'ccm.store' ],
        "builder": {
          "title": "JSON Builder",
          "app": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.4.1.js", { "directly": true, "nosubmit": true } ]
        }
      },
//    "listing": [ "ccm.component", "../listing/ccm.listing.js" ],
//    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
//    "logo": "../dms/resources/component.png",
      "menu": [ "ccm.component", "../menu/ccm.menu.js", [ "ccm.get", "../dms/resources/resources.js", "menu" ] ],
//    "rating": [ "ccm.component", "https://ccmjs.github.io/tkless-components/star_rating_result/versions/ccm.star_rating_result-4.0.0.js" ],
//    "routing": [ "ccm.instance", "../routing/ccm.routing.js" ],
      "title": "Digital Maker Space"
//    "user": [ "ccm.start", "../user/ccm.user.js", [ "ccm.get", "../user/resources/configs.js", "guest" ] ]
    },

    Instance: function () {

      let $, user, content;

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
        content = this.element.querySelector( '#content' );

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
                user = await this.user.login();

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
                meta.ignore = { demos: [], builders: [ this.ignore.builder ] };

                // set data set key and permission settings
                meta.key = meta.identifier + '-' + meta.version.split( '.' ).join( '-' );
                meta._ = { access: { get: 'all', set: 'creator', del: 'creator' } };

                // save meta data (component is published)
                await this.data.store.set( meta );

                // show published component
                await this.start();
                await showComponent( meta.key );

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
            'ignore.configs': this.ignore.configs
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
/**
 * @overview ccm component for digital maker space
 * @author André Kless <andre.kless@web.de> 2018-2019
 * @license MIT License
 * @version latest (2.0.0)
 * @changes
 * version 2.0.0 (20.05.2019):
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
      "title": "Digital Maker Space",
//    "logo": "https://ccmjs.github.io/akless-components/dms/resources/component.png",
      "html": [ "ccm.get", "https://ccmjs.github.io/akless-components/dms/resources/resources.js", "html" ],
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/dms/resources/default.css" ],
      "data": {
        "store": [ "ccm.store" ],
        "key": {}
      },
      "menu": [ "ccm.component", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.6.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/dms/resources/resources.js", "menu" ] ]
//    "form": [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.0.js" ],
//    "listing": [ "ccm.component", "https://ccmjs.github.io/akless-components/listing/versions/ccm.listing-2.0.3.js" ],
//    "rating": [ "ccm.component", "https://ccmjs.github.io/tkless-components/star_rating_result/versions/ccm.star_rating_result-4.0.0.js" ],
//    "component_manager": [ "ccm.component", "https://ccmjs.github.io/akless-components/component_manager/versions/ccm.component_manager-2.2.6.js" ],
//    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.1.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
//    "routing": [ "ccm.instance", "https://ccmjs.github.io/akless-components/routing/versions/ccm.routing-1.2.2.js" ]
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
        const components = await $.dataset( this.data );

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
              data: components,
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
              onrender: ( element, data ) => this.rating && this.rating.start( {
                root: element.querySelector( '.rating' ),
                'data.key': data.key
              } ),
              onclick: ( event, element, data ) => showComponent( data.key )
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
                meta.version = $.getIndex( meta.path ).split( '-' );
                meta.identifier = meta.version.shift();
                meta.version = meta.version.join( '.' );
                meta.creator = user.name || user.user;
                meta.date = new Date().toISOString().split( 'T' )[ 0 ];
                meta.format = 'application/javascript';
                meta.license = 'MIT';
                meta.tags = meta.tags.filter( tag => tag );

                // set dataset key and permission settings
                meta.key = meta.identifier + '-' + meta.version.split( '.' ).join( '-' );
                meta._ = { access: { get: 'all', set: 'creator', del: 'creator' } };

                // save meta data (component is published)
                await this.data.store.set( meta );

                // show published component
                await showComponent( meta.key );

              }
            } );

          }

        ];

        /**
         * shows a component
         * @param {string} index
         * @returns {Promise<void>}
         */
        const showComponent = async index => {

          // deselect selected menu entry and update route
          menu.select();
          this.routing && this.routing.set( `component-${index}` );

          // clear content
          $.setContent( content, '' );

          this.component_manager && await this.component_manager.start( {
            root: content,
            data: {
              store: this.data.store,
              key: index
            }
          } );

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
        if ( this.routing ) {
          this.routing.define( {
            home:       () => menu.select( 1 ),
            apps:       () => menu.select( 2 ),
            components: () => menu.select( 3 ),
            publish:    () => menu.select( 4 ),
            component:  ( name, major, minor, patch ) => showComponent( `${name}-${major}-${minor}-${patch}` )
          } );
          this.routing && this.routing.refresh();
        }

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
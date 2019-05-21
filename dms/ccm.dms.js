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

( function () {

  const component = {

    name: 'dms',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {
      "html": {
        "main": {
          "id": "main",
          "inner": [
            {
              "id": "header",
              "inner": [
                {
                  "id": "brand",
                  "inner": [
                    {
                      "id": "logo",
                      "inner": {
                        "tag": "img",
                        "src": "%logo%"
                      }
                    },
                    {
                      "id": "title",
                      "inner": {
                        "tag": "span",
                        "inner": "%title%"
                      }
                    }
                  ]
                },
                { "id": "menu" },
                { "id": "user" }
              ]
            },
            { "id": "content" }
          ]
        }
      },
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/dms/resources/default.css" ],
      "data": [],
      "menu": [ "ccm.proxy", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.5.1.js", {
        "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/menu/resources/configs.js", "text" ],
        "data": {
          "entries": [ "Home", "Apps", "Components", "Publish" ]
        },
        "selected": 3,
        "routing": [ "ccm.instance", "https://ccmjs.github.io/akless-components/routing/versions/ccm.routing-1.2.0.js", { "app": "dms_ak1_menu" } ]
      } ],
      "listing": [ "ccm.proxy", "https://ccmjs.github.io/akless-components/listing/versions/ccm.listing-2.0.3.js", {
        "html.entry": {
          "class": "entry",
          "inner": [
            {
              "class": "left",
              "inner": {
                "tag": "img",
                "src": "%icon%"
              }
            },
            {
              "class": "right",
              "inner": [
                {
                  "class": "title",
                  "inner": "%title%",
                  "title": "%title%"
                },
                {
                  "class": "creator",
                  "inner": "%creator%",
                  "title": "%creator%"
                },
                { "class": "rating" }
              ]
            }
          ]
        },
        "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/dms/resources/listing.css" ],
        "defaults": {
          "icon": "https://ccmjs.github.io/akless-components/dms/resources/component.png"
        }
      } ],
      "rating": [ "ccm.component", "https://ccmjs.github.io/tkless-components/star_rating_result/versions/ccm.star_rating_result-4.0.0.js", {
        "ccm": "https://ccmjs.github.io/ccm/versions/ccm-20.5.2.js",
        "css.3": "https://ccmjs.github.io/akless-components/dms/resources/rating_result.css"
      } ],
      "form": [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.0.js", {
        "entries": [ "ccm.get", "https://ccmjs.github.io/akless-components/dms/resources/publish_form.js", "entries" ],
        "data": [],
        "editor": [ "ccm.component", "https://ccmjs.github.io/tkless-components/editor/versions/ccm.editor-3.1.0.js" ]
      } ],
      "component_manager": [ "ccm.component", "https://ccmjs.github.io/akless-components/component_manager/versions/ccm.component_manager-2.2.6.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/component_manager/resources/configs.js", "demo" ] ],
      "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.1.0.js", {
        "realm": "cloud",
        "url": "http://localhost:8080",
        "store": "dms-user",
        "title": "Please enter username and password",
        "hash": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/md5.js", "type": "module" } ]
      } ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "logo": "https://ccmjs.github.io/akless-components/dms/resources/component.png",
      "title": "Digital Maker Space"
    },

    Instance: function () {

      let $, user;

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, { logo: this.logo, title: this.title } ) );

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

          // Home
          () => {

            // clear content area
            $.setContent( content, '' );

          },

          // Apps
          () => {

            // clear content area
            $.setContent( content, '' );

          },

          // Components
          async () =>  {

            // render listing with all components
            await this.listing.start( {
              data: this.data,
              sort: ( a, b ) => {
                const title_x = a.title.toLowerCase();
                const title_y = b.title.toLowerCase();
                const developer_x = ( a.developer || '' ).toLowerCase();
                const developer_y = ( b.developer || '' ).toLowerCase();
                if ( title_x < title_y ) return -1;
                if ( title_x > title_y ) return 1;
                if ( developer_x < developer_y ) return -1;
                if ( developer_x > developer_y ) return 1;
                return 0;
              },
              onrender: ( element, data ) => this.rating && this.rating.start( {
                root: element.querySelector( '.rating' ),
                'data.key': data.key
              } ),
              onclick: ( event, element, data ) => false && this.component_manager.start( {
                root: content,
                data: {
                  store: this.data.store,
                  key: data.key
                }
              } )
            } );
            $.setContent( content, this.listing.root );

          },

          // Publish
          () => {

            // render publish component form
            this.user && this.data.store && this.form.start( {
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
                meta.licence = 'MIT';
                meta.category = meta.category.filter( category => category );
                meta.tags = meta.tags.filter( tag => tag );

                // set dataset key and permission settings
                meta.key = meta.identifier + '-' + meta.version.split( '.' ).join( '-' );
                meta._ = { access: { get: 'all', set: 'creator', del: 'creator' } };

                // save meta data (component is published)
                await this.data.store.set( meta );

                await this.start();
                return;

                // show published component
                await this.component_manager.start( {
                  root: content,
                  data: {
                    store: this.data.store,
                    key: meta.key
                  }
                } );

              }
            } );

          }

        ];

        // no user or no data store? => remove the menu entry for publishing a component
        !this.user && !this.data.store && this.menu.config.data.entries.pop();

        // render header menu
        await this.menu.start( {
          root: this.element.querySelector( '#menu' ),
          onclick: event => view[ event.nr - 1 ]()
        } );

        // render login/logout area
        $.setContent( this.element.querySelector( '#user' ), this.user.root );

      };
    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
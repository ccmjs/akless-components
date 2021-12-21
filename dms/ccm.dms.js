/**
 * @overview ccmjs-based web component for a digital makerspace
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (5.0.0)
 * @changes
 * version 5.0.0 (07.12.2021): reimplementation
 * (for older version changes see ccm.dms-4.5.0.js)
 */

( () => {
  const component = {
    name: 'dms',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.1.1.min.js',
    config: {
      "apps": [ "ccm.store" ],
      "comment": [ "ccm.component", "https://ccmjs.github.io/tkless-components/comment/versions/ccm.comment-7.0.0.min.js", {
        "data": { "store": [ "ccm.store" ] },
        "text": [ "ccm.load", "https://ccmjs.github.io/tkless-components/comment/resources/resources.mjs#de" ],
        "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js" ]
      } ],
      "css": [ "ccm.load",
        [
          "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap.min.css",
          "https://ccmjs.github.io/akless-components/dms/resources/styles.min.css"
        ],
        "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap-icons.min.css",
        { "url": "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap-fonts.min.css", "context": "head" },
      ],
      "components": [ "ccm.store" ],
      "configs": [ "ccm.store" ],
      "icon": "https://ccmjs.github.io/akless-components/dms/resources/icon.png",
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.8.0.min.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/dms/resources/templates.mjs" ],
      "libs": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/bootstrap-5/js/bootstrap.bundle.min.js" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.min.js", "greedy" ] ],
      "picture": "https://ccmjs.github.io/akless-components/user/resources/icon.svg",
      "quill": [ "ccm.component", "https://ccmjs.github.io/akless-components/quill/versions/ccm.quill-1.0.0.min.js", {
        "options": {
          "theme": "snow"
        }
      } ],
      "selectize": [ "ccm.component", "https://ccmjs.github.io/akless-components/selectize/versions/ccm.selectize-1.0.0.min.js", {
        "create": true,
        "create_on_blur": true,
        "plugins": [ "remove_button" ]
      } ],
      "shadow": "none",
      "text": [ "ccm.load", "https://ccmjs.github.io/akless-components/dms/resources/resources.mjs#en" ],
      "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js" ]
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * app state data
       * @type {Object}
       */
      let data;

      /**
       * ccmjs-based app editor instance
       * @type {Object}
       */
      let editor;

      /**
       * metadata for a new app
       * @type {Object}
       */
      let app_meta = {};

      /**
       * main HTML element
       * @type {Element}
       */
      let element;

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {

        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );  // set shortcut to help functions
        window.onpopstate = this.refresh;                                          // check route on 'popstate' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );      // logging of 'ready' event

      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        // load metadata of all components and apps
        data = await Promise.all( [ this.components.get(), this.apps.get() ] );
        data = {
          components: {
            arr: data[ 0 ],
            options: {
              title: {},
              creator: {},
              tags: {}
            }
          },
          apps: {
            arr: data[ 1 ],
            options: {
              title: {},
              tool: {},
              creator: {},
              tags: {}
            }
          }
        };

        /**
         * ratings data for components/tools and apps
         * @type {{components: Object[], apps: Object[]}}
         */
        const ratings = { components: [], apps: [] };

        // filter user ratings for components/tools and apps
        data.components.arr = data.components.arr.filter( dataset => dataset.ratings ? !ratings.components.push( dataset ) : dataset.ratings = { components: {}, tools: {} } );
        data.apps.arr = data.apps.arr.filter( dataset => dataset.ratings ? !ratings.apps.push( dataset ) : dataset.ratings = {} );

        // convert meta data of components and apps to associative array
        data.components.meta = $.arrToObj( data.components.arr );
        data.apps.meta = $.arrToObj( data.apps.arr );

        // integrate user ratings in metadata of components/tools
        ratings.components.forEach( user => {
          for ( const key in user.ratings )
            if ( data.components.meta[ key ] )
              data.components.meta[ key ].ratings.components[ user.key ] = user.ratings[ key ];
          for ( const key in user.tools )
            if ( data.components.meta[ key ] )
              data.components.meta[ key ].ratings.tools[ user.key ] = user.tools[ key ];
        } );

        // integrate user ratings in meta data of apps
        ratings.apps.forEach( user => {
          for ( const key in user.ratings )
            if ( data.apps.meta[ key ] )
              data.apps.meta[ key ].ratings[ user.key ] = user.ratings[ key ];
        } );

        // calculate average of ratings for all components
        data.components.arr.forEach( component => {
          const ratings = Object.values( component.ratings.components );
          const tools = Object.values( component.ratings.tools );
          component.rating = {
            component: ( ratings.reduce( ( a, b ) => a + b, 0 ) / ratings.length ) || 0,
            tool:      (   tools.reduce( ( a, b ) => a + b, 0 ) /   tools.length ) || 0
          };
        } );

        // iterate over all apps metadata
        data.apps.arr.forEach( app => {

          // calculate average of ratings for all apps
          const ratings = Object.values( app.ratings );
          app.rating = ratings.reduce( ( a, b ) => a + b, 0 ) / ratings.length;

          // add title of corresponding tool
          app.tool = ( data.components.meta[ app.component ] || {} ).title;

        } );

        /** @function sets a value as key in an object if key not exists */
        const add = ( obj, key ) => !obj[ key ] && ( obj[ key ] = true );

        /**
         * user data of the logged-in user
         * @type {Object}
         */
        const user = this.user.getValue();

        // collect options for tool searches and eliminate duplicates
        data.components.arr.forEach( component => {
          if ( !component.listed && ( !user || user.key !== component._.creator ) ) return;
          component.apps = 0;  // counter for published apps that are already created with this component
          add( data.components.options.title, component.title );
          add( data.components.options.creator, component.creator );
          component.tags.forEach( tag => add( data.components.options.tags, tag ) );
        } );

        // collect options for app searches and eliminate duplicates
        data.apps.arr.forEach( app => {
          if ( !app.listed && ( !user || user.key !== app._.creator ) ) return;
          const component = data.components.meta[ app.component ];
          component.apps++;  // increase app counter for corresponding component
          add( data.apps.options.title, app.title );
          add( data.apps.options.tool, component.title );
          add( data.apps.options.creator, app.creator );
          app.tags.forEach( tag => add( data.apps.options.tags, tag ) );
        } );
        for ( const key in data.components.options ) data.components.options[ key ] = Object.keys( data.components.options[ key ] );
        for ( const key in data.apps.options ) data.apps.options[ key ] = Object.keys( data.apps.options[ key ] );

        // share instance and app state data with HTML templates
        this.html.share( this, data );

        // render route specific content
        this.html.render( this.html.main(), this.element );
        element = this.element.querySelector( 'main' );
        await this.refresh();

      };

      /**
       * returns current app state data
       * @returns {Object}
       */
      this.getValue = () => $.clone( data );

      /**
       * contains all event handlers
       * @type {Object.<string,Function>}
       */
      this.events = {
        onLogin: async () => {
          await this.user.login();
          this.refresh();
        },
        onLogout: async () => {
          await this.user.logout();
          this.refresh();
        },
        onHome: async () => {
          window.history.pushState( '', '', '?home' );
          await this.refresh();
        },
        onList: async ( section, values = {} ) => {
          window.history.pushState( '', '', '?' + section + Object.keys( values ).map( key => '&' + key + '=' + values[ key ] ) );
          await this.refresh();
        },
        onSearch: section => {
          const values = { sort: element.querySelector( '#section-sort' ).value };
          element.querySelectorAll( 'input[type="search"]' ).forEach( input => values[ input.id.split( '-' ).pop() ] = input.value );
          this.render.cards( section, values );
        },
        onItem: async ( section, meta_key ) => {
          window.history.pushState( '', '', '?' + section + '=' + meta_key );
          await this.refresh();
        },
        onRating: async ( section, meta_key, rating ) => {
          const user_key = ( await this.user.login() ).key;
          const prop = section === 'app' ? 'apps' : 'components';
          const meta = data[ prop ].meta[ meta_key.toString() ];
          const priodata = { key: '_' + user_key }
          priodata[ ( section === 'tool' ? 'tools' : 'ratings' ) + '.' + meta.key.toString() ] = rating;
          let ratings = section === 'app' ? meta.ratings : meta.ratings[ section + 's' ];
          if ( rating === ratings[ user_key ] ) rating = 0;
          ratings[ user_key ] = rating;
          ratings = Object.values( ratings );
          rating = ( ratings.reduce( ( a, b ) => a + b, 0 ) / ratings.length ) || 0;
          if ( section === 'app' )
            meta.rating = rating;
          else
            meta.rating[ section ] = rating;
          this.render.rating( section, meta.key );
          await this[ prop ].set( priodata );
        },
        onShow: async ( section, meta_key ) => {
          console.log( section, meta_key );
        },

        onDeveloper: async () => {
          window.history.pushState( '', '', '?developer' );
          await refresh();
        },
        onEditor: ( tool_key, app_key ) => {
          if ( app_key === true ) return render.editor( tool_key, true );
          window.history.pushState( '', '', '?editor=' + tool_key + ( app_key ? '&template=' + app_key : '' ) );
          refresh();
        },
        onPreview: tool_key => render.preview( tool_key ),
        onCreateApp: tool_key => render.createApp( tool_key ),
        onCreateAppSubmit: async tool_key => {
          if ( !app_meta.title || !app_meta.visibility ) return;
          await this.user.login();
          if ( app_meta.visibility === 'private' )
            app_meta.agree = { content: false, software: false, copyright: false };
          else if ( !app_meta.agree.content || !app_meta.agree.software || !app_meta.agree.copyright )
            return;
          const app_meta = $.clone( app_meta );
          const app_config = editor.getValue();
          const app_key = $.generateKey();
          app_meta.key = app_config.key = [ tool_key, app_key ];
          app_meta.component = app_config.component = tool_key;
          app_meta.app = app_config.app = app_key;
          app_meta.creator = this.user.getUsername();
          app_meta.ignore = { config: [ 'ccm.get', this.configs.source(), app_config.key ] };
          app_config.ignore = { meta: [ 'ccm.get', this.apps.source(), app_meta.key ] };
          app_meta._ = app_config._ = {
            creator: this.user.getValue().key,
            realm: 'cloud',
            access: {
              get: app_meta.visibility === 'private' ? 'creator' : 'all',
              set: 'creator',
              del: 'creator'
            }
          };
          app_meta.listed = app_meta.visibility === 'public';
          app_meta.ratings = {};
          app_meta.icon = data.components.meta[ tool_key ].icon;
          if ( !app_meta.tags ) app_meta.tags = [];
          delete app_meta.selectize;
          delete app_meta.quill;
          delete app_meta.visibility;
          await Promise.all( [ this.apps.set( app_meta ),  this.configs.set( app_config ) ] );
          data.apps.arr.push( app_meta );
          data.apps.meta[ app_meta.key.toString() ] = app_meta;
          const set = ( prop, value = app_meta[ prop ] ) => !data.apps.options[ prop ].includes( value ) && data.apps.options[ prop ].push( value );
          set( 'title' );
          set( 'creator' );
          app_meta.tags.forEach( tag => set( 'tags', tag ) );
          window.history.pushState( '', '', '?app=' + app_meta.key );
          await refresh();
        },
        onShowApp: async app_key => {
          window.history.pushState( '', '', '?show=' + app_key );
          await refresh();
        },
        onEditApp: async meta_key => {
          window.history.pushState( '', '', '?edit_app=' + meta_key );
          await refresh();
        },
        onEditAppSubmit: async meta_key => {
          const meta = data.apps.meta[ meta_key ];
          if ( !meta.title || !meta.visibility ) return;
          await this.user.login();
          if ( meta.visibility === 'private' )
            meta.agree = { content: false, software: false, copyright: false };
          else if ( !meta.agree.content || !meta.agree.software || !meta.agree.copyright )
            return;
          const app_meta = $.clone( meta );
          const app_config = editor.getValue();
          const app_key = $.generateKey();
          app_meta.key = app_config.key = [ tool_key, app_key ];
          app_meta.component = app_config.component = tool_key;
          app_meta.app = app_config.app = app_key;
          app_meta.creator = this.user.getUsername();
          app_meta.ignore = { config: [ 'ccm.get', this.configs.source(), app_config.key ] };
          app_config.ignore = { meta: [ 'ccm.get', this.apps.source(), app_meta.key ] };
          app_meta._ = app_config._ = {
            creator: this.user.getValue().key,
            realm: 'cloud',
            access: {
              get: app_meta.visibility === 'private' ? 'creator' : 'all',
              set: 'creator',
              del: 'creator'
            }
          };
          app_meta.listed = app_meta.visibility === 'public';
          app_meta.ratings = {};
          app_meta.icon = data.components.meta[ tool_key ].icon;
          if ( !app_meta.tags ) app_meta.tags = [];
          delete app_meta.selectize;
          delete app_meta.quill;
          delete app_meta.visibility;
          await Promise.all( [ this.apps.set( app_meta ),  this.configs.set( app_config ) ] );
          data.apps.arr.push( app_meta );
          data.apps.meta[ app_meta.key.toString() ] = app_meta;
          const set = ( prop, value = app_meta[ prop ] ) => !data.apps.options[ prop ].includes( value ) && data.apps.options[ prop ].push( value );
          set( 'title' );
          set( 'creator' );
          app_meta.tags.forEach( tag => set( 'tags', tag ) );
          window.history.pushState( '', '', '?app=' + app_meta.key );
          await refresh();
        },
        onDeleteApp: async meta_key => {
          Promise.all( [ this.apps.del( meta_key ), this.configs.del( meta_key ) ] ).then( () => {
            delete data.apps.meta[ meta_key ];
            data.apps.arr = data.apps.arr.filter( meta => meta.key !== meta_key );
            events.onApps();
          } );
        }
      };

      /** renders route specific content */
      this.refresh = () => {
        let section;
        const params = window.location.search.slice( 1 ).split( '&' ).reduce( ( acc, s) => {
          const [ k, v ] = s.split( '=' );
          if ( !section ) section = k;
          return Object.assign( acc, { [ k ]: decodeURIComponent( v ) } );
        }, {} );
        switch ( section ) {
          case 'home':
            this.render.home();
            break;
          case 'tools':
          case 'apps':
          case 'components':
            this.render.list( section, params );
            break;
          case 'tool':
          case 'app':
          case 'component':
            this.render.item( section, params[ section ] );
            break;
          default:
            this.render.home();
        }

        /*
        else if ( route === '?developer' )
          this.render.developer();
        else if ( route.startsWith( '?editor=' ) )
          this.render.editor( params.editor, params.template );
        else if ( route.startsWith( '?show=' ) )
          this.render.showApp( params.show );
        else if ( route.startsWith( '?edit_app=' ) )
          this.render.editApp( params.edit_app );
         */
      };

      /**
       * contains all render functions
       * @type {Object.<string,Function>}
       */
      this.render = {
        header: active => this.html.render( this.html.header( active ), this.element.querySelector( 'header' ) ),
        home: () => {
          this.render.header();
          this.html.render( this.html.home(), element );
        },
        list: ( section, values ) => {
          this.render.header( section );
          this.html.render( this.html.list( section, values ), element );
        },
        cards: ( section, values ) => this.html.render( this.html.cards( section, values ), element.querySelector( '#search_results' ) ),
        item: async ( section, meta_key ) => {
          this.render.header( section );
          this.html.render( this.html.item( section, meta_key ), element );
          const meta = data[ section === 'app' ? 'apps' : 'components' ].meta[ meta_key ];
          const comments_key = section + '_comments';
          if ( !meta[ comments_key ] )
            meta[ comments_key ] = await this.comment.start( {
              'data.key': [].concat( section, meta_key.split( ',' ) ),
              user: [ 'ccm.instance', this.user.component.url, JSON.parse( this.user.config ) ]
            } );
          $.setContent( this.element.querySelector( '#comments' ), meta[ comments_key ].root );
        },
        rating: ( section, meta_key ) => {
          this.html.render( this.html.rating( section, meta_key ), element.querySelector( '#rating article' ) );
        },

        developer: () => {
          render.header( 'developer' );
          render.main( 'developer' );
        },
        editor: ( tool_key, app_key ) => {
          render.header( 'tools' );
          const tool_meta = data.components.meta[ tool_key ];
          if ( app_key !== true ) app_meta = {};
          this.html.render( this.html.editor( tool_meta ), element );
          if ( app_key === true ) return $.setContent( this.element.querySelector( '#section-tool-editor' ), editor.root );
          const config = app_key && data.apps.meta[ app_key ].ignore.config;
          Promise.all( [
            this.ccm.helper.solveDependency( tool_meta.ignore.editor ),
            this.ccm.helper.solveDependency( tool_meta.ignore.defaults ),
            this.ccm.helper.solveDependency( config )
          ] ).then( ( [ editor_comp, defaults, config = {} ] ) => editor_comp.start( {
            root: this.element.querySelector( '#section-tool-editor' ),
            data: { store: [ 'ccm.store', { app: config } ], key: 'app' },
            'ignore.defaults': defaults,
            preview: false
          } ).then( editor_inst => editor = editor_inst ) );
        },
        preview: tool_key => {
          render.header( 'tools' );
          const tool_meta = data.components.meta[ tool_key ];
          this.html.render( this.html.preview( tool_meta ), element );
          this.ccm.start( tool_meta.path, { root: this.element.querySelector( '#section-tool-preview' ), src: editor.getValue() } );
        },
        createApp: async tool_key => {
          await this.user.login();
          render.header( 'tools' );
          this.html.render( this.html.createApp( data.components.meta[ tool_key ] ), element );
          if ( !app_meta.selectize ) {
            app_meta.selectize = await this.selectize.start( {
              options: [ ...new Set( [ ...data.apps.options.tags, ...( app_meta.tags || [] ) ] ) ],
              items: app_meta.tags || [],
              onchange: event => app_meta.tags = event.instance.getValue()
            } );
          }
          if ( !app_meta.quill ) {
            app_meta.quill = await this.quill.start( { onchange: event => app_meta.description = event.instance.getHTML() } );
            app_meta.description && app_meta.quill.setHTML( app_meta.description );
          }
          $.setContent( this.element.querySelector( '#form-tags' ), app_meta.selectize.root );
          $.setContent( this.element.querySelector( '#form-description' ), app_meta.quill.root );
          const form_elem = this.element.querySelector( '#form' );
          form_elem.querySelectorAll( '[name]' ).forEach( input => input.addEventListener( 'change', () => {
            const form_data = $.formData( form_elem );
            const old_visibility = app_meta.visibility || '';
            app_meta = Object.assign( app_meta, form_data );
            old_visibility !== form_data.visibility && render.createApp( tool_key );
          } ) )
        },
        editApp: async meta_key => {
          render.header( 'apps' );
          let meta = data.apps.meta[ meta_key ];
          this.html.render( this.html.editApp( meta ), element );
          if ( !meta.selectize ) {
            meta.selectize = await this.selectize.start( {
              options: [ ...new Set( [ ...data.apps.options.tags, ...( meta.tags || [] ) ] ) ],
              items: meta.tags || [],
              onchange: event => meta.tags = event.instance.getValue()
            } );
          }
          if ( !meta.quill ) {
            meta.quill = await this.quill.start( { onchange: event => meta.description = event.instance.getHTML() } );
            meta.description && meta.quill.setHTML( meta.description );
          }
          $.setContent( this.element.querySelector( '#form-tags' ), meta.selectize.root );
          $.setContent( this.element.querySelector( '#form-description' ), meta.quill.root );
          const form_elem = this.element.querySelector( '#form' );
          form_elem.querySelectorAll( '[name]' ).forEach( input => input.addEventListener( 'change', () => {
            const form_data = $.formData( form_elem );
            const old_visibility = meta.visibility || '';
            meta = Object.assign( meta, form_data );
            old_visibility !== form_data.visibility && render.editApp( meta_key );
          } ) )
        },
        showApp: async app_key => {
          render.header( 'apps' );
          const app_meta = data.apps.meta[ app_key ];
          const tool_meta = data.components.meta[ app_meta.component ];
          this.html.render( this.html.showApp( app_meta ), element );
          await this.ccm.start( tool_meta.path, { src: await $.solveDependency( app_meta.ignore.config ), root: this.element.querySelector( '#app' ) } );
        }
      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
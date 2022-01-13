/**
 * @overview ccmjs-based web component for a digital makerspace
 * @author André Kless <andre.kless@web.de> 2018-2022
 * @license The MIT License (MIT)
 * @version 5.0.0
 * @changes
 * version 5.0.0 (13.01.2022): reimplementation
 * (for older version changes see ccm.dms-4.5.0.js)
 */

( () => {
  const component = {
    name: 'dms',
    version: [ 5, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.1.2.min.js',
    config: {
      "apps": [ "ccm.store" ],
      "comment": [ "ccm.component", "https://ccmjs.github.io/tkless-components/comment/versions/ccm.comment-7.0.0.min.js" ],
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
//    "handover": [ "ccm.component", "https://ccmjs.github.io/akless-components/handover_app/versions/ccm.handover_app-3.0.0.min.js" ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.10.0.min.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/dms/resources/templates.mjs" ],
//    "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.0.0.min.js" ],
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
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js" ]
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
       * main HTML element
       * @type {Element}
       */
      let element;

      /**
       * for the temporary storage of instance references
       * @type {Object}
       */
      const tmp = {};

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {

        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );  // set shortcut to help functions
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );      // logging of 'ready' event
        window.addEventListener( 'popstate', this.refresh );                       // check route on 'popstate' event

        // listen to language change event
        this.lang && this.lang.observe( lang => {
          $.params( { lang: lang } );                               // change language in URL parameter
          element.querySelector( '.timestamp' ) && this.refresh();  // translate timestamps
        } );

      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        // load metadata of all components and apps
        data = await Promise.all( [
          this.components.get( { deleted: null } ),
          this.apps.get( { deleted: null } )
        ] );
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
              data.components.meta[ key ].ratings.components[ user.user ] = user.ratings[ key ];
          for ( const key in user.tools )
            if ( data.components.meta[ key ] )
              data.components.meta[ key ].ratings.tools[ user.user ] = user.tools[ key ];
        } );

        // integrate user ratings in meta data of apps
        ratings.apps.forEach( user => {
          for ( const key in user.ratings )
            if ( data.apps.meta[ key ] )
              data.apps.meta[ key ].ratings[ user.user ] = user.ratings[ key ];
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
          component.apps = 0;  // counter for published apps that are already created with this component
          if ( !component.listed && ( !user || user.key !== component._.creator ) ) return;
          add( data.components.options.title, component.title );
          add( data.components.options.creator, component.creator );
          component.tags.forEach( tag => add( data.components.options.tags, tag ) );
        } );

        // collect options for app searches and eliminate duplicates
        data.apps.arr.forEach( app => {
          if ( !app.listed && ( !user || user.key !== app._.creator ) ) return;
          const component = data.components.meta[ app.component ];
          component && component.apps++;  // increase app counter for corresponding component
          add( data.apps.options.title, app.title );
          component && add( data.apps.options.tool, component.title );
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

        // render language selection
        this.lang && $.setContent( this.element.querySelector( '#lang' ), this.lang.root );

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
          await this.start();
        },
        onLogout: async () => {
          await this.user.logout();
          await this.start();
        },
        onHome: async () => {
          $.params( { view: 'home' }, true, true );
          await this.refresh();
        },
        onList: async ( section, values = {} ) => {
          $.params( Object.assign( { view: section }, values ), true, true );
          await this.refresh();
        },
        onSearch: section => {
          const values = { sort: element.querySelector( '#section-sort' ).value };
          element.querySelectorAll( 'input[type="search"]' ).forEach( input => values[ input.id.split( '-' ).pop() ] = input.value );
          $.params( values );
          this.render.cards( section, values );
        },
        onItem: async ( section, meta_key ) => {
          $.params( { view: section, id: meta_key }, true, true );
          await this.refresh();
        },
        onEdit: async ( type, meta_key ) => {
          $.params( { edit: type, id: meta_key }, true, true );
          await this.refresh();
        },
        onEditSubmit: async ( type, meta_key ) => {
          await this.user.login();
          const form = $.formData( element.querySelector( 'form' ) );
          if ( !form.title || !form.visibility ) return;
          if ( form.visibility === 'private' )
            form.agree = { content: false, software: false, copyright: false };
          else if ( type === 'app' && !form.agree.content || !form.agree.software || !form.agree.copyright )
            return;
          if ( type !== 'app' )
            delete form.agree.content;
          const prop = type !== 'app' ? 'components' : 'apps';
          const meta = data[ prop ].meta[ meta_key ];
          form.key = meta.key;
          form.tags = meta.selectize.getValue();
          form.description = meta.quill.getHTML();
          form.listed = form.visibility === 'public';
          form[ '_.access.get' ] = form.visibility === 'private' ? 'creator' : 'all';
          delete form.visibility;

          await Promise.all( [
            await this[ prop ].set( form ),
            type === 'app' && await this.configs.set( {
              key: meta_key,
              '_.access.get': form.visibility === 'private' ? 'creator' : 'all'
            } )
          ] );
          $.assign( meta, form );
          
          const set = ( key, value = form[ key ] ) => !data[ prop ].options[ key ].includes( value ) && data[ prop ].options[ key ].push( value );
          set( 'title' );
          set( 'creator' );
          form.tags.forEach( tag => set( 'tags', tag ) );

          await this.events.onItem( type, meta_key );
        },
        onDelete: async ( type, meta_key ) => {
          const prop = type !== 'app' ? 'components' : 'apps';
          await this[ prop ].set( { key: meta_key, deleted: true } );
          delete data[ prop ].meta[ meta_key ];
          data[ prop ].arr = data[ prop ].arr.filter( meta => meta.key !== meta_key );
          this.events.onList( type + 's' );
        },
        onRating: async ( type, meta_key, rating ) => {
          const user_key = ( await this.user.login() ).key;
          const prop = type === 'app' ? 'apps' : 'components';
          const meta = data[ prop ].meta[ meta_key.toString() ];
          if ( user_key === meta._.creator ) return this.refresh();
          const priodata = { key: '_' + user_key }
          priodata[ ( type === 'tool' ? 'tools' : 'ratings' ) + '.' + meta.key.toString() ] = rating;
          let ratings = type === 'app' ? meta.ratings : meta.ratings[ type + 's' ];
          if ( rating === ratings[ user_key ] ) rating = 0;
          ratings[ user_key ] = rating;
          ratings = Object.values( ratings );
          rating = ( ratings.reduce( ( a, b ) => a + b, 0 ) / ratings.length ) || 0;
          if ( type === 'app' )
            meta.rating = rating;
          else
            meta.rating[ type ] = rating;
          this.render.rating( type, meta.key );
          const store = this[ prop ];
          if ( await store.get( priodata.key ) )
            await store.set( priodata );
          else
            await store.set( {
              "key": priodata.key,
              "user": user_key,
              "tools": {},
              "ratings": {},
              "_": {
                "creator": user_key,
                "realm": "cloud",
                "access": {
                  "get": "all",
                  "set": "creator",
                  "del": "creator"
                }
              }
            } );
        },
        onStart: async ( type, meta_key, template ) => {
          switch ( type ) {
            case 'tool':
              if ( template === true ) return this.render.editor( meta_key, template );
              $.params( { editor: meta_key, template: template }, true, true );
              break;
            case 'app':
              $.params( { show: meta_key }, true, true );
              break;
          }
          await this.refresh();
        },
        onCreate: async tool_key => this.render.create( tool_key ),
        onCreateSubmit: async tool_key => {
          await this.user.login();
          const form = $.formData( element.querySelector( 'form' ) );
          if ( !form.title || !form.visibility ) return;
          if ( form.visibility === 'private' )
            form.agree = { content: false, software: false, copyright: false };
          else if ( !form.agree.content || !form.agree.software || !form.agree.copyright )
            return;

          const tool_meta = data.components.meta[ tool_key ];
          form.creator = this.user.getUsername();
          form.icon = tool_meta.icon;
          form.tags = tmp.selectize.getValue();
          form.description = tmp.quill.getHTML();
          form.listed = form.visibility === 'public';

          const config = tmp.editor.getValue();
          const app_key = $.generateKey();
          form.key = config.key = [ tool_key, app_key ];
          form.component = config.component = tool_key;
          form.app = config.app = app_key;
          form.ignore = { config: [ 'ccm.get', this.configs.source(), form.key ] };
          config.ignore = { meta: [ 'ccm.get', this.apps.source(), form.key ] };
          form._ = config._ = {
            creator: this.user.getValue().key,
            realm: 'cloud',
            access: {
              get: form.visibility === 'private' ? 'creator' : 'all',
              set: 'creator',
              del: 'creator'
            }
          };
          delete form.visibility;

          await Promise.all( [ this.apps.set( form ), this.configs.set( config ) ] );
          form.ratings = {};
          form.tool = tool_meta.title;
          form.created_at = form.updated_at = Date.now();
          data.apps.arr.push( form );
          data.apps.meta[ form.key.toString() ] = form;

          const set = ( key, value = form[ key ] ) => !data.apps.options[ key ].includes( value ) && data.apps.options[ key ].push( value );
          set( 'title' );
          set( 'creator' );
          form.tags.forEach( tag => set( 'tags', tag ) );

          await this.events.onItem( 'app', form.key );
        },
        onSave: async app_key => {
          await this.user.login();
          const config = tmp.editor.getValue();
          config.key = app_key;
          await this.configs.set( config );
          this.events.onStart( 'app', app_key );
        },
        onPreview: tool_key => this.render.preview( tool_key )
      };

      /** renders route specific content */
      this.refresh = () => {
        const params = $.params();
        const lang = this.lang && this.lang.active;
        if ( lang )
          if ( params.lang )
            params.lang !== lang && this.lang.switch( params.lang );
          else
            $.params( { lang: lang } );
        switch ( params.view ) {
          case 'home':
            return this.render.home();
          case 'tools':
          case 'apps':
          case 'components':
            return this.render.list( params.view, params );
          case 'tool':
          case 'app':
          case 'component':
            return this.render.item( params.view, params.id );
        }
        if ( params.edit ) return this.render.edit( params.edit, params.id );
        if ( params.editor ) return this.render.editor( params.editor, params.template );
        if ( params.show ) return this.render.show( params.show );
        this.render.home();
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
          this.lang && this.lang.translate();
        },
        list: ( section, values ) => {
          this.render.header( section === 'components' ? 'developer' : section );
          $.replace( element, element = element.cloneNode() );  // resets lit-html template
          this.html.render( this.html.list( section, values ), element );
          this.lang && this.lang.translate();
        },
        cards: ( section, values ) => {
          this.html.render( this.html.cards( section, values ), element.querySelector( '#search_results' ) );
          this.lang && this.lang.translate();
        },
        item: async ( section, meta_key ) => {
          this.render.header( section === 'component' ? 'developer' : section + 's' );
          this.html.render( this.html.item( section, meta_key ), element );
          this.lang && this.lang.translate();
          const meta = data[ section === 'app' ? 'apps' : 'components' ].meta[ meta_key ];
          if ( !this.comment || !meta ) return;
          const comments_key = section + '_comments';
          if ( !meta[ comments_key ] )
            meta[ comments_key ] = await this.comment.instance( {
              'data.key': [].concat( section, meta_key.split( ',' ) ),
              user: [ 'ccm.instance', this.user.component.url, JSON.parse( this.user.config ) ]
            } );
          $.setContent( this.element.querySelector( '#comments' ), meta[ comments_key ].root );
          await meta[ comments_key ].start();
        },
        rating: ( section, meta_key ) => {
          this.html.render( this.html.rating( section, meta_key ), element.querySelector( '#rating article' ) );
          this.lang && this.lang.translate();
        },
        edit: async ( type, meta_key ) => {
          const meta = data[ type !== 'app' ? 'components' : 'apps' ].meta[ meta_key ];
          this.render.header( type === 'component' ? 'developer' : type + 's' );
          this.html.render( this.html.edit( type, meta.key ), element );
          if ( !meta.selectize ) {
            meta.selectize = await this.selectize.start( {
              options: [ ...new Set( [ ...data.apps.options.tags, ...( meta.tags || [] ) ] ) ],
              items: meta.tags || []
            } );
          }
          if ( !meta.quill ) {
            meta.quill = await this.quill.start();
            meta.description && meta.quill.setHTML( meta.description );
          }
          $.setContent( this.element.querySelector( '#form-tags' ), meta.selectize.root );
          $.setContent( this.element.querySelector( '#form-description' ), meta.quill.root );
          const radio = element.querySelector( '#form-visibility-private' );
          radio.checked && radio.click();
          this.lang && this.lang.translate();
        },
        editor: ( tool_key, app_key ) => {
          this.render.header( 'tools' );
          const tool_meta = data.components.meta[ tool_key ];
          this.html.render( this.html.editor( tool_key, app_key === true ? tmp.app_key : app_key ), element );
          this.lang && this.lang.translate();
          if ( app_key === true )
            return $.setContent( this.element.querySelector( '#editor' ), tmp.editor.root );
          const config = app_key && data.apps.meta[ app_key ].ignore.config;
          Promise.all( [
            this.ccm.helper.solveDependency( tool_meta.ignore.editors[ 0 ] ),
            this.ccm.helper.solveDependency( tool_meta.ignore.defaults ),
            this.ccm.helper.solveDependency( config )
          ] ).then( ( [ editor_comp, defaults, config = {} ] ) => editor_comp.start( {
            data: { store: [ 'ccm.store', { app: config } ], key: 'app' },
            'ignore.defaults': defaults,
            parent: this,
            preview: false,
            root: this.element.querySelector( '#editor' )
          } ).then( editor_inst => {
            tmp.editor = editor_inst;
            tmp.app_key = app_key;
          } ) );
        },
        create: async tool_key => {
          this.render.header( 'tools' );
          this.html.render( this.html.create( tool_key ), element );
          tmp.selectize = await this.selectize.start( {
              root: this.element.querySelector( '#form-tags' ),
              options: data.apps.options.tags
            } );
          tmp.quill = await this.quill.start( {
              root: this.element.querySelector( '#form-description' )
            } );
          const radio = element.querySelector( '#form-visibility-private' );
          radio.click();
          radio.checked = false;
          this.lang && this.lang.translate();
        },
        preview: tool_key => {
          this.render.header( 'tools' );
          const tool_meta = data.components.meta[ tool_key ];
          this.html.render( this.html.preview( tool_key ), element );
          this.ccm.start( tool_meta.path, { root: this.element.querySelector( '#preview' ), src: tmp.editor.getValue() } );
          this.lang && this.lang.translate();
        },
        show: async app_key => {
          this.render.header( 'apps' );
          const app_meta = data.apps.meta[ app_key ];
          const tool_meta = data.components.meta[ app_meta.component ];
          this.html.render( this.html.show( app_key ), element );
          this.lang && this.lang.translate();
          await this.ccm.start( tool_meta.path, { src: await $.solveDependency( app_meta.ignore.config ), parent: this, root: this.element.querySelector( '#app' ) } );
          await this.handover.start( {
            root: this.element.querySelector( '#handover' ),
            'ignore.config': app_meta.ignore.config,
            tool: tool_meta.path,
            url: 'https://ccmjs.github.io/akless-components/dms/resources/app.html'
          } );
        }
      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
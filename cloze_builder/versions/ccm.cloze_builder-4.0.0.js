/**
 * @overview ccm component for building a fill-in-the-blank text
 * @author André Kless <andre.kless@web.de> 2017-2020
 * @license The MIT License (MIT)
 * @version 4.0.0
 * @changes
 * version 4.0.0 (27.11.2020)
 * - complete reimplementation
 * - uses ccm.js v26.1.0
 * - uses helper.mjs v6.0.0
 * - HTML templates based on lit-html
 * - added katex support
 * - adding of images by URL
 * - updated minified component line
 * (for older version changes see ccm.cloze_builder-3.0.3.js)
 */

( () => {

  const component = {
    name: 'cloze_builder', version: [ 4, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.1.0.js',
    config: {
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
          [  // parallel
            "https://ccmjs.github.io/akless-components/libs/quill-1/quill.snow.css",
            "https://ccmjs.github.io/akless-components/libs/selectize-0/selectize.css",
            "https://ccmjs.github.io/akless-components/cloze_builder/resources/default-1.css"
          ]
        ]
      ],
  //  "data": { "store": [ "ccm.store" ] },
      "defaults": {},
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-6.0.1.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/cloze_builder/resources/templates.mjs" ],
      "ignore": {
        "css": {
          "default": {
            "key": "default",
            "title": "Default",
            "value": [ "ccm.load", "https://ccmjs.github.io/akless-components/cloze/resources/default.css" ]
          },
          "lea": {
            "key": "lea",
            "title": "LEA-like",
            "value": [ "ccm.load", "https://ccmjs.github.io/akless-components/cloze/resources/lea.css" ]
          }
        },
        "user": {
          "guest": {
            "key": "guest",
            "title": "Guest Mode",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "guest" ] ]
          },
          "cloud": {
            "key": "cloud",
            "title": "Digital Makerspace Account",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "cloud" ] ]
          },
          "hbrsinfkaul": {
            "key": "hbrsinfkaul",
            "title": "H-BRS FB02 Account",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "hbrsinfkaul" ] ]
          },
          "hbrsinfpseudo": {
            "key": "hbrsinfpseudo",
            "title": "H-BRS FB02 Account with Pseudonym",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "hbrsinfpseudo" ] ]
          },
          "pseudo": {
            "key": "pseudo",
            "title": "One-time Pseudonym",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "pseudo" ] ]
          }
        }
      },
      "katex": [ "ccm.load",
        "https://ccmjs.github.io/akless-components/libs/katex/katex.min.js",
        "https://ccmjs.github.io/akless-components/libs/katex/katex.min.css"
      ],
      "libs": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/jquery-3/jquery.min.js",
          [  // parallel
            "https://ccmjs.github.io/akless-components/libs/quill-1/quill.min.js",
            "https://ccmjs.github.io/akless-components/libs/bootstrap-4/js/bootstrap.bundle.min.js",
            [  // serial
              "https://ccmjs.github.io/akless-components/libs/selectize-0/selectize.min.js",
              [  // parallel
                "https://ccmjs.github.io/akless-components/libs/selectize-0/remove_button-plugin.min.js",
                [  // serial
                  "https://ccmjs.github.io/akless-components/libs/jquery-ui-1/jquery-ui-sortable.min.js",
                  "https://ccmjs.github.io/akless-components/libs/selectize-0/drag_drop-plugin.min.js"
                ]
              ]
            ]
          ]
        ]
      ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "preview": "Preview",
  //  "onfinish": { "restart": true },
      "results": { "store": { "name": "cloze_results" }, "permissions": { "access": { "get": "all", "set": "creator", "del": "creator" } } },
      "shadow": "none",
      "submit": "Submit",
      "tool": [ "ccm.component", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-8.0.0.js" ],
      "toolbar": [
        [ { 'header': [ 1, 2, 3, false ] } ],
        [ 'bold', 'italic', 'underline', 'strike' ],
        [ 'link', { 'script': 'sub' }, { 'script': 'super' } ],
        [ { 'color': [] }, { 'background': [] } ],
        [ { 'list': 'ordered' }, { 'list': 'bullet' } ],
        [ 'image', 'video' ],
        [ 'code-block', 'formula' ],
        [ 'clean' ]
      ]
    },

    Instance: function () {
      let $, editor, dataset;

      this.ready = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );  // set shortcut to help functions
        delete this.tool.config.parent;                                            // remove no needed parent reference
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );      // logging of 'ready' event
      };

      this.start = async () => {

        // get initial app configuration (priority order: [high] this.data -> this.defaults -> this.tool.config [low])
        dataset = await $.integrate( await $.dataset( this.data ), await $.integrate( this.defaults, this.tool.config ) );

        this.logger && this.logger.log( 'start', $.clone( dataset ) );                  // logging of 'start' event
        this.render( dataset );                                                         // render main HTML template
        editor = this.element.querySelector( '#editor' );                               // select webpage area for text editor
        editor.innerHTML = dataset.text || '';                                          // set initial content for text editor
        jQuery( '[data-toggle=popover]' ).popover();                                    // initialize popovers for info icons

        // render text editor
        editor = new Quill( editor, {
          placeholder: 'Write here...',
          theme: 'snow',
          modules: { toolbar: {
            container: this.toolbar,
            handlers: {
              image: () => {
                const url = prompt( 'Enter image URL:' );
                url && this.quill.insertEmbed( this.quill.getSelection().index, 'image', url, Quill.sources.USER );
              }
            }
          } }
        } );

        // prepare input field for individual list of provided answers
        const keywords = Array.isArray( dataset.keywords ) && dataset.keywords;
        jQuery( this.element.querySelector( '#cb-tags' ) ).selectize( {
          create: true,
          items: keywords,
          labelField: 'value',
          options: keywords && keywords.map( keyword => { return { value: keyword } } ),
          placeholder: 'Individual List of Provided Answers',
          plugins: [ 'drag_drop', 'remove_button' ]
        } );

        // listen to change events of the input fields
        this.element.querySelectorAll( '*[name]' ).forEach( input => input.addEventListener( 'change', () => this.render() ) );

        // update app preview in modal dialog
        jQuery( '#cb-preview' ).on( 'show.bs.modal', () => this.tool.start( Object.assign( this.getValue(), { root: this.element.querySelector( '#cb-preview-body' ) } ) ) );

        // listen to submit event of the HTML form
        this.submit && this.element.querySelector( 'form' ).addEventListener( 'submit', event => {
          event.preventDefault();
          const result_data = this.getValue();                                 // get result data
          this.logger && this.logger.log( 'finish', $.clone( result_data ) );  // logging of 'finish' event
          $.onFinish( this, result_data );                                     // trigger finish actions
        } );
      };

      /**
       * renders the main HTML template
       * @param {Object} [config = this.getValue()] - app configuration
       */
      this.render = ( config = this.getValue() ) => {
        $.render( $.html( this.html.main, config, this ), this.element );
      }

      /**
       * returns current result data
       * @returns {Object} app configuration
       */
      this.getValue = () => {
        const config = $.formData( this.element );
        config.text = editor && editor.root.innerHTML;
        config.css = this.ignore.css[ config.css ].value;
        if ( this.katex ) config.katex = JSON.parse( this.config ).katex;
        if ( config.keywords === 'manually' ) config.keywords = config.tags; delete config.tags;
        if ( !config.keywords ) config.keywords = '';
        if ( !config.reset ) config.onreset = false; else delete config.reset;
        if ( !config.finish ) config.onfinish = ''; delete config.finish;
        if ( !config.onfinish ) return config;
        const key = this.results.key || dataset.key || $.generateKey();
        switch ( config.store ) {
          case 'collective': config.onfinish.store = true; config.data = { store: [ 'ccm.store', this.results.store ], key: key }; break;
          case 'user': config.onfinish.store = true; config.data = { store: [ 'ccm.store', this.results.store ], key: key, login: true, user: true, permissions: this.results.permissions }; break;
          case 'unique': config.onfinish.login = true; config.onfinish.store = { settings: [ 'ccm.store', this.results.store ], key: key, login: true, user: true, unique: true, permissions: this.results.permissions }; config.data = ''; break;
          default: config.data = '';
        }
        if ( !config.store || config.store === 'collective' ) config.user = '';
        config.store = '';
        if ( config.user ) config.user = this.ignore.user[ config.user ].value;
        switch ( config.render ) {
          case 'clear': config.onfinish.clear = true; break;
          case 'restart': config.onfinish.restart = true; break;
          case 'app':
            config.onfinish.render = {};
            if ( config.app ) {
              config.onfinish.render = $.decomposeEmbedCode( config.app );
              config.onfinish.render.config = [ 'ccm.get', config.onfinish.render.config.store, config.onfinish.render.config.key ];
            }
            break;
        }
        delete config.render;
        delete config.app;
        return config;
      };
    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
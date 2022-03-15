/**
 * @overview ccmjs-based web component for building a slidecast with commentary
 * @author André Kless <andre.kless@web.de> 2021-2022
 * @license The MIT License (MIT)
 * @version latest (1.1.0)
 * @changes
 * version 1.1.0 (27.01.2022):
 * - added optional multilingualism
 * - added optional user authentication
 * - added HTML class for CSS prefixing
 * - uses ccmjs v27.2.0 as default
 * - uses helper.mjs v8.0.0 as default
 * - bugfixes for slides extension
 * version 1.0.0 (20.10.2021)
 */

( () => {
  const component = {
    name: 'qa_slidecast_builder',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.2.0.min.js',
    config: {
      "bootstrap": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/bootstrap-5/js/bootstrap.bundle.min.js" ],
      "comment_builder": [ "ccm.instance", "https://ccmjs.github.io/akless-components/config_builder/versions/ccm.config_builder-1.1.0.js", {
        "bootstrap": "",
        "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/config_builder/resources/styles.min.css" ],
        "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/config_builder/resources/comment/templates.mjs" ],
        "ignore": {
          "defaults": {
            "libs": [ "ccm.load", [
              [
                "https://ccmjs.github.io/tkless-components/libs/dayjs/dayjs.min.js",
                "https://ccmjs.github.io/tkless-components/libs/dayjs/relativeTime.min.js"
              ],
              "https://ccmjs.github.io/tkless-components/libs/dayjs/de.min.js"
            ] ],
            "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "guest" ] ]
          },
          "mapping": {
            "user": {
              "guest": {
                "key": "guest",
                "title": "Gastmodus",
                "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "guest" ] ]
              },
              "cloud": {
                "key": "cloud",
                "title": "Digital Makerspace Account",
                "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "cloud" ] ]
              },
              "hbrsinfkaul": {
                "key": "hbrsinfkaul",
                "title": "H-BRS FB02 Account",
                "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "hbrsinfkaul" ] ]
              },
              "hbrsinfpseudo": {
                "key": "hbrsinfpseudo",
                "title": "H-BRS FB02 Account mit Pseudonym",
                "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "hbrsinfpseudo" ] ]
              },
              "pseudo": {
                "key": "pseudo",
                "title": "Einmaliges Pseudonym",
                "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "pseudo" ] ]
              },
              "none": {
                "key": "none",
                "title": "Deaktiviert",
                "value": ""
              }
            }
          }
        },
        "preview": false,
        "text": [ "ccm.load", "https://ccmjs.github.io/akless-components/config_builder/resources/comment/resources.mjs#en" ],
        "tool": [ "ccm.component", "https://ccmjs.github.io/tkless-components/comment/versions/ccm.comment-7.1.0.min.js" ]
      } ],
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap.min.css",
          "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap-dark.min.css",
          "https://ccmjs.github.io/akless-components/qa_slidecast_builder/resources/styles.min.css"
        ],
        "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap-icons.min.css",
        { "url": "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap-fonts.min.css", "context": "head" },
      ],
//    "data": { "store": [ "ccm.store" ] },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.0.0.min.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/qa_slidecast_builder/resources/templates.mjs" ],
      "ignore": {
        "defaults": {
          "comment": [ "ccm.component", "https://ccmjs.github.io/tkless-components/comment/versions/ccm.comment-7.1.0.min.js" ],
          "description": true,
          "pdf_viewer.2": {
            "downloadable": true,
            "pdf": "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/demo/en/slides.pdf"
          }
        }
      },
//    "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.0.0.min.js" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.min.js", "greedy" ] ],
//    "onfinish": { "log": true },
//    "onstart": initial_app_config => initial_app_config,
      "preview": true,
      "section": "basis",
      "shadow": "none",
      "text": [ "ccm.load", "https://ccmjs.github.io/akless-components/qa_slidecast_builder/resources/resources.mjs#slidecast_builder_en" ],
      "tool": [ "ccm.component", "https://ccmjs.github.io/tkless-components/qa_slidecast/versions/ccm.qa_slidecast-2.1.0.min.js" ],
//    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js" ]
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * initial app configuration
       * @type {Object}
       */
      let config;

      /**
       * ccmjs-based instance of a slidecast with commentary (used for slides editing)
       * @type {Object}
       */
      let slides_viewer;

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );  // set shortcut to help functions
        this.element.classList.add( this.component.name );
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );      // logging of 'ready' event
      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // user authentication
        this.user && await this.user.login();

        // set initial app configuration (priority order: [high] this.data -> this.ignore.defaults -> this.tool.config [low])
        config = await $.integrate( await $.dataset( this.data ), await $.integrate( this.ignore.defaults, this.tool.config ) );

        if ( this.onstart ) config = await this.onstart( this, config );  // trigger 'onstart' callback
        delete config.key; delete config.parent;                          // delete unneeded properties
        this.logger && this.logger.log( 'start', $.clone( config ) );     // logging of 'start' event

        // prepare slides viewer (used for slides editing)
        slides_viewer = await this.tool.start( {
          comment: '',
          description: config.description,
          'ignore.slides': config.ignore.slides,
          lang: config.lang,
          parent: this,
          'pdf_viewer.2.downloadable': '',
          'pdf_viewer.2.lang': config.pdf_viewer[ 2 ].lang,
          'pdf_viewer.2.pdf': config.pdf_viewer[ 2 ].pdf,
          'pdf_viewer.2.text': config.pdf_viewer[ 2 ].text,
          routing: '',
          text: config.text
        } );
        const div = slides_viewer.element.querySelector( '#control > div:last-child' );
        config.comment ? delete div.dataset.hidden : div.dataset.hidden = true;
        div.dataset.lang = 'commentary_status-title'; div.title = config.text.commentary_status;
        div.firstElementChild.style.cursor = 'default';

        // prepare app builder for commentary
        if ( config.comment ) this.comment_builder.data = config.comment[ 2 ];
        await this.comment_builder.start();
        $.remove( this.comment_builder.element.querySelector( 'footer' ) );

        // render webpage area
        this.render( config );

        // render language selection and user login/logout
        const header = this.element.querySelector( 'header' );
        if ( header ) {
          header && this.lang && !this.lang.getContext() && $.append( header, this.lang.root );
          header && this.user && $.append( header, this.user.root );
        }

        // render slides viewer and app builder for commentary
        $.setContent( this.element.querySelector( '#' + this.component.name + '-viewer' ), slides_viewer.root );
        $.setContent( this.element.querySelector( '#' + this.component.name + '-commentary' ), this.comment_builder.root );

      };

      /**
       * renders the webpage area
       * @param {Object} [config = this.getValue()] - initial app configuration
       */
      this.render = ( config = this.getValue() ) => {
        this.html.render( this.html.main( config, this, events ), this.element );
        this.lang && this.lang.translate();
      }

      /**
       * returns current resulting app configuration
       * @returns {Object} current resulting app configuration
       */
      this.getValue = () => {
        const form_data = $.filterProperties( $.formData( this.element.querySelector( 'form' ) ), 'comment', 'description', 'pdf_viewer', 'section' );
        this.section = form_data.section; delete form_data.section;
        slides_viewer.ignore.slides.forEach( slide => { delete slide._content; delete slide._decription; } );
        $.deepValue( form_data, 'ignore.slides', slides_viewer.ignore.slides );
        const comment = form_data.comment; delete form_data.comment;
        comment ? $.deepValue( form_data, 'comment.2', this.comment_builder.getValue() ) : form_data.comment = false;
        return $.assign( $.clone( config ), form_data );
      };

      /**
       * contains all event handlers
       * @type {Object.<string,Function>}
       */
      const events = {

        /** when the value of an input field changes */
        onChange: async event => {

          // update webpage area
          this.render();

          // changed PDF? => update slides viewer
          if ( event.target.name === 'pdf_viewer.2.pdf' ) {
            const value = this.element.querySelector( 'input[name="pdf_viewer.2.pdf"]' ).value;
            if ( value ) {
              slides_viewer.pdf_viewer.pdf = value;
              delete slides_viewer.ignore.slides;
              await slides_viewer.start();
            }
          }

          // enabled/disabled commentary? => show/hide commentary status for a slide
          if ( event.target.name === 'comment' ) {
            const div = slides_viewer.element.querySelector( '#control > div:last-child' );
            event.target.checked ? delete div.dataset.hidden : div.dataset.hidden = true;
          }

        },

        /** when one of the buttons to expand the slides is clicked */
        onExpandLeft: () => this.element.querySelector( 'input[name="slide_nr"]' ).value = slides_viewer.slide_nr,
        onExpandRight: () => this.element.querySelector( 'input[name="slide_nr"]' ).value = slides_viewer.slide_nr + 1,

        /** when 'submit' event of the form to expand the slides is triggered */
        onExpandSubmit: async event => {
          event.preventDefault();
          const form = this.element.querySelector( '#' + this.component.name + '-expand-form' );
          const form_data = $.formData( form );
          if ( !form_data.expand || !form_data[ form_data.expand ] ) return;
          slides_viewer.slide_nr = parseInt( form_data.slide_nr );
          slides_viewer.ignore.slides.splice( slides_viewer.slide_nr - 1, 0, { content: form_data[ form_data.expand ] } );
          await slides_viewer.start();
          bootstrap.Modal.getInstance( form.querySelector( '.modal' ) ).hide();
          form.reset();
        },

        /** when button for slide settings is clicked */
        onClickSlideSettings: () => {

          // fill HTML form for slide settings with initial values
          const form = this.element.querySelector( '#' + this.component.name + '-settings-form' );
          form.reset();
          const { audio, content, commentary, description } = slides_viewer.ignore.slides[ slides_viewer.slide_nr - 1 ];
          $.fillForm( form, {
            slide: {
              audio: audio || '',
              content: content,
              commentary: commentary !== false,
              description: description
            }
          } );

          // content cannot be changed for slides
          const entry = form.querySelector( '#' + this.component.name + '-settings-content' );
          typeof content === 'number' ? entry.dataset.hidden = true : delete entry.dataset.hidden;

          // slides cannot be deleted
          const button = form.querySelector( '#' + this.component.name + '-settings-delete' );
          typeof content === 'number' ? button.dataset.invisible = true : delete button.dataset.invisible;

        },

        /** when 'submit' event of the HTML form the for slide settings is triggered */
        onSubmitSlideSettings: async event => {
          event.preventDefault();
          const form = this.element.querySelector( '#' + this.component.name + '-settings-form' );
          const form_data = $.formData( form ).slide;
          const slide_data = slides_viewer.ignore.slides[ slides_viewer.slide_nr - 1 ];
          if ( parseInt( form_data.content ) ) delete form_data.content;
          Object.assign( slide_data, form_data );
          slides_viewer.start();
        },

        /** when 'delete' button in the slide settings is clicked */
        onDelete: () => {
          const index = slides_viewer.slide_nr - 1;
          if ( typeof slides_viewer.ignore.slides[ index ].content === 'number' ) return;
          slides_viewer.ignore.slides.splice( index, 1 );
          index && slides_viewer.slide_nr--;
          slides_viewer.start();
        },

        /** when 'preview' button is clicked */
        onPreview: () => {
          const preview_body = this.element.querySelector( '#' + this.component.name + '-preview .modal-body' );
          $.setContent( preview_body, '' );
          this.logger && this.logger.log( 'preview', $.clone( config ) );               // logging of 'preview' event
          this.tool.start( Object.assign( this.getValue(), { root: preview_body } ) );  // render app in preview
        },

        /**
         * when 'submit' event of the main HTML form is triggered
         * @param {Object} event
         */
        onSubmit: event => {
          event.preventDefault();
          const config = this.getValue();                                 // get resulting app configuration
          this.logger && this.logger.log( 'finish', $.clone( config ) );  // logging of 'finish' event
          $.onFinish( this, config );                                     // trigger finish actions
        }

      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
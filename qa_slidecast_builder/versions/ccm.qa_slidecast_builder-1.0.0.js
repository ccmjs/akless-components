/**
 * @overview ccmjs-based web component for building a "Q&A Slidecast"
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version 1.0.0
 * @changes
 * version 1.0.0 (20.10.2021)
 */

( () => {
  const component = {
    name: 'qa_slidecast_builder',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.1.1.min.js',
    version: [ 1, 0, 0 ],
    config: {
      "comment_builder": [ "ccm.instance", "https://ccmjs.github.io/akless-components/config_builder/versions/ccm.config_builder-1.0.0.js", {
        "src": [ "ccm.load", "https://ccmjs.github.io/akless-components/config_builder/resources/comment/resources.mjs#basic" ],
        "libs": "",
        "preview": ""
      } ],
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap.min.css",
          "https://ccmjs.github.io/akless-components/qa_slidecast_builder/resources/styles.min.css"
        ],
        "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap-icons.min.css",
        { "url": "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap-fonts.min.css", "context": "head" },
      ],
//    "data": { "store": [ "ccm.store" ] },
      "defaults": {
        "pdf_viewer.2": {
          "downloadable": true,
          "pdf": "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/demo/en/slides.pdf",
          "text": [ "ccm.load", "https://ccmjs.github.io/akless-components/qa_slidecast_builder/resources/resources.mjs#viewer_en" ]
        },
        "text": [ "ccm.load", "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/resources.mjs#text_en" ]
      },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.8.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/qa_slidecast_builder/resources/templates.mjs" ],
      "id": "qsb",
      "libs": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/bootstrap-5/js/bootstrap.bundle.min.js" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.min.js", "greedy" ] ],
//    "onfinish": { "log": true },
      "preview": true,
      "section": "basis",
      "shadow": "none",
      "text": [ "ccm.load", "https://ccmjs.github.io/akless-components/qa_slidecast_builder/resources/resources.mjs#builder_en" ],
      "tool": [ "ccm.component", "https://ccmjs.github.io/tkless-components/qa_slidecast/versions/ccm.qa_slidecast-2.0.0.min.js" ]
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
       * ccmjs-based instance of "Q&A Slidecast" (used for slides editing)
       * @type {Object}
       */
      let slides_viewer;

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );  // set shortcut to help functions
        delete this.tool.config.parent;                                            // remove no needed parent reference
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );      // logging of 'ready' event
        this.element.classList.add( this.id );                                     // add class as prefix for CSS rules (to compensate Shadow DOM)
      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // set initial app configuration (priority order: [high] this.data -> this.defaults -> this.tool.config [low])
        config = await $.integrate( await $.dataset( this.data ), await $.integrate( this.defaults, this.tool.config ) );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( config ) );

        // prepare slides viewer (used for slides editing)
        slides_viewer = await this.tool.start( {
          parent: this,
          routing: '',
          description: '',
          comment: '',
          text: {},
          'ignore.slides': config.ignore.slides,
          'pdf_viewer.2.pdf': config.pdf_viewer[ 2 ].pdf,
          'pdf_viewer.2.downloadable': '',
          'pdf_viewer.2.text': {}
        } );
        $.remove( slides_viewer.element.querySelector( '#control' ) );

        // start app builder for commentary
        this.comment_builder.data = config.comment[ 2 ];
        await this.comment_builder.start();

        // render webpage area and place
        this.render( config );

        // render slides viewer and app builder for commentary
        $.setContent( this.element.querySelector( '#' + this.id + '-commentary' ), this.comment_builder.root );
        $.setContent( this.element.querySelector( '#' + this.id + '-viewer' ), slides_viewer.root );

      };

      /**
       * renders the webpage area
       * @param {Object} [config = this.getValue()] - initial app configuration
       */
      this.render = ( config = this.getValue() ) => this.html.render( this.html.main( config, this, events ), this.element );

      /**
       * returns current resulting app configuration
       * @returns {Object} current resulting app configuration
       */
      this.getValue = () => {
        const form_data = $.formData( this.element.querySelector( 'form' ) );
        this.section = form_data.section; delete form_data.section;
        const comment = form_data.comment; delete form_data.comment;
        const result = $.clone( config );
        $.assign( result, form_data );
        $.deepValue( result, 'ignore.slides', slides_viewer.ignore.slides );
        comment ? result.comment[ 2 ] = this.comment_builder.getValue() : result.comment = '';
        return result;
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
              await slides_viewer.start();
            }
          }

          // switched to slide settings? => refresh slides viewer
          event.target.name === 'section' && await slides_viewer.pdf_viewer.refresh();

        },

        /** when one of the buttons to expand the slides is clicked */
        onExpandLeft: () => this.element.querySelector( 'input[name="slide_nr"]' ).value = slides_viewer.slide_nr,
        onExpandRight: () => this.element.querySelector( 'input[name="slide_nr"]' ).value = slides_viewer.slide_nr + 1,

        /** when 'submit' event of the form to expand the slides is triggered */
        onExpandSubmit: async event => {
          event.preventDefault();
          const form = this.element.querySelector( '#' + this.id + '-expand-form' );
          const form_data = $.formData( form );
          form_data.slide_nr = parseInt( form_data.slide_nr );
          slides_viewer.ignore.slides.splice( form_data.slide_nr - 1, 0, { content: form_data[ form_data.expand ] } );
          await slides_viewer.start();
          bootstrap.Modal.getInstance( form.querySelector( '.modal' ) ).hide();
          form.reset();
        },

        /** when button for slide settings is clicked */
        onClickSlideSettings: () => {

          // fill HTML form for slide settings with initial values
          const form = this.element.querySelector( '#' + this.id + '-settings-form' );
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
          const entry = form.querySelector( '#' + this.id + '-settings-content' );
          typeof content === 'number' ? entry.dataset.hidden = true : delete entry.dataset.hidden;

          // slides cannot be deleted
          const button = form.querySelector( '#' + this.id + '-settings-delete' );
          typeof content === 'number' ? button.dataset.invisible = true : delete button.dataset.invisible;

        },

        /** when 'submit' event of the HTML form the for slide settings is triggered */
        onSubmitSlideSettings: async event => {
          event.preventDefault();
          const form_data = $.formData( this.element.querySelector( '#' + this.id + '-settings-form' ) ).slide;
          const slide_data = slides_viewer.ignore.slides[ slides_viewer.slide_nr - 1 ];
          if ( parseInt( form_data.content ) ) delete form_data.content;
          Object.assign( slide_data, form_data );
          delete slide_data._content;
          delete slide_data._description;
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
          const preview_body = this.element.querySelector( '#' + this.id + '-preview .modal-body' );
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
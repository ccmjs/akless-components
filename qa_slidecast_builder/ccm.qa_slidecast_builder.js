/**
 * @overview ccmjs-based web component for building a "Q&A Slidecast"
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (19.10.2021)
 */

( () => {
  const component = {
    name: 'qa_slidecast_builder',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.1.1.min.js',
    config: {
      "comment_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/config_builder/versions/ccm.config_builder-1.0.0.js", {
        "src": [ "ccm.load", "https://ccmjs.github.io/akless-components/config_builder/resources/comment/resources.mjs#basic" ],
        "libs": "",
        "text.preview": ""
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
       * ccmjs-based instance of "Q&A Slidecast" for slides configuration
       * @type {Object}
       */
      let slidecast;

      /**
       * ccmjs-based instance for building a commentary
       * @type {Object}
       */
      let comment_builder;

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );  // set shortcut to help functions
        delete this.tool.config.parent;                                            // remove no needed parent reference
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );      // logging of 'ready' event
        this.element.classList.add( 'qsb' );                                       // add class as prefix for CSS rules (to compensate Shadow DOM)
      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // set initial app configuration (priority order: [high] this.data -> this.defaults -> this.tool.config [low])
        config = await $.integrate( await $.dataset( this.data ), await $.integrate( this.defaults, this.tool.config ) );

        comment_builder = await this.comment_builder.start( { data: config.comment[ 2 ] } );  // start app builder for commentary
        this.logger && this.logger.log( 'start', $.clone( config ) );                         // logging of 'start' event
        this.render( config );                                                                // render webpage area

      };

      /**
       * renders the webpage area
       * @param {Object} [config = this.getValue()] - initial app configuration
       */
      this.render = ( config = this.getValue() ) => {
        this.html.render( this.html.main( config, this, events ), this.element );
        $.setContent( this.element.querySelector( '#' + this.id + '-commentary' ), comment_builder.root );
      };

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
        slidecast && $.deepValue( result, 'ignore.slides', slidecast.getValue().slides );
        if ( comment )
          result.comment[ 2 ] = comment_builder.getValue();
        else
          result.comment = '';
        return result;
      };

      const addSlide = ( index, value = 'https://ccmjs.github.io/tkless-components/qa_slidecast/resources/demo/de/extra.jpg' ) => {
        slidecast.ignore.slides.splice( index, 0, { content: value } );
        slidecast.start();
      };

      /**
       * contains all event handlers
       * @type {Object.<string,Function>}
       */
      const events = {

        onAddLeft: () => this.element.querySelector( 'input[name="index"]' ).value = slidecast.slide_nr - 1,

        onAddRight: () => this.element.querySelector( 'input[name="index"]' ).value = slidecast.slide_nr++,

        onAddResource: event => {
          event.preventDefault();
          const form = this.element.querySelector( '#' + this.id + '-add-form' );
          const modal = bootstrap.Modal.getInstance( form.querySelector( '.modal' ) );
          const form_data = $.formData( form );
          addSlide( form_data.index, form_data[ form_data.resource ] );
          modal.hide();
          form.reset();
        },

        onSlideSettings: () => {
          const form = this.element.querySelector( '#' + this.id + '-edit-form' );
          const { audio, content, commentary, description } = slidecast.ignore.slides[ slidecast.slide_nr - 1 ];
          $.fillForm( form, {
            slide: {
              audio: audio || '',
              content: content,
              commentary: commentary !== false,
              description: description
            }
          } );

          const entry = form.querySelector( '#' + this.id + '-edit-content' );
          typeof content === 'number' ? entry.dataset.hidden = true : delete entry.dataset.hidden;

          const button = form.querySelector( '#' + this.id + '-edit-delete' );
          typeof content === 'number' ? button.dataset.invisible = true : delete button.dataset.invisible;

        },

        onSubmitSlideSettings: async event => {
          event.preventDefault();
          const form_data = $.formData( this.element.querySelector( '#' + this.id + '-edit-form' ) );
          const slide = slidecast.ignore.slides[ slidecast.slide_nr - 1 ];
          Object.assign( slide, form_data.slide );
          delete slide._content;
          delete slide._description;
          slidecast.start();
        },

        onDeleteSlide: () => {
          const index = slidecast.slide_nr - 1;
          if ( typeof slidecast.ignore.slides[ index ].content === 'number' ) return;
          slidecast.ignore.slides.splice( index, 1 );
          index && slidecast.slide_nr--;
          slidecast.start();
        },

        /** when the value of an input field changes */
        onChange: async event => {
          if ( event.target.name === 'pdf_viewer.2.pdf' ) { slidecast = null; delete config.ignore.slides; }
          this.render( this.getValue() );
          if ( event.target.name === 'section' && event.target.value === 'slides' && !slidecast )
            slidecast = await this.tool.start( {
              root: this.element.querySelector( '#' + this.id + '-slidecast' ),
              routing: '',
              description: '',
              comment: '',
              text: {},
              'ignore.slides': config.ignore.slides,
              'pdf_viewer.2.pdf': this.element.querySelector( 'input[name="pdf_viewer.2.pdf"]' ).value,
              'pdf_viewer.2.downloadable': '',
              'pdf_viewer.2.text': {},
              onstart: instance => this.html.render( this.html.controls( this, instance, events ), this.element.querySelector( '#' + this.id + '-controls' ) ),
              onchange: ( { instance, before } ) => before && this.html.render( this.html.controls( this, instance, events ), this.element.querySelector( '#' + this.id + '-controls' ) )
            } );
        },

        /** when 'preview' button is clicked */
        onPreview: () => {
          const preview_body = this.element.querySelector( '#' + this.id + '-preview .modal-body' );
          $.setContent( preview_body, '' );
          this.logger && this.logger.log( 'preview', $.clone( config ) );               // logging of 'finish' event
          this.tool.start( Object.assign( this.getValue(), { root: preview_body } ) );  // start preview of the app
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
/**
 * @overview ccmjs-based web component for multilingualism
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version 1.0.0
 * @changes
 * version 1.0.0 (27.12.2021)
 */

( () => {
  const component = {
    name: 'lang',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.1.2.min.js',
    config: {
      "translations": {
        "de": {},
        "en": {}
      },
      "languages": {
        "de": {
          "de": "Deutsch",
          "en": "Englisch"
        },
        "en": {
          "de": "German",
          "en": "English"
        }
      },
//    "active": "en",
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/lang/resources/styles.min.css" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/lang/resources/templates.mjs" ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.8.0.min.mjs" ],
//    "onchange": event => console.log( event )
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * highest instance for multilingualism
       * @type {Object}
       */
      let context;

      /**
       * when the instance is created, when all dependencies have been resolved and before the dependent sub-instances are initialized and ready
       * @returns {Promise<void>}
       */
      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // no initial language? => detect from browser
        if ( !this.active ) this.active = navigator.language.split( '-' )[ 0 ];

        // get highest instance for multilingualism
        context = this.ccm.context.highestByProperty( this, 'lang', true );

        // prepare onchange event listeners
        if ( context )
          context.lang.onchange.push( this.switch );
        else
          this.onchange = this.onchange ? [ this.onchange ] : [];

      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // not highest instance? => empty content
        if ( context ) { this.element.innerHTML = ''; return; }

        // render language selection
        this.html.render( this.html.main( this.languages[ this.active ], this.active, this.switch ), this.element );

      };

      /**
       * returns the active language
       * @returns {string} active language
       */
      this.getValue = () => context ? context.getValue() : this.active;

      /**
       * adds a listener for a language change
       * @param {Function} callback
       */
      this.observe = callback => ( context || this ).onchange.push( callback );

      /**
       * switches the active language and starts translation
       * @param {string} lang - new active language
       */
      this.switch = lang => {
        if ( !this.translations[ lang ] ) return;
        if ( context ) return context.switch( lang );
        this.active = lang;
        this.start();
        this.translate();
        this.onchange && this.onchange.forEach( onchange => onchange( lang ) );
      };

      /**
       * translates an index or translates the content of the parent instance
       * @type {string} [index] - translation index
       * @returns {string} corresponding translation for the given index (if specified)
       */
      this.translate = index => {
        if ( index ) return this.translations[ this.active ][ index ];
        this.parent && this.parent.element.querySelectorAll( '*[data-lang]' ).forEach( elem => {
          elem.dataset.lang.split( ' ' ).forEach( index => {
            const split = index.split( '-' );
            if ( split.length < 1 ) return;
            if ( split[ 1 ] )
              elem.setAttribute( split[ 1 ], this.translations[ this.active ][ split[ 0 ] ] );
            else
              elem.innerHTML = this.translations[ this.active ][ split[ 0 ] ];
          } )
        } );
      }

    }

  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
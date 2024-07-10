/**
 * @overview ccmjs-based web component for multilingualism
 * @author André Kless <andre.kless@web.de> 2021-2022, 2024
 * @license The MIT License (MIT)
 * @version 1.2.0
 * @changes
 * version 1.2.0 (23.04.2024): support for dataset translation, detect initial language from URL parameter
 * version 1.1.0 (11.02.2022): controllable dark mode
 * version 1.0.0 (29.12.2021)
 */

( () => {
  const component = {
    name: 'lang',
    version: [ 1, 2, 1 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.2.0.min.js',
    config: {
//    "active": "en",
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/lang/resources/styles.min.css" ],
      "dark": false,
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/lang/resources/templates.mjs" ],
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
//    "onchange": event => console.log( event ),
      "translations": {
        "de": {},
        "en": {}
      }
    },
    Instance: function () {
      let self  = this;

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

        // get highest instance for multilingualism
        context = ( this.ccm.context.highestByProperty( this, 'lang', true ) || {} ).lang;

        // set initial language
        if ( context )
          this.active = context.active;                                            // detect from highest instance
        else {
          if ( !this.active ) this.active =  new URLSearchParams( window.location.search ).get( 'lang' );  // detect from URL parameter
          if ( !this.active ) this.active = document.body.getAttribute( 'lang' );  // detect from <body lang="">
          if ( !this.active ) this.active = navigator.language;                    // detect from browser
          this.active = this.active.split( '-' )[ 0 ].toLowerCase();
          // no translations for initial language? => use first language that has translations
          if ( !this.translations[ this.active ] ) this.active = Object.keys( this.translations )[ 0 ];
        }

        // prepare onchange event listeners
        if ( context ) {
          context.onchange.push( this.switch );
          this.onchange && context.onchange.push( this.onchange );
          delete this.onchange;
        }
        else
          this.onchange = this.onchange ? [ this.onchange ] : [];

      };

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {

        // setup dark mode
        this.dark === 'auto' && this.element.classList.add( 'dark_auto' );
        this.dark === true && this.element.classList.add( 'dark_mode' );

      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // not the highest instance? => remove root element
        if ( context ) { this.element.innerHTML = ''; return; }

        // render language selection
        //this.html.render( this.html.main( this.languages[ this.active ], this.active, this.switch ), this.element );
        this.html.render( this.html.main(this), this.element );

      };

      /**
       * returns the active language
       * @returns {string} active language
       */
      this.getValue = () => context ? context.getValue() : this.active;

      /** gets highest instance for multilingualism  */
      this.getContext = () => context;

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
        if ( context && context.active !== lang ) return context.switch( lang );
        this.active = lang;
        this.start();
        this.translate();
        this.onchange && this.onchange.forEach( onchange => onchange( lang ) );
      };

      /**
       * translates an index or website area
       * @param {string|Element} [content] - translation index, dataset or website area (default: website area of the parent instance)
       * @returns {string|void} corresponding translation for the given index (if specified)
       */
      this.translate = content => {
        if ( typeof content === 'string' )
          return translateIndex( content );
        else if ( this.ccm.helper.isElement( content ) )
          return translateElement( content );
        else if ( this.ccm.helper.isObject( content ))
          return translateDataset( content );
        else
          return self.parent && translateElement(self.parent.element);
      }

      const translateIndex = index => this.translations[ this.active ][ index ];
      const translateElement = elem => {
        elem.querySelectorAll( '*[data-lang]' ).forEach( elem => {
          elem.dataset.lang.split( ' ' ).forEach( index => {
            if ( !index ) return;
            const split = index.split( '-' );
            let translation = this.ccm.helper.deepValue( this.translations[ this.active ], split[ 0 ] );
            if ( !translation ) return;
            if ( split.length > 2 ) {
              let i = 2;
              translation = translation.replace( /%%/g, match => split[ i++ ] || match );
            }
            if ( split[ 1 ] )
              elem.setAttribute( split[ 1 ], translation );
            else
              elem.innerHTML = translation;
          } );
        } );
      };
      const translateDataset = data => {
        for ( const key in data )
          if ( data[key + '-' + this.active] )
            data[key] = data[key + '-' + this.active];
      };
    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
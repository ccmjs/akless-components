/**
 * @overview ccmjs-based web component for predefined content
 * @author André Kless <andre.kless@web.de> 2016-2022
 * @license The MIT License (MIT)
 * @version 6.1.0
 * @changes
 * version 6.1.0 (11.02.2022): controllable dark mode
 * version 6.0.0 (07.02.2022):
 * - uses ccmjs v27.2.0 as default
 * - uses helper.mjs v8.0.0 as default
 * - renamed 'afterstart' to 'onstart' in config
 * (for older version changes see ccm.dms-5.4.8.js)
 */

( () => {
  const component = {
    name: 'content',
    version: [ 6, 1, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.2.0.min.js',
    config: {
      "components": [],                // contains the components that are reused in the predefined content
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/content/resources/styles.min.css" ],
      "dark": "auto",
      "dependencies": [],              // contains the dependencies on the apps reused in the predefined content
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.0.0.min.mjs" ],
//    "inner": "Hello, World!",        // predefined content (could be given as HTML string, DOM Element Nodes or ccm HTML data)
//    "json2json": json => json,       // converts placeholders to different data structure (placeholders are passed as first parameter)
//    "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.0.0.min.js" ],
//    "onstart": instance => {},       // callback after instances has started
//    "placeholder": { "foo": "bar" }  // replaces all '%foo%' in predefined content with 'bar'
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * when the instance is created, when all dependencies have been resolved and before the dependent sub-instances are initialized and ready
       * @returns {Promise<void>}
       */
      this.init = async () => {

        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );  // set shortcut to help functions
        if ( !this.inner ) this.inner = document.createDocumentFragment();         // no Light DOM? => use empty fragment

        // Light DOM is given as HTML string? => use fragment with HTML string as innerHTML
        if ( typeof this.inner === 'string' ) this.inner = document.createRange().createContextualFragment( this.inner );

        // Light DOM is given as array? => use fragment with array elements as children
        if ( Array.isArray( this.inner ) ) {
          const fragment = document.createDocumentFragment();
          this.inner.forEach( element => fragment.appendChild( $.html( element ) ) );
          this.inner = fragment;
        }

        // dynamic replacement of placeholders
        if ( this.placeholder ) {
          if ( this.json2json ) this.placeholder = this.json2json( this.placeholder );
          [ ...this.inner.children ].forEach( child => child.innerHTML = $.format( child.innerHTML, this.placeholder ) );
        }

        // collect all ccm dependencies in Light DOM
        const self = this; collectDependencies( this.inner );

        /**
         * collects all dependencies in a given HTML element (recursive)
         * @param {Object} element - HTML element
         */
        function collectDependencies( element ) {

          // is ccm Custom Element? => collect dependency
          if ( element.tagName && element.tagName.indexOf( 'CCM-' ) === 0 ) return collectDependency( element );

          // iterate over all child DOM Element Nodes and collect dependencies
          [ ...element.children ].forEach( collectDependency );

          /**
           * collects a dependency from a given HTML element
           * @param element - HTML element
           */
          function collectDependency( element ) {

            // no ccm Custom Element? => abort and collect dependencies inside of it
            if ( element.tagName.indexOf( 'CCM-' ) !== 0 ) return collectDependencies( element );  // recursive call

            // generate ccm dependency out of founded ccm Custom Element
            const component = getComponent(); if ( !component ) return;
            const config = $.generateConfig( element );
            config.parent = self;
            config.root = element;
            self.dependencies.push( $.isComponent( component ) ? [ component, config ] : [ 'ccm.start', component, config ] );

            /**
             * gets object, index or URL of ccm component that corresponds to founded ccm Custom Element
             * @returns {Object|string}
             */
            function getComponent() {

              /**
               * index of ccm component
               * @type {string}
               */
              const index = element.tagName.substr( 4 ).toLowerCase();

              // is a <ccm-app> element? => result is value of component attribute
              if ( index === 'app' ) {
                const component = element.getAttribute( 'component' );
                element.removeAttribute( 'component' );
                return component;
              }

              // has dependency to ccm component? => result is component object
              if ( self.components && self.components[ index ] ) return self.components[ index ];
              if ( $.isComponent( self[ index ] ) ) return self[ index ];

              // component is already registered? => result is component index
              if ( self.ccm.components[ index ] ) return index;

              // search inner HTML of own Custom Element for a source tag that contains the component URL
              const sources = self.inner.querySelectorAll( 'source' );
              for ( let i = 0; i < sources.length; i++ )
                if ( $.convertComponentURL( sources[ i ].getAttribute( 'src' ) ).index === index )
                  return sources[ i ].getAttribute( 'src' );

            }

          }

        }

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

        // render content that is given via Light DOM
        $.setContent( this.element, this.inner );

        // embed dependent components
        for ( let i = 0; i < this.dependencies.length; i++ )
          if ( $.isComponent( this.dependencies[ i ][ 0 ] ) )
            await this.dependencies[ i ][ 0 ].start( this.dependencies[ i ][ 1 ] );
          else
            this.dependencies[ i ] = await $.solveDependency( this.dependencies[ i ] );

        this.lang && this.lang.translate();          // translate content
        this.onstart && await this.onstart( this );  // trigger 'onstart' callback

      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
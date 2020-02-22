/**
 * @overview ccm component for rendering a predefined content
 * @author André Kless <andre.kless@web.de> 2016-2020
 * @license The MIT License (MIT)
 * @version latest (5.4.5)
 * @changes
 * version 5.4.5 (16.02.2020):
 * - uses ccm v25.0.0
 * - bug fix for collect all ccm dependencies in Light DOM
 * version 5.4.4 (13.11.2019):
 * - uses ccm v24.1.0
 * version 5.4.3 (10.10.2019):
 * - uses ccm v24.0.1
 * version 5.4.2 (01.10.2019):
 * - uses ccm v22.7.1
 * version 5.4.1 (24.09.2019):
 * - uses ccm v22.6.2
 * version 5.4.0 (23.09.2019):
 * - added multilingualism support
 * version 5.3.1 (16.09.2019):
 * - uses ccm v22.6.1
 * version 5.3.0 (05.09.2019):
 * - uses ccm v22.5.0
 * - support of <ccm-app> tags in predefined content
 * - support of json2json conversion for placeholder values
 * version 5.2.1 (07.05.2019):
 * - uses ccm v20.3.0
 * version 5.2.0 (06.02.2019):
 * - added after start callback
 * - uses ccm v20.0.0
 * version 5.1.0 (19.12.2018):
 * - collect dependencies only if not already given
 * - look also in this.components for a component dependency
 * - use component index if component is already registered
 * - uses ccm v18.6.6
 * version 5.0.2 (16.12.2018):
 * - uses ccm v18.6.5
 * version 5.0.1 (12.10.2018):
 * - uses ccm v18.0.4
 * version 5.0.0 (08.09.2018):
 * - uses ccm v18.0.0
 * - removed privatization of instance members
 * (for older version changes see ccm.dms-4.0.0.js)
 */

( () => {

  const component = {

    name: 'content',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.0.0.js',

    config: {

  //  "afterstart": function () {},    // callback after instances has started ('this' is the instance)
      "components": [],                // contains the components that are reused in the predefined content
      "dependencies": [],              // contains the dependencies on the apps reused in the predefined content
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.0.1.mjs" ],
  //  "inner": "Hello, World!",        // predefined content (could be given as HTML string, DOM Element Nodes or ccm HTML data)
  //  "json2json": json => json,       // converts placeholders to different data structure (placeholders are passed as first parameter)
  //  "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js" ],
  //  "placeholder": { "foo": "bar" }  // replaces all '%foo%' in predefined content with 'bar'

    },

    Instance: function () {

      let $;

      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper );

        // no Light DOM? => use empty fragment
        if ( !this.inner ) this.inner = document.createDocumentFragment();

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
          if ( element.tagName.indexOf( 'CCM-' ) === 0 ) return collectDependency( element );

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

      this.start = async () => {

        // render content that is given via Light DOM
        $.setContent( this.element, this.inner );

        // embed dependent components
        for ( let i = 0; i < this.dependencies.length; i++ )
          if ( $.isComponent( this.dependencies[ i ][ 0 ] ) )
            await this.dependencies[ i ][ 0 ].start( this.dependencies[ i ][ 1 ] );
          else
            this.dependencies[ i ] = await $.solveDependency( this.dependencies[ i ] );

        // translate content
        this.lang && this.lang.translate();

        // perform 'afterstart' callback
        this.afterstart && this.afterstart.call( this );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
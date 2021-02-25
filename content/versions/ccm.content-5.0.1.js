/**
 * @overview ccmjs-based web component for rendering a predefined content
 * @author André Kless <andre.kless@web.de> 2016-2018
 * @license The MIT License (MIT)
 * @version 5.0.1
 * @changes
 * version 5.0.1 (12.10.2018):
 * - uses ccm v18.0.4
 * version 5.0.0 (08.09.2018):
 * - uses ccm v18.0.0
 * - removed privatization of instance members
 * version 4.0.0 (07.04.2018):
 * - bugfix for replacement of placeholders
 * - uses ccm v16.2.0
 * version 3.1.0 (06.04.2018):
 * - standard configurations specified in component dependencies are considered
 * version 3.0.0 (07.03.2018):
 * - uses ccm v15.0.2
 * - uses ES6 syntax
 * - dynamic replacement of placeholders
 * - dependencies are solved in parallel
 * version 2.0.0 (18.10.2017):
 * - uses ccm v11.5.0 instead of v8.1.0
 * - shortened component backbone
 * - use fragment instead of empty container as default Light DOM
 * - Light DOM can be given as HTML string via 'inner' config property
 * - removed no more needed ccm.helper.protect calls
 * - <source> tag for URL of inner used ccm elements
 * - accept ccm HTML data for config property "inner"
 * version 1.0.0 (28.07.2017)
 */

( function () {

  const component = {

    name: 'content',

    version: [ 5, 0, 1 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.0.4.js',

    config: {

  //  inner: 'Hello, World!',       // predefined content (could be given as HTML string, DOM Element Nodes or ccm HTML data)
  //  placeholder: { foo: 'bar' }   // replaces all '%foo%' in predefined content with 'bar'

    },

    Instance: function () {

      let $;

      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // no Light DOM? => use empty fragment
        if ( !this.inner ) this.inner = document.createDocumentFragment();

        // Light DOM is given as HTML string? => use fragment with HTML string as innerHTML
        if ( typeof this.inner === 'string' ) this.inner = document.createRange().createContextualFragment( this.inner );

        // Light DOM is given as ccm HTML data? => convert to HTML DOM Elements
        if ( $.isObject( this.inner ) && !$.isElementNode( this.inner ) )
          this.inner = $.html( this.inner );

        // dynamic replacement of placeholders
        if ( this.placeholder ) [ ...this.inner.children ].map( child => child.innerHTML = $.format( child.innerHTML, this.placeholder ) );

        // collect all ccm dependencies in Light DOM
        const self = this; if ( !this.dependencies ) this.dependencies = []; collectDependencies( this.inner );

        /**
         * collects all dependencies in given DOM Element Node (recursive)
         * @param {Element} node - DOM Element Node
         */
        function collectDependencies( node ) {

          // iterate over all child DOM Element Nodes
          [ ...node.children ].map( child => {

            // no ccm Custom Element? => abort and collect dependencies inside of it
            if ( child.tagName.indexOf( 'CCM-' ) !== 0 ) return collectDependencies( child );  // recursive call

            // generate ccm dependency out of founded ccm Custom Element
            const component = getComponent(); if ( !component ) return;
            const config = $.generateConfig( child );
            config.parent = self;
            config.root = child;
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
              const index = child.tagName.substr( 4 ).toLowerCase();

              // has dependency to ccm component? => result is component object
              if ( $.isComponent( self[ index ] ) ) return self[ index ];

              // search inner HTML of own Custom Element for a source tag that contains the ccm component URL
              const sources = self.inner.querySelectorAll( 'source' );
              for ( let i = 0; i < sources.length; i++ )
                if ( $.getIndex( sources[ i ].getAttribute( 'src' ) ) === index )
                  return sources[ i ].getAttribute( 'src' );

            }

          } );

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

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
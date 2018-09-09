/**
 * @overview ccm component for a listing
 * @author André Kless <andre.kless@web.de>, 2018
 * @license MIT License
 * @version 2.0.0
 * @changes
 * version 2.0.0 (09.09.2018): uses ccm v18.0.0
 * version 1.0.0 (23.08.2018)
 */

( function () {

  const component = {

    name: 'listing',

    version: [ 2, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.0.0.js',

    config: {

      "html": {
        "main": {
          "id": "entries"
        },
        "entry": {
          "class": "entry"
        }
      },
      "data": [],

  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "sort": ( a, b ) => a < b ? -1 : ( a > b ? 1 : 0 ),
  //  "defaults": {},
  //  "onclick": ( event, element, data, instance ) => {},
  //  "onrender": ( element, data, instance ) => console.log( element, data, instance )

    },

    Instance: function () {

      let $;

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main ) );

        /**
         * contains listing entries
         * @type {Element}
         */
        const entries_elem = this.element.querySelector( '#entries' );

        /**
         * listing entries data
         * @type {Object[]}
         */
        const datasets = await $.dataset( this.data );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( datasets ) );

        // no published components? => abort and mark listing area as empty
        if ( !datasets.length ) { entries_elem.classList.add( 'empty' ); return; }

        // sort entries
        this.sort && datasets.sort( this.sort );

        // render entries
        datasets.forEach( entry_data => {

          // integrate defaults in entry data with lower priority
          entry_data = $.integrate( this.defaults, entry_data, true );

          /**
           * listing entry
           * @type {Element}
           */
          const entry_elem = $.html( this.html.entry, entry_data );

          // add click handler
          if ( this.onclick ) entry_elem.addEventListener( 'click', event => {

            // logging of 'click' event
            this.logger && this.logger.log( 'click', $.clone( entry_data ) );

            // perform given click callback
            this.onclick( event, entry_elem, entry_data, this );

          } );

          // perform given render callback
          this.onrender && this.onrender( entry_elem, entry_data, this );

          // render entry
          entries_elem.appendChild( entry_elem );

        } );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
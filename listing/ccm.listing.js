/**
 * @overview ccm component for a listing
 * @author André Kless <andre.kless@web.de>, 2018
 * @license MIT License
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (23.08.2018)
 */

{
  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'listing',

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {Object}
     */
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

  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "sort": ( a, b ) => a < b ? -1 : ( a > b ? 1 : 0 ),
  //  "defaults": {},
  //  "onclick": ( event, element, data, instance ) => {},
  //  "onrender": ( element, data, instance ) => console.log( element, data, instance )

    },

    /**
     * for creating instances out of this component
     * @constructor
     */
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,function>}
       */
      let $;

      /**
       * is called once after the initialization and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.ready = callback => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // has logger instance? => log 'ready' event
        this.logger && this.logger.log( 'ready', $.filterProperties( this, 'css', 'data', 'defaults', 'html' ) );

        callback();
      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = callback => {

        /**
         * main HTML structure
         * @type {Element}
         */
        $.setContent( this.element, $.html( this.html.main ) );

        /**
         * contains listing entries
         * @type {Element}
         */
        const entries_elem = this.element.querySelector( '#entries' );

        // get published component datasets
        $.dataset( this.data, datasets => {

          // has logger instance? => log 'start' event
          this.logger && this.logger.log( 'start', datasets );

          // no published components? => abort and mark listing area as empty
          if ( datasets.length === 0 ) { entries_elem.classList.add( 'empty' ); callback && callback(); return; }

          // sort entries
          this.sort && datasets.sort( this.sort );

          // render entries
          datasets.map( entry_data => {

            /**
             * listing entry
             * @type {Element}
             */
            const entry_elem = $.html( this.html.entry, $.integrate( this.defaults, entry_data, true ) );

            // add click handler
            if ( this.onclick ) entry_elem.addEventListener( 'click', event => {

              // has logger instance? => log 'click' event
              this.logger && this.logger.log( 'click', entry_data );

              // perform given click callback
              this.onclick( event, entry_elem, entry_data, this );

            } );

            // perform given render callback
            this.onrender && this.onrender( entry_elem, entry_data, this );

            // render entry
            entries_elem.appendChild( entry_elem );

          } );

          callback && callback();
        } );

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}
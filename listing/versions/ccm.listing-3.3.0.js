/**
 * @overview ccm component for a listing
 * @author André Kless <andre.kless@web.de> 2018-2019
 * @license MIT License
 * @version 3.3.0
 * @changes
 * version 3.3.0 (09.10.2019): uses ccm v24.0.1; added optional config.convert
 * version 3.2.0 (24.07.2019): uses ccm v22.2.1; HTML template via HTML file
 * version 3.1.3 (22.06.2019): uses ccm v21.0.1
 * version 3.1.2 (11.06.2019): uses ccm v20.7.3
 * version 3.1.1 (03.06.2019): bug fix for support of multilingualism
 * version 3.1.0 (03.06.2019): support of multilingualism
 * version 3.0.0 (31.05.2019): uses ccm v20.7.2; changed onclick and onrender parameters
 * (for older version changes see ccm.dms-2.0.3.js)
 */

( () => {

  const component = {

    name: 'listing', version: [ 3, 3, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-24.0.1.js',

    config: {

      "data": [],
  //  "convert": async json => json,
  //  "defaults": {},
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/listing/resources/templates.html" ]
  //  "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js" ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onclick": event => console.log( event ),
  //  "onrender": event => console.log( event ),
  //  "sort": ( a, b ) => a < b ? -1 : ( a > b ? 1 : 0 )

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

        // no listing entries? => abort and mark listing area as empty
        if ( !datasets.length ) { entries_elem.classList.add( 'empty' ); return; }

        // sort entries
        this.sort && datasets.sort( this.sort );

        // render entries
        await $.asyncForEach( datasets, async ( entry_data, i ) => {

          // has convert function? => convert entry data
          if ( this.convert ) entry_data = await this.convert( entry_data );

          // integrate defaults in entry data with lower priority
          entry_data = await $.integrate( this.defaults, entry_data, true );

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
            this.onclick( { event: event, entry: entry_elem, data: entry_data, instance: this, nr: i + 1 } );

          } );

          // perform given render callback
          this.onrender && this.onrender( { entry: entry_elem, data: entry_data, instance: this, nr: i + 1 } );

          // render entry
          entries_elem.appendChild( entry_elem );

        } );

        // translate content
        const lang_elem = this.element.querySelector( '#lang' );
        if ( this.lang ) {
          await this.lang.start();
          lang_elem && $.setContent( lang_elem, this.lang.root );
          this.lang.translate();
        }
        else $.removeElement( lang_elem );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
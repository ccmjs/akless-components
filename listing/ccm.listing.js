/**
 * @overview ccm component for a listing
 * @author André Kless <andre.kless@web.de> 2018-2020
 * @license MIT License
 * @version latest (4.1.0)
 * @changes
 * version 4.1.0 (22.05.2020):
 * - uses ccm v25.5.2
 * - added replacement of placeholders
 * - onrender triggers before set of click event
 * version 4.0.0 (21.04.2020):
 * - uses ccm v25.5.0
 * - uses helper.mjs v5.1.0 as default
 * - changed structure of app data
 * - added 'onchange' callback
 * - removed 'onclick' callback (use 'onchange' instead)
 * - changed parameters in logged data
 * - added public method: getEntryData(entry_nr):Object
 * - added public method: getEntryElem(entry_nr):Element
 * - added public method: getValue():Object
 * - added public method: refresh(app_data):void
 * - support of realtime listings
 * - added optional reload button
 * - added optional user authentication
 * (for older version changes see ccm.dms-3.3.0.js)
 */

( () => {

  const component = {

    name: 'listing',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.5.2.js',

    config: {
  //  "convert": async json => json,
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/listing/resources/default.css" ],
      "data": {},
  //  "defaults": {},
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-5.1.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/listing/resources/default.html" ],
  //  "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js" ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onchange": event => console.log( event ),
  //  "onrender": event => console.log( event ),
  //  "reload": true,
  //  "replace": [ [ 'A': 'X' ], [ 'B': 'Y' ], [ 'C': 'Z' ] ],
  //  "sort": ( a, b ) => a < b ? -1 : ( a > b ? 1 : 0 ),
  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.5.0.js" ]
    },

    Instance: function () {

      let $, app, main_elem;

      this.init = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper );  // set shortcut to help functions
        if ( this.user ) this.user.onchange = this.start;       // listen to login/logout events => restart
        if ( $.isDatastore( this.data.store ) ) this.data.store.onchange = this.refresh;  // realtime update
      };

      this.ready = async () => {
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );  // logging of 'ready' event
      };

      this.start = async () => {

        $.setContent( this.element, $.loading( this ) );            // render loading icon
        const app = await $.dataset( this.data );                   // get app data
        if ( !app.entries ) app.entries = [];                       // set default values
        this.logger && this.logger.log( 'start', $.clone( app ) );  // logging of 'start' event
        main_elem = $.html( this.html.main, this.start );           // prepare main HTML structure
        this.sort && app.entries.sort( this.sort );                 // sort listing entries
        await this.refresh( app );                                  // update own content

        // render top container
        !this.reload && $.remove( main_elem.querySelector( '#reload' ) );
        if ( this.lang ) { $.append( main_elem.querySelector( '#top' ), this.lang.root ); this.lang.start(); }
        if ( this.user ) { $.append( main_elem.querySelector( '#top' ), this.user.root ); this.user.start(); }

        $.setContent( this.element, main_elem );  // show prepared main HTML structure (removes loading icon)
        this.lang && this.lang.translate();       // translate own content

      };

      /**
       * returns the local data of a specific listing entry
       * @param {number} entry_nr - entry number
       * @returns {Object}
       */
      this.getEntryData = entry_nr => $.clone( app.entries[ entry_nr - 1 ] );

      /**
       * returns the container of a specific listing entry
       * @param {number} entry_nr - entry number
       * @returns {Element}
       */
      this.getEntryElem = entry_nr => main_elem.querySelectorAll( '.entry' )[ entry_nr - 1 ];

      /**
       * returns current app data
       * @returns {Object}
       */
      this.getValue = () => $.clone( app );

      /**
       * updates own content and local app data after app data has changed
       * @param {Object} app_data - updated app data
       */
      this.refresh = app_data => { app = app_data; renderEntries(); }

      /**
       * renders each entry in the listing container
       * @returns {Promise<void>}
       */
      const renderEntries = () => $.asyncForEach( app.entries, ( entry, i ) => renderEntry( i + 1 ) );

      /**
       * adds or updates a single listing entry in the listing container
       * @param {number} [entry_nr] - entry number (default: adds a new entry)
       * @returns {Promise<void>}
       */
      const renderEntry = async entry_nr => {

        let entry_data = this.getEntryData( entry_nr );                     // get entry data
        if ( this.convert ) entry_data = await this.convert( entry_data );  // convert entry data
        entry_data = await $.integrate( this.defaults, entry_data, true );  // integrate default values
        const entry_elem = $.html( this.html.entry, $.toDotNotation( entry_data ) );  // create entry container

        // replace placeholder and trigger 'onrender' callback
        this.replace && this.replace.forEach( replace => entry_elem.innerHTML = entry_elem.innerHTML.split( replace[ 0 ] ).join( replace[ 1 ] ) );
        this.onrender && this.onrender( { nr: entry_nr, data: $.clone( entry_data ), elem: entry_elem, instance: this } );

        // set click event: trigger 'onchange' callback and log 'click' event
        entry_elem.addEventListener( 'click', () => {
          this.logger && this.logger.log( 'click', { entry: $.clone( entry_data ), nr: entry_nr } );
          this.onchange && this.onchange( { event: 'click', nr: entry_nr, data: $.clone( entry_data ), elem: entry_elem, instance: this } );
        } );

        // add or update entry in the listing container
        if ( entry_nr )
          $.append( main_elem.querySelector( '#entries' ), entry_elem );
        else
          $.replace( this.getEntryElem( entry_nr ), entry_elem );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
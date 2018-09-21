/**
 * @overview ccm component for rendering a menu
 * @author André Kless <andre.kless@web.de> 2015-2016, 2018
 * @license The MIT License (MIT)
 * @version 2.0.0
 * @changes
 * version 2.0.0 (08.09.2018):
 * - uses ccm v18.0.0
 * - supports optional deselection of active menu entry
 * version 1.2.1 (18.07.2018): bugfix for onclick callback
 * version 1.2.0 (04.07.2018):
 * - added HTML class 'active' for selected menu entry
 * - uses ccm v16.7.0
 * version 1.1.0 (13.05.2018):
 * - no privatization
 * - updated logged event data
 * - updated menu entry content and click handling
 * version 1.0.0 (09.05.2018): modernisation of old menu component
 */

( function () {

  const component = {

    name: 'menu',

    version: [ 2, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.0.0.js',

    config: {

      "html": {
        "main": {
          "id": "main",
          "inner": [
            { "id": "entries" },
            { "id": "content" }
          ]
        },
        "entry": {
          "class": "entry",
          "onclick": "%click%",
          "inner": {
            "class": "title"
          }
        }
      },
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/menu/resources/default.css" ],
      "data": { "store": [ "ccm.store" ] }

  //  "deselectable": true,
  //  "selected": 2,
  //  "onclick": ( event_data, instance ) => console.log( event_data, instance ),
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ]

    },

    Instance: function () {

      let $;

      this.init = async () => {

        // no given Light DOM? => abort
        if ( !this.inner ) return;

        // determine dataset for rendering via Light DOM
        const entries = [];
        [ ...this.inner.children ].forEach( child => {
          if ( child.tagName && child.tagName === 'ENTRY' )
            entries.push( { title: child.getAttribute( 'title' ), content: child.innerHTML } );
        } );
        this.data = { entries: entries };

      };

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // get dataset for rendering
        const dataset = await $.dataset( this.data );

        // has logger instance? => log 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main ) );

        /**
         * contains menu entries
         * @type {Element}
         */
        const entries_elem = this.element.querySelector( '#entries' );

        /**
         * contains menu entry content
         * @type {Element}
         */
        const content_elem = this.element.querySelector( '#content' );

        // render menu entries
        const self = this; dataset.entries && dataset.entries.forEach( renderMenuEntry );

        // want specific preselected menu entry?  => trigger click event
        this.selected && entries_elem.querySelectorAll( '.entry' )[ this.selected - 1 ].click();

        /**
         * renders a menu entry
         * @param {Object|string} entry_data - menu entry data or title
         * @param {number} i - array index of menu entry
         */
        function renderMenuEntry( entry_data, i ) {

          /**
           * menu entry
           * @type {Element}
           */
          const entry_elem = $.html( self.html.entry, { click: onClick } );

          // entry is given as string? => use it as menu entry title without content
          if ( typeof entry_data === 'string' ) entry_data = { title: entry_data };

          // add menu entry title
          $.setContent( entry_elem.querySelector( '.title' ), $.html( entry_data.title ) );

          // add menu entry to other entries
          entries_elem.appendChild( entry_elem );

          /** when menu entry is clicked */
          async function onClick() {

            /**
             * clicked entry is already selected entry
             * @type {boolean}
             */
            const selected = entry_elem.classList.contains( 'selected' );

            /**
             * clicked menu entry event data
             * @type {Object}
             */
            const event_data = { title: entry_elem.textContent, nr: i + 1, selected: selected };

            // logging of 'click' event
            self.logger && self.logger.log( 'click', $.clone( event_data ) );

            // unselect selected menu entry (if any)
            const selected_entry = entries_elem.querySelector( '.entry.selected' );
            if ( selected_entry ) selected_entry.classList.remove( 'selected', 'active' );

            // select clicked menu entry
            if ( !selected || !self.deselectable ) entry_elem.classList.add( 'selected', 'active' );

            // clear menu entry content
            self.deselectable && $.setContent( content_elem, '' );

            // clicked already selected entry? => abort
            if ( selected ) return;

            // render menu entry content
            await renderContent();

            // perform menu entry actions
            performActions();

            /**
             * renders menu entry content
             * @returns {Promise}
             */
            async function renderContent() {

              // content is given as ccm dependency? => solve dependency
              entry_data.content = await $.solveDependency( entry_data.content );

              // no menu entry content? => abort
              if ( !entry_data.content ) return;

              // content is ccm instance? => render instance as content
              if ( $.isInstance( entry_data.content ) ) {
                $.setContent( content_elem, entry_data.content.root );
                entry_data.content.parent = self;
                await entry_data.content.start();
              }

              // has content component? => render content via content component
              else if ( self.content ) await self.content.start( { root: content_elem, inner: entry_data.content } );

              // render given content
              else $.setContent( content_elem, $.html( entry_data.content ) );

            }

            /** performs menu entry actions */
            function performActions() {

              // add element of menu entry content to event data
              event_data.content = content_elem;

              // perform menu entry actions
              if ( entry_data.actions )
                if ( typeof ( entry_data.actions ) === 'function' )
                  entry_data.actions( $.clone( event_data ), self );
                else
                  entry_data.actions.forEach( action => $.action( [ action[ 0 ], event_data, self ] ) );

              // perform callback for clicked menu entry
              self.onclick && $.action( [ self.onclick, $.clone( event_data ), self ] );

            }

          }

        }

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
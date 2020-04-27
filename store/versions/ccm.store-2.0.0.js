/**
 * @overview ccm component for data storage management
 * @author André Kless <andre.kless@web.de> 2019-2020
 * @license The MIT License (MIT)
 * @version 2.0.0
 * @changes
 * version 2.0.0 (28.03.2020)
 * - uses ccm v25.2.1
 * - uses Bootstrap 4 via CDN as default
 * - uses helper.mjs v4.2.0 as default
 * - uses HTML templates via templates.html
 * - getValue() returns data sets as associative array
 * - added 'Show' buttons in table for display a data set completely
 * - added permission checks to remove no needed buttons
 * - no global loading of bootstrap 4 as default
 * (for older version changes see ccm.store-1.0.1.js)
 */

( () => {

  const component = {

    name: 'store', version: [ 2, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.2.1.js',

    config: {
      "builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-2.1.0.js", { "directly": true, "height": "100px" } ],
      "css": [ "ccm.load",
        "https://ccmjs.github.io/akless-components/store/resources/default.css",
        "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      ],
      "data": {
        "store": [ "ccm.store" ],
        "key": {}
      },
      "empty": "There are currently no accessible data sets in this data storage.",
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.2.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/store/resources/templates.html" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.3.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "overwrite": "Already exists. Overwrite?",
//    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.4.0.js" ],
      "wrong": "Something went wrong."
    },

    Instance: function () {

      let $, store; const self = this;

      this.ready = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper );                 // set shortcut to help functions
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );  // log of 'ready' event
      };

      this.start = async () => {

        const datasets = await $.dataset( this.data );               // get relevant data sets from data storage
        store = await this.ccm.store( datasets );                    // store data sets in a local data storage
        this.logger && this.logger.log( 'start', this.getValue() );  // log of 'start' event

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, {
          store: this.data.store.source().name,
          oncreate: async () => {

            /**
             * new dataset with generated unique key
             * @type {ccm.types.dataset}
             */
            const dataset = { key: $.generateKey() };

            // render dataset view
            $.setContent( this.element.querySelector( '#main' ), $.html( this.html.dataset, {
              key: dataset.key.toString(),
              editable: false,
              onback: this.start,
              onsave: event => save( event.target, editor.getValue() )
            } ) );

            $.remove( this.element.querySelector( '#edit' ) ); // remove no needed 'Edit' button
            $.remove( this.element.querySelector( '#del' ) );  // remove no needed 'Delete' button
            const editor = await renderEditor( dataset );      // render editor

          },
          onclear: async () => {

            // make sure user knows what he is doing
            if ( !confirm( 'Are you sure?' ) ) return;

            // delete all accessible data sets
            await $.asyncForEach( datasets, dataset => $.hasPermission( dataset, this.user, 'del' ) && this.data.store.del( dataset.key ) );

            alert( 'Cleared!' );  // success message
            await this.start();   // restart app

          }
        } ) );

        // no data sets? => remove no needed clear button and change table caption
        if ( !datasets.length ) {
          $.remove( this.element.querySelector( '#clear' ) );
          $.setContent( this.element.querySelector( '#caption' ), this.empty );
        }
        else {
          let del_exists = false;

          // render table dataset entries
          datasets.forEach( dataset => {

            /**
             * renders dataset view for dataset editing
             * @type {function}
             * @returns {Promise<void>}
             */
            const edit = async () => {

              // render dataset view
              $.setContent( this.element.querySelector( '#main' ), $.html( this.html.dataset, {
                key: dataset.key.toString(),
                editable: true,
                onback: this.start,
                onrename: async event => {

                  /**
                   * new dataset key
                   * @type {string}
                   */
                  const new_key = event.target.innerHTML = event.target.innerText.trim();

                  /**
                   * old dataset key
                   * @type {string}
                   */
                  const old_key = dataset.key;

                  // key has not changed? => abort
                  if ( new_key === old_key ) return;

                  // invalid key? => abort (inform user and restore original key)
                  if ( !$.regex( 'key' ).test( new_key ) ) { alert( 'Invalid Key' ); event.target.innerHTML = old_key; return; }

                  // make sure user knows what he is doing (abort => restore original key)
                  if ( !confirm( 'Are you sure?' ) ) return event.target.innerHTML = old_key;

                  // new dataset key already exists? => let user decide (abort => restore original key)
                  if ( await this.data.store.get( new_key ) )
                    if ( !confirm( this.overwrite ) ) return event.target.innerHTML = old_key;

                  // set dataset with new key in data store
                  dataset.key = new_key;
                  let result = await this.data.store.set( dataset );

                  if ( !$.isKey( result ) ) return alert( this.wrong );  // result is no dataset key? => something went wrong
                  result = await this.data.store.del( old_key );         // delete dataset with old key in datastore
                  if ( result !== true ) return alert( this.wrong );     // result is not 'true'? => something went wrong

                  alert( 'Saved!' );  // success message
                  this.start();       // restart app

                },
                onsave: event => save( event.target, editor.getValue() ),
                ondel: del
              } ) );

              $.remove( this.element.querySelector( '#edit' ) );                  // => remove 'Edit' button
              this.element.querySelector( '#save' ).classList.add( 'disabled' );  // disable 'Save' button (because nothing has changed yet) or remove it (access denied)
              if ( !$.hasPermission( dataset, this.user, 'del' ) )                // no permission for delete?
                $.remove( this.element.querySelector( '#del' ) );                 // => remove 'Delete' button
              const editor = await renderEditor( dataset );                       // render editor

            };

            /**
             * deletes dataset in datastore
             * @type {function}
             * @returns {Promise<void>}
             */
            const del = async () => {

              if ( !confirm( 'Are you sure?' ) ) return;                // make sure user knows what he is doing
              const result = await this.data.store.del( dataset.key );  // delete dataset in datastore
              if ( result !== true ) return alert( this.wrong );        // result is not 'true'? => something went wrong

              alert( 'Deleted!' );  // success message
              await this.start();   // restart app

            };

            // add dataset entry in table
            let entry;
            $.append( this.element.querySelector( '#entries' ), entry = $.html( this.html.entry, {
              key: dataset.key.toString(),
              onshow: async () => {

                // render dataset view
                $.setContent( this.element.querySelector( '#main' ), $.html( this.html.dataset, {
                  key: dataset.key.toString(),
                  editable: false,
                  onback: this.start,
                  onedit: edit
                } ) );

                // render dataset as JSON
                this.element.querySelector( '#editor' ).innerHTML = `<code><pre>${ $.stringify( dataset, null, 4 ) }</pre></code>`;

                // => remove unneeded buttons
                !$.hasPermission( dataset, this.user, 'set' ) && $.remove( this.element.querySelector( '#edit' ) );
                $.remove( this.element.querySelector( '#save' ) );
                $.remove( this.element.querySelector( '#del' ) );

              },
              onedit: edit,
              ondel: del
            } ) );

            // no permission for edit/delete? => remove edit/delete button
            !$.hasPermission( dataset, this.user, 'set' ) && $.remove( entry.querySelector( '.edit' ) );
            !$.hasPermission( dataset, this.user, 'del' ) ? $.remove( entry.querySelector( '.del' ) ) : del_exists = true;

          } );

          // user has no delete permission for any dataset? => remove clear button
          !del_exists && $.remove( this.element.querySelector( '#clear' ) );

        }

        /**
         * saves dataset in datastore
         * @param {Element} button - clicked save button
         * @param {ccm.types.dataset} dataset
         * @returns {Promise<void>}
         */
        async function save( button, dataset ) {

          if ( button.classList.contains( 'disabled' ) ) return;  // button is disabled? => abort
          let result = await self.data.store.del( dataset.key );  // delete old version of dataset in datastore
          if ( result !== true ) return alert( self.wrong );      // result is not 'true'? => something went wrong
          result = await self.data.store.set( dataset );          // set dataset with new key in data store
          if ( !$.isKey( result ) ) return alert( self.wrong );   // result is no dataset key? => something went wrong

          alert( 'Saved!' );    // success message
          await self.start();   // restart app

        }

        /**
         * renders dataset editor
         * @param {ccm.types.dataset} dataset
         * @returns {Promise<ccm.types.instance>}
         */
        async function renderEditor( dataset ) {

          const local = {}; local[ dataset.key ] = dataset;

          return self.builder.start( {
            root: self.element.querySelector( '#editor' ),
            data: {
              store: [ 'ccm.store', { local: local } ],
              key: dataset.key
            },
            nosubmit: true,
            oninput: function () { self.element.querySelector( '#save' ).classList[ this.isValid() && $.stringify( this.getValue() ) !== $.stringify( dataset ) ? 'remove' : 'add' ]( 'disabled' ); }
          } );

        }

      };

      /**
       * returns current result data
       * @returns {Object} current result data
       */
      this.getValue = () => $.clone( store.local );

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
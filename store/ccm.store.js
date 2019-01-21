/**
 * @overview ccm component for managing a data store
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 * @version 1.0.0
 * @changes
 * version 1.0.0 (21.01.2019)
 */

( function () {

  const component = {

    name: 'store',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {

      "html": {
        "main": {
          "id": "main",
          "inner": {
            "id": "store",
            "inner": [
              {
                "id": "title",
                "class": "page-header",
                "inner": {
                  "tag": "h2",
                  "inner": [
                    "Data Store",
                    {
                      "tag": "small",
                      "class": "text-primary",
                      "inner": "%store%"
                    },
                    {
                      "tag": "button",
                      "class": "btn btn-sm btn-success",
                      "inner": "Create Dataset",
                      "onclick": "%oncreate%"
                    },
                    {
                      "tag": "button",
                      "id": "clear",
                      "class": "btn btn-sm btn-secondary",
                      "inner": "Clear All",
                      "onclick": "%onclear%"
                    }
                  ]
                }
              },
              {
                "tag": "table",
                "class": "table table-striped table-hover",
                "inner": [
                  {
                    "tag": "tbody",
                    "id": "entries"
                  }
                ]
              },
              {
                "tag": "caption",
                "id": "caption",
                "inner": "List of all accessible data sets of this data store."
              }
            ]
          }
        },
        "entry": {
          "tag": "tr",
          "inner": [
            {
              "tag": "td",
              "class": "font-weight-bold",
              "inner": "%key%"
            },
            {
              "tag": "td",
              "inner": [
                {
                  "tag": "button",
                  "class": "btn btn-sm btn-primary",
                  "inner": "Edit",
                  "onclick": "%onedit%"
                },
                {
                  "tag": "button",
                  "class": "btn btn-sm btn-danger",
                  "inner": "Delete",
                  "onclick": "%ondel%"
                }
              ]
            }
          ]
        },
        "dataset": {
          "id": "dataset",
          "inner": [
            {
              "id": "back",
              "class": "btn btn-link",
              "inner": "&larr; Back to Data Store",
              "onclick": "%onback%"
            },
            {
              "id": "title",
              "class": "page-header",
              "inner": {
                "tag": "h2",
                "inner": [
                  "Data Set",
                  {
                    "tag": "small",
                    "class": "text-primary",
                    "inner": "%key%",
                    "contenteditable": "%editable%",
                    "onblur": "%onrename%"
                  },
                  {
                    "tag": "button",
                    "id": "save",
                    "class": "btn btn-sm btn-success",
                    "inner": "Save",
                    "onclick": "%onsave%"
                  },
                  {
                    "tag": "button",
                    "id": "del",
                    "class": "btn btn-sm btn-danger",
                    "inner": "Delete",
                    "onclick": "%ondel%"
                  }
                ]
              }
            },
            { "id": "editor" }
          ]
        }
      },
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/store/resources/default.css", "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css" ],
      "data": {
        "store": [ "ccm.store" ],
        "key": {}
      },
      "empty": "There are currently no accessible data sets in this data store.",
      "wrong": "Something went wrong.",
      "overwrite": "Already exists. Overwrite?",
      "builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.3.0.js", { "html.inner.1": "", "directly": true } ]

  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ]

    },

    Instance: function () {

      let $; const self = this;

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // login user, if not logged in
        this.user && await this.user.login();

        // get existing app state data
        const datasets = await $.dataset( this.data );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( datasets ) );

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
              key: dataset.key,
              editable: false,
              onback: this.start,
              onsave: async event => {

                // button is disabled? => abort
                if ( event.target.classList.contains( 'disabled' ) ) return;

                // create dataset in datastore
                const result = await this.data.store.set( editor.getValue() );

                // result is no dataset key? => something went wrong
                if ( !$.isKey( result ) ) return alert( this.wrong );

                alert( 'Saved!' );    // success message
                await this.start();   // restart app

              }
            } ) );

            // remove no needed 'Delete' button
            $.removeElement( this.element.querySelector( '#del' ) );

            // render editor
            const editor = await this.builder.start( {
              root: this.element.querySelector( '#editor' ),
              data: dataset,
              oninput: function () { self.element.querySelector( '#save' ).classList[ this.isValid() && $.stringify( this.getValue() ) !== $.stringify( dataset ) ? 'remove' : 'add' ]( 'disabled' ); }
            } );

          },
          onclear: async event => {

            // make sure user knows what he is doing
            if ( !confirm( 'Are you sure?' ) ) return;

            // delete all accessible datasets
            await $.asyncForEach( datasets, dataset => this.data.store.del( dataset.key ) );

            alert( 'Cleared!' );  // success message
            await this.start();   // restart app

          }
        } ) );

        // empty datastore? => remove no needed clear button and change table caption
        if ( !datasets.length ) {
          $.removeElement( this.element.querySelector( '#clear' ) );
          $.setContent( this.element.querySelector( '#caption' ), this.empty );
        }

        // render table dataset entries
        datasets.forEach( dataset => {

          /**
           * deletes dataset in datastore
           * @type {function}
           * @returns {Promise<void>}
           */
          const del = async () => {

            // make sure user knows what he is doing
            if ( !confirm( 'Are you sure?' ) ) return;

            // delete dataset in datastore
            const result = await this.data.store.del( dataset.key );

            // result is not 'true'? => something went wrong
            if ( result !== true ) return alert( this.wrong );

            alert( 'Deleted!' );  // success message
            await this.start();   // restart app

          };

          // add dataset entry in table
          $.append( this.element.querySelector( '#entries' ), $.html( this.html.entry, {
            key: dataset.key,
            onedit: async () => {

              // render dataset view
              $.setContent( this.element.querySelector( '#main' ), $.html( this.html.dataset, {
                key: dataset.key,
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

                  // result is no dataset key? => something went wrong
                  if ( !$.isKey( result ) ) return alert( this.wrong );

                  // delete dataset with old key in datastore
                  result = await this.data.store.del( old_key );

                  // result is not 'true'? => something went wrong
                  if ( result !== true ) return alert( this.wrong );

                  alert( 'Saved!' );  // success message
                  this.start();       // restart app

                },
                onsave: async event => {

                  // button is disables? => abort
                  if ( event.target.classList.contains( 'disabled' ) ) return;

                  // update dataset in datastore
                  const result = await this.data.store.set( editor.getValue() );

                  // result is no dataset key? => something went wrong
                  if ( !$.isKey( result ) ) return alert( this.wrong );

                  alert( 'Saved!' );  // success message
                  this.start();       // restart app

                },
                ondel: del
              } ) );

              // disable 'Save' button (because nothing has changed yet)
              this.element.querySelector( '#save' ).classList.add( 'disabled' );

              // render editor
              const editor = await this.builder.start( {
                root: this.element.querySelector( '#editor' ),
                data: dataset,
                oninput: function () { self.element.querySelector( '#save' ).classList[ this.isValid() && $.stringify( this.getValue() ) !== $.stringify( dataset ) ? 'remove' : 'add' ]( 'disabled' ); }
              } );

            },
            ondel: del
          } ) );

        } );

      };

      /**
       * returns current result data
       * @returns {Object} current result data
       */
      this.getValue = () => $.clone( dataset );

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
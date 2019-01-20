/**
 * @overview ccm component for managing a data store
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (19.01.2019)
 */

( function () {

  const component = {

    name: 'store',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {

      "html": {
        "main": {
          "id": "main",
          "inner": [
            {
              "id": "store",
              "class": "active",
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
                  "inner": "List of all accessible data sets of the data store."
                }
              ]
            },
            { "id": "dataset" }
          ]
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
                    "contenteditable": true,
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
      "builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.2.0.js", { "html.inner.1": "", "directly": true } ]

  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ]

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
            this.element.querySelector( '.active' ).classList.remove( 'active' );
            const dataset = { key: $.generateKey() };
            $.replace( this.element.querySelector( '#dataset' ), $.html( this.html.dataset, {
              key: dataset.key,
              onback: this.start,
              onsave: async event => {
                if ( event.target.classList.contains( 'disabled' ) ) return;
                await this.data.store.set( editor.getValue() );
                alert( 'Saved!' );
                await this.start();
              }
            } ) );
            const dataset_elem = this.element.querySelector( '#dataset' );
            $.removeElement( dataset_elem.querySelector( '#del' ) );
            const editor = await this.builder.start( {
              root: this.element.querySelector( '#editor' ),
              data: dataset,
              oninput: function () { dataset_elem.querySelector( '#save' ).classList[ this.isValid() ? 'remove' : 'add' ]( 'disabled' ) }
            } );
            dataset_elem.classList.add( 'active' );
          },
          onclear: async event => {
            if ( !confirm( 'Are you sure?' ) ) return;
            await $.asyncForEach( datasets, dataset => this.data.store.del( dataset.key ) );
            alert( 'Cleared!' );
            await this.start();
          }
        } ) );

        if ( this.user && this.element.querySelector( '#user' ) )
          $.setContent( this.element.querySelector( '#user' ), this.user.root );

        if ( !datasets.length ) {
          $.removeElement( this.element.querySelector( '#clear' ) );
          $.setContent( this.element.querySelector( '#caption' ), this.empty );
        }

        datasets.forEach( dataset => {
          const del = async () => {
            if ( !confirm( 'Are you sure?' ) ) return;
            await this.data.store.del( dataset.key );
            alert( 'Deleted!' );
            await this.start();
          };
          $.append( this.element.querySelector( '#entries' ), $.html( this.html.entry, {
            key: dataset.key,
            onedit: async () => {
              this.element.querySelector( '.active' ).classList.remove( 'active' );
              $.replace( this.element.querySelector( '#dataset' ), $.html( this.html.dataset, {
                key: dataset.key,
                onback: this.start,
                onrename: async event => {
                  const new_key = event.target.innerHTML = event.target.innerText.trim();
                  const old_key = dataset.key;
                  if ( new_key === dataset.key ) return;
                  if ( !$.regex( 'key' ).test( new_key ) ) { alert( 'Invalid Key' ); event.target.innerHTML = old_key; return; }
                  if ( !confirm( 'Are you sure?' ) ) return event.target.innerHTML = old_key;
                  if ( await this.data.store.get( new_key ) )
                    if ( !confirm( 'Already exists. Overwrite?' ) ) return event.target.innerHTML = old_key;
                  dataset.key = new_key;
                  await this.data.store.set( dataset );
                  await this.data.store.del( old_key );
                  alert( 'Saved!' );
                },
                onsave: async event => {
                  if ( event.target.classList.contains( 'disabled' ) ) return;
                  await this.data.store.set( editor.getValue() );
                  alert( 'Saved!' );
                },
                ondel: del
              } ) );
              const dataset_elem = this.element.querySelector( '#dataset' );
              const editor = await this.builder.start( {
                root: this.element.querySelector( '#editor' ),
                data: dataset,
                oninput: function () { dataset_elem.querySelector( '#save' ).classList[ this.isValid() ? 'remove' : 'add' ]( 'disabled' ) }
              } );
              dataset_elem.classList.add( 'active' );
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
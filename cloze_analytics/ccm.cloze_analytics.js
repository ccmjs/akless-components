/**
 * @overview ccm component for rendering fill-in-the-blank analytics
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 * @version 1.0.0
 * @changes
 * version 1.0.0 (11.05.2018)
 */

{
  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'cloze_analytics',

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
          "id": "main",
          "inner": [
            { "id": "menu" },
            { "id": "content" }
          ]
        },
        "results": {
          "id": "section-results",
          "inner": [
            {
              "id": "inputs",
              "inner": [
                {
                  "id": "section-results-user-entry",
                  "class": "entry",
                  "inner": [
                    {
                      "tag": "label",
                      "id": "section-results-user-label",
                      "for": "section-results-user-input",
                      "inner": "User"
                    },
                    {
                      "tag": "select",
                      "id": "section-results-user-input",
                      "class": "form-control",
                      "onchange": "%onchange%",
                      "inner": [ { "tag": "option" } ]
                    }
                  ]
                },
                {
                  "id": "section-results-key-entry",
                  "class": "entry",
                  "inner": [
                    {
                      "tag": "label",
                      "id": "section-results-key-label",
                      "for": "section-results-key-input",
                      "inner": "Cloze"
                    },
                    {
                      "tag": "select",
                      "id": "section-results-key-input",
                      "class": "form-control",
                      "onchange": "%onchange%",
                      "inner": [ { "tag": "option" } ]
                    }
                  ]
                }
              ],
            },
            { "id": "table" }
          ]
        }
      },
      "css": [ "ccm.load",
        "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
        "https://ccmjs.github.io/akless-components/cloze_analytics/resources/default.css"
      ],
      "results": [ "ccm.store" ],
      "sections": {},
      "menu": [ "ccm.instance", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/menu/resources/configs.js", "bootstrap" ] ]

  //  "table": [ "ccm.component", "https://ccmjs.github.io/tkless-components/table/ccm.table.js" ],
  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-4.0.1.js" ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ]

    },

    /**
     * for creating instances out of this component
     * @constructor
     */
    Instance: function () {

      /**
       * own reference for inner functions
       * @type {Instance}
       */
      const self = this;

      /**
       * privatized instance members
       * @type {Object}
       */
      let my;

      /**
       * shortcut to help functions
       * @type {Object.<string,function>}
       */
      let $;

      /**
       * is called once after all dependencies are solved and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.init = callback => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        callback();
      };

      /**
       * is called once after the initialization and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.ready = callback => {

        // privatize all possible instance members
        my = $.privatize( self );

        // has logger instance? => log 'ready' event
        self.logger && self.logger.log( 'ready', $.clone( my ) );

        callback();
      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = callback => {

        // has logger instance? => log 'start' event
        self.logger && self.logger.log( 'start' );

        /**
         * main HTML structure
         * @type {Element}
         */
        const main_elem = $.html( my.html.main );

        /**
         * contains section content
         * @type {Element}
         */
        const content_elem = main_elem.querySelector( '#content' );

        /**
         * contains render function for each section
         * @type {{results: results}}
         */
        const sections = {

          results: () => {

            my.store.get( '{}', results => {

              $.setContent( content_elem, $.html( my.html.results, { onchange: updateTable } ) );

              const user_elem = content_elem.querySelector( '#section-results-user-input' );
              const  key_elem = content_elem.querySelector( '#section-results-key-input'  );

              results.map( result => {
                if ( !Array.isArray( result.key ) || result.key.length < 2 ) return;
                if ( !content_elem.querySelector( '#section-results-user-input option[value="'+result.key[0]+'"]' ) ) $.append( user_elem, $.html( { tag: 'option', value: result.key[ 0 ], inner: result.key[ 0 ] } ) );
                if ( !content_elem.querySelector( '#section-results-key-input  option[value="'+result.key[1]+'"]' ) ) $.append(  key_elem, $.html( { tag: 'option', value: result.key[ 1 ], inner: result.key[ 1 ] } ) );
              } );

              updateTable();

              function updateTable() {

                const user_value = user_elem.value;
                const  key_value =  key_elem.value;

                let query;
                     if (  user_value && !key_value ) query = { "_id": { $regex: '^' + user_value + ',' } };
                else if ( !user_value &&  key_value ) query = { "_id": { $regex: ',' +  key_value + '$' } };
                else if (  user_value &&  key_value ) query = { "_id": user_value + ',' + key_value };
                else                                  query = '{}';

                my.store.get( query, results => {

                  console.log( results );

                  const values = [];

                  results.map( result => {
                    const row = [ 0, '', result.created_at, result.updated_at ];
                    result.details.map( detail => {
                      if ( detail.correct ) row[ 0 ]++;
                    } );
                    row[ 1 ] = Math.round( row[ 0 ] * 100 / result.details.length ) + '%';
                    row[ 0 ] = row[ 0 ] + '/' + result.details.length;
                    values.push( row );
                  } );

                  my.table.start( {
                    root: content_elem.querySelector( '#table' ),
                    table_head: [ "Gaps", "Result", "Created", "Last Update" ],
                    data: { values: values }
                  } );

                } );

              }

            } );

          }

        };

        /**
         * header menu entries data
         * @type {Object[]}
         */
        const entries = [];

        // add relevant menu entries
        for ( const key in my.sections )
          entries.push( {
            title: my.sections[ key ],
            actions: event_data => { $.setContent( content_elem, '' ); !event_data.selected && sections[ key ](); }
          } );

        // render header menu
        $.setContent( main_elem.querySelector( '#menu' ), self.menu.root );
        self.menu.data = { entries: entries };
        self.menu.start( () => {

          // put main HTML structure into frontend
          $.setContent( self.element, main_elem );

          // rendering completed => perform callback
          callback && callback();

        } );

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}
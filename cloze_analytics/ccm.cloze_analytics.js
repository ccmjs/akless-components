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
            { "id": "user" },
            { "id": "menu" },
            { "id": "content" }
          ]
        },
        "results": {
          "id": "section-results",
          "inner": [
            {
              "tag": "div",
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
                      "inner": "%user%"
                    },
                    {
                      "tag": "select",
                      "id": "section-results-user-input",
                      "class": "form-control",
                      "onchange": "%onchange%",
                      "inner": [
                        {
                          "tag": "option",
                          "value": "",
                          "inner": "%show_all%"
                        }
                      ]
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
                      "inner": "%cloze%"
                    },
                    {
                      "tag": "select",
                      "id": "section-results-key-input",
                      "class": "form-control",
                      "onchange": "%onchange%",
                      "inner": [
                        {
                          "tag": "option",
                          "value": "",
                          "inner": "%show_all%"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            { "id": "table" }
          ]
        },
        "details": {
          "id": "details",
          "inner": [
            {
              "id": "back1",
              "class": "btn btn-default",
              "onclick": "%onclick%",
              "inner": [
                { "tag": "span", "class": "glyphicon glyphicon-arrow-left" },
                "Back"
              ]
            },
            {
              "id": "back2",
              "class": "btn btn-default",
              "onclick": "%onclick%",
              "inner": [
                { "tag": "span", "class": "glyphicon glyphicon-arrow-left" },
                "Back"
              ]
            },
            { "id": "cloze" },
            {
              "id": "back3",
              "class": "btn btn-default",
              "onclick": "%onclick%",
              "inner": [
                { "tag": "span", "class": "glyphicon glyphicon-arrow-left" },
                "Back"
              ]
            },
            {
              "id": "back4",
              "class": "btn btn-default",
              "onclick": "%onclick%",
              "inner": [
                { "tag": "span", "class": "glyphicon glyphicon-arrow-left" },
                "Back"
              ]
            }
          ]
        }
      },
      "css": [ "ccm.load",
        "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
        "https://ccmjs.github.io/akless-components/cloze_analytics/resources/default.css"
      ],
      "sections": {},
      "menu": [ "ccm.instance", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/menu/resources/configs.js", "bootstrap" ] ],
      "cloze": {
        "component": [ "ccm.component", "https://ccmjs.github.io/akless-components/cloze/ccm.cloze.js" ],
        "configs": [ "ccm.store" ],
        "results": [ "ccm.store" ]
      },
      "placeholder": {
        "user": "User",
        "cloze": "Fill-in-the-Blank Text",
        "show_all": "Show All",
        "details": "Details",
        "table_head": [ "User", "Fill-in-the-Blank Text", "Correct", "Result", "Created", "Last Update", "" ]
      }

  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-4.0.1.js" ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "table": [ "ccm.component", "https://ccmjs.github.io/tkless-components/table/ccm.table.js" ],

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

        // render login/logout area
        self.user ? self.user.start( () => { $.setContent( main_elem.querySelector( '#user' ), self.user.root ); proceed(); } ) : proceed();

        function proceed() {

          /**
           * contains section content
           * @type {Element}
           */
          const content_elem = main_elem.querySelector( '#content' );

          /**
           * contains render function for each section
           * @type {Object.<string,function>}
           */
          const sections = {

            results: () => {

              // get fill-in-the-blank text results
              my.cloze.results.get( '{}', results => {

                // render main HTML structure of results section
                $.setContent( content_elem, $.html( my.html.results, {
                  user: my.placeholder.user,
                  cloze: my.placeholder.cloze,
                  show_all: my.placeholder.show_all,
                  onchange: updateTable
                } ) );

                /**
                 * selector box for user
                 * @type {Element}
                 */
                const user_elem = content_elem.querySelector( '#section-results-user-input' );

                /**
                 * selector box for fill-in-the-blank
                 * @type {Element}
                 */
                const key_elem = content_elem.querySelector( '#section-results-key-input'  );

                // fill selector boxes with entries
                results.map( result => {
                  if ( !Array.isArray( result.key ) || result.key.length < 2 ) return;
                  if ( !content_elem.querySelector( '#section-results-user-input option[value="' + result.key[ 0 ] + '"]' ) ) $.append( user_elem, $.html( { tag: 'option', value: result.key[ 0 ], inner: result.key[ 0 ] } ) );
                  if ( !content_elem.querySelector( '#section-results-key-input  option[value="' + result.key[ 1 ] + '"]' ) ) $.append(  key_elem, $.html( { tag: 'option', value: result.key[ 1 ], inner: result.key[ 1 ] } ) );
                } );

                // render table
                updateTable();

                /** (re)renders the result table */
                function updateTable() {

                  /**
                   * selected user
                   * @type {string}
                   */
                  const user_value = user_elem.value;

                  /**
                   * selected fill-in-the-blank text
                   * @type {string}
                   */
                  const key_value =  key_elem.value;

                  // prepare database query for getting relevant fill-in-the-blank text results
                  let query;
                  if (  user_value && !key_value ) query = { "_id": { $regex: '^' + user_value + ',' } };
                  else if ( !user_value &&  key_value ) query = { "_id": { $regex: ',' + key_value + '(,|$)' } };
                  else if (  user_value &&  key_value ) query = { "_id": { $regex: '^' + user_value + ',' + key_value + '(,|$)' } };
                  else                                  query = '{}';

                  // get relevant results
                  my.cloze.results.get( query, results => {

                    /**
                     * contains values of all table rows
                     * @type {Array[]}
                     */
                    const values = [];

                    // iterate over each fill-in-the-blank text result
                    results.map( result => {

                      /**
                       * contains table row values for current fill-in-the-blank text result
                       * @type {string[]}
                       */
                      const row = [ user_value, key_value, 0, '', result.created_at, result.updated_at, '<a>' ];

                      // determine missing values for table row
                      result.details.map( detail => detail.correct && row[ 2 ]++ );
                      row[ 3 ] = Math.round( row[ 2 ] * 100 / result.details.length ) + '%';
                      row[ 2 ] = row[ 2 ] + '/' + result.details.length;
                      if ( Array.isArray( result.key ) ) { row[ 1 ] = result.key[ 1 ]; row[ 0 ] = result.key[ 0 ]; }
                      values.push( row );

                    } );

                    // render table
                    my.table.start( {
                      root: content_elem.querySelector( '#table' ),
                      table_head: my.placeholder.table_head,
                      data: { values: values }
                    }, instance => {

                      // select 'Details' buttons
                      [ ...instance.element.querySelectorAll( 'a' ) ].map( ( button_elem, i ) => {

                        // set button caption
                        button_elem.innerHTML = my.placeholder.details;

                        // set button styling via bootstrap classes
                        button_elem.classList.add( 'btn', 'btn-primary', 'btn-xs' );

                        // set button click event
                        button_elem.addEventListener( 'click', () => {

                          // hide main HTML structure
                          main_elem.style.display = 'none';

                          // get fill-in-the-blank text configuration
                          my.cloze.configs.get( results[ i ].key[ 1 ], config => {

                            /**
                             * contains rendered details of fill-in-the-blank text
                             * @type {Element}
                             */
                            const details_elem = $.html( my.html.details, {
                              onclick: () => {
                                $.removeElement( details_elem );
                                main_elem.style.display = 'block';
                              }
                            } );

                            // adjust fill-in-the-blank configuration
                            Object.assign( config, {
                              root: details_elem.querySelector( '#cloze' ),
                              data: results[ i ],
                              feedback: true,
                              retry: false,
                              solutions: false,
                            } );
                            delete config.keywords;
                            delete config.onfinish;
                            delete config.time;

                            // render fill-in-the-blank text
                            my.cloze.comp.start( config, cloze_inst => {

                              /**
                               * submit button of fill-in-the-blank text
                               * @type {Element}
                               */
                              const submit_button = cloze_inst.element.querySelector( '#submit > *' );

                              // trigger click event of submit button to show feedback
                              cloze_inst.element.querySelector( '#submit > *' ).click();

                              // remove submit button
                              $.removeElement( submit_button );

                            } );

                            // put rendered details in frontend
                            $.append( self.element, details_elem );

                          } );

                        } );

                      } );

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

        }

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}
/**
 * @overview ccm component for rendering fill-in-the-blank analytics
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 * @version 1.3.0
 * @changes
 * version 1.3.0 (21.05.2018)
 * - supports realtime analytics
 * version 1.2.0 (19.05.2018)
 * - added gaps section that contains chart for Gaps Analysis
 * version 1.1.0 (18.05.2018)
 * - shows also non user-specific fill-in-the-blank texts in results section
 * version 1.0.0 (18.05.2018)
 */

{
  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'cloze_analytics',

    /**
     * component version
     * @type {number[]}
     */
    version: [ 1, 3, 0 ],

    /**
     * reference to used framework version
     * @type {Object}
     */
    ccm: {
      url: 'https://ccmjs.github.io/ccm/versions/ccm-16.6.0.js',
      integrity: 'sha384-LcGBJPmX/Aq5Jkre3q9yE+UCsd7vPWIgeBb9ayc4TIAl5H1nJpewlkKCDK8eCc7s',
      crossorigin: 'anonymous'
    },

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
            { "id": "section" }
          ]
        },
        "section": {
          "inner": [
            { "id": "inputs" },
            { "id": "content" }
          ]
        },
        "entry": {
          "id": "%entry%-entry",
          "class": "entry",
          "inner": [
            {
              "tag": "label",
              "id": "%entry%-label",
              "for": "%entry%-input",
              "inner": "%label%"
            },
            {
              "tag": "select",
              "id": "%entry%-input",
              "class": "form-control",
              "onchange": "%onchange%",
              "inner": [
                {
                  "tag": "option",
                  "value": "",
                  "inner": "%first%"
                }
              ]
            }
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
        "https://ccmjs.github.io/akless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap/css/font-face.css" },
        "https://ccmjs.github.io/akless-components/cloze_analytics/resources/default.css"
      ],
      "menu": [ "ccm.instance", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/menu/resources/configs.js", "bootstrap" ] ],
      "cloze": {
        "component": [ "ccm.component", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-4.1.0.js" ],
        "configs": [ "ccm.store" ],
        "results": [ "ccm.store" ]
      },
      "sections": {},
      "placeholder": {
        "user": "User",
        "cloze": "Fill-in-the-Blank Text",
        "show_all": "Show All",
        "details": "Details",
        "table_head": [ "User", "Fill-in-the-Blank Text", "Correct", "Result", "Created", "Last Update", "" ],
        "message": "Nothing to display.",
        "choose": "Please Choose"
      }

  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "table": [ "ccm.component", "https://ccmjs.github.io/tkless-components/table/ccm.table.js" ],
  //  "chart": [ "ccm.component", "https://ccmjs.github.io/akless-components/highchart/versions/ccm.highchart-1.0.0.js" ]

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
       * contains references to most important inner HTML elements
       * @type {Object.<string,Element>}
       */
      let elem = {};

      /**
       * is called once after all dependencies are solved and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.init = callback => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // listen to login/logout events => restart
        if ( self.user ) self.user.onchange = () => self.start();

        // listen to datastore changes => update
        self.cloze.results.onchange = update;

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

        // get fill-in-the-blank text results
        my.cloze.results.get( '{}', results => { my.results = results;

          // prepare main HTML structure
          elem.main = $.html( my.html.main );

          // remember section area
          elem.section = elem.main.querySelector( '#section' );

          // prepare login/logout area
          self.user ? self.user.start( () => { $.setContent( elem.main.querySelector( '#user' ), self.user.root ); proceed(); } ) : proceed();

          function proceed() {

            /**
             * header menu entries data
             * @type {Object[]}
             */
            const entries = [];

            // add relevant menu entries
            for ( const key in my.sections ) {
              entries.push( {
                title: my.sections[ key ],
                actions: event_data => {

                  /* click event of menu entry */

                  // reset content of section area
                  $.setContent( elem.section, event_data.selected ? '' : $.html( my.html.section ) );

                  // remember areas for section inputs and content
                  elem.inputs = elem.section.querySelector( '#inputs' );
                  elem.content = elem.section.querySelector( '#content' );

                  // remember clicked section
                  my.section = event_data.selected ? '' : key;

                  // render content of section area
                  update();

                }
              } );
            }

            // render header menu
            $.setContent( elem.main.querySelector( '#menu' ), self.menu.root );
            self.menu.data = { entries: entries };
            if ( my.section ) self.menu.selected = Object.keys( my.sections ).indexOf( my.section ) + 1;
            self.menu.start( () => {

              // put main HTML structure into frontend
              $.setContent( self.element, elem.main );

              // rendering completed => perform callback
              callback && callback();

            } );

          }

        } );

      };

      /**
       * (re)renders content of section area
       * @param {string|Object} [data] - changed data
       */
      function update( data ) {

        // update local fill-in-the-blank text results
        const deleted = !$.isObject( data );
        const key = deleted ? data : data.key;
        let exists = false;
        for ( let i = my.results.length - 1; i >= 0; i-- )
          if ( my.results[ i ].key === key ) {
            if ( deleted )
              my.results.splice( i, 1 );
            else
              my.results[ i ] = data;
            exists = true;
            break;
          }
        if ( !exists && !deleted )
          my.results.push( data );

        // no open section? => abort
        if ( !my.section ) return;

        // clear areas for section inputs and content
        $.setContent( elem.inputs , '' );
        $.setContent( elem.content, '' );

        /**
         * contains render function for each section
         * @type {Object.<string,function>}
         */
        const sections = {
          results: () => {

            // add section input entries
            addInputEntry(  'user', 'show_all', onChange );
            addInputEntry( 'cloze', 'show_all', onChange );

            // remember selector boxes
            elem.user  = elem.inputs.querySelector(  '#user-input' );
            elem.cloze = elem.inputs.querySelector( '#cloze-input' );

            // fill selector boxes with relevant entries
            fillSelectorBoxes();

            // (re)render section content
            onChange();

            /** when value of a selector box changed */
            function onChange() {

              // remember selected values
              my.choosed_user  = elem.user.value;
              my.choosed_cloze = elem.cloze.value;

              // prepare database query for getting relevant fill-in-the-blank text results
              let query;
                   if (  my.choosed_user && !my.choosed_cloze ) query = { "_id": { $regex:  '^' + my.choosed_user  + ',' } };
              else if ( !my.choosed_user &&  my.choosed_cloze ) query = { "_id": { $regex: '(^' + my.choosed_cloze + '$)|(,' + my.choosed_cloze + '(,|$))' } };
              else if (  my.choosed_user &&  my.choosed_cloze ) query = { "_id": { $regex:  '^' + my.choosed_user  + ','     + my.choosed_cloze + '(,|$)'  } };
              else                                              query = '{}';

              // get relevant results
              my.cloze.results.get( query, results => {

                // on relevant results? => nothings to display
                if ( !results.length ) return $.setContent( elem.content, my.placeholder.message );

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
                  const row = [ my.choosed_user, my.choosed_cloze, 0, '', result.created_at, result.updated_at, '<a>' ];

                  // determine missing values for table row
                  result.details.map( detail => detail.correct && row[ 2 ]++ );
                  row[ 3 ] = Math.round( row[ 2 ] * 100 / result.details.length ) + '%';
                  row[ 2 ] = row[ 2 ] + '/' + result.details.length;
                  if ( Array.isArray( result.key ) ) { row[ 1 ] = result.key[ 1 ]; row[ 0 ] = result.key[ 0 ]; } else row[ 1 ] = result.key;
                  values.push( row );

                } );

                // render table
                my.table.start( {
                  root: elem.content,
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
                      elem.main.style.display = 'none';

                      // get fill-in-the-blank text configuration
                      my.cloze.configs.get( Array.isArray( results[ i ].key ) ? results[ i ].key[ 1 ] : results[ i ].key, config => {

                        /**
                         * contains rendered details of fill-in-the-blank text
                         * @type {Element}
                         */
                        const details_elem = $.html( my.html.details, {
                          onclick: () => {
                            $.removeElement( details_elem );
                            elem.main.style.display = 'block';
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

          },
          gaps: () => {

            // add section input entries
            addInputEntry( 'cloze', 'choose', onChange );

            // remember selector boxes
            elem.cloze = elem.inputs.querySelector( '#cloze-input' );

            // fill selector boxes with relevant entries
            fillSelectorBoxes();

            // (re)render section content
            onChange();

            /** when value of selector box changed */
            function onChange() {

              // remember selected values
              my.choosed_cloze = elem.cloze.value;

              // no fill-in-the-blank text selected? => abort
              if ( !my.choosed_cloze ) return $.setContent( elem.content, '' );

              // prepare database query for getting relevant fill-in-the-blank text results
              const query = { "_id": { $regex: '(^' + my.choosed_cloze + '$)|(,' + my.choosed_cloze + '(,|$))' } };

              // get relevant results
              my.cloze.results.get( query, results => {

                // no relevant results? => nothing to display
                if ( !results.length ) return $.setContent( elem.content, my.placeholder.message );

                // prepare data for chart rendering
                const categories = [];
                const data = [];
                for ( let i = 0; i < results[ 0 ].details.length; i++ ) {
                  categories[ i ] = results[ 0 ].details[ i ].gap;
                  data[ i ] = 0;
                }
                results.map( result => {
                  result.details.map( ( detail, i ) => {
                    if ( detail.correct )
                      data[ i ]++;
                  } );
                } );

                // render chart
                my.chart.start( {
                  root: elem.content,
                  settings: {
                    chart: {
                      type: 'column'
                    },
                    title: {
                      text: ''
                    },
                    xAxis: {
                      categories: categories,
                      title: {
                        text: 'Text Gap'
                      }
                    },
                    yAxis: {
                      min: 0,
                      max: results.length,
                      title: {
                        text: 'Correct Solutions'
                      },
                      allowDecimals: false
                    },
                    tooltip: {
                      enabled: false
                    },
                    legend: {
                      enabled: false
                    },
                    series: [ {
                      data: data
                    } ]
                  }
                } );

              } );

            }

          }
        };

        // update content of section area
        sections[ my.section ]();

        /**
         * adds a section input entry
         * @param {string} entry - 'user' or 'cloze'
         * @param {string} first - caption of first selector box entry
         * @param {function} onchange - change event for selector box
         */
        function addInputEntry( entry, first, onchange ) {

          // render selector box for user
          $.append( elem.inputs, $.html( my.html.entry, {
            entry: entry,
            label: my.placeholder[ entry ],
            first: my.placeholder[ first ],
            onchange: onchange
          } ) );

        }

        /** fill selector boxes with relevant entries */
        function fillSelectorBoxes() {

          // fill selector boxes with entries
          my.results.map( result => {
            if ( !Array.isArray( result.key ) ) result.key = [ undefined, result.key ];
            if ( elem.user && result.key[ 0 ] && !elem.user.querySelector( 'option[value="' + result.key[ 0 ] + '"]' ) ) $.append( elem.user, $.html( { tag: 'option', value: result.key[ 0 ], inner: result.key[ 0 ], selected: result.key[ 0 ] === my.choosed_user } ) );
            if ( !elem.cloze.querySelector( 'option[value="' + result.key[ 1 ] + '"]' ) ) $.append( elem.cloze, $.html( { tag: 'option', value: result.key[ 1 ], inner: result.key[ 1 ], selected: result.key[ 1 ] === my.choosed_cloze } ) );
          } );

        }

      }

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}
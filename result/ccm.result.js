/**
 * @overview ccm component for visualisation of result data
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 * @version latest (2.0.1)
 * @changes
 * version 2.0.1 (10.10.2019):
 * - uses ccm v24.0.1
 * version 2.0.0 (29.04.2019):
 * - support of different types of apps
 * - support of newest result data conventions
 * - improve of each section
 * version 1.0.0 (17.03.2019)
 */

( () => {

  const component = {

    name: 'result',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-24.0.1.js',

    config: {

      "html": {
        "main": {
          "id": "main",
          "class": "container-fluid",
          "inner": [
            { "id": "user" },
            { "id": "menu" },
            { "id": "section" }
          ]
        },
        "section": {
          "inner": [
            { "id": "filter" },
            { "id": "content" }
          ]
        },
        "filter": {
          "id": "%filter%-entry",
          "class": "filter",
          "inner": [
            {
              "tag": "label",
              "id": "%filter%-label",
              "for": "%filter%-input",
              "inner": "%label%"
            },
            {
              "tag": "select",
              "id": "%filter%-input",
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
        "button": {
          "inner": {
            "tag": "a",
            "id": "%id%",
            "class": "button-details btn btn-primary btn-xs",
            "inner": "%caption%"
          }
        },
        "details": {
          "id": "details",
          "inner": [
            { "id": "app" },
            {
              "id": "back",
              "inner": {
                "tag": "a",
                "class": "btn btn-primary",
                "inner": "%caption%",
                "onclick": "%onclick%"
              }
            }
          ]
        }
      },
      "css": [ "ccm.load",
        "https://ccmjs.github.io/akless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap/css/font-face.css" },
        "https://ccmjs.github.io/akless-components/result/resources/default.css"
      ],
      "libs": [ "ccm.load", "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js" ],
      "store": [ "ccm.store" ],
      "menu": [ "ccm.component", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.4.4.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/menu/resources/configs.js", "bootstrap" ] ],
      "table": [ "ccm.component", "https://ccmjs.github.io/tkless-components/table/versions/ccm.table-3.0.0.js" ],
      "chart": [ "ccm.component", "https://ccmjs.github.io/akless-components/highchart/versions/ccm.highchart-3.0.0.js" ],
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ]
      "sections": [ "Show Results", "Ranking", "Correctness", "Timing", "Sections" ],
      "placeholder": {
        "user": "User",
        "comp": "Component",
        "app": "App",
        "show_all": "Show All",
        "details": "Details",
        "captions": [ "User", "Component", "App", "Correct", "Result", "Created", "Last Update", " " ],
        "rankings": [ "Rank", "User", "Correct", "Result", "Time Stamp" ],
        "message": "Nothing to display.",
        "choose": "Please Choose",
        "back": "← Back to Result Table"
      }

    },

    Instance: function () {

      const self = this;
      let $;

      /**
       * result data sets
       * @type {Object[]}
       */
      let results;

      /**
       * contains references to most important inner HTML elements
       * @type {Object.<string,Element>}
       */
      const elem = {};

      this.init = async () => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // listen to login/logout events => restart
        if ( self.user ) self.user.onchange = self.start;

        // listen to datastore changes => update
        self.store.onchange = update;

      };

      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // render main HTML structure
        $.setContent( self.element, elem.main = $.html( self.html.main ) );

        // render login/logout area
        if ( self.user ) {
          $.setContent( self.element.querySelector( '#user' ), self.user.root );
          await self.user.start();
        }

        // logging of 'start' event
        self.logger && self.logger.log( 'start' );

        // remember section area
        elem.section = elem.main.querySelector( '#section' );

        // get app result data sets
        results = await self.store.get( {} );

        // try to detect corresponding app for each result
        self.app && await $.asyncForEach( results, async result => searchApp( result ) );

        // render header menu
        await self.menu.start( {
          root: self.element.querySelector( '#menu' ),
          data: { entries: $.cleanObject( $.clone( self.sections ) ) },
          selected: self.section || 1,
          onclick: event_data => {

            // reset content of section area
            $.setContent( elem.section, $.html( self.html.section ) );

            // remember areas for section inputs and content
            elem.filter  = elem.section.querySelector( '#filter'  );
            elem.content = elem.section.querySelector( '#content' );

            // remember clicked section
            self.section = event_data.nr;

            // render content of section area
            update();

          }
        } );

      };

      /**
       * updates content of section area
       * @param {string|Object} [data] - changed data
       * @returns {Promise}
       */
      async function update( data ) {

        // update local app results
        if ( data !== undefined ) {
          const deleted = !$.isObject( data );
          const key = deleted ? data : data.key;
          let exists = false;
          if ( $.isObject( data ) )
            await searchApp( data );
          for ( let i = results.length - 1; i >= 0; i-- )
            if ( results[ i ].key.toString() === key.toString() ) {
              if ( deleted )
                results.splice( i, 1 );
              else
                results[ i ] = data;
              exists = true;
              break;
            }
          if ( !exists && !deleted )
            results.push( data );
        }

        // clear areas for section filters and content
        $.setContent( elem.filter , '' );
        $.setContent( elem.content, '' );

        /**
         * component filter
         * @type {boolean}
         */
        const comp_filter = Array.isArray( self.app );

        /**
         * contains render function for each section
         * @type {function[]}
         */
        const sections = [

          // Show Results (Table)
          () => {

            // prepare section area
            renderSection( true, true, onChange );

            /** change event for selector box */
            async function onChange() {

              // remember selected values
              self.choosed_user = elem.user.value;
              self.choosed_comp = comp_filter && elem.comp.value;
              self.choosed_app  = elem.app.value;

              /**
               * filtered results
               * @type {Object[]}
               */
              const results = await filterResults();

              // no relevant results? => nothings to display
              if ( !results.length )
                return $.setContent( elem.content, self.placeholder.message );

              /**
               * values of all table rows
               * @type {*[][]}
               */
              const values = [];

              // set table row values
              await $.asyncForEach( results, async ( result, i ) => {

                result.created_at = moment( result.created_at ).format( 'MMMM Do YYYY, h:mm:ss a' );
                result.updated_at = moment( result.updated_at ).format( 'MMMM Do YYYY, h:mm:ss a' );

                /**
                 * contains table row values for current app result data set
                 * @type {string[]}
                 */
                let row = [
                  ( Array.isArray( result.key ) && result.key[ 1 ] ) || '',                       // 0: User
                  result._name || '',                                                             // 1: Component
                  result._app || ( Array.isArray( result.key ) ? result.key[ 0 ] : result.key ),  // 2: App
                  result.correct,                                                                 // 3: Correct
                  result.result,                                                                  // 4: Result
                  result.created_at,                                                              // 5: Created
                  result.updated_at,                                                              // 6: Last Update
                  ''                                                                              // 7: Details Button
                ];

                // has total amount? => append it
                if ( Number.isInteger( result.correct ) && Number.isInteger( result.total ) )
                  row[ 3 ] = result.correct + '/' + result.total;

                // no result value but has correct and total value? => result is correctness in percentage
                if ( result.value === undefined && Number.isInteger( result.correct ) && Number.isInteger( result.total ) )
                  row[ 4 ] = Math.round( result.correct * 100 / result.total ) + '%';

                // set details button
                if ( result._config )
                  row[ 7 ] = $.html( self.html.button, {
                    id: 'result-' + ( i + 1 ),
                    caption: self.placeholder.details
                  } ).innerHTML;

                // remove unwanted column values
                row = row.filter( ( value, i ) => self.placeholder.captions[ i ] !== '' );

                // add table row values to the others
                values.push( row );

              } );

              // render table
              const table = await self.table.start( {
                root: elem.content,
                table_head: self.placeholder.captions.filter( caption => caption !== '' ),
                data: { values: values }
              } );

              // select 'Details' buttons
              [ ...table.element.querySelectorAll( '.button-details' ) ].forEach( button => {

                // set button click event
                button.addEventListener( 'click', async function () {

                  // hide main HTML structure
                  elem.main.style.display = 'none';

                  // render details section
                  $.append( self.element, $.html( self.html.details, {
                    caption: self.placeholder.back,
                    onclick: () => {

                      // remove detailed app result
                      $.removeElement( self.element.querySelector( '#details' ) );

                      // show main HTML structure
                      elem.main.style.display = 'block';

                    }
                  } ) );

                  // render app
                  const result = results[ parseInt( this.id.split( '-' ).pop() ) - 1 ];
                  const {_component,_config} = result;
                  await _component.start( await $.integrate( {
                    root: self.element.querySelector( '#app' ),
                    data: $.clone( result ),                      // set app result data as initial data
                    show_results: true,                           // show app in result mode
                  }, _config ) );

                } );

              } );

            }

          },

          // Rankings (Table)
          () => {

            // prepare section area
            renderSection( false, true, onChange );

            /** when value of a selector box changed */
            async function onChange() {

              // remember selected values
              self.choosed_app = elem.app.value;
              self.choosed_comp = comp_filter && elem.comp.value;

              /**
               * filtered results
               * @type {Object[]}
               */
              const results = await filterResults( 'correct', 'total', 'updated_at' );

              // no relevant results? => nothings to display
              if ( !results.length ) return $.setContent( elem.content, self.placeholder.message );

              /**
               * ranking data
               * @type {Object}
               */
              const ranking = {};

              /**
               * app focused data structure of results
               * @type {{}}
               */
              const apps = {};

              /**
               * maximum of possible points
               * @type {number}
               */
              let max_total = 0;

              // build app focused data structure of results and create initial data structure of rankings
              results.forEach( result => {

                /**
                 * user who submitted the result
                 * @type {string}
                 */
                const user = Array.isArray( result.key ) && result.key[ 1 ];

                // no user or no points? => skip
                if ( !user || !Number.isInteger( result.correct ) || !Number.isInteger( result.total ) ) return;

                /**
                 * app identifier
                 * @type {string}
                 */
                const app = result.key[ 0 ];

                // first result of this app? => update maximum possible amount of points
                if ( !apps[ app ] ) {
                  apps[ app ] = {};
                  max_total += result.total;
                }

                // first or higher result of this user for this app? => update points
                if ( !apps[ app ][ user ] || result.correct > apps[ app ][ user ] )
                  apps[ app ][ user ] = result;

                // first result of this user? => add new table row
                if ( !ranking[ user ] )
                  ranking[ user ] = [
                    user,               // 0: User
                    0,                  // 1: Correct
                    0,                  // 2: Total
                    result.updated_at   // 3: Time Stamp
                  ];
                // otherwise: add points and update timestamp
                else if ( new Date( result.updated_at ).getTime() > new Date( ranking[ user ][ 3 ] ).getTime() )
                  ranking[ user ][ 3 ] = result.updated_at;

              } );

              // calculate points of each user
              for ( const app in apps )
                for ( const user in apps[ app ] ) {
                  ranking[ user ][ 1 ] += apps[ app ][ user ].correct;
                  ranking[ user ][ 2 ] += apps[ app ][ user ].total;
                }

              /**
               * contains values of all rows of ranking table
               * @type {Array[]}
               */
              const values = Object.values( ranking );

              // sort rankings by points and time stamp
              values.sort( ( a, b ) => {
                if ( b[ 1 ] !== a[ 1 ] )
                  return b[ 1 ] - a[ 1 ];
                else if ( b[ 2 ] !== a[ 2 ] )
                  return b[ 2 ] - a[ 2 ];
                else
                  return new Date( a[ 3 ] ).getTime() - new Date( b[ 3 ] ).getTime();
              } );

              // finalize rankings
              values.forEach( ( row, i ) => {
                const result = Math.round( row[ 1 ] * 100 / max_total ) + '%';
                row[ 1 ] = row[ 1 ] + '/' + max_total;
                row[ 2 ] = result;
                row.unshift( i + 1 );
              } );

              // render table
              await self.table.start( {
                root: elem.content,
                table_head: self.placeholder.rankings.filter( caption => caption !== '' ),
                data: { values: values }
              } );

            }

          },

          // Correctness (Pie Chart)
          () => {

            // prepare section area
            renderSection( false, false, onChange );

            /** when value of a selector box changed */
            async function onChange() {

              // remember selected values
              self.choosed_app = elem.app.value;

              // no app selected? => abort
              if ( !self.choosed_app ) return $.setContent( elem.content, '' );

              /**
               * filtered results
               * @type {Object[]}
               */
              const results = await filterResults( 'correct', 'total' );

              // no relevant results? => nothings to display
              if ( !results.length ) return $.setContent( elem.content, self.placeholder.message );

              // prepare data for chart rendering
              let data = [], total = results[ 0 ].total;
              for ( let i = 0; i <= total; i++ )
                data[ i ] = { name: i + ' of ' + total + ' Section(s)', y: 0 };
              results.forEach( result => data[ result.correct ].y++ );
              data = data.filter( entry => entry.y );
              data.forEach( entry => { entry.x = ( entry.y / total ) * 100 } );

              // render chart
              await self.chart.start( {
                root: elem.content,
                settings: {
                  chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                  },
                  title: { text: 'In how many results were how many sections correctly answered?' },
                  tooltip: {
                    pointFormat: 'In <b>{point.y} of ' + results.length + ' Result(s)</b> are <b>{point.name}</b> of the app correctly answered.'
                  },
                  plotOptions: {
                    pie: {
                      allowPointSelect: true,
                      cursor: 'pointer',
                      dataLabels: {
                        enabled: true,
                        format: '{point.y} of {point.total} Result(s) {point.percentage:.1f}%',
                        style: {
                          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                      },
                      showInLegend: true
                    }
                  },
                  series: [ { data: data } ]
                }
              } );

            }

          },

          // Timing (Time Series Chart)
          () => {

            // prepare section area
            renderSection( true, true, onChange );

            /** when value of a selector box changed */
            async function onChange() {

              // remember selected values
              self.choosed_user = elem.user.value;
              self.choosed_comp = comp_filter && elem.comp.value;
              self.choosed_app  = elem.app.value;

              /**
               * filtered results
               * @type {Object[]}
               */
              const results = await filterResults( 'created_at', 'updated_at' );

              // no relevant results? => nothings to display
              if ( !results.length ) return $.setContent( elem.content, self.placeholder.message );

              // set initial series data for line chart
              const series = [
                { type: 'line', name: 'created'     , data: [] },
                { type: 'line', name: 'last updated', data: [] }
              ];

              // prepare line chart data
              const created = {};
              const updated = {};
              const add = ( time, obj ) => {

                time = new Date( time );
                time.setMinutes( 0 );
                time.setSeconds( 0 );
                time.setMilliseconds( 0 );
                time = time.getTime();

                obj[ time ] ? obj[ time ]++ : obj[ time ] = 1;

                if ( obj[ time ] !== 1 ) return;

                const before = time - ( 60 * 60 * 1000 );
                const after  = time + ( 60 * 60 * 1000 );

                if ( !obj[ before ] ) obj[ before ] = 0;
                if ( !obj[ after  ] ) obj[ after  ] = 0;

              };
              results.forEach( result => {
                add( result.created_at, created );
                add( result.updated_at, updated );
              } );

              // convert data to needed array structure
              for ( const time in created ) series[ 0 ].data.push( [ parseInt( time ), created[ time ] ] );
              for ( const time in updated ) series[ 1 ].data.push( [ parseInt( time ), updated[ time ] ] );

              // sort data by time stamp
              series[ 0 ].data.sort( ( a, b ) => b[ 0 ] - a[ 0 ] );
              series[ 1 ].data.sort( ( a, b ) => b[ 0 ] - a[ 0 ] );

              // render chart
              await self.chart.start( {
                root: elem.content,
                settings: {
                  chart: { zoomType: 'x' },
                  title: {
                    text: 'When were results first time created and last time updated?'
                  },
                  time: {
                    timezoneOffset: new Date().getTimezoneOffset()
                  },
                  xAxis: { type: 'datetime' },
                  yAxis: {
                    title: { text: 'Results' },
                    tickInterval: 1
                  },
                  tooltip: {
                    pointFormat: 'In this hour, a result was <b>{series.name}</b> for <b>{point.y}</b> time(s).'
                  },
                  legend: { enabled: true },
                  series: series
                }
              } );

            }

          },

          // Sections (Column Chart)
          () => {

            // prepare section area
            renderSection( false, false, async () => {

              // remember selected values
              self.choosed_app = elem.app.value;

              // no app selected? => abort
              if ( !self.choosed_app ) return $.setContent( elem.content, '' );

              /**
               * filtered results
               * @type {Object[]}
               */
              const results = await filterResults( 'sections' );

              // no relevant results? => nothings to display
              if ( !results.length ) return $.setContent( elem.content, self.placeholder.message );

              // prepare data for chart rendering
              const categories = [];
              const data = [];
              results[ 0 ].sections.forEach( ( section, i ) => {
                categories[ i ] = i + 1;
                data[ i ] = 0;
              } );
              results.forEach( result =>
                result.sections.forEach( ( section, i ) =>
                  section.correct && data[ i ]++
                )
              );

              // render chart
              await self.chart.start( {
                root: elem.content,
                settings: {
                  chart: { type: 'column' },
                  title: { text: 'How often was which section answered correctly?' },
                  xAxis: {
                    categories: categories,
                    title: { text: 'App Section' }
                  },
                  yAxis: {
                    min: 0,
                    max: results.length,
                    title: { text: 'Correct Results' },
                    allowDecimals: false
                  },
                  tooltip: { pointFormat: '<b>Section {point.category}</b> was answered <b>{point.y}</b> time(s) correctly.' },
                  legend: { enabled: false },
                  series: [ { data: data } ]
                }
              } );

            } );

          }

        ];

        // update content of section area
        sections[ self.section - 1 ]();

        /**
         * renders section with filters and content
         * @param {boolean} user_filter - render selector box for user filtering
         * @param {boolean} show_all - selector box for app filtering with "Show All" (true) or "Please Select" (false) entry
         * @param {function} onChange - change event for selector box
         */
        function renderSection( user_filter, show_all, onChange ) {

          // add selector boxes for filtering
          user_filter &&             addSelectorBox( 'user', show_all ? 'show_all' : 'choose', onChange );
          comp_filter && show_all && addSelectorBox( 'comp', show_all ? 'show_all' : 'choose', onChange );
                                     addSelectorBox( 'app' , show_all ? 'show_all' : 'choose', onChange );

          // fill selector boxes with relevant entries
          fillSelectorBoxes();

          // update section content
          onChange();

          /**
           * adds a selector box
           * @param {string} entry - 'user', 'comp' or 'app'
           * @param {string} first - caption of first selector box entry
           * @param {function} onChange - change event for selector box
           */
          function addSelectorBox( entry, first, onChange ) {

            elem[ entry ] = $.html( self.html.filter, {
              filter: entry,
              label: self.placeholder[ entry ],
              first: self.placeholder[ first ],
              onchange: onChange
            } );
            $.append( elem.filter, elem[ entry ] );
            elem[ entry ] = elem[ entry ].querySelector( '#' + entry + '-input' );

          }

          /** fills selector boxes with entries */
          function fillSelectorBoxes() {

            results.forEach( result => {

              const user = Array.isArray( result.key ) && result.key[ 1 ];
              const app  = Array.isArray( result.key ) ?  result.key[ 0 ] : result.key;

              if ( elem.user && user && !elem.user.querySelector( 'option[value="' + user + '"]' ) )
                $.append( elem.user, $.html( {
                  tag: 'option',
                  value: user,
                  inner: user,
                  selected: user === self.choosed_user
                } ) );

              if ( !elem.app.querySelector( 'option[value="' + app + '"]' ) )
                $.append( elem.app, $.html( {
                  tag: 'option',
                  value: app,
                  inner: result._app || app,
                  selected: app === self.choosed_app
                } ) );

            } );

            if ( comp_filter )
              self.app.forEach( app => {
                const comp = app.name || app.component.name;
                if ( elem.comp && !elem.comp.querySelector( 'option[value="' + comp + '"]' ) )
                  $.append( elem.comp, $.html( {
                    tag: 'option',
                    value: comp,
                    inner: comp,
                    selected: comp === self.choosed_comp
                  } ) );
              } );

          }

        }

        /**
         * filters results
         * @param {...string} [required_properties] - required result dataset properties for visualisation
         * @returns {Object[]} filtered results
         */
        function filterResults( required_properties ) {

          required_properties = [ ...arguments ];

          return results.filter( result => {

            if ( required_properties )
              for ( let i = 0; i < required_properties.length; i++ )
                if ( result[ required_properties[ i ] ] === undefined )
                  return false;

            const app = Array.isArray( result.key ) ? result.key[ 0 ] : result.key;
            const user = Array.isArray( result.key ) && result.key[ 1 ];

            if ( !self.choosed_user || self.choosed_user === user )
              if ( !self.choosed_comp || self.choosed_comp === result._name )
                if ( !self.choosed_app || self.choosed_app === app )
                  return true;

            return false;

          } );

        }

      }

      /**
       * detects corresponding app for a result data set
       * @param {Object} result - result data set
       * @param {Object[]|Object} [app=self.app] - contains component(s) and data store(s) for detecting corresponding app
       * @returns {Promise<*>}
       */
      async function searchApp( result, app=self.app ) {

        if ( Array.isArray( app ) )
          return $.asyncForEach( app, async app => searchApp( result, app ) );

        if ( !app.configs || result._config ) return;

        result._config = ( await app.configs.get( { 'data.key' : Array.isArray( result.key ) ? result.key[ 0 ] : result.key } ) )[ 0 ];

        if ( result._config ) {
          result._component = app.component;
          result._name = app.name || app.component.name;
          result._app = result._config.key.toString()
        }

      }

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
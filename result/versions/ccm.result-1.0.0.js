/**
 * @overview ccm component for visualisation of result data
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 * @version 1.0.0
 * @changes
 * version 1.0.0 (17.03.2019)
 */

( () => {

  const component = {

    name: 'result', version: [ 1, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',

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
            { "id": "filter" },
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
        "button": {
          "inner": {
            "tag": "a",
            "class": "btn btn-primary btn-xs",
            "inner": "%caption%"
          }
        }
      },
      "css": [ "ccm.load",
        "https://ccmjs.github.io/akless-components/result/resources/default.css",
        "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css"
      ],
      "app": {
        "comp": [ "ccm.component", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-5.1.0.js" ],
        "configs": [ "ccm.store" ],
        "results": [ "ccm.store" ]
      },
      "menu": [ "ccm.component", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.4.4.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/menu/resources/configs.js", "bootstrap" ] ],
      "table": [ "ccm.component", "https://ccmjs.github.io/tkless-components/table/versions/ccm.table-2.1.0.js" ],
      "chart": [ "ccm.component", "https://ccmjs.github.io/akless-components/highchart/versions/ccm.highchart-3.0.0.js" ],
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ]
      "sections": [ "Show Results", "Correctness", "Timing", "Details" ],
      "placeholder": {
        "user": "User",
        "app": "App",
        "show_all": "Show All",
        "details": "Details",
        "captions": [ "User", "App", "Correct", "Result", "Created", "Last Update", "&nbsp;" ],
        "message": "Nothing to display.",
        "choose": "Please Choose"
      }

    },

    Instance: function () {

      const self = this;
      let $;

      /**
       * contains references to most important inner HTML elements
       * @type {Object.<string,Element>}
       */
      let elem = {};

      this.init = async () => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // listen to login/logout events => restart
        if ( self.user ) self.user.onchange = self.start;

        // listen to datastore changes => update
        self.app.results.onchange = update;

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
          await self.user.start();
          $.setContent( self.element.querySelector( '#user' ), self.user.root );
        }

        // logging of 'start' event
        self.logger && self.logger.log( 'start' );

        // remember section area
        elem.section = elem.main.querySelector( '#section' );

        // get app result data sets
        self.results = await self.app.results.get( {} );

        const sections = $.clone( self.sections );

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
       * (re)renders content of section area
       * @param {string|Object} [data] - changed data
       */
      function update( data ) {

        // update local app results
        if ( data === undefined ) {
          const deleted = !$.isObject( data );
          const key = deleted ? data : data.key;
          let exists = false;
          for ( let i = self.results.length - 1; i >= 0; i-- )
            if ( self.results[ i ].key === key ) {
              if ( deleted )
                self.results.splice( i, 1 );
              else
                self.results[ i ] = data;
              exists = true;
              break;
            }
          if ( !exists && !deleted )
            self.results.push( data );
        }

        // clear areas for section inputs and content
        $.setContent( elem.filter , '' );
        $.setContent( elem.content, '' );

        /**
         * contains render function for each section
         * @type {function[]}
         */
        const sections = [

          // Show Results (Table)
          () => {

            // add selector boxes for filtering
            addSelectorBox( 'user', 'show_all', onChange );
            addSelectorBox(  'app', 'show_all', onChange );

            // remember selector boxes
            elem.user = elem.filter.querySelector( '#user-input' );
            elem.app  = elem.filter.querySelector(  '#app-input' );

            // fill selector boxes with relevant entries
            fillSelectorBoxes();

            // (re)render section content
            onChange();

            /** when value of a selector box changed */
            async function onChange() {

              // remember selected values
              self.choosed_user = elem.user.value;
              self.choosed_app  = elem.app.value;

              // prepare database query for getting relevant app result data sets
              let query;
                   if (  self.choosed_app && !self.choosed_user ) query = { "_id": { $regex: '^' + self.choosed_app  + '(,|$)' } };
              else if ( !self.choosed_app &&  self.choosed_user ) query = { "_id": { $regex: ',' + self.choosed_user + '(,|$)' } };
              else if (  self.choosed_app &&  self.choosed_user ) query = { "_id": { $regex: '^' + self.choosed_app  + ',' + self.choosed_user + '(,|$)' } };
              else                                                query = {};

              // get relevant app result data sets
              const results = await self.app.results.get( query );

              // no relevant results? => nothings to display
              if ( !results.length ) return $.setContent( elem.content, self.placeholder.message );

              /**
               * contains captions for table rows
               * @type {string[]}
               */
              const captions = $.clone( self.placeholder.captions );

              /**
               * contains values of all table rows
               * @type {Array[]}
               */
              const values = [];

              // iterate over each app result data set
              results.forEach( result => {

                /**
                 * contains table row values for current app result data set
                 * @type {string[]}
                 */
                let row = [
                  self.choosed_user,  // 0: User
                  self.choosed_app,   // 1: App
                  result.correct,     // 2: Correct
                  result.value,       // 3: Result
                  result.created_at,  // 4: Created
                  result.updated_at   // 5: Last Update
                ];

                // set values for 'User' and 'App'
                if ( Array.isArray( result.key ) ) {
                  row[ 0 ] = result.key[ 1 ];
                  row[ 1 ] = result.key[ 0 ];
                }
                else
                  row[ 1 ] = result.key;

                // has total amount? => append it
                if ( Number.isInteger( result.correct ) && Number.isInteger( result.total ) )
                  row[ 2 ] = result.correct + '/' + result.total;

                // no result value but has correct and total value? => result is correctness in percentage
                if ( result.value === undefined && Number.isInteger( result.correct ) && Number.isInteger( result.total ) )
                  row[ 3 ] = Math.round( result.correct * 100 / result.total ) + '%';

                // known configurations? => add 'Details' button
                self.app.configs && row.push( $.html( self.html.button, {
                  caption: self.placeholder.details
                } ).innerHTML );

                // remove unwanted column values
                for ( let i = self.placeholder.captions.length - 1; i > 0; i-- )
                  if ( self.placeholder.captions[ i ] === '' )
                    row.splice( i, 1 );

                // add table row values to the others
                values.push( row );

              } );

              // remove unwanted column headers
              for ( let i = self.placeholder.captions.length - 1; i > 0; i-- )
                if ( self.placeholder.captions[ i ] === '' )
                  captions.splice( i, 1 );

              // render table
              const table = await self.table.start( {
                root: elem.content,
                table_head: captions,
                data: { values: values }
              } );

              // select 'Details' buttons
              [ ...table.element.querySelectorAll( 'a' ) ].forEach( ( button, i ) => {

                // set button click event
                button.addEventListener( 'click', async () => {

                  // hide main HTML structure
                  elem.main.style.display = 'none';

                  /**
                   * app configuration
                   * @type {Object}
                   */
                  const config = await self.app.configs.get( Array.isArray( results[ i ].key ) ? results[ i ].key[ 0 ] : results[ i ].key );

                  // adjust app configuration
                  Object.assign( config, {
                    data: results[ i ],     // set app result data is initial data
                    show_results: true,     // show app in result mode
                    onfinish: () => {
                      $.removeElement( app.root );        // remove detailed app result
                      elem.main.style.display = 'block';  // show main HTML structure
                    }
                  } );

                  // render app
                  const app = await self.app.comp.start( config );
                  $.append( self.element, app.root );

                } );

              } );

            }

          },

          // Correctness (Pie Chart)
          () => {

            // add selector boxes for filtering
            addSelectorBox( 'app', 'choose', onChange );

            // remember selector boxes
            elem.app = elem.filter.querySelector( '#app-input' );

            // fill selector boxes with relevant entries
            fillSelectorBoxes();

            // (re)render section content
            onChange();

            /** when value of a selector box changed */
            async function onChange() {

              // remember selected values
              self.choosed_app = elem.app.value;

              // no app selected? => abort
              if ( !self.choosed_app ) return $.setContent( elem.content, '' );

              // prepare database query for getting relevant app result data sets
              let query;
              if ( self.choosed_app && !self.choosed_user ) query = { "_id": { $regex: '^' + self.choosed_app  + '(,|$)' } };
              else                                          query = {};

              // get relevant app result data sets
              const results = await self.app.results.get( query );

              // no relevant results? => nothings to display
              if ( !results.length ) return $.setContent( elem.content, self.placeholder.message );

              // prepare data for chart rendering
              const data = [], total = results[ 0 ].total;
              for ( let i = 0; i <= total; i++ )
                data[ i ] = { name: i + ' of ' + total, y: 0 };
              results.forEach( result => data[ result.correct ].y++ );
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
                  title: {
                    text: ''
                  },
                  tooltip: {
                    pointFormat: '<b>{point.y}</b> of <b>' + results.length + '</b> people(s) have answered <b>{point.name}</b> section(s) of the app correct.'
                  },
                  plotOptions: {
                    pie: {
                      allowPointSelect: true,
                      cursor: 'pointer',
                      dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                      }
                    }
                  },
                  series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: data
                  }]
                }
              } );

            }

          },

          // Timing (Time Series Chart)
          () => {

            // add selector boxes for filtering
            addSelectorBox( 'user', 'show_all', onChange );
            addSelectorBox(  'app', 'show_all', onChange );

            // remember selector boxes
            elem.user = elem.filter.querySelector( '#user-input' );
            elem.app  = elem.filter.querySelector(  '#app-input' );

            // fill selector boxes with relevant entries
            fillSelectorBoxes();

            // (re)render section content
            onChange();

            /** when value of a selector box changed */
            async function onChange() {

              // remember selected values
              self.choosed_user = elem.user.value;
              self.choosed_app  = elem.app.value;

              // prepare database query for getting relevant app result data sets
              let query;
              if (  self.choosed_app && !self.choosed_user ) query = { "_id": { $regex: '^' + self.choosed_app  + '(,|$)' } };
              else if ( !self.choosed_app &&  self.choosed_user ) query = { "_id": { $regex: ',' + self.choosed_user + '(,|$)' } };
              else if (  self.choosed_app &&  self.choosed_user ) query = { "_id": { $regex: '^' + self.choosed_app  + ',' + self.choosed_user + '(,|$)' } };
              else                                                query = {};

              // get relevant app result data sets
              const results = await self.app.results.get( query );

              // no relevant results? => nothings to display
              if ( !results.length ) return $.setContent( elem.content, self.placeholder.message );

              // prepare data for chart rendering
              const series = [
                {
                  type: 'line',
                  name: 'created',
                  data: []
                },
                {
                  type: 'line',
                  name: 'last updated',
                  data: []
                }
              ];

              // iterate over all result data sets
              results.forEach( result => {

                /**
                 * date when this result was created
                 * @type {Date}
                 */
                let created_at = new Date( result.created_at );
                created_at.setHours(12);
                created_at.setMinutes(0);
                created_at.setSeconds(0);
                created_at.setMilliseconds(0);
                created_at = created_at.getTime();

                /**
                 * date when this result was last updated
                 * @type {Date}
                 */
                let updated_at = new Date( result.updated_at );
                updated_at.setHours(12);
                updated_at.setMinutes(0);
                updated_at.setSeconds(0);
                updated_at.setMilliseconds(0);
                updated_at = updated_at.getTime();

                // add 'Created' timestamp to data
                if ( series[ 0 ].data.length && series[ 0 ].data[ series[ 0 ].data.length - 1 ][ 0 ] === created_at )
                  series[ 0 ].data[ series[ 0 ].data.length - 1 ][ 1 ]++;
                else
                  series[ 0 ].data.push( [ created_at, 1 ] );

                // add 'Last Update' timestamp to data
                if ( series[ 1 ].data.length && series[ 1 ].data[ series[ 1 ].data.length - 1 ][ 0 ] === updated_at )
                  series[ 1 ].data[ series[ 1 ].data.length - 1 ][ 1 ]++;
                else
                  series[ 1 ].data.push( [ updated_at, 1 ] );
              } );

              // render chart
              await self.chart.start( {
                root: elem.content,
                settings: {
                  chart: {
                    zoomType: 'x'
                  },
                  title: {
                    text: ''
                  },
                  xAxis: {
                    type: 'datetime'
                  },
                  yAxis: {
                    title: {
                      text: 'App Results'
                    },
                    tickInterval: 1
                  },
                  tooltip: {
                    pointFormat: 'On this day, a result was <b>{series.name}</b> for <b>{point.y}</b> time(s).'
                  },
                  legend: {
                    enabled: true
                  },
                  series: series
                }
              } );

            }

          },

          // Details (Column Chart)
          () => {

            // add selector boxes for filtering
            addSelectorBox( 'app', 'choose', onChange );

            // remember selector boxes
            elem.app = elem.filter.querySelector( '#app-input' );

            // fill selector boxes with relevant entries
            fillSelectorBoxes();

            // (re)render section content
            onChange();

            /** when value of a selector box changed */
            async function onChange() {

              // remember selected values
              self.choosed_app = elem.app.value;

              // no app selected? => abort
              if ( !self.choosed_app ) return $.setContent( elem.content, '' );

              // prepare database query for getting relevant app result data sets
              let query;
              if ( self.choosed_app && !self.choosed_user ) query = { "_id": { $regex: '^' + self.choosed_app  + '(,|$)' } };
              else                                          query = {};

              // get relevant app result data sets
              const results = await self.app.results.get( query );

              // no relevant results? => nothings to display
              if ( !results.length ) return $.setContent( elem.content, self.placeholder.message );

              // prepare data for chart rendering
              const categories = [];
              const data = [];
              for ( let i = 0; i < results[ 0 ].details.length; i++ ) {
                categories[ i ] = results[ 0 ].details[ i ].gap;
                data[ i ] = 0;
              }
              results.forEach( result => {
                result.details.forEach( ( detail, i ) => {
                  if ( detail.correct )
                    data[ i ]++;
                } );
              } );

              // render chart
              await self.chart.start( {
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
                      text: 'App Section'
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
                    pointFormat: 'This section of the app was answered <b>{point.y}</b> times correctly.'
                  },
                  legend: {
                    enabled: false
                  },
                  series: [ {
                    data: data
                  } ]
                }
              } );

            }

          }

        ];

        // update content of section area
        sections[ self.section - 1 ]();

        /**
         * adds a selector box for filtering
         * @param {string} entry - 'user' or 'app'
         * @param {string} first - caption of first selector box entry
         * @param {function} onchange - change event for selector box
         */
        function addSelectorBox( entry, first, onchange ) {

          // render selector box for user
          $.append( elem.filter, $.html( self.html.entry, {
            entry: entry,
            label: self.placeholder[ entry ],
            first: self.placeholder[ first ],
            onchange: onchange
          } ) );

        }

        /** fill selector boxes with relevant entries */
        function fillSelectorBoxes() {

          // fill selector boxes with entries
          self.results.forEach( result => {
            if ( !Array.isArray( result.key ) ) result.key = [ result.key, undefined ];
            if ( elem.user && result.key[ 1 ] && !elem.user.querySelector( 'option[value="' + result.key[ 1 ] + '"]' ) ) $.append( elem.user, $.html( { tag: 'option', value: result.key[ 1 ], inner: result.key[ 1 ], selected: result.key[ 1 ] === self.choosed_user } ) );
            if ( !elem.app.querySelector( 'option[value="' + result.key[ 0 ] + '"]' ) ) $.append( elem.app, $.html( { tag: 'option', value: result.key[ 0 ], inner: result.key[ 0 ], selected: result.key[ 0 ] === self.choosed_app } ) );
          } );

        }

      }

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
/**
 * @overview ccm component for rendering fill-in-the-blank analytics
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 * @version latest (2.0.0)
 * @changes
 * version 2.0.0 (05.09.2018)
 * - uses ccm v18.0.0
 * - removed privatization of instance members
 * version 1.3.0 (21.05.2018)
 * - supports realtime analytics
 * version 1.2.0 (19.05.2018)
 * - added gaps section that contains chart for Gaps Analysis
 * version 1.1.0 (18.05.2018)
 * - shows also non user-specific fill-in-the-blank texts in results section
 * version 1.0.0 (18.05.2018)
 */

( function () {

  const component = {

    name: 'cloze_analytics',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

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
      "menu": [ "ccm.instance", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/menu/resources/configs.js", "bootstrap" ] ],
      "cloze": {
        "component": [ "ccm.component", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-5.0.0.js" ],
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

  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "table": [ "ccm.component", "https://ccmjs.github.io/tkless-components/table/versions/ccm.table-1.0.0.js" ],
  //  "chart": [ "ccm.component", "https://ccmjs.github.io/akless-components/highchart/versions/ccm.highchart-2.0.0.js" ]

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
        self.cloze.results.onchange = update;

      };

      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // logging of 'start' event
        self.logger && self.logger.log( 'start' );

        // get fill-in-the-blank text results
        self.results = await self.cloze.results.get( '{}' );

        // prepare main HTML structure
        elem.main = $.html( self.html.main );

        // remember section area
        elem.section = elem.main.querySelector( '#section' );

        // prepare login/logout area
        if ( self.user ) { await self.user.start(); $.setContent( elem.main.querySelector( '#user' ), self.user.root ); }

        /**
         * header menu entries data
         * @type {Object[]}
         */
        const entries = [];

        // add relevant menu entries
        for ( const key in self.sections ) {
          entries.push( {
            title: self.sections[ key ],
            actions: event_data => {

              /* click event of menu entry */

              // reset content of section area
              $.setContent( elem.section, event_data.selected ? '' : $.html( self.html.section ) );

              // remember areas for section inputs and content
              elem.inputs = elem.section.querySelector( '#inputs' );
              elem.content = elem.section.querySelector( '#content' );

              // remember clicked section
              self.section = event_data.selected ? '' : key;

              // render content of section area
              update();

            }
          } );
        }

        // render header menu
        $.setContent( elem.main.querySelector( '#menu' ), self.menu.root );
        self.menu.data = { entries: entries };
        self.menu.selected = 1;
        if ( self.section ) self.menu.selected = Object.keys( self.sections ).indexOf( self.section ) + 1;
        await self.menu.start();

        // put main HTML structure into frontend
        $.setContent( self.element, elem.main );

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

        // no open section? => abort
        if ( !self.section ) return;

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
            async function onChange() {

              // remember selected values
              self.choosed_user  = elem.user.value;
              self.choosed_cloze = elem.cloze.value;

              // prepare database query for getting relevant fill-in-the-blank text results
              let query;
                   if (  self.choosed_user && !self.choosed_cloze ) query = { "_id": { $regex:  '^' + self.choosed_user  + ',' } };
              else if ( !self.choosed_user &&  self.choosed_cloze ) query = { "_id": { $regex: '(^' + self.choosed_cloze + '$)|(,' + self.choosed_cloze + '(,|$))' } };
              else if (  self.choosed_user &&  self.choosed_cloze ) query = { "_id": { $regex:  '^' + self.choosed_user  + ','     + self.choosed_cloze + '(,|$)'  } };
              else                                                  query = '{}';

              // get relevant results
              const results = await self.cloze.results.get( query );

              // on relevant results? => nothings to display
              if ( !results.length ) return $.setContent( elem.content, self.placeholder.message );

              /**
               * contains values of all table rows
               * @type {Array[]}
               */
              const values = [];

              // iterate over each fill-in-the-blank text result
              results.forEach( result => {

                /**
                 * contains table row values for current fill-in-the-blank text result
                 * @type {string[]}
                 */
                const row = [ self.choosed_user, self.choosed_cloze, 0, '', result.created_at, result.updated_at ]; self.cloze.configs && row.push( '<a>' );

                // determine missing values for table row
                result.details.map( detail => detail.correct && row[ 2 ]++ );
                row[ 3 ] = Math.round( row[ 2 ] * 100 / result.details.length ) + '%';
                row[ 2 ] = row[ 2 ] + '/' + result.details.length;
                if ( Array.isArray( result.key ) ) { row[ 1 ] = result.key[ 1 ]; row[ 0 ] = result.key[ 0 ]; } else row[ 1 ] = result.key;
                values.push( row );

              } );

              // render table
              await self.table.start( {
                root: elem.content,
                table_head: self.placeholder.table_head,
                data: { values: values }
              } );

              // select 'Details' buttons
              [ ...instance.element.querySelectorAll( 'a' ) ].forEach( ( button_elem, i ) => {

                // set button caption
                button_elem.innerHTML = self.placeholder.details;

                // set button styling via bootstrap classes
                button_elem.classList.add( 'btn', 'btn-primary', 'btn-xs' );

                // set button click event
                button_elem.addEventListener( 'click', async () => {

                  // hide main HTML structure
                  elem.main.style.display = 'none';

                  // get fill-in-the-blank text configuration
                  const config = await self.cloze.configs.get( Array.isArray( results[ i ].key ) ? results[ i ].key[ 1 ] : results[ i ].key );

                  /**
                   * contains rendered details of fill-in-the-blank text
                   * @type {Element}
                   */
                  const details_elem = $.html( self.html.details, {
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
                  const cloze_inst = await self.cloze.comp.start( config );

                  /**
                   * submit button of fill-in-the-blank text
                   * @type {Element}
                   */
                  const submit_button = cloze_inst.element.querySelector( '#submit > *' );

                  // trigger click event of submit button to show feedback
                  cloze_inst.element.querySelector( '#submit > *' ).click();

                  // remove submit button
                  $.removeElement( submit_button );

                  // put rendered details in frontend
                  $.append( self.element, details_elem );

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
            async function onChange() {

              // remember selected values
              self.choosed_cloze = elem.cloze.value;

              // no fill-in-the-blank text selected? => abort
              if ( !self.choosed_cloze ) return $.setContent( elem.content, '' );

              // prepare database query for getting relevant fill-in-the-blank text results
              const query = { "_id": { $regex: '(^' + self.choosed_cloze + '$)|(,' + self.choosed_cloze + '(,|$))' } };

              // get relevant results
              const results = await self.cloze.results.get( query );

              // no relevant results? => nothing to display
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

            }

          }
        };

        // update content of section area
        sections[ self.section ]();

        /**
         * adds a section input entry
         * @param {string} entry - 'user' or 'cloze'
         * @param {string} first - caption of first selector box entry
         * @param {function} onchange - change event for selector box
         */
        function addInputEntry( entry, first, onchange ) {

          // render selector box for user
          $.append( elem.inputs, $.html( self.html.entry, {
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
            if ( !Array.isArray( result.key ) ) result.key = [ undefined, result.key ];
            if ( elem.user && result.key[ 0 ] && !elem.user.querySelector( 'option[value="' + result.key[ 0 ] + '"]' ) ) $.append( elem.user, $.html( { tag: 'option', value: result.key[ 0 ], inner: result.key[ 0 ], selected: result.key[ 0 ] === self.choosed_user } ) );
            if ( !elem.cloze.querySelector( 'option[value="' + result.key[ 1 ] + '"]' ) ) $.append( elem.cloze, $.html( { tag: 'option', value: result.key[ 1 ], inner: result.key[ 1 ], selected: result.key[ 1 ] === self.choosed_cloze } ) );
          } );

        }

      }

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
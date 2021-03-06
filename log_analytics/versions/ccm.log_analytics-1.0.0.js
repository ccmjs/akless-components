/**
 * @overview ccmjs-based web component for log analytics
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version 1.0.0
 * @changes
 * version 1.0.0 (27.04.2021)
 */

( () => {

  const component = {
    name: 'log_analytics',
    version: [ 1, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.3.0.js',
    config: {
      "chart": [ "ccm.component", "https://ccmjs.github.io/akless-components/highchart/versions/ccm.highchart-3.0.3.js" ],
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
          "https://ccmjs.github.io/akless-components/log_analytics/resources/styles.css"
        ]
      ],
      "data": {
        "store": [ "ccm.store" ],
        "key": {}
      },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.2.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/log_analytics/resources/templates.mjs" ],
      "menu": [ "ccm.component", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-3.0.2.js", {
        "css": [ "ccm.load", [
          "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
          "https://ccmjs.github.io/akless-components/menu/resources/top_tabs.css"
        ] ],
        "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/menu/resources/top_tabs.html" ],
        "trigger_selected": true
      } ],
//    "onstart": instance => { ... }
    },

    Instance: function () {

      let $, dataset, menu;

      this.start = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // get data
        dataset = await $.dataset( this.data );
        console.log( dataset );

        // no data? => nothing to display
        if ( !dataset ) return $.setContent( this.element, '<span class="p-3">No data to display.</span>' );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, () => { $.setContent( this.element.querySelector( '#refresh' ), $.loading( this ) ); this.start(); } ) );

        // render navigation
        menu = await this.menu.start( {
          root: this.element.querySelector( 'nav' ),
          data: { entries: [ 'Events', 'Locations', 'Timestamps' ] },
          onchange: async event => {
            if ( !menu ) return;
            switch ( event.id ) {
              case 1: renderEvents(); break;
              case 2: renderLocations(); break;
              case 3: renderTimestamps(); break;
            }
          }
        } );
        await menu.select( 1 );

        // trigger 'onstart' callback
        this.onstart && await this.onstart( this );

      };

      /**
       * returns the visualized data
       * @returns {Object}
       */
      this.getValue = () => $.clone( dataset );

      /** renders a chart that shows which events occurred how often */
      const renderEvents = () => {
        const events = {};
        let sum = 0;
        dataset.forEach( log => {
          if ( events[ log.event ] === undefined ) events[ log.event ] = 0;
          events[ log.event ]++;
          sum++;
        } );
        this.chart.start( {
          root: menu.element.querySelector( '#content' ),
          settings: {
            chart: {
              type: 'column'
            },
            title: {
              text: 'Which events occurred how often?'
            },
            subtitle: {
              text: `A total of ${sum} events were logged.`
            },
            xAxis: {
              categories: Object.keys( events ),
              crosshair: true
            },
            yAxis: {
              title: {
                text: 'Number of logged Events'
              }
            },
            tooltip: {
              formatter: function () {
                return `The event <b>${ this.point.category }</b> occurred <b>${ this.point.y }</b> times.`;
              }
            },
            plotOptions: {
              series: {
                dataLabels: {
                  enabled: true
                }
              }
            },
            series: [
              {
                name: '',
                data: Object.values( events )
              }
            ],
            legend: false
          }
        } );
      };

      /** renders a chart that shows when were events logged */
      const renderTimestamps = () => {

        const series = [
          { type: 'line', name: 'Ready Events', data: [] },
          { type: 'line', name: 'All Events', data: [] },
        ];

        const ready = {};
        const all = {};
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

        dataset.forEach( log => {
          log.event === 'ready' && add( log.created_at, ready );
          add( log.created_at, all );
        } );

        // convert data to needed array structure
        for ( const time in ready ) series[ 0 ].data.push( [ parseInt( time ), ready[ time ] ] );
        for ( const time in all   ) series[ 1 ].data.push( [ parseInt( time ), all  [ time ] ] );

        // sort data by time stamp
        series[ 0 ].data.sort( ( a, b ) => b[ 0 ] - a[ 0 ] );
        series[ 1 ].data.sort( ( a, b ) => b[ 0 ] - a[ 0 ] );

        // render chart
        this.chart.start( {
          root: menu.element.querySelector( '#content' ),
          settings: {
            chart: { zoomType: 'x' },
            title: {
              text: 'When were events logged?'
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
              pointFormat: 'In this hour, a event was logged for <b>{point.y}</b> time(s).'
            },
            legend: { enabled: true },
            series: series
          }
        } );

      };

      /** renders a chart that shows which events occurred how often */
      const renderLocations = () => {
        const locations = {};
        let sum = 0;
        dataset.filter( log => log.event === 'ready' ).forEach( log => {
          if ( locations[ log.website ] === undefined ) locations[ log.website ] = 0;
          locations[ log.website ]++;
          sum++;
        } );
        this.chart.start( {
          root: menu.element.querySelector( '#content' ),
          settings: {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie'
            },
            title: {
              text: 'On which webpages was the app used?'
            },
            subtitle: {
              text: `The app was used a total of ${ sum } times on ${ Object.keys( locations ).length } different webpages.`
            },
            tooltip: {
              pointFormat: 'The app was used on this webpage <b>{point.y}</b> times.'
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                  format: '<b>{point.y}</b>'
                },
                showInLegend: true
              }
            },
            series: [
              {
                colorByPoint: true,
                data: Object.keys( locations ).map( key => [ key, locations[ key ] ] )
              }
            ]
          }
        } );
      };

    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
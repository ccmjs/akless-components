/**
 * @overview ccmjs-based web component for kanban board analytics
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (04.03.2021)
 */

( () => {

  const component = {
    name: 'kanban_board_analytics',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.1.1.js',
    config: {
      "board": [ "ccm.instance", "https://ccmjs.github.io/akless-components/kanban_board/versions/kanban_board-4.0.0.js" ],
      "chart": [ "ccm.component", "https://ccmjs.github.io/akless-components/highchart/versions/ccm.highchart-3.0.3.js" ],
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_board_analytics/resources/default.css" ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.0.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_board_analytics/resources/templates.html" ]
    },

    Instance: function () {

      let $, dataset;

      this.start = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // load data of kanban board and cards
        const board = await $.dataset( this.board.data );
        const cards = [];
        for ( let i = 0; i < board.lanes.length; i++ )
          for ( let j = 0; j < board.lanes[ i ].cards.length; j++ )
            cards.push( await $.solveDependency( board.lanes[ i ].cards[ j ] ).then( card => $.dataset( card.data ) ) );

        // determine analytics data
        const dataset = {
          cards: board.lanes.reduce( ( cards, lane ) => cards + lane.cards.length, 0 ),
          lanes: board.lanes.map( ( lane, i ) => { return {
            title: this.board.lanes[ i ],
            cards: lane.cards.length
          } } ),
          members: this.board.members.map( member => { return {
            name: member,
            cards: cards.reduce( ( cards, card ) => cards + ( card.owner === member ? 1 : 0 ), 0 ),
            priorities: []
          } } ),
          priorities: $.clone( this.board.priorities )
        };
        dataset.priorities.push( '' );
        dataset.priorities.forEach( priority => dataset.members.forEach( member =>
            member.priorities.push( cards.reduce( ( cards, card ) =>
              cards + ( card.owner === member.name && ( card.priority || '' ) === priority ? 1 : 0 ), 0 )
            )
          )
        );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, this.start ) );

        // render lanes chart
        await this.chart.start( {
          root: this.element.querySelector( '#lanes' ),
          settings: {
            chart: {
              type: 'column'
            },
            title: {
              text: 'Number of Cards per Lane'
            },
            legend: {
              enabled: false
            },
            xAxis: {
              categories: dataset.lanes.map( lane => lane.title ),
              crosshair: true
            },
            yAxis: {
              min: 0,
              tickInterval: 1,
              title: {
                text: 'Number of Cards'
              }
            },
            plotOptions: {
              column: {
                pointPadding: 0.2,
                borderWidth: 0
              }
            },
            series: [
              {
                name: 'Cards',
                data: dataset.lanes.map( lane => lane.cards )
              }
            ]
          }
        } );

        // render members chart
        await this.chart.start( {
          root: this.element.querySelector( '#members' ),
          settings: {
            chart: {
              type: 'column'
            },
            title: {
              text: 'Number of Cards per Member'
            },
            xAxis: {
              categories: dataset.members.map( member => member.name )
            },
            yAxis: {
              min: 0,
              tickInterval: 1,
              title: {
                text: 'Number of Cards'
              }
            },
            legend: {
              reversed: false
            },
            plotOptions: {
              series: {
                stacking: 'normal'
              }
            },
            series: dataset.priorities.map( ( priority, i ) => { return {
              name: priority || 'without Priority',
              data: dataset.members.map( member => member.priorities[ i ] )
            } } )
          }
        } );

      };

      /**
       * returns current result data
       * @returns {Object}
       */
      this.getValue = () => $.clone( dataset );

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
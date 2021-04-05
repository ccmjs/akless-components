/**
 * @overview ccmjs-based web component for team project analytics
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version 2.1.1
 * @changes
 * version 2.1.1 (05.04.2021)
 * - uses ccmjs v26.2.1 as default
 * - uses helper.mjs v7.1.0 as default
 * - uses ccm.team_project.js v3.1.0 as default
 * version 2.1.0 (22.03.2021)
 * - added onstart callback
 * version 2.0.0 (16.03.2021)
 * - compatible with ccm.team_project.js v3
 * - uses ccmjs v26.2.0 as default
 * - no count of deleted kanban cards
 * version 1.0.0 (08.03.2021)
 */

( () => {

  const component = {
    name: 'team_project_analytics',
    version: [ 2, 1, 1 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.2.1.js',
    config: {
      "chart": [ "ccm.component", "https://ccmjs.github.io/akless-components/highchart/versions/ccm.highchart-3.0.3.js" ],
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
          "https://ccmjs.github.io/akless-components/team_project_analytics/resources/default.css"
        ]
      ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.1.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/team_project_analytics/resources/templates.mjs" ],
//    "onstart": instance => { ... },
      "project": [ "ccm.instance", "https://ccmjs.github.io/akless-components/team_project/versions/ccm.team_project-3.1.0.js" ]
    },

    Instance: function () {

      let $, dataset;

      this.start = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // load all project-related datasets
        const datasets = await this.project.data.store.get( { _id: { $regex: '^' + this.project.data.key + '-' } } );

        // separate datasets by type
        const source = { boards: {}, cards: [], messages: [] };
        datasets.forEach( entry => {
               if ( entry.key.endsWith( '-teams' ) ) source.teambuild = entry;
          else if ( entry.key.endsWith( '-board' ) ) source.boards[ entry.key.split( '-' )[ 2 ] ] = entry;
          else if ( entry.key.includes( '-card-' ) ) source.cards   .push( entry );
          else if ( entry.chat                     ) source.messages.push( entry );
        } );
        const boards_cards = Object.values( source.boards ).reduce( ( cards, board ) => cards.concat( board.lanes.reduce( ( cards, lane ) => cards.concat( lane.cards.map( card => card[ 2 ].data.key ) ), [] ) ), [] );
        source.cards = source.cards.filter( card => boards_cards.includes( card.key ) );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, () => { $.setContent( this.element.querySelector( '#refresh' ), $.loading( this ) ); this.start(); } ) );

        // no team building dataset? => nothing to display
        if ( !source.teambuild ) return $.setContent( this.element.querySelector( '#data' ), '<span class="p-3">This project has currently no teams.</span>' );

        // get kanban board instance (not team-specific)
        let board;
        for ( let i = 0; i < this.project.tools.length; i++ )
          if ( this.project.tools[ i ].key === 'board' )
            board = await this.project.tools[ i ].app.instance();

        // determine analytics data
        dataset = {
          teams: {},
          lanes: $.clone( board.lanes ),
          priorities: $.clone( board.priorities )
        };
        source.teambuild.teams.forEach( team => {
          if ( !Object.keys( team.members ).length ) return;
          dataset.teams[ team.key ] = {
            key: team.key,
            name: team.name,
            messages: 0,
            cards: 0,
            members: {},
            lanes: dataset.lanes.map( () => 0 ),
            priorities: dataset.priorities.map( () => 0 )
          };
          Object.keys( team.members ).forEach( member => dataset.teams[ team.key ].members[ member ] = {
            user: member,
            name: team.members[ member ],
            messages: 0,
            cards: 0,
            lanes: dataset.lanes.map( () => 0 ),
            priorities: dataset.priorities.map( () => 0 )
          } );
        } );
        source.messages.forEach( message => {
          const team = dataset.teams[ message.chat.split( '-' )[ 2 ] ];
          if ( !team ) return;
          team.messages++;
          team.members[ message.user ] && team.members[ message.user ].messages++;
        } );
        source.cards.forEach( card => {
          const team = dataset.teams[ card.key.split( '-' )[ 2 ] ];
          if ( !team ) return;
          const lane = getLane( source.boards[ team.key ], card );
          const priority = dataset.priorities.indexOf( card.priority ) + 1;
          const member = team.members[ card.owner ];
          team.cards++;
          lane && team.lanes[ lane - 1 ]++;
          priority && team.priorities[ priority - 1 ]++;
          if ( !member ) return;
          team.members[ card.owner ].cards++;
          lane && team.members[ card.owner ].lanes[ lane - 1 ]++;
          priority && team.members[ card.owner ].priorities[ priority - 1 ]++;
        } );

        // render analytics data
        this.html.render( this.html.table( dataset ), this.element.querySelector( '#data' ) );

        // trigger 'onstart' callback
        this.onstart && await this.onstart( this );

      };

      /**
       * returns current result data
       * @returns {Object}
       */
      this.getValue = () => $.clone( dataset );

      /**
       * get lane number of a card
       * @param {Object} board - kanban board data
       * @param {Object} card - kanban card data
       * @returns {number} card number (0: not found)
       */
      const getLane = ( board, card ) => {
        for ( let i = 0; i < board.lanes.length; i++ )
          for ( let j = 0; j < board.lanes[ i ].cards.length; j++ )
            if ( board.lanes[ i ].cards[ j ][ 2 ].data.key === card.key )
              return i + 1;
        return 0;
      };

    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
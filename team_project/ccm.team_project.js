/**
 * @overview ccm-based web component for team project
 * @author André Kless <andre.kless@web.de> 2020-2021
 * @license The MIT License (MIT)
 * @version latest (2.0.0)
 * @changes
 * version 2.0.0 (17.02.2021)
 * - uses ccmjs v26.1.1 as default
 * - uses helper.mjs v6.0.1 as default
 * - updated minified component line
 * - all datasets of a team project are stored in one datastore
 * (for older version changes see ccm.team_project-1.0.1.js)
 */

( () => {
  const component = {
    name: 'team_project',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.1.1.js',
    config: {
      "chat": [ "ccm.component", "https://ccmjs.github.io/akless-components/chat/versions/ccm.chat-2.0.0.js" ],
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/team_project/resources/default.css" ],
      "data": { "store": [ "ccm.store" ] },
      "entries": [ "Teams", "Kanban Board", "Chat" ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-6.0.1.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/team_project/resources/templates.html" ],
      "kanban_board": [ "ccm.component", "https://ccmjs.github.io/akless-components/kanban_board/versions/ccm.kanban_board-3.0.0.js" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "menu": [ "ccm.component", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-3.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/menu/resources/configs.js", "top_tabs" ] ],
//    "onchange": event => console.log( event ),
      "teambuild": [ "ccm.component", "https://ccmjs.github.io/akless-components/teambuild/versions/ccm.teambuild-4.0.0.js" ],
//    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js" ]
    },

    Instance: function () {

      let $, chat, kanban_board, main_elem, menu, team_data, team_nr, teambuild;

      this.init = async () => {
        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        if ( this.user ) this.user.onchange = this.start;  // listen to login/logout events => restart
        this.data.store.onchange = this.refresh;           // listen to datastore changes => update content
      };

      this.ready = async () => {
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );  // logging of 'ready' event
      };

      this.start = async () => {

        this.logger && this.logger.log( 'start', this.getValue() );  // logging of 'start' event
        main_elem = $.html( this.html.main );                        // prepare main HTML structure

        // render login/logout area
        if ( this.user ) { $.append( main_elem.querySelector( '#top' ), this.user.root ); this.user.start(); }

        // prepare team building
        teambuild = await this.teambuild.start( {
          data: {
            store: [ 'ccm.store', Object.assign( this.data.store.source(), { dataset: this.data.key + '-teams' } ) ],
            key: this.data.key + '-teams'
          },
          onchange: async event => {
            switch ( event.event ) {
              case 'join':
              case 'leave':
                team_nr = event.event === 'join' ? event.nr : 0;
                team_data = teambuild.getTeamData( team_nr );
                await updateMenu( !team_nr );
                await updateKanbanBoard();
                await updateChat();
                break;
            }
          },
          user: this.user ? [ 'ccm.instance', this.user.component.url, JSON.parse( this.user.config ) ] : ''
        } );
        team_nr = teambuild.getUserTeam();
        team_data = teambuild.getTeamData( team_nr );

        team_nr && await updateKanbanBoard();     // has a team? => prepare team-specific kanban board
        team_nr && await updateChat();            // has a team? => prepare team-specific chat
        await renderMenu();                       // render main menu
        $.setContent( this.element, main_elem );  // show prepared main HTML structure (removes loading icon)
      };

      /** renders the main menu */
      const renderMenu = async () => {
        menu = await this.menu.start( {
          root: main_elem.querySelector( '#menu' ),
          data: { entries: this.entries.map( ( title, i ) => { return { title: title, disabled: !( !i || team_nr ) } } ) },
          selected: 1,
          onchange: async event => {
            switch ( event.id ) {
              case 1: $.setContent( main_elem.querySelector( '#content' ),    teambuild.root ); break;
              case 2: $.setContent( main_elem.querySelector( '#content' ), kanban_board.root ); break;
              case 3: $.setContent( main_elem.querySelector( '#content' ),         chat.root ); break;
            }
          }
        } );
      };

      /** disables or enables menu entries for kanban board and chat */
      const updateMenu = disable => {
        menu.disable( 2, disable );
        menu.disable( 3, disable );
      };

      /** prepares the correct team-specific kanban board */
      const updateKanbanBoard = async () => {
        if ( !team_nr ) return kanban_board = null;
        kanban_board = await this.kanban_board.start( {
          data: {
            store: [ 'ccm.store', Object.assign( this.data.store.source(), { dataset: this.data.key + '-board-' + team_data.key } ) ],
            key: this.data.key + '-team-' + team_data.key + '-board'
          },
          'ignore.card.config.data.store': [ 'ccm.store', Object.assign( this.data.store.source(), { name: 'team_project-' + this.data.key + '-cards' } ) ],
          'ignore.card.config.user': [ 'ccm.instance', this.user.component.url, JSON.parse( this.user.config ) ],
          members: Object.keys( team_data.members ).sort(),
          user: [ 'ccm.instance', this.user.component.url, JSON.parse( this.user.config ) ]
        } );
      };

      /** prepares the correct team-specific chat */
      const updateChat = async () => {
        if ( !team_nr ) return chat = null;
        chat = await this.chat.start( {
          data: {
            store: [ 'ccm.store', this.data.store.source() ],
            key: this.data.key + '-team-' + team_data.key + '-chat'
          },
          user: [ 'ccm.instance', this.user.component.url, JSON.parse( this.user.config ) ]
        } );
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
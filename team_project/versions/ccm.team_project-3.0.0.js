/**
 * @overview ccmjs-based web component for team project
 * @author André Kless <andre.kless@web.de> 2020-2021
 * @license The MIT License (MIT)
 * @version 3.0.0
 * @changes
 * version 3.0.0 (14.03.2021)
 * - flexible adding of team-specific tools
 * - optimized amount of realtime connections
 * - changes config parameters for dependent components
 * - uses ccmjs v26.2.0 as default
 * - uses helper.mjs v7.0.0 as default
 * version 2.1.0 (08.03.2021)
 * - added dashboard with team project analytics
 * version 2.0.0 (17.02.2021)
 * - uses ccmjs v26.1.1 as default
 * - uses helper.mjs v6.0.1 as default
 * - uses ccm.kanban_board.js v4.0.0 as default
 * - uses ccm.teambuild.js v5.0.0 as default
 * - bugfix for realtime listening
 * - all datasets of a team project are stored in one datastore
 * - updated minified component line
 * (for older version changes see ccm.team_project-1.0.1.js)
 */

( () => {
  const component = {
    name: 'team_project',
    version: [ 3, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.2.0.js',
    config: {
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/team_project/resources/default.css" ],
      "dashboard": {
        "title": "Dashboard",
        "app": [ "ccm.component", "https://ccmjs.github.io/akless-components/team_project_analytics/versions/ccm.team_project_analytics-2.0.0.js" ]
      },
      "data": { "store": [ "ccm.store" ] },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.0.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/team_project/resources/templates.html" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "menu": [ "ccm.component", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-3.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/menu/resources/configs.js", "top_tabs" ] ],
//    "onchange": event => console.log( event ),
      "teambuild": {
        "title": "Teams",
        "app": [ "ccm.component", "https://ccmjs.github.io/akless-components/teambuild/versions/ccm.teambuild-5.0.0.js" ]
      },
      "tools": [
        {
          "key": "chat",
          "title": "Chat",
          "app": [ "ccm.component", "https://ccmjs.github.io/akless-components/chat/versions/ccm.chat-2.1.0.js" ]
        },
        {
          "key": "board",
          "title": "Kanban Board",
          "app": [ "ccm.component", "https://ccmjs.github.io/akless-components/kanban_board/versions/ccm.kanban_board-4.0.0.js" ]
        }
      ],
//    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js" ]
    },

    Instance: function () {

      let $, main_elem, menu, source, team_data, team_nr, teambuild, tools = [];

      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // listen to login/logout events => restart
        if ( this.user ) this.user.onchange = this.start;

        // disable default listening to realtime datastore changes
        this.data.store.onchange = null;

      };

      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

        // separate datastore settings with realtime
        source = this.data.store.source();
        if ( source.url.startsWith( 'http' ) )
          source.url = source.url.replace( 'http', 'ws' );

      };

      this.start = async () => {

        this.logger && this.logger.log( 'start', this.getValue() );  // logging of 'start' event
        main_elem = $.html( this.html.main );                        // prepare main HTML structure

        // render login/logout area
        if ( this.user ) { $.append( main_elem.querySelector( '#top' ), this.user.root ); this.user.start(); }

        // prepare team building
        teambuild = await this.teambuild.app.start( {
          data: {
            store: [ 'ccm.store', Object.assign( $.clone( source ), { dataset: this.data.key + '-teams' } ) ],
            key: this.data.key + '-teams'
          },
          onchange: async event => {
            switch ( event.event ) {
              case 'join':
                team_nr = event.nr;
                team_data = teambuild.getTeamData( team_nr );
                await updateMenu();
                break;
              case 'leave':
                await updateMenu( true );
                tools = [];
                break;
            }
          },
          user: this.user ? [ 'ccm.instance', this.user.component.url, JSON.parse( this.user.config ) ] : ''
        } );
        team_nr = teambuild.getUserTeam();
        team_data = teambuild.getTeamData( team_nr );

        await renderMenu();                       // render main menu
        $.setContent( this.element, main_elem );  // show prepared main HTML structure

      };

      /** renders the main menu */
      const renderMenu = async () => {
        const entries = this.tools.map( tool => { return { title: tool.title, disabled: !team_nr } } );
        entries.unshift( { title: this.teambuild.title } );
        this.dashboard && entries.push( { title: this.dashboard.title } );
        menu = await this.menu.start( {
          root: main_elem.querySelector( '#menu' ),
          data: { entries: entries },
          selected: 1,
          onchange: event => {
            if ( event.id === 1 )
              $.setContent( main_elem.querySelector( '#content' ), teambuild.root );
            else if ( event.id === entries.length )
              this.dashboard.app.start( { parent: null, root: main_elem.querySelector( '#content' ), project: [ 'ccm.instance', this.component.index, JSON.parse( this.config ) ] } );
            else
              renderTool( event.id - 2 );
          }
        } );
      };

      /** disables or enables menu entries for kanban board and chat */
      const updateMenu = disable => {
        for ( let i = 0; i < this.tools.length; i++ )
          menu.disable( i + 2, disable );
      };

      /**
       * renders a team-specific tool
       * @param {number} i - tool index
       */
      const renderTool = async i => {
        if ( !team_nr ) return tools[ i ] = null;
        if ( tools[ i ] ) return $.setContent( main_elem.querySelector( '#content' ), tools[ i ].root );
        const key = this.data.key + '-team-' + team_data.key + '-' + this.tools[ i ].key;
        tools[ i ] = await this.tools[ i ].app.start( {
          root: main_elem.querySelector( '#content' ),
          data: {
            store: [ 'ccm.store', Object.assign( $.clone( source ), { dataset: key } ) ],
            key: key
          },
          members: Object.keys( team_data.members ).sort(),
          user: [ 'ccm.instance', this.user.component.url, JSON.parse( this.user.config ) ]
        } );
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
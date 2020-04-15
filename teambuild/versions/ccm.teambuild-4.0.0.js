/**
 * @overview ccm component for team building
 * @author André Kless <andre.kless@web.de> 2017-2020
 * @license The MIT License (MIT)
 * @version 4.0.0
 * @changes
 * version 4.0.0 (10.04.2020)
 * - uses ccm v25.4.0
 * - uses helper.mjs v5.0.0 as default
 * - reduced amount of realtime messages
 * - checks permissions for better usability
 * - added optional reload button
 * - changed parameters in logged data
 * - changed parameters of onchange callback
 * - added public method: checkAction(team_nr,action):boolean
 * - added public method: getMember(team_nr,user_key):username
 * - added public method: getTeamData(team_nr):team_data
 * - added public method: getTeamElement(team_nr):team_elem
 * - added public method: getUserTeam(user_key):team_nr
 * - added public method: getValue():teams_data
 * - added public method: isEmptyTeam(team_nr):boolean
 * - added public method: isJoinable(team_nr,user_key):boolean
 * - added public method: isOnlyMember(team_nr,user_key):boolean
 * - added public method: joinableTeams():boolean
 * - added public method: joinTeam(team_nr):void
 * - added public method: leaveTeam(team_nr):void
 * - added public method: refresh(app_data):void
 * - added public method: renameTeam(team_nr,name):void
 * (for older version changes see ccm.teambuild-3.1.2.js)
 */

( () => {

  const component = {

    name: 'teambuild', version: [ 4, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.4.0.js',

    config: {
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/teambuild/resources/default.css" ],
      "data": { "store": [ "ccm.store" ] },
      "editable": {
        "join": true,
        "leave": true,
        "rename": true
      },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-5.0.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/teambuild/resources/templates.html" ],
      "icon": {
        /*
        "join": "",
        "leave": "",
        "member": "https://ccmjs.github.io/akless-components/teambuild/resources/icon.svg",
        "team": ""
         */
      },
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.4.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "max_members": 3,
  //  "max_teams": 5,
  //  "names": [ "Team Red", "Team Blue" ],
  //  "onchange": event => console.log( event ),
  //  "reload": true,
      "text": {
        "team": "Team",
        "leave": "leave",
        "join": "join",
        "free": "free",
        "message": "Nothing to display."
      },
  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.4.1.js" ]
    },

    Instance: function () {

      let $, app_data, main_elem, user_key;

      this.init = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper );  // set shortcut to help functions
        if ( this.user ) this.user.onchange = this.start;       // listen to login/logout events => restart
        this.data.store.onchange = this.refresh;                // listen to datastore changes => (re)render own content
      };

      this.ready = async () => {
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );  // logging of 'ready' event
      };

      this.start = async () => {

        $.setContent( this.element, $.loading( this ) );                             // render loading icon
        app_data = await $.dataset( this.data );                                     // get existing app data
        user_key = this.user && this.user.isLoggedIn() && this.user.getValue().key;  // get unique key of logged in user
        this.logger && this.logger.log( 'start', $.clone( app_data ) );              // logging of 'start' event
        if ( !app_data.teams ) app_data.teams = [];                                  // no teams data? => set default value
        main_elem = $.html( this.html.main, this.start );                            // get main HTML structure
        if ( !this.reload ) $.remove( main_elem.querySelector( '#reload' ) );        // no refresh button wanted? => remove refresh button
        this.refresh();                                                              // update own content
        if ( app_data.teams.length === 0 ) $.setContent( main_elem.querySelector( '#teams' ), this.text.message );  // no teams? => show message
        if ( this.user ) { $.append( main_elem.querySelector( '#top' ), this.user.root ); this.user.start(); }      // render login/logout area
        $.setContent( this.element, main_elem );                                     // show prepared main HTML structure (removes loading icon)

      };

      /**
       * checks whether a specific action is allowed for a specific team
       * @param {number} team_nr - team number
       * @param {string} action - 'join', 'leave' or 'rename'
       * @returns {boolean}
       */
      this.checkAction = ( team_nr, action ) => {
        let team_data = getTeam( team_nr );
        team_data = team_data.editable === undefined ? this : team_data;
        return !( team_data.editable === false || $.isObject( team_data.editable ) && team_data.editable[ action ] === false );
      };

      /**
       * returns the username of a specific team member
       * @param {number} team_nr - team number
       * @param {string} [user] - unique user key (default: current user)
       * @returns {string} displayed username (falsy if the user is not a member of the team)
       */
      this.getMember = ( team_nr, user = user_key ) => getTeam( team_nr ).members[ user ];

      /**
       * returns the data of a specific team
       * @param {number} team_nr - team number
       * @returns {Object} team data
       */
      this.getTeamData = team_nr => $.clone( getTeam( team_nr ) );

      /**
       * returns the container of a specific team
       * @param {number} team_nr - team number
       * @returns {Element} team container
       */
      this.getTeamElement = team_nr => main_elem.querySelectorAll( '.team' )[ team_nr - 1 ];

      /**
       * returns the number of the team to which a specific user currently belongs
       * @param {string} [user] - unique user key (default: current user)
       * @returns {number} team number
       */
      this.getUserTeam = ( user = user_key ) => {
        for ( let i = 0; i < app_data.teams.length; i++ )
          if ( this.getMember( i + 1, user ) ) return i + 1;
      };

      /**
       * returns current result data
       * @returns {Object} app data (contains the data of all teams)
       */
      this.getValue = () => $.clone( app_data );

      /**
       * checks if a specific team has no members
       * @param {number} team_nr - team number
       * @returns {boolean}
       */
      this.isEmptyTeam = team_nr => !Object.keys( getTeam( team_nr ).members ).length;

      /**
       * checks if a specific user can join a specific team
       * @param {number} team_nr - team number
       * @param {string} [user] - unique user key (default: current user)
       * @returns {boolean}
       */
      this.isJoinable = ( team_nr, user = user_key ) => {

        if ( !$.isDatastore( this.data.store ) || !user ) return false;             // no datastore or no user? => false
        if ( !$.hasPermission( app_data, this.user, 'set' ) ) return false;         // user has no permission for updates? => false
        if ( this.getMember( team_nr, user ) ) return false;                        // user is already a member of the team? => false
        if ( !this.checkAction( team_nr, 'join' ) ) return false;                   // is the team not joinable? => false
        const user_team = this.getUserTeam( user );                                 // get the data of the team the user already belongs to
        if ( user_team && !this.checkAction( user_team, 'leave' ) ) return false;   // is the user a member of a team that can not be left? => false
        if ( !this.max_teams && team_nr === app_data.teams.length && team_nr > 1 )  // unlimited number of teams and this team is last (always empty) team and not the only one?
          if ( this.isOnlyMember( team_nr - 1, user ) ) return false;               // => the user is the only member in the last not empty team? => false

        // the team can be joined if the allowed number of team members is unlimited or is not exceeded by joining
        return !this.max_members || Object.keys( getTeam( team_nr ).members ).length < this.max_members;

      };

      /**
       * checks if a specific user can leave a specific team
       * @param {number} team_nr - team number
       * @param {string} [user] - unique user key (default: current user)
       * @returns {boolean}
       */
      this.isLeavable = ( team_nr, user = user_key ) => $.isDatastore( this.data.store ) && user && $.hasPermission( app_data, this.user, 'set' ) && this.getMember( team_nr, user ) && this.checkAction( team_nr, 'leave' );

      /**
       * checks if a specific user can rename the name of a specific team
       * @param {number} team_nr - team number
       * @param {string} [user] - unique user key (default: current user)
       * @returns {boolean}
       */
      this.isRenamable = ( team_nr, user = user_key ) => $.isDatastore( this.data.store ) && user && $.hasPermission( app_data, this.user, 'set' ) && this.getMember( team_nr, user ) && this.checkAction( team_nr, 'rename' );

      /**
       * checks if an user is the only member in a specific team
       * @param {number} team_nr - team number
       * @param {string} [user] - unique user key (default: current user)
       * @returns {boolean}
       */
      this.isOnlyMember = ( team_nr, user = user_key ) => this.getMember( team_nr, user ) && Object.keys( getTeam( team_nr ).members ).length === 1;

      /**
       * checks if teams are joinable
       * @returns {boolean}
       */
      this.joinableTeams = () => !( this.editable === false || this.editable && this.editable.join === false );

      /**
       * lets the current user join a team
       * @param {number} team_nr - team number
       * @returns {Promise<void>}
       */
      this.joinTeam = async team_nr => {

        if ( !this.isJoinable( team_nr ) ) return;      // team is not joinable? => abort
        const joined_team = getTeam( team_nr );         // get team data of joined team
        const leaved_team_nr = this.getUserTeam();      // get team number of leaved team
        const leaved_team = getTeam( leaved_team_nr );  // get team data of leaved team
        if ( leaved_team_nr ) {                         // is user already a member of another team?
          await this.leaveTeam( leaved_team_nr );       // => remove user from member list of leaved team
          // unlimited number of teams and leaved team is now empty? => remove leaved team
          if ( !this.max_teams && this.isEmptyTeam( leaved_team_nr ) ) app_data.teams.splice( leaved_team_nr - 1, 1 );
        }

        joined_team.members[ user_key ] = this.user.getUsername();  // add user to member list of joined team
        await this.data.store.set( app_data ); this.refresh();      // update app data and own content

        // log 'join' event and trigger 'onchange' callback
        this.logger && this.logger.log( 'join', { team: $.clone( joined_team ), nr: team_nr, leaved: leaved_team_nr } );
        this.onchange && this.onchange( { event: 'join', team: $.clone( joined_team ), nr: team_nr, leaved: leaved_team_nr, element: this.getTeamElement( team_nr ), instance: this } );

      };

      /**
       * lets the current user leave a team
       * @param {number} team_nr - team number
       * @returns {Promise<void>}
       */
      this.leaveTeam = async team_nr => {

        if ( !this.isLeavable( team_nr ) ) return;             // team can not be left? => abort
        const team_data = getTeam( team_nr );                  // get team data
        delete team_data.members[ user_key ];                  // remove user from member list
        if ( !this.max_teams && this.isEmptyTeam( team_nr ) )  // unlimited number of teams and leaved team is now empty?
          app_data.teams.splice( team_nr - 1 , 1 );            // => remove leaved team
        await this.data.store.set( app_data );                 // update app data
        this.refresh();                                        // update own content

        // log 'leave' event and trigger 'onchange' callback
        this.logger && this.logger.log( 'leave', { team: $.clone( team_data ), nr: team_nr } );
        this.onchange && this.onchange( { event: 'leave', team: $.clone( team_data ), nr: team_nr, element: this.getTeamElement( team_nr ), instance: this } );

      };

      /**
       * updates own content and local app data after app data has changed
       * @param {Object} [dataset] - updated app data (default: local app data)
       */
      this.refresh = ( dataset = app_data ) => renderTeams( app_data = dataset );

      /**
       * renames the name of the team to which the current user belongs
       * @param {number} team_nr - team number
       * @param {string} name - new team name
       * @returns {Promise<void>}
       */
      this.renameTeam = async ( team_nr, name ) => {

        if ( !this.isRenamable( team_nr ) ) return;  // team can not be left? => abort
        const team_data = getTeam( team_nr );        // get team data
        team_data.name = $.protect( name.trim() );   // update team name in team data
        await this.data.store.set( app_data );       // save team data

        // log 'rename' event and trigger 'onchange' callback
        this.logger && this.logger.log( 'rename', { team: $.clone( team_data ) } );
        this.onchange && this.onchange( { event: 'rename', team: $.clone( team_data ), nr: team_nr, instance: this } );

      };

      /** renders the team containers */
      const renderTeams = () => {

        $.setContent( main_elem.querySelector( '#teams' ), '' );  // clear teams container
        app_data.teams.forEach( appendTeam );                     // render existing teams

        // limited number of teams? => add empty teams
        if ( this.max_teams ) {
          const needed = this.max_teams - app_data.teams.length;
          for ( let i = 0; i < needed; i++ )
            appendEmptyTeam();
        }
        // unlimited number of teams, last team is not empty and teams are joinable? => add empty team
        else if ( ( app_data.teams.length === 0 || !this.isEmptyTeam( app_data.teams.length ) ) && this.joinableTeams() ) appendEmptyTeam();

      }

      /**
       * adds a team in the teams container
       * @param {Object} team_data - team data
       * @param {number} [i] - team index (default: adds an empty team)
       */
      const appendTeam = ( team_data, i = app_data.teams.length - 1 ) => {

        // set team name
        const team_nr = i + 1;
        if ( !team_data.name || /^\w+ \d+$/.test( team_data.name ) )
          team_data.name = this.names && this.names[ i ] ? this.names[ i ] : this.text.team + ' ' + team_nr;

        const team_elem = $.html( this.html.team, { icon: this.icon.team, name: team_data.name } );  // team container
        main_elem.querySelector( '#teams' ).appendChild( team_elem );                                // add team container to main HTML structure
        renderMembers( team_nr );                                                                    // add team members in the members container

        // add join button
        this.isJoinable( team_nr ) && $.setContent( this.getTeamElement( team_nr ).querySelector( '.button' ), $.html( this.html.button, {
          icon: this.icon.join,
          caption: this.text.join,
          onclick: () => this.joinTeam( team_nr )
        } ) );

        // add leave button
        this.isLeavable( team_nr ) && $.setContent( this.getTeamElement( team_nr ).querySelector( '.button' ), $.html( this.html.button, {
          icon: this.icon.leave,
          caption: this.text.leave,
          onclick: () => this.leaveTeam( team_nr )
        } ) );

        // make the team name editable
        if ( !this.isRenamable( team_nr ) ) return;
        const name_elem = this.getTeamElement( team_nr ).querySelector( '.name' );
        name_elem.setAttribute( 'contenteditable', true );
        name_elem.addEventListener( 'input', async () => this.renameTeam( team_nr, name_elem.textContent ) );

      };

      /** adds an empty team in the teams container */
      const appendEmptyTeam = () => {
        const team = { key: $.generateKey(), members: {} };  // initial team data (empty team without members)
        app_data.teams.push( team );                         // add empty team data to existing teams
        appendTeam( team );                                  // add empty team to main HTML structure
      };

      /**
       * returns the data of a specific team
       * @param {number} team_nr - team number
       */
      const getTeam = team_nr => app_data.teams[ team_nr - 1 ];

      /**
       * renders member entries in the container of a team
       * @param {number} team_nr - team number
       */
      const renderMembers = team_nr => {
        const team_data = getTeam( team_nr ), team_elem = this.getTeamElement( team_nr );               // get data and container of the team
        $.setContent( team_elem.querySelector( '.members' ), '' );                                      // clear container for team members
        for ( const key in team_data.members ) appendMember( team_nr, key, team_data.members[ key ] );  // add team members in team container
        const free_slots = this.max_members - Object.keys( team_data.members ).length;                  // amount of free member slot in the team
        for ( let i = 0; i < free_slots; i++ ) appendMember( team_nr );                                 // add free member slots in the team container
      };

      /**
       * adds a single member entry in the container of a team
       * @param {number} team_nr - team number
       * @param {string} [user] - unique user key of the new member (default: free member slot)
       * @param {string} [username] - displayed username of the new member (default: unique user key)
       */
      const appendMember = ( team_nr, user, username = user ) => {

        /**
         * HTML structure of team member
         * @type {Element}
         */
        const member_elem = $.html( this.html.member, { icon: this.icon.member, name: user ? ( username === true ? user : username ) : this.text.free } );

        const name_elem = member_elem.querySelector( '.name' );                                 // container that contains the username of the team member
        user && user_key && user === user_key && name_elem.classList.add( 'user' );             // member is a logged in user? => mark it as own username
        !user && name_elem.classList.add( 'free' );                                             // is a free member slot? => mark it as free
        this.getTeamElement( team_nr ).querySelector( '.members' ).appendChild( member_elem );  // add the member in the team container

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
/**
 * @overview ccmjs-based web component for team building
 * @author André Kless <andre.kless@web.de> 2017-2019
 * @license The MIT License (MIT)
 * @version 3.1.1
 * @changes
 * version 3.1.1 (10.10.2019)
 * - uses ccm v24.0.1
 * version 3.1.0 (06.02.2019)
 * - main HTML structure replaces own website area
 * - team dataset has always team name
 * - bug fix for directly logged in
 * version 3.0.1 (30.12.2018)
 * - uses ccm v20.0.0
 * version 3.0.0 (07.11.2018)
 * - uses ccm v18.4.0
 * - removed privatization of instance members
 * - correct logging of join event
 * (for older version changes see ccm.teambuild-2.0.0.js)
 * TODO: lock and unlock for team joining
 */

( () => {

  const component = {

    name: 'teambuild', version: [ 3, 1, 1 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-24.0.1.js',

    config: {

      "html": {
        "main": {
          "id": "element",
          "inner": [
            { "id": "user" },
            { "id": "teams" }
          ]
        },
        "team": {
          "class": "team",
          "inner": [
            {
              "class": "header",
              "inner": [
                {
                  "class": "name",
                  "inner": "%name%"
                },
                { "class": "button" }
              ]
            },
            { "class": "members" }
          ]
        },
        "button": {
          "tag": "button",
          "inner": "%caption%",
          "onclick": "%onclick%"
        },
        "member": {
          "class": "member",
          "inner": {
            "class": "name",
            "inner": "%name%"
          }
        }
      },
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/teambuild/resources/default.css" ],
      "data": { "store": [ "ccm.store" ] },
      "text": {
        "team": "Team",
        "leave": "leave",
        "join": "join",
        "free": "free",
        "message": "Nothing to display."
      },
      "icon": {},
      "editable": true

  //  "names": [ "Team Red", "Team Blue" ],
  //  "max_teams": 5,
  //  "max_members": 3,
  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "demo" ] ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onchange": event_data => { console.log( event_data ); }

    },

    Instance: function () {

      let $;

      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // listen to login/logout events => restart
        if ( this.user ) this.user.onchange = this.start;

      };

      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        /**
         * start state of team building
         * @type {Object}
         */
        const dataset = await $.dataset( this.data );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // no start state exists? => set default start state
        if ( !dataset.teams ) dataset.teams = [];

        // render main HTML structure
        $.replace( this.element, this.element = $.html( this.html.main ) );

        /**
         * contains teams
         * @type {Element}
         */
        const teams_elem = this.element.querySelector( '#teams' );

        // render login/logout area
        if ( this.user ) { $.setContent( this.element.querySelector( '#user' ), this.user.root ); await this.user.start(); }

        // add HTML structure for each team
        const self = this; addTeams();

        /** adds teams to main HTML structure */
        function addTeams() {

          // add existing teams
          dataset.teams.forEach( addTeam );

          // limited number of teams? => add empty teams
          if ( self.max_teams ) {
            const needed = self.max_teams - dataset.teams.length;
            for ( let i = 0; i < needed; i++ )
              addEmptyTeam();
          }

          // unlimited number of teams, last team is not empty and teams are joinable? => add empty team
          else if ( ( dataset.teams.length === 0 || !isEmptyTeam( dataset.teams[ dataset.teams.length - 1 ] ) ) && joinableTeams() ) addEmptyTeam();

          // no teams? => show message
          if ( dataset.teams.length === 0 ) $.setContent( teams_elem, self.text.message );

          /**
           * adds a team to the main HTML structure
           * @param {Object} team - team data
           * @param {number} [i] - team index (default is: number of existing teams - 1)
           */
          function addTeam( team, i ) {

            // no team index? => use default value (when rendering a empty team)
            if ( i === undefined ) i = dataset.teams.length - 1;

            // set team name
            if ( !team.name || team.name.startsWith( self.text.team + ' ' ) ) team.name = self.names && self.names[ i ] ? self.names[ i ] : self.text.team + ' ' + ( i + 1 );

            /**
             * HTML structure of team
             * @type {Element}
             */
            const team_elem = $.html( self.html.team, {
              icon: self.icon.team,
              name: team.name
            } );

            /**
             * maximum number of team members
             * @type {number}
             */
            const max_members = team.max_members || self.max_members;

            /**
             * logged in user
             * @type {string}
             */
            const user = self.user && self.user.isLoggedIn() && self.user.data().user;

            // has datastore and logged in user? (than user can make changes)
            if ( $.isObject( self.data ) && $.isDatastore( self.data.store ) && user ) {

              /**
               * number of the team to which the user currently belongs
               * @type {number}
               */
              const user_team = user && getUserTeam();

              // user is member of this team?
              if ( isMember( team ) ) {

                // should team name be editable? => make team name editable
                if ( isEditable( i, 'rename' ) ) makeEditable();

                // should the user have the possibility to leave the team? => add leave button
                if ( isEditable( i, 'leave' ) ) addLeaveButton();

              }

              // user is no member and team is joinable? => add join button
              else if ( isJoinable() ) addJoinButton();

              /**
               * checks whether user is a member of a particular team
               * @param {Object} team - team data
               * @returns {boolean}
               */
              function isMember( team ) {

                return !!team.members[ user ];

              }

              /**
               * checks whether a particular action is allowed for a particular team
               * @param {number} team - team index
               * @param {string} action - 'join', 'leave' or 'rename'
               * @returns {boolean}
               */
              function isEditable( team, action ) {

                if ( team.editable === undefined )
                  return !( self.editable === false || $.isObject( self.editable ) && self.editable[ action ] === false );
                else
                  return !( team.editable === false || $.isObject( team.editable ) && team.editable[ action ] === false );

              }

              /** makes team name editable */
              function makeEditable() {

                /**
                 * contains team name
                 * @type {Element}
                 */
                const name_elem = team_elem.querySelector( '.name' );

                // make team name ediatable
                name_elem.setAttribute( 'contenteditable', true );
                name_elem.addEventListener( 'input', async () => {

                  /**
                   * renamed team name
                   * @type {string}
                   */
                  const value = name_elem.textContent.trim();

                  // update team name in team data
                  team.name = $.protect( value );

                  // logging of 'rename' event
                  self.logger && self.logger.log( 'rename', $.clone( { team: team.key, name: team.name } ) );

                  // update team building dataset in datastore
                  await self.data.store.set( dataset );

                } );

              }

              /** adds button that allows user to leave team */
              function addLeaveButton() {

                // use template for team button
                $.setContent( team_elem.querySelector( '.button' ), $.html( self.html.button, {
                  icon: self.icon.leave,
                  caption: self.text.leave,
                  onclick: async () => {

                    // remove user from member list
                    delete team.members[ user ];

                    // unlimited number of teams and leaved team is now empty? => remove leaved team
                    if ( !self.max_teams && isEmptyTeam( team ) ) dataset.teams.splice( i , 1 );

                    // update team building dataset in datastore
                    await self.data.store.set( dataset );

                    /**
                     * event data of 'leave' event
                     * @type {Object}
                     */
                    const event_data = { leaved: team.key };

                    // logging of 'leave' event
                    self.logger && self.logger.log( 'leave', $.clone( event_data ) );

                    // perform 'onchange' callback
                    self.onchange && self.onchange( self, $.clone( event_data ) );

                    // restart (updates own content)
                    await self.start();

                  }
                } ) );

              }

              /**
               * checks if user can join this team
               * @returns {boolean}
               */
              function isJoinable() {

                // join action for this team is not allowed? => negative result
                if ( !isEditable( i, 'join' ) ) return false;

                // is user a member of a team that can not be left? => negative result
                if ( user_team && !isEditable( user_team - 1, 'leave' ) ) return false;

                // unlimited number of teams and this team is last (always empty) team and not the only one?
                if ( !self.max_teams && i === dataset.teams.length - 1 && i > 0 ) {

                  // user is only member in last not empty team? => team is not joinable
                  if ( isOnlyMember( dataset.teams[ i - 1 ] ) ) return false;

                  /**
                   * checks if user is only member in a particular team
                   * @param {Object} team - team data
                   * @returns {boolean}
                   */
                  function isOnlyMember( team ) {

                    return team.members[ user ] && Object.keys( team.members ).length === 1;

                  }

                }

                // the team can be joined if the allowed number of team members is unlimited or is not exceeded by joining
                return !max_members || Object.keys( team.members ).length < max_members;

              }

              /** adds button that allows user to join team */
              function addJoinButton() {

                // use template for team button
                $.setContent( team_elem.querySelector( '.button' ), $.html( self.html.button, {
                  icon: self.icon.join,
                  caption: self.text.join,
                  onclick: async () => {

                    /**
                     * data of team that user must leave
                     * @type {Object}
                     */
                    const leaving_team = user_team && dataset.teams[ user_team - 1 ];

                    // is user already a member of another team? => user must leave that team
                    if ( user_team ) {

                      // remove user from member list
                      delete leaving_team.members[ user ];

                      // unlimited number of teams and leaved team is now empty? => remove leaved team
                      if ( !self.max_teams && isEmptyTeam( leaving_team ) ) dataset.teams.splice( user_team - 1, 1 );

                    }

                    // add user to member list
                    team.members[ user ] = true;

                    // update team building dataset in datastore
                    await self.data.store.set( dataset );

                    /**
                     * event data of 'join' event
                     * @type {Object}
                     */
                    const event_data = { joined: team.key, leaved: leaving_team && leaving_team.key };

                    // logging of 'join' event
                    self.logger && self.logger.log( 'join', $.clone( event_data ) );

                    // perform 'onchange' callback
                    self.onchange && self.onchange( self, $.clone( event_data ) );

                    // restart (updates own content)
                    await self.start();

                  }
                } ) );

              }

            }

            // add HTML structure for each member
            addMembers();

            // add team to main HTML structure
            teams_elem.appendChild( team_elem );

            /**
             * returns number of team to which user currently belongs
             * @returns {number}
             */
            function getUserTeam() {

              // is user a team member? => return team number
              for ( let i = 0; i < dataset.teams.length; i++ )
                if ( dataset.teams[ i ].members[ user ] ) return i + 1;

              // user is no team member => return undefined
            }

            /** adds members to HTML structure of team */
            function addMembers() {

              /**
               * contains team members
               * @type {Element}
               */
              const members_elem = team_elem.querySelector( '.members' );

              // add team members
              for ( const member in team.members ) addMember( member );

              // is there a maximum number of team members? => add free member slots
              for ( let i = 0; i < max_members - Object.keys( team.members ).length; i++ ) addMember();

              /**
               * adds a member to HTML structure of team
               * @param {Object} [member] - member name
               */
              function addMember( member ) {

                /**
                 * HTML structure of team member
                 * @type {Element}
                 */
                const member_elem = $.html( self.html.member, {
                  icon: self.icon.member,
                  name: member ? member : self.text.free
                } );

                /**
                 * contains name of team member
                 * @type {Element}
                 */
                const name_elem = member_elem.querySelector( '.name' );

                // member is logged in user? => mark it as user
                if ( user && member && user === member ) name_elem.classList.add( 'user' );

                // is a free member slot? => mark it as free
                if ( !member ) name_elem.classList.add( 'free' );

                // add member to HTML structure of team
                members_elem.appendChild( member_elem );

              }

            }

          }

          /**
           * checks if a particular team has no members
           * @param {Object} team - team data
           * @returns {boolean}
           */
          function isEmptyTeam( team ) {

            return Object.keys( team.members ).length === 0;

          }

          /** adds a empty team slot */
          function addEmptyTeam() {

            /**
             * initial team data (empty team without members)
             * @type {Object}
             */
            const team = { key: $.generateKey(), members: {} };

            // add empty team data to existing teams
            dataset.teams.push( team );

            // add empty team to main HTML structure
            addTeam( team );

          }

          /**
           * checks if teams are joinable
           * @returns {boolean}
           */
          function joinableTeams() {

            return !( self.editable === false || self.editable && self.editable.join === false );

          }

        }

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
/**
 * @overview ccm component for team building
 * @author André Kless <andre.kless@web.de> 2017-2018
 * @license The MIT License (MIT)
 * @version 2.0.0
 * @changes
 * version 2.0.0 (22.05.2018): code modernisation
 * - changes in default configuration
 * - changes in logging handling
 * - supports onchange callback
 * - uses ECMAScript 6 syntax
 * - uses ccm v16.6.0
 * version 1.0.1 (08.11.2017)
 * - changes in default instance configuration
 * - bugfix for default and initial team names
 * - uses ccm v12.12.0
 * version 1.0.0 (19.10.2017)
 * TODO: lock and unlock for team joining
 */

( function () {

  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'teambuild',

    /**
     * component version
     * @type {number[]}
     */
    version: [ 2, 0, 0 ],

    /**
     * reference to used framework version
     * @type {Object}
     */
    ccm: {
      url: 'https://ccmjs.github.io/ccm/versions/ccm-16.6.0.js',
      integrity: 'sha384-LcGBJPmX/Aq5Jkre3q9yE+UCsd7vPWIgeBb9ayc4TIAl5H1nJpewlkKCDK8eCc7s',
      crossorigin: 'anonymous'
    },

    /**
     * default instance configuration
     * @type {Object}
     */
    config: {

      "html": {
        "main": {
          "id": "main",
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
      "text": {
        "team": "Team",
        "leave": "leave",
        "join": "join",
        "free": "free"
      },
      "icon": {},
      "editable": true

  //  "data": { "store": [ "ccm.store" ] },
  //  "names": [ "Team Red", "Team Blue" ],
  //  "max_teams": 5,
  //  "max_members": 3,
  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-6.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "demo" ] ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onchange": ( instance, event_data ) => { console.log( event_data ); }

    },

    /**
     * for creating instances out of this component
     * @constructor
     */
    Instance: function () {

      /**
       * own reference for inner functions
       * @type {Instance}
       */
      const self = this;

      /**
       * privatized instance members
       * @type {Object}
       */
      let my;

      /**
       * shortcut to help functions
       * @type {Object.<string,function>}
       */
      let $;

      /**
       * is called once after all dependencies are solved and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.init = callback => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // listen to login/logout events => restart
        if ( self.user ) self.user.onchange = () => self.start();

        // listen to datastore changes => restart
        if ( self.data.store ) self.data.store.onchange = () => self.start();

        callback();
      };

      /**
       * is called once after the initialization and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.ready = callback => {

        // privatize all possible instance members
        my = $.privatize( self );

        // has logger instance? => log 'ready' event
        self.logger && self.logger.log( 'ready', $.clone( my ) );

        callback();
      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = callback => {

        // get start state of team building
        $.dataset( my.data, dataset => {

          // has logger instance? => log 'start' event
          self.logger && self.logger.log( 'start', $.clone( dataset ) );

          // no start state exists? => set default start state
          if ( !dataset.teams ) dataset.teams = [];

          /**
           * main HTML structure
           * @type {Element}
           */
          const main_elem = $.html( my.html.main );

          /**
           * contains teams
           * @type {Element}
           */
          const teams_elem = main_elem.querySelector( '#teams' );

          // prepare login/logout area
          self.user ? self.user.start( () => { $.setContent( main_elem.querySelector( '#user' ), self.user.root ); proceed(); } ) : proceed();

          function proceed() {

            // add HTML structures for each team
            addTeams();

            // set content of own website area
            $.setContent( self.element, main_elem );

            // rendering completed => perform callback
            callback && callback();

            /** adds teams to main HTML structure */
            function addTeams() {

              // add existing teams
              dataset.teams.map( addTeam );

              // limited number of teams? => add empty teams
              if ( my.max_teams ) {
                const needed = my.max_teams - dataset.teams.length;
                for ( let i = 0; i < needed; i++ )
                  addEmptyTeam();
              }

              // unlimited number of teams, last team is not empty and teams are joinable? => add empty team
              else if ( ( dataset.teams.length === 0 || !isEmptyTeam( dataset.teams[ dataset.teams.length - 1 ] ) ) && joinableTeams() ) addEmptyTeam();

              /**
               * adds a team to the main HTML structure
               * @param {Object} team - team data
               * @param {number} [i] - team index (default is: number of existing teams - 1)
               */
              function addTeam( team, i ) {

                // no team index? => use default value (when rendering a empty team)
                if ( i === undefined ) i = dataset.teams.length - 1;

                /**
                 * HTML structure of team
                 * @type {Element}
                 */
                const team_elem = $.html( my.html.team, {
                  icon: my.icon.team,
                  name: team.name ? team.name : ( my.names && my.names[ i ] ? my.names[ i ] : my.text.team + ' ' + ( i + 1 ) )
                } );

                /**
                 * maximum number of team members
                 * @type {number}
                 */
                const max_members = team.max_members || my.max_members;

                /**
                 * logged in user
                 * @type {string}
                 */
                const user = self.user && self.user.isLoggedIn() && self.user.data().user;

                // has datastore and logged in user? (than user can make changes)
                if ( $.isObject( my.data ) && $.isDatastore( my.data.store ) && user ) {

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
                      return !( my.editable === false || $.isObject( my.editable ) && my.editable[ action ] === false );
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
                    name_elem.addEventListener( 'input', () => {

                      /**
                       * renamed team name
                       * @type {string}
                       */
                      const value = name_elem.textContent.trim();

                      // update team name in team data
                      team.name = $.protect( value );

                      // update team building dataset in datastore
                      my.data.store.set( dataset, () => {

                        // has logger instance? => log 'rename' event
                        self.logger && self.logger.log( 'rename', $.clone( { team: team.key, name: team.name } ) );

                      } );

                    } );

                  }

                  /** adds button that allows user to leave team */
                  function addLeaveButton() {

                    // use template for team button
                    $.setContent( team_elem.querySelector( '.button' ), $.html( my.html.button, {
                      icon: my.icon.leave,
                      caption: my.text.leave,
                      onclick: () => {

                        // remove user from member list
                        delete team.members[ user ];

                        // unlimited number of teams and leaved team is now empty? => remove leaved team
                        if ( !my.max_teams && isEmptyTeam( team ) ) dataset.teams.splice( i , 1 );

                        // update team building dataset in datastore
                        my.data.store.set( dataset, () => {

                          /**
                           * event data of 'leave' event
                           * @type {Object}
                           */
                          const event_data = { leaved: team.key };

                          // has logger instance? => log 'leave' event
                          self.logger && self.logger.log( 'leave', $.clone( event_data ) );

                          // perform 'onchange' callback
                          self.onchange && self.onchange( self, $.clone( event_data ) );

                          // restart (updates own content)
                          self.start();

                        } );

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
                    if ( !my.max_teams && i === dataset.teams.length - 1 && i > 0 ) {

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
                    $.setContent( team_elem.querySelector( '.button' ), $.html( my.html.button, {
                      icon: my.icon.join,
                      caption: my.text.join,
                      onclick: () => {

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
                          if ( !my.max_teams && isEmptyTeam( leaving_team ) ) dataset.teams.splice( user_team - 1, 1 );

                        }

                        // add user to member list
                        team.members[ user ] = true;

                        // update team building dataset in datastore
                        my.data.store.set( dataset, () => {

                          /**
                           * event data of 'join' event
                           * @type {Object}
                           */
                          const event_data = { joined: team.key, leaved: leaving_team && leaving_team.key };

                          // has logger instance? => log 'leave' event
                          self.logger && self.logger.log( 'leave', $.clone( event_data ) );

                          // perform 'onchange' callback
                          self.onchange && self.onchange( self, $.clone( event_data ) );

                          // restart (updates own content)
                          self.start();

                        } );

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
                    const member_elem = $.html( my.html.member, {
                      icon: my.icon.member,
                      name: member ? member : my.text.free
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

                return !( my.editable === false || my.editable && my.editable.join === false );

              }

            }

          }

        } );

      };

    }

  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );
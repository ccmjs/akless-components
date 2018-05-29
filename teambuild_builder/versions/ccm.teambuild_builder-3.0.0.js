/**
 * @overview ccm component for building a team building
 * @author André Kless <andre.kless@web.de> 2017-2018
 * @license The MIT License (MIT)
 * @version 3.0.0
 * @changes
 * version 3.0.0 (24.05.2018): modernisation
 * version 2.4.0 (21.03.2018): added 'Basic' and 'Advanced' section
 * version 2.3.0 (27.11.2017):
 * - more compact inputs mask (pull request by Tea Kless)
 * - add help icons with help texts
 * - bugfix for 'editable' properties
 * version 2.2.0 (09.11.2017): add 'getValue():obj' interface
 * version 2.1.0 (09.11.2017): linking labels and input fields
 * version 2.0.0 (08.11.2017):
 * - remove preview functionality
 * - only one placeholder for onchange events
 * - guarantee boolean for checkbox value results
 * - add default onfinish
 * - rename config property 'initial' to 'start_values'
 * version 1.0.0 (08.11.2017)
 */

{
  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'teambuild_builder',

    /**
     * component version
     * @type {number[]}
     */
    version: [ 3, 0, 0 ],

    /**
     * reference to used framework version
     * @type {Object}
     */
    ccm: {
      url: 'https://ccmjs.github.io/ccm/versions/ccm-16.6.1.js',
      integrity: 'sha384-zCsUcQEg4NqpF91vJatXIU7aDUcYENcTCchNCwisDiA1ZzTR+ShsqJtmYIHG120k',
      crossorigin: 'anonymous'
    },

    /**
     * default instance configuration
     * @type {string|{url: string, integrity: string, crossorigin: string}}
     */
    config: {

      "html": {
        "id": "main",
        "class": "container-fluid",
        "inner": [
          {
            "tag": "legend",
            "class": "text-primary",
            "inner": "Build your Realtime Team Building"
          },
          {
            "tag": "form",
            "onsubmit": "%submit%",
            "inner": [
              {
                "id": "navigation",
                "class": "text-center",
                "inner": {
                  "id": "buttons",
                  "class": "btn-group",
                  "inner": [
                    {
                      "tag": "a",
                      "typ": "button",
                      "id": "button-basic",
                      "class": "active btn btn-info",
                      "onclick": "%basic%",
                      "inner": "Basic"
                    },
                    {
                      "tag": "a",
                      "type": "button",
                      "id": "button-advanced",
                      "class": "btn btn-warning",
                      "onclick": "%advanced%",
                      "inner": "Advanced"
                    }
                  ]
                }
              },
              {
                "id": "section-basic",
                "inner": [
                  {
                    "id": "max_teams",
                    "class": "form-group",
                    "inner": [
                      {
                        "tag": "label",
                        "id": "max_teams-label",
                        "for": "max_teams-input",
                        "class": "control-label",
                        "inner": "Maximum Teams"
                      },
                      {
                        "tag": "span",
                        "id": "max_teams-help",
                        "class": "help",
                        "inner": [
                          {
                            "tag": "a",
                            "id": "max_teams-icon",
                            "onclick": "%help%",
                            "inner": {
                              "class": "glyphicon glyphicon-info-sign"
                            }
                          },
                          {
                            "id": "max_teams-info",
                            "class": "alert alert-info",
                            "inner": "Here you can specify the maximum number of teams. Leave this field empty if the number of teams is to be unlimited."
                          }
                        ]
                      },
                      {
                        "tag": "input",
                        "type": "number",
                        "id": "max_teams-input",
                        "class": "form-control",
                        "name": "max_teams",
                        "onchange": "%change%",
                        "min": 0
                      }
                    ]
                  },
                  {
                    "id": "max_members",
                    "class": "form-group",
                    "inner": [
                      {
                        "tag": "label",
                        "id": "max_members-label",
                        "for": "max_members-input",
                        "class": "control-label",
                        "inner": "Maximum Team Members"
                      },
                      {
                        "tag": "span",
                        "id": "max_members-help",
                        "class": "help",
                        "inner": [
                          {
                            "tag": "a",
                            "id": "max_members-icon",
                            "onclick": "%help%",
                            "inner": {
                              "class": "glyphicon glyphicon-info-sign"
                            }
                          },
                          {
                            "id": "max_members-info",
                            "class": "alert alert-info",
                            "inner": "Here you can specify the maximum number of team members. If a team has reached the maximum number of team members, no other user can join the team. Leave this field empty if the number of team members is to be unlimited."
                          }
                        ]
                      },
                      {
                        "tag": "input",
                        "type": "number",
                        "id": "max_members-input",
                        "class": "form-control",
                        "name": "max_members",
                        "onchange": "%change%",
                        "min": 0
                      }
                    ]
                  }
                ]
              },
              {
                "id": "section-advanced",
                "class": "hide",
                "inner": [
                  {
                    "id": "text.team",
                    "class": "form-group",
                    "inner": [
                      {
                        "tag": "label",
                        "id": "text.team-label",
                        "for": "text.team-input",
                        "class": "control-label",
                        "inner": "Team Name"
                      },
                      {
                        "tag": "span",
                        "id": "text.team-help",
                        "class": "help",
                        "inner": [
                          {
                            "tag": "a",
                            "id": "text.team-icon",
                            "onclick": "%help%",
                            "inner": {
                              "class": "glyphicon glyphicon-info-sign"
                            }
                          },
                          {
                            "id": "text.team-info",
                            "class": "alert alert-info",
                            "inner": "Here you can specify the default name of a team. As long as a team does not have an individual name, the name given here will be displayed for the team and automatically extended by a unique team number."
                          }
                        ]
                      },
                      {
                        "tag": "input",
                        "type": "text",
                        "id": "text.team-input",
                        "class": "form-control",
                        "name": "text.team",
                        "onchange": "%change%"
                      }
                    ]
                  },
                  {
                    "id": "text.free",
                    "class": "form-group",
                    "inner": [
                      {
                        "tag": "label",
                        "id": "text.free-label",
                        "for": "text.free-input",
                        "class": "control-label",
                        "inner": "Free Team Member Slot Label"
                      },
                      {
                        "tag": "span",
                        "id": "text.free-help",
                        "class": "help",
                        "inner": [
                          {
                            "tag": "a",
                            "id": "text.free-icon",
                            "onclick": "%help%",
                            "inner": {
                              "class": "glyphicon glyphicon-info-sign"
                            }
                          },
                          {
                            "id": "text.free-info",
                            "class": "alert alert-info",
                            "inner": "Here you can specify which label to use for a free member slot in a team with a limited number of members."
                          }
                        ]
                      },
                      {
                        "tag": "input",
                        "type": "text",
                        "id": "text.free-input",
                        "class": "form-control",
                        "name": "text.free",
                        "onchange": "%change%"
                      }
                    ]
                  },
                  {
                    "id": "user",
                    "class": "form-group",
                    "inner": [
                      {
                        "tag": "label",
                        "id": "user-label",
                        "for": "user-input",
                        "class": "control-label",
                        "inner": "Sign-on"
                      },
                      {
                        "tag": "span",
                        "id": "user-help",
                        "class": "help",
                        "inner": [
                          {
                            "tag": "a",
                            "id": "user-icon",
                            "onclick": "%help%",
                            "inner": {
                              "class": "glyphicon glyphicon-info-sign"
                            }
                          },
                          {
                            "id": "user-info",
                            "class": "alert alert-info",
                            "inner": [
                              "If you select a sign-on mode here, authentication will be requested after the completion of the fill-in-the-blank text and the results will only be submitted if the authentication was successful. The various sign-on modes are described below.",
                              {
                                "tag": "h5",
                                "inner": "Guest Mode"
                              },
                              {
                                "tag": "p",
                                "inner": "The user can authenticate with any username and without password. This mode is mostly used for test and demo scenarios."
                              },
                              {
                                "tag": "h5",
                                "inner": "H-BRS FB02"
                              },
                              {
                                "tag": "p",
                                "inner": "In this mode the user has to authenticate access with a valid account from the Department of Computer Sciences at Hochschule Bonn-Rhein-Sieg University of Applied Sciences."
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "tag": "select",
                        "id": "user-input",
                        "class": "form-control",
                        "name": "user",
                        "onchange": "%change%",
                        "inner": [
                          {
                            "tag": "option",
                            "inner": "None",
                            "value": ""
                          },
                          {
                            "tag": "option",
                            "inner": "Guest Mode",
                            "value": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.0.js',['ccm.get','https://ccmjs.github.io/akless-components/user/resources/configs.js','guest']]"
                          },
                          {
                            "tag": "option",
                            "inner": "H-BRS FB02",
                            "value": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.0.js',['ccm.get','https://ccmjs.github.io/akless-components/user/resources/configs.js','hbrsinfkaul']]"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "id": "css",
                    "class": "form-group",
                    "inner": [
                      {
                        "tag": "label",
                        "id": "css-label",
                        "for": "css",
                        "class": "control-label",
                        "inner": "Layout"
                      },
                      {
                        "tag": "span",
                        "id": "css-help",
                        "class": "help",
                        "inner": [
                          {
                            "tag": "a",
                            "id": "css-icon",
                            "onclick": "%help%",
                            "inner": {
                              "class": "glyphicon glyphicon-info-sign"
                            }
                          },
                          {
                            "id": "css-info",
                            "class": "alert alert-info",
                            "inner": "Here you can choose between different layouts, in which the team building is then displayed."
                          }
                        ]
                      },
                      {
                        "tag": "select",
                        "id": "css-input",
                        "class": "form-control",
                        "name": "css",
                        "onchange": "%change%",
                        "inner": [
                          {
                            "tag": "option",
                            "inner": "Default",
                            "value": "['ccm.load','https://ccmjs.github.io/akless-components/teambuild/resources/default.css']"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "id": "names",
                    "class": "form-group",
                    "inner": [
                      {
                        "tag": "label",
                        "id": "names-label",
                        "for": "names-input",
                        "class": "control-label",
                        "inner": "Initial Team Names"
                      },
                      {
                        "tag": "span",
                        "id": "names-help",
                        "class": "help",
                        "inner": [
                          {
                            "tag": "a",
                            "id": "names-icon",
                            "onclick": "%help%",
                            "inner": {
                              "class": "glyphicon glyphicon-info-sign"
                            }
                          },
                          {
                            "id": "names-info",
                            "class": "alert alert-info",
                            "inner": "Here you can set initial individual team names separated by commas."
                          }
                        ]
                      },
                      {
                        "tag": "input",
                        "type": "text",
                        "id": "names-input",
                        "class": "form-control",
                        "name": "names",
                        "onchange": "%change%"
                      }
                    ]
                  },
                  {
                    "id": "editable",
                    "inner": [
                      {
                        "tag": "label",
                        "id": "editable-label",
                        "class": "control-label",
                        "inner": "Teams Can Be.."
                      },
                      {
                        "id": "grid",
                        "inner": [
                          {
                            "id": "editable.join",
                            "class": "form-inline",
                            "inner": [
                              {
                                "tag": "label",
                                "id": "editable.join-label",
                                "for": "editable.join-input",
                                "class": "control-label",
                                "inner": "Joined"
                              },
                              {
                                "tag": "a",
                                "id": "editable.join-icon",
                                "onclick": "%help%",
                                "inner": {
                                  "class": "glyphicon glyphicon-info-sign"
                                }
                              },
                              {
                                "id": "editable.join-entry",
                                "class": "checkbox",
                                "inner": {
                                  "tag": "input",
                                  "type": "checkbox",
                                  "id": "editable.join-input",
                                  "name": "editable.join",
                                  "onchange": "%change%"
                                }
                              },
                              {
                                "id": "editable.join-info",
                                "class": "alert alert-info",
                                "inner": "Here you can choose whether authenticated users can join a team."
                              }
                            ]
                          },
                          {
                            "id": "editable.leave",
                            "class": "form-inline",
                            "inner": [
                              {
                                "tag": "label",
                                "id": "editable.leave-label",
                                "for": "editable.leave-input",
                                "class": "control-label",
                                "inner": "Leaved"
                              },
                              {
                                "tag": "a",
                                "id": "editable.leave-icon",
                                "onclick": "%help%",
                                "inner": {
                                  "class": "glyphicon glyphicon-info-sign"
                                }
                              },
                              {
                                "id": "editable.leave-entry",
                                "class": "checkbox",
                                "inner": {
                                  "tag": "input",
                                  "type": "checkbox",
                                  "id": "editable.leave-input",
                                  "name": "editable.leave",
                                  "onchange": "%change%"
                                }
                              },
                              {
                                "id": "editable.leave-info",
                                "class": "alert alert-info",
                                "inner": "Here you can choose whether authenticated users can leave a team."
                              }
                            ]
                          },
                          {
                            "id": "editable.rename",
                            "class": "form-inline",
                            "inner": [
                              {
                                "tag": "label",
                                "id": "editable.rename-label",
                                "for": "editable.rename-input",
                                "class": "control-label",
                                "inner": "Renamed"
                              },
                              {
                                "tag": "a",
                                "id": "editable.rename-icon",
                                "onclick": "%help%",
                                "inner": {
                                  "class": "glyphicon glyphicon-info-sign"
                                }
                              },
                              {
                                "id": "editable.rename-entry",
                                "class": "checkbox",
                                "inner": {
                                  "tag": "input",
                                  "type": "checkbox",
                                  "id": "editable.rename-input",
                                  "name": "editable.rename",
                                  "onchange": "%change%"
                                }
                              },
                              {
                                "id": "editable.rename-info",
                                "class": "alert alert-info",
                                "inner": "Here you can choose whether authenticated users can rename a team they belong to by clicking on the team name."
                              }
                            ]
                          },
                          {
                            "inner": {
                              "id": "text.join",
                              "class": "form-group",
                              "inner": [
                                {
                                  "tag": "label",
                                  "id": "text.join-label",
                                  "for": "text.join-input",
                                  "class": "control-label",
                                  "inner": "Join Button Caption"
                                },
                                {
                                  "tag": "span",
                                  "id": "text.join-help",
                                  "class": "help",
                                  "inner": [
                                    {
                                      "tag": "a",
                                      "id": "text.join-icon",
                                      "onclick": "%help%",
                                      "inner": {
                                        "class": "glyphicon glyphicon-info-sign"
                                      }
                                    },
                                    {
                                      "id": "text.join-info",
                                      "class": "alert alert-info",
                                      "inner": "Here you can set the caption of the button for joining a team."
                                    }
                                  ]
                                },
                                {
                                  "tag": "input",
                                  "type": "text",
                                  "id": "text.join-input",
                                  "class": "form-control",
                                  "name": "text.join",
                                  "onchange": "%change%"
                                }
                              ]
                            }
                          },
                          {
                            "inner": {
                              "id": "text.leave",
                              "class": "form-group",
                              "inner": [
                                {
                                  "tag": "label",
                                  "id": "text.leave-label",
                                  "for": "text.leave-input",
                                  "class": "control-label",
                                  "inner": "Leave Button Caption"
                                },
                                {
                                  "tag": "span",
                                  "id": "text.leave-help",
                                  "class": "help",
                                  "inner": [
                                    {
                                      "tag": "a",
                                      "id": "text.leave-icon",
                                      "onclick": "%help%",
                                      "inner": {
                                        "class": "glyphicon glyphicon-info-sign"
                                      }
                                    },
                                    {
                                      "id": "text.leave-info",
                                      "class": "alert alert-info",
                                      "inner": "Here you can set the caption of the button for leaving a team."
                                    }
                                  ]
                                },
                                {
                                  "tag": "input",
                                  "type": "text",
                                  "id": "text.leave-input",
                                  "class": "form-control",
                                  "name": "text.leave",
                                  "onchange": "%change%"
                                }
                              ]
                            }
                          },
                          {}
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "tag": "input",
                "type": "hidden",
                "name": "data.store"
              },
              {
                "tag": "input",
                "type": "hidden",
                "name": "data.key"
              },
              {
                "tag": "input",
                "type": "hidden",
                "name": "text.message"
              },
              {
                "id": "section-preview",
                "inner": [
                  {
                    "tag": "legend",
                    "id": "preview-legend",
                    "class": "text-primary",
                    "inner": "Here's a Preview of what you've Build"
                  },
                  {
                    "id": "preview"
                  }
                ]
              },
              {
                "id": "section-submit",
                "class": "form-group",
                "inner": {
                  "class": "col-md-12 text-right",
                  "inner": {
                    "tag": "input",
                    "type": "submit",
                    "id": "button-submit",
                    "class": "btn btn-primary"
                  }
                }
              }
            ]
          }
        ]
      },
      "css": [ "ccm.load",
        "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
        "https://ccmjs.github.io/akless-components/teambuild_builder/resources/default.css"
      ],
      "defaults": {
        "editable": {
          "join": true,
          "leave": true,
          "rename": true
        },
        "text": {
          "team": "Team",
          "leave": "leave",
          "join": "join",
          "free": "free",
          "message": "Nothing to display."
        },
        "data.store": "['ccm.store',{'store':'teambuild_data','url':'wss://ccm2.inf.h-brs.de'}]",
        "user": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.0.js',['ccm.get','https://ccmjs.github.io/akless-components/user/resources/configs.js','guest']]"
      },
      "target": [ "ccm.component", "https://ccmjs.github.io/akless-components/teambuild/versions/ccm.teambuild-2.0.0.js" ],
      "submit_button": true,
      "preview": true

  //  "data": { "store": [ "ccm.store", { "test": { ... } } ], "key": "test" },
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onchange": instance => console.log( instance.getValue() ),
  //  "onfinish": { "log": true }

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
       * is called once after the initialization and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.ready = callback => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        callback();
      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = callback => {

        // get initial form values
        $.dataset( my.data, dataset => {

          // prepare initial form values
          prepareValues();

          // render input elements
          $.setContent( self.element, $.html( my.html, {
            basic:    () => switchSection( '#button-basic', '#button-advanced', '#section-basic', '#section-advanced' ),
            advanced: () => switchSection( '#button-advanced', '#button-basic', '#section-advanced', '#section-basic' ),
            submit: self.submit,
            change: onChange,
            help: function () {

              // hide and show help texts
              const this_a = this;
              [ ...self.element.querySelectorAll( 'a' ) ].map( other_a => other_a !== this_a && other_a.classList.remove( 'active' ) );
              this.classList.toggle( 'active' );

              // log 'help' event
              self.logger && self.logger.log( 'help', { name: this.id.split( '-' )[ 0 ], active: this.classList.contains( 'active' ) } );

            }
          } ) );

          // fill form with initial values
          $.fillForm( self.element, dataset );

          // hide input elements for which this is necessary
          setVisibility();

          // render preview
          if ( my.preview ) updatePreview();

          // no preview desired? => remove preview section
          else $.removeElement( self.element.querySelector( '#section-preview' ) );

          // no submit button wanted? => remove submit button
          !my.submit_button && $.removeElement( self.element.querySelector( '#button-submit' ) );

          // individual caption for submit button? => set caption of submit button
          if ( typeof my.submit_button === 'string' ) self.element.querySelector( '#button-submit' ).value = my.submit_button;

          // rendering completed => perform callback
          callback && callback();

          /** prepares initial form values */
          function prepareValues() {

            // set default value for dataset key of app-specific teambuild data
            if ( !my.defaults[ 'data.key' ] ) my.defaults[ 'data.key' ] = $.generateKey();

            // integrate default values into initial values
            dataset = $.integrate( my.defaults, dataset, true );

            // encode dependencies
            $.encodeDependencies( dataset );

            // prepare initial team names
            if ( dataset.names ) dataset.names = dataset.names.join( ', ' );

            // convert initial values to dot notation
            dataset = $.toDotNotation( dataset );

          }

          /**
           * switches to basic or advanced section
           * @param {string} active - selector for active section button
           * @param {string} inactive - selector for inactive section button
           * @param {string} showed - selector for showed section element
           * @param {string} hidden - selector for hidden section element
           */
          function switchSection( active, inactive, showed, hidden ) {

            // activate section button
            self.element.querySelector( active   ).classList.add   ( 'active' );
            self.element.querySelector( inactive ).classList.remove( 'active' );

            // show section element
            self.element.querySelector( showed ).classList.remove( 'hide' );
            self.element.querySelector( hidden ).classList.add( 'hide' );

            // log 'section' event
            self.logger && self.logger.log( 'section', showed.substr( 1 ).split( '-' )[ 1 ] );

          }

          /** callback if an input value has changed */
          function onChange() {

            // hide and show input elements for which this is necessary
            setVisibility();

            // update preview considering the changed input value
            updatePreview();

            // perform change actions
            self.onchange && self.onchange( self );

            // log 'change' event
            self.logger && self.logger.log( 'change', { name: this.name, value: this.type === 'checkbox' ? this.checked : this.value } );

          }

          /** defines which input elements are visible or hidden. */
          function setVisibility() {

            self.element.querySelector( '#text\\.join'  ).style.display = getInputElementByName( 'editable.join'  ).checked ? 'block' : 'none';
            self.element.querySelector( '#text\\.leave' ).style.display = getInputElementByName( 'editable.leave' ).checked ? 'block' : 'none';
            function getInputElementByName( name ) { return self.element.querySelector( '[name="' + name + '"]' ); }

          }

          /** (re)renders the preview based on the entered values */
          function updatePreview() {

            // no preview desired? => abort
            if ( !my.preview ) return;

            // (re)render preview
            my.target.start( self.getValue(), instance => $.setContent( self.element.querySelector( '#preview' ), instance.root ) );

          }

        } );

      };

      /** triggers the submit of the entered data */
      this.submit = event => {


        // prevent page reload
        if ( event ) event.preventDefault();

        // log 'finish' event
        self.logger && self.logger.log( 'finish', self.getValue() );

        // perform finish actions
        $.onFinish( self );

      };

      /**
       * returns the resulting instance configuration for the target component
       * @returns {Object} instance configuration for target component
       */
      this.getValue = () => {

        /**
         * values of the input elements
         * @type {Object}
         */
        let result = $.formData( self.element.querySelector( 'form' ) );

        // convert comma-separated initial team names to array
        if ( result.names ) {
          result.names = result.names.split( ',' );
          result.names.map( ( value, i, arr ) => arr[ i ] = value.trim() );
        }

        // guarantee boolean for checkbox values
        result.editable.join   = !!result.editable.join;
        result.editable.leave  = !!result.editable.leave;
        result.editable.rename = !!result.editable.rename;

        // convert dot notation properties to deeper objects
        result = $.solveDotNotation( result );

        // use empty string if no value was specified
        if ( !result.user ) result.user = '';

        // now values of input elements are transformed to resulting instance configuration
        return $.clone( result );

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}
/**
 * @overview ccm component for building a team building
 * @author André Kless <andre.kless@web.de> 2017-2019
 * @license The MIT License (MIT)
 * @version 4.0.2
 * @changes
 * version 4.0.2 (30.01.2019):
 * - updated default template
 * - uses ccm v20.0.0
 * version 4.0.1 (29.10.2018):
 * - changed parameters of onchange callback
 * - uses ccm v18.1.0
 * version 4.0.0 (08.09.2018):
 * - uses ccm v18.0.0
 * - removed privatization of instance members
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

( function () {

  const component = {

    name: 'teambuild_builder',

    version: [ 4, 0, 2 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',

    config: {

      "html": {
        "id": "main",
        "class": "container-fluid",
        "inner": [
          {
            "class": "page-header",
            "inner": {
              "tag": "h2",
              "inner": [
                "Settings ",
                {
                  "tag": "small",
                  "class": "text-primary",
                  "inner": "Team Building"
                }
              ]
            }
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
                            "value": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.0.0.js',{'realm':'guest','title':'Guest Mode: Please enter any username'}]"
                          },
                          {
                            "tag": "option",
                            "inner": "H-BRS FB02",
                            "value": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.0.0.js',{'realm':'hbrsinfkaul'}]"
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
        "https://ccmjs.github.io/akless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap/css/font-face.css" },
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
        "data.store": "['ccm.store',{'name':'teambuild_data','url':'wss://ccm2.inf.h-brs.de'}]",
        "user": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.0.0.js',{'realm':'guest','title':'Guest Mode: Please enter any username'}]"
      },
      "target": [ "ccm.component", "https://ccmjs.github.io/akless-components/teambuild/versions/ccm.teambuild-3.0.0.js" ],
      "submit_button": true,
      "preview": true

  //  "data": { "store": [ "ccm.store", { "test": { ... } } ], "key": "test" },
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onchange": instance => console.log( instance.getValue() ),
  //  "onfinish": { "log": true }

    },

    Instance: function () {

      let $;

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => { const self = this;

        // get initial form values
        let dataset = await $.dataset( this.data );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // prepare initial form values
        prepareValues();

        // render input elements
        $.setContent( this.element, $.html( this.html, {
          basic:    () => switchSection( '#button-basic', '#button-advanced', '#section-basic', '#section-advanced' ),
          advanced: () => switchSection( '#button-advanced', '#button-basic', '#section-advanced', '#section-basic' ),
          submit: this.submit,
          change: onChange,
          help: function () {

            // hide and show help texts
            const this_a = this;
            [ ...self.element.querySelectorAll( 'a' ) ].map( other_a => other_a !== this_a && other_a.classList.remove( 'active' ) );
            this.classList.toggle( 'active' );

            // logging of 'help' event
            self.logger && self.logger.log( 'help', { name: this.id.split( '-' )[ 0 ], active: this.classList.contains( 'active' ) } );

          }
        } ) );

        // fill form with initial values
        $.fillForm( this.element, dataset );

        // hide input elements for which this is necessary
        setVisibility();

        // render preview
        if ( this.preview ) await updatePreview();

        // no preview desired? => remove preview section
        else $.removeElement( this.element.querySelector( '#section-preview' ) );

        // no submit button wanted? => remove submit button
        !this.submit_button && $.removeElement( this.element.querySelector( '#button-submit' ) );

        // individual caption for submit button? => set caption of submit button
        if ( typeof this.submit_button === 'string' ) this.element.querySelector( '#button-submit' ).value = this.submit_button;

        /** prepares initial form values */
        function prepareValues() {

          // set default value for dataset key of app-specific teambuild data
          if ( !self.defaults[ 'data.key' ] ) self.defaults[ 'data.key' ] = $.generateKey();

          // integrate default values into initial values
          dataset = $.integrate( self.defaults, dataset, true );

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

          // logging of 'section' event
          self.logger && self.logger.log( 'section', showed.substr( 1 ).split( '-' )[ 1 ] );

        }

        /** callback if an input value has changed */
        async function onChange() {

          // hide and show input elements for which this is necessary
          setVisibility();

          // update preview considering the changed input value
          await updatePreview();

          // perform change actions
          self.onchange && self.onchange();

          // logging of 'change' event
          self.logger && self.logger.log( 'change', $.clone( { name: this.name, value: this.type === 'checkbox' ? this.checked : this.value } ) );

        }

        /** defines which input elements are visible or hidden. */
        function setVisibility() {

          self.element.querySelector( '#text\\.join'  ).style.display = getInputElementByName( 'editable.join'  ).checked ? 'block' : 'none';
          self.element.querySelector( '#text\\.leave' ).style.display = getInputElementByName( 'editable.leave' ).checked ? 'block' : 'none';
          function getInputElementByName( name ) { return self.element.querySelector( '[name="' + name + '"]' ); }

        }

        /** (re)renders preview based on entered values */
        async function updatePreview() {

          // no preview desired? => abort
          if ( !self.preview ) return;

          // (re)render preview
          const instance = await self.target.start( self.getValue() );
          $.setContent( self.element.querySelector( '#preview' ), instance.root );

        }

      };

      /** triggers the submit of the entered data */
      this.submit = event => {

        // prevent page reload
        event && event.preventDefault();

        // logging of 'finish' event
        this.logger && this.logger.log( 'finish', this.getValue() );

        // perform finish actions
        $.onFinish( this );

      };

      /**
       * returns current resulting config
       * @returns {Object}
       */
      this.getValue = () => {

        /**
         * values of input elements
         * @type {Object}
         */
        let result = $.formData( this.element.querySelector( 'form' ) );

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

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
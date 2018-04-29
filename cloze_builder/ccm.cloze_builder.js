/**
 * @overview ccm component for building a fill-in-the-blank text
 * @description This code is based on the ccm component 'ccm.fill_in_the_blank_blank_text_builder-2.0.0.js' by Tea Kless.
 * @author André Kless <andre.kless@web.de>, 2017-2018
 * @license The MIT License (MIT)
 * @version latest (2.1.3)
 * @changes
 * version 2.1.3 (29.04.2018):
 * - bugfix for unset of onfinish.restart
 * version 2.1.2 (27.04.2018):
 * - bugfix for selecting PBWorks layout
 * - bugfix for logging of 'change' event
 * - bugfix for getting value of onfinish.restart checkbox
 * - switch to non minified files
 * - uses ccm v16.3.3
 * version 2.1.1 (25.04.2018):
 * - bugfix at optional submit button
 * version 2.1.0 (23.04.2018):
 * - changes in HTML templates
 * - optional logging support
 * version 2.0.0 (22.04.2018):
 * - uses ccm v16.2.0
 * - set the default form values ​​by 'defaults' property
 * - quill as text editor is optional, default is <textarea>
 * - uses 'data' property convention instead of 'start_values'
 * - default setting for feedback is 'Show only correctness with retry'
 * - uses ccm.helper.fillForm()
 * - better encode handling
 * - simplified section switch
 * (for older version changes see ccm.cloze_builder-1.7.0.js)
 */

{
  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'cloze_builder',

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {Object}
     */
    config: {

      "html": {
        "id": "main",
        "class": "container-fluid",
        "inner": [
          {
            "tag": "legend",
            "class": "text-primary",
            "inner": "Build your Fill-in-the-Blank Text"
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
                      "type": "button",
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
                "inner": {
                  "id": "text",
                  "class": "form-group",
                  "inner": [
                    {
                      "tag": "label",
                      "id": "text-label",
                      "for": "text-input",
                      "class": "control-label",
                      "inner": "Your Text"
                    },
                    {
                      "tag": "span",
                      "id": "text-help",
                      "class": "help",
                      "inner": [
                        {
                          "tag": "a",
                          "id": "text-icon",
                          "onclick": "%help%",
                          "inner": {
                            "class": "glyphicon glyphicon-info-sign"
                          }
                        },
                        {
                          "id": "text-info",
                          "class": "alert alert-info",
                          "inner": [
                            {
                              "tag": "p",
                              "inner": "Blanks are added with an asterix (*) in front and behind the correct word/phrase. Alternative answers are separated with a forward slash (/), e.g. “Hello, *World/Earth*!”"
                            },
                            {
                              "tag": "p",
                              "inner": "If you would like to show only certain letters of the solution word, put these letters into round brackets within the asterixs. In the following example, the three letters “o, r, d” of the solution word are already given in the text gap: “Hello, *W(or)l(d)*!”."
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "text-entry",
                      "class": "entry",
                      "inner": {
                        "tag": "textarea",
                        "class": "input form-control",
                        "id": "text-input",
                        "name": "text",
                        "placeholder": "Type here..."
                      }
                    }
                  ]
                }
              },
              {
                "id": "section-advanced",
                "class": "hide",
                "inner": [
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
                                "inner": "Every user will automatically logged in as the user \"guest\". This mode is mostly used for test scenarios."
                              },
                              {
                                "tag": "h5",
                                "inner": "Demo Mode"
                              },
                              {
                                "tag": "p",
                                "inner": "The user can authenticate with any username and without password. This mode is mostly used for demo scenarios."
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
                            "value": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-4.0.1.js',{'realm':'guest'}]"
                          },
                          {
                            "tag": "option",
                            "inner": "Demo Mode",
                            "value": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-4.0.1.js',{'realm':'demo'}]"
                          },
                          {
                            "tag": "option",
                            "inner": "H-BRS FB02",
                            "value": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-4.0.1.js',{'realm':'hbrsinfkaul'}]"
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
                            "inner": "Choose between different layouts, in which the fill-in-the-blank text is displayed."
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
                            "value": "['ccm.load','https://ccmjs.github.io/akless-components/cloze/resources/default.css']"
                          },
                          {
                            "tag": "option",
                            "inner": "LEA-like",
                            "value": "['ccm.load','https://ccmjs.github.io/akless-components/cloze/resources/lea.css','https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css',{'context':'head','url':'https://fonts.googleapis.com/css?family=Montserrat:200'}]"
                          },
                          {
                            "tag": "option",
                            "inner": "PBWorks-like",
                            "value": "['ccm.load','https://ccmjs.github.io/akless-components/cloze/resources/pbworks.css','https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css',{'context':'head','url':'https://fonts.googleapis.com/css?family=Montserrat:200'}]"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "id": "time",
                    "class": "form-group",
                    "inner": [
                      {
                        "tag": "label",
                        "id": "time-label",
                        "for": "time-input",
                        "class": "control-label",
                        "inner": "Time Limit"
                      },
                      {
                        "tag": "span",
                        "id": "time-help",
                        "class": "help",
                        "inner": [
                          {
                            "tag": "a",
                            "id": "time-icon",
                            "onclick": "%help%",
                            "inner": {
                              "class": "glyphicon glyphicon-info-sign"
                            }
                          },
                          {
                            "id": "time-info",
                            "class": "alert alert-info",
                            "inner": "Specify the number of seconds available to solve the fill-in-the-blank text. The remaining number of seconds is then displayed visually. After expiration of the time, the fill-in-the-blank text is submitted automatically. If you do not specify anything here, there is no time limit for handling the fill-in-the-blank text."
                          }
                        ]
                      },
                      {
                        "tag": "input",
                        "type": "number",
                        "id": "time-input",
                        "class": "form-control",
                        "name": "time",
                        "onchange": "%change%",
                        "placeholder": "Time in seconds"
                      }
                    ]
                  },
                  {
                    "id": "keywords",
                    "class": "form-group",
                    "inner": [
                      {
                        "tag": "label",
                        "id": "keywords-label",
                        "for": "keywords-input",
                        "class": "control-label",
                        "inner": "Provided Answers"
                      },
                      {
                        "tag": "span",
                        "id": "keywords-help",
                        "class": "help",
                        "inner": [
                          {
                            "tag": "a",
                            "id": "keywords-icon",
                            "onclick": "%help%",
                            "inner": {
                              "class": "glyphicon glyphicon-info-sign"
                            }
                          },
                          {
                            "id": "keywords-info",
                            "class": "alert alert-info",
                            "inner": "Here you can set whether the solution words for the gaps in the text are already given, so that they only need to be placed in the correct gap. You can either generate the list of solution words automatically or set the solution words yourself manually."
                          }
                        ]
                      },
                      {
                        "id": "keywords-entry",
                        "inner": [
                          {
                            "inner": {
                              "tag": "select",
                              "id": "keywords-input",
                              "class": "form-control",
                              "name": "keywords",
                              "onchange": "%change%",
                              "inner": [
                                {
                                  "tag": "option",
                                  "inner": "None",
                                  "value": "none"
                                },
                                {
                                  "tag": "option",
                                  "inner": "Auto generated",
                                  "value": "auto"
                                },
                                {
                                  "tag": "option",
                                  "inner": "Manually",
                                  "value": "manually"
                                }
                              ]
                            }
                          },
                          {
                            "inner": {
                              "tag": "input",
                              "type": "text",
                              "id": "manually-input",
                              "class": "form-control",
                              "name": "manually",
                              "placeholder": "Comma-separated list of provided answers",
                              "onchange": "%change%"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "id": "feedback",
                    "class": "form-group",
                    "inner": [
                      {
                        "tag": "label",
                        "id": "feedback-label",
                        "for": "feedback-input",
                        "class": "control-label",
                        "inner": "Feedback"
                      },
                      {
                        "tag": "span",
                        "id": "feedback-help",
                        "class": "help",
                        "inner": [
                          {
                            "tag": "a",
                            "id": "feedback-icon",
                            "onclick": "%help%",
                            "inner": {
                              "class": "glyphicon glyphicon-info-sign"
                            }
                          },
                          {
                            "id": "feedback-info",
                            "class": "alert alert-info",
                            "inner": "Choose here whether direct feedback should be displayed for the entered solution. The solution can then be submitted via a submit button. You can choose if the feedback should only comment on the solution or also provide the correct solution."
                          }
                        ]
                      },
                      {
                        "tag": "select",
                        "id": "feedback-input",
                        "class": "form-control",
                        "name": "feedback",
                        "onchange": "%change%",
                        "inner": [
                          {
                            "tag": "option",
                            "inner": "None",
                            "value": "none"
                          },
                          {
                            "tag": "option",
                            "inner": "Show only correctness",
                            "value": "correctness"
                          },
                          {
                            "tag": "option",
                            "inner": "Show only correctness with retry",
                            "value": "retry"
                          },
                          {
                            "tag": "option",
                            "inner": "Show correctness and solutions",
                            "value": "solutions"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "id": "captions.retry",
                    "class": "form-group",
                    "inner": [
                      {
                        "tag": "label",
                        "id": "captions.retry-label",
                        "for": "captions.retry-input",
                        "class": "control-label",
                        "inner": "Retry Button Label"
                      },
                      {
                        "tag": "span",
                        "id": "captions.retry-help",
                        "class": "help",
                        "inner": [
                          {
                            "tag": "a",
                            "id": "captions.retry-icon",
                            "onclick": "%help%",
                            "inner": {
                              "class": "glyphicon glyphicon-info-sign"
                            }
                          },
                          {
                            "id": "captions.retry-info",
                            "class": "alert alert-info",
                            "inner": "Specify the caption of the retry button, which allows the values ​​entered in the gaps to be changed again."
                          }
                        ]
                      },
                      {
                        "tag": "input",
                        "type": "text",
                        "id": "captions.retry-input",
                        "class": "form-control",
                        "name": "captions.retry",
                        "placeholder": "Enter Button Label",
                        "onchange": "%change%"
                      }
                    ]
                  },
                  {
                    "id": "captions.submit",
                    "class": "form-group",
                    "inner": [
                      {
                        "tag": "label",
                        "id": "captions.submit-label",
                        "for": "captions.submit-input",
                        "class": "control-label",
                        "inner": "Submit Button Label"
                      },
                      {
                        "tag": "span",
                        "id": "captions.submit-help",
                        "class": "help",
                        "inner": [
                          {
                            "tag": "a",
                            "id": "captions.submit-icon",
                            "onclick": "%help%",
                            "inner": {
                              "class": "glyphicon glyphicon-info-sign"
                            }
                          },
                          {
                            "id": "captions.submit-info",
                            "class": "alert alert-info",
                            "inner": "Specify the caption of the submit button, which submits the fill-in-the-blank text and shows the feedback."
                          }
                        ]
                      },
                      {
                        "tag": "input",
                        "type": "text",
                        "id": "captions.submit-input",
                        "class": "form-control",
                        "name": "captions.submit",
                        "placeholder": "Enter Button Label",
                        "onchange": "%change%"
                      }
                    ]
                  },
                  {
                    "id": "grid",
                    "inner": [
                      {
                        "id": "blank",
                        "class": "form-inline",
                        "inner": [
                          {
                            "tag": "label",
                            "id": "blank-label",
                            "for": "blank-input",
                            "class": "control-label",
                            "inner": "Blank Gaps"
                          },
                          {
                            "tag": "a",
                            "id": "blank-icon",
                            "onclick": "%help%",
                            "inner": {
                              "class": "glyphicon glyphicon-info-sign"
                            }
                          },
                          {
                            "id": "blank-entry",
                            "class": "checkbox",
                            "inner": {
                              "tag": "input",
                              "type": "checkbox",
                              "id": "blank-input",
                              "name": "blank",
                              "onchange": "%change%"
                            }
                          },
                          {
                            "id": "blank-info",
                            "class": "alert alert-info",
                            "inner": "Choose whether the text gaps are completely empty, or the length of the searched word and possibly already given letters are visible."
                          }
                        ]
                      },
                      {
                        "id": "start_button",
                        "class": "form-inline",
                        "inner": [
                          {
                            "tag": "label",
                            "id": "start_button-label",
                            "for": "start_button-input",
                            "class": "control-label",
                            "inner": "Start Button"
                          },
                          {
                            "tag": "a",
                            "id": "start_button-icon",
                            "onclick": "%help%",
                            "inner": {
                              "class": "glyphicon glyphicon-info-sign"
                            }
                          },
                          {
                            "id": "start_button-entry",
                            "class": "checkbox",
                            "inner": {
                              "tag": "input",
                              "type": "checkbox",
                              "id": "start_button-input",
                              "name": "start_button",
                              "onchange": "%change%"
                            }
                          },
                          {
                            "id": "start_button-info",
                            "class": "alert alert-info",
                            "inner": "If you select this option, the fill-in-the-blank text will be displayed after clicking on a start button, which will be displayed instead of the fill-in-the-blank text."
                          }
                        ]
                      },
                      {
                        "id": "onfinish.restart",
                        "class": "form-inline",
                        "inner": [
                          {
                            "tag": "label",
                            "id": "onfinish.restart-label",
                            "for": "onfinish.restart-input",
                            "class": "control-label",
                            "inner": "Restart after Finish"
                          },
                          {
                            "tag": "a",
                            "id": "onfinish.restart-icon",
                            "onclick": "%help%",
                            "inner": {
                              "class": "glyphicon glyphicon-info-sign"
                            }
                          },
                          {
                            "id": "onfinish.restart-entry",
                            "class": "checkbox",
                            "inner": {
                              "tag": "input",
                              "type": "checkbox",
                              "id": "onfinish.restart-input",
                              "name": "onfinish.restart",
                              "onchange": "%change%"
                            }
                          },
                          {
                            "id": "onfinish.restart-info",
                            "class": "alert alert-info",
                            "inner": "Select this option to add a finish button to the fill-in-the-blank text that will allow you to restart it."
                          }
                        ]
                      },
                      {},
                      {
                        "inner": {
                          "id": "captions.start",
                          "class": "form-group",
                          "inner": {
                            "tag": "input",
                            "type": "text",
                            "id": "captions.start-input",
                            "class": "form-control",
                            "name": "captions.start",
                            "placeholder": "Enter Button Label",
                            "onchange": "%change%"
                          }
                        }
                      },
                      {
                        "inner": {
                          "id": "captions.finish",
                          "class": "form-group",
                          "inner": {
                            "tag": "input",
                            "type": "text",
                            "id": "captions.finish-input",
                            "class": "form-control",
                            "name": "captions.finish",
                            "placeholder": "Enter Button Label",
                            "onchange": "%change%"
                          }
                        }
                      }
                    ]
                  }
                ]
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
        "../cloze_builder/resources/default.css"
      ],
      "defaults": {
        "text": 'Hello, *W(or)l(d)*!',
        "feedback": true,
        "retry": true,
        "captions": {
          "start": "Start",
          "submit": "Submit",
          "retry": "Retry",
          "finish": "Restart"
        }
      },
      "editor": [ "ccm.component", "https://ccmjs.github.io/tkless-components/editor/versions/ccm.editor-2.0.0.js", {
        "settings.modules.toolbar": [
          [ { 'header': [ 1, 2, 3, 4, 5, 6, false ] } ],
          [ "bold", "italic", "underline" ],
          [ { "header": 1 }, { "header": 2 } ],
          [ { "script": "sub" }, { "script": "super" } ],
          [ { "color": [] }, { "background": [] } ],
          [ "image" ]
        ], "settings.placeholder": "Type here..."
      } ],
      "target": [ "ccm.component", "../cloze/ccm.cloze.js" ],
      "preview": true

  //  "data": { "store": [ "ccm.store", "test": { ... } ], "key": "test" },
  //  "submit_button": true,
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
       * ccm instance of the text editor
       * @type {Object}
       */
      let editor;

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

          // render main HTML structure
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

          // prepare text editor
          prepareEditor( () => {

            // fill form with initial values
            $.fillForm( self.element, dataset );

            // hide input elements for which this is necessary
            setVisibility();

            // render preview
            if ( my.preview ) updatePreview();

            // no preview desired? => remove preview section
            else $.removeElement( self.element.querySelector( '.preview' ) );

            // no submit button wanted? => remove submit button
            !my.submit_button && $.removeElement( self.element.querySelector( '#button-submit' ) );

            // individual caption for submit button? => set caption of submit button
            if ( typeof my.submit_button === 'string' ) self.element.querySelector( '#button-submit' ).value = my.submit_button;

            // rendering completed => perform callback
            callback && callback();

          } );

          /** prepares initial form values */
          function prepareValues() {

            // given default values? => integrate them as defaults into initial values
            dataset = $.integrate( my.defaults, dataset, true );

            // encode dependencies
            $.encodeDependencies( dataset );

            // prepare 'keywords' and 'manually' entry
            if ( Array.isArray( dataset.keywords ) )
              dataset.manually = dataset.keywords.join( ', ' );
            dataset.keywords = dataset.keywords ? ( dataset.keywords === true ? 'auto' : 'manually' ) : 'none';

            // convert initial values to dot notation
            dataset = $.toDotNotation( dataset );

            // prepare 'feedback' entry
            dataset.feedback = dataset.feedback ? ( dataset.retry ? 'retry' : ( dataset.solutions ? 'solutions' : 'correctness' ) ) : 'none';
            delete dataset.solutions;

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

          /**
           * prepares text editor
           * @param {function} callback
           */
          function prepareEditor( callback ) {

            /**
             * HTML element in which the text editor is rendered
             * @type {Element}
             */
            const text_elem = self.element.querySelector( '#text-entry' );

            // should not Quill be used as text editor? => abort (default is <textarea>)
            if ( !my.editor ) return callback();

            // render Quill
            my.editor.start( { root: text_elem }, instance => { editor = instance;

              // given initial text? => put it into Quill
              if ( dataset.text ) { $.setContent( editor.get().root, dataset.text ); delete dataset.text; }

              // set 'change' event
              $.wait( 0, () => editor.get().on( 'text-change', onChange ) );

              callback();
            } );

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
            self.logger && self.logger.log( 'change', { name: this.name || 'text', value: this.name ? ( this.type === 'checkbox' ? this.checked : this.value ) : editor.get().root.innerHTML } );

          }

          /** defines which input elements are visible or hidden. */
          function setVisibility() {

            getInputElementByName(                'manually' ).style.display = getInputElementByName( 'keywords' ).value === 'manually' ? 'block' : 'none';
            self.element.querySelector( '#captions\\.retry'  ).style.display = getInputElementByName( 'feedback' ).value === 'retry'    ? 'block' : 'none';
            self.element.querySelector( '#captions\\.submit' ).style.display = getInputElementByName( 'feedback' ).value !== 'none'     ? 'block' : 'none';
            self.element.querySelector( '#captions\\.start'  ).style.display = getInputElementByName( 'start_button'     ).checked      ? 'block' : 'none';
            self.element.querySelector( '#captions\\.finish' ).style.display = getInputElementByName( 'onfinish.restart' ).checked      ? 'block' : 'none';
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

        // finalize 'text' property
        result.text = editor.get().root.innerHTML;

        // finalize 'keywords' property
        if ( result.keywords === 'manually' ) {
          const manually = result.manually.split( ',' );
          manually.map( keyword => keyword.trim() );
          result.keywords = manually;
        }
        else result.keywords = result.keywords === 'auto';
        delete result.manually;

        // finalize 'feedback', 'retry' and 'solutions' property
        result.retry     = result.feedback === 'retry';
        result.solutions = result.feedback === 'solutions';
        result.feedback  = result.feedback !== 'none';

        // finalize 'onfinish' property
        if ( !result.onfinish || !result.onfinish.restart ) result.onfinish = '';

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
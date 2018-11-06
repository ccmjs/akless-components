/**
 * @overview configurations of ccm component for submitting data
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
    "inner": [ "ccm.load", "../submit/resources/demo.html" ],
    "data": {
      "store": [ "ccm.store", "../submit/resources/datasets.js" ],
      "key": "test"
    },
    "content": [ "ccm.component", "../content/ccm.content.js" ],
    "cloze_builder": [ "ccm.component", "../cloze_builder/ccm.cloze_builder.js", {
      "key": [ "ccm.get", "../cloze_builder/resources/configs.js", "local" ],
      "submit_button": false
    } ],
    "teambuild_builder": [ "ccm.component", "../teambuild_builder/ccm.teambuild_builder.js", {
      "key": [ "ccm.get", "../teambuild_builder/resources/configs.js", "local" ],
      "submit_button": false
    } ],
    "json_builder": [ "ccm.component", "../json_builder/ccm.json_builder.js", {
      "html.inner.1": "",
      "directly": true
    } ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onchange": function ( event ) { console.log( this.index, 'onchange', this.getValue(), event ) },
    "onfinish": { "log": true }
  },

  "localhost": {
    "key": "localhost",
    "data": {
      "store": [ "ccm.store", { "name": "submit", "url": "http://localhost:8080" } ],
      "key": "test"
    },
    "content": [ "ccm.component", "../content/ccm.content.js" ],
    "cloze_builder": [ "ccm.component", "../cloze_builder/ccm.cloze_builder.js", {
      "key": [ "ccm.get", "../cloze_builder/resources/configs.js", "local" ],
      "submit_button": false
    } ],
    "teambuild_builder": [ "ccm.component", "../teambuild_builder/ccm.teambuild_builder.js", {
      "key": [ "ccm.get", "../teambuild_builder/resources/configs.js", "local" ],
      "submit_button": false
    } ],
    "json_builder": [ "ccm.component", "../json_builder/ccm.json_builder.js", {
      "html.inner.1": "",
      "directly": true
    } ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onfinish": {
      "log": true,
      "store": {
        "settings": { "name": "submit", "url": "http://localhost:8080" },
        "key": "test"
      },
      "alert": "Saved!"
    }
  },

  "demo": {
    "key": "demo",
    "inner": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/submit/resources/builder.html", "type": "data", "method": "get" } ],
    "data": {
      "store": [ "ccm.store", { "name": "submit", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.1.js" ],
    "cloze_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/cloze_builder/versions/ccm.cloze_builder-3.0.0.js", {
      "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/cloze_builder/resources/configs.js", "demo" ],
      "submit_button": false
    } ],
    "teambuild_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/teambuild_builder/versions/ccm.teambuild_builder-4.0.0.js", {
      "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/teambuild_builder/resources/configs.js", "demo" ],
      "submit_button": false
    } ],
    "json_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.1.0.js", {
      "html.inner.1": "",
      "directly": true
    } ],
    "onfinish": {
      "store": {
        "settings": { "name": "submit", "url": "https://ccm2.inf.h-brs.de" },
        "key": "demo"
      },
      "alert": "Saved!"
    }
  },

  "kanban_board_builder": {
    "inner": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/kanban_board/resources/builder.html", "type": "data", "method": "get" } ],
    "json_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.1.0.js", {
      "html.inner.1": "",
      "directly": true
    } ],
    "ignore": {
      "defaults": {
        "html": {
          "main": { "id": "lanes" },
          "lane": {
            "class": "lane",
            "inner": [
              {
                "class": "title",
                "inner": "%%"
              },
              { "class": "cards" }
            ]
          },
          "add": {
            "id": "add",
            "onclick": "%%"
          }
        },
        "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_board/resources/default.css" ],
        "data": {},
        "lanes": [ "ToDo", "Doing", "Done" ],
        "del": "Do you really want to delete this card?"
      }
    }
  },

  "kanban_card_builder": {
    "inner": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/kanban_card/resources/builder.html", "type": "data", "method": "get" } ],
    "json_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.1.0.js", {
      "html.inner.1": "",
      "directly": true
    } ],
    "ignore": {
      "defaults": {
        "html": {
          "id": "main",
          "inner": [
            {
              "id": "header",
              "inner": [
                {
                  "id": "title",
                  "class": "entry",
                  "inner": [
                    {
                      "class": "value",
                      "inner": "%title%",
                      "contenteditable": "%editable%",
                      "oninput": "%oninput_title%",
                      "onblur": "%onblur_title%"
                    }
                  ]
                },
                {
                  "id": "owner",
                  "class": "entry",
                  "inner": [
                    {
                      "class": "value",
                      "inner": "%owner%",
                      "contenteditable": "%editable%",
                      "onfocus": "%onfocus_owner%"
                    },
                    {
                      "inner": {
                        "tag": "img",
                        "src": "%icon_owner%"
                      }
                    }
                  ]
                }
              ]
            },
            {
              "id": "body",
              "inner": {
                "id": "summary",
                "class": "entry",
                "inner": {
                  "class": "value",
                  "inner": "%summary%",
                  "contenteditable": "%editable%",
                  "oninput": "%oninput_summary%",
                  "onblur": "%onblur_summary%"
                }
              }
            },
            {
              "id": "footer",
              "inner": [
                {
                  "id": "priority",
                  "class": "entry",
                  "inner": {
                    "class": "value",
                    "inner": "%priority%",
                    "contenteditable": "%editable%",
                    "onfocus": "%onfocus_priority%"
                  }
                },
                {
                  "id": "deadline",
                  "class": "entry",
                  "inner": [
                    {
                      "class": "value",
                      "inner": "%deadline%",
                      "contenteditable": "%editable%",
                      "onfocus": "%onfocus_deadline%"
                    },
                    {
                      "inner": {
                        "tag": "img",
                        "src": "%icon_deadline%"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_card/resources/default.css" ],
        "data": {},
        "editable": true,
        "members": [ "John", "Jane" ],
        "priorities": [ "A", "B", "C" ],
        "icon": {
          "owner": "https://ccmjs.github.io/akless-components/kanban_card/resources/owner.svg",
          "deadline": "https://ccmjs.github.io/akless-components/kanban_card/resources/deadline.svg"
        }
      }
    }
  },

  "quick_decide_builder": {
    "inner": [ "ccm.load", { "url": "../quick_decide/resources/builder.html", "type": "data", "method": "get" } ],
    "json_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.1.0.js", {
      "html.inner.1": "",
      "directly": true
    } ],
    "ignore": {
      "defaults": {
        "html": {
          "main": {
            "id": "main",
            "inner": [
              {
                "id": "timer",
                "inner": [
                  { "tag": "a", "id": "min", "inner": "00" },
                  { "tag": "a", "id": "sec", "inner": "00" },
                  { "tag": "a", "id": "mil", "inner": "000" }
                ]
              },
              { "id": "question" },
              { "id": "answers" }
            ]
          },
          "answer": {
            "tag": "button",
            "class": "answer",
            "onclick": "%onclick%",
            "inner": "%answer%"
          }
        },
        "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/quick_decide/resources/default.css" ],
        "questions": [ { "answers": [ "", "" ] } ],
        "interval": 1
      }
    }
  },

  "quiz_builder": {
    "inner": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/quiz/resources/builder.html", "type": "data", "method": "get" } ],
    "json_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.1.0.js", {
      "html.inner.1": "",
      "directly": true
    } ],
    "ignore": {
      "defaults": {
        "html": {
          "start": {
            "id": "start",
            "inner": {
              "tag": "button",
              "inner": "Start",
              "onclick": "%%"
            }
          },
          "main": {
            "id": "main",
            "inner": [
              { "id": "questions" },
              {
                "id": "buttons",
                "inner": [
                  { "id": "cancel" },
                  { "id": "prev" },
                  { "id": "submit" },
                  { "id": "next" },
                  { "id": "finish" },
                  { "id": "timer" }
                ]
              }
            ]
          },
          "question": {
            "id": "%id%",
            "class": "question",
            "inner": [
              {
                "class": "title",
                "inner": [
                  { "inner": "Question" },
                  { "inner": "%nr%/%count%" },
                  { "inner": "%text%" }
                ]
              },
              {
                "class": "description",
                "inner": "%description%"
              },
              { "class": "answers" }
            ]
          },
          "answer": {
            "id": "%id%",
            "class": "answer %class%",
            "inner": {
              "class": "entry",
              "inner": [
                {
                  "class": "text",
                  "inner": {
                    "tag": "label",
                    "inner": "%text%",
                    "for": "%id%-input"
                  }
                },
                { "class": "comment" }
              ]
            }
          },
          "comment": {
            "class": "tooltip",
            "onclick": "%click%",
            "inner": [
              "i",
              {
                "tag": "div",
                "class": "tooltiptext",
                "inner": {
                  "inner": {
                    "inner": "%comment%"
                  }
                }
              }
            ]
          },
          "timer": {
            "tag": "span",
            "inner": "%%"
          }
        },
        "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/quiz/resources/default.css" ],
        "questions": [ { "text": "", "answers": [ { "text": "" }, { "text": "" } ] } ],
        "placeholder": {
          "cancel": "Cancel",
          "prev": "Previous",
          "submit": "Submit",
          "next": "Next",
          "correct": "Correct solution: ",
          "finish": "Finish"
        }
      }
    }
  }

};
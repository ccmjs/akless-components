/**
 * @overview configurations of ccm component for rendering a menu
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
    "css": [ "ccm.load", "../menu/resources/tabs.css" ],
    "data": {
      "store": [ "ccm.store", "../menu/resources/datasets.js" ],
      "key": "demo"
    },
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },

  "demo": {
    "key": "demo",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/menu/resources/tabs.css" ],
    "data": {
      "store": [ "ccm.store", "https://ccmjs.github.io/akless-components/menu/resources/datasets.js" ],
      "key": "demo"
    }
  },

  "text": {
    "key": "text",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/menu/resources/text.css" ],
    "data": {
      "store": [ "ccm.store", "https://ccmjs.github.io/akless-components/menu/resources/datasets.js" ],
      "key": "actions"
    },
    "selected": 1,
    "trigger_selected": true
  },

  "icon": {
    "key": "icon",
    "css": [ "ccm.load",
      { "context": "head", "url": "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" },
      "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css",
      "https://ccmjs.github.io/akless-components/menu/resources/icon.css"
    ],
    "data": {
      "store": [ "ccm.store", "https://ccmjs.github.io/akless-components/menu/resources/datasets.js" ],
      "key": "icon"
    }
  },

  "bootstrap": {
    "key": "bootstrap",
    "html": {
      "main": {
        "id": "main",
        "inner": [
          {
            "class": "text-center",
            "inner": {
              "id": "entries",
              "class": "btn-group"
            }
          },
          { "id": "content" }
        ]
      },
      "entry": {
        "class": "entry btn btn-default",
        "style": "z-index: unset",
        "onclick": "%click%",
        "inner": {
          "class": "title"
        }
      }
    },
    "css": [ "ccm.load",
      "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" }
    ],
    "data": {
      "store": [ "ccm.store", "https://ccmjs.github.io/akless-components/menu/resources/datasets.js" ],
      "key": "demo"
    }
  },

  "tabs": {
    "key": "tabs",
    "html": {
      "main": {
        "id": "main",
        "inner": [
          {
            "tag": "ul",
            "class": "nav nav-tabs",
            "id": "entries"
          },
          {
            "id": "content",
            "style": "padding: 0.5rem;"
          }
        ]
      },
      "entry": {
        "tag": "li",
        "class": "entry",
        "onclick": "%click%",
        "style": "cursor: pointer; z-index: unset",
        "inner": {
          "tag": "a",
          "class": "title"
        }
      }
    },
    "css": [ "ccm.load",
      "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" }
    ],
    "data": {
      "store": [ "ccm.store", "https://ccmjs.github.io/akless-components/menu/resources/datasets.js" ],
      "key": "demo"
    },
    "selected": 1
  },

  "list_group": {
    "key": "list_group",
    "html": {
      "main": {
        "id": "main",
        "inner": [
          {
            "inner": {
              "class": "list-group",
              "id": "entries"
            }
          },
          {
            "id": "content",
            "style": "padding: 0 16px 0 16px"
          }
        ]
      },
      "entry": {
        "tag": "a",
        "class": "entry list-group-item",
        "onclick": "%click%",
        "style": "cursor: pointer; overflow: hidden; z-index: unset",
        "inner": {
          "class": "title"
        }
      }
    },
    "css": [ "ccm.load",
      "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" }
    ],
    "data": {
      "entries": [
        {
          "title": "Menu Item A",
          "content": "Content of menu entry A",
          "actions": [ [ "console.log", "Performed action of menu entry A." ] ]
        },
        {
          "title": "Menu Item B",
          "content": "Content of menu entry B",
          "actions": [ [ "console.log", "Performed action of menu entry B." ] ]
        },
        {
          "title": "Menu Item C",
          "content": "Content of menu entry C",
          "actions": [ [ "console.log", "Performed action of menu entry C." ] ]
        }
      ]
    },
    "selected": 1
  }

};
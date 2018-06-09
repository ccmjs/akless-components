/**
 * @overview configurations of ccm component for rendering a menu
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "css": [ "ccm.load", "../menu/resources/tabs.css" ],
    "data": {
      "store": [ "ccm.store", "../menu/resources/datasets.js" ],
      "key": "demo"
    },
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },

  "demo": {
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/menu/resources/tabs.css" ],
    "data": {
      "store": [ "ccm.store", "https://ccmjs.github.io/akless-components/menu/resources/datasets.js" ],
      "key": "demo"
    }
  },

  "icon": {
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
  }

};
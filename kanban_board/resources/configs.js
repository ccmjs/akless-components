/**
 * @overview configurations of ccm component for kanban board
 * @author André Kless <andre.kless@web.de> 2017-2018, 2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "css.1": "../kanban_board/resources/default.css",
    "data": {
      "store": [ "ccm.store", "../kanban_board/resources/datasets.js" ],
      "key": "test"
    },
    "helper.1": "../modules/helper.mjs",
    "html.1": "../kanban_board/resources/templates.html",
    "ignore": {
      "card": {
        "component": "../kanban_card/ccm.kanban_card.js",
        "config": [ "ccm.get", "../kanban_card/resources/configs.js", "local_white" ]
      }
    },
//  "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "members": [ "John", "Jane", "Jake" ],
//  "onchange": event => console.log( event ),
    "reload": true,
    "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/resources.js", "local" ] ]
  },

  "demo": {
    "data": {
      "store": [ "ccm.store", { "name": "kanban_board", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "ignore": {
      "card": {
        "component": "https://ccmjs.github.io/akless-components/kanban_card/ccm.kanban_card.js",
        "config": {
          "data": {
            "store": [ "ccm.store", { "name": "kanban_card", "url": "https://ccm2.inf.h-brs.de" } ]
          },
          "css.1": "https://ccmjs.github.io/akless-components/kanban_card/resources/default.css"
        }
      }
    }
  },

  "offline": {
    "data": {
      "store": [ "ccm.store", { "name": "kanban_board" } ],
      "key": "demo"
    },
    "ignore": {
      "card": {
        "component": "https://ccmjs.github.io/akless-components/kanban_card/ccm.kanban_card.js",
        "config": {
          "data": {
            "store": [ "ccm.store", { "name": "kanban_card" } ]
          },
          "css.1": "https://ccmjs.github.io/akless-components/kanban_card/resources/gold.css"
        }
      }
    }
  },

  "realtime": {
    "data": {
      "store": [ "ccm.store", { "name": "kanban_board", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "realtime"
    },
    "ignore": {
      "card": {
        "component": "https://ccmjs.github.io/akless-components/kanban_card/ccm.kanban_card.js",
        "config": {
          "data": {
            "store": [ "ccm.store", { "name": "kanban_card", "url": "wss://ccm2.inf.h-brs.de" } ]
          },
          "css.1": "https://ccmjs.github.io/akless-components/kanban_card/resources/blue.css"
        }
      }
    }
  },

  "experimental": {
    "data": {
      "store": [ "ccm.store", "../kanban_board/resources/datasets.js" ],
      "key": "experimental"
    }
  }

};
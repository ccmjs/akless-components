/**
 * @overview configurations of ccm component for kanban card
 * @author André Kless <andre.kless@web.de> 2017-2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
    "css.1": "../kanban_card/resources/default.css",
    "data": {
      "store": [ "ccm.store", "../kanban_card/resources/datasets.js" ],
      "key": "homework"
    },
    "onchange": () => console.log( '!' )
  },

  "homework": {
    "key": "homework",
    "css": [ "ccm.load", "../kanban_card/resources/default.css" ],
    "data": {
      "store": [ "ccm.store", "../kanban_card/resources/datasets.js" ],
      "key": "homework"
    }
  },

  "presentation": {
    "key": "presentation",
    "css": [ "ccm.load", "../kanban_card/resources/demo.css" ],
    "data": {
      "store": [ "ccm.store", "../kanban_card/resources/datasets.js" ],
      "key": "presentation"
    }
  },

  "realtime": {
    "key": "realtime",
    "font": [ "ccm.load", { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/weblysleekui/font.css" } ],
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_card/resources/weblysleek.css" ],
    "data": {
      "store": [ "ccm.store", { "store": "kanban_card", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "demo",
      "permission_settings": { "access": "group" }
    },
    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ]
  },

  "test": {
    "key": "test",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_card/resources/demo.css" ],
    "data": {
      "store": [ "ccm.store", "https://ccmjs.github.io/akless-components/kanban_card/resources/datasets.js" ],
      "key": "test"
    },
    "members": [ "Almut", "Andre", "Manfred", "Ralph", "Regina", "Tea", "Thorsten" ]
  },

  "w2c": {
    "key": "w2c",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_card/resources/demo.css" ],
    "data": {
      "store": [ "ccm.store", "https://ccmjs.github.io/akless-components/kanban_card/resources/datasets.js" ],
      "key": "w2c"
    },
    "members": [ "Almut", "Andre", "Manfred", "Ralph", "Regina", "Tea", "Thorsten" ]
  },

  "lea": {
    "key": "lea",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_card/resources/demo.css" ],
    "data": {
      "store": [ "ccm.store", "https://ccmjs.github.io/akless-components/kanban_card/resources/datasets.js" ],
      "key": "lea"
    },
    "members": [ "Almut", "Andre", "Manfred", "Ralph", "Regina", "Tea", "Thorsten" ]
  },

  "more": {
    "key": "more",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_card/resources/demo.css" ],
    "data": {
      "store": [ "ccm.store", "https://ccmjs.github.io/akless-components/kanban_card/resources/datasets.js" ],
      "key": "more"
    },
    "members": [ "Almut", "Andre", "Manfred", "Ralph", "Regina", "Tea", "Thorsten" ]
  }

};
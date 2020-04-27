/**
 * @overview configurations of ccm component for kanban cards
 * @author André Kless <andre.kless@web.de> 2017-2018, 2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local_white": {
    "css.1": "../kanban_card/resources/default.css",
    "data": {
      "store": [ "ccm.store", { "name": "kanban_card", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo_white"
    },
    "helper.1": "../modules/helper.mjs",
    "html.1": "../kanban_card/resources/templates.html",
    "icon": {
      "owner": "../kanban_card/resources/owner.svg",
      "deadline": "../kanban_card/resources/deadline.svg"
    },
//  "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onchange": event => console.log( event ),
    "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/resources.js", "local" ] ]
  },

  "local_gold": {
    "css.1": "../kanban_card/resources/gold.css",
    "data": {
      "store": [ "ccm.store", { "name": "kanban_card", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo_gold"
    },
    "helper.1": "../modules/helper.mjs",
    "html.1": "../kanban_card/resources/templates.html",
    "icon": {
      "owner": "../kanban_card/resources/owner.svg",
      "deadline": "../kanban_card/resources/deadline.svg"
    },
    "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/resources.js", "local" ] ]
  },

  "local_blue": {
    "css.1": "../kanban_card/resources/blue.css",
    "data": {
      "store": [ "ccm.store", { "name": "kanban_card", "url": "wss://ccm2.inf.h-brs.de", "dataset": "demo_blue" } ],
      "key": "demo_blue"
    },
    "helper.1": "../modules/helper.mjs",
    "html.1": "../kanban_card/resources/templates.html",
    "icon": {
      "owner": "../kanban_card/resources/owner.svg",
      "deadline": "../kanban_card/resources/deadline.svg"
    },
    "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/resources.js", "local" ] ]
  },

  "demo_white": {
    "data": {
      "store": [ "ccm.store", { "name": "kanban_card", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo_white"
    },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.5.0.js" ]
  },

  "demo_gold": {
    "css.1": "https://ccmjs.github.io/akless-components/kanban_card/resources/gold.css",
    "data": {
      "store": [ "ccm.store", { "name": "kanban_card", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo_gold"
    },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.5.0.js" ]
  },

  "demo_blue": {
    "css.1": "https://ccmjs.github.io/akless-components/kanban_card/resources/blue.css",
    "data": {
      "store": [ "ccm.store", { "name": "kanban_card", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo_blue"
    },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.5.0.js" ]
  },

  "realtime": {
    "css.1": "https://ccmjs.github.io/akless-components/kanban_card/resources/blue.css",
    "data": {
      "store": [ "ccm.store", { "name": "kanban_card", "url": "wss://ccm2.inf.h-brs.de", "dataset": "demo_blue" } ],
      "key": "demo_blue"
    },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.5.0.js" ]
  }

};
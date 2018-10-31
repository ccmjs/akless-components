/**
 * @overview configurations of ccm component for kanban card
 * @author André Kless <andre.kless@web.de> 2017-2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local_white": {
    "key": "local_white",
    "css.1": "../kanban_card/resources/default.css",
    "data": {
      "store": [ "ccm.store", "../kanban_card/resources/datasets.js" ],
      "key": "homework"
    },
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onchange": function ( event ) { console.log( this.index, 'onchange', this.getValue(), event ) }
  },

  "local_gold": {
    "key": "local_gold",
    "css.1": "../kanban_card/resources/gold.css",
    "data": {
      "store": [ "ccm.store", "../kanban_card/resources/datasets.js" ],
      "key": "presentation"
    }
  },

  "local_blue": {
    "key": "local_blue",
    "css.1": "../kanban_card/resources/blue.css"
  },

  "demo_white": {
    "key": "white",
    "data": {
      "store": [ "ccm.store", { "name": "kanban_card", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "demo_white"
    }
  },

  "demo_gold": {
    "key": "gold",
    "css.1": "https://ccmjs.github.io/akless-components/kanban_card/resources/gold.css",
    "data": {
      "store": [ "ccm.store", { "name": "kanban_card", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "demo_gold"
    }
  },

  "demo_blue": {
    "key": "blue",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_card/resources/blue.css", { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/weblysleekui/font.css" } ],
    "data": {
      "store": [ "ccm.store", { "name": "kanban_card", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "demo_blue"
    }
  }

};
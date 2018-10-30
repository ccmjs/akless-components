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
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onchange": function ( event ) { console.log( this.index, 'onchange', this.getValue(), event ) }
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
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_card/resources/gold.css" ],
    "data": {
      "store": [ "ccm.store", { "name": "kanban_card", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "demo_gold"
    }
  },

  "demo_blue": {
    "key": "blue",
    "font": [ "ccm.load", { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/weblysleekui/font.css" } ],
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_card/resources/blue.css" ],
    "data": {
      "store": [ "ccm.store", { "name": "kanban_card", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "demo_blue"
    }
  }

};
/**
 * @overview configurations of ccmjs-based web component for kanban board
 * @author André Kless <andre.kless@web.de> 2017-2018, 2020-2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "css.1": "./../kanban_board/resources/default.css",
    "data": {
      "store": [ "ccm.store", { "name": "kanban_board", "url": "wss://ccm2.inf.h-brs.de", "dataset": "test" } ],
      "key": "test"
    },
    "helper.1": "./../modules/helper.mjs",
    "html.1": "./../kanban_board/resources/templates.html",
    "ignore": {
      "card": {
        "component": "./../kanban_card/ccm.kanban_card.js",
        "config": {
          "css.1": "./../kanban_card/resources/default.css",
          "helper.1": "./../modules/helper.mjs",
          "html.1": "./../kanban_card/resources/templates-v2.html",
          "icon": {
            "owner": "./../kanban_card/resources/owner.svg",
            "deadline": "./../kanban_card/resources/deadline.svg"
          }
        }
      }
    },
//  "logger": [ "ccm.instance", "./../log/ccm.log.js", [ "ccm.get", "./../log/resources/configs.js", "greedy" ] ],
//  "onchange": event => console.log( event ),
    "reload": true,
    "user": [ "ccm.instance", "./../user/ccm.user.js", [ "ccm.get", "./../user/resources/resources.js", "local" ] ]
  },

  "demo": {
    "data": {
      "store": [ "ccm.store", { "name": "kanban_board", "url": "wss://ccm2.inf.h-brs.de", "dataset": "demo" } ],
      "key": "demo"
    },
    "ignore": {
      "card": {
        "component": "https://ccmjs.github.io/akless-components/kanban_card/versions/ccm.kanban_card-4.2.0.js",
        "config": {
          "css.1": "https://ccmjs.github.io/akless-components/kanban_card/resources/blue.css"
        }
      }
    }
  },

  "experimental": {
    "data": {
      "lanes": [
        {
          "cards": [
            [ "ccm.instance", "./../kanban_card/ccm.kanban_card.js", [ "ccm.get", "./../kanban_card/resources/configs.js", "local_white" ] ],
          ]
        },
        {
          "cards": [
            [ "ccm.instance", "./../quiz/ccm.quiz.js", [ "ccm.get", "./../quiz/resources/configs.js", "local" ] ]
          ]
        },
        {
          "cards": [
            [ "ccm.instance", "./../blank/ccm.blank.js" ],
            [ "ccm.instance", "./../cloze/ccm.cloze.js", [ "ccm.get", "../cloze/resources/resources.js", "local" ] ]
          ]
        }
      ]
    }
  }

};
/**
 * @overview static data-based resources of ccm-based web component for team project
 * @author André Kless <andre.kless@web.de> 2020-2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "chat": [ "ccm.component", "./../chat/ccm.chat.js", {
      "css.1": "./../chat/resources/snack.css",
      "css.2": { "url": "./../resources/fonts/WeblySleekUI/font.css", "context": "head" },
      "helper.1": "./../modules/helper.mjs",
      "html.1": "./../chat/resources/templates_v2.html"
    } ],
    "css.1": "./resources/default.css",
    "data": {
      "store": [ "ccm.store", { "name": "team_project", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "test"
    },
    "helper.1": "./../modules/helper.mjs",
    "html.1": "./resources/templates.html",
    "kanban_board": [ "ccm.component", "./../kanban_board/ccm.kanban_board.js", {
      "css.1": "./../kanban_board/resources/default.css",
      "helper.1": "./../modules/helper.mjs",
      "html.1": "./../kanban_board/resources/templates.html",
      "ignore": {
        "card": {
          "component": "https://ccmjs.github.io/akless-components/kanban_card/versions/ccm.kanban_card-3.0.0.js",
          "config": {
            "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_card/resources/blue.css", { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/weblysleekui/font.css" } ]
          }
        }
      },
      "reload": false
    } ],
//  "logger": [ "ccm.instance", "./../log/ccm.log.js", [ "ccm.get", "./../log/resources/configs.js", "greedy" ] ],
    "menu": [ "ccm.component", "./../menu/ccm.menu.js", [ "ccm.get", "./../menu/resources/configs.js", "top_tabs" ] ],
//  "onchange": event => console.log( event ),
    "teambuild": [ "ccm.component", "./../teambuild/ccm.teambuild.js", {
      "css": [ "ccm.load", "./../teambuild/resources/default.css" ],
      "reload": false
    } ],
    "user": [ "ccm.instance", "./../user/ccm.user.js" ]
  },

  "demo": {
    "data": {
      "store": [ "ccm.store", { "name": "team_project", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "kanban_board.2": {
      "ignore": {
        "card": {
          "component": "https://ccmjs.github.io/akless-components/kanban_card/versions/ccm.kanban_card-3.0.0.js",
          "config": {
            "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_card/resources/blue.css", { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/weblysleekui/font.css" } ]
          }
        }
      }
    },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js" ]
  }

};
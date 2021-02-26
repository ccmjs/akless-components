/**
 * @overview data-based resources of ccmjs-based web component for building a kanban board
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "css": [ "ccm.load",
      [  // serial
        "./../libs/bootstrap-4/css/bootstrap.css",
        [
          // parallel
          "./../libs/selectize-0/selectize.css",
          "./../kanban_board_builder/resources/default.css",
        ]
      ]
    ],
    "helper.1": "./../modules/helper.mjs",
    "html.1": "./../kanban_board_builder/resources/templates.mjs",
    "libs": [ "ccm.load",
      [  // serial
        "./../libs/jquery-3/jquery.min.js",
        [  // parallel
          "./../libs/bootstrap-4/js/bootstrap.bundle.min.js",
          [  // serial
            "./../libs/selectize-0/selectize.min.js",
            [  // parallel
              "./../libs/selectize-0/remove_button-plugin.min.js",
              [  // serial
                "./../libs/jquery-ui-1/jquery-ui-sortable.min.js",
                "./../libs/selectize-0/drag_drop-plugin.min.js"
              ]
            ]
          ]
        ]
      ]
    ],
//  "logger": [ "ccm.instance", "./../log/ccm.log.js", [ "ccm.get", "./../log/resources/configs.js", "greedy" ] ],
    "onfinish": { "log": true },
    "tool": [ "ccm.component", "./../kanban_board/ccm.kanban_board.js", [ "ccm.get", "./../kanban_board/resources/configs.js", "local" ] ]
  },

  "demo": {
    "data": {
      "store": [ "ccm.store", { "local": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_board/resources/configs.js" ] } ],
      "key": "demo"
    },
    "onfinish": { "log": true }
  },

  "dms": {
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_board_builder/resources/default.css" ],
    "data": {
      "store": [ "ccm.store", { "name": "kanban_board", "url": "https://ccm2.inf.h-brs.de" } ],
    },
    "libs": null,
    "preview": null,
    "submit": null
  }

};
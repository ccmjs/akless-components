/**
 * @overview data-based resources of ccmjs-based web component for building a chat
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "css": [ "ccm.load",
      [  // serial
        "./../libs/bootstrap-4/css/bootstrap.css",
        "./../chat_builder/resources/default.css",
      ]
    ],
    "data": {
      "store": [ "ccm.store", { "local": [ "ccm.load", "./../chat/resources/resources.js" ] } ],
      "key": "local"
    },
    "helper.1": "./../modules/helper.mjs",
    "html.1": "./../chat_builder/resources/templates.mjs",
    "libs": [ "ccm.load",
      [  // serial
        "./../libs/jquery-3/jquery.min.js",
        "./../libs/bootstrap-4/js/bootstrap.bundle.min.js"
      ]
    ],
//  "logger": [ "ccm.instance", "./../log/ccm.log.js", [ "ccm.get", "./../log/resources/configs.js", "greedy" ] ],
    "onfinish": { "log": true },
    "tool": [ "ccm.component", "./../chat/ccm.chat.js", [ "ccm.get", "./../chat/resources/resources.js", "local" ] ]
  },

  "demo": {
    "data": {
      "store": [ "ccm.store", { "local": [ "ccm.load", "./../chat/resources/resources.js" ] } ],
      "key": "demo"
    },
    "onfinish": { "log": true }
  },

  "dms": {
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/chat_builder/resources/default.css" ],
    "data": {
      "store": [ "ccm.store", { "name": "chat", "url": "https://ccm2.inf.h-brs.de" } ],
    },
    "libs": null,
    "preview": null,
    "submit": null
  }

};
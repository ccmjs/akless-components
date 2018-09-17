/**
 * @overview configurations of ccm component for component manager
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
      "../component_manager/resources/default.css"
    ],
    "data": {
      "store": [ "ccm.store", "../component_manager/resources/datasets.js" ],
      "key": "cloze"
    },
    "menu.1": "../menu/ccm.menu.js",
    "menu.2.key.1": "../menu/resources/configs.js",
    "menu.2.css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" }
    ],
    "details.1": "../content/ccm.content.js",
    "details.2.css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" }
    ],
    "rating.2.user.1": "../user/ccm.user.js",
    "rating.2.user.2.1": "../user/resources/configs.js",
    "commentary.2.user.1": "../user/ccm.user.js",
    "commentary.2.user.2.1": "../user/resources/configs.js",
    "builder.1": "../crud_app/ccm.crud_app.js",
    "builder.2.css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" }
    ],
    "builder.2.store.1.url": "https://ccm2.inf.h-brs.de",
    "user.1": "../user/ccm.user.js",
    "user.2.1": "../user/resources/configs.js",
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "component_icon": "../dms/resources/component.png"
  },

  "demo": {
    "data": {
      "store": [ "ccm.store", { "name": "components", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "cloze"
    },
    "rating.2.data.store.1": { "name": "component_ratings", "url": "https://ccm2.inf.h-brs.de" },
    "rating_result.2.data.store.1": { "name": "component_ratings", "url": "https://ccm2.inf.h-brs.de" },
    "commentary.2.data.store.1": { "name": "component_comments", "url": "https://ccm2.inf.h-brs.de" },
    "builder.2.store.1.url": "https://ccm2.inf.h-brs.de"
  }

};
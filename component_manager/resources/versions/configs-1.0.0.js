/**
 * @overview configurations of ccm component for component manager (last used with ccm.component_manager-2.2.6.js)
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs-1.0.0.js' ] = {

  "local": {
    "key": "local",
    "css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
      "../component_manager/resources/versions/default-1.0.0.css"
    ],
    "data": {
      "store": [ "ccm.store", "../component_manager/resources/versions/datasets-1.0.0.js" ],
      "key": "cloze"
    },
    "menu.component.1": "../menu/ccm.menu.js",
    "menu.ignore.sections.key.1": "../menu/resources/configs.js",
    "menu.ignore.sections.css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" }
    ],
    "menu.ignore.demos.key.1": "../menu/resources/configs.js",
    "menu.ignore.demos.css": [ "ccm.load",
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
    "source.url": "https://ccm2.inf.h-brs.de",
    "user.1": "../user/ccm.user.js",
    "user.2.1": "../user/resources/configs.js",
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "component_icon": "../dms/resources/component.png"
  },

  "developer": {
    "key": "developer",
    "css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
      "../component_manager/resources/versions/default-1.0.0.css"
    ],
    "data": {
      "store": [ "ccm.store", { "name": "components", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "cloze"
    },
    "menu.component.1": "../menu/ccm.menu.js",
    "menu.ignore.sections.key.1": "../menu/resources/configs.js",
    "menu.ignore.sections.css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" }
    ],
    "menu.ignore.demos.key.1": "../menu/resources/configs.js",
    "menu.ignore.demos.css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" }
    ],
    "details.1": "../content/ccm.content.js",
    "details.2.css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" }
    ],
    "rating.2.data.store.1": { "name": "component_ratings", "url": "https://ccm2.inf.h-brs.de" },
    "rating.2.user.1": "../user/ccm.user.js",
    "rating.2.user.2.1": "../user/resources/configs.js",
    "rating_result.2.data.store.1": { "name": "component_ratings", "url": "https://ccm2.inf.h-brs.de" },
    "commentary.2.data.store.1": { "name": "component_comments", "url": "https://ccm2.inf.h-brs.de" },
    "commentary.2.user.1": "../user/ccm.user.js",
    "commentary.2.user.2.1": "../user/resources/configs.js",
    "source.url": "https://ccm2.inf.h-brs.de",
    "user.1": "../user/ccm.user.js",
    "user.2.1": "../user/resources/configs.js",
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "component_icon": "../dms/resources/component.png"
  },

  "demo": {
    "key": "demo",
    "css": [ "ccm.load",
      "https://ccmjs.github.io/akless-components/libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap/css/font-face.css" },
      "https://ccmjs.github.io/akless-components/component_manager/resources/versions/default-1.0.0.css"
    ],
    "data": {
      "store": [ "ccm.store", { "name": "components", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "cloze"
    },
    "rating.2.data.store.1": { "name": "component_ratings", "url": "https://ccm2.inf.h-brs.de" },
    "rating_result.2.data.store.1": { "name": "component_ratings", "url": "https://ccm2.inf.h-brs.de" },
    "commentary.2.data.store.1": { "name": "component_comments", "url": "https://ccm2.inf.h-brs.de" },
    "source.url": "https://ccm2.inf.h-brs.de"
  }

};
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
    "rating.1": "../../tkless-components/star_rating/ccm.star_rating.js",
    "rating_result.1": "../../tkless-components/star_rating_result/ccm.star_rating_result.js",
    "commentary": "", //  "commentary.1": "../../tkless-components/comment/ccm.comment.js",
    "builder.1": "../crud_app/ccm.crud_app.js",
    "builder.2.css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" }
    ],
    "builder.2.store.1.url": "https://ccm2.inf.h-brs.de",
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "component_icon": "../dms/resources/component.png"
  },

  "demo": {
    "data": {
      "store": [ "ccm.store", { "name": "components", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "cloze"
    },
    "rating": "",
    "rating_result": "",
    "commentary": "",
    "builder.2.store.1.url": "https://ccm2.inf.h-brs.de"
  }

};
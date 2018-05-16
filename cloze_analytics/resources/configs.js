/**
 * @overview configurations of ccm component for rendering fill-in-the-blank analytics
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "localhost": {
    "css": [ "ccm.load",
      "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
      "../cloze_analytics/resources/default.css"
    ],
    "sections": {
      "results": "Show Results"
    },
    "menu": [ "ccm.instance", "../menu/ccm.menu.js", [ "ccm.get", "../menu/resources/configs.js", "bootstrap" ] ],
    "user": [ "ccm.instance", "../user/ccm.user.js", { "realm": "guest", "guest": "teacher", "logged_in": true } ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "table": [ "ccm.component", "https://ccmjs.github.io/tkless-components/table/ccm.table.js" ],
    "cloze": {
      "comp": [ "ccm.component", "../cloze/ccm.cloze.js" ],
      "configs": [ "ccm.store", "../cloze/resources/configs.js" ],
      "results": [ "ccm.store", { "url": "http://localhost:8080", "store": "cloze_results" } ]
    },
    "onfinish": { "log": true, "restart": true }
  },

  "demo": {
    "css": [ "ccm.load",
      "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
      "https://ccmjs.github.io/akless-components/cloze_analytics/resources/default.css"
    ],
    "sections": {
      "results": "Show Results"
    },
    "menu": [ "ccm.instance", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-1.1.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/menu/resources/configs.js", "bootstrap" ] ],
    "user": [ "ccm.instance", "../user/ccm.user-5.0.1.js", { "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "demo" ], "logged_in": true } ],
    "table": [ "ccm.component", "https://ccmjs.github.io/tkless-components/table/ccm.table.js" ],
    "cloze": {
      "comp": [ "ccm.component", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-4.1.0.js" ],
      "configs": [ "ccm.store", "https://ccmjs.github.io/akless-components/cloze/resources/configs.js" ],
      "results": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "store": "cloze_results" } ]
    },
    "onfinish": { "log": true, "restart": true }
  }

};
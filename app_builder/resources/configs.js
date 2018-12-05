/**
 * @overview configurations of ccm component for building apps
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
    "css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
      "../app_builder/resources/default.css"
    ],
    "data": {
      "store": [ "ccm.store", "../content/resources/configs.js" ],
      "key": "local"
    },
    "builder": [ "ccm.component", "../json_builder/ccm.json_builder.js", {
      "html.inner.1": "",
      "directly": true
    } ],
    "app": [ "ccm.component", "../content/ccm.content.js" ],
    "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/configs.js", "guest" ] ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },

  "localhost": {
    "key": "localhost",
    "css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
      "../app_builder/resources/default.css"
    ],
    "builder": [ "ccm.component", "../json_builder/ccm.json_builder.js", {
      "html.inner.1": "",
      "directly": true
    } ],
    "app": [ "ccm.component", "../content/ccm.content.js" ]
  },

  "demo": {
    "key": "demo",
    "data": { "store": [ "ccm.store", { "name": "content", "url": "https://ccm2.inf.h-brs.de" } ] },
    "builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-6.7.0.js", [ "ccm.get", { "name": "submit", "url": "https://ccm2.inf.h-brs.de" }, "quick_decide_builder" ] ],
    "app": [ "ccm.component", "https://ccmjs.github.io/akless-components/quick_decide/versions/ccm.quick_decide-1.3.0.js" ]
  }

};
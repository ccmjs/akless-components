/**
 * @overview configurations of ccm component for building apps
 * @author André Kless <andre.kless@web.de> 2018-2019
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
      "store": [ "ccm.store", "../quick_decide/resources/configs.js" ],
      "key": "local"
    },
    "window": [ "ccm.component", "../window/ccm.window.js", [ "ccm.get", "../window/resources/configs.js", "local" ] ],
    "builder": [ "ccm.component", "../submit/ccm.submit.js", [ "ccm.get", { "name": "submit", "url": "https://ccm2.inf.h-brs.de" }, "quick_decide_builder" ] ],
    "app": [ "ccm.component", "../quick_decide/ccm.quick_decide.js" ],
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
    "window": [ "ccm.component", "../window/ccm.window.js" ],
    "builder": [ "ccm.component", "../submit/ccm.submit.js", [ "ccm.get", { "name": "submit", "url": "https://ccm2.inf.h-brs.de" }, "quick_decide_builder" ] ],
    "app": [ "ccm.component", "../content/ccm.quick_decide.js" ]
  },

  "demo": {
    "key": "demo",
    "data": { "store": [ "ccm.store", { "name": "quick_decide", "url": "https://ccm2.inf.h-brs.de" } ] },
    "window": [ "ccm.component", "https://ccmjs.github.io/akless-components/window/versions/ccm.window-1.0.0.js" ]
  }

};
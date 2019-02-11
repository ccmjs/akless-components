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
      "store": [ "ccm.store", "../cloze/resources/configs.js" ],
      "key": "local"
    },
    "booklet": [ "ccm.component", "../window/ccm.window.js", [ "ccm.get", "../window/resources/configs.js", "local" ] ],
    "builder": [ "ccm.component", "../submit/ccm.submit.js", [ "ccm.get", { "name": "submit", "url": "https://ccm2.inf.h-brs.de" }, "cloze_builder" ] ],
    "app": [ "ccm.component", "../cloze/ccm.cloze.js" ],
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
    "booklet": [ "ccm.component", "../window/ccm.window.js" ],
    "builder": [ "ccm.component", "../submit/ccm.submit.js", [ "ccm.get", { "name": "submit", "url": "http://localhost:8080" }, "cloze_builder" ] ],
    "app": [ "ccm.component", "../cloze/ccm.cloze.js" ]
  },

  "demo": {
    "key": "demo",
    "data": { "store": [ "ccm.store", { "name": "cloze", "url": "https://ccm2.inf.h-brs.de" } ] }
  }

};
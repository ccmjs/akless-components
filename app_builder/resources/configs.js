/**
 * @overview configurations of ccm component for building apps
 * @author André Kless <andre.kless@web.de> 2018-2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
    "css": [ "ccm.load",
      "../app_builder/resources/css/default-2.0.0.css",
      "../libs/bootstrap-4/css/bootstrap.min.css",
      { "context": "head", "url": "../libs/bootstrap-4/css/bootstrap.min.css" }
    ],
    "data": {
      "store": [ "ccm.store", "../cloze/resources/configs.js" ],
      "key": "demo"
    },
    "helper.1.url": "../modules/helper.js",
    "booklet": [ "ccm.component", "../window/ccm.window.js", [ "ccm.get", "../window/resources/configs.js", "local" ] ],
    "builder.1": "../submit/ccm.submit.js",
    "app": [ "ccm.component", "../cloze/ccm.cloze.js" ],
    "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/configs.js", "guest" ] ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },

  "offline": {
    "key": "offline",
    "css": [ "ccm.load",
      "../app_builder/resources/css/default-2.0.0.css",
      "../libs/bootstrap-4/css/bootstrap.min.css",
      { "context": "head", "url": "../libs/bootstrap-4/css/bootstrap.min.css" }
    ],
    "data": {
      "store": [ "ccm.store", { "name": "cloze" } ],
      "key": "test"
    },
    "helper.1.url": "../modules/helper.js",
    "booklet": [ "ccm.component", "../window/ccm.window.js", [ "ccm.get", "../window/resources/configs.js", "local" ] ],
    "builder.1": "../submit/ccm.submit.js",
    "app": [ "ccm.component", "../cloze/ccm.cloze.js" ],
    "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/configs.js", "guest" ] ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },

  "localhost": {
    "key": "localhost",
    "css": [ "ccm.load",
      "../app_builder/resources/css/default-2.0.0.css",
      "../libs/bootstrap-4/css/bootstrap.min.css",
      { "context": "head", "url": "../libs/bootstrap-4/css/bootstrap.min.css" }
    ],
    "data": {
      "store": [ "ccm.store", { "name": "cloze", "url": "http://localhost:8080" } ],
      "key": "test"
    },
    "helper.1.url": "../modules/helper.js",
    "booklet": [ "ccm.component", "../window/ccm.window.js", [ "ccm.get", "../window/resources/configs.js", "local" ] ],
    "builder.1": "../submit/ccm.submit.js",
    "app": [ "ccm.component", "../cloze/ccm.cloze.js" ],
    "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/configs.js", "guest" ] ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },

  "demo": {
    "key": "demo",
    "data": { "store": [ "ccm.store", { "name": "cloze", "url": "https://ccm2.inf.h-brs.de" } ] }
  }

};
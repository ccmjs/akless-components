/**
 * @overview configurations of ccm component for building apps
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
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
    "store.1": { "name": "content", "url": "https://ccm2.inf.h-brs.de" },
    "builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.0.0.js", {
      "html.inner.1": "",
      "directly": true
    } ],
    "app": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.0.js" ],
  }

};
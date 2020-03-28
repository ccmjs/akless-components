/**
 * @overview configurations of ccm component for for managing a data store
 * @author André Kless <andre.kless@web.de> 2019-2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "data": {
      "store": [ "ccm.store", { "name": "test", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": {}
    },
    "css.1": "../store/resources/default.css",
    "builder.1": "../json_builder/ccm.json_builder.js",
    "helper.1": "../modules/helper.mjs",
    "html.1": "../store/resources/templates.html",
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/resources.js", "local" ] ]
  },

  "demo": {
    "data": {
      "store": [ "ccm.store", { "name": "test", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": {}
    },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.4.0.js" ]
  }

};
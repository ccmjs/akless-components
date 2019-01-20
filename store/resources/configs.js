/**
 * @overview configurations of ccm component for for managing a data store
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
    "css": [ "ccm.load", "../store/resources/default.css", "../libs/bootstrap-4/css/bootstrap.min.css" ],
    "builder.1": "../json_builder/ccm.json_builder.js",
//  "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/configs.js", "local" ] ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },

  "demo": {
    "key": "demo",
    "data": {
      "store": [ "ccm.store", { "name": "test", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": {}
    }
//  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]
  }

};
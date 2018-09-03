/**
 * @overview configurations of ccm component template
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "css": [ "ccm.load", "../template/resources/default.css" ],
    "data": {
      "store": [ "ccm.store", "../template/resources/datasets.js" ],
      "key": "test"
    },
    "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/configs.js", "local" ] ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onfinish": { "log": true }
  },

  "demo": {
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/template/resources/default.css" ],
    "data": {
      "store": [ "ccm.store", { "name": "template", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
    "onfinish": { "log": true }
  }

};
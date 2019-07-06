/* ################################################### DEPRECATED ################################################### */

/**
 * @overview configurations of ccm component for digital maker space (last used with ccm.dms-1.0.7.js)
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
    "css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
      "../dms/resources/default.css"
    ],
    "data": {
      "store": [ "ccm.store", "../dms/resources/datasets.js" ],
      "key": {}
    },
    "listing.1": "../listing/ccm.listing.js",
    "listing.2.css.1": "../dms/resources/listing.css",
    "listing.2.defaults.icon": "../dms/resources/component.png",
    "rating.2.css.3": "../dms/resources/rating_result.css",
    "form.1": "..submit.js",
    "form.2.css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      "../dms/resources/submit.css"
    ],
    "component_manager": [ "ccm.component", "../component_manager/ccm.component_manager.js", [ "ccm.get", "../component_manager/resources/configs.js", "local" ] ],
    "user": [ "ccm.instance", "../user/ccm.user.js", {
      "key": [ "ccm.get", "../user/resources/configs.js", "local" ],
      "html.logged_in.class": "",
      "html.logged_out.class": ""
    } ],
    "logger":  [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },

  "developer": {
    "key": "developer",
    "css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
      "../dms/resources/default.css"
    ],
    "data": {
      "store": [ "ccm.store", { "name": "components", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": {}
    },
    "listing.1": "../listing/ccm.listing.js",
    "listing.2.css.1": "../dms/resources/listing.css",
    "listing.2.defaults.icon": "../dms/resources/component.png",
    "rating.2.css.3": "../dms/resources/rating_result.css",
    "rating.2.data": { "store": [ "ccm.store", [ "ccm.get", { "name": "component_ratings", "url": "https://ccm2.inf.h-brs.de" }, {} ] ] },
    "form.1": "..submit.js",
    "form.2.css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      "../dms/resources/submit.css"
    ],
    "component_manager": [ "ccm.component", "../component_manager/ccm.component_manager.js", [ "ccm.get", "../component_manager/resources/configs.js", "developer" ] ],
    "user": [ "ccm.instance", "../user/ccm.user.js", {
      "key": [ "ccm.get", "../user/resources/configs.js", "local" ],
      "html.logged_in.class": "",
      "html.logged_out.class": ""
    } ],
    "logger":  [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },

  "live": {
    "key": "live",
    "css": [ "ccm.load",
      "https://ccmjs.github.io/akless-components/libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap/css/font-face.css" },
      "https://ccmjs.github.io/akless-components/dms/resources/default.css"
    ],
    "data": {
      "store": [ "ccm.store", { "name": "components", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": {}
    },
    "listing.2.css.1": "https://ccmjs.github.io/akless-components/dms/resources/listing.css",
    "rating.2.data": { "store": [ "ccm.store", [ "ccm.get", { "name": "component_ratings", "url": "https://ccm2.inf.h-brs.de" }, {} ] ] },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", {
      "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ],
      "html.logged_in.class": "",
      "html.logged_out.class": ""
    } ]

  }

};
/**
 * @overview configurations of ccm component for digital maker space
 * @author André Kless <andre.kless@web.de> 2018-2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
    "css.1": "../dms/resources/default.css",
    "data": {
      "store": [ "ccm.store", { "name": "dms-components", "url": "http://localhost:8080" } ],
      "key": {}
    },
    "menu.1": "../menu/ccm.menu.js",
    "listing.1": "../listing/ccm.listing.js",
    "listing.2.css.1": "../dms/resources/listing.css",
    "listing.2.defaults.icon": "../dms/resources/component.png",
    "rating.2.data": { "store": [ "ccm.store", [ "ccm.get", { "name": "dms-component_ratings", "url": "http://localhost:8080" }, {} ] ] },
    "form.1": "../submit/ccm.submit.js",
    "form.2.css": [ "ccm.load",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
      "../libs/bootstrap/css/bootstrap.css",
      "../submit/resources/default.css"
    ],
    "form.2.entries.1": "../dms/resources/publish_form.js",
    "form.2.data": {
      "store": [ "ccm.store", { "name": "dms-components", "url": "http://localhost:8080" } ]
    },
    "component_manager": [ "ccm.component", "../component_manager/ccm.component_manager.js", [ "ccm.get", "../component_manager/resources/configs.js", "local" ] ],
    "user.1": "../user/ccm.user.js",
    "user.2.css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
      "../user/resources/default.css"
    ],
    "logger":  [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "routing.1": "../routing/ccm.routing.js",
    "logo": "../dms/resources/component.png"
  },

  "live": {
    "key": "live",
    "css.1": "https://ccmjs.github.io/akless-components/dms/resources/default-2.0.0.css",
    "data": {
      "store": [ "ccm.store", { "name": "dms-components", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": {}
    },
    "rating.2.data": { "store": [ "ccm.store", [ "ccm.get", { "name": "dms-component_ratings", "url": "https://ccm2.inf.h-brs.de" }, {} ] ] },
    "form.2.data": {
      "store": [ "ccm.store", { "name": "dms-components", "url": "https://ccm2.inf.h-brs.de" } ]
    }
  }

};
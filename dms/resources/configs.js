/**
 * @overview configurations of ccm component for digital maker space
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
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
    "listing.2.css.2": "../dms/resources/listing.css",
    "listing.2.defaults.icon": "../dms/resources/component.png",
    "rating.1": "../../tkless-components/star_rating_result/ccm.star_rating_result.js",
    "rating.2.css.3": "../dms/resources/rating_result.css",
    "form.1": "../submit/ccm.submit.js",
    "form.2.css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      "../dms/resources/submit.css"
    ],
    "component_manager": [ "ccm.component", "../component_manager/ccm.component_manager.js", [ "ccm.get", "../component_manager/resources/configs.js", "local" ] ],
    "resource_finder": [ "ccm.component", "../../leck-components/resource_finder/dist/ccm.resource_finder-0.1.0.js" ],
    "resource_publish": [ "ccm.component", "../../leck-components/resource_publish/dist/ccm.resource_publish-0.3.0.js" ],
    "user": [ "ccm.instance", "../user/ccm.user.js", {
      "key": [ "ccm.get", "../user/resources/configs.js", "local" ],
      "html.logged_in.class": "",
      "html.logged_out.class": ""
    } ],
    "logger":  [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },

  "demo": {
    "data": {
      "store": [ "ccm.store", "../dms/resources/datasets.js" ],
      "key": {}
    },
    /*
    "data": {
      "store": [ "ccm.store", { "name": "components", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": {}
    },
    */
    "rating": "",  // "rating.2.data": { "store": [ "ccm.store", { "name": "component_ratings", "url": "https://ccm2.inf.h-brs.de" } ] },
//  "component_manager": [ "ccm.component", "../component_manager/ccm.component_manager.js", [ "ccm.get", "../component_manager/resources/configs.js", "local" ] ],
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.0.0.js", {
      "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ],
      "html.logged_in.class": "",
      "html.logged_out.class": ""
    } ]

  }

};
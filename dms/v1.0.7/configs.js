/**
 * @overview configurations of ccm component for digital makerspace
 * @author André Kless <andre.kless@web.de> 2018-2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "live": {
    "css": [ "ccm.load",
      "https://ccmjs.github.io/akless-components/libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap/css/font-face.css" },
      "https://ccmjs.github.io/akless-components/dms/v1.0.7/default.css"
    ],
    "data": {
      "store": [ "ccm.store", { "name": "components", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": {}
    },
    "component_manager": [ "ccm.component", "https://ccmjs.github.io/akless-components/component_manager/versions/ccm.component_manager-2.2.6.js", {
      "rating.2.data.store.1": { "name": "component_ratings", "url": "https://ccm2.inf.h-brs.de" },
      "rating_result.2.data.store.1": { "name": "component_ratings", "url": "https://ccm2.inf.h-brs.de" },
      "commentary.2.data.store.1": { "name": "component_comments", "url": "https://ccm2.inf.h-brs.de" },
      "source.url": "https://ccm2.inf.h-brs.de"
    } ],
    "listing.2.css.1": "https://ccmjs.github.io/akless-components/dms/v1.0.7/listing.css",
    "rating.2.data": { "store": [ "ccm.store", [ "ccm.get", { "name": "component_ratings", "url": "https://ccm2.inf.h-brs.de" }, {} ] ] },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", {
      "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ],
      "html.logged_in.class": "",
      "html.logged_out.class": ""
    } ]
  }

};
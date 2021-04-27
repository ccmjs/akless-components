/**
 * @overview data-based resources of ccmjs-based web component for log analytics
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "css.1.1": "./../log_analytics/resources/styles.css",
    "data": {
      "store": [ "ccm.store", { "name": "db-ss21-er-log", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": {}
    },
    "html.1": "./../log_analytics/resources/templates.mjs"
  },

  "demo": {
  }

};
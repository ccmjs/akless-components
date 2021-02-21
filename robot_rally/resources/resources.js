/**
 * @overview data-based resources of ccm component for robot rally boardgames
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "css": [ "ccm.load", "./resources/default.css" ],
    /*
    "data": {
      "store": [ "ccm.store", { "name": "robot_rally", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "game"
    },
    */
    "helper.1": "./../modules/helper.mjs",
    "html.1": "./resources/templates.mjs"
  },

  "demo": {}

};
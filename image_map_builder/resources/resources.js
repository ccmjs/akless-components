/**
 * @overview static data-based resources of ccm component for building image maps
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  /** test configuration (relative paths) */
  "local": {
    "css.1": "../image_map_builder/resources/styles.css",
    "convert.1.url": "../modules/json2json.mjs",
    "data": {
      "store": [ "ccm.store", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "1588895707480X39770386736883045"
    },
    "helper.1": "../modules/helper.mjs",
    "html.1": "../image_map_builder/resources/templates.html",
    "image_map.1": "../quest_map/ccm.quest_map.js",
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onchange": event => console.log( event.getValue() ),
    "submit.1": "../submit/ccm.submit.js"
  }

};
/**
 * @overview static data-based resources of ccm component for building image maps
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  /** test configuration (relative paths) */
  "local": {
    "convert.1.url": "../modules/json2json.mjs",
    "helper.1": "../modules/helper.mjs",
    "html.1": "../image_map_builder/resources/templates.html",
    "image_map.1": "../image_map/ccm.image_map.js",
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onchange": instance => console.log( instance.getValue() ),
    "submit.1": "../submit/ccm.submit.js"
  }

};
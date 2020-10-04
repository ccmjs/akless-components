/**
 * @overview data-based resources of component for quick questions
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  /** test configuration (relative paths) */
  "local": {
    "convert.1": "./../modules/json2json.mjs#question2highchart",
    "css.1": "./resources/styles.css",
    "diagram": [ "ccm.component", "./../highchart/ccm.highchart.js", [ "ccm.get", "./../highchart/resources/configs.js", "local" ] ],
    "helper.1": "./../modules/helper.mjs",
    "html.1": "./resources/templates.mjs",
    "store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "quick_question" } ],
    "user": [ "ccm.instance", "./../user/ccm.user.js", {
      "guest": true,
      "helper.1": "./../modules/helper.mjs",
      "html.1": "./../user/resources/resources.js",
      "logged_in": true
    } ]
  },

  /** demo configuration (absolute paths) */
  "demo": {
    "store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "quick_question" } ]
  }

};

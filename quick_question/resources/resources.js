/**
 * @overview data-based resources of ccmjs-based web component for quick questions
 * @author André Kless <andre.kless@web.de> 2020-2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  /** test configuration (relative paths) */
  "local": {
    "convert.1": "./../modules/json2json.mjs#question2highchart",
    "css.1": "./../quick_question/resources/styles.css",
    "diagram": [ "ccm.component", "./../highchart/ccm.highchart.js", [ "ccm.get", "./../highchart/resources/configs.js", "local" ] ],
    "helper.1": "./../modules/helper.mjs",
    "html.1": "./../quick_question/resources/templates.mjs",
    "store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "quick_question" } ],
    "user": [ "ccm.instance", "./../user/ccm.user.js", {
      "guest": true,
      "helper.1": "./../modules/helper.mjs",
      "html.1": "./../user/resources/resources.js",
      "logged_in": true,
      "norender": true
    } ]
  },

  /** demo configuration (absolute paths) */
  "demo": {
    "store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "quick_question" } ]
  }

};

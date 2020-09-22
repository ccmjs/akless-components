/**
 * @overview data-based resources of ccm component for quick questions
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  /** test configuration (relative paths) */
  "local": {
    "convert.1": "./resources/json2json.mjs#quick_question2highchart",
    "css.1": "./resources/styles.css",
    "font": [ "ccm.load", { "url": "https://fonts.googleapis.com/css?family=Courgette", "context": "head", "type": "css" } ],
    "diagram": [ "ccm.component", "./../highchart/ccm.highchart.js", [ "ccm.get", "./../highchart/resources/configs.js", "local" ] ],
    "store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "quick_question" } ],
    //"store": [ "ccm.store", "./resources/store.js" ],
    "helper.1": "./resources/helper.mjs",
    "html.1": "./resources/templates.mjs",
    "user": [ "ccm.instance", "./../user/ccm.user.js", {
      "guest": true,
      "helper.1": "./../modules/helper.mjs",
      "html": [ "ccm.get", "./../user/resources/resources.js", "html" ],
      "logged_in": true
    } ]
  },

  /** demo configuration (absolute paths) */
  "demo": {
    "font": [ "ccm.load", { "url": "https://fonts.googleapis.com/css?family=Courgette", "context": "head", "type": "css" } ],
    "store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "quick_question" } ],
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "guest" ] ]
  }

};

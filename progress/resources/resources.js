/**
 * @overview static data-based resources of ccm component for progress indication
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  /** test configuration (relative paths) */
  "local": {
    "css.1": "../progress/resources/styles.css",
    "results": [
      {
        "store": [ "ccm.store", { "name": "quiz_results", "url": "https://ccm2.inf.h-brs.de" } ],
        "key": "1583315148971X09794135107598168"
      },
      {
        "store": [ "ccm.store", { "name": "cloze_results", "url": "https://ccm2.inf.h-brs.de" } ],
        "key": "generics"
      }
    ],
    "helper.1": "../modules/helper.mjs",
    "html.1": "../progress/resources/templates.html",
//  "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
//  "onchange": event => console.log( event ),
    "onfinish": { "log": true },
    "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/configs.js", "guest" ] ]
  },

  /** demo configuration (absolute paths) */
  "demo": {
    "results": [
      {
        "store": [ "ccm.store", { "name": "quiz_results", "url": "https://ccm2.inf.h-brs.de" } ],
        "key": "1583315148971X09794135107598168"
      },
      {
        "store": [ "ccm.store", { "name": "cloze_results", "url": "https://ccm2.inf.h-brs.de" } ],
        "key": "generics"
      }
    ],
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]
  }

};
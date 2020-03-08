/**
 * @overview static data-based resources of ccm component for math pyramids
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  /** test configuration (relative paths) */
  "local": {
    "captions": {
      "cancel": "Abbrechen",
      "feedback": "Feedback",
      "retry": "Weitermachen",
      "finish": "Neues Spiel"
    },
    "css.1": "../math_pyramid/resources/styles.css",
    /*
    "data": {
      "store": [ "ccm.store", { "name": "math_pyramid", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "test",
      "login": true,
      "user": true,
      "permissions": {
        "access": {
          "get": "all",
          "set": "creator",
          "del": "creator"
        }
      }
    },
    */
    "helper.1": "../modules/helper.mjs",
    "html.1": "../math_pyramid/resources/templates.html",
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "max": 2000,
    "min": 1000,
//  "oncancel": instance => console.log( instance ),
    "onchange": event => console.log( event ),
    "onfeedback": instance => console.log( instance ),
    "onretry": instance => console.log( instance ),
    "onfinish": {
      "log": true,
//    "store": true,
//    "alert": "Gespeichert!",
      "restart": true
    },
    "operator": "+",
    "retry": true,
    "show_results": false,
    "size": 8,
    "solutions": false,
    "user": [ "ccm.start", "../user/ccm.user.js", [ "ccm.get", "../user/resources/configs.js", "guest" ] ]
  },

  /** demo configuration (absolute paths) */
  "demo": {
    "captions.finish": "Restart",
    "onfinish": {
      "restart": true
    },
    "retry": true
  }

};
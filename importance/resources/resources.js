/**
 * @overview data-based resources of ccm component for importance of questions
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  /** test configuration (relative paths) */
  "local": {
    "css.1": "../importance/resources/styles.css",
    "data": [ "ccm.get", "../importance/resources/resources.js", "data" ],
    "helper.1": "../modules/helper.mjs",
    "html.1": "../importance/resources/templates.html",
//  "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
//  "onchange": event => console.log( event ),
//  "onstart": event => console.log( event ),
    "user": [ "ccm.instance", "../user/ccm.user.js", {
      "css": [ "ccm.load",
        "../libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
        "../user/resources/default.css"
      ],
      "helper.1": "../modules/helper.mjs",
      "html": [ "ccm.get", "../user/resources/resources.js", "html" ],
      "realm": "guest",
      "store": "guest-user",
      "url": "https://ccm2.inf.h-brs.de"
    } ]
  },

  /** demo configuration (absolute paths) */
  "demo": {
    "data": [ "ccm.get", "https://ccmjs.github.io/akless-components/importance/resources/resources.js", "data" ],
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.6.0.js", {
      "realm": "guest",
      "store": "guest-user",
      "url": "https://ccm2.inf.h-brs.de"
    } ]
  },

  /** demo data */
  "data": {
    "1": {
      "title": "Do you",
      "text": "like Hamburger?",
      "voting": {
        "yes": {
          "john": "John Doe"
        },
        "no": {
          "jane": "Jane Doe"
        },
        "neither": {
          "jake": "Jake Doe"
        }
      }
    }
  }

};

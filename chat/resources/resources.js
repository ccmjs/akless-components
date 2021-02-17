/**
 * @overview data-based resources of ccmjs-based web component for chat
 * @author André Kless <andre.kless@web.de> 2020-2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  /** test configuration (relative paths) */
  "local": {
    "css.1": "./resources/snack.css",
    "css.2": { "url": "./../resources/fonts/WeblySleekUI/font.css", "context": "head" },
    "data": {
      "store": [ "ccm.store", { "name": "chat-data", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "test"
    },
    "helper.1": "./../modules/helper.mjs",
//  "hide_login": true,
    "html.1": "./resources/templates_v2.html",
//  "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js", [ "ccm.get", "./resources/resources.js", "lang" ] ],
//  "logger": [ "ccm.instance", "./../log/ccm.log.js", [ "ccm.get", "./../log/resources/configs.js", "greedy" ] ],
    "onchange": event => console.log( event ),
    "onstart": instance => console.log( instance ),
    "user": [ "ccm.instance", "./../user/ccm.user.js", [ "ccm.get", "./resources/resources.js", "user" ] ]
  },

  /** demo configuration (absolute paths) */
  "demo": {
    "data": {
      "store": [ "ccm.store", { "name": "chat-data", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/chat/resources/resources.js", "lang" ] ],
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/chat/resources/resources.js", "user" ] ]
  },

  /** configuration for multilingualism */
  "lang": {
    "translations": {
      "de": {
        "flag": "https://ccmjs.github.io/tkless-components/lang/resources/de.svg",
        "send": "Senden"
      },
      "en": {
        "flag": "https://ccmjs.github.io/tkless-components/lang/resources/en.svg",
        "send": "Send"
      }
    },
    "active": "en"
  },

  /** configuration for user authentication */
  "user": {
//  "hash": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/md5.mjs" ],
//    "realm": "cloud",
//    "store": "chat-user",
//    "title": "Please enter Username and Password",
//    "url": "https://ccm2.inf.h-brs.de"
  }

};

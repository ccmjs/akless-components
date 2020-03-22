/**
 * @overview data-based resources of ccm component for chat
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  /** test configuration (relative paths) */
  "local": {
    "css.1": "../chat/resources/default.css",
    "css.2": { "url": "../resources/fonts/WeblySleekUI/font.css", "context": "head" },
    "data": {
      "store": [ "ccm.store", { "name": "chat-test", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": {}
    },
    "helper.1": "../modules/helper.mjs",
//  "hide_login": true,
    "html.1": "../chat/resources/templates.html",
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "user": [ "ccm.start", "../user/ccm.user.js", [ "ccm.get", "../chat/resources/resources.js", "user" ] ]
  },

  /** demo configuration (absolute paths) */
  "demo": {
    "data": {
      "store": [ "ccm.store", { "name": "chat-test", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": {}
    },
    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/chat/resources/resources.js", "user" ] ]
  },

  /** configuration for user authentication */
  "user": {
    "hash": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/md5.mjs" ],
    "realm": "cloud",
    "store": "chat-user",
    "url": "https://ccm2.inf.h-brs.de"
  }

};

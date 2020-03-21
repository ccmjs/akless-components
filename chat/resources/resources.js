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
      "store": [ "ccm.store", [
        {
          "key": "msg-1",
          "picture": "https://akless.github.io/akless/resources/images/hedgehog.jpg",
          "user": "Hedgehog",
          "created_at": "11:52 Uhr",
          "text": "Hello, World!<br>Welcome to this chat."
        },
        {
          "key": "msg-2",
          "picture": "https://akless.github.io/akless/resources/images/snail.jpg",
          "user": "Snail",
          "created_at": "12:01 Uhr",
          "text": "Hi there."
        },
        {
          "key": "msg-3",
          "user": "Guest",
          "created_at": "13:28 Uhr",
          "text": "I'm only a guest user."
        }
      ] ],
      "key": {}
    },
    "helper.1": "../modules/helper.mjs",
    "html.1": "../chat/resources/templates.html",
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "user": [ "ccm.start", "../user/ccm.user.js", [ "ccm.get", "../chat/resources/resources.js", "user" ] ]
  },

  /** demo configuration (absolute paths) */
  "demo": {
  },

  /** configuration for user authentication */
  "user": {
//  "hash": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/md5.mjs" ],
    "realm": "guest",
//  "store": "dms-user",
//  "url": "https://ccm2.inf.h-brs.de"
  }

};

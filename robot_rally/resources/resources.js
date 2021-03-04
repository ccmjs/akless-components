/**
 * @overview data-based resources of ccmjs-based web component for robot rally boardgames
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "chat": [ "ccm.component", "./../chat/ccm.chat.js", {
      "data": {
        "store": [ "ccm.store", { "name": "robot_rally", "url": "wss://ccm2.inf.h-brs.de" } ]
      },
      "user": [ "ccm.instance", "./../users/ccm.users.js" ]
    } ],
    "css": [ "ccm.load", "./../robot_rally/resources/default.css" ],
    "data": {
      "store": [ "ccm.store", { "name": "robot_rally", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "test"
    },
    "helper.1": "./../modules/helper.mjs",
    "html.1": "./../robot_rally/resources/templates.mjs"
  },

  "demo": {},

  /** configuration for user authentication */
  "user": {
    "realm": "cloud",
    "store": "chat-user",
    "title": "Please enter Username and Password",
    "url": "https://ccm2.inf.h-brs.de"
  }

};
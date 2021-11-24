/**
 * @overview data-based resources of ccmjs-based web component for a robot rally boardgame
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "chat": [ "ccm.component", "./../chat/ccm.chat.js", {
    /*
    "data": {
      "store": [ "ccm.store", { "name": "robot_rally", "url": "wss://ccm2.inf.h-brs.de" } ]
    },
     */
    "user": [ "ccm.instance", "./../users/ccm.users.js" ]
  } ],
  "css": [ "ccm.load", "./../robot_rally/resources/styles.css" ],
  /*
  "data": {
    "store": [ "ccm.store", { "name": "robot_rally", "url": "wss://ccm2.inf.h-brs.de" } ],
    "key": "test"
  },
   */
  "helper.1": "./../modules/helper.mjs",
  "html.1": "./../robot_rally/resources/templates.mjs",
  "path": "./../robot_rally/resources/"
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "chat.2.data.store": [ "ccm.store", { "name": "robot_rally", "url": "wss://ccm2.inf.h-brs.de" } ],
  "data": {
    "store": [ "ccm.store", { "name": "robot_rally", "url": "wss://ccm2.inf.h-brs.de" } ],
    "key": "demo"
  }
};
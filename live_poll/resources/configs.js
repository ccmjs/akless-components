/**
 * @overview configurations of ccm component for live poll
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
    "css": [ "ccm.load", "../live_poll/resources/default.css" ],
    "data": {
      "store": [ "ccm.store", { "name": "live_poll_data", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "test",
      "unique": true
    },
    "onfinish": {
      "log": true,
      "store": true,
      "alert": "Saved!"
    },
    "show_results": false,
    "converter": [ "ccm.load", { "url": "../modules/json-to-json.js", "type": "module", "import": "poll_to_highchart" } ],
    "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/configs.js", "local" ] ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },

  "demo": {
    "key": "demo",
    "data": {
      "store": [ "ccm.store", { "name": "live_poll_data", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "demo",
      "user": true,
      "unique": true
    },
    "onfinish": {
      "log": true,
      "store": true,
      "alert": "Saved!"
    }
  }

};
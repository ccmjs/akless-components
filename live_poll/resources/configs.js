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
      "store": [ "ccm.store", { "local": { "test": {
        "key": "test",
        "question": "Apple or Pear?",
        "answers": [
          "Apple",
          "Pear",
          "Don't Know"
        ]
      } } } ],
      "key": "test"
    },
    "onfinish": { "log": true },
    "converter": [ "ccm.load", { "url": "../modules/json-to-json.js", "type": "module", "import": "poll_to_plotly" } ],
    "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/configs.js", "local" ] ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },

  "localhost": {
    "key": "localhost",
    "css": [ "ccm.load", "../live_poll/resources/default.css" ],
    "data": {
      "store": [ "ccm.store", { "name": "live_poll_data", "url": "ws://localhost:8080" } ],
      "key": "test"
    },
    "onfinish": { "log": true },
    "converter": [ "ccm.load", { "url": "../modules/json-to-json.js", "type": "module", "import": "poll_to_plotly" } ],
    "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/configs.js", "local" ] ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },

  "demo": {
    "key": "demo",
    "data": {
      "store": [ "ccm.store", { "name": "live_poll_data", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    }
  }

};
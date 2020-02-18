/**
 * @overview configurations of ccm component for live poll
 * @author André Kless <andre.kless@web.de> 2019-2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "converter.1.url": "../modules/json2json.mjs",
    "css.1": "../live_poll/resources/default.css",
    "data.store.1": { "name": "live_poll_data", "url": "wss://ccm2.inf.h-brs.de" },
    "helper.1": "../modules/helper.mjs",
    "html.1": "../live_poll/resources/templates.html",
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onfinish": {
      "log": true,
      "store": {
        "settings": {
          "name": "result_data",
          "url": "https://ccm2.inf.h-brs.de"
        },
        "user": true,
        "unique": true,
        "permissions": {
          "access": {
            "get": "all",
            "set": "creator",
            "del": "creator"
          }
        }
      },
      "alert": "Saved!",
      "restart": true
    },
    "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/configs.js", "local" ] ]
  },

  "demo": {
    "key": "demo",
    "data": {
      "store": [ "ccm.store", { "name": "live_poll_data", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "onfinish": {
      "store": {
        "settings": {
          "name": "result_data",
          "url": "https://ccm2.inf.h-brs.de"
        },
        "user": true,
        "unique": true,
        "permissions": {
          "access": {
            "get": "all",
            "set": "creator",
            "del": "creator"
          }
        }
      },
      "alert": "Saved!",
      "restart": true
    }
  }

};
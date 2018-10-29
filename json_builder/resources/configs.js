/**
 * @overview configurations of ccm component for JSON builder
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
    "css.1": "../json_builder/resources/default.css",
    "data": {
      "json": {
        "obj": {
          "foo": "bar",
          "numbers": [ 1, 2, 3 ],
          "i": 5711,
          "valid": true
        }
      }
    },
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onchange": instance => console.log( instance.index, 'onchange', instance.getValue() ),
    "onfinish": { "log": true }
  },

  "demo": {
    "key": "demo",
    "data": {
      "store": [ "ccm.store", { "name": "json_builder", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "onfinish": { "store": true, "alert": "Saved!" }
  }

};
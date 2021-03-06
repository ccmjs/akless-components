/**
 * @overview configurations of ccm component for evaluating a given JavaScript expression
 * @author André Kless <andre.kless@web.de> 2017
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
    "expression": "{\n  \"foo\": \"bar\",\n  \"numbers\": [ 1, 2, 3 ],\n  \"i\": 5711,\n  \"valid\": true\n}",
    "json_parse": true,
    "user": [ "ccm.instance", "../user/ccm.user.js" ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },

  "demo": {
    "key": "demo",
    "expression": "{\n  \"foo\": \"bar\",\n  \"numbers\": [ 1, 2, 3 ],\n  \"i\": 5711,\n  \"valid\": true\n}",
    "json_parse": true,
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-2.0.1.js" ],
    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-2.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ]
  }

};
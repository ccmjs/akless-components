/**
 * @overview configurations of ccm component for submitting data
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "data": {
      "store": [ "ccm.store", "../submit/resources/datasets.js" ],
      "key": "test"
    },
    "content": [ "ccm.component", "../content/ccm.content.js" ],
    "cloze_builder": [ "ccm.component", "../cloze_builder/ccm.cloze_builder.js" ],
    "user": [ "ccm.instance", "../user/ccm.user.js" ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onfinish": { "log": true }
  },

  "localhost": {
    "data": {
      "store": [ "ccm.store", { "store": "submit", "url": "http://localhost:8080" } ],
      "key": "test"
    },
    "content": [ "ccm.component", "../content/ccm.content.js" ],
    "cloze_builder": [ "ccm.component", "../cloze_builder/ccm.cloze_builder.js" ],
    "user": [ "ccm.instance", "../user/ccm.user.js" ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onfinish": {
      "log": true,
      "store": {
        "settings": { "store": "submit", "url": "http://localhost:8080" },
        "key": "test"
      },
      "alert": "Saved!"
    }
  },

  "demo": {
    "data": {
      "store": [ "ccm.store", { "store": "submit", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-4.0.0.js" ],
    "cloze_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/cloze_builder/versions/ccm.cloze_builder-2.1.3.js" ],
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-4.0.1.js", { "realm": "demo" } ],
    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
    "onfinish": {
      "log": true,
      "store": {
        "settings": { "store": "submit", "url": "https://ccm2.inf.h-brs.de" },
        "key": "demo"
      },
      "alert": "Saved!"
    }
  }

};
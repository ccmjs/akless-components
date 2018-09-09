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
    "cloze_builder": [ "ccm.component", "../cloze_builder/ccm.cloze_builder.js", {
      "key": [ "ccm.get", "../cloze_builder/resources/configs.js", "local" ],
      "submit_button": false
    } ],
    "teambuild_builder": [ "ccm.component", "../teambuild_builder/ccm.teambuild_builder.js", {
      "key": [ "ccm.get", "../teambuild_builder/resources/configs.js", "local" ],
      "submit_button": false
    } ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onfinish": { "log": true }
  },

  "localhost": {
    "data": {
      "store": [ "ccm.store", { "name": "submit", "url": "http://localhost:8080" } ],
      "key": "test"
    },
    "content": [ "ccm.component", "../content/ccm.content.js" ],
    "cloze_builder": [ "ccm.component", "../cloze_builder/ccm.cloze_builder.js", {
      "key": [ "ccm.get", "../cloze_builder/resources/configs.js", "local" ],
      "submit_button": false
    } ],
    "teambuild_builder": [ "ccm.component", "../teambuild_builder/ccm.teambuild_builder.js", {
      "key": [ "ccm.get", "../teambuild_builder/resources/configs.js", "local" ],
      "submit_button": false
    } ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onfinish": {
      "log": true,
      "store": {
        "settings": { "name": "submit", "url": "http://localhost:8080" },
        "key": "test"
      },
      "alert": "Saved!"
    }
  },

  "demo": {
    "data": {
      "store": [ "ccm.store", { "name": "submit", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.0.js" ],
    "cloze_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/cloze_builder/versions/ccm.cloze_builder-3.0.0.js", {
      "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/cloze_builder/resources/configs.js", "demo" ],
      "submit_button": false
    } ],
    "teambuild_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/teambuild_builder/versions/ccm.teambuild_builder-4.0.0.js", {
      "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/teambuild_builder/resources/configs.js", "demo" ],
      "submit_button": false
    } ],
    "onfinish": {
      "store": {
        "settings": { "name": "submit", "url": "https://ccm2.inf.h-brs.de" },
        "key": "demo"
      },
      "alert": "Saved!"
    }
  }

};
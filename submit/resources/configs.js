/**
 * @overview configurations of ccm component for submitting data
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
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
    "json_builder": [ "ccm.component", "../json_builder/ccm.json_builder.js", {
      "html.inner.1": "",
      "directly": true
    } ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onchange": function ( event ) { console.log( this.index, 'onchange', this.getValue(), event ) },
    "onfinish": { "log": true }
  },

  "localhost": {
    "key": "localhost",
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
    "json_builder": [ "ccm.component", "../json_builder/ccm.json_builder.js", {
      "html.inner.1": "",
      "directly": true
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
    "key": "demo",
    "data": {
      "store": [ "ccm.store", { "name": "submit", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.1.js" ],
    "cloze_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/cloze_builder/versions/ccm.cloze_builder-3.0.0.js", {
      "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/cloze_builder/resources/configs.js", "demo" ],
      "submit_button": false
    } ],
    "teambuild_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/teambuild_builder/versions/ccm.teambuild_builder-4.0.0.js", {
      "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/teambuild_builder/resources/configs.js", "demo" ],
      "submit_button": false
    } ],
    "json_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.1.0.js", {
      "html.inner.1": "",
      "directly": true
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
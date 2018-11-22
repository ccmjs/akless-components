/**
 * @overview configurations of ccm component for submitting data
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
//  "inner": [ "ccm.load", { "url": "../submit/resources/demo.html", "type": "data" } ],
    "entries": [ "ccm.get", "../submit/resources/datasets.js", "demo.data" ],
    "css": [ "ccm.load",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
      "../libs/bootstrap/css/bootstrap.css",
      "../submit/resources/default.css"
    ],
    "data": {
      "store": [ "ccm.store", "../submit/resources/datasets.js" ],
      "key": "test"
    },
    "content": [ "ccm.component", "../content/ccm.content.js" ],
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
//  "inner": [ "ccm.load", { "url": "../submit/resources/demo.html", "type": "data" } ],
    "entries": [ "ccm.get", "../submit/resources/datasets.js", "demo.data" ],
    "css": [ "ccm.load",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
      "../libs/bootstrap/css/bootstrap.css",
      "../submit/resources/default.css"
    ],
    "data": {
      "store": [ "ccm.store", { "name": "submit", "url": "http://localhost:8080" } ],
      "key": "test"
    },
    "content": [ "ccm.component", "../content/ccm.content.js" ],
    "json_builder": [ "ccm.component", "../json_builder/ccm.json_builder.js", {
      "html.inner.1": "",
      "directly": true
    } ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onfinish": {
      "log": true,
      "store": true,
      "alert": "Saved!"
    }
  },

  "demo": {
    "key": "demo",
//  "inner": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/submit/resources/demo.html", "type": "data" } ],
    "entries": [ "ccm.get", "https://ccmjs.github.io/akless-components/submit/resources/datasets.js", "demo.data" ],
    "data": {
      "store": [ "ccm.store", { "name": "submit_data", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.1.js" ],
    "json_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.2.0.js", {
      "html.inner.1": "",
      "directly": true
    } ],
    "onfinish": {
      "store": true,
      "alert": "Saved!"
    }
  }

};
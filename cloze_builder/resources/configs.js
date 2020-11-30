/**
 *----------------------------------------------------- DEPRECATED -----------------------------------------------------
 *
 * @overview configurations of ccm component for building a fill-in-the-blank text
 * @author André Kless <andre.kless@web.de> 2017-2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
    "css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
      "../cloze_builder/resources/default.css"
    ],
    "data": {
      "store": [ "ccm.store", "../cloze_builder/resources/datasets.js" ],
      "key": "test"
    },
    "editor.2.editor": [ "ccm.load",
      [
        [
          "../libs/highlight/darcula.min.css",
          "../libs/highlight/highlight.min.js"
        ],
        [
          "../libs/quill/quill.min.js",
          "../libs/quill/quill.snow.css"
        ]
      ]
    ],
    "target": [ "ccm.component", "../cloze/ccm.cloze.js" ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onchange": function () { console.log( this.index, 'onchange', this.getValue() ) },
    "onfinish": { "log": true }
  },

  "localhost": {
    "key": "localhost",
    "css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
      "../cloze_builder/resources/default.css"
    ],
    "data": {
      "store": [ "ccm.store", { "name": "cloze", "url": "http://localhost:8080" } ],
      "key": "test"
    },
    "editor.2.editor": [ "ccm.load",
      [
        [
          "../libs/highlight/darcula.min.css",
          "../libs/highlight/highlight.min.js"
        ],
        [
          "../libs/quill/quill.min.js",
          "../libs/quill/quill.snow.css"
        ]
      ]
    ],
    "target": [ "ccm.component", "../cloze/ccm.cloze.js" ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onfinish": {
      "log": true,
      "store": {
        "settings": { "name": "cloze", "url": "http://localhost:8080" },
        "key": "test"
      },
      "alert": "Saved!"
    }
  },

  "demo": {
    "key": "demo",
    "data": {
      "store": [ "ccm.store", { "name": "cloze", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "submit_button": "Submit",
    "onfinish": {
      "store": {
        "settings": { "name": "cloze", "url": "https://ccm2.inf.h-brs.de" },
        "key": "demo"
      },
      "alert": "Saved!"
    }
  }

};
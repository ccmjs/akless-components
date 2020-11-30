/**
 * @overview data-based resources of ccm component for building a fill-in-the-blank text
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "css": [ "ccm.load",
      [
        "./../libs/bootstrap-4/css/bootstrap.css",
        "./resources/default-1.css"
      ]
    ],
    "data": {
      "store": [ "ccm.store", { "local": [ "ccm.load", "./../cloze/resources/resources.js" ] } ],
      "key": "local"
    },
    "helper.1": "./../modules/helper.mjs",
    "html.1": "./resources/templates.mjs",
    "libs": [ "ccm.load",
      // parallel
      "./../libs/quill-1/quill.snow.css",
      "./../libs/selectize-0/selectize.css",
      [  // serial
        "./../libs/jquery/jquery-3.5.1.slim.min.js",
        [  // parallel
          "./../libs/quill-1/quill.min.js",
          "./../libs/bootstrap-4/js/bootstrap.bundle.min.js",
          [  // serial
            "./../libs/selectize-0/selectize.min.js",
            "./../libs/selectize-0/selectize-plugin.min.js"
          ]
        ]
      ]
    ],
//  "logger": [ "ccm.instance", "./../log/ccm.log.js", [ "ccm.get", "./../log/resources/configs.js", "greedy" ] ],
    "onfinish": { "log": true },
    "tool": [ "ccm.component", "./../cloze/ccm.cloze.js", [ "ccm.get", "./../cloze/resources/resources.js", "local" ] ]
  },

  "dms": {
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/cloze_builder/resources/default-1.css" ],
    "libs": [ "ccm.load",
      "https://ccmjs.github.io/akless-components/libs/quill-1/quill.snow.css",
      "https://ccmjs.github.io/akless-components/libs/quill-1/quill.min.js",
    ],
    "preview": null,
    "results": { "store": { "name": "cloze_results", "url": "https://ccm2.inf.h-brs.de" }, "permissions": { "access": { "get": "all", "set": "creator", "del": "creator" } } },
    "submit": null
  }

};
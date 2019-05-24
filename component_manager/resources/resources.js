/**
 * @overview data-based resources of ccm component for managing a component
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "html": [ "ccm.get", "../component_manager/resources/resources.js", "html" ],
    "css": [ "ccm.load",
      "../component_manager/resources/default.css",
      "../libs/bootstrap-4/css/bootstrap.min.css",
      { "context": "head", "url": "../libs/bootstrap-4/css/bootstrap.min.css" }
    ],
    "data": {
      "store": [ "ccm.store", { "name": "dms-components", "url": "http://localhost:8080" } ],
      "key": "cloze-6-0-0"
    }
  },

  "demo": {
    "data": {
      "store": [ "ccm.store", { "name": "dms-components", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "cloze-6-0-0"
    }
  },

  "html": {
    "main": {
      "id": "main",
      "inner": [
        {
          "id": "header",
          "inner": [
            {
              "id": "icon",
              "inner": {
                "tag": "img",
                "src": "%icon%"
              }
            },
            {
              "id": "text",
              "inner": [
                {
                  "id": "title",
                  "inner": {
                    "tag": "h2",
                    "class": "text-monospace",
                    "inner": "%title%"
                  }
                },
                {
                  "id": "version",
                  "class": "text-muted",
                  "inner": "Version %version%"
                }
              ]
            }
          ]
        },
        { "id": "menu" }
      ]
    }
  }

};
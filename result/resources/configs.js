/**
 * @overview configurations of ccm component for visualisation of result data
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
    "css": [ "ccm.load",
      "../result/resources/default.css",
      "../libs/bootstrap-4/css/bootstrap.min.css"
    ],
    "app": {
      "comp": [ "ccm.component", "../cloze/ccm.cloze.js" ],
      "configs": [ "ccm.store", "../cloze/resources/configs.js" ],
      "results": [ "ccm.store", { "name": "cloze_results", "url": "wss://ccm2.inf.h-brs.de" } ]
    },
    "menu": [ "ccm.component", "../menu/ccm.menu.js", [ "ccm.get", "../menu/resources/configs.js", "bootstrap" ] ],
    "table": [ "ccm.component", "https://ccmjs.github.io/tkless-components/table/ccm.table.js" ],
    "chart": [ "ccm.component", "../highchart/ccm.highchart.js" ],
    "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/configs.js", "guest" ] ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },

  "demo": {
    "key": "demo",
    "app": {
      "comp": [ "ccm.component", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-5.0.3.js" ],
      "configs": [ "ccm.store", "https://ccmjs.github.io/akless-components/cloze/resources/configs.js" ],
      "results": [ "ccm.store", { "name": "cloze_results", "url": "wss://ccm2.inf.h-brs.de" } ]
    }
  },

};
/**
 * @overview configurations of ccm component for rendering a list of all submitted solutions
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "localhost": {
    "key": "localhost",
    "data": {
      "store": [ "ccm.store", { "url": "http://localhost:8080", "name": "show_solutions" } ],
      "key": {}
    },
    "target": [ "ccm.component", "https://ccmjs.github.io/tkless-components/table/versions/ccm.table-2.1.0.js" ]
  },

  "we_ss18": {
    "key": "ws_ss18",
    "data": {
      "store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "we_ss18_solutions" } ],
      "key": { "_id": { "$regex": ",le02_a1$" } }
    },
    "target": [ "ccm.component", "https://ccmjs.github.io/tkless-components/table/versions/ccm.table-2.1.0.js" ]
  }

};
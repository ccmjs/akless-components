/**
 * @overview configurations of ccm component for Create/Read/Update/Delete a ccm-based app
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "local": {
    "builder": [ "ccm.component", "../cloze_builder/ccm.cloze_builder.js", { "submit_button": false } ],
    "url": "../cloze/ccm.cloze.js",
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },
  "localhost": {
    "store": [ "ccm.store", { "store": "cloze", "url": "http://localhost:8080" } ],
    "builder": [ "ccm.component", "../cloze_builder/ccm.cloze_builder.js", { "submit_button": false } ],
    "url": "../cloze/ccm.cloze.js",
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },
  "cloze": {
    "store": [ "ccm.store", { "store": "cloze", "url": "https://ccm2.inf.h-brs.de" } ]
  },
  "teambuild": {
    "builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/teambuild_builder/versions/ccm.teambuild_builder-3.0.0.js" ],
    "store": [ "ccm.store", { "store": "teambuild", "url": "https://ccm2.inf.h-brs.de" } ],
    "url": "https://ccmjs.github.io/akless-components/teambuild/versions/ccm.teambuild-2.0.0.js"
  },
  "lea_cloze": {
    "store": [ "ccm.store", { "store": "cloze", "url": "https://ccm-data.bib.h-brs.de" } ]
  }
};
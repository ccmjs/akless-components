/**
 * @overview configurations of ccm component for Create/Read/Update/Delete a ccm-based app
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "local": {
    "css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" }
    ],
    "builder": [ "ccm.component", "../cloze_builder/ccm.cloze_builder.js", { "submit_button": false } ],
    "url": "../cloze/ccm.cloze.js",
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },
  "localhost": {
    "css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" }
    ],
    "store": [ "ccm.store", { "store": "cloze", "url": "http://localhost:8080" } ],
    "builder": [ "ccm.component", "../cloze_builder/ccm.cloze_builder.js", { "submit_button": false } ],
    "url": "../cloze/ccm.cloze.js",
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },
  "cloze": {
    "store": [ "ccm.store", { "store": "cloze", "url": "https://ccm2.inf.h-brs.de" } ]
  },
  "teambuild": {
    "builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/teambuild_builder/versions/ccm.teambuild_builder-3.0.0.js", { "submit_button": false } ],
    "store": [ "ccm.store", { "store": "teambuild", "url": "https://ccm2.inf.h-brs.de" } ],
    "url": "https://ccmjs.github.io/akless-components/teambuild/versions/ccm.teambuild-2.0.0.js"
  },
  "pdf_viewer": {
    "builder": [ "ccm.component", "https://ccmjs.github.io/tkless-components/pdf_viewer_builder/versions/ccm.pdf_viewer_builder-2.1.0.js", {
      "html.inner.1.inner.0": "",
      "preview": true
    } ],
    "store": [ "ccm.store", { "store": "pdf_viewer", "url": "https://ccm2.inf.h-brs.de", "method": "POST" } ],
    "url": "https://ccmjs.github.io/tkless-components/pdf_viewer/versions/ccm.pdf_viewer-3.0.0.js"
  },
  "lea_cloze": {
    "builder": [ "ccm.component", "https://ccm-comp.bib.h-brs.de/ccm-components/cloze_builder/versions/ccm.cloze_builder-2.2.0.js", {
      "html.inner.1.inner.2.inner.0.inner.1.inner.1.inner.5": {
        "tag": "h5",
        "inner": "H-BRS LEA"
      },
      "html.inner.1.inner.2.inner.0.inner.1.inner.1.inner.6": {
        "tag": "p",
        "inner": "Authentication with a valid account from the LEA platform at Hochschule Bonn-Rhein-Sieg University of Applied Sciences."
      },
      "html.inner.1.inner.2.inner.0.inner.2.inner.3": {
        "tag": "option",
        "inner": "H-BRS LEA",
        "value": "['ccm.instance','https://ccm-comp.bib.h-brs.de/ccm-components/user/versions/ccm.user-7.0.0.js',{'realm':'LEA'}]"
      },
      "defaults.user": "['ccm.instance','https://ccm-comp.bib.h-brs.de/ccm-components/user/versions/ccm.user-7.0.0.js',{'realm':'LEA'}]",
      "defaults.css": "['ccm.load','https://ccm-comp.bib.h-brs.de/ccm-components/cloze/resources/lea.css']",
      "submit_button": false
    } ],
    "store": [ "ccm.store", { "store": "cloze", "url": "https://ccm2.inf.h-brs.de" } ]
  },
  "lea_teambuild": {
    "builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/teambuild_builder/versions/ccm.teambuild_builder-3.0.0.js", {
      "html.inner.1.inner.2.inner.2.inner.1.inner.1.inner.5": {
        "tag": "h5",
        "inner": "H-BRS LEA"
      },
      "html.inner.1.inner.2.inner.2.inner.1.inner.1.inner.6": {
        "tag": "p",
        "inner": "Authentication with a valid account from the LEA platform at Hochschule Bonn-Rhein-Sieg University of Applied Sciences."
      },
      "html.inner.1.inner.2.inner.2.inner.2.inner.3": {
        "tag": "option",
        "inner": "H-BRS LEA",
        "value": "['ccm.instance','https://ccm-comp.bib.h-brs.de/ccm-components/user/versions/ccm.user-7.0.0.js',{'realm':'LEA'}]"
      },
      "defaults.user": "['ccm.instance','https://ccm-comp.bib.h-brs.de/ccm-components/user/versions/ccm.user-7.0.0.js',{'realm':'LEA'}]",
      "submit_button": false
    } ],
    "store": [ "ccm.store", { "store": "teambuild", "url": "https://ccm2.inf.h-brs.de" } ],
    "url": "https://ccmjs.github.io/akless-components/teambuild/versions/ccm.teambuild-2.0.0.js"
  }
};
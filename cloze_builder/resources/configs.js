/**
 * @overview configurations of ccm component for building a fill-in-the-blank text
 * @author André Kless <andre.kless@web.de> 2017-2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "css.3": "../cloze_builder/resources/default.css",
    "data": {
      "store": [ "ccm.store", "../cloze_builder/resources/datasets.js" ],
      "key": "test"
    },
    "target": [ "ccm.component", "../cloze/ccm.cloze.js" ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onfinish": { "log": true }
  },

  "localhost": {
    "css.3": "../cloze_builder/resources/default.css",
    "data": {
      "store": [ "ccm.store", { "store": "cloze", "url": "http://localhost:8080" } ],
      "key": "test"
    },
    "target": [ "ccm.component", "../cloze/ccm.cloze.js" ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onfinish": {
      "log": true,
      "store": {
        "settings": { "store": "cloze", "url": "http://localhost:8080" },
        "key": "test"
      },
      "alert": "Saved!"
    }
  },

  "demo": {
    "data": {
      "store": [ "ccm.store", { "store": "cloze", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "submit_button": "Submit",
    "onfinish": {
      "store": {
        "settings": { "store": "cloze", "url": "https://ccm2.inf.h-brs.de" },
        "key": "demo"
      },
      "alert": "Saved!"
    }
  },

  "lea": {
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
      "value": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.0.js',{'realm':'LEA'}]"
    },
    "data": {
      "store": [ "ccm.store", { "store": "cloze", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "defaults.user": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.0.js',{'realm':'LEA'}]",
    "defaults.css": "['ccm.load','https://ccmjs.github.io/akless-components/cloze/resources/lea.css','https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css',{'context':'head','url':'https://fonts.googleapis.com/css?family=Montserrat:200'}]",
    "submit_button": "Submit",
    "onfinish": {
      "store": {
        "settings": { "store": "cloze", "url": "https://ccm2.inf.h-brs.de" },
        "key": "demo"
      },
      "alert": "Saved!"
    }
  }

};
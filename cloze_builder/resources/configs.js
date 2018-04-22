/**
 * @overview configurations of ccm component for rendering a fill-in-the-blank text
 * @author André Kless <andre.kless@web.de> 2017-2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "local": {
    "css": [ "ccm.load",
      "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
      "../cloze_builder/resources/default.css"
    ],
    "target": [ "ccm.component", "../cloze/ccm.cloze.js" ],
    "submit_button": true,
    "onfinish": { "log": true }
  },
  "demo": {
    "css": [ "ccm.load",
      "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
      "https://ccmjs.github.io/akless-components/cloze_builder/resources/default.css"
    ],
    "target": [ "ccm.component", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-4.0.0.js" ],
    "submit_button": true,
    "onfinish": { "log": true }
  },
  "lea": {
    "html.inner.1.inner.2.inner.0.inner.0.inner.2.inner.7": {
      "tag": "h5",
      "inner": "H-BRS LEA"
    },
    "html.inner.1.inner.2.inner.0.inner.0.inner.2.inner.8": {
      "tag": "p",
      "inner": "Authentication with a valid account from the LEA platform at Hochschule Bonn-Rhein-Sieg University of Applied Sciences."
    },
    "html.inner.1.inner.2.inner.0.inner.1.inner.4": {
      "tag": "option",
      "inner": "H-BRS LEA",
      "value": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-4.0.1.min.js',{'realm':'LEA'}]"
    },
    "defaults.user": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-4.0.1.min.js',{'realm':'LEA'}]",
    "defaults.css": "['ccm.load','https://ccmjs.github.io/akless-components/cloze/resources/lea.css','https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css',{'context':'head','url':'https://fonts.googleapis.com/css?family=Montserrat:200'}]",
    "css": [ "ccm.load",
      "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
      "https://ccmjs.github.io/akless-components/cloze_builder/resources/default.css"
    ],
    "target": [ "ccm.component", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-4.0.0.js" ],
    "submit_button": true,
    "onfinish": { "log": true }
  }
};
/**
 * @overview configurations of ccm component for user authentication
 * @author André Kless <andre.kless@web.de> 2017-2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "local": {
    "realm": "guest",
    "css": [ "ccm.load", "../user/resources/default.css" ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },
  "demo": {
    "realm": "demo",
    "css": [ "ccm.load",
      "https://ccmjs.github.io/akless-components/user/resources/bootstrap.css",
      "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" }
    ]
  },
  "lea": {
    "realm": "LEA",
    "css": [ "ccm.load",
      "https://ccmjs.github.io/akless-components/user/resources/tea.css",
      "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" }
    ]
  }
};
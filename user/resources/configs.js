/**
 * @overview configurations of ccm component for user authentication
 * @author André Kless <andre.kless@web.de> 2017-2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "local": {
    "css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
      "../user/resources/default.css"
    ],
    "realm": "guest",
    "title": "Guest Mode: Please enter any username",
    "no_password": true,
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },
  "localhost": {
    "css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
      "../user/resources/default.css"
    ],
    "realm": "demo",
    "url": "http://localhost:8080",
    "title": "Demo Mode: Please enter any username",
    "no_password": true,
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },
  "guest": {
    "realm": "guest",
    "title": "Guest Mode: Please enter any username",
    "no_password": true
  },
  "pseudo": {
    "realm": "guest",
    "guest": true,
    "title": "Guest Mode: Please enter any username",
    "no_password": true
  },
  "demo": {
    "realm": "demo",
    "url": "https://ccm2.inf.h-brs.de",
    "title": "Demo Mode: Please enter any username",
    "no_password": true
  },
  "cloud": {
    "realm": "cloud",
    "url": "https://ccm2.inf.h-brs.de"
  },
  "hbrsinfkaul": {
    "realm": "hbrsinfkaul"
  },
  "lea": {
    "realm": "LEA",
    "title": "Please enter your LEA username and password"
  }
};
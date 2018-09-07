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
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },
  "guest": {
    "realm": "guest",
    "title": "Guest Mode: Please enter any username"
  },
  "pseudo": {
    "realm": "guest",
    "guest": true
  },
  "cloud": {
    "realm": "cloud",
    "url": "https://ccm2.inf.h-brs.de"
  },
  "hbrsinfkaul": {
    "realm": "hbrsinfkaul"
  },
  "hbrsinfpseudo": {
    "realm": "hbrsinfpseudo"
  }
};
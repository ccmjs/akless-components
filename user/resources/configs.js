/**
 * @overview configurations of ccm component for user authentication
 * @author André Kless <andre.kless@web.de> 2017-2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
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
    "key": "guest",
    "realm": "guest",
    "title": "Guest Mode: Please enter any username"
  },

  "pseudo": {
    "key": "pseudo",
    "realm": "guest",
    "guest": true
  },

  "cloud": {
    "key": "cloud",
    "realm": "cloud",
    "url": "https://ccm2.inf.h-brs.de",
    "title": "Please enter username and password",
    "hash": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/md5.js", "type": "module" } ]
  },

  "hbrsinfkaul": {
    "key": "hbrsinfkaul",
    "realm": "hbrsinfkaul"
  },

  "hbrsinfpseudo": {
    "key": "hbrsinfpseudo",
    "realm": "hbrsinfpseudo"
  }

};
/**
 *----------------------------------------------------- DEPRECATED -----------------------------------------------------
 *
 * @overview configurations of ccmjs-based web component for user authentication
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
    "hash": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/md5.mjs", "type": "module" } ]
  },

  "idento": {
    "key": "idento",
    "realm": "idento",
    "url": "https://dev.idento.one",
    "title": "[idento.one] Please enter your email and password:",
    "html.login.inner.0.inner.inner.1.inner.0.inner.0.inner.1.placeholder": "email"
//  "hash": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/md5.mjs", "type": "module" } ],
//  "jquery": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/jquery/jquery-3.1.1.min.js" ]
  },

  "hbrsinfkaul": {
    "key": "hbrsinfkaul",
    "realm": "hbrsinfkaul"
  },

  "hbrsinfpseudo": {
    "key": "hbrsinfpseudo",
    "realm": "hbrsinfpseudo"
  },

  "lea": {
    "key": "lea",
    "realm": "lea"
  },

  "compact": {
    "key": "button",
    "realm": "guest",
    "title": "Guest Mode: Please enter any username",
    "html.logged_in": {
      "id": "logged_in",
      "class": "row",
      "style": "float:none",
      "inner": {
        "id": "button",
        "class": "btn btn-default",
        "inner": [
          {
            "tag": "span",
            "id": "user",
            "inner": [
              { "class": "glyphicon glyphicon-user" },
              "%user%&#8196;"
            ]
          },
          {
            "tag": "span",
            "class": "glyphicon glyphicon-log-out",
          },
          "Logout"
        ],
        "onclick": "%click%"
      }
    },
    "html.logged_out": {
      "id": "logged_out",
      "style": "float:none",
      "inner": {
        "id": "button",
        "class": "btn btn-default",
        "inner": [
          {
            "tag": "span",
            "class": "glyphicon glyphicon-log-in"
          },
          "Login"
        ],
        "onclick": "%click%"
      }
    }
  }

};
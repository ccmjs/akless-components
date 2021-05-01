/**
 * @overview data-based resources of ccmjs-based web component for multiply table training
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "css": [ "ccm.load",
      [  // serial
        "./../libs/bootstrap-4/css/bootstrap.min.css",
        "./../multiply_table_trainer/resources/styles.css"
      ]
    ],
//  "css.1": "./../multiply_table_trainer/resources/styles.css",
    "html.1": "./../multiply_table_trainer/resources/templates.mjs",
    "onfinish": {
      "log": true,
      /*
      "confirm": "Fertig! Soll dein Ergebnis gespeichert werden?",
      "login": true,
      "store": {
        "settings": { "name": "multiply_table_trainer-results", "url": "https://ccm2.inf.h-brs.de" },
        "key": "test",
        "user": true,
        "unique": true,
        "permissions": {
          "access": {
            "get": "all",
            "set": "creator",
            "del": "creator"
          }
        }
      },
      "restart": true
      */
    },
    "timer": 3,
    "feedback": 1,
    "user": [ "ccm.instance", "./../user/ccm.user.js", [ "ccm.get", "./../user/resources/resources.js", "local" ] ]
  },

  "demo": {}

};
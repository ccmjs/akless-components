/**
 * @overview data-based resources of ccmjs-based web component for ER model training
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "css": [ "ccm.load",
      [  // serial
        "./../libs/bootstrap-4/css/bootstrap.min.css",
        "./../er_trainer/resources/default.css"
      ]
    ],
    "data": {
      "store": [ "ccm.store", { "name": "er_trainer-data", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "test",
      "login": true,
      "user": true
    },
    "helper.1": "./../modules/helper.mjs",
    "html.1": "./../er_trainer/resources/templates.mjs",
    "onfinish": { "restart": true, store: true, alert: 'Saved!' },
    "text.finish": "Speichern und Neustart",
    "user": [ "ccm.instance", "./../user/ccm.user.js", [ "ccm.get", "./../user/resources/resources.js", "guest" ] ]
  },

  "demo": {}

};
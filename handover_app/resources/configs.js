/**
 * @overview configurations of ccm component for app manager
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "css": [ "ccm.load",
      "../handover_app/resources/styles.css",
      "../libs/bootstrap-4/css/bootstrap.min.css",
      { "context": "head", "url": "../libs/bootstrap-4/css/bootstrap.min.css" }
    ],
    "data": {
      "store": [ "ccm.store", { "url": "http://localhost:8080", "name": "test-configs" } ],
      "key": "1562399748746X5684041698054954"
    },
    "helper.1": "../modules/helper.mjs",
    "html.1": "../handover_app/resources/template.html",
    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
    "qr_code": [ "ccm.load", "../libs/qrcode-generator/qrcode.min.js" ],
    "url": "../json_builder/ccm.json_builder.js",
    "window": [ "ccm.component", "../window/ccm.window.js" ]
  },

  "demo": {
    "data": {
      "store": [ "ccm.store", { "url": "http://localhost:8080", "name": "test-configs" } ],
      "key": "1562399748746X5684041698054954"
    },
    "qr_code": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/qrcode-generator/qrcode.min.js" ],
    "url": "https://ccmjs.github.io/akless-components/json_builder/ccm.json_builder.js",
    "window": [ "ccm.component", "https://ccmjs.github.io/akless-components/window/ccm.window.js" ]
  }

};
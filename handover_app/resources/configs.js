/**
 *----------------------------------------------------- DEPRECATED -----------------------------------------------------
 *
 * @overview configurations of ccm component for app manager
 * @author André Kless <andre.kless@web.de> 2019-2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "component_url": "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-6.0.3.js",
    "css": [ "ccm.load",
      "../handover_app/resources/styles.css",
      "../libs/bootstrap-4/css/bootstrap.min.css",
      { "context": "head", "url": "../libs/bootstrap-4/css/bootstrap.min.css" }
    ],
    "data": { "store": "https://ccmjs.github.io/akless-components/cloze/resources/configs.js", "key": "demo" },
    "helper.1": "../modules/helper.mjs",
    "html.1": "../handover_app/resources/template.html",
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "qr_code": [ "ccm.load", "../libs/qrcode-generator/qrcode.min.js" ],
//  "window": [ "ccm.component", "../window/ccm.window.js" ]
  },

  "demo": {
    "component_url": "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-6.0.3.js",
    "data": { "store": "https://ccmjs.github.io/akless-components/cloze/resources/configs.js", "key": "demo" },
    "qr_code": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/qrcode-generator/qrcode.min.js" ],
//  "window": [ "ccm.component", "https://ccmjs.github.io/akless-components/window/versions/ccm.window-1.0.0.js" ]
  }

};
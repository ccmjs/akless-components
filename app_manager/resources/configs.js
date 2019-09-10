/**
 * @overview configurations of ccm component for app manager
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "app_details": [ "ccm.component", "../content/ccm.content.js", [ "ccm.get", "../content/resources/configs.js", "app_meta" ] ],
    "css.1": "../app_manager/resources/styles.css",
    "data": {
      "store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "dms-apps" } ],
      "key": "1562615085075X31075165857521436"
    },
    "default_icon": "../dms/resources/img/default.png",
    "form": [ "ccm.component", "../submit/ccm.submit.js", [ "ccm.get", "../submit/resources/configs.js", "app_meta" ] ],
    "handover_app": [ "ccm.component", "../handover_app/ccm.handover_app.js", {
      "css": [ "ccm.load",
        "../handover_app/resources/styles.css",
        "../libs/bootstrap-4/css/bootstrap.min.css",
        { "context": "head", "url": "../libs/bootstrap-4/css/bootstrap.min.css" }
      ],
      "helper.1": "../modules/helper.mjs",
      "html.1": "../handover_app/resources/template.html",
      "qr_code": [ "ccm.load", "../libs/qrcode-generator/qrcode.min.js" ],
      "window": [ "ccm.component", "../window/ccm.window.js" ]
    } ],
    "helper": [ "ccm.load", "../modules/helper.mjs" ],
    "html.1": "../app_manager/resources/templates.html",
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "user": [ "ccm.start", "../user/ccm.user.js", [ "ccm.get", "../user/resources/configs.js", "guest" ] ]
  },

  "demo": {
    "data": {
      "store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "dms-apps" } ],
      "key": "1562615085075X31075165857521436"
    },
    "handover_app": [ "ccm.component", "https://ccmjs.github.io/akless-components/handover_app/versions/ccm.handover_app-1.0.0.js", {
      "qr_code": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/qrcode-generator/qrcode.min.js" ],
      "window": [ "ccm.component", "https://ccmjs.github.io/akless-components/window/versions/ccm.window-1.0.0.js" ]
    } ],
    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]
  }

};
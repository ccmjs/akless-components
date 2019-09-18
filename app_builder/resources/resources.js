/**
 * @overview data-based resources of ccm component for app creation
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  /** test configuration (relative paths) */
  "local": {
    "app": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.4.1.js" ],
    "builder.1": "../json_builder/ccm.json_builder.js",
    "css": [ "ccm.load",
      "../app_builder/resources/styles.css",
      "../libs/bootstrap-4/css/bootstrap.min.css",
      { "context": "head", "url": "../libs/bootstrap-4/css/bootstrap.min.css" }
    ],
    "data": {
      "store": [ "ccm.store", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" } ]
    },
    "form": [ "ccm.component", "../submit/ccm.submit.js", [ "ccm.get", "../submit/resources/configs.js", "app_meta_create" ] ],
    "handover_app": [ "ccm.component", "../handover_app/ccm.handover_app.js", {
      "qr_code": [ "ccm.load", "../libs/qrcode-generator/qrcode.min.js" ],
      "window": [ "ccm.component", "../window/ccm.window.js" ]
    } ],
    "html.1": "../app_builder/resources/templates.html",
    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js", [ "ccm.get", "../app_builder/resources/resources.js", "lang" ] ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "meta_store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "dms-apps" } ],
    "modal_dialog": [ "ccm.component", "https://ccmjs.github.io/tkless-components/modal/versions/ccm.modal-2.0.0.js", {
      "css": [ "ccm.load",
        "https://use.fontawesome.com/releases/v5.6.3/css/all.css",
        { "context": "head", "url": "https://use.fontawesome.com/releases/v5.6.3/css/all.css" }
      ]
    } ],
    "onchange": ( instance, event ) => { console.log( event, instance.getValue() ); },
    "user": [ "ccm.start", "../user/ccm.user.js", [ "ccm.get", "../app_builder/resources/resources.js", "user" ] ]
  },

  /** live configuration (used by Digital Makerspace) */
  "live": {
    "app": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.4.1.js" ],
    "data": {
      "store": [ "ccm.store", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" } ]
    },
    "form": [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.5.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/submit/resources/configs.js", "app_meta_create" ] ],
    "handover_app": [ "ccm.component", "https://ccmjs.github.io/akless-components/handover_app/versions/ccm.handover_app-1.0.0.js", {
      "qr_code": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/qrcode-generator/qrcode.min.js" ],
      "window": [ "ccm.component", "https://ccmjs.github.io/akless-components/window/versions/ccm.window-1.0.0.js" ]
    } ],
    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/app_builder/resources/resources.js", "lang" ] ],
    "meta_store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "dms-apps" } ],
    "modal_dialog": [ "ccm.component", "https://ccmjs.github.io/tkless-components/modal/versions/ccm.modal-2.0.0.js", {
      "css": [ "ccm.load",
        "https://use.fontawesome.com/releases/v5.6.3/css/all.css",
        { "context": "head", "url": "https://use.fontawesome.com/releases/v5.6.3/css/all.css" }
      ]
    } ],
    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/app_builder/resources/resources.js", "user" ] ]
  },

  /** configuration for multilingualism */
  "lang": {
    "translations": {
      "de": {
        "flag": "https://ccmjs.github.io/tkless-components/lang/resources/de.svg"
      },
      "en": {
        "flag": "https://ccmjs.github.io/tkless-components/lang/resources/en.svg"
      }
    },
    "active": "en"
  },

  /** configuration for user authentication */
  "user": {
    "hash": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/md5.mjs", "type": "module" } ],
    "realm": "cloud",
    "store": "dms-user",
    "url": "https://ccm2.inf.h-brs.de"
  }

};

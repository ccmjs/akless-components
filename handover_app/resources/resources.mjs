/**
 * @overview data-based resources of ccmjs-based web component for an app handover
 * @author André Kless <andre.kless@web.de> 2022
 * @license The MIT License (MIT)
 */

/**
 * english texts and labels for a digital makerspace
 * @type {Object}
 */
export const en = {
  "bookmarklet": "Bookmarklet",
  "copy": "Copy",
  "embed": "Embed Code",
  "html": "HTML File",
  "ibook": "iBook Widget",
  "scorm": "SCORM",
  "url": "App URL"
};

/**
 * german texts and labels for a digital makerspace
 * @type {Object}
 */
export const de = {
  "bookmarklet": "Bookmarklet",
  "copy": "Kopieren",
  "embed": "Einbettungscode",
  "html": "HTML-Datei",
  "ibook": "iBook-Widget",
  "scorm": "SCORM",
  "url": "App-URL"
};

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "css": [ "ccm.load",
    [  // serial
      "./../libs/bootstrap-5/css/bootstrap.css",
      "./../handover_app/resources/styles.css"
    ],
    "./../libs/bootstrap-5/css/bootstrap-icons.css",
    { "url": "./../libs/bootstrap-5/css/bootstrap-fonts.css", "context": "head" }
  ],
  "helper.1": "./../modules/helper.mjs",
  "html.1": "./../handover_app/resources/templates.mjs",
  "ignore.config": [ "ccm.load", "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/resources.mjs#demo" ],
  "lang": [ "ccm.start", "./../lang/ccm.lang.js", {
    "active": "en",
    "translations": { "de": de, "en": en }
  } ],
  "logger": [ "ccm.instance", "./../log/ccm.log.js", [ "ccm.get", "./../log/resources/configs.js", "greedy" ] ],
  "qr_code": [ "ccm.load", "./../libs/qrcode-generator/qrcode.js" ],
  "text": en,
  "tool": "https://ccmjs.github.io/tkless-components/qa_slidecast/ccm.qa_slidecast.js",
  "url": "http://localhost:63342/akless-components/handover_app/resources/app.html",
  "window": [ "ccm.component", "https://ccmjs.github.io/akless-components/window/ccm.window.js", [ "ccm.load", "https://ccmjs.github.io/akless-components/window/resources/resources.mjs#test" ] ]
};

/**
 * demo configuration
 * @type {Object}
 */
export const demo = {
  "ignore.config": [ "ccm.load", "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/resources.mjs#demo" ],
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.0.0.min.js", {
    "active": "de",
    "translations": { "de": de, "en": en }
  } ],
  "qr_code": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/qrcode-generator/qrcode.min.js" ],
  "text": de,
  "tool": "https://ccmjs.github.io/tkless-components/qa_slidecast/versions/ccm.qa_slidecast-2.0.0.min.js",
  "window": [ "ccm.component", "https://ccmjs.github.io/akless-components/window/versions/ccm.window-2.0.0.min.js", [ "ccm.load", "https://ccmjs.github.io/akless-components/window/resources/resources.mjs#demo" ] ]
};

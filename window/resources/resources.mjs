/**
 * @overview data-based resources of ccmjs-based web component for a flying app window
 * @author André Kless <andre.kless@web.de> 2022
 * @license The MIT License (MIT)
 */

/**
 * english texts and labels for a digital makerspace
 * @type {Object}
 */
const en = {
  "tooltip_close": "Closes the app window."
};

/**
 * german texts and labels for a digital makerspace
 * @type {Object}
 */
const de = {
  "tooltip_close": "Schließt das App-Fenster."
};

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "app": [ "ccm.start", "https://ccmjs.github.io/tkless-components/qa_slidecast/ccm.qa_slidecast.js", [ "ccm.load", "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/resources.mjs#demo" ] ],
  "css": [ "ccm.load",
    [  // serial
      "./../libs/bootstrap-5/css/bootstrap.css",
      "./../window/resources/styles.css"
    ],
    "./../libs/bootstrap-5/css/bootstrap-icons.css",
    { "url": "./../libs/bootstrap-5/css/bootstrap-fonts.css", "context": "head" }
  ],
  "helper.1": "./../modules/helper.mjs",
  "html.1": "./../window/resources/templates.mjs",
  "lang": [ "ccm.start", "./../lang/ccm.lang.js", {
    "active": "en",
    "translations": { "de": de, "en": en }
  } ],
  "libs.1": "./../libs/moveable/moveable.js",
  "text": en
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.0.0.min.js", {
    "active": "de",
    "translations": { "de": de, "en": en }
  } ],
  "text": de
};

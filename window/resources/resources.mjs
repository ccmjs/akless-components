/**
 * @overview data-based resources of ccmjs-based web component for a flying app window
 * @author André Kless <andre.kless@web.de> 2022
 * @license The MIT License (MIT)
 */

/**
 * english texts and labels for a digital makerspace
 * @type {Object}
 */
export const en = {
  "bookmarklet": "App",
  "title": "App",
  "tooltip_bookmarklet": "This is a bookmarklet that you can use to open this app window on other websites as well. To do this, drag this icon into your bookmarks bar and use it on other websites.",
  "tooltip_close": "Closes the app window."
};

/**
 * german texts and labels for a digital makerspace
 * @type {Object}
 */
export const de = {
  "bookmarklet": "App",
  "title": "App",
  "tooltip_bookmarklet": "Dies ist ein Bookmarklet, mit dem du dieses App-Fenster auch in anderen Webseiten öffnen kannst. Ziehe dazu dieses Symbol in deine Lesezeichenleiste und nutze es auf anderen Webseiten.",
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
  "app": [ "ccm.start", "https://ccmjs.github.io/tkless-components/qa_slidecast/ccm.qa_slidecast.js", [ "ccm.load", "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/resources.mjs#demo" ] ],
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.0.0.min.js", {
    "active": "de",
    "translations": { "de": de, "en": en }
  } ],
  "text": de
};

/**
 * live configuration (absolute paths)
 * @type {Object}
 */
export const live = {
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.0.0.min.js", {
    "translations": {
      "de": [ "ccm.load", "https://ccmjs.github.io/akless-components/window/resources/resources.mjs#de" ],
      "en": [ "ccm.load", "https://ccmjs.github.io/akless-components/window/resources/resources.mjs#en" ]
    }
  } ],
  "text": {}
};

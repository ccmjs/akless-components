/**
 * @overview data-based resources of ccmjs-based web component for vocabulary
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "css": [ "ccm.load",
    [  // serial
      "./../libs/bootstrap-5/css/bootstrap.css",
      "./../vocabulary/resources/styles.css"
    ],
    "./../libs/bootstrap-5/css/bootstrap-icons.css",
    { "url": "./../libs/bootstrap-5/css/bootstrap-fonts.css", "context": "head" }
  ],
  "data": {
    "store": [ "ccm.store", {
      "foo": {
        "languages": [ "Deutsch", "Englisch" ],
        "translations": [
          [ "Haus", "House" ],
          [ "Apfel", "Apple" ],
          [ "Schule", "School" ]
        ]
      }
    } ],
    "key": "foo"
  },
  "helper.1": "./../modules/helper.mjs",
  "html.1": "./../vocabulary/resources/templates.mjs",
  "libs.1": "./../libs/bootstrap-5/js/bootstrap.bundle.min.js"
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {

};
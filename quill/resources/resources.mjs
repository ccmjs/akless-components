/**
 * @overview data-based resources of ccmjs-based web component for quill
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "css": [ "ccm.load", [
    "./../libs/quill-1/quill.snow.css",
    "./../quill/resources/styles.css"
  ] ],
  "helper.1": "./../modules/helper.mjs",
  "libs": [ "ccm.load", "./../libs/quill-1/quill.js" ],
  "onchange": instance => console.log( instance.getValue() ),
  "options": {
    "placeholder": "Please enter here...",
    "theme": "snow"
  }
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "options": {
    "placeholder": "Bitte hier eingeben...",
    "theme": "snow"
  }
};
/**
 * @overview data-based resources of ccmjs-based web component for selectize
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "create": true,
  "create_on_blur": true,
  "css": [ "ccm.load", [
    "./../libs/selectize-0/selectize.css",
    "./../selectize/resources/styles.css"
  ] ],
  "items": [ "Apple" ],
  "libs": [ "ccm.load", [
    "./../libs/jquery-3/jquery.js",
    "./../libs/selectize-0/selectize.min.js",
    [
      "./../libs/selectize-0/remove_button-plugin.js",
      [
        "./../libs/jquery-ui-1/jquery-ui-sortable.js",
        "./../libs/selectize-0/drag_drop-plugin.js"
      ]
    ]
  ] ],
  "onchange": items => console.log( items ),
  "options": [ "Apple", "Orange", "Banana" ],
  "placeholder": "Please enter here...",
  "plugins": [ "drag_drop", "remove_button" ]
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "create": true,
  "create_on_blur": true,
  "items": [ "Apfel" ],
  "onchange": items => console.log( items ),
  "options": [ "Apfel", "Orange", "Banane" ],
  "placeholder": "Bitte hier eingeben...",
  "plugins": [ "drag_drop", "remove_button" ]
};
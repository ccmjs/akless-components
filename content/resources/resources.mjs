/**
 * @overview data-based resources of ccmjs-based web component for predefined content
 * @author André Kless <andre.kless@web.de> 2021-2022
 * @license The MIT License (MIT)
 */

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "blank": [ "ccm.component", "./../blank/ccm.blank.js" ],
  "css": [ "ccm.load", "./../content/resources/styles.css" ],
  "helper.1": "./../modules/helper.mjs",
  "inner": "<ccm-blank></ccm-blank>"
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "blank": [ "ccm.component", "https://ccmjs.github.io/akless-components/blank/ccm.blank.min.js" ],
  "inner": "<ccm-blank></ccm-blank>"
};

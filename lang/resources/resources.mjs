/**
 * @overview data-based resources of ccmjs-based web component for multilingualism
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "active": "en",
  "css.1": "./../lang/resources/styles.css",
  "helper.1": "./../modules/helper.mjs",
  "html.1": "./../lang/resources/templates.mjs",
  "onchange": lang => console.log( lang )
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "active": "de"
};

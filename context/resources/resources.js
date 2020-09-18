/**
 * @overview data-based resources of ccm component for visualization of a ccm context
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  /** test configuration (relative paths) */
  "local": {
    "css.1": "./resources/styles.css",
    "helper.1": "./../modules/helper.mjs",
    "html.1": "./resources/templates.mjs",
    "instance": [ "ccm.start", "./../blank_blank/ccm.blank_blank.js", {
      "instance_a": [ "ccm.start", "./../blank_blank/ccm.blank_blank.js", {
        "instance_a": [ "ccm.start", "./../blank/ccm.blank.js" ],
        "instance_b": [ "ccm.start", "./../blank/ccm.blank.js" ]
      } ],
      "instance_b": [ "ccm.start", "./../blank_blank/ccm.blank_blank.js", {
        "instance_a": [ "ccm.start", "./../blank/ccm.blank.js" ],
        "instance_b": [ "ccm.start", "./../blank/ccm.blank.js" ]
      } ],
    } ]
  },

  /** demo configuration (absolute paths) */
  "demo": {
    "instance.2": {
      "instance_a": [ "ccm.start", "https://ccmjs.github.io/akless-components/blank_blank/ccm.blank_blank.js" ],
      "instance_b": [ "ccm.start", "https://ccmjs.github.io/akless-components/blank_blank/ccm.blank_blank.js" ]
    }
  }

};

/**
 * @overview data-based resources of ccmjs-based web component for visualization of a ccm context
 * @author André Kless <andre.kless@web.de> 2020-2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  /** test configuration (relative paths) */
  "local": {
    "css.1": "./../context/resources/styles.css",
    "helper.1": "./../modules/helper.mjs",
    "html.1": "./../context/resources/templates.mjs",
    "instance": [ "ccm.start", "./../blank_blank/ccm.blank_blank.min.js", {
      "instance_a": [ "ccm.start", "./../blank_blank/ccm.blank_blank.min.js", {
        "instance_a": [ "ccm.start", "./../blank/ccm.blank.min.js" ],
        "instance_b": [ "ccm.start", "./../blank/ccm.blank.min.js" ]
      } ],
      "instance_b": [ "ccm.start", "./../blank_blank/ccm.blank_blank.min.js", {
        "instance_a": [ "ccm.start", "./../blank/ccm.blank.min.js" ],
        "instance_b": [ "ccm.start", "./../blank/ccm.blank.min.js" ]
      } ]
    } ]
  },

  /** demo configuration (absolute paths) */
  "demo": {
    "instance.2": {
      "instance_a": [ "ccm.start", "https://ccmjs.github.io/akless-components/blank_blank/ccm.blank_blank.min.js" ],
      "instance_b": [ "ccm.start", "https://ccmjs.github.io/akless-components/blank_blank/ccm.blank_blank.min.js" ]
    }
  }

};

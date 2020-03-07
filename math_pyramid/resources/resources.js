/**
 * @overview static data-based resources of ccm component for math pyramids
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  /** test configuration (relative paths) */
  "local": {
    "css.1": "../math_pyramid/resources/styles.css",
    "helper.1": "../modules/helper.mjs",
    "html.1": "../math_pyramid/resources/templates.html",
//  "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "max": 150,
    "min": 100,
//  "numbers": [ 28, 53, 4, 17, 36 ],
//  "oncancel": instance => console.log( instance ),
//  "onchange": event => console.log( event ),
    "onfinish": { "log": true, "restart": true },
    "operation": "+",
    "retry": true,
    "size": 6,
    "solutions": false,
//  "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/configs.js", "guest" ] ]
  },

  /** demo configuration (absolute paths) */
  "demo": {
    "numbers": [ 28, 53, 4, 17, 36 ],
    "operation": "+",
//  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]
  }

};
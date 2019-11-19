/**
 * @overview static data-based resources of ccm component template
 * @author André Kless <andre.kless@web.de> 2018-2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "key": "local",
    "css.1": "../template/resources/styles.css",
    "html.1": "../template/resources/templates.html",
    "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/configs.js", "local" ] ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onfinish": { "log": true, "login": true }
  },

  "demo": {
    "key": "demo",
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
    "onfinish": { "log": true, "login": true }
  }

};
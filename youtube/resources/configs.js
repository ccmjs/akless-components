/**
 * @overview configurations of ccm component for rendering a YouTube Player
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "local": {
    "css": [ "ccm.load", "../youtube/resources/default.css" ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onfinish": { "restart": true }
  },
  "demo": {
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/youtube/resources/default.css" ],
    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-2.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
    "onfinish": { "restart": true }
  },
  "se_ws17": {
    "video": "LV8StucDmC4",
    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-2.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "se_ws17_youtube" ] ],
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-2.0.1.js", { "sign_on": "hbrsinfkaul", "logged_in": true } ],
    "onfinish": { "restart": true }
  }
};
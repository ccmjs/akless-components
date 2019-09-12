/**
 * @overview configurations of ccm component for rendering a predefined content
 * @author André Kless <andre.kless@web.de> 2017-2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  /** local test and remote demo */
  "local": {
    "inner": "<source src=../blank/ccm.blank.js>Welcome.<ccm-blank></ccm-blank>Good day."
  },
  "demo": {
    "inner": "<source src=https://ccmjs.github.io/akless-components/blank/ccm.blank.js>Welcome.<ccm-blank></ccm-blank> Good day."
  },

  /** visualisation of app metadata */
  "app_meta": {
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/content/resources/css/meta.css" ],
    "inner": [ "ccm.load", "https://ccmjs.github.io/akless-components/content/resources/html/app_meta.html" ]
  },
  "app_meta_test": {
    "css": [ "ccm.load", "../content/resources/css/meta.css" ],
    "inner": [ "ccm.load", "../content/resources/html/app_meta.html" ],
    "json2json": json => {
      if ( !json.category ) json.category = '';
      if ( json.language ) json.language = json.language.filter( Boolean ).join( ', ' ).toUpperCase();
      json.tags = json.tags.join( ', ' );
      json.component = ccm.helper.getIndex( json.path );
      return json;
    },
    "placeholder": [ "ccm.get", { "url": "https://ccm2.inf.h-brs.de", "name": "dms-apps" }, "1562615085075X31075165857521436" ]
  },

  /** visualisation of component metadata */
  "component_meta": {
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/content/resources/css/meta.css" ],
    "inner": [ "ccm.load", "https://ccmjs.github.io/akless-components/content/resources/html/component_meta.html" ]
  },
  "component_meta_test": {
    "css": [ "ccm.load", "../content/resources/css/meta.css" ],
    "inner": [ "ccm.load", "../content/resources/html/component_meta.html" ],
    "json2json": json => {
      if ( !json.category ) json.category = '';
      json.tags = json.tags.join( ', ' );
      return json;
    },
    "placeholder": [ "ccm.get", { "url": "https://ccm2.inf.h-brs.de", "name": "dms-components" }, "quiz-4-0-0" ]
  }

};
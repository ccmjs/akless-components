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
    "inner": [ "ccm.load", "https://ccmjs.github.io/akless-components/content/resources/html/app_meta.html" ],
    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/content/resources/configs.js", "lang" ] ]
  },
  "app_meta_test": {
    "css": [ "ccm.load", "../content/resources/css/meta.css" ],
    "inner": [ "ccm.load", "../content/resources/html/app_meta.html" ],
    "json2json": json => {
      if ( !json.category ) json.category = '';
      if ( json.language ) json.language = json.language.filter( Boolean ).join( ', ' ).toUpperCase();
      json.tags = json.tags.join( ', ' );
      json.created_at = json.created_at ? new Date( json.created_at ).toLocaleString() : '';
      json.component = ccm.helper.getIndex( json.path );
      return json;
    },
    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js", [ "ccm.get", "../content/resources/configs.js", "lang" ] ],
    "placeholder": [ "ccm.get", { "url": "https://ccm2.inf.h-brs.de", "name": "dms-apps" }, "1562615085075X31075165857521436" ]
  },

  /** visualisation of component metadata */
  "component_meta": {
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/content/resources/css/meta.css" ],
    "inner": [ "ccm.load", "https://ccmjs.github.io/akless-components/content/resources/html/component_meta.html" ],
    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/content/resources/configs.js", "lang" ] ]
  },
  "component_meta_test": {
    "css": [ "ccm.load", "../content/resources/css/meta.css" ],
    "inner": [ "ccm.load", "../content/resources/html/component_meta.html" ],
    "json2json": json => {
      if ( !json.category ) json.category = '';
      json.tags = json.tags.join( ', ' );
      json.created_at = json.created_at ? new Date( json.created_at ).toLocaleString() : '';
      return json;
    },
    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js", [ "ccm.get", "../content/resources/configs.js", "lang" ] ],
    "placeholder": [ "ccm.get", { "url": "https://ccm2.inf.h-brs.de", "name": "dms-components" }, "quiz-4-0-0" ]
  },

  /** multilingual configuration for the visualization of component and app metadata */
  "lang": {
    "translations": {
      "de": {
        "category": "Kategorie",
        "component": "Komponente",
        "content_license": "Content-Lizenz",
        "creator": "Erstellt von",
        "index": "Komponentenindex",
        "flag": "https://ccmjs.github.io/tkless-components/lang/resources/de.svg",
        "language": "Sprache",
        "publisher": "Veröffentlicht von",
        "release_date": "Veröffentlichungsdatum",
        "software_license": "Software-Lizenz",
        "tags": "Schlagwörter",
        "url": "URL"
      },
      "en": {
        "category": "Category",
        "component": "Component",
        "content_license": "Content License",
        "creator": "Created By",
        "index": "Component Index",
        "flag": "https://ccmjs.github.io/tkless-components/lang/resources/en.svg",
        "language": "Language",
        "publisher": "Publisher",
        "release_date": "Release Date",
        "software_license": "Software License",
        "tags": "Tags",
        "url": "URL"
      }
    },
    "active": "de"
  }

};
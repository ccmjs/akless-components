/**
 * @overview configurations of ccm component for render Digital Makerspace analytics
 * @author André Kless <andre.kless@web.de> 2019-2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  /** test configuration (relative paths) */
  "local": {
    "apps": [ "ccm.store", { "name": "dms-apps", "url": "wss://ccm2.inf.h-brs.de" } ],
    "chart": [ "ccm.component", "../highchart/ccm.highchart.js" ],
    "components": [ "ccm.store", { "name": "dms-components", "url": "wss://ccm2.inf.h-brs.de" } ],
    "css.1": "../dms_analytics/resources/styles.css",
    "helper.1": "../modules/helper.mjs",
    "html.1": "../dms_analytics/resources/templates.html",
    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js", [ "ccm.get", "../dms_analytics/resources/configs.js", "lang" ] ],
    "logs": [ "ccm.store", { "name": "dms-log", "url": "wss://ccm2.inf.h-brs.de" } ],
//  "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "menu": [ "ccm.component", "../menu/ccm.menu.js", [ "ccm.get", "../dms_analytics/resources/configs.js", "menu" ] ],
    "reload": true,
    "routing": [ "ccm.instance", "../routing/ccm.routing.js", { "app": "dms_analytics" } ],
    "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/resources.js", "local" ] ]
  },

  /** live configuration (absolute paths) */
  "live": {
    "apps": [ "ccm.store", { "name": "dms-apps", "url": "wss://ccm2.inf.h-brs.de" } ],
    "chart": [ "ccm.component", "https://ccmjs.github.io/akless-components/highchart/versions/ccm.highchart-3.0.2.js" ],
    "components": [ "ccm.store", { "name": "dms-components", "url": "wss://ccm2.inf.h-brs.de" } ],
    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/dms_analytics/resources/configs.js", "lang" ] ],
    "logs": [ "ccm.store", { "name": "dms-log", "url": "wss://ccm2.inf.h-brs.de" } ],
    "routing": [ "ccm.instance", "https://ccmjs.github.io/akless-components/routing/versions/ccm.routing-2.0.5.js", { "app": "dms_analytics" } ]
  },

  /** configuration for multilingualism */
  "lang": {
    "translations": {
      "de": {
        "flag": "https://ccmjs.github.io/tkless-components/lang/resources/de.svg"
      },
      "en": {
        "flag": "https://ccmjs.github.io/tkless-components/lang/resources/en.svg"
      }
    },
    "active": "en"
  },

  /** configuration for menu */
  "menu": {
    "css": [ "ccm.load",
      "https://ccmjs.github.io/akless-components/menu/resources/top_tabs.css",
      "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    ],
    "data": { "entries": [
      { "id": "apps",                 "title": "apps"                 },
      { "id": "components",           "title": "components"           },
      { "id": "app_creators",         "title": "app_creators"         },
      { "id": "component_developers", "title": "component_developers" },
      { "id": "visitors",             "title": "visitors"             }
    ] },
    "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/menu/resources/top_tabs.html" ],
    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js", {
      "translations": {
        "de": {
          "app_creators": "App-Ersteller",
          "apps": "Apps",
          "component_developers": "Komponentenentwickler",
          "components": "Komponenten",
          "flag": "https://ccmjs.github.io/tkless-components/lang/resources/de.svg",
          "visitors": "Besucher"
        },
        "en": {
          "app_creators": "App Creators",
          "apps": "Apps",
          "component_developers": "Component Developers",
          "components": "Components",
          "flag": "https://ccmjs.github.io/tkless-components/lang/resources/en.svg",
          "visitors": "Visitors",
        }
      }
    } ],
    "selected": "apps"
  }

};
/**
 * @overview static data-based resources of ccmjs-based web component for multiple choice
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  /** test configuration (relative paths) */
  "local": {
    "css.1.1": "./../mc/resources/styles.css",
    "data": {
      "store": [ "ccm.store", { "name": "mc-data", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "test"
    },
    "feedback": true,
    "helper.1": "./../modules/helper.mjs",
    "html.1": "./../mc/resources/templates.mjs",
    "onfinish": { "log": true, "store": true, "restart": true },
    "questions": [ "ccm.get", { "name": "dbs-questions", "url": "https://ccm2.inf.h-brs.de" } ],
    "text": {
      "question": "Frage %nr%/%total%",
      "buttons": [ "Richtig", "Enthaltung", "Falsch" ],
      "finish": "Fertig",
      "next": "Weiter",
      "submit": "Abschicken"
    }
  },

  /** demo configuration (absolute paths) */
  "demo": {
    "data": {
      "store": [ "ccm.store", { "name": "mc-data", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "feedback": true,
    "onfinish": { "log": true, "store": true, "restart": true },
    "questions": [ "ccm.get", { "name": "dbs-questions", "url": "https://cm2.inf.h-brs.de" } ],
    "text": {
      "question": "Frage %nr%/%total%",
      "buttons": [ "Richtig", "Enthaltung", "Falsch" ],
      "finish": "Fertig",
      "next": "Weiter",
      "submit": "Abschicken"
    }
  }

};
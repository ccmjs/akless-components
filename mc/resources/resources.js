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
    "questions": [ "ccm.get", "./../mc/resources/resources.js", "questions" ],
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
    "questions": [ "ccm.get", "https://ccmjs.github.io/akless-components/mc/resources/resources.js", "questions" ],
    "text": {
      "question": "Frage %nr%/%total%",
      "buttons": [ "Richtig", "Enthaltung", "Falsch" ],
      "finish": "Fertig",
      "next": "Weiter",
      "submit": "Abschicken"
    }
  },

  /** example questions data */
  "questions": [
    {
      "text": "<p>Gegeben sind die folgenden beiden Datensätze der Datensammlung \"Personen\":</p><ul><li>Harald Kaputnik, Hauptstraße 18, 53117 Bonn</li><li>Petra Weizenkeim, 22.06.1999, 0228-12345678, 53117 Bonn</li></ul>",
      "answers": [
        { "solution": true, "text": "Die Datensammlung \"Personen\" vereinigt unstrukturierte Daten." },
        { "solution": false, "text": "Die Datensammlung \"Personen\" vereinigt semi-strukturierte Daten." },
        { "solution": false, "text": "Die Datensammlung \"Personen\" vereinigt strukturierte Daten." },
        { "solution": true, "text": "Die Bedeutung der Datenwerte ist für den Leser nicht ersichtlich." },
        { "solution": false, "text": "Es könnte sich um zwei Datensätze einer Tabelle \"Personen\" handeln." }
      ]
    },
    {
      "text": "Die logische Datenunabhängigkeit bedeutet, dass ...",
      "answers": [
        { "solution": false, "text": "der Datenzugriff lediglich über eine Beschreibung der gewünschten Daten und nicht über die Angabe der Speicheradresse erfolgt." },
        { "solution": false, "text": "die Datenbank eine Vereinigung der Daten vieler Anwendungsbereiche enthält." },
        { "solution": true, "text": "die interne Darstellung der Daten geändert werden kann, ohne dass die Anwendungsprogramme angepasst werden müssen." },
        { "solution": false, "text": "die Daten auf eine andere Datenbank verschoben werden können, ohne dass die Anwendungsprogramme angepasst werden müssen." },
        { "solution": true, "text": "sich der Name einer Tabelle oder einer Spalte ändern kann, ohne dass die Anwendungsprogramme angepasst werden müssen." }
      ]
    }
  ]

};
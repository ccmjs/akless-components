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
      "store": [ "ccm.store", { "name": "test" } ],
      "key": "test"
    },
    "escape": false,
    "feedback": true,
    "helper.1": "./../modules/helper.mjs",
    "html.1": "./../mc/resources/templates.mjs",
    "onfinish": { "restart": true, "log": true, "store": true },
    "questions": [
      {
        "text": "<p>Gegeben sind die folgenden beiden Datensätze der Datensammlung \"Personen\":</p><ul><li>Harald Kaputnik, Hauptstraße 18, 53117 Bonn</li><li>Petra Weizenkeim, 22.06.1999, 0228-12345678, 53117 Bonn</li></ul>",
        "answers": [
          { "text": "Die Datensammlung \"Personen\" vereinigt unstrukturierte <b>Daten</b>." },
          { "text": "Die Datensammlung \"Personen\" vereinigt semi-strukturierte Daten." },
          { "text": "Die Datensammlung \"Personen\" vereinigt strukturierte Daten." },
          { "text": "Die Bedeutung der Datenwerte ist für den Leser nicht ersichtlich." },
          { "text": "Es könnte sich um zwei Datensätze einer Tabelle \"Personen\" handeln." }
        ],
        "solution": [ true, false, false, true, false ]
      },
      {
        "text": "Die logische Datenunabhängigkeit bedeutet, dass ...",
        "answers": [
          { "text": "der Datenzugriff lediglich über eine Beschreibung der gewünschten Daten und nicht über die Angabe der Speicheradresse erfolgt." },
          { "text": "die Datenbank eine Vereinigung der Daten vieler Anwendungsbereiche enthält." },
          { "text": "die interne Darstellung der Daten geändert werden kann, ohne dass die Anwendungsprogramme angepasst werden müssen." },
          { "text": "die Daten auf eine andere Datenbank verschoben werden können, ohne dass die Anwendungsprogramme angepasst werden müssen." },
          { "text": "sich der Name einer Tabelle oder einer Spalte ändern kann, ohne dass die Anwendungsprogramme angepasst werden müssen." }
        ],
        "solution": [ false, false, true, false, true ]
      }
    ],
    "text": {
      "question": "Frage %nr%/%total%",
      "buttons": [ "Richtig", "", "Falsch" ],
      "finish": "Fertig",
      "next": "Weiter",
      "submit": "Abschicken"
    }
  },

  /** demo configuration (absolute paths) */
  "demo": {
  }

};
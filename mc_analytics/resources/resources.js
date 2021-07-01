/**
 * @overview data-based resources of ccmjs-based web component for multiple choice analytics
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  /** test configuration (relative paths) */
  "local": {
    "css.1.1": "./../mc_analytics/resources/styles.css",
    "data": {
      "store": [ "ccm.store", { "name": "mc-data", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "test"
    },
    "helper.1": "./../modules/helper.mjs",
    "html.1": "./../mc_analytics/resources/templates.mjs",
    "text": {
      "answer": "Multiple Choice Antwort",
      "average": "Durchschnittlich erreichte Punkte",
      "correct": "Richtige Lösung ausgewählt",
      "diagram": "Zeige Diagramm",
      "pchart": {
        "points": "Punkte",
        "series": [ "Minimum", "Durchschnitt", "Maximum" ],
        "title": "Durchschnittlich erreichte Punktzahl",
        "xaxis": "Multiple Choice Fragen",
        "yaxis": "Erreichte Punktzahl"
      },
      "points": "Zeige Punktedurchschnitt",
      "qchart": {
        "column": "A%nr%",
        "correct": "richtig beantwortet",
        "subtitle": "Insgesamt %total% Einreichung(en).",
        "tooltip": "<b>%category%</b> wurde in <b>%y%</b> Einreichung(en) <b>%series%</b>.<br><i>%answer%</i>",
        "wrong": "falsch beantwortet",
        "yaxis": "Anzahl an Einreichungen"
      },
      "question": "Multiple Choice Frage",
      "refresh": "Aktualisiere Tabellendaten",
      "solution": "Richtige Lösung",
      "sum": "Anzahl an Einreichungen",
      "wrong": "Falsche Lösung ausgewählt"
    }
  },

  /** demo configuration (absolute paths) */
  "demo": {
    "data": {
      "store": [ "ccm.store", { "name": "mc-data", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    }
  }

};
/**
 * @overview data-based resources of ccmjs-based web component for ER model training
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "css": [ "ccm.load",
      [  // serial
        "./../libs/bootstrap-4/css/bootstrap.min.css",
        "./../er_trainer/resources/default.css"
      ]
    ],
    "data": {
      "store": [ "ccm.store", { "name": "er_trainer-data", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "test",
    },
    "helper.1": "./../modules/helper.mjs",
    "html.1": "./../er_trainer/resources/templates.mjs",
    "phrases": [
      {
        "text": "Ein Verein hat einen Präsidenten. Eine Person kann mehrere Präsidentenjobs in verschiedenen Vereinen übernehmen.",
        "relationship": [ "Präsident", "hat", "Verein" ],
        "correct": [ "1", "cn" ]
      },
      {
        "text": "Eine Zutat wird in einem, keinem oder mehreren Rezepten verwendet und ein Rezept hat mehrere Zutaten.",
        "relationship": [ "Zutat", "verwendet", "Rezept" ],
        "correct": [ "n", "cn" ]
      },
      {
        "text": "Ein Planet hat keinen, einen oder mehrere Monde.",
        "relationship": [ "Planet", "hat", "Mond" ],
        "correct": [ "1", "cn" ]
      }
    ]
  },

  "demo": {
  }

};
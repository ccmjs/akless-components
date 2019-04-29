/**
 * @overview configurations of ccm component for visualisation of result data
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
    "css": [ "ccm.load",
      "../result/resources/default.css",
      "../libs/bootstrap-4/css/bootstrap.min.css"
    ],
    "app": [
      {
        "component": [ "ccm.component", "../cloze/ccm.cloze.js" ],
        "configs": [ "ccm.store", { "name": "cloze", "url": "https://ccm2.inf.h-brs.de" } ],
      },
      {
        "component": [ "ccm.component", "../quiz/ccm.quiz.js" ],
        "configs": [ "ccm.store", { "name": "quiz", "url": "https://ccm2.inf.h-brs.de" } ],
      }
    ],
    "store": [ "ccm.store", { "name": "result_data", "url": "wss://ccm2.inf.h-brs.de" } ],
    "menu": [ "ccm.component", "../menu/ccm.menu.js", [ "ccm.get", "../menu/resources/configs.js", "bootstrap" ] ],
    "table": [ "ccm.component", "https://ccmjs.github.io/tkless-components/table/ccm.table.js" ],
    "chart": [ "ccm.component", "../highchart/ccm.highchart.js" ],
    "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/configs.js", "guest" ] ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
  },

  "demo": {
    "key": "demo",
    "app": [
      {
        "component": [ "ccm.component", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-6.0.0.js" ],
        "configs": [ "ccm.store", { "name": "cloze", "url": "https://ccm2.inf.h-brs.de" } ]
      },
      {
        "component": [ "ccm.component", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.0.js" ],
        "configs": [ "ccm.store", { "name": "quiz", "url": "https://ccm2.inf.h-brs.de" } ]
      }
    ],
    "store": [ "ccm.store", { "name": "result_data", "url": "wss://ccm2.inf.h-brs.de" } ]
  },

  "ws": {
    "key": "ws",
    "app": [
      {
        "name": "Fill in the Blanks",
        "component": [ "ccm.component", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-6.0.0.js" ],
        "configs": [ "ccm.store", [ "ccm.get", { "name": "ws_cloze", "url": "https://ccm2.inf.h-brs.de" }, {} ] ]
      },
      {
        "name": "Mark Words",
        "component": [ "ccm.component", "https://ccmjs.github.io/tkless-components/mark_words/versions/ccm.mark_words-3.3.0.js" ],
        "configs": [ "ccm.store", [ "ccm.get", { "name": "ws_mark_words", "url": "https://ccm2.inf.h-brs.de" }, {} ] ]
      },
      {
        "name": "Quick Decision",
        "component": [ "ccm.component", "https://ccmjs.github.io/akless-components/quick_decide/versions/ccm.quick_decide-1.4.0.js" ],
        "configs": [ "ccm.store", [ "ccm.get", { "name": "ws_quick_decide", "url": "https://ccm2.inf.h-brs.de" }, {} ] ]
      },
      {
        "name": "Quiz",
        "component": [ "ccm.component", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.0.js" ],
        "configs": [ "ccm.store", [ "ccm.get", { "name": "ws_quiz", "url": "https://ccm2.inf.h-brs.de" }, {} ] ]
      },
      {
        "name": "Star Rating",
        "component": [ "ccm.component", "https://ccmjs.github.io/tkless-components/star_rating/versions/ccm.star_rating-4.0.0.js" ],
        "configs": [ "ccm.store", [ "ccm.get", { "name": "ws_star_rating", "url": "https://ccm2.inf.h-brs.de" }, {} ] ]
      }
    ],
    "store": [ "ccm.store", { "name": "ws_result_data", "url": "wss://ccm2.inf.h-brs.de" } ]
  }

};
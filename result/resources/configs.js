/**
 * @overview configurations of ccm component for visualisation of result data
 * @author André Kless <andre.kless@web.de> 2019-2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "app": [
      {
        "name": "Exercise",
        "component": [ "ccm.component", "https://ccmjs.github.io/tkless-components/exercise/versions/ccm.exercise-5.0.0.js" ],
        "configs": [ "ccm.store", [ "ccm.get", { "name": "ws_exercise", "url": "https://ccm2.inf.h-brs.de" }, {} ] ]
      },
      {
        "name": "Fill in the Blanks",
        "component": [ "ccm.component", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-6.0.0.js" ],
        "configs": [ "ccm.store", [ "ccm.get", { "name": "ws_cloze", "url": "https://ccm2.inf.h-brs.de" }, {} ] ]
      },
      {
        "name": "Live Poll",
        "component": [ "ccm.component", "https://ccmjs.github.io/akless-components/live_poll/versions/ccm.live_poll-2.0.1.js" ],
        "configs": [ "ccm.store", [ "ccm.get", { "name": "ws_live_poll", "url": "https://ccm2.inf.h-brs.de" }, {} ] ]
      },
      {
        "name": "Mark Words",
        "component": [ "ccm.component", "https://ccmjs.github.io/tkless-components/mark_words/versions/ccm.mark_words-4.0.0.js" ],
        "configs": [ "ccm.store", [ "ccm.get", { "name": "ws_mark_words", "url": "https://ccm2.inf.h-brs.de" }, {} ] ]
      },
      {
        "name": "Quick Decision",
        "component": [ "ccm.component", "https://ccmjs.github.io/akless-components/quick_decide/versions/ccm.quick_decide-2.0.0.js" ],
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
    "chart.1": "../highchart/ccm.highchart.js",
    "css.1.1": "../result/resources/default.css",
    "helper.1": "../modules/helper.mjs",
    "html.1": "../result/resources/templates.html",
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "menu": [ "ccm.component", "../menu/ccm.menu.js", [ "ccm.get", "../menu/resources/configs.js", "bootstrap" ] ],
    "store": [ "ccm.store", { "name": "ws_result_data", "url": "wss://ccm2.inf.h-brs.de" } ],
    "user": [ "ccm.instance", "../user/ccm.user.js" ]
  },

  "demo": {
    "key": "demo",
    "app": [
      {
        "name": "Exercise",
        "component": [ "ccm.component", "https://ccmjs.github.io/tkless-components/exercise/versions/ccm.exercise-5.0.0.js" ],
        "configs": [ "ccm.store", [ "ccm.get", { "name": "ws_exercise", "url": "https://ccm2.inf.h-brs.de" }, {} ] ]
      },
      {
        "name": "Fill in the Blanks",
        "component": [ "ccm.component", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-6.0.0.js" ],
        "configs": [ "ccm.store", [ "ccm.get", { "name": "ws_cloze", "url": "https://ccm2.inf.h-brs.de" }, {} ] ]
      },
      {
        "name": "Live Poll",
        "component": [ "ccm.component", "https://ccmjs.github.io/akless-components/live_poll/versions/ccm.live_poll-2.0.1.js" ],
        "configs": [ "ccm.store", [ "ccm.get", { "name": "ws_live_poll", "url": "https://ccm2.inf.h-brs.de" }, {} ] ]
      },
      {
        "name": "Mark Words",
        "component": [ "ccm.component", "https://ccmjs.github.io/tkless-components/mark_words/versions/ccm.mark_words-4.0.0.js" ],
        "configs": [ "ccm.store", [ "ccm.get", { "name": "ws_mark_words", "url": "https://ccm2.inf.h-brs.de" }, {} ] ]
      },
      {
        "name": "Quick Decision",
        "component": [ "ccm.component", "https://ccmjs.github.io/akless-components/quick_decide/versions/ccm.quick_decide-2.0.0.js" ],
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
  },

  "ws": {
    "key": "ws",
    "user": null,
    "app": [
      {
        "name": "Exercise",
        "component": [ "ccm.component", "https://ccmjs.github.io/tkless-components/exercise/versions/ccm.exercise-5.0.0.js" ],
        "configs": [ "ccm.store", [ "ccm.get", { "name": "ws_exercise", "url": "https://ccm2.inf.h-brs.de" }, {} ] ]
      },
      {
        "name": "Fill in the Blanks",
        "component": [ "ccm.component", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-6.0.0.js" ],
        "configs": [ "ccm.store", [ "ccm.get", { "name": "ws_cloze", "url": "https://ccm2.inf.h-brs.de" }, {} ] ]
      },
      {
        "name": "Live Poll",
        "component": [ "ccm.component", "https://ccmjs.github.io/akless-components/live_poll/versions/ccm.live_poll-2.0.1.js" ],
        "configs": [ "ccm.store", [ "ccm.get", { "name": "ws_live_poll", "url": "https://ccm2.inf.h-brs.de" }, {} ] ]
      },
      {
        "name": "Mark Words",
        "component": [ "ccm.component", "https://ccmjs.github.io/tkless-components/mark_words/versions/ccm.mark_words-4.0.0.js" ],
        "configs": [ "ccm.store", [ "ccm.get", { "name": "ws_mark_words", "url": "https://ccm2.inf.h-brs.de" }, {} ] ]
      },
      {
        "name": "Quick Decision",
        "component": [ "ccm.component", "https://ccmjs.github.io/akless-components/quick_decide/versions/ccm.quick_decide-2.0.0.js" ],
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
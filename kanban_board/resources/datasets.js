/**
 * @overview datasets of ccm component for kanban board
 * @author André Kless <andre.kless@web.de> 2017-2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'datasets.js' ] = {

  "test": {
    "key": "local",
    "lanes": [
      {
        "cards": [
          [ "ccm.instance", "../kanban_card/ccm.kanban_card.js", [ "ccm.get", "../kanban_card/resources/configs.js", "local_white" ] ],
          [ "ccm.instance", "../kanban_card/ccm.kanban_card.js", [ "ccm.get", "../kanban_card/resources/configs.js", "local_gold" ] ]
        ],
      },
      {
        "cards": [
          [ "ccm.instance", "../kanban_card/ccm.kanban_card.js", [ "ccm.get", "../kanban_card/resources/configs.js", "local_blue" ] ]
        ]
      },
      { "cards": [] }
    ]
  },

  "showcase": {
    "key": "showcase",
    "lanes": [
      {
        "cards": [
          [ "ccm.instance", "https://ccmjs.github.io/akless-components/kanban_card/versions/ccm.kanban_card-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/kanban_card/resources/configs.js", "test" ] ],
          [ "ccm.instance", "https://ccmjs.github.io/akless-components/kanban_card/versions/ccm.kanban_card-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/kanban_card/resources/configs.js", "realtime" ] ]
        ]
      },
      {
        "cards": [
          [ "ccm.instance", "https://ccmjs.github.io/akless-components/kanban_card/versions/ccm.kanban_card-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/kanban_card/resources/configs.js", "w2c" ] ]
        ]
      },
      {
        "cards": [
          [ "ccm.instance", "https://ccmjs.github.io/akless-components/kanban_card/versions/ccm.kanban_card-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/kanban_card/resources/configs.js", "lea" ] ],
          [ "ccm.instance", "https://ccmjs.github.io/akless-components/kanban_card/versions/ccm.kanban_card-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/kanban_card/resources/configs.js", "more" ] ]
        ]
      }
    ]
  },

  "experimental": {
    "key": "experimental",
    "lanes": [
      {
        "cards": [
          [ "ccm.instance", "https://ccmjs.github.io/akless-components/kanban_card/versions/ccm.kanban_card-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/kanban_card/resources/configs.js", "realtime" ] ]
        ]
      },
      {
        "cards": [
          [ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-2.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/quiz/resources/configs.js", "demo" ] ]
        ]
      },
      {
        "cards": [
          [ "ccm.instance", "https://ccmjs.github.io/akless-components/blank/ccm.blank.js" ],
          [ "ccm.instance", "https://ccmjs.github.io/akless-components/eval/versions/ccm.eval-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/eval/resources/configs.js", "demo" ] ]
        ]
      }
    ]
  }

};
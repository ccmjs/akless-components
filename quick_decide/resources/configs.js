/**
 * @overview configurations of ccm component for quick decision
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
    "css.1": "../quick_decide/resources/default.css",
    "questions": [
      {
        "text": "Question A",
        "answers": [ "Answer A", "Answer B", "Answer C" ]
      },
      {
        "text": "Which Letter?",
        "answers": [ "A", "B" ]
      },
      {
        "text": "Which Number?",
        "answers": [ "1", "2" ]
      },
      {
        "text": "Do you agree?",
        "answers": [ "Yes", "No" ]
      },
      {
        "text": "Which Fruit",
        "answers": [ "Apple", "Pear" ]
      },
      {
        "text": "Enough?",
        "answers": [ "Finish" ]
      }
    ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onfinish": { "log": true }
  },

  "demo": {
    "key": "demo",
    "questions": [
      {
        "text": "Question A",
        "answers": [ "Answer A", "Answer B", "Answer C" ]
      },
      {
        "text": "Which Letter?",
        "answers": [ "A", "B" ]
      },
      {
        "text": "Which Number?",
        "answers": [ "1", "2" ]
      },
      {
        "text": "Do you agree?",
        "answers": [ "Yes", "No" ]
      },
      {
        "text": "Which Fruit",
        "answers": [ "Apple", "Pear" ]
      },
      {
        "text": "Enough?",
        "answers": [ "Finish" ]
      }
    ],
    "interval": 1
  },

  "time_limit": {

    "key": "time_limit",
    "questions": [
      {
        "text": "Question A",
        "answers": [ "Answer A", "Answer B", "Answer C" ]
      },
      {
        "text": "Which Letter?",
        "answers": [ "A", "B" ]
      },
      {
        "text": "Which Number?",
        "answers": [ "1", "2" ]
      },
      {
        "text": "Do you agree?",
        "answers": [ "Yes", "No" ]
      },
      {
        "text": "Which Fruit",
        "answers": [ "Apple", "Pear" ]
      },
      {
        "text": "Enough?",
        "answers": [ "Finish" ]
      }
    ],
    "interval": 1,
    "limit": 2000,
    "wait": 1000
  }

};
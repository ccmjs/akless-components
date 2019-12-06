/**
 * @overview static data-based resources of ccm component for quiz
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  /** test configuration (relative paths) */
  "local": {
    "css": [ "ccm.load",
      "../quiz/resources/weblysleek.css",
      { "context": "head", "url": "../resources/fonts/WeblySleekUI/font.css" }
    ],
    "questions": [ "ccm.get", "../quiz/resources/resources.js", "data.questions" ],
    "html.1": "../quiz/resources/templates.html",
    "show_results": false,
    "start_button": false,
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "feedback": true,
    "navigation": true,
    "placeholder.finish": "Restart",
    "onfinish": { "restart": true, "store": false }
  },

  /** demo configuration (absolute paths) */
  "demo": {
    "key": "demo",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/quiz/resources/weblysleek.css", { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/weblysleekui/font.css" } ],
    "questions": [ "ccm.get", "https://ccmjs.github.io/akless-components/quiz/quiz/resources/resources.js", "data.questions" ],
    "feedback": true,
    "navigation": true,
    "placeholder.finish": "Restart",
    "onfinish": { "restart": true }
  },

  /** demo data for questions and answers */
  "data": {
    "questions": [
      {
        "text": "How many of these answers are correct?",
        "description": "Select the correct answer from the following answers.",
        "answers": [
          {
            "text": "one",
            "comment": "Because you can't choose more than one answer."
          },
          "two",
          "three"
        ],
        "input": "radio",
        "solution": 0
      },
      {
        "text": "How many answers can be correct here?",
        "description": "Pay attention to the input field type.",
        "answers": [
          "absolutely none",
          {
            "text": "maximum of one",
            "comment": "Because you can choose more than one answer."
          },
          "more than one"
        ],
        "solution": [ true, false, true ]
      },
      {
        "text": "What is the solution to the following arithmetical tasks?",
        "description": "Please enter the solutions into the input fields.",
        "answers": [
          "=&nbsp; 1 + 1",
          "=&nbsp; 1 - 1",
          "=&nbsp;-1 - 1"
        ],
        "input": "number",
        "attributes": {
          "min": -2,
          "max": 2
        },
        "solution": [ 2, 0, -2 ]
      },
      {
        "text": "Which <code style='color:orange'>code</code> is written in the <b style='color:blue'>Java</b> programming language?",
        "description": "Quiz questions and answers may contain special characters.",
        "answers": [
          {
            "text": "<span>Hello World</span>",
            "escape": true,
            "comment": "This code is written in HTML."
          },
          {
            "text": "System.out.println(\"Hello World!\");",
            "correct": true
          },
          {
            "text": "console.log(\"Hello World!\");",
            "comment": "This code is written in JavaScript."
          }
        ],
        "input": "radio",
        "random": true
      }
    ]
  }

};
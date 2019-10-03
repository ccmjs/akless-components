/**
 * @overview configurations of ccm component a guess picture game
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  /** test configuration for local testing (relative paths) */
  "local": {
    "css.1": "../guess_picture/resources/styles.css",
    "html.1": "../guess_picture/resources/templates.html",
    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js", {
      "translations": {
        "de": {
          "description": "Beantworten Sie möglichst schnell, was auf dem Bild zu sehen ist, das mit der Zeit immer mehr sichtbar wird.",
          "flag": "https://ccmjs.github.io/tkless-components/lang/resources/de.svg",
          "points": "Punkte",
          "result": "Dein Ergebnis:",
          "solution": "Lösung:",
          "title": "Bildratespiel"
        },
        "en": {
          "description": "Answer as quickly as possible what can be seen in the picture, which becomes more and more visible over time.",
          "flag": "https://ccmjs.github.io/tkless-components/lang/resources/en.svg",
          "points": "Points",
          "result": "You have reached",
          "solution": "Solution:",
          "title": "Image-Guess Game"
        }
      },
      "active": "en"
    } ],
    "onfinish": { "log": true },
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "user": [ "ccm.start", "../user/versions/ccm.user-9.2.0.js", [ "ccm.get", "../user/resources/configs.js", "guest" ] ]
  },

  /** demo configuration for external showcase (absolute paths) */
  "demo": {
    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js", {
      "translations": {
        "de": {
          "description": "Beantworten Sie möglichst schnell, was auf dem Bild zu sehen ist, das mit der Zeit immer mehr sichtbar wird.",
          "flag": "https://ccmjs.github.io/tkless-components/lang/resources/de.svg",
          "points": "Punkte",
          "result": "Dein Ergebnis:",
          "solution": "Lösung:",
          "title": "Bildratespiel"
        },
        "en": {
          "description": "Answer as quickly as possible what can be seen in the picture, which becomes more and more visible over time.",
          "flag": "https://ccmjs.github.io/tkless-components/lang/resources/en.svg",
          "points": "Points",
          "result": "You have reached",
          "solution": "Solution:",
          "title": "Image-Guess Game"
        }
      },
      "active": "en"
    } ],
    "picture": "https://akless.github.io/akless/resources/sheep.png",
    "solution": [ "Schaf", "Sheep" ],
  }

};
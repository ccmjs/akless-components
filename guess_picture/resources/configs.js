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
    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js", [ "ccm.get", "../guess_picture/resources/configs.js", "lang" ] ],
    "onfinish": { "log": true, "restart": true },
    "pictures": [
      {
        "image": "https://akless.github.io/akless/resources/images/balloon.jpg",
        "solution": [ "Heißluftballon", "Hot Air Balloon" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/dolphin.jpg",
        "solution": [ "Delfin", "Dolphin" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/duck.jpg",
        "solution": [ "Ente", "Duck" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/eagle.jpg",
        "solution": [ "Adler", "Eagle" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/earth.jpg",
        "solution": [ "Erde", "Earth" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/elephant.jpg",
        "solution": [ "Elefant", "Elephant" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/hedgehog.jpg",
        "solution": [ "Igel", "Hedgehog" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/locomotive.jpg",
        "solution": [ "Lok", "Dampflok", "Locomotive" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/mushroom.jpg",
        "solution": [ "Pilz", "Fliegenpilz", "Mushroom", "Toadstool" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/notebook.jpg",
        "solution": [ "Notebook", "Laptop", "MacBook" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/parrot.jpg",
        "solution": [ "Papagei", "Parrot" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/pyramid.jpg",
        "solution": [ "Pyramid" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/rose.jpg",
        "solution": [ "Rose" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/seal.jpg",
        "solution": [ "Seehund", "Robbe", "Seal" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/sheep.jpg",
        "solution": [ "Schaf", "Sheep" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/ship.jpg",
        "solution": [ "Segelschiff", "Sailing Ship", "Sailing Vessel" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/snail.jpg",
        "solution": [ "Schnecke", "Snail", "Slug" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/snake.jpg",
        "solution": [ "Schlange", "Snake" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/tiger.jpg",
        "solution": [ "Tiger" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/tractor.jpg",
        "solution": [ "Traktor", "Tractor" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/turtle.jpg",
        "solution": [ "Schildkröte", "Turtle" ]
      }
    ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "size": 5,
    "user": [ "ccm.start", "../user/versions/ccm.user-9.2.0.js", [ "ccm.get", "../user/resources/configs.js", "guest" ] ]
  },

  /** demo configuration for external showcase (absolute paths) */
  "demo": {
    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/guess_picture/resources/configs.js", "lang" ] ],
    "onfinish": { "restart": true },
    "pictures": [
      {
        "image": "https://akless.github.io/akless/resources/images/balloon.jpg",
        "solution": [ "Heißluftballon", "Hot Air Balloon" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/dolphin.jpg",
        "solution": [ "Delfin", "Dolphin" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/duck.jpg",
        "solution": [ "Ente", "Duck" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/eagle.jpg",
        "solution": [ "Adler", "Eagle" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/earth.jpg",
        "solution": [ "Erde", "Earth" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/elephant.jpg",
        "solution": [ "Elefant", "Elephant" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/hedgehog.jpg",
        "solution": [ "Igel", "Hedgehog" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/locomotive.jpg",
        "solution": [ "Lok", "Dampflok", "Locomotive" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/mushroom.jpg",
        "solution": [ "Fliegenpilz", "Mushroom", "Toadstool" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/notebook.jpg",
        "solution": [ "Notebook", "Laptop", "MacBook" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/parrot.jpg",
        "solution": [ "Papagei", "Parrot" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/pyramid.jpg",
        "solution": [ "Pyramid" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/rose.jpg",
        "solution": [ "Rose" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/seal.jpg",
        "solution": [ "Seehund", "Robbe", "Seal" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/sheep.jpg",
        "solution": [ "Schaf", "Sheep" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/ship.jpg",
        "solution": [ "Segelschiff", "Sailing Ship", "Sailing Vessel" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/snail.jpg",
        "solution": [ "Schnecke", "Snail", "Slug" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/snake.jpg",
        "solution": [ "Schlange", "Snake" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/tiger.jpg",
        "solution": [ "Tiger" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/tractor.jpg",
        "solution": [ "Traktor", "Tractor" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/turtle.jpg",
        "solution": [ "Schildkröte", "Turtle" ]
      }
    ],
    "size": 5
  },

  /** configuration for multilingualism */
  "lang": {
    "translations": {
      "de": {
        "description": "Beantworten Sie möglichst schnell, was auf dem Bild zu sehen ist, das mit der Zeit immer mehr sichtbar wird.",
        "finish": "Fertig",
        "flag": "https://ccmjs.github.io/tkless-components/lang/resources/de.svg",
        "points": "Punkte",
        "result": "Dein Ergebnis:",
        "solution": "Lösung:",
        "title": "Bildratespiel"
      },
      "en": {
        "description": "Answer as quickly as possible what can be seen in the picture, which becomes more and more visible over time.",
        "finish": "Finish",
        "flag": "https://ccmjs.github.io/tkless-components/lang/resources/en.svg",
        "points": "Points",
        "result": "You have reached",
        "solution": "Solution:",
        "title": "Image-Guess Game"
      }
    },
    "active": "de"
  }

};
/**
 * @overview data-based resources of ccm component for quest maps
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  /** test configuration (relative paths) */
  "local": {
    "app_key": "quest_map_demo",
    "css.1": "../quest_map/resources/styles.css",
    "data": [ "ccm.get", "../quest_map/resources/resources.js", "data" ],
    "helper.1": "../modules/helper.mjs",
    "html.1": "../quest_map/resources/templates.html",
    "image_map": [ "ccm.component", "../image_map/ccm.image_map.js", [ "ccm.get", "../image_map/resources/resources.js", "local" ] ],
//  "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
//  "onchange": event => console.log( event ),
//  "onstart": event => console.log( event ),
    "user": [ "ccm.instance", "../user/ccm.user.js", {
      "css": [ "ccm.load",
        "../libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
        "../user/resources/default.css"
      ],
      "helper.1": "../modules/helper.mjs",
      "html": [ "ccm.get", "../user/resources/resources.js", "html" ],
      "realm": "guest",
      "store": "guest-user",
      "url": "https://ccm2.inf.h-brs.de"
    } ]
  },

  /** demo configuration (absolute paths) */
  "demo": {
    "app_key": "quest_map_demo",
    "data": [ "ccm.get", "https://ccmjs.github.io/akless-components/quest_map/resources/resources.js", "data" ],
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.6.0.js", {
      "realm": "guest",
      "store": "guest-user",
      "url": "https://ccm2.inf.h-brs.de"
    } ]
  },

  /** demo data */
  "data": {
    "image": "https://akless.github.io/akless/resources/images/goldgrotte.png",
    "info": "<h3>Expedition Goldgrotte</h3><p>Der Forschungsdrang hat dich zu einer Goldgrotte geführt, in der es 6 Schätze zu entdecken gibt. Jeder Schatz enthält ein Quiz.</p>",
    "areas": [
      {
        "image": "https://akless.github.io/akless/resources/images/treasure.png",
        "x": 24,
        "y": 46,
        "size": 3,
        "info": "<h3>Quiz 1: Was ist HTML?</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
        "dialog": "<h3>Quiz 1: Was ist HTML?</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
        "action": [ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.1.js", [ "ccm.get", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" }, "1581493641370X2326643631210834" ] ],
        "postcondition": {
          "w1.score": "+1"
        }
      },
      {
        "image": "https://akless.github.io/akless/resources/images/treasure.png",
        "x": 94,
        "y": 27,
        "size": 3,
        "info": "<h3>Quiz 2: Erste 'Hallo Welt!'-Webseite</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
        "dialog": "<h3>Quiz 2: Erste 'Hallo Welt!'-Webseite</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
        "action": [ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.1.js", [ "ccm.get", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" }, "1570790042637X16404434157729564" ] ],
        "precondition_visible": {
          "w1.score": ">0"
        },
        "postcondition": {
          "w1.score": "+1",
          "w1.item": "magic_key"
        }
      },
      {
        "image": "https://akless.github.io/akless/resources/images/treasure.png",
        "x": 41,
        "y": 88,
        "size": 3,
        "info": "<h3>Quiz 3: Was ist ein HTML-Tag?</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
        "dialog": "<h3>Quiz 3: Was ist ein HTML-Tag?</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
        "action": [ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.1.js", [ "ccm.get", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" }, "1570780952208X30947674462053376" ] ],
        "precondition_visible": {
          "w1.score": ">0"
        },
        "precondition_enabled": {
          "w1.score": ">1"
        },
        "postcondition": {
          "w1.excalibur": true
        }
      },
      {
        "image": "https://akless.github.io/akless/resources/images/treasure.png",
        "x": 10,
        "y": 82,
        "size": 3,
        "dialog": "<h3>Gewonnen!</h3><p>Herausforderungen erfolgreich gemeistert.</p>",
        "precondition_visible": {
          "w1.item": true
        },
        "precondition_enabled": {
          "w1.excalibur": true
        },
        "postcondition": {
          "w1.item": ""
        }
      },
      {
        "image": "https://ccmjs.github.io/akless-components/dms/resources/img/component.png",
        "x": 74,
        "y": 77,
        "size": 3,
        "dialog": "<h3>Lerneinheit: Was ist HTML?</h3><p>Klicke auf den Schatz um die Lerneinheit zu starten.</p>",
        "precondition_visible": {
          "w1.score": "0"
        }
      }
    ]
  }

};
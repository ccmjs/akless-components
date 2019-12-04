/**
 * @overview static data-based resources of ccm component for an image map
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "key": "local",
    "css.1": "../image_map/resources/styles.css",
    "data": [ "ccm.get", "../image_map/resources/resources.js", "data" ],
    "html.1": "../image_map/resources/templates.html",
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onchange": event => console.log( event ),
    "onmouseout": event => console.log( event ),
    "onmouseover": event => console.log( event ),
    "onstart": event => console.log( event )
  },

  "demo": {
    "key": "demo",
    "data": [ "ccm.get", "https://ccmjs.github.io/akless-components/image_map/resources/resources.js", "data" ]
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
        "action": [ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.1.js", [ "ccm.get", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" }, "1570717629079X27916670596014836" ] ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/treasure.png",
        "x": 94,
        "y": 27,
        "size": 3,
        "info": "<h3>Quiz 2: Erste 'Hallo Welt!'-Webseite</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
        "action": [ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.1.js", [ "ccm.get", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" }, "1570790042637X16404434157729564" ] ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/treasure.png",
        "x": 41,
        "y": 88,
        "size": 3,
        "info": "<h3>Quiz 3: Was ist ein HTML-Tag?</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
        "action": [ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.1.js", [ "ccm.get", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" }, "1570780952208X30947674462053376" ] ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/treasure.png",
        "x": 10,
        "y": 82,
        "size": 3,
        "info": "<h3>Quiz 4: HTML-Grundgerüst</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
        "action": [ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.1.js", [ "ccm.get", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" }, "1570786190916X6161671089439225" ] ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/treasure.png",
        "x": 74,
        "y": 77,
        "size": 3,
        "info": "<h3>Quiz 5: Was ist ein HTML-Attribut?</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
        "action": [ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.1.js", [ "ccm.get", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" }, "1570789265712X9642190088642415" ] ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/treasure.png",
        "x": 79,
        "y": 60,
        "size": 3,
        "info": "<h3>Quiz 6: HTML-Tags und Attribute</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
        "action": [ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.1.js", [ "ccm.get", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" }, "1570789457374X9739707044209898" ] ]
      }
    ]
  }

};
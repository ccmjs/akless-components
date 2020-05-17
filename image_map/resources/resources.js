/**
 * @overview static data-based resources of ccm component for an image map
 * @author André Kless <andre.kless@web.de> 2019-2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  /** test configuration (relative paths) */
  "local": {
    "css.1": "../image_map/resources/styles.css",
    "image": "https://akless.github.io/akless/resources/images/goldgrotte.png",
    "info": "<h3>Expedition Goldgrotte</h3><p>Der Forschungsdrang hat dich zu einer Goldgrotte geführt, in der es 6 Schätze zu entdecken gibt. Jeder Schatz enthält ein Quiz.</p>",
    "helper.1": "../modules/helper.mjs",
    "html.1": "../image_map/resources/templates.html",
    "ignore": {
      "areas": [
        {
          "image": "https://akless.github.io/akless/resources/images/treasure.png",
          "x": 240,
          "y": 460,
          "size": 30,
          "info": "<h3>Quiz 1: Was ist HTML?</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
          "action": [ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.1.js", [ "ccm.get", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" }, "1581493641370X2326643631210834" ] ]
        },
        {
          "image": "https://akless.github.io/akless/resources/images/treasure.png",
          "x": 940,
          "y": 270,
          "size": 30,
          "info": "<h3>Quiz 2: Erste 'Hallo Welt!'-Webseite</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
          "action": [ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.1.js", [ "ccm.get", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" }, "1570790042637X16404434157729564" ] ]
        },
        {
          "image": "https://akless.github.io/akless/resources/images/treasure.png",
          "x": 410,
          "y": 880,
          "size": 30,
          "info": "<h3>Quiz 3: Was ist ein HTML-Tag?</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
          "action": [ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.1.js", [ "ccm.get", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" }, "1570780952208X30947674462053376" ] ]
        },
        {
          "image": "https://akless.github.io/akless/resources/images/treasure.png",
          "x": 100,
          "y": 820,
          "size": 30,
          "info": "<h3>Quiz 4: HTML-Grundgerüst</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
          "action": [ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.1.js", [ "ccm.get", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" }, "1570786190916X6161671089439225" ] ]
        },
        {
          "image": "https://akless.github.io/akless/resources/images/treasure.png",
          "x": 740,
          "y": 770,
          "size": 30,
          "info": "<h3>Quiz 5: Was ist ein HTML-Attribut?</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
          "action": [ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.1.js", [ "ccm.get", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" }, "1570789265712X9642190088642415" ] ]
        },
        {
          "image": "https://akless.github.io/akless/resources/images/treasure.png",
          "x": 790,
          "y": 600,
          "size": 30,
          "info": "<h3>Quiz 6: HTML-Tags und Attribute</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
          "action": [ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.1.js", [ "ccm.get", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" }, "1570789457374X9739707044209898" ] ]
        }
      ]
    },
//  "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
//  "onchange": event => console.log( event ),
//  "onmouseout": event => console.log( event ),
//  "onmouseover": event => console.log( event ),
//  "onrender": event => console.log( event ),
//  "onstart": event => console.log( event ),
//  "preclick": event => console.log( event )
  },

  /** demo configuration (absolute paths) */
  "demo": {
    "ignore": {
      "areas": [
        {
          "image": "https://akless.github.io/akless/resources/images/treasure.png",
          "x": 240,
          "y": 460,
          "size": 30,
          "info": "<h3>Quiz 1: Was ist HTML?</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
          "action": [ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.1.js", [ "ccm.get", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" }, "1581493641370X2326643631210834" ] ]
        },
        {
          "image": "https://akless.github.io/akless/resources/images/treasure.png",
          "x": 940,
          "y": 270,
          "size": 30,
          "info": "<h3>Quiz 2: Erste 'Hallo Welt!'-Webseite</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
          "action": [ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.1.js", [ "ccm.get", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" }, "1570790042637X16404434157729564" ] ]
        },
        {
          "image": "https://akless.github.io/akless/resources/images/treasure.png",
          "x": 410,
          "y": 880,
          "size": 30,
          "info": "<h3>Quiz 3: Was ist ein HTML-Tag?</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
          "action": [ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.1.js", [ "ccm.get", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" }, "1570780952208X30947674462053376" ] ]
        },
        {
          "image": "https://akless.github.io/akless/resources/images/treasure.png",
          "x": 100,
          "y": 820,
          "size": 30,
          "info": "<h3>Quiz 4: HTML-Grundgerüst</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
          "action": [ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.1.js", [ "ccm.get", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" }, "1570786190916X6161671089439225" ] ]
        },
        {
          "image": "https://akless.github.io/akless/resources/images/treasure.png",
          "x": 740,
          "y": 770,
          "size": 30,
          "info": "<h3>Quiz 5: Was ist ein HTML-Attribut?</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
          "action": [ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.1.js", [ "ccm.get", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" }, "1570789265712X9642190088642415" ] ]
        },
        {
          "image": "https://akless.github.io/akless/resources/images/treasure.png",
          "x": 790,
          "y": 600,
          "size": 30,
          "info": "<h3>Quiz 6: HTML-Tags und Attribute</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
          "action": [ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.1.js", [ "ccm.get", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" }, "1570789457374X9739707044209898" ] ]
        }
      ]
    },
    "image": "https://akless.github.io/akless/resources/images/goldgrotte.png",
    "info": "<h3>Expedition Goldgrotte</h3><p>Der Forschungsdrang hat dich zu einer Goldgrotte geführt, in der es 6 Schätze zu entdecken gibt. Jeder Schatz enthält ein Quiz.</p>"
  }

};
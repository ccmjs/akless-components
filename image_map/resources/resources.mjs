/**
 * @overview data-based resources of ccmjs-based web component for an image map
 * @author André Kless <andre.kless@web.de> 2022
 * @license The MIT License (MIT)
 */

/**
 * example for image, info and areas data
 * @type {Object}
 */
const example = {
  "areas": [
    {
      "image": "https://akless.github.io/akless/resources/images/treasure.png",
      "x": 240,
      "y": 460,
      "size": 30,
      "info": "<h3>Quiz 1: Was ist HTML?</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
      "app": "https://ccmjs.github.io/akless-components/dms/app.html?app=quiz,1581493641369X7741789624303226"
    },
    {
      "image": "https://akless.github.io/akless/resources/images/treasure.png",
      "x": 940,
      "y": 270,
      "size": 30,
      "info": "<h3>Quiz 2: Erste 'Hallo Welt!'-Webseite</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
      "app": "https://ccmjs.github.io/akless-components/dms/app.html?app=quiz,1570790042636X6007448809895479"
    },
    {
      "image": "https://akless.github.io/akless/resources/images/treasure.png",
      "x": 410,
      "y": 880,
      "size": 30,
      "info": "<h3>Quiz 3: Was ist ein HTML-Tag?</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
      "app": "https://ccmjs.github.io/akless-components/dms/app.html?app=quiz,1570780952206X867147145335694",
    },
    {
      "image": "https://akless.github.io/akless/resources/images/treasure.png",
      "x": 100,
      "y": 820,
      "size": 30,
      "info": "<h3>Quiz 4: HTML-Grundgerüst</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
      "app": "https://ccmjs.github.io/akless-components/dms/app.html?app=quiz,1570786190915X9305013258816224"
    },
    {
      "image": "https://akless.github.io/akless/resources/images/treasure.png",
      "x": 740,
      "y": 770,
      "size": 30,
      "info": "<h3>Quiz 5: Was ist ein HTML-Attribut?</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
      "app": "https://ccmjs.github.io/akless-components/dms/app.html?app=quiz,1570789265711X24350815479118437"
    },
    {
      "image": "https://akless.github.io/akless/resources/images/treasure.png",
      "x": 790,
      "y": 600,
      "size": 30,
      "info": "<h3>Quiz 6: HTML-Tags und Attribute</h3><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
      "app": "https://ccmjs.github.io/akless-components/dms/app.html?app=quiz,1570789457373X2851937579430084"
    }
  ],
  "image": "https://akless.github.io/akless/resources/images/goldgrotte.png",
  "info": "<h3>Expedition Goldgrotte</h3><p>Der Forschungsdrang hat dich zu einer Goldgrotte geführt, in der es 6 Schätze zu entdecken gibt. Jeder Schatz enthält ein Quiz zum Thema HTML.</p>"
}

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "css.1": "./../image_map/resources/styles.css",
  "image": example.image,
  "info": example.info,
  "helper.1": "./../modules/helper.mjs",
  "html.1": "./../image_map/resources/templates.html",
  "ignore": {
    "areas": example.areas
  },
  "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
  "onchange": event => console.log( 'onchange', event ),
  "onmouseout": event => console.log( 'onmouseout', event ),
  "onmouseover": event => console.log( 'onmouseover', event ),
  "onrender": event => console.log( 'onrender', event ),
  "onstart": event => console.log( 'onstart', event ),
  "preclick": event => { console.log( 'preclick', event ); return true; }
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "back": "← Zurück zur Karte",
  "ignore": {
    "areas": example.areas
  },
  "image": example.image,
  "info": example.info
};

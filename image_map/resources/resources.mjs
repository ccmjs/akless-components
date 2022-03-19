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
  "image": "https://akless.github.io/akless/resources/images/goldgrotte.png",
  "info": "<h5>Expedition Goldgrotte</h5><p>Der Forschungsdrang hat dich zu einer Goldgrotte geführt, in der es 6 Schätze zu entdecken gibt. Jeder Schatz enthält ein Quiz zum Thema HTML.</p>",
  "areas": [
    {
      "app": "https://ccmjs.github.io/akless-components/dms/app.html?app=quiz,1581493641369X7741789624303226",
      "image": "https://akless.github.io/akless/resources/images/treasure.png",
      "info": "<h6>Quiz 1: Was ist HTML?</h6><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
      "size": 30,
      "x": 240,
      "y": 460
    },
    {
      "app": "https://ccmjs.github.io/akless-components/dms/app.html?app=quiz,1570790042636X6007448809895479",
      "image": "https://akless.github.io/akless/resources/images/treasure.png",
      "info": "<h6>Quiz 2: Erste 'Hallo Welt!'-Webseite</h6><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
      "size": 30,
      "x": 940,
      "y": 270
    },
    {
      "app": "https://ccmjs.github.io/akless-components/dms/app.html?app=quiz,1570780952206X867147145335694",
      "image": "https://akless.github.io/akless/resources/images/treasure.png",
      "info": "<h6>Quiz 3: Was ist ein HTML-Tag?</h6><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
      "size": 30,
      "x": 410,
      "y": 880
    },
    {
      "app": "https://ccmjs.github.io/akless-components/dms/app.html?app=quiz,1570786190915X9305013258816224",
      "image": "https://akless.github.io/akless/resources/images/treasure.png",
      "info": "<h6>Quiz 4: HTML-Grundgerüst</h6><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
      "size": 30,
      "x": 100,
      "y": 820
    },
    {
      "app": "https://ccmjs.github.io/akless-components/dms/app.html?app=quiz,1570789265711X24350815479118437",
      "image": "https://akless.github.io/akless/resources/images/treasure.png",
      "info": "<h6>Quiz 5: Was ist ein HTML-Attribut?</h6><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
      "size": 30,
      "x": 740,
      "y": 770
    },
    {
      "app": "https://ccmjs.github.io/akless-components/dms/app.html?app=quiz,1570789457373X2851937579430084",
      "image": "https://akless.github.io/akless/resources/images/treasure.png",
      "info": "<h6>Quiz 6: HTML-Tags und Attribute</h6><p>Klicke auf den Schatz um den Quiz zu starten.</p>",
      "size": 30,
      "x": 790,
      "y": 600
    }
  ]
}

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "css": [ "ccm.load",
    [
      "./../libs/bootstrap-5/css/bootstrap.css",
      "./../image_map/resources/styles.css"
    ],
    { "url": "./../libs/bootstrap-5/css/bootstrap-fonts.min.css", "context": "head" }
  ],
  "image": example.image,
  "info": example.info,
  "helper.1": "./../modules/helper.mjs",
  "html.1": "./../image_map/resources/templates.html",
  "ignore": {
    "areas": example.areas
  },
  "libs": [ "ccm.load", [
    "./../libs/bootstrap-5/js/popper.js",
    "./../libs/bootstrap-5/js/bootstrap.bundle.js"
  ] ],
  //"logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
  //"onchange": event => console.log( 'onchange', event ),
  //"onmouseout": event => console.log( 'onmouseout', event ),
  //"onmouseover": event => console.log( 'onmouseover', event ),
  //"onrender": event => console.log( 'onrender', event ),
  //"onstart": event => console.log( 'onstart', event ),
  //"preclick": event => { console.log( 'preclick', event ); return true; }
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "ignore": {
    "areas": example.areas
  },
  "image": example.image,
  "info": example.info
};

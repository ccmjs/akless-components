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
    "data": [ "ccm.get", "https://akless.github.io/akless-components/image_map/resources/resources.js", "data" ]
  },

  /** demo data */
  "data": {
    "image": "https://akless.github.io/akless/resources/images/goldgrotte.png",
    "width": 1000,
    "height": 600,
    "areas": [
      {
        "image": "https://akless.github.io/akless/resources/images/sheep.jpg",
        "x": 300,
        "y": 100,
        "width": 50,
        "height": 50,
        "info": "<h3>Headline B</h3><p>Description B</p>",
        "action": [ "ccm.instance", "https://ccmjs.github.io/akless-components/cloze/ccm.cloze.js" ]
      },
      {
        "image": "https://akless.github.io/akless/resources/images/seal.jpg",
        "x": 620,
        "y": 280,
        "width": 50,
        "height": 50,
        "info": "<h3>Headline C</h3><p>Description C</p>",
        "action": [ "alert", "Hello, Seal!" ]
      }
    ],
    "info": "<h3>Headline A</h3><p>Description A</p>"
  }

};
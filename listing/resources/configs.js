/**
 * @overview configurations of ccm component for a listing
 * @author André Kless <andre.kless@web.de> 2018-2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "css.1": "../listing/resources/demo.css",
    "data": {
      "entries": [
        {
          "color": "red",
          "title": "Color: Red",
          "subtitle": "First RGB part"
        },
        {
          "color": "green",
          "title": "Color: Green",
          "subtitle": "Second RGB part"
        },
        {
          "color": "blue",
          "title": "Color: Blue",
          "subtitle": "Third RGB part"
        },
        {}
      ]
    },
    "defaults": { "color": "black", "title": "Color: Black", "subtitle": "This is the default color" },
    "helper.1": "../modules/helper.mjs",
    "html.1": "../listing/resources/demo.html",
    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js", {
      "active": "en",
      "translations": {
        "de": {
          "flag": "https://ccmjs.github.io/tkless-components/lang/resources/de.svg",
          "topic": "Demo-Auflistung"
        },
        "en": {
          "flag": "https://ccmjs.github.io/tkless-components/lang/resources/en.svg",
          "topic": "Demo Listing"
        }
      }
    } ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onchange": event => alert( 'You have clicked on ' + event.data.title ),
    "reload": true,
    "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/resources.js", "local" ] ]
  },

  "demo": {
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/listing/resources/demo.css" ],
    "data": {
      "entries": [
        {
          "color": "red",
          "title": "Color: Red",
          "subtitle": "First RGB part"
        },
        {
          "color": "green",
          "title": "Color: Green",
          "subtitle": "Second RGB part"
        },
        {
          "color": "blue",
          "title": "Color: Blue",
          "subtitle": "Third RGB part"
        },
        {}
      ]
    },
    "defaults": { "color": "black", "title": "Color: Black", "subtitle": "This is the default color" },
    "html.1": "https://ccmjs.github.io/akless-components/listing/resources/demo.html",
    "onclick": event => alert( 'You have clicked on ' + event.data.title )
  }

};
/**
 * @overview configurations of ccm component for a listing
 * @author André Kless <andre.kless@web.de> 2018-2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
    "html": {
      "main": {
        "inner": [
          { "id": "lang" },
          {
            "tag": "h3",
            "data-lang": "topic",
            "inner": "Demo Listing"
          },
          { "id": "entries" }
        ]
      },
      "entry": {
        "class": "entry",
        "inner": [
          {
            "class": "left",
            "style": "background-color:%color%"
          },
          {
            "class": "right",
            "inner": [
              {
                "class": "title",
                "inner": "%title%"
              },
              {
                "class": "subtitle",
                "inner": "%subtitle%"
              }
            ]
          }
        ]
      }
    },
    "css": [ "ccm.load", "../listing/resources/demo.css" ],
    "data": [
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
      }
    ],
    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/ccm.lang.js", {
      "active": "de",
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
    "defaults": { "color": "black", "title": "Color: Black", "subtitle": "This is a default subtitle" },
    "onclick": event => alert( 'You have clicked on ' + event.data.title )
  },

  "demo": {
    "key": "demo",
    "html": {
      "main": {
        "inner": [
          {
            "tag": "h3",
            "inner": "Demo Listing"
          },
          { "id": "entries" }
        ]
      },
      "entry": {
        "class": "entry",
        "inner": [
          {
            "class": "left",
            "style": "background-color:%color%"
          },
          {
            "class": "right",
            "inner": [
              {
                "class": "title",
                "inner": "%title%"
              },
              {
                "class": "subtitle",
                "inner": "%subtitle%"
              }
            ]
          }
        ]
      }
    },
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/listing/resources/demo.css" ],
    "data": [
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
    ],
    "defaults": { "color": "black", "title": "Color: Black", "subtitle": "This is a default subtitle" },
    "onclick": event => alert( 'You have clicked on ' + event.data.title )
  }

};
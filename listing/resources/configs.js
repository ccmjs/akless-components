/**
 * @overview configurations of ccm component for a listing
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "demo": {
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
    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
    "defaults": { "color": "black", "title": "Color: Black", "subtitle": "This is a default subtitle" },
    "onclick": ( event, element, data ) => alert( 'You have clicked on ' + data.title )
  }

};
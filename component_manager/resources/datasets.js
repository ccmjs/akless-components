/**
 * @overview datasets of ccm component for component manager
 * @author André Kless <andre.kless@web.de> 2018
 * @license MIT License
 */

ccm.files[ 'datasets.js' ] = {
  "cloze": {
    "key": "cloze",
    "title": "Fill-in-the-Blank Text",
    "abstract": "For rendering a fill-in-the-blank text.",
    "description": "The component supports solution hints, visual feedback, point allocation, time limitation, different layouts, authentication procedures, customization of buttons and learning analysis.",
    "url": "../cloze/ccm.cloze.js",
    "version": "5.0.0",
    "developer": "André Kless",
    "license": "MIT License",
    "website": "https://github.com/ccmjs/akless-components/",
    "ignore": {
      "demos": [
        {
          "title": "Business English Exercise",
          "config": [ "ccm.get", "../cloze/resources/configs.js", "local" ]
        }
      ],
      "builder": [
        {
          "url": "../cloze_builder/ccm.cloze_builder.js",
          "config": { "submit_button": false }
        }
      ]
    }
  }
};
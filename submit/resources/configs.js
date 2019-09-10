/**
 * @overview configurations of ccm component for submitting data
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
//  "inner": [ "ccm.load", { "url": "../submit/resources/demo.html", "type": "data" } ],
    "entries": [ "ccm.get", "../submit/resources/datasets.js", "demo.data" ],
    "css": [ "ccm.load",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
      "../libs/bootstrap/css/bootstrap.css",
      "../submit/resources/default.css"
    ],
    "data": {
      "store": [ "ccm.store", "../submit/resources/datasets.js" ],
      "key": "test"
    },
    "content": [ "ccm.component", "../content/ccm.content.js" ],
    "json_builder": [ "ccm.component", "../json_builder/ccm.json_builder.js", {
      "html.inner.1": "",
      "directly": true
    } ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onchange": function ( event ) { console.log( this.index, 'onchange', this.getValue(), event ) },
    "onfinish": { "log": true }
  },

  "localhost": {
    "key": "localhost",
//  "inner": [ "ccm.load", { "url": "../submit/resources/demo.html", "type": "data" } ],
    "entries": [ "ccm.get", "../submit/resources/datasets.js", "demo.data" ],
    "css": [ "ccm.load",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
      "../libs/bootstrap/css/bootstrap.css",
      "../submit/resources/default.css"
    ],
    "data": {
      "store": [ "ccm.store", { "name": "submit", "url": "http://localhost:8080" } ],
      "key": "test"
    },
    "content": [ "ccm.component", "../content/ccm.content.js" ],
    "json_builder": [ "ccm.component", "../json_builder/ccm.json_builder.js", {
      "html.inner.1": "",
      "directly": true
    } ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onfinish": {
      "log": true,
      "store": true,
      "alert": "Saved!"
    }
  },

  "demo": {
    "key": "demo",
//  "inner": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/submit/resources/demo.html", "type": "data" } ],
    "entries": [ "ccm.get", "https://ccmjs.github.io/akless-components/submit/resources/datasets.js", "demo.data" ],
    "data": {
      "store": [ "ccm.store", { "name": "submit_data", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.1.js" ],
    "json_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.2.0.js", {
      "html.inner.1": "",
      "directly": true
    } ],
    "onfinish": {
      "store": true,
      "alert": "Saved!"
    }
  },

  "app_meta": {
    "entries": [
      "<div class='page-header'><h3>Edit of App Information</h3></div>",
      "<div class='well'>The more information about your app you type here, the better your app can be found by others.</div>",
      {
        "label": "<span style='color:red'>*</span>Title",
        "name": "title",
        "type": "text",
        "info": "Title of the app. As understandable and short as possible.",
        "placeholder": "Digital Makerspace",
        "required": true,
        "maxlength": 35
      },
      {
        "label": "Icon",
        "name": "icon",
        "type": "url",
        "info": "The icon file must be accessible via a public URL on the web and is ideally a 64x64 SVG file. The icon will be published under the <a href='https://creativecommons.org/share-your-work/public-domain/cc0/' target='_blank'>CC0 license</a>. Make sure the icon is compatible with this license.",
        "placeholder": "https://ccmjs.github.io/akless-components/dms/resources/component.png"
      },
      {
        "label": "Abstract",
        "name": "subject",
        "type": "text",
        "info": "A short description of your app. Ideally in title case",
        "placeholder": "Provides Components for Creating Apps.",
        "maxlength": 70
      },
      {
        "label": "Description",
        "name": "description",
        "type": "textarea",
        "info": "A detailed description of your app. Try to make as understandable as possible what you can do with the help of your app.",
        "placeholder": "Component developers can publish, find, try, and rate components, and app creators can create their own apps from components without programming skills. With the built-in App Store, the created apps can be found, tried, rated, reused and shared by others. Everything in this Digital Makerspace is free software and all content is public domain."
      },
      {
        "label": "Category",
        "name": "category",
        "type": "text",
        "info": "What kind of app is it? Define the category that best fits the context of your app.",
        "placeholder": "Makerspace",
        "maxlength": 35
      },
      {
        "label": "Tags",
        "type": "several",
        "info": "Here you can define any tags through which your app can be found. Only one tag per input field. Via +/- you can add/remove additional input fields.",
        "item": {
          "name": "tags",
          "type": "text"
        }
      },
      {
        "label": "Language",
        "name": "language",
        "type": "multi-checkbox",
        "info": "Which languages ​​are supported by the app? Choose multiple languages ​​if the app supports multilingualism.",
        "items": [
          {
            "label": "English",
            "value": "en"
          },
          {
            "label": "German",
            "value": "de"
          }
        ]
      },
      "<div class='well'><p>I agree that all software of my app is released as free software under the <a href='https://en.wikipedia.org/wiki/MIT_License' target='_blank'>MIT license</a>.</p><p>I agree that all content of my app will be released as public domain under the <a href='https://creativecommons.org/share-your-work/public-domain/cc0/' target='_blank'>CC0 license</a>.</p>I confirm that this does not violate the copyright of third parties.</div>",
      {
        "label": "<span style='color:red'>*</span>I Agree",
        "type": "checkbox",
        "info": "Everything in a Digital Makerspace is free software and all content is public domain. So you can only publish anything if this requirement is fulfilled.",
        "required": true
      },
      { "type": "submit" }
    ]
  }

};
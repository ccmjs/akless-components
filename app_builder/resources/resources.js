/**
 * @overview data-based resources of ccm component for app creation
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "app": [ "ccm.component", "../json_builder/ccm.json_builder.js", {
      "css": [ "ccm.load", "../json_builder/resources/default.css" ]
    } ],
    "builder": [ "ccm.component", "../json_builder/ccm.json_builder.js", {
      "css": [ "ccm.load", "../json_builder/resources/default.css" ],
      "directly": true,
      "nosubmit": true
    } ],
    "css": [ "ccm.load",
      "../app_builder/resources/styles.css",
      "../libs/bootstrap-4/css/bootstrap.min.css",
      { "context": "head", "url": "../libs/bootstrap-4/css/bootstrap.min.css" }
    ],
    "data": {
      "store": [ "ccm.store", { "url": "http://localhost:8080", "name": "test-configs" } ]
    },
    "form": [ "ccm.component", "../submit/ccm.submit.js", {
      "css": [ "ccm.load",
        { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
        "../libs/bootstrap/css/bootstrap.css",
        "../submit/resources/default.css"
      ],
      "entries": [ "ccm.get", "../app_builder/resources/resources.js", "form_entries" ],
      "data": {
        "store": [ "ccm.store", { "name": "test-apps", "url": "http://localhost:8080" } ]
      }
    } ],
    "handover_app.1": "../handover_app/ccm.handover_app.js",
    "html.1": "../app_builder/resources/templates.html",
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "meta_store": [ "ccm.store", { "url": "http://localhost:8080", "name": "test-apps" } ],
    "onchange": ( instance, event ) => { console.log( event, instance.getValue() ); },
    "user": [ "ccm.start", "../user/ccm.user.js", {
      "realm": "cloud",
      "url": "http://localhost:8080",
      "store": "test-user",
      "hash": [ "ccm.load", { "url": "../modules/md5.mjs", "type": "module" } ],
      "css": [ "ccm.load",
        "../libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
        "../user/resources/default.css"
      ],
      "html.1": "../user/resources/resources.js"
    } ],
    "warning": "Are you sure you want to delete this App?"
  },

  "demo": {
    "data": {
      "store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "test-configs" } ]
    },
    "form": [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.3.js", {
      "entries": [ "ccm.get", "https://ccmjs.github.io/akless-components/app_builder/resources/resources.js", "form_entries" ],
      "data": {
        "store": [ "ccm.store", { "name": "test-apps", "url": "https://ccm2.inf.h-brs.de" } ]
      }
    } ],
    "meta_store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "test-apps" } ],
    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
      "hash": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/md5.mjs", "type": "module" } ],
      "realm": "cloud",
      "store": "test-user",
      "url": "https://ccm2.inf.h-brs.de"
    } ]
  },

  "form_entries": [
    "<div class='page-header'><h3>Publish App</h3></div>",
    "<div class='well'>Publishing the app makes it visible to others and can be used anywhere on the web. The more metadata you enter here, the better your app can be found by others.</div>",
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
      "placeholder": "Maker Space",
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
      "type": "radio",
      "info": "In what language are the contents of the app?",
      "items": [
        {
          "label": "English",
          "value": "en",
          "checked": true
        },
        {
          "label": "German",
          "value": "de"
        }
      ]
    },
    "<div class='well'><p>I agree that all content of my app will be released as public domain under the <a href='https://creativecommons.org/share-your-work/public-domain/cc0/' target='_blank'>CC0 license</a>.</p>I confirm that this does not violate the copyright of third parties.</div>",
    {
      "label": "<span style='color:red'>*</span>I Agree",
      "type": "checkbox",
      "info": "Everything in a Digital Makerspace is free software and all content is public domain. So you can only publish anything if this requirement is fulfilled.",
      "required": true
    },
    { "type": "submit" }
  ]

};

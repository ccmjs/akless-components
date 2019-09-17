/**
 * @overview configurations of ccm component for submitting data
 * @author André Kless <andre.kless@web.de> 2018-2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  /** test (relative paths) */
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

  /** test with localhost (relative paths) */
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

  /** demo */
  "demo": {
    "key": "demo",
//  "inner": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/submit/resources/demo.html", "type": "data" } ],
    "entries": [ "ccm.get", "https://ccmjs.github.io/akless-components/submit/resources/datasets.js", "demo.data" ],
    "data": {
      "store": [ "ccm.store", { "name": "submit_data", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.3.1.js" ],
    "json_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.4.1.js", {
      "html.inner.1": "",
      "directly": true
    } ],
    "onfinish": {
      "store": true,
      "alert": "Saved!"
    }
  },

  /** edit of app metadata */
  "app_meta_edit": {
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
  },

  /** create of app metadata */
  "app_meta_create": {
    "entries": [
      "<div class='page-header'><h3>Publish App</h3></div>",
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
      "<div class='well'><p>I agree that all software of my app is released as free software under the <a href='https://en.wikipedia.org/wiki/MIT_License' target='_blank'>MIT license</a>.</p><p>I agree that all content of my app will be released as public domain under the <a href='https://creativecommons.org/share-your-work/public-domain/cc0/' target='_blank'>CC0 license</a>.</p>I confirm that this does not violate the copyright of third parties.</div>",
      {
        "label": "<span style='color:red'>*</span>I Agree",
        "type": "checkbox",
        "info": "Everything in a Digital Makerspace is free software and all content is public domain. So you can only publish anything if this requirement is fulfilled.",
        "required": true
      },
      { "type": "submit" }
    ]
  },

  /** edit of component metadata */
  "component_meta_edit": {
    "entries": [
      "<div class='page-header'><h3>Edit of Published Component</h3></div>",
      "<div class='well'>The more information about the published component you type here, the better your component can be found and reused by others.</div>",
      {
        "label": "<span style='color:red'>*</span>Title",
        "name": "title",
        "type": "text",
        "info": "Title of the component. As understandable and short as possible.",
        "placeholder": "Digital Makerspace",
        "required": true,
        "maxlength": 35
      },
      {
        "label": "<span style='color:red'>*</span>URL",
        "name": "path",
        "type": "url",
        "info": "Your component file must be accessible via a public URL on the web. Most developers use <a href='https://pages.github.com/' target='_blank'>GitHub Pages</a> for this. For the transparency please do not publish minimized code. Never publish the latest version of your component, but always a concrete version whose code does not change anymore.",
        "placeholder": "https://ccmjs.github.io/akless-components/dms/versions/ccm.dms-2.0.0.js",
        "required": true,
        "pattern": ".+/ccm\\.([a-z][a-z0-9_]*)(-(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*))(\\.js)$",
        "title": "The filename of the component must start with 'ccm.' followed by the unique component name and then a '-' followed by the component version number and a '.js' in the end. Example: ccm.dms-1.0.0.js"
      },
      {
        "label": "<span style='color:red'>*</span>SRI Hash",
        "name": "sri",
        "type": "text",
        "info": "To guarantee that the code of your component does not change, we need the component's so-called SRI hash. The required SRI hash can be generated via a <a href='https://www.srihash.org/' target='_blank'>free online tool</a>. More information can be found on the Web under the keyword <a href='https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity' target='_blank'>Subresource Integrity</a>.",
        "placeholder": "sha384-eBCG79vlakZs8qCC6yARu2oQSMB946XWO/x4uhwpGFl9AQZllpXZdqGq/3f2Mu9N",
        "required": true,
        "pattern": "sha384-.+",
        "title": "An SRI hash always starts with \"sha384-\"."
      },
      {
        "label": "Icon",
        "name": "icon",
        "type": "url",
        "info": "The icon file must be accessible via a public URL on the web and is ideally a 64x64 SVG file. The icon will be published under the <a href='https://creativecommons.org/share-your-work/public-domain/cc0/' target='_blank'>CC0 license</a>. Make sure the icon is compatible with this license.",
        "placeholder": "https://ccmjs.github.io/akless-components/dms/resources/img/component.png"
      },
      {
        "label": "Abstract",
        "name": "subject",
        "type": "text",
        "info": "A short description of your component. Ideally in title case",
        "placeholder": "Provides Components for Creating Apps.",
        "maxlength": 70
      },
      {
        "label": "Description",
        "name": "description",
        "type": "textarea",
        "info": "A detailed description of your component. Try to make as understandable as possible what kind of apps you can create with the help of your component.",
        "placeholder": "Enables you to create your own Digital Makerspace, where component developers can publish, find, try, and rate components, and app creators can create their own apps from components without programming skills. With the built-in App Store, the created apps can be found, tried, rated, reused and shared by others. Everything in a Digital Makerspace is free software and all content is public domain."
      },
      {
        "label": "Category",
        "name": "category",
        "type": "radio",
        "info": "What kind of component is it? Choose the category that best fits the type of your component.<br>In the case of <code>App Creation</code>, the component is provided as a digital tool for creating apps.<br>The component can be used as an <code>Configuration Builder</code> if an app created from the component can be used to create an app configuration.<br>A <code>Utility</code> component is not for creating apps, but provides useful functionality that can be optionally used by other apps.",
        "items": [
          {
            "label": "App Creation",
            "value": "App Creation",
            "checked": true
          },
          {
            "label": "Configuration Builder",
            "value": "Configuration Builder"
          },
          {
            "label": "Utility",
            "value": "Utility"
          }
        ]
      },
      {
        "label": "Tags",
        "type": "several",
        "info": "Here you can define any tags through which your component can be found. Only one tag per input field. Via +/- you can add/remove additional input fields.",
        "item": {
          "name": "tags",
          "type": "text"
        }
      },
      {
        "label": "Demos",
        "name": "demos",
        "type": "several",
        "info": "Enter your own title and app ID for each app to be demo-listed. Only one value per input field. Via +/- you can add/remove additional input fields.",
        "items": [
          {
            "label": "Title",
            "name": "title",
            "type": "text",
            "info": "Title of the demo in the demo menu.",
            "required": true
          },
          {
            "label": "App ID",
            "name": "app",
            "type": "text",
            "info": "App ID of the app created from this component to be used as a demo.",
            "pattern": "[a-zA-Z0-9_-]+",
            "title": "An App ID can only contain letters, numbers, and no special characters except \"-\" and \"_\".",
            "required": true
          }
        ]
      },
      {
        "label": "Builders",
        "name": "builders",
        "type": "several",
        "info": "Enter the title, component index, and app ID for each builder app to be listed in the app creation section of the builder menu. Only one value per input field. Via +/- you can add/remove additional input fields.",
        "items": [
          {
            "label": "Title",
            "name": "title",
            "type": "text",
            "info": "Title of the builder app in the builder menu of the app creation section.",
            "required": true
          },
          {
            "label": "Component Index",
            "name": "component",
            "type": "text",
            "info": "Index of the component from which the builder app is created. How to know the index? The index can be found in the overview section of the component.",
            "placeholder": "json_builder-1-4-1",
            "required": true,
            "pattern": "([a-z][a-z0-9_]*)(-(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*))",
            "title": "The index of a component starts with the unique component name and then a '-' followed by the component version number. Example: json_builder-1.4.1"
          },
          {
            "label": "App ID",
            "name": "app",
            "type": "text",
            "info": "App ID of the builder app to be used for app creation.",
            "placeholder": "1559859507011X17772030423968155",
            "pattern": "[a-zA-Z0-9_-]+",
            "title": "An App ID can only contain letters, numbers, and no special characters except \"-\" and \"_\".",
            "required": true
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
  },

  /** create of component metadata */
  "component_meta_create": {
    "entries": [
      "<div class='page-header'><h3>Publish Component</h3></div>",
      "<div class='well'>Are you a component developer? Have you developed a useful component that you would like to offer to the world? Great! Then you can use this form to publish your component. The more information about the published component you type here, the better your component can be found and reused by others.</div>",
      {
        "label": "<span style='color:red'>*</span>Title",
        "name": "title",
        "type": "text",
        "info": "Title of the component. As understandable and short as possible.",
        "placeholder": "Digital Makerspace",
        "required": true,
        "maxlength": 35
      },
      {
        "label": "<span style='color:red'>*</span>URL",
        "name": "path",
        "type": "url",
        "info": "Your component file must be accessible via a public URL on the web. Most developers use <a href='https://pages.github.com/' target='_blank'>GitHub Pages</a> for this. For the transparency please do not publish minimized code. Never publish the latest version of your component, but always a concrete version whose code does not change anymore.",
        "placeholder": "https://ccmjs.github.io/akless-components/dms/versions/ccm.dms-2.0.0.js",
        "required": true,
        "pattern": ".+/ccm\\.([a-z][a-z0-9_]*)(-(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*))(\\.js)$",
        "title": "The filename of the component must start with 'ccm.' followed by the unique component name and then a '-' followed by the component version number and a '.js' in the end. Example: ccm.dms-1.0.0.js"
      },
      {
        "label": "<span style='color:red'>*</span>SRI Hash",
        "name": "sri",
        "type": "text",
        "info": "To guarantee that the code of your component does not change, we need the component's so-called SRI hash. The required SRI hash can be generated via a <a href='https://www.srihash.org/' target='_blank'>free online tool</a>. More information can be found on the Web under the keyword <a href='https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity' target='_blank'>Subresource Integrity</a>.",
        "placeholder": "sha384-eBCG79vlakZs8qCC6yARu2oQSMB946XWO/x4uhwpGFl9AQZllpXZdqGq/3f2Mu9N",
        "required": true,
        "pattern": "sha384-.+",
        "title": "An SRI hash always starts with \"sha384-\"."
      },
      {
        "label": "Icon",
        "name": "icon",
        "type": "url",
        "info": "The icon file must be accessible via a public URL on the web and is ideally a 64x64 SVG file. The icon will be published under the <a href='https://creativecommons.org/share-your-work/public-domain/cc0/' target='_blank'>CC0 license</a>. Make sure the icon is compatible with this license.",
        "placeholder": "https://ccmjs.github.io/akless-components/dms/resources/img/component.png"
      },
      {
        "label": "Abstract",
        "name": "subject",
        "type": "text",
        "info": "A short description of your component. Ideally in title case",
        "placeholder": "Provides Components for Creating Apps.",
        "maxlength": 70
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
/**
 * @overview data-based resources of ccm component for digital maker space
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (02.07.2019)
 */

ccm.files[ 'resources.js' ] = {

  "config": {
    "component_manager": [ "ccm.component", "../component_manager/ccm.component_manager.js", [ "ccm.get", "../component_manager/resources/resources.js", "config" ] ],
    "data": {
      "store": [ "ccm.store", { "name": "dms-components", "url": "http://localhost:8080" } ],
      "key": {}
    },
    "form": [ "ccm.component", "../submit/ccm.submit.js", [ "ccm.get", "../dms/resources/resources.js", "form" ] ],
    "ignore": {
      "apps": [ "ccm.store", { "url": "http://localhost:8080", "name": "dms-apps" } ],
      "configs": [ "ccm.store", { "url": "http://localhost:8080", "name": "dms-configs" } ]
    },
    "listing": [ "ccm.component", "../listing/ccm.listing.js", [ "ccm.get", "../dms/resources/resources.js", "listing" ] ],
    "logger":  [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "logo": "../dms/resources/component.png",
    "rating": [ "ccm.component", "https://ccmjs.github.io/tkless-components/star_rating_result/versions/ccm.star_rating_result-4.0.0.js", [ "ccm.get", "../dms/resources/resources.js", "rating" ] ],
    "routing": [ "ccm.instance", "../routing/ccm.routing.js", { "app": "1558991174991X7210065203607523" } ],
    "user": [ "ccm.start", "../user/ccm.user.js", [ "ccm.get", "../dms/resources/resources.js", "user" ] ]
  },

  "form": {
    "css": [ "ccm.load",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
      "../libs/bootstrap/css/bootstrap.css",
      "../submit/resources/default.css"
    ],
    "entries": [ "ccm.get", "../dms/resources/resources.js", "form_entries" ],
    "data": {
      "store": [ "ccm.store", { "name": "dms-components", "url": "http://localhost:8080" } ]
    }
  },

  "form_entries": [
    "<div class='page-header'><h3>Publish Component</h3></div>",
    "<div class='well'>Are you a component developer? Have you developed a useful component that you would like to offer to the world? Great! Then you can use this form to publish your component. The more metadata you enter here, the better your component can be found by others.</div>",
    {
      "label": "<span style='color:red'>*</span>Title",
      "name": "title",
      "type": "text",
      "info": "Title of the component. As understandable and short as possible.",
      "placeholder": "Digital Maker Space",
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
      "placeholder": "https://ccmjs.github.io/akless-components/dms/resources/component.png"
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
      "placeholder": "Enables you to create your own Digital Maker Space, where component developers can publish, find, try, and rate components, and app creators can create their own apps from components without programming skills. With the built-in App Store, the created apps can be found, tried, rated, reused and shared by others. Everything in a Digital Maker Space is free software and all content is public domain."
    },
    {
      "label": "Category",
      "name": "category",
      "type": "radio",
      "info": "What kind of component is it? Choose the category that best fits the type of your component.<br>In the case of <code>App Creation</code>, the component is provided as a digital tool for creating apps.<br>The component can be used as an <code>App Builder</code> if an app created from the component can be used to create an app configuration.<br>A <code>Utility</code> component is not for creating apps, but provides useful functionality that can be optionally used by other apps.",
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
    "<div class='well'><p>I agree that the component will be released as free software under the <a href='https://en.wikipedia.org/wiki/MIT_License' target='_blank'>MIT license</a>.</p><p>I also agree that the icon (if specified) will be released as public domain under the <a href='https://creativecommons.org/share-your-work/public-domain/cc0/' target='_blank'>CC0 license</a>.</p>I confirm that this does not violate the copyright of third parties.</div>",
    {
      "label": "<span style='color:red'>*</span>I Agree",
      "type": "checkbox",
      "info": "Everything in a Digital Maker Space is free software and all content is public domain. So you can only publish anything if this requirement is fulfilled.",
      "required": true
    },
    { "type": "submit" }
  ],

  "html": {
    "main": {
      "id": "main",
      "inner": [
        {
          "id": "header",
          "inner": [
            {
              "id": "brand",
              "inner": [
                {
                  "id": "logo",
                  "inner": {
                    "tag": "img",
                    "src": "%logo%"
                  }
                },
                {
                  "id": "title",
                  "inner": {
                    "tag": "span",
                    "inner": "%title%"
                  }
                }
              ]
            },
            { "id": "menu" },
            { "id": "user" }
          ]
        },
        { "id": "content" }
      ]
    }
  },

  "listing": {
    "html": [ "ccm.get", "../dms/resources/resources.js", "listing_html" ],
    "css": [ "ccm.load",
      "../dms/resources/listing.css",
      "../libs/bootstrap-4/css/bootstrap.min.css",
      { "context": "head", "url": "../libs/bootstrap-4/css/bootstrap.min.css" }
    ],
    "defaults": {
      "icon": "../dms/resources/component.png",
      "subject": ""
    }
  },

  "listing_html": {
    "main": {
      "id": "entries",
      "class": "card-deck"
    },
    "entry": {
      "class": "card entry",
      "inner": [
        {
          "class": "card-header",
          "inner": [
            {
              "tag": "span",
              "inner": "&#9874;"
            },
            {
              "tag": "img",
              "class": "card-img-top",
              "src": "%icon%"
            },
            {
              "tag": "span",
              "inner": "&#9874;"
            }
          ]
        },
        {
          "class": "card-body",
          "inner": [
            {
              "tag": "h5",
              "class": "card-title",
              "inner": [
                {
                  "tag": "span",
                  "class": "title",
                  "inner": "%title%"
                }
              ]
            },
            {
              "tag": "p",
              "class": "creator",
              "inner": {
                "tag": "small",
                "class": "text-muted",
                "inner": "%creator%"
              }
            },
            {
              "tag": "p",
              "class": "card-text",
              "inner": "%subject%"
            },
            { "class": "rating" }
          ]
        }
      ]
    }
  },

  "menu": {
    "css": [ "ccm.load", "../menu/resources/text.css" ],
    "data": {
      "entries": [ "Home", "Apps", "Components", "Publish" ]
    },
    "selected": 3,
    "trigger_selected": true
  },

  "rating": {
    "ccm": "https://ccmjs.github.io/ccm/versions/ccm-20.7.2.js",
    "css": [ "ccm.load",
      { "context": "head", "url": "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" },
      "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css",
      "../dms/resources/rating_result.css"
    ],
    "data": {
      "store": [ "ccm.store", [ "ccm.get", { "name": "dms-component_ratings", "url": "http://localhost:8080" }, {} ] ]
    }
  },

  "user": {
    "realm": "cloud",
    "url": "http://localhost:8080",
    "store": "dms-user",
    "title": "Please enter username and password",
    "hash": [ "ccm.load", { "url": "../modules/md5.js", "type": "module" } ],
    "css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
      "../user/resources/default.css"
    ]
  }

};

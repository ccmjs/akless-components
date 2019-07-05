/**
 * @overview data-based resources of ccm component for managing a component
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (03.07.2019)
 */

ccm.files[ 'resources.js' ] = {

  "config": {
    "builder": [ "ccm.component", "../app_builder/ccm.app_builder.js", [ "ccm.get", "../app_builder/resources/resources.js", "config" ] ],
    "data": {
      "store": [ "ccm.store", { "name": "dms-components", "url": "http://localhost:8080" } ],
      "key": "json_builder-1-4-0"
    },
    "form": [ "ccm.component", "../submit/ccm.submit.js", [ "ccm.get", "../component_manager/resources/resources.js", "form" ] ],
    "ignore": {
      "apps": [ "ccm.store", { "url": "http://localhost:8080", "name": "dms-apps" } ],
      "configs": [ "ccm.store", { "url": "http://localhost:8080", "name": "dms-configs" } ]
    },
    "logger":  [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "routing": [ "ccm.instance", "../routing/ccm.routing.js", { "app": "1558991104746X06788207882716102" } ],
    "user": [ "ccm.start", "../user/ccm.user.js", [ "ccm.get", "../component_manager/resources/resources.js", "user" ] ]
  },

  "form": {
    "css": [ "ccm.load",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
      "../libs/bootstrap/css/bootstrap.css",
      "../submit/resources/default.css"
    ],
    "entries": [ "ccm.get", "../component_manager/resources/resources.js", "form_entries" ],
    "data": {
      "store": [ "ccm.store", { "name": "dms-components", "url": "http://localhost:8080" } ]
    },
    "builder": [ "ccm.component", "../json_builder/ccm.json_builder.js", { "directly": true, "nosubmit": true } ]
  },

  "form_entries": [
    "<div class='well'>Here you can make adjustments to your published component and also set demos and app builders.</div>",
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
      "info": "Your component file must be accessible via a public URL on the web. Most developers use <a href='https://pages.github.com/' target='_blank'>GitHub Pages</a> for this. For the transparency please do not publish minimized code. The component name and the version number can not be changed in the URL, only the path of the component can be adjusted.",
      "placeholder": "https://ccmjs.github.io/akless-components/dms/versions/ccm.dms-2.0.0.js",
      "required": true,
      "pattern": ".+/ccm\\.([a-z][a-z0-9_]*)(-(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*))(\\.js)",
      "title": "The filename of the component must start with 'ccm.' followed by the unique component name and then a '-' followed by the component version number and a '.js' in the end. Example: ccm.dms-2.0.0.js"
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
      "info": "What kind of component is it? Choose the category that best fits the type of your component.<br>In the case of <code>App Creation</code>, the component is provided as a digital tool for creating apps.<br>The component can be used as an <code>Configuration Builder</code> if an app created from the component can be used to create an app configuration.<br>A <code>Utility</code> component is not for creating apps, but provides useful functionality that can be optionally used by other apps.",
      "items": [
        {
          "label": "App Creation",
          "value": "App Creation"
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
      "info": "Enter the titles and app IDs of created apps to be listed as demos. Only one value per input field. Via +/- you can add/remove additional input fields.",
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
    /*
    {
      "label": "Builders",
      "name": "builders",
      "type": "several",
      "info": "Enter the titles, component URLs and app configurations to define builder apps that will to be listed as builders in the builder menu of the app creation section. Only one value per input field. Via +/- you can add/remove additional input fields.",
      "items": [
        {
          "label": "Title",
          "name": "title",
          "type": "text",
          "info": "Title of the builder app in the builder menu of the app creation section.",
          "required": true
        },
        {
          "label": "Component URL",
          "name": "component",
          "type": "url",
          "info": "URL of the component from which the builder app is created.",
          "placeholder": "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.4.1.js",
          "required": true,
          "pattern": ".+/ccm\\.([a-z][a-z0-9_]*)(-(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*))(\\.js)",
          "title": "The filename of the component must start with 'ccm.' followed by the unique component name and then a '-' followed by the component version number and a '.js' in the end. Example: ccm.json_builder-1.4.0.js"
        },
        {
          "label": "Configuration",
          "name": "app",
          "type": "builder",
          "info": "Configuration to be used to create the builder app out of the component."
        }
      ]
    },
    */
    "<div class='well'><p>I agree that the icon (if changed) will be released as public domain under the <a href='https://creativecommons.org/share-your-work/public-domain/cc0/' target='_blank'>CC0 license</a>.</p>I confirm that this does not violate the copyright of third parties.</div>",
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
      "tag": "div",
      "id": "main",
      "inner": [
        {
          "id": "header",
          "inner": [
            {
              "id": "icon",
              "inner": {
                "tag": "img",
                "src": "%icon%"
              }
            },
            {
              "inner": [
                {
                  "id": "title",
                  "inner": [
                    {
                      "tag": "h2",
                      "class": "text-monospace",
                      "inner": {
                        "tag": "span",
                        "inner": "%title%"
                      }
                    },
                    {
                      "tag": "button",
                      "id": "setup",
                      "class": "btn btn-light btn-sm",
                      "inner": [
                        {
                          "tag": "span",
                          "inner": "&#9881;"
                        },
                        {
                          "tag": "span",
                          "inner": "SETUP"
                        }
                      ],
                      "onclick": "%setup%"
                    }
                  ]
                },
                {
                  "id": "version",
                  "class": "text-muted",
                  "inner": [
                    "Version ",
                    {
                      "tag": "span",
                      "id": "version_number",
                      "inner": "%version%"
                    }
                  ]
                }
              ]
            },
            { "id": "user" }
          ]
        },
        { "id": "menu-top" },
        { "id": "content" }
      ]
    },
    "overview": {
      "id": "overview",
      "inner": [
        {
          "id": "info",
          "inner": [
            {
              "tag": "legend",
              "class": "text-muted",
              "inner": "INFO"
            },
            {
              "class": "blockquote-footer",
              "inner": [
                "Published by",
                {
                  "tag": "span",
                  "id": "creator",
                  "class": "text-success",
                  "inner": "%creator%"
                }
              ]
            },
            {
              "id": "subject",
              "class": "text-secondary",
              "inner": "%subject%"
            },
            {
              "tag": "p",
              "id": "description",
              "inner": "%description%"
            },
            {
              "id": "details",
              "inner": {
                "tag": "table",
                "class": "table table-sm small",
                "inner": [
                  {
                    "tag": "tr",
                    "inner": [
                      {
                        "tag": "td",
                        "inner": "Index"
                      },
                      {
                        "tag": "td",
                        "inner": "%index%"
                      }
                    ]
                  },
                  {
                    "tag": "tr",
                    "inner": [
                      {
                        "tag": "td",
                        "inner": "URL"
                      },
                      {
                        "tag": "td",
                        "inner": {
                          "tag": "a",
                          "href": "%path%",
                          "target": "_blank",
                          "inner": "%path%"
                        }
                      }
                    ]
                  },
                  {
                    "tag": "tr",
                    "inner": [
                      {
                        "tag": "td",
                        "inner": "Category"
                      },
                      {
                        "tag": "td",
                        "inner": "%category%"
                      }
                    ]
                  },
                  {
                    "tag": "tr",
                    "inner": [
                      {
                        "tag": "td",
                        "inner": "Tags"
                      },
                      {
                        "tag": "td",
                        "id": "tags"
                      }
                    ]
                  },
                  {
                    "tag": "tr",
                    "inner": [
                      {
                        "tag": "td",
                        "inner": "Published"
                      },
                      {
                        "tag": "td",
                        "inner": "%date%"
                      }
                    ]
                  },
                  {
                    "tag": "tr",
                    "inner": [
                      {
                        "tag": "td",
                        "inner": "License"
                      },
                      {
                        "tag": "td",
                        "inner": {
                          "tag": "a",
                          "href": "https://en.wikipedia.org/wiki/MIT_License",
                          "target": "_blank",
                          "inner": "MIT"
                        }
                      }
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "demo",
          "inner": [
            {
              "id": "demo-legend",
              "inner": {
                "tag": "legend",
                "class": "text-muted",
                "inner": "DEMOS"
              }
            },
            { "id": "demo-main" }
          ]
        }
      ]
    },
    "collection": {
      "id": "collection",
      "inner": [
        {
          "id": "aside",
          "inner": [
            {
              "id": "menu-caption",
              "inner": "%caption%"
            },
            { "id": "menu-app" },
            {
              "id": "menu-below",
              "inner": {
                "tag": "button",
                "class": "btn btn-link btn-block btn-sm",
                "onclick": "%onclick%",
                "inner": "%button%"
              }
            }
          ]
        },
        { "id": "app" }
      ]
    }
  },

  "menu_app": {
    "html": [ "ccm.get", "../component_manager/resources/resources.js", "menu_app_html" ],
    "css": [ "ccm.load",
      "../component_manager/resources/menu_app.css",
      "../libs/bootstrap-4/css/bootstrap.min.css"
    ],
    "selected": 1
  },

  "menu_app_html": {
    "main": {
      "id": "main",
      "inner": {
        "id": "entries",
        "class": "list-group"
      }
    },
    "entry": {
      "tag": "a",
      "class": "entry list-group-item list-group-item-action",
      "onclick": "%click%",
      "inner": {
        "class": "title"
      }
    }
  },

  "menu_top": {
    "css": [ "ccm.load",
      "../component_manager/resources/menu_top.css",
      "../libs/bootstrap-4/css/bootstrap.min.css"
    ],
    "html": [ "ccm.get", "../component_manager/resources/resources.js", "menu_top_html" ],
    "data": { "entries": [ "Overview", "Reviews", "App Creation" ] },
    "selected": 1
  },

  "menu_top_html": {
    "main": {
      "id": "main",
      "inner": [
        {
          "tag": "ul",
          "id": "entries",
          "class": "nav nav-tabs"
        },
        {
          "id": "content"
        }
      ]
    },
    "entry": {
      "tag": "li",
      "class": "entry nav-item",
      "onclick": "%click%",
      "inner": {
        "tag": "a",
        "class": "title nav-link"
      }
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

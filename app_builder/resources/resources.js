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
    "window": [ "ccm.component", "../window/ccm.window.js" ],
    "builder": [ "ccm.component", "../json_builder/ccm.json_builder.js", {
      "css": [ "ccm.load", "../json_builder/resources/default.css" ],
      "directly": true,
      "nosubmit": true
    } ],
    "css": [ "ccm.load",
      "../app_builder/resources/default-v2.css",
      "../libs/bootstrap-4/css/bootstrap.min.css",
      { "context": "head", "url": "../libs/bootstrap-4/css/bootstrap.min.css" }
    ],
    "data": { "store": [ "ccm.store", { "url": "http://localhost:8080", "name": "test-configs" } ] },
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
    "helper": [ "ccm.load", { "url": "../modules/helper.js", "type": "module" } ],
    "html": [ "ccm.get", "../app_builder/resources/resources.js", "html" ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "meta_store": [ "ccm.store", { "url": "http://localhost:8080", "name": "test-apps" } ],
    "onchange": ( instance, event ) => { console.log( event, instance.getValue() ); },
    "qr_code": [ "ccm.load", "../libs/qrcode-generator/qrcode.min.js" ],
    "user": [ "ccm.start", "../user/ccm.user.js", {
      "realm": "cloud",
      "url": "http://localhost:8080",
      "store": "test-user",
      "hash": [ "ccm.load", { "url": "../modules/md5.js", "type": "module" } ],
      "css": [ "ccm.load",
        "../libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
        "../user/resources/default.css"
      ],
      "html": [ "ccm.get", "../user/resources/resources.js", "html" ]
    } ],
    "warning": "Are you sure you want to delete this App?"
  },

  "demo": {
    "window": [ "ccm.component", "https://ccmjs.github.io/akless-components/window/versions/ccm.window-1.0.0.js" ],
    "data": { "store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "test-configs" } ] },
    "form": [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.3.js", {
      "entries": [ "ccm.get", "https://ccmjs.github.io/akless-components/app_builder/resources/resources.js", "form_entries" ],
      "data": {
        "store": [ "ccm.store", { "name": "test-apps", "url": "https://ccm2.inf.h-brs.de" } ]
      }
    } ],
    "meta_store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "test-apps" } ],
    "qr_code": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/qrcode-generator/qrcode.min.js" ],
    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
      "hash": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/md5.js", "type": "module" } ],
      "realm": "cloud",
      "store": "test-user",
      "url": "https://ccm2.inf.h-brs.de"
    } ]
  },

  "html": {
    "main": {
      "id": "main",
      "inner": [
        {
          "id": "header",
          "inner": [
            { "id": "lang" },
            { "id": "user" }
          ]
        },
        {
          "id": "maker",
          "inner": [
            { "id": "builder" },
            {
              "id": "preview",
              "inner": [
                { "tag": "b", "inner": "Preview:" },
                { "id": "app" }
              ]
            }
          ]
        },
        {
          "id": "buttons",
          "class": "d-flex justify-content-around flex-wrap bg-dark",
          "inner": [
            {
              "id": "button-update",
              "class": "btn btn-success disabled",
              "onclick": "%onUpdate%",
              "inner": "Save Changes"
            },
            {
              "id": "button-read",
              "class": "btn btn-primary",
              "onclick": "%onRead%",
              "inner": "Load App"
            },
            {
              "id": "button-create",
              "class": "btn btn-warning",
              "onclick": "%onCreate%",
              "inner": "Create As New"
            },
            {
              "id": "button-delete",
              "class": "btn btn-danger disabled",
              "onclick": "%onDelete%",
              "inner": "Delete"
            }
          ]
        }
      ]
    },
    "handover": {
      "id": "handover",
      "inner": [
        {
          "class": "d-flex",
          "inner": [
            {
              "inner": [
                {
                  "id": "embed",
                  "class": "input-group mb-3",
                  "inner": [
                    {
                      "class": "input-group-prepend",
                      "inner": {
                        "tag": "span",
                        "class": "input-group-text",
                        "inner": "Embed"
                      }
                    },
                    {
                      "tag": "input",
                      "readonly": true,
                      "type": "text",
                      "id": "embed_code",
                      "class": "form-control bg-white",
                      "aria-label": "Embed Code"
                    },
                    {
                      "class": "input-group-append",
                      "inner": {
                        "tag": "button",
                        "id": "embed_copy",
                        "class": "btn btn-success",
                        "type": "button",
                        "inner": "Copy"
                      }
                    }
                  ]
                },
                {
                  "class": "input-group mb-3",
                  "inner": [
                    {
                      "class": "input-group-prepend",
                      "inner": {
                        "tag": "span",
                        "class": "input-group-text",
                        "inner": "App ID"
                      }
                    },
                    {
                      "tag": "input",
                      "readonly": true,
                      "type": "text",
                      "id": "app_id",
                      "class": "form-control bg-white",
                      "aria-label": "App ID"
                    },
                    {
                      "class": "input-group-append",
                      "inner": {
                        "tag": "button",
                        "id": "id_copy",
                        "class": "btn btn-success",
                        "type": "button",
                        "inner": "Copy"
                      }
                    }
                  ]
                },
                {
                  "class": "input-group mb-3",
                  "inner": [
                    {
                      "class": "input-group-prepend",
                      "inner": {
                        "tag": "span",
                        "class": "input-group-text",
                        "inner": "URL"
                      }
                    },
                    {
                      "tag": "input",
                      "readonly": true,
                      "type": "text",
                      "id": "app_url",
                      "class": "form-control bg-white",
                      "aria-label": "URL"
                    },
                    {
                      "class": "input-group-append",
                      "inner": {
                        "tag": "button",
                        "id": "url_copy",
                        "class": "btn btn-success",
                        "type": "button",
                        "inner": "Copy"
                      }
                    }
                  ]
                }
              ]
            },
            { "id": "qr_code", "class": "pl-2" }
          ]
        },
        {
          "class": "text-center",
          "inner": [
            {
              "tag": "button",
              "type": "button",
              "id": "download",
              "class": "btn btn-primary mr-2",
              "inner": [
                {
                  "tag": "span",
                  "class": "fas fa-file-download"
                },
                " File"
              ]
            },
            {
              "tag": "a",
              "id": "bookmarklet",
              "class": "btn btn-secondary mr-2",
              "inner": [
                {
                  "tag": "span",
                  "class": "fas fa-bookmark"
                },
                " Bookmarklet"
              ]
            },
            {
              "tag": "button",
              "type": "button",
              "id": "ibook",
              "class": "btn btn-info mr-2",
              "inner": [
                {
                  "tag": "span",
                  "class": "fas fa-book"
                },
                " iBook Widget"
              ]
            },
            {
              "tag": "button",
              "type": "button",
              "id": "scorm",
              "class": "btn btn-danger",
              "inner": [
                {
                  "tag": "span",
                  "class": "fas fa-archive"
                },
                " SCORM"
              ]
            }
          ]
        }
      ]
    },
    "read": {
      "id": "read",
      "inner": [
        {
          "tag": "p",
          "inner": "Use one of the following ways to load an app:"
        },
        {
          "id": "embed",
          "class": "input-group mb-3",
          "inner": [
            {
              "class": "input-group-prepend",
              "inner": {
                "tag": "span",
                "class": "input-group-text",
                "inner": "Embed"
              }
            },
            {
              "tag": "input",
              "type": "text",
              "id": "embed_code",
              "class": "form-control",
              "aria-label": "Embed Code"
            },
            {
              "class": "input-group-append",
              "inner": {
                "tag": "button",
                "id": "embed_load",
                "class": "btn btn-primary",
                "type": "button",
                "inner": "Load",
                "onclick": "%embed%"
              }
            }
          ]
        },
        {
          "class": "input-group mb-3",
          "inner": [
            {
              "class": "input-group-prepend",
              "inner": {
                "tag": "span",
                "class": "input-group-text",
                "inner": "App ID"
              }
            },
            {
              "tag": "input",
              "type": "text",
              "id": "app_id",
              "class": "form-control",
              "aria-label": "App ID"
            },
            {
              "class": "input-group-append",
              "inner": {
                "tag": "button",
                "id": "id_copy",
                "class": "btn btn-primary",
                "type": "button",
                "inner": "Load",
                "onclick": "%app_id%"
              }
            }
          ]
        },
        {
          "class": "input-group mb-3",
          "inner": [
            {
              "class": "input-group-prepend",
              "inner": {
                "tag": "span",
                "class": "input-group-text",
                "inner": "URL"
              }
            },
            {
              "tag": "input",
              "type": "text",
              "id": "app_url",
              "class": "form-control",
              "aria-label": "URL"
            },
            {
              "class": "input-group-append",
              "inner": {
                "tag": "button",
                "id": "url_copy",
                "class": "btn btn-primary",
                "type": "button",
                "inner": "Load",
                "onclick": "%url%"
              }
            }
          ]
        }
      ]
    }
  },

  "form_entries": [
    "<div class='page-header'><h3>Publish App</h3></div>",
    "<div class='well'>Publishing the app makes it visible to others and can be used anywhere on the web. The more metadata you enter here, the better your app can be found by others.</div>",
    {
      "label": "<span style='color:red'>*</span>Title",
      "name": "title",
      "type": "text",
      "info": "Title of the app. As understandable and short as possible.",
      "placeholder": "Digital Maker Space",
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
      "placeholder": "Component developers can publish, find, try, and rate components, and app creators can create their own apps from components without programming skills. With the built-in App Store, the created apps can be found, tried, rated, reused and shared by others. Everything in this Digital Maker Space is free software and all content is public domain."
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
      "info": "Everything in a Digital Maker Space is free software and all content is public domain. So you can only publish anything if this requirement is fulfilled.",
      "required": true
    },
    { "type": "submit" }
  ]

};

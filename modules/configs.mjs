
export const submit_app_collection = {
  "entries": [
    "<div class='pb-2 mt-4 mb-4 border-bottom'><h2>Settings <small class='text-primary'>Chat</small></h2></div>",
    {
      "label": "App Title",
      "name": "title",
      "type": "text",
      "info": "Give here the title of your app collection. This may be the name of the course you want to represent as an app collection."
    },
    "<legend>User Login</legend>",
    {
      "label": "User Authentication",
      "name": "user",
      "type": "select",
      "info": "<p>If you select a sign-on mode here, authentication will be requested. The various sign-on modes are described below. Without a sign-on mode the user can only see the chat history and can't send an own message.</p><h5>Guest Mode</h5><p>The user can authenticate with any username and without password. This mode is mostly used for test and demo scenarios.</p><h5>DMS Account</h5><p>The user must log in with a valid Digital Makerspace (DMS) account.</p><h5>H-BRS FB02 Account</h5><p>In this mode the user has to authenticate access with a valid account from the Department of Computer Sciences at Hochschule Bonn-Rhein-Sieg University of Applied Sciences.</p><h5>H-BRS FB02 Account with Pseudonym</h5><p>The same as H-BRS FB02, but the username is a pseudonym.</p><h5>One-time Pseudonym</h5><p>The user is automatically logged in with a one-time pseudonym. Each login returns a different pseudonym.</p>",
      "items": [
        {
          "inner": "None",
          "value": "null"
        },
        {
          "inner": "Guest Mode",
          "value": "[%'%ccm.instance%'%,%'%https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js%'%,{%'%realm%'%:%'%guest%'%,%'%title%'%:%'%Guest Mode: Please enter any username%'%}]"
        },
        {
          "inner": "DMS Account",
          "value": "[%'%ccm.instance%'%,%'%https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js%'%,{%'%hash%'%:[%'%ccm.load%'%,{%'%url%'%:%'%https://ccmjs.github.io/akless-components/modules/md5.mjs%'%,%'%type%'%:%'%module%'%}],%'%realm%'%:%'%cloud%'%,%'%store%'%:%'%dms-user%'%,%'%url%'%:%'%https://ccm2.inf.h-brs.de%'%}]"
        },
        {
          "inner": "H-BRS FB02 Account",
          "value": "[%'%ccm.instance%'%,%'%https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js%'%,{%'%key%'%:%'%hbrsinfkaul%'%,%'%realm%'%:%'%hbrsinfkaul%'%}]"
        },
        {
          "inner": "H-BRS FB02 Account with Pseudonym",
          "value": "[%'%ccm.instance%'%,%'%https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js%'%,{%'%key%'%:%'%hbrsinfpseudo%'%,%'%realm%'%:%'%hbrsinfpseudo%'%}]"
        },
        {
          "inner": "One-time Pseudonym",
          "value": "[%'%ccm.instance%'%,%'%https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js%'%,{%'%key%'%:%'%pseudo%'%,%'%realm%'%:%'%guest%'%,%'%guest%'%:true}]"
        }
      ]
    },
    "<legend>Your App Content</legend>",
    {
      "name": "content",
      "type": "several",
      "info": "Text Text Text",
      "items": [
        {
          "label": "Section Title",
          "name": "section",
          "type": "text"
        },
        {
          "label": "Section Content",
          "name": "entries",
          "type": "several",
          "items": [
            {
              "label": "Content Heading",
              "name": "title",
              "type": "text"
            },
            {
              "label": "Content as App URL",
              "name": "ignore",
              "type": "app"
            }
          ]
        }
      ]
    },
    "<legend>Your App Footer </legend>",
    {
      "label": "App Settings",
      "name": "footer",
      "type": "several",
      "items": [
        {
          "label": "URL of the App",
          "name": "ignore",
          "type": "app"
        },
        {
          "label": "Icon for the App",
          "name": "icon",
          "type": "icon_picker",
          "info": "Icon from https://material.io/resources/icons"
        },
        {
          "label": "Subtitle of Icon",
          "name": "title",
          "type": "text"
        },
        {
          "label": "User",
          "name": "user",
          "type": "text",
          "info": "The app is only visible for the user entered here. For example you can set the username of an admin or teacher."
        }
      ]
    },
    {
      "name": "html",
      "type": "hidden"
    },
    {
      "name": "feedback",
      "type": "hidden"
    },
    {
      "name": "menu",
      "type": "hidden"
    },
    {
      "name": "css",
      "type": "hidden"
    },
    {
      "name": "js",
      "type": "hidden"
    },
    {
      "name": "helper",
      "type": "hidden"
    }
  ],
  "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.1.0.min.mjs" ],
  "html": {
    "entry": {
      "class": "form-group"
    },
    "label": {
      "tag": "label",
      "class": "item-label",
      "inner": "%label%"
    },
    "info": {
      "tag": "span",
      "class": "info",
      "inner": [
        {
          "tag": "input",
          "type": "checkbox",
          "id": "%id%"
        },
        {
          "tag": "label",
          "for": "%id%",
          "inner": {
            "tag": "span",
            "class": "info-icon glyphicon glyphicon-info-sign"
          }
        },
        {
          "tag": "span",
          "class": "alert alert-info",
          "inner": "%info%"
        }
      ]
    },
    "section": {
      "class": "section",
      "inner": [
        {
          "tag": "input",
          "type": "hidden",
          "name": "%name%",
          "value": "%value%"
        },
        {
          "class": "items"
        },
        {
          "class": "buttons btn-group",
          "inner": [
            {
              "tag": "a",
              "class": "add btn btn-default btn-sm",
              "role": "button",
              "inner": {
                "tag": "span",
                "class": "glyphicon glyphicon-plus"
              },
              "onclick": "%add%"
            },
            {
              "tag": "a",
              "class": "del btn btn-default btn-sm",
              "role": "button",
              "inner": {
                "tag": "span",
                "class": "glyphicon glyphicon-minus"
              },
              "onclick": "%del%"
            }
          ]
        }
      ]
    }
  },
  "css": [ "ccm.load",
    {
      "context": "head",
      "url": "https://ccmjs.github.io/akless-components/libs/bootstrap/css/font-face.css"
    },
    "https://ccmjs.github.io/akless-components/libs/bootstrap/css/bootstrap.css",
    "https://ccmjs.github.io/akless-components/submit/resources/default.css"
  ],
  "ignore": {
    "defaults": {
      "content": [],
      "footer": [],
      "user": null,
      "feedback": null,
      "routing": null
    }
  }
}
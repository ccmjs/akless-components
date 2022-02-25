
export const submit_app_collection = {
  "entries": [
    "<br>",
    {
      "label": "Titel der App-Sammlung:",
      "name": "title",
      "type": "text"
    },
    "<legend>Sektionen und Apps</legend>",
    {
      "name": "sections",
      "type": "several",
      "items": [
        {
          "label": "Titel der Sektion:",
          "name": "title",
          "type": "text"
        },
        {
          "label": "Enthaltene Apps:",
          "name": "entries",
          "type": "several",
          "items": [
            {
              "label": "Titel der App:",
              "name": "title",
              "type": "text"
            },
            {
              "label": "Icon der App:",
              "name": "icon",
              "type": "url",
              "info": "Hier können Sie ein individuelles App-Icon für die App festlegen, in dem Sie die URL einer Bilddatei angeben. Bitte achten Sie darauf, kein Urheberrecht zu verletzen."
            },
            {
              "label": "App-URL oder Einbettungscode:",
              "name": "ignore",
              "type": "text",
              "info": "Jede App aus dem Digital Makerspace kann hier platziert werden. Geben Sie dafür die App-URL oder den Einbettungscode der App an."
            }
          ]
        }
      ]
    },
    "<legend>Apps im Footer</legend>",
    {
      "name": "footer",
      "type": "several",
      "items": [
        {
          "label": "Titel der App:",
          "name": "title",
          "type": "text"
        },
        {
          "label": "Icon der App:",
          "name": "icon",
          "type": "url",
          "info": "Hier können Sie ein individuelles App-Icon für die App festlegen, in dem Sie die URL einer Bilddatei angeben. Bitte achten Sie darauf, kein Urheberrecht zu verletzen."
        },
        {
          "label": "App-URL oder Einbettungscode:",
          "name": "ignore",
          "type": "text",
          "info": "Jede App aus dem Digital Makerspace kann hier platziert werden. Geben Sie dafür die App-URL oder den Einbettungscode der App an."
        }
      ]
    },
    "<legend>Erweiterte Einstellungen</legend>",
    {
      "label": "Anmeldung von Benutzern:",
      "name": "user",
      "type": "select",
      "info": "Legt fest, ob man sich in der App-Sammlung anmelden kann. Dies ist dann sinnvoll, wenn die App-Sammlung Apps enthält, die eine Anmeldung erfordern und es einen übergeordneten Login geben soll.<br><br>Folgende Anmeldeverfahren sind möglich:<ul><li><u>Gastmodus:</u> Der Benutzer kann sich mit einem beliebigen Namen ohne Passwort anmelden.</li><li><u>Digital Makerspace Account:</u> Anmeldung mit einem kostenlosen Digital Makerspace-Account.</li><li><u>H-BRS FB02 Account:</u> Der Benutzer muss sich mit mit einem Account des Fachbereichs Informatik der Hochschule Bonn-Rhein-Sieg anmelden.</li><li><u>H-BRS FB02 Account mit Pseudonym:</u> Das gleiche wie die vorherige Option, aber im Frontend wird der Benutzername durch ein Pseudonym ersetzt.</li><li><u>Einmaliges Pseudonym:</u> Man ist automatisch angemeldet unter einem zufällig generierten Pseudonym. Bei jeder Anmeldung nach Ablauf einer Session wird ein neues Pseudonym generiert.</li></ul>",
      "items": [
        {
          "inner": "Deaktiviert",
          "value": null
        },
        {
          "inner": "Gastmodus",
          "value": "[%'%ccm.start%'%,%'%https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js%'%,[%'%ccm.get%'%,%'%https://ccmjs.github.io/akless-components/user/resources/resources.min.js%'%,%'%guest%'%]]"
        },
        {
          "inner": "Digital Makerspace Account",
          "value": "[%'%ccm.start%'%,%'%https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js%'%,[%'%ccm.get%'%,%'%https://ccmjs.github.io/akless-components/user/resources/resources.min.js%'%,%'%cloud%'%]]"
        },
        {
          "inner": "H-BRS FB02 Account",
          "value": "[%'%ccm.start%'%,%'%https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js%'%,[%'%ccm.get%'%,%'%https://ccmjs.github.io/akless-components/user/resources/resources.min.js%'%,%'%hbrsinfkaul%'%]]"
        },
        {
          "inner": "H-BRS FB02 Account mit Pseudonym",
          "value": "[%'%ccm.start%'%,%'%https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js%'%,[%'%ccm.get%'%,%'%https://ccmjs.github.io/akless-components/user/resources/resources.min.js%'%,%'%hbrsinfpseudo%'%]]"
        },
        {
          "inner": "Einmaliges Pseudonym",
          "value": "[%'%ccm.start%'%,%'%https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js%'%,[%'%ccm.get%'%,%'%https://ccmjs.github.io/akless-components/user/resources/resources.min.js%'%,%'%pseudo%'%]]"
        }
      ]
    },
    {
      "label": "Dark Mode",
      "name": "dark",
      "type": "select",
      "info": "Im Dark Mode erscheint die App-Sammlung in einem dunklen Layout, was Augen und Batterie schont. Standardmäßig wird automatisch vom Betriebssystem des App-Nutzers ermittelt, ob ein Dark Mode bevorzugt wird.",
      "items": [
        {
          "inner": "Automatisch",
          "value": "auto"
        },
        {
          "inner": "Ein",
          "value": true
        },
        {
          "inner": "Aus",
          "value": false
        }
      ]
    },
    {
      "label": "URL für Standard-Icon",
      "name": "icon",
      "type": "text",
      "info": "Wenn für eine App kein individuelles Icon festgelegt wird, wird das hier angegebene Icon eingesetzt. Wird auch hier kein Icon festgelegt, wird kein Icon dargestellt. Bitte achten Sie darauf, kein Urheberrecht zu verletzen."
    },
    {
      "label": "Mehrsprachigkeit",
      "name": "lang",
      "type": "select",
      "info": "Geben Sie hier an, ob man in der App-Sammlung die Sprache wechseln kann. Dies ist dann sinnvoll, wenn die App-Sammlung mehrsprachige Apps enthält und es einen übergeordnete Sprachauswahl geben soll.",
      "items": [
        {
          "inner": "Aus",
          "value": null
        },
        {
          "inner": "Ein",
          "value": "[%'%ccm.start%'%,%'%https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.min.js%'%]"
        }
      ]
    },
    "<br>",
    {
      "name": "routing",
      "type": "hidden"
    }
  ],
  "helper": [
    "ccm.load",
    "https://ccmjs.github.io/akless-components/modules/versions/helper-8.1.0.min.mjs"
  ],
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
  "css": [
    "ccm.load",
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
      "routing": [
        "ccm.instance",
        "https://ccmjs.github.io/akless-components/routing/versions/ccm.routing-3.0.0.min.js"
      ]
    }
  }
};

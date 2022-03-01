
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

export const submit_quiz = {
  "entries": [
    {
      "name": "css",
      "type": "hidden"
    },
    {
      "name": "data",
      "type": "hidden"
    },
    {
      "name": "data.key",
      "type": "key"
    },
    {
      "name": "onfinish",
      "type": "hidden"
    },
    "<legend class='text-primary'>Fragen und Antworten</legend>",
    {
      "name": "questions",
      "type": "several",
      "items": [
        {
          "label": "Frage",
          "name": "text",
          "type": "text",
          "info": "Hier den Text der Frage eingeben. Weitere Fragen können über den entsprechenden Plus- und Minus-Button hinzugefügt und entfernen werden."
        },
        {
          "label": "Typ",
          "name": "input",
          "type": "radio",
          "info": "Wähle Single Choice, wenn nur eine Antwort oder Multiple Choice, wenn mehrere Antworten ausgewählt werden können.",
          "items": [
            {
              "label": "Single Choice",
              "value": "radio"
            },
            {
              "label": "Multiple Choice",
              "value": "checkbox"
            }
          ]
        },
        {
          "label": "Beschreibung",
          "name": "description",
          "type": "textarea",
          "info": "Hier kann eine zusätzliche Beschreibung zur Frage angegeben werden."
        },
        "<br>",
        {
          "name": "answers",
          "type": "several",
          "items": [
            {
              "label": "Antwort",
              "name": "text",
              "type": "text",
              "info": "Hier den Text für eine Antwortmöglichksit eingeben. Weitere Antworten können über den entsprechenden Plus- und Minus-Button hinzugefügt und entfernen werden."
            },
            {
              "label": "Correct",
              "name": "correct",
              "type": "checkbox",
              "info": "Gibt an, ob diese Antwort korrekt ist."
            },
            {
              "label": "Comment",
              "name": "comment",
              "type": "text",
              "info": "in Kommentar kann einen Hinweis darauf geben, warum eine Antwort richtig oder falsch ist. Der Kommentar wird dann zusammen mit dem direkten Feedback angezeigt."
            }
          ]
        }
      ]
    },
    "<br>",
    "<legend class=\"text-primary\">Erweiterte Einstellungen</legend>",
    {
      "label": "START-Button",
      "name": "start_button",
      "type": "checkbox",
      "info": "Wenn aktiviert, wird ein START-BUTTON angezeigt, bevor das Quiz beginnt."
    },
    {
      "label": "Feedback",
      "name": "feedback",
      "type": "checkbox",
      "info": "Wenn aktiviert, wird nach der Beantwortung einer Frage ein direktes Feedback angezeigt."
    },
    {
      "label": "Fortschrittsbalken",
      "name": "progress_bar",
      "type": "checkbox",
      "info": "Wenn aktiviert, wird ein Fortschrittsbalken angezeigt, wenn das Quiz abgeschlossen ist."
    },
    {
      "label": "Navigation",
      "name": "navigation",
      "type": "checkbox",
      "info": "Wenn aktiviert, kann zwischen den Fragen navigiert werden."
    },
    {
      "label": "Überspringbar",
      "name": "skippable",
      "type": "checkbox",
      "info": "Wenn aktiviert, können Fragen übersprungen werden."
    },
    {
      "label": "Abschluss jederzeit möglich",
      "name": "anytime_finish",
      "type": "checkbox",
      "info": "Wenn aktiviert, müssen nicht alle Fragen beantwortet werden, um das Quiz abzuschließen."
    },
    {
      "label": "Zeitlimit",
      "name": "time",
      "type": "number",
      "min": 1,
      "info": "Falls angegeben, hat das Quiz ein Zeitlimit und wird automatisch nach der angegebenen Anzahl von Sekunden abgeschlossen."
    },
    {
      "label": "Fragen mischen",
      "name": "shuffle",
      "type": "checkbox",
      "info": "Wenn aktiviert, werden die Fragen gemischt, sodass ihre Reihenfolge bei jedem Start zufällig ist."
    },
    {
      "label": "Antworten mischen",
      "name": "random",
      "type": "checkbox",
      "info": "Wenn aktiviert, werden die Antworten auf die Fragen in zufälliger Reihenfolge angezeigt."
    },
    {
      "label": "HTML-Code nicht auswerten",
      "name": "escape",
      "type": "checkbox",
      "info": "Wenn aktiviert, wird in Fragen und Antworten enthaltener HTML-Code nicht ausgewertet, sondern unverändert angezeigt."
    },
    {
      "label": "Ergebnisse speichern",
      "name": "data.store",
      "type": "select",
      "info": "Wähle aus, wo die Ergebnisse gespeichert werden sollen.<ul class=\"m-0 pl-4\"><b>Lokale Datenbank:</b> Die Ergebnisse werden in der lokalen Datenbank des Webbrowsers gespeichert und sind somit nur auf diesem Gerät und auch offline verfügbar.</li><li><b>Serverseitige Datenbank:</b> Die Ergebnisse werden in einer serverseitigen Datenbank gespeichert. Konkret handelt es sich um einen Datenserver des Fachbereichs Informatik der Hochschule Bonn-Rhein-Sieg in Deutschland.</li></ul>",
      "items": [
        {
          "inner": "Deaktiviert",
          "value": "[%'%ccm.store%'%]"
        },
        {
          "inner": "Lokale Datenbank",
          "value": "[%'%ccm.store%'%,{%'%name%'%:%'%quiz_results%'%}]"
        },
        {
          "inner": "Serverseitige Datenbank",
          "value": "[%'%ccm.store%'%,{%'%name%'%:%'%quiz_results%'%,%'%url%'%:%'%https://ccm2.inf.h-brs.de%'%}]"
        }
      ]
    },
    {
      "label": "Benutzeranmeldung",
      "name": "user",
      "type": "select",
      "info": "Wählen aus, wie sich ein Benutzer beim Abschließen des Quiz anmelden muss, damit sein Ergebnis gespeichert werden kann.<ul class=\"m-0 pl-4\"><li><b>Gastmodus:</b> Der Benutzer kann sich mit einem beliebigen Benutzernamen und ohne Passwort anmelden.</li><li><b>Digital Makerspace Account:</b> Der Benutzer muss sich mit einem Digital Makerspace-Account anmelden.</li><li><b>H-BRS FB02 Account:</b> Der Nutzer muss sich mit einem Account des Fachbereichs Informatik der Hochschule Bonn-Rhein-Sieg authentifizieren.</li><li><b>H-BRS FB02 Account mit Pseudonym:</b> Dasselbe wie die vorherige Option, jedoch wird der Benutzername durch ein Pseudonym ersetzt.</li><li><b>Einmaliges Pseudonym:</b> Der Benutzer wird automatisch mit einem einmaligen Pseudonym angemeldet. Jede Anmeldung gibt nach dem Ablauf einer Session ein anderes Pseudonym zurück.</li></ul>",
      "items": [
        {
          "inner": "Deaktiviert",
          "value": "null"
        },
        {
          "inner": "Gastmodus",
          "value": "[%'%ccm.instance%'%,%'%https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.1.js%'%]"
        },
        {
          "inner": "DMS Account",
          "value": "[%'%ccm.instance%'%,%'%https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.1.js%'%,{%'%hash%'%:[%'%ccm.load%'%,{%'%url%'%:%'%https://ccmjs.github.io/akless-components/modules/md5.mjs%'%,%'%type%'%:%'%module%'%}],%'%realm%'%:%'%cloud%'%,%'%store%'%:%'%dms-user%'%,%'%url%'%:%'%https://ccm2.inf.h-brs.de%'%}]"
        },
        {
          "inner": "H-BRS FB02 Account",
          "value": "[%'%ccm.instance%'%,%'%https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.1.js%'%,{%'%key%'%:%'%hbrsinfkaul%'%,%'%realm%'%:%'%hbrsinfkaul%'%}]"
        },
        {
          "inner": "H-BRS FB02 Account mit Pseudonym",
          "value": "[%'%ccm.instance%'%,%'%https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.1.js%'%,{%'%key%'%:%'%hbrsinfpseudo%'%,%'%realm%'%:%'%hbrsinfpseudo%'%}]"
        },
        {
          "inner": "Einmaliges Pseudonym",
          "value": "[%'%ccm.instance%'%,%'%https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.1.js%'%,{%'%key%'%:%'%pseudo%'%,%'%realm%'%:%'%guest%'%,%'%guest%'%:true}]"
        }
      ]
    },
    "<br>",
    "<legend class=\"text-primary\">Abschluss des Quiz</legend>",
    {
      "label": "Bestätigungs-Dialog",
      "name": "onfinish.confirm",
      "type": "text",
      "info": "Wenn aktiv, muss der Benutzer vor dem Speichern einer Lösung dies explizit bestätigen. Um dies zu aktivieren, geben Sie den Text an, der dem Benutzer im Bestätigung-Dialog angezeigt wird."
    },
    {
      "label": "Leerer Inhalt",
      "name": "onfinish.clear",
      "type": "checkbox",
      "info": "Wenn aktiv, wird der Quiz nach Abschluss ausgeblendet."
    },
    {
      "label": "Neustarten",
      "name": "onfinish.restart",
      "type": "checkbox",
      "info": "Gibt an, ob der Quiz nach Abschluss neu gestartet wird."
    },
    {
      "label": "Erfolgs-Dialog",
      "name": "onfinish.alert",
      "type": "text",
      "info": "Meldung, die dem Benutzer angezeigt wird, wenn die eingereichte Lösung erfolgreich gespeichert wurde."
    },
    "<br>",
    "<legend class=\"text-primary\">Beschriftung von Buttons</legend>",
    {
      "label": "Vorherige Frage",
      "name": "placeholder.prev",
      "type": "text",
      "info": "Beschriftung für den Button, mit dem man zur vorherigen Frage wechselt."
    },
    {
      "label": "Abschicken",
      "name": "placeholder.submit",
      "type": "text",
      "info": "Beschriftung für den Button, mit dem man die Lösung zu einer Frage abschickt."
    },
    {
      "label": "Nächste Frage",
      "name": "placeholder.next",
      "type": "text",
      "info": "Beschriftung für den Button, mit dem man zur nächstemn Frage wechselt."
    },
    {
      "label": "Abschließen",
      "name": "placeholder.finish",
      "type": "text",
      "info": "Beschriftung für den Button, mit dem man den Quiz abschließt."
    }
  ],
  "ignore": {
    "defaults": {
      "css": [
        "ccm.load",
        "https://ccmjs.github.io/akless-components/quiz/resources/default.css"
      ],
      "helper": [
        "ccm.load",
        "https://ccmjs.github.io/akless-components/modules/versions/helper-4.1.0.mjs"
      ],
      "html": [
        "ccm.load",
        "https://ccmjs.github.io/akless-components/quiz/resources/templates.html"
      ],
      "placeholder": {
        "cancel": "Abbrechen",
        "prev": "Vorherige Frage",
        "submit": "Abschicken",
        "next": "Nächste Frage",
        "correct": "Korrekte Lösung: ",
        "finish": "Quiz abschließen"
      },
      "feedback": true,
      "progress_bar": true,
      "questions": [
        {
          "text": "Erste Frage",
          "input": "radio",
          "answers": [
            {
              "text": "Antwort A",
              "correct": true
            },
            {
              "text": "Antwort B"
            }
          ]
        }
      ]
    }
  },
  "_": {
    "access": {
      "get": "all",
      "set": "creator",
      "del": "creator"
    },
    "creator": "akless",
    "realm": "cloud"
  },
  "meta": [
    {
      "name": "dms-apps",
      "url": "https://ccm2.inf.h-brs.de"
    },
    "1581669159921X781491117126752"
  ],
  "updated_at": "2020-11-04T10:25:36+01:00",
  "created_at": "2020-02-14T09:32:41+01:00",
  "css": [
    "ccm.load",
    [
      [
        "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
        {
          "url": "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
          "context": "head"
        },
        {
          "url": "https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp",
          "type": "css"
        },
        {
          "url": "https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp",
          "type": "css",
          "context": "head"
        }
      ],
      "https://ccmjs.github.io/akless-components/submit/resources/default_b4.css"
    ]
  ],
  "data": {
    "store": [
      "ccm.store"
    ]
  },
  "helper": [
    "ccm.load",
    "https://ccmjs.github.io/akless-components/modules/versions/helper-4.0.2.mjs"
  ],
  "html": [
    "ccm.load",
    "https://ccmjs.github.io/akless-components/submit/resources/templates_b4.html"
  ]
};

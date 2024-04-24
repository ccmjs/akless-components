
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
      "label": "Farbe einer Sektion",
      "name": "color",
      "type": "color",
      "info": "Hintergrundfarbe für den Titel der Sektionen."
    },
    {
      "label": "URL für Standard-Icon",
      "name": "icon",
      "type": "text",
      "info": "Wenn für eine App kein individuelles Icon festgelegt wird, wird das hier angegebene Icon eingesetzt. Wird auch hier kein Icon festgelegt, wird kein Icon dargestellt. Bitte achten Sie darauf, kein Urheberrecht zu verletzen."
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
  "ignore": {
    "defaults": {
      "content": [],
      "footer": [],
      "color": "#00BFFF",
      "routing": [
        "ccm.instance",
        "https://ccmjs.github.io/akless-components/routing/versions/ccm.routing-3.0.0.min.js"
      ]
    }
  }
};

export const submit_live_poll = {
  "entries": [
    "<br>",
    {
      "name": "chart",
      "type": "hidden"
    },
    {
      "name": "converter",
      "type": "hidden"
    },
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
      "name": "helper",
      "type": "hidden"
    },
    {
      "name": "html",
      "type": "hidden"
    },
    {
      "name": "logger",
      "type": "hidden"
    },
    {
      "name": "placeholder",
      "type": "hidden"
    },
    {
      "name": "show_results",
      "type": "hidden"
    },
    {
      "name": "user",
      "type": "hidden"
    },
    {
      "label": "Benutzeranmeldung",
      "name": "user",
      "type": "select",
      "info": "Wählen aus, wie sich ein Benutzer in der App anmelden muss.<ul class=\"m-0 pl-4\"><li><b>Gastmodus:</b> Der Benutzer kann sich mit einem beliebigen Benutzernamen und ohne Passwort anmelden.</li><li><b>Digital Makerspace Account:</b> Der Benutzer muss sich mit einem Digital Makerspace-Account anmelden.</li><li><b>H-BRS FB02 Account:</b> Der Nutzer muss sich mit einem Account des Fachbereichs Informatik der Hochschule Bonn-Rhein-Sieg authentifizieren.</li><li><b>H-BRS FB02 Account mit Pseudonym:</b> Dasselbe wie die vorherige Option, jedoch wird der Benutzername durch ein Pseudonym ersetzt.</li><li><b>Einmaliges Pseudonym:</b> Der Benutzer wird automatisch mit einem einmaligen Pseudonym angemeldet. Jede Anmeldung gibt nach dem Ablauf einer Session ein anderes Pseudonym zurück.</li></ul>",
      "items": [
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
    {
      "label": "Umfrageleiter",
      "name": "admin",
      "type": "text",
      "info": "Benutzername des Umfrageleiters. Der Umfrageleiter kontrolliert die Umfrage. Alle anderen Benutzer können nur eine Antwort auswählen, wenn die Umfrage aktiv ist. Wenn kein Umfrageleiter angegeben ist, kann jeder Benutzer die Umfrage steuern."
    },
    {
      "label": "Passwort",
      "name": "password",
      "type": "password",
      "info": "Wenn angegeben, muss dieses Passwort eingegeben werden, um eine Umfrage abzuschließen und die Ergebnisse anzuzeigen."
    },
    {
      "label": "Refresh-Button",
      "name": "data.store.1",
      "type": "radio",
      "info": "Die Umfrage kann entweder über einen Refresh-Button aktualisiert werden, oder sie aktualisiert sich automatisch in Echtzeit (Echtzeit funktioniert nur für wenige Mitglieder, da der Server sonst überlastet ist).",
      "items": [
        {
          "label": "Refresh-Button",
          "value": "{%'%url%'%:%'%https://ccm2.inf.h-brs.de%'%,%'%name%'%:%'%live_poll_data%'%}"
        },
        {
          "label": "Echtzeit",
          "value": "{%'%url%'%:%'%wss://ccm2.inf.h-brs.de%'%,%'%name%'%:%'%live_poll_data%'%}"
        }
      ]
    },
    {
      "label": "Bearbeitbare Fragen und Antworten",
      "name": "editable",
      "type": "checkbox",
      "info": "Wenn aktiviert, können die Fragen und Antworten direkt vor Beginn der Umfrage bearbeitet werden. Wenn ein Umfrageleiter angegeben ist, kann nur der Umfrageleiter bearbeiten."
    },
    {
      "label": "Teilnehmer verbergen",
      "name": "no_members_section",
      "type": "checkbox",
      "info": "Wenn aktiviert, wird der Teilnehmerbereich ausgeblendet. Der Teilnehmerbereich zeigt, wer anwesend ist und wer bereits abgestimmt hat."
    },
    {
      "label": "Kontrolle per LOCK-Button",
      "name": "lock",
      "type": "checkbox",
      "info": "Wenn aktiviert, gibt es einen LOCK-Button, über den man wie der Umfrageleiter die Kontrolle über die Umfrage erlangen kann. Ein anderer Benutzer kann diese Rechte erst erhalten, nachdem sie durch einen erneuten Klick auf den LOCK-Button zurückgegeben wurden. Die Rechte des Umfrageleiters werden durch den LOCK-Button in keiner Weise eingeschränkt. Der Umfrageleiter kann jederzeit die alleinige Kontrolle übernehmen."
    },
    "<legend class='text-primary'>Button-Beschriftungen und Textmeldungen</legend>",
    {
      "label": "START-Button",
      "name": "placeholder.start",
      "type": "text",
      "info": "Beschriftung für den Button, mit dem die Umfrage gestartet wird."
    },
    {
      "label": "FERTIG-Button",
      "name": "placeholder.finish",
      "type": "text",
      "info": "Beschriftung für den Button, der die Umfrage abschließt und die Ergebnisse anzeigt."
    },
    {
      "label": "RESET-Button",
      "name": "placeholder.reset",
      "type": "text",
      "info": "Beschriftung für den Button, der die Umfrage zurücksetzt, nachdem die Ergebnisse angezeigt wurden. Danach können Frage und Antworten erneut editiert und die Umfrage neu gestartet werden."
    },
    {
      "label": "LOCK-Button",
      "name": "placeholder.locked",
      "type": "text",
      "info": "Beschriftung für den Button, mit dem die Kontrolle über die Umfrage für die anderen Benutzer gesperrt wird."
    },
    {
      "label": "UNLOCK-Button",
      "name": "placeholder.unlocked",
      "type": "text",
      "info": "Beschriftung für den Button, mit dem die Kontrolle über die Umfrage für alle Benutzer wieder freigegeben wird."
    },
    {
      "label": "Passworteingabe",
      "name": "prompt",
      "type": "text",
      "info": "Text der erscheint, wenn für den Abbschluss der Umfrage zur Eingabe des Passwort aufgefordert wird."
    },
    {
      "label": "Falsches Passwort",
      "name": "denied",
      "type": "text",
      "info": "Text der erscheint, wenn ein falsches Passwort eingegeben wird."
    }
  ],
  "ignore": {
    "defaults": {
      "chart": [
        "ccm.component",
        "https://ccmjs.github.io/akless-components/highchart/versions/ccm.highchart-3.0.4.js"
      ],
      "converter": [
        "ccm.load",
        {
          "url": "https://ccmjs.github.io/akless-components/modules/json2json.mjs",
          "type": "module",
          "import": "poll_to_highchart"
        }
      ],
      "css": [
        "ccm.load",
        "https://ccmjs.github.io/akless-components/live_poll/resources/styles.css"
      ],
      "data": {
        "store": [
          "ccm.store",
          {
            "url": "https://ccm2.inf.h-brs.de",
            "name": "live_poll_data"
          }
        ]
      },
      "denied": "Das eingegebene Passwort ist nicht korrekt.",
      "editable": true,
      "helper": [
        "ccm.load",
        "https://ccmjs.github.io/akless-components/modules/versions/helper-4.2.0.mjs"
      ],
      "html": [
        "ccm.load",
        "https://ccmjs.github.io/akless-components/live_poll/resources/templates.html"
      ],
      "lock": true,
      "placeholder": {
        "start": "START",
        "finish": "AUSWERTUNG",
        "reset": "RESET",
        "locked": "🔒 LOCKED",
        "unlocked": "🔓"
      },
      "prompt": "Passwort:",
      "user": [
        "ccm.instance",
        "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.1.js",
        {
          "key": "pseudo",
          "realm": "guest",
          "guest": true
        }
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
    },
    {
      "label": "Prefix einer Frage",
      "name": "placeholder.prefix",
      "type": "text",
      "info": "Vor jeder Frage steht ein Prefix gefolgt von der Nummer der aktuellen Frage und der Gesamtzahl der Fragen. Der Prefix kann hier individuell festgelegt werden."
    }
  ],
  "ignore": {
    "defaults": {
      "css": [
        "ccm.load",
        "https://ccmjs.github.io/akless-components/quiz/resources/weblysleek-v2.css",
        {
          "context": "head",
          "url": "https://ccmjs.github.io/akless-components/resources/fonts/WeblySleekUI/font.css"
        }
      ],
      "placeholder": {
        "cancel": "Abbrechen",
        "prev": "Vorherige Frage",
        "submit": "Abschicken",
        "next": "Nächste Frage",
        "correct": "Korrekte Lösung: ",
        "finish": "Quiz abschließen",
        "prefix": "Frage"
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
  }
};

export const submit_quiz_en = {
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
    "<legend class='text-primary'>Questions and Answers</legend>",
    {
      "name": "questions",
      "type": "several",
      "items": [
        {
          "label": "Question",
          "name": "text",
          "type": "text",
          "info": "Enter the text of the question here. Additional questions can be added and removed using the corresponding plus and minus buttons."
        },
        {
          "label": "Type",
          "name": "input",
          "type": "radio",
          "info": "Choose Single Choice if only one answer or Multiple Choice if multiple answers can be selected.",
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
          "label": "Description",
          "name": "description",
          "type": "textarea",
          "info": "An additional description of the question can be entered here."
        },
        "<br>",
        {
          "name": "answers",
          "type": "several",
          "items": [
            {
              "label": "Answer",
              "name": "text",
              "type": "text",
              "info": "Enter the text for an answer option here. Additional answers can be added and removed using the corresponding plus and minus buttons."
            },
            {
              "label": "Correct",
              "name": "correct",
              "type": "checkbox",
              "info": "Indicates whether this answer is correct."
            },
            {
              "label": "Comment",
              "name": "comment",
              "type": "text",
              "info": "A comment can provide a hint as to why an answer is correct or incorrect. The comment will then be displayed along with the direct feedback."
            }
          ]
        }
      ]
    },
    "<br>",
    "<legend class=\"text-primary\">Advanced Settings</legend>",
    {
      "label": "START Button",
      "name": "start_button",
      "type": "checkbox",
      "info": "If activated, a START BUTTON is displayed before the quiz starts."
    },
    {
      "label": "Feedback",
      "name": "feedback",
      "type": "checkbox",
      "info": "If activated, direct feedback is displayed after answering a question."
    },
    {
      "label": "Progress Bar",
      "name": "progress_bar",
      "type": "checkbox",
      "info": "Wenn aktiviert, wird ein Fortschrittsbalken angezeigt, wenn das Quiz abgeschlossen ist."
    },
    {
      "label": "Navigation",
      "name": "navigation",
      "type": "checkbox",
      "info": "If activated, you can navigate between questions."
    },
    {
      "label": "Skippable",
      "name": "skippable",
      "type": "checkbox",
      "info": "If activated, questions can be skipped."
    },
    {
      "label": "Anytime Finish",
      "name": "anytime_finish",
      "type": "checkbox",
      "info": "If activated, not all questions need to be answered to complete the quiz."
    },
    {
      "label": "Time Limit",
      "name": "time",
      "type": "number",
      "min": 1,
      "info": "If specified, the quiz has a time limit and will automatically end after the specified number of seconds."
    },
    {
      "label": "Shuffle Questions",
      "name": "shuffle",
      "type": "checkbox",
      "info": "If activated, the questions are shuffled so that their order is random each time."
    },
    {
      "label": "Shuffle Answers",
      "name": "random",
      "type": "checkbox",
      "info": "If activated, the answers to the questions are displayed in random order."
    },
    {
      "label": "Escape HTML code",
      "name": "escape",
      "type": "checkbox",
      "info": "If activated, HTML code contained in questions and answers is not evaluated, but displayed unchanged."
    },
    {
      "label": "Save Results",
      "name": "data.store",
      "type": "select",
      "info": "Choose where to save the results.<ul class=\"m-0 pl-4\"><b>Local Database:</b> The results are saved in the local database of the web browser and are therefore only available on this device and also offline.</li><li><b>Server-side Database:</b> The results are stored in a server-side database. Specifically, it is a data server from the computer science department at the Bonn-Rhein-Sieg University of Applied Sciences in Germany.</li></ul>",
      "items": [
        {
          "inner": "Disabled",
          "value": "[%'%ccm.store%'%]"
        },
        {
          "inner": "Local Database",
          "value": "[%'%ccm.store%'%,{%'%name%'%:%'%quiz_results%'%}]"
        },
        {
          "inner": "Server-side Database",
          "value": "[%'%ccm.store%'%,{%'%name%'%:%'%quiz_results%'%,%'%url%'%:%'%https://ccm2.inf.h-brs.de%'%}]"
        }
      ]
    },
    {
      "label": "User Authentication",
      "name": "user",
      "type": "select",
      "info": "Select how a user must log in when completing the quiz so that their result can be saved.<ul class=\"m-0 pl-4\"><li><b>Guest Mode:</b> The user can log in with any username and without a password.</li><li><b>Digital Makerspace Account:</b> The user must log in with a Digital Makerspace account.</li><li><b>H-BRS FB02 Account:</b> The user must authenticate himself with an account from the Computer Science Department at Bonn-Rhein-Sieg University of Applied Sciences.</li><li><b>H-BRS FB02 Account with Pseudonym:</b> The same as the previous option, but the username is replaced with a pseudonym.</li><li><b>One-time Pseudonym:</b> The user is automatically logged in with a unique pseudonym. Each login returns a different pseudonym after a session has ended.</li></ul>",
      "items": [
        {
          "inner": "Disabled",
          "value": "null"
        },
        {
          "inner": "Guest Mode",
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
          "inner": "H-BRS FB02 Account with Pseudonym",
          "value": "[%'%ccm.instance%'%,%'%https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.1.js%'%,{%'%key%'%:%'%hbrsinfpseudo%'%,%'%realm%'%:%'%hbrsinfpseudo%'%}]"
        },
        {
          "inner": "One-time Pseudonym",
          "value": "[%'%ccm.instance%'%,%'%https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.1.js%'%,{%'%key%'%:%'%pseudo%'%,%'%realm%'%:%'%guest%'%,%'%guest%'%:true}]"
        }
      ]
    },
    "<br>",
    "<legend class=\"text-primary\">Finish actions after the quiz</legend>",
    {
      "label": "Confirmation Dialog",
      "name": "onfinish.confirm",
      "type": "text",
      "info": "If activated, the user must explicitly confirm before saving a solution. To activate this, specify the text that will be displayed to the user in the confirmation dialog."
    },
    {
      "label": "Clear Content",
      "name": "onfinish.clear",
      "type": "checkbox",
      "info": "If activated, the quiz is hidden after completion."
    },
    {
      "label": "Restart",
      "name": "onfinish.restart",
      "type": "checkbox",
      "info": "Indicates whether the quiz is restarted after completion."
    },
    {
      "label": "Success Dialog",
      "name": "onfinish.alert",
      "type": "text",
      "info": "Message displayed to the user when the submitted solution has been successfully saved."
    },
    "<br>",
    "<legend class=\"text-primary\">Labeling of Buttons</legend>",
    {
      "label": "Previous Question",
      "name": "placeholder.prev",
      "type": "text",
      "info": "Label for the button that switches to the previous question."
    },
    {
      "label": "Abschicken",
      "name": "placeholder.submit",
      "type": "text",
      "info": "Beschriftung für den Button, mit dem man die Lösung zu einer Frage abschickt."
    },
    {
      "label": "Next Question",
      "name": "placeholder.next",
      "type": "text",
      "info": "Label for the button that switches to the next question."
    },
    {
      "label": "Finish",
      "name": "placeholder.finish",
      "type": "text",
      "info": "Label for the button that completes the quiz."
    },
    {
      "label": "Prefix of a Question",
      "name": "placeholder.prefix",
      "type": "text",
      "info": "Before each question there is a prefix followed by the number of the current question and the total number of questions. The prefix can be individually defined here."
    }
  ],
  "ignore": {
    "defaults": {
      "css": [
        "ccm.load",
        "https://ccmjs.github.io/akless-components/quiz/resources/weblysleek-v2.css",
        {
          "context": "head",
          "url": "https://ccmjs.github.io/akless-components/resources/fonts/WeblySleekUI/font.css"
        }
      ],
      "placeholder": {
        "cancel": "Cancel",
        "prev": "Previous Question",
        "submit": "Submit",
        "next": "Next Question",
        "correct": "Correct solution: ",
        "finish": "Finish Quiz",
        "prefix": "Question"
      },
      "feedback": true,
      "progress_bar": true,
      "questions": [
        {
          "text": "First Question",
          "input": "radio",
          "answers": [
            {
              "text": "Answer A",
              "correct": true
            },
            {
              "text": "Answer B"
            }
          ]
        }
      ]
    }
  }
};

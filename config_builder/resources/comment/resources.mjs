/**
 * @overview data-based resources for building a commentary builder
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

/**
 * german texts and labels for commentary builder
 * @type {Object}
 */
export const de = {
  "controls": "Kontrollelemente",
  "controls_answer": "Antworten auf einen Kommentar",
  "controls_answer_info": "Jeder Kommentar hat einen Button, über den man gezielt auf diesen Kommentar antworten kann. Man kann auch auf einen eigenen Kommentar antworten.",
  "controls_delete": "Löschen von Kommentaren",
  "controls_delete_info": "Jeder eigene Kommentar hat einen Button, über den er als gelöscht markiert wird. Der Inhalt des Kommentars wird dann nicht mehr angezeigt. Kommentare anderer Benutzer können nicht gelöscht werden.",
  "controls_dislike": "\"Disliken\" von Kommentaren",
  "controls_dislike_info": "Jeder Kommentar hat einen Button, über den man ausgedrücken kann, dass der Kommentar einem <b>nicht</b> gefällt. Klicke erneut, um dies rückgängig zu machen. Eigene Kommentare sind nicht markierbar.",
  "controls_edit": "Nachträglich Kommentare ändern",
  "controls_edit_info": "Jeder eigene Kommentar hat einen Button, über den er nachträglich geändert werden kann. Kommentare anderer Benutzer können nicht bearbeitet werden.",
  "controls_heart": "Einem Kommentar ein \"Herz\" geben",
  "controls_heart_info": "Jeder Kommentar hat einen Button, über den man ausgedrücken kann, dass man den Kommentar ganz besonders schön findet. Klicke erneut, um dies rückgängig zu machen. Eigene Kommentare sind nicht markierbar.",
  "controls_like": "\"Liken\" von Kommentaren",
  "controls_like_info": "Jeder Kommentar hat einen Button, über den man ausdrücken kann, dass der Kommentar einem gefällt. Klicke erneut, um dies rückgängig zu machen. Eigene Kommentare sind nicht markierbar.",
  "controls_recycle": "Wiederherstellbare Kommentare",
  "controls_recycle_info": "Jeder gelöschte eigene Kommentar hat einen Button, über den er wiederhergestellt werden kann. Gelöschte Kommentare anderer Benutzer können nicht wiederhergestellt werden.",
  "controls_report": "Meldung unangemessener Kommentare",
  "controls_report_info": "Jeder Kommentar hat einen Button, über den er als unangemessen markiert wird. Klicke erneut, um dies rückgängig zu machen. Bitte beachte, dass es durch den dezentralen Ansatz dieser Anwendung keinen Betreiber gibt, der gemeldete Kommentare überprüft. Solche Kommentare werden aber deutlich mit einem roten Hintergrund als unangemessen gekennzeichnet. Bei gesetzeswidrigen Inhalten sollte eine Anzeige gegen den Verfasser des Kommentars gestellt werden.",
  "controls_sort": "Änderbare Kommentar-Sortierung",
  "controls_sort_info": "Oben befindet sich ein Button, über den die Sortierung der Kommentare jederzeit geändert werden kann.",
  "general": "Allgemeine Einstellungen",
  "labels": "Texte und Beschriftungen",
  "picture": "Standard-Portrait für Kommentare",
  "picture_info": "Das Bild hinter dieser URL wird als Portrait für den Verfasser eines Kommentars verwendet, wenn dieser kein eigenes Portrait in seinen Benutzerdaten hat. Erfolgt hier keine Angabe, wird bei Kommentaren kein Portrait angezeigt.",
  "preview": "Vorschau",
  "preview_title": "Vorschau der App",
  "sort": "Sortierung von Kommentaren",
  "sort_by_date": "nach Datum",
  "sort_by_rating": "nach Bewertung",
  "sort_info": "Legt fest, ob die Kommentare anfänglich nach Datum oder Bewertung sortiert werden.",
  "submit": "Abschicken",
  "text_answer": "Button: Auf Kommentar Antworten",
  "text_answer_info": "Beschriftung für den Button, mit dem man auf einen Kommentar antwortet.",
  "text_answers": "Button: Zeige Antworten",
  "text_answers_info": "Beschriftung für den Button, der alle Antworten eines Kommentars anzeigt. Nutze den Platzhalter \"%d\", er wird dynamisch durch die Anzahl der Antworten auf den Kommentar ersetzt.",
  "text_comments": "Anzeige der Anzahl der Kommentare",
  "text_comments_info": "Der Text der die Anzahl an Kommentaren angibt. Nutze den Platzhalter \"%d\", er wird dynamisch durch die Anzahl der Kommentare ersetzt.",
  "text_delete": "Button-Tooltip: Kommentar löschen",
  "text_delete_info": "Text der angezeigt wird, wenn der Mauszeiger über dem Button zum Löschen eines eigenen Kommentars verbleibt.",
  "text_deleted": "Anzeige: Gelöschter Kommentar",
  "text_deleted_info": "Text der als Markierung eines gelöschten Kommentars angezeigt wird.",
  "text_dislike": "Button-Tooltip: \"Dislike\"",
  "text_dislike_info": "Text der angezeigt wird, wenn der Mauszeiger über dem \"Unlike\"-Button eines Kommentars verbleibt.",
  "text_edit": "Button-Tooltip: Kommentar bearbeiten",
  "text_edit_info": "Text der angezeigt wird, wenn der Mauszeiger über dem Button zum Bearbeiten eines eigenen Kommentars verbleibt.",
  "text_heart": "Button-Tooltip: \"Herz\"",
  "text_heart_info": "Text der angezeigt wird, wenn der Mauszeiger über dem \"Herz\"-Button eines Kommentars verbleibt.",
  "text_like": "Button-Tooltip: \"Like\"",
  "text_like_info": "Text der angezeigt wird, wenn der Mauszeiger über dem \"Like\"-Button eines Kommentars verbleibt.",
  "text_picture": "Alternativtext für das Portrait eines Benutzers",
  "text_picture_info": "Der Text wird statt dem Portrait eines Benutzers angezeigt, falls es aus irgendwelchen Gründen nicht dargestellt werden kann.",
  "text_recycle": "Button-Tooltip: Kommentar wiederherstellen",
  "text_recycle_info": "Text der angezeigt wird, wenn der Mauszeiger über dem Button zum Wiederherstellen eines gelöschten Kommentars verbleibt.",
  "text_report": "Button-Tooltip: Unangemessener Kommentar",
  "text_report_info": "Text der angezeigt wird, wenn der Mauszeiger über dem Button zur Markierung eines unangemessenen Kommentars verbleibt.",
  "text_sort_by_date": "Button: Sortierung nach Datum",
  "text_sort_by_date_info": "Beschriftung des Buttons der anzeigt, dass Kommentare nach Datum sortiert sind.",
  "text_sort_by_rating": "Button: Sortierung nach Bewertung",
  "text_sort_by_rating_info": "Beschriftung des Buttons der anzeigt, dass die Kommentare nach Bewertung sortiert sind.",
  "text_submit": "Button: Kommentar abschicken",
  "text_submit_info": "Beschriftung für den Button zum Abschicken eines eigenen Kommentars.",
  "text_updated": "Markierung eines bearbeiteten Kommentars",
  "text_updated_info": "Text der als Markierung eines bearbeiteten Kommentars angezeigt wird.",
  "text_write_answer": "Platzhalter für Antwort-Eingabefelder",
  "text_write_answer_info": "Wenn das Eingabefeld zum Antworten auf einen Kommentar leer ist, wird dieser Text darin angezeigt.",
  "text_write_comment": "Platzhalter für Kommentar-Eingabefelder",
  "text_write_comment_info": "Wenn das Eingabefeld zum Schreiben eines neuen Kommentars leer ist, wird der hier festgelegte Text darin angezeigt.",
  "user": "Authentifizierung der Benutzer",
  "user_info": "Spätestens wenn ein Kommentar abgeschickt oder bewertet wird, muss sich der Benutzer anmelden. <ul class=\"m-0 pl-4\"><li><u>Gastmodus:</u> Der Benutzer kann sich mit einem beliebigen Namen ohne Passwort anmelden.</li><li><u>Digital Makerspace Account:</u> Anmeldung mit einem kostenlosen Digital Makerspace-Account.</li><li><u>H-BRS FB02 Account:</u> Der Benutzer muss sich mit mit einem Account des Fachbereichs Informatik der Hochschule Bonn-Rhein-Sieg anmelden.</li><li><u>H-BRS FB02 Account mit Pseudonym:</u> Das gleiche wie die vorherige Option, aber im Frontend wird der Benutzername durch ein Pseudonym ersetzt.</li><li><u>Einmaliges Pseudonym:</u> Man ist automatisch angemeldet unter einem zufällig generierten Pseudonym. Bei jedem Login nach Ablauf einer Session wird ein neues Pseudonym generiert.</li><li><u>Deaktiviert:</u> Weder das Schreiben noch das Bewerten von Kommentaren ist möglich. Kommentare können nur gelesen werden.</li></ul>"
};

/**
 * english texts and labels for commentary builder
 * @type {Object}
 */
export const en = {
  "controls": "Controls",
  "controls_answer": "Answerable Comments",
  "controls_answer_info": "Every comment has an \"Answer\" button that can be used to answer to the comment.",
  "controls_delete": "Deletable Comments",
  "controls_delete_info": "Every comment has a \"Delete\" button. Use it to mark a comment as deleted. Comments of other users can't be deleted.",
  "controls_dislike": "Dislikable Comments",
  "controls_dislike_info": "Every comment has a \"Dislike\" button. Use it to show that you don't like a comment. Click again to undo it. You can't mark an own comment as disliked.",
  "controls_edit": "Editable Comments",
  "controls_edit_info": "Every comment has an \"Edit\" button. Use it to edit the text of an own comment. Comments of other users can't be edited.",
  "controls_heart": "Lovable Comments",
  "controls_heart_info": "Every comment has a \"Heart\" button. Use it to show that you really love a comment. Click again to undo it. You can't mark an own comment as loved.",
  "controls_like": "Likable Comments",
  "controls_like_info": "Every comment has a \"Like\" button. Use it to show that you like a comment. Click again to undo it. You can't mark an own comment as liked.",
  "controls_recycle": "Restorable Comments",
  "controls_recycle_info": "Every deleted comment has a \"Restore\" button. Use it to restore a deleted comment. You can't restore deleted comments of other users.",
  "controls_report": "Reportable Comments",
  "controls_report_info": "Every comment has a \"Report\" button. Use it to mark a comment as inappropriate. Click again to undo it. Please be aware that there is no administrator who reviews reported comments. However, reported comments are shown with a red background.",
  "controls_sort": "Changeable Sorting of Comments",
  "controls_sort_info": "At the top there is a button that can be used to change the sorting of the comments at any time.",
  "general": "General Settings",
  "labels": "Texts and Labels",
  "picture": "Default User Picture",
  "picture_info": "The picture behind this URL is used as the picture for the author of a comment if he does not have his own picture in his user data. If no input is made here, no user picture will be displayed for comments.",
  "preview": "Preview",
  "preview_title": "App Preview",
  "sort": "Sorting of Comments",
  "sort_by_date": "Sort by Date",
  "sort_by_rating": "Sort by Rating",
  "sort_info": "Determines whether the comments are initial sorted by date or rating.",
  "submit": "Submit",
  "text_answer": "Button: Answer to Comment",
  "text_answer_info": "Label for the \"Answer\" button of a comment.",
  "text_answers": "Button: Show Answers",
  "text_answers_info": "Label for the button that shows all answers of a comment. The placeholder \"%d\" is replaced by the number of answers to the comment.",
  "text_comments": "Display: Number of Comments",
  "text_comments_info": "The text that displays the number of comments. The placeholder \"%d\" is replaced by the number of comments.",
  "text_delete": "Tooltip: Delete Comment",
  "text_delete_info": "Tooltip for the \"Delete\" button of an own comment that marks a comment as deleted.",
  "text_deleted": "Display: Deleted Comment",
  "text_deleted_info": "The text that indicates that a comment is deleted.",
  "text_dislike": "Tooltip: Dislike Comment",
  "text_dislike_info": "Tooltip for the \"Dislike\" button of a comment.",
  "text_edit": "Tooltip: Edit Comment",
  "text_edit_info": "Tooltip for the \"Edit\" button of an own comment.",
  "text_heart": "Tooltip: Give Comment a Heart",
  "text_heart_info": "Tooltip for the \"Heart\" button of a comment.",
  "text_like": "Button-Tooltip: Like Comment",
  "text_like_info": "Tooltip for the \"Like\" button of a comment.",
  "text_picture": "Alternative Text: User Picture",
  "text_picture_info": "Alternative text for the user picture of a comment.",
  "text_recycle": "Button: Restore Comment",
  "text_recycle_info": "Label for the \"Restore\" button of an own deleted comment.",
  "text_report": "Tooltip: Report Comment",
  "text_report_info": "Tooltip for the \"Report\" button that marks a comment as inappropriate.",
  "text_sort_by_date": "Button: Sort by Date",
  "text_sort_by_date_info": "Label for the \"Sort by Date\" button that indicates that all comments are sort by date.",
  "text_sort_by_rating": "Button: Sort by Rating",
  "text_sort_by_rating_info": "Label for the \"Sort by Rating\" button that indicates that all comments are sort by rating.",
  "text_submit": "Button: Submit Comment",
  "text_submit_info": "Label for the \"Submit\" button that creates a new comment.",
  "text_updated": "Display: Updated Comment",
  "text_updated_info": "The text that indicates that a comment was updated.",
  "text_write_answer": "Placeholder: Write an Answer",
  "text_write_answer_info": "The text that appears in an empty input field for a new answer.",
  "text_write_comment": "Placeholder: Write an Comment",
  "text_write_comment_info": "The text that appears in an empty input field for a new comment.",
  "user": "User Authentication",
  "user_info": "The user must log in to send or rate a comment.<ul class=\"m-0 pl-4\"><li><u>Guest Mode:</u> The user can authenticate with any username and without a password.</li><li><u>Digital Makerspace Account:</u> The user must log in with a Digital Makerspace account.</li><li><u>H-BRS FB02 Account:</u> The user has to authenticate with an account from the Department of Computer Sciences at Hochschule Bonn-Rhein-Sieg University of Applied Sciences.</li><li><u>H-BRS FB02 Account with Pseudonym:</u> The same as the previous option, but the username is replaced with a pseudonym.</li><li><u>One-time Pseudonym:</u> The user is automatically logged in with a one-time pseudonym. Each login after the end of a session returns a different pseudonym.</li><li><u>Deactivated:</u> It is not possible to write or rate comments. Comments can only be read.</li></ul>"
};

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "css": [ "ccm.load",
    [  // serial
      "./../../../libs/bootstrap-5/css/bootstrap.css",
      "./../styles.css"
    ],
    "./../../../libs/bootstrap-5/css/bootstrap-icons.css",
    { "url": "./../../../libs/bootstrap-5/css/bootstrap-fonts.css", "context": "head" }
  ],
  "defaults": {
    "text": [ "ccm.load", "https://ccmjs.github.io/tkless-components/comment/resources/resources.mjs#en" ]
  },
  "html": [ "ccm.load", "./templates.mjs" ],
  "ignore": {
    "defaults": {
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "guest" ] ]
    },
    "mapping": {
      "user": {
        "guest": {
          "key": "guest",
          "title": "Guest Mode",
          "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "guest" ] ]
        },
        "cloud": {
          "key": "cloud",
          "title": "Digital Makerspace Account",
          "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "cloud" ] ]
        },
        "hbrsinfkaul": {
          "key": "hbrsinfkaul",
          "title": "H-BRS FB02 Account",
          "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "hbrsinfkaul" ] ]
        },
        "hbrsinfpseudo": {
          "key": "hbrsinfpseudo",
          "title": "H-BRS FB02 Account with Pseudonym",
          "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "hbrsinfpseudo" ] ]
        },
        "pseudo": {
          "key": "pseudo",
          "title": "One-time Pseudonym",
          "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "pseudo" ] ]
        },
        "none": {
          "key": "none",
          "title": "Deactivated",
          "value": ""
        }
      }
    }
  },
  "lang": [ "ccm.start", "./../../../lang/ccm.lang.js", {
    "active": "en",
    "translations": { "de": de, "en": en }
  } ],
  "onfinish": { "log": true },
  "text": en,
  "tool": [ "ccm.component", "https://ccmjs.github.io/tkless-components/comment/ccm.comment.js" ]
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "defaults": {
    "text": [ "ccm.load", "https://ccmjs.github.io/tkless-components/comment/resources/resources.mjs#de" ]
  },
  "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/config_builder/resources/comment/templates.mjs" ],
  "ignore": {
    "defaults": {
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "guest" ] ]
    },
    "mapping": {
      "user": {
        "guest": {
          "key": "guest",
          "title": "Gastmodus",
          "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "guest" ] ]
        },
        "cloud": {
          "key": "cloud",
          "title": "Digital Makerspace Account",
          "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "cloud" ] ]
        },
        "hbrsinfkaul": {
          "key": "hbrsinfkaul",
          "title": "H-BRS FB02 Account",
          "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "hbrsinfkaul" ] ]
        },
        "hbrsinfpseudo": {
          "key": "hbrsinfpseudo",
          "title": "H-BRS FB02 Account mit Pseudonym",
          "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "hbrsinfpseudo" ] ]
        },
        "pseudo": {
          "key": "pseudo",
          "title": "Einmaliges Pseudonym",
          "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "pseudo" ] ]
        },
        "none": {
          "key": "none",
          "title": "Deaktiviert",
          "value": ""
        }
      }
    }
  },
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.0.0.min.js", {
    "active": "de",
    "translations": { "de": de, "en": en }
  } ],
  "text": de,
  "tool": [ "ccm.component", "https://ccmjs.github.io/tkless-components/comment/versions/ccm.comment-7.1.0.min.js" ]
};

/**
 * live configuration (absolute paths)
 * @type {Object}
 */
export const live = {
  "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/config_builder/resources/styles.min.css" ],
  "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/config_builder/resources/comment/templates.mjs" ],
  "ignore": {
    "defaults": {
      "data": { "store": [ "ccm.store", { "name": "dms2-comment-data", "url": "https://ccm2.inf.h-brs.de" } ] },
      "libs": [ "ccm.load", [
        [
          "https://ccmjs.github.io/tkless-components/libs/dayjs/dayjs.min.js",
          "https://ccmjs.github.io/tkless-components/libs/dayjs/relativeTime.min.js"
        ],
        "https://ccmjs.github.io/tkless-components/libs/dayjs/de.min.js"
      ] ],
      "text": {
        "key": "de",
        "answer": "ANTWORTEN",
        "answers": "Zeige %% Antworten",
        "comments": "%% Kommentare",
        "delete": "Kommentar löschen",
        "deleted": "(gelöscht)",
        "dislike": "Ich mag diesen Kommentar nicht",
        "edit": "Kommentar editieren",
        "heart": "Ich liebe diesen Kommentar",
        "like": "Ich mag diesen Kommentar",
        "picture": "Profilbild des Benutzers",
        "recycle": "Löschen des Kommentars rückgängig machen",
        "report": "Diesen Kommentar als unangemessen markieren",
        "sort_by_date": "Sortierung nach Datum",
        "sort_by_rating": "Sortierung nach Bewertung",
        "submit": "Abschicken",
        "updated": "(bearbeitet)",
        "write_answer": "Schreibe eine Antwort...",
        "write_comment": "Schreibe einen Kommentar..."
      },
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "cloud" ] ]
    },
    "mapping": {
      "user": {
        "guest": {
          "key": "guest",
          "title": "Guest Mode",
          "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "guest" ] ]
        },
        "cloud": {
          "key": "cloud",
          "title": "Digital Makerspace Account",
          "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "cloud" ] ]
        },
        "hbrsinfkaul": {
          "key": "hbrsinfkaul",
          "title": "H-BRS FB02 Account",
          "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "hbrsinfkaul" ] ]
        },
        "hbrsinfpseudo": {
          "key": "hbrsinfpseudo",
          "title": "H-BRS FB02 Account with Pseudonym",
          "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "hbrsinfpseudo" ] ]
        },
        "pseudo": {
          "key": "pseudo",
          "title": "One-time Pseudonym",
          "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "pseudo" ] ]
        },
        "none": {
          "key": "none",
          "title": "Deactivated",
          "value": ""
        }
      }
    }
  },
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.0.0.min.js", {
    "translations": { "de": de, "en": en }
  } ],
  "libs": "",
  "onstart": onStart,
  "text": de,
  "tool": [ "ccm.component", "https://ccmjs.github.io/tkless-components/comment/ccm.comment.min.js" ]
};

/**
 * when config builder is started and the initial app configuration is loaded
 * @param instance - config builder instance
 * @param config - initial app configuration
 * @returns {Promise<*>}
 */
async function onStart( instance, config ) {
  config.text = await instance.ccm.helper.solveDependency( config.text );
  return config;
}

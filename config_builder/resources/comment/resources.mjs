/**
 * @overview data-based resources for building a commentary builder
 * @author André Kless <andre.kless@web.de> 2021-2022
 * @license The MIT License (MIT)
 */

import { de as comment_de, en as comment_en } from 'https://ccmjs.github.io/tkless-components/comment/resources/resources.mjs';

/**
 * german texts and labels for commentary builder
 * @type {Object}
 */
export const builder_de = {
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
  "option_guest": "Gastmodus",
  "picture": "Standard-Portrait für Kommentare",
  "picture_info": "Das Bild hinter dieser URL wird als Portrait für den Verfasser eines Kommentars verwendet, wenn dieser kein eigenes Portrait in seinen Benutzerdaten hat. Erfolgt hier keine Angabe, wird bei Kommentaren kein Portrait angezeigt.",
  "preview": "Vorschau",
  "preview_title": "Vorschau der App",
  "sort": "Sortierung von Kommentaren",
  "sort_by_date": "nach Datum",
  "sort_by_rating": "nach Bewertung",
  "sort_info": "Legt fest, ob die Kommentare anfänglich nach Datum oder Bewertung sortiert werden.",
  "submit": "Abschicken",
  "user": "Authentifizierung der Benutzer",
  "user_cloud": "Digital Makerspace Account",
  "user_guest": "Gastmodus",
  "user_hbrsinfkaul": "H-BRS FB02 Account",
  "user_hbrsinfpseudo": "H-BRS FB02 Account mit Pseudonym",
  "user_info": "Spätestens wenn ein Kommentar abgeschickt oder bewertet wird, muss sich der Benutzer anmelden. <ul class=\"m-0 pl-4\"><li><u>Gastmodus:</u> Der Benutzer kann sich mit einem beliebigen Namen ohne Passwort anmelden.</li><li><u>Digital Makerspace Account:</u> Anmeldung mit einem kostenlosen Digital Makerspace-Account.</li><li><u>H-BRS FB02 Account:</u> Der Benutzer muss sich mit mit einem Account des Fachbereichs Informatik der Hochschule Bonn-Rhein-Sieg anmelden.</li><li><u>H-BRS FB02 Account mit Pseudonym:</u> Das gleiche wie die vorherige Option, aber im Frontend wird der Benutzername durch ein Pseudonym ersetzt.</li><li><u>Einmaliges Pseudonym:</u> Man ist automatisch angemeldet unter einem zufällig generierten Pseudonym. Bei jedem Login nach Ablauf einer Session wird ein neues Pseudonym generiert.</li><li><u>Deaktiviert:</u> Weder das Schreiben noch das Bewerten von Kommentaren ist möglich. Kommentare können nur gelesen werden.</li></ul>",
  "user_none": "Deaktiviert",
  "user_pseudo": "Einmaliges Pseudonym"
};

/**
 * english texts and labels for commentary builder
 * @type {Object}
 */
export const builder_en = {
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
  "picture": "Default User Picture",
  "picture_info": "The picture behind this URL is used as the picture for the author of a comment if he does not have his own picture in his user data. If no input is made here, no user picture will be displayed for comments.",
  "preview": "Preview",
  "preview_title": "App Preview",
  "sort": "Sorting of Comments",
  "sort_by_date": "Sort by Date",
  "sort_by_rating": "Sort by Rating",
  "sort_info": "Determines whether the comments are initial sorted by date or rating.",
  "submit": "Submit",
  "user": "User Authentication",
  "user_cloud": "Digital Makerspace Account",
  "user_guest": "Guest Mode",
  "user_hbrsinfkaul": "H-BRS FB02 Account",
  "user_hbrsinfpseudo": "H-BRS FB02 Account with Pseudonym",
  "user_info": "The user must log in to send or rate a comment.<ul class=\"m-0 pl-4\"><li><u>Guest Mode:</u> The user can authenticate with any username and without a password.</li><li><u>Digital Makerspace Account:</u> The user must log in with a Digital Makerspace account.</li><li><u>H-BRS FB02 Account:</u> The user has to authenticate with an account from the Department of Computer Sciences at Hochschule Bonn-Rhein-Sieg University of Applied Sciences.</li><li><u>H-BRS FB02 Account with Pseudonym:</u> The same as the previous option, but the username is replaced with a pseudonym.</li><li><u>One-time Pseudonym:</u> The user is automatically logged in with a one-time pseudonym. Each login after the end of a session returns a different pseudonym.</li><li><u>Deactivated:</u> It is not possible to write or rate comments. Comments can only be read.</li></ul>",
  "user_none": "Deactivated",
  "user_pseudo": "One-time Pseudonym"
};

/**
 * default values and mappings for app configuration
 * @type {Object}
 */
export const { defaults, mapping } = {
  "defaults": {
    "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.0.0.min.js", {
      "translations": { "de": comment_de, "en": comment_en }
    } ],
    "libs": [ "ccm.load", [
      [
        "https://ccmjs.github.io/tkless-components/libs/dayjs/dayjs.min.js",
        "https://ccmjs.github.io/tkless-components/libs/dayjs/relativeTime.min.js"
      ],
      "https://ccmjs.github.io/tkless-components/libs/dayjs/de.min.js"
    ] ],
    "text": [ "ccm.load", "https://ccmjs.github.io/tkless-components/comment/resources/resources.mjs#de" ],
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
};

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "bootstrap": [ "ccm.load", "./../../../libs/bootstrap-5/js/bootstrap.bundle.js" ],
  "css": [ "ccm.load",
    [  // serial
      "./../../../libs/bootstrap-5/css/bootstrap.css",
      "./../../../libs/bootstrap-5/css/bootstrap-dark.css",
      "./../styles.css"
    ],
    "./../../../libs/bootstrap-5/css/bootstrap-icons.css",
    { "url": "./../../../libs/bootstrap-5/css/bootstrap-fonts.css", "context": "head" }
  ],
  "html": [ "ccm.load", "./templates.mjs" ],
  "ignore": { "defaults": defaults, "mapping": mapping },
  "lang": [ "ccm.start", "./../../../lang/ccm.lang.js", {
    "translations": { "de": builder_de, "en": builder_en }
  } ],
  "onfinish": { "log": true },
  "text": builder_de,
  "tool": [ "ccm.component", "https://ccmjs.github.io/tkless-components/comment/ccm.comment.js" ]
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/config_builder/resources/comment/templates.mjs" ],
  "ignore": { "defaults": defaults, "mapping": mapping },
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.0.0.min.js", {
    "translations": { "de": builder_de, "en": builder_en }
  } ],
  "text": builder_de,
  "tool": [ "ccm.component", "https://ccmjs.github.io/tkless-components/comment/versions/ccm.comment-7.1.0.min.js" ]
};

/**
 * configuration for Digital Makerspace
 * @type {Object}
 */
export const dms = {
  "bootstrap": "",
  "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/dms/resources/styles.min.css" ],
  "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/config_builder/resources/comment/templates.mjs" ],
  "ignore": {
    "defaults": {
      "data": {
        "store": [ "ccm.store", { "name": "dms2-comment-data", "url": "https://ccm2.inf.h-brs.de" } ]
      },
      "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.0.0.min.js", {
        "translations": { "de": comment_de, "en": comment_en }
      } ],
      "libs": [ "ccm.load", [
        [
          "https://ccmjs.github.io/tkless-components/libs/dayjs/dayjs.min.js",
          "https://ccmjs.github.io/tkless-components/libs/dayjs/relativeTime.min.js"
        ],
        "https://ccmjs.github.io/tkless-components/libs/dayjs/de.min.js"
      ] ],
      "text": [ "ccm.load", "https://ccmjs.github.io/tkless-components/comment/resources/resources.mjs#de" ],
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "guest" ] ]
    },
    "mapping": mapping
  },
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.0.0.min.js", {
    "translations": { "de": builder_de, "en": builder_en }
  } ],
  "preview": false,
  "text": builder_de,
  "tool": [ "ccm.component", "https://ccmjs.github.io/tkless-components/comment/versions/ccm.comment-7.1.0.min.js" ]
}

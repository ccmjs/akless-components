/**
 * @overview data-based resources for building a PDF viewer builder
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

/**
 * german texts and labels for PDF viewer builder
 * @type {Object}
 */
const de = {
  "downloadable": "PDF kann heruntergeladen werden",
  "downloadable_info": "Wenn aktiviert, gibt es in der Navigationsleiste einen zusätzlichen Button, über den das PDF heruntergeladen werden kann. Außerdem kann die aktuelle Seite mittels Rechtsklick als Bild gespeichert werden. Sie können den Download des PDFs über die Weboberfläche verhindern, indem Sie dieses Feld deaktivieren.",
  "general": "Allgemeine Einstellungen",
  "labels": "Texte und Beschriftungen",
  "pdf": "URL des PDF",
  "pdf_info": "Wenn Sie das PDF nur als Datei auf Ihrem Dateisystem haben, müssen Sie es zunächst unter einer öffentlichen URL veröffentlichen, die Sie dann hier angeben. Wichtig ist, dass das PDF auch domainübergreifend über <a href='https://de.wikipedia.org/wiki/Cross-Origin_Resource_Sharing' target='_blank'>CORS</a> zugänglich ist. Entwickler, die mit <a href='https://github.com/about/' target='_blank'>GitHub</a> vertraut sind, können <a href='https://pages.github.com/' target='_blank'>GitHub Pages</a> verwenden. Über GitHub Pages kann das PDF kostenlos veröffentlicht werden und CORS ist dort bereits standardmäßig eingestellt.",
  "preview": "Vorschau",
  "preview_title": "Vorschau der App",
  "submit": "Abschicken",
  "text_denied": "Meldung: Zugriff verweigert",
  "text_denied_info": "Meldung, die bei einem passwortgeschützten PDF erscheint, nachdem ein falsches Passwort eingegeben wurde.",
  "text_download": "Button-Tooltip: PDF herunterladen",
  "text_download_info": "Tooltip, der erscheint, wenn der Mauszeiger über den Button \"PDF herunterladen\" bewegt wird.",
  "text_first": "Button-Tooltip: Erste Seite",
  "text_first_info": "Tooltip, der erscheint, wenn der Mauszeiger über den Button \"Erste Seite\" bewegt wird.",
  "text_jump": "Button-Tooltip: Zu bestimmter Seite springen",
  "text_jump_info": "Tooltip, der erscheint, wenn der Mauszeiger über das Eingabefeld bewegt wird, mit dem man zu einer bestimmten Seite springt.",
  "text_last": "Button-Tooltip: Letzte Seite",
  "text_last_info": "Tooltip, der erscheint, wenn der Mauszeiger über den Button \"Letzte Seite\" bewegt wird.",
  "text_next": "Button-Tooltip: Nächste Seite",
  "text_next_info": "Tooltip, der erscheint, wenn der Mauszeiger über den Button \"Nächste Seite\" bewegt wird.",
  "text_prev": "Button-Tooltip: Vorherige Seite",
  "text_prev_info": "Tooltip, der erscheint, wenn der Mauszeiger über den Button \"Vorherige Seite\" bewegt wird.",
  "text_protected": "Meldung: Geschütztes PDF",
  "text_protected_info": "Meldung, die bei einem passwortgeschützten PDF erscheint."
};

/**
 * english texts and labels for PDF viewer builder
 * @type {Object}
 */
const en = {
  "downloadable": "PDF can be downloaded",
  "downloadable_info": "If enabled, there is an additional button in the navigation bar that can be used to download the PDF. In addition, the current page can be saved as an image by right-clicking on a page. You can prevent the PDF from being downloaded via the web interface by deactivating this field.",
  "general": "General Settings",
  "labels": "Texts and Labels",
  "pdf": "URL of the PDF",
  "pdf_info": "If you only have the PDF as a file on your filesystem, you must first publish it under a public URL, which you then specify here. It is important that the PDF can also be accessed cross-domain using <a href='https://en.wikipedia.org/wiki/Cross-origin_resource_sharing' target='_blank'>CORS</a>. Developers familiar with <a href='https://github.com/about/' target='_blank'>GitHub</a> can use <a href='https://pages.github.com/' target='_blank'>GitHub Pages</a>. Via GitHub Pages the PDF can be published for free and CORS is already set there by default.",
  "preview": "Preview",
  "preview_title": "App Preview",
  "submit": "Submit",
  "text_denied": "Message: Access Denied",
  "text_denied_info": "Message that appears in the case of a password-protected PDF when you have entered an incorrect password.",
  "text_download": "Tooltip: Download PDF",
  "text_download_info": "Tooltip that appears when you move the mouse cursor over the \"Download PDF\" button.",
  "text_first": "Tooltip: First Page",
  "text_first_info": "Tooltip that appears when you move the mouse cursor over the \"First Page\" button.",
  "text_jump": "Tooltip: Jump to Page",
  "text_jump_info": "Tooltip that appears when you move the mouse cursor over the input field that let you jump to a specific page.",
  "text_last": "Tooltip: Last Page",
  "text_last_info": "Tooltip that appears when you move the mouse cursor over the \"Last Page\" button.",
  "text_next": "Tooltip: Next Page",
  "text_next_info": "Tooltip that appears when you move the mouse cursor over the \"Next Page\" button.",
  "text_prev": "Tooltip: Previous Page",
  "text_prev_info": "Tooltip that appears when you move the mouse cursor over the \"Previous Page\" button.",
  "text_protected": "Message: Protected PDF",
  "text_protected_info": "Message that appears in the case of a password-protected PDF."
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
  "html": [ "ccm.load", "./templates.mjs" ],
  "id": "pvb",
  "onstart": onStart,
  "onfinish": { "log": true },
  "text": en,
  "tool": [ "ccm.component", "https://ccmjs.github.io/tkless-components/pdf_viewer/versions/ccm.pdf_viewer-7.0.0.min.js" ]
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/config_builder/resources/pdf_viewer/templates.mjs" ],
  "id": "pvb",
  "onstart": onStart,
  "text": de,
  "tool": [ "ccm.component", "https://ccmjs.github.io/tkless-components/pdf_viewer/versions/ccm.pdf_viewer-7.0.0.min.js", [ "ccm.load", "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/resources.mjs#demo" ] ]
};

/**
 * live configuration (absolute paths)
 * @type {Object}
 */
export const live = {
  "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/config_builder/resources/styles.min.css" ],
  "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/config_builder/resources/pdf_viewer/templates.mjs" ],
  "id": "pvb",
  "libs": "",
  "onstart": onStart,
  "text": de,
  "tool": [ "ccm.component", "https://ccmjs.github.io/tkless-components/pdf_viewer/versions/ccm.pdf_viewer-7.0.0.min.js", [ "ccm.load", "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/resources.mjs#demo" ] ]
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

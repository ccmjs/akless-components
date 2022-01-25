/**
 * @overview data-based resources for building a PDF viewer builder
 * @author André Kless <andre.kless@web.de> 2021-2022
 * @license The MIT License (MIT)
 */

/**
 * german texts and labels for PDF viewer builder
 * @type {Object}
 */
export const de = {
  "downloadable": "PDF kann heruntergeladen werden",
  "downloadable_info": "Wenn aktiviert, gibt es in der Navigationsleiste einen zusätzlichen Button, über den das PDF heruntergeladen werden kann. Außerdem kann die aktuelle Seite mittels Rechtsklick als Bild gespeichert werden. Sie können den Download des PDFs über die Weboberfläche verhindern, indem Sie dieses Feld deaktivieren.",
  "pdf": "URL des PDF",
  "pdf_info": "Wenn Sie das PDF nur als Datei auf Ihrem Dateisystem haben, müssen Sie es zunächst unter einer öffentlichen URL veröffentlichen, die Sie dann hier angeben. Wichtig ist, dass das PDF auch domainübergreifend über <a href='https://de.wikipedia.org/wiki/Cross-Origin_Resource_Sharing' target='_blank'>CORS</a> zugänglich ist. Entwickler, die mit <a href='https://github.com/about/' target='_blank'>GitHub</a> vertraut sind, können <a href='https://pages.github.com/' target='_blank'>GitHub Pages</a> verwenden. Über GitHub Pages kann das PDF kostenlos veröffentlicht werden und CORS ist dort bereits standardmäßig eingestellt.",
  "preview": "Vorschau",
  "preview_title": "Vorschau der App",
  "submit": "Abschicken"
};

/**
 * english texts and labels for PDF viewer builder
 * @type {Object}
 */
export const en = {
  "downloadable": "PDF can be downloaded",
  "downloadable_info": "If enabled, there is an additional button in the navigation bar that can be used to download the PDF. In addition, the current page can be saved as an image by right-clicking on a page. You can prevent the PDF from being downloaded via the web interface by deactivating this field.",
  "pdf": "URL of the PDF",
  "pdf_info": "If you only have the PDF as a file on your filesystem, you must first publish it under a public URL, which you then specify here. It is important that the PDF can also be accessed cross-domain using <a href='https://en.wikipedia.org/wiki/Cross-origin_resource_sharing' target='_blank'>CORS</a>. Developers familiar with <a href='https://github.com/about/' target='_blank'>GitHub</a> can use <a href='https://pages.github.com/' target='_blank'>GitHub Pages</a>. Via GitHub Pages the PDF can be published for free and CORS is already set there by default.",
  "preview": "Preview",
  "preview_title": "App Preview",
  "submit": "Submit"
};

/**
 * default values for app configuration
 * @type {Object}
 */
export const defaults = {
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.0.0.min.js", {
    "translations": {
      "de": [ "ccm.load", "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/resources.mjs#de" ],
      "en": [ "ccm.load", "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/resources.mjs#en" ]
    }
  } ],
  "pdf": "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/demo/de/slides.pdf",
  "routing": [ "ccm.instance", "https://ccmjs.github.io/akless-components/routing/versions/ccm.routing-3.0.0.min.js" ],
  "text": [ "ccm.load", "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/resources.mjs#de" ]
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
  "ignore": { "defaults": defaults },
  "lang": [ "ccm.start", "./../../../lang/ccm.lang.js", {
    "translations": { "de": de, "en": en }
  } ],
  "onfinish": { "log": true },
  "text": de,
  "tool": [ "ccm.component", "https://ccmjs.github.io/tkless-components/pdf_viewer/ccm.pdf_viewer.js" ]
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/config_builder/resources/pdf_viewer/templates.mjs" ],
  "ignore": { "defaults": defaults },
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.0.0.min.js", {
    "translations": { "de": de, "en": en }
  } ],
  "text": de,
  "tool": [ "ccm.component", "https://ccmjs.github.io/tkless-components/pdf_viewer/versions/ccm.pdf_viewer-7.1.0.min.js" ]
};

/**
 * configuration for digital makerspace (absolute paths)
 * @type {Object}
 */
export const live = {
  "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/config_builder/resources/styles.min.css" ],
  "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/config_builder/resources/pdf_viewer/templates.mjs" ],
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.0.0.min.js", {
    "translations": { "de": de, "en": en }
  } ],
  "text": de,
  "tool": [ "ccm.component", "https://ccmjs.github.io/tkless-components/pdf_viewer/ccm.pdf_viewer.min.js" ]
};

/**
 * @overview data-based resources for building a "Q&A Slidecast"
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

import { slides_de } from 'https://ccmjs.github.io/tkless-components/qa_slidecast/resources/resources.mjs';
import { text_en as slidecast_en, text_de as slidecast_de } from 'https://ccmjs.github.io/tkless-components/qa_slidecast/resources/resources.mjs';
import { en as viewer_en, de as viewer_de } from 'https://ccmjs.github.io/tkless-components/pdf_viewer/resources/resources.mjs';
import { de as comment_de } from 'https://ccmjs.github.io/tkless-components/comment/resources/resources.mjs';

/**
 * english texts and labels for "Q&A Slidecast" builder
 * @type {Object}
 */
const builder_en = {
  "add_left": "Adds an app, image or video before this slide.",
  "add_right": "Adds an app, image or video after this slide.",
  "add_title": "Expand Slides",
  "comment": "..be commented",
  "comment_info": "If enabled, there is a comment area under each slide for questions and answers about the slide. Commenting can also be deactivated for certain slides. Further settings can be made in the \"Commentary\" tab.",
  "commentary": "Commentary",
  "confirm": "Confirm",
  "delete": "Delete Slide",
  "description": "..have an optional description",
  "description_info": "If enabled, each slide can optionally have an individual description, which is then displayed below the slide. A separate app can be specified as a description instead of a text.",
  "edit_title": "Slide Settings",
  "headline": "Slides can..",
  "pdf_viewer_2_downloadable": "..be downloaded",
  "pdf_viewer_2_downloadable_info": "If enabled, there is an additional button in the navigation bar that can be used to download the slides as PDF. In addition, the current slide can be saved as an image by right-clicking on the slide. You can prevent the slides from being downloaded via the web interface by deactivating this field.",
  "pdf_viewer_2_pdf": "URL of the Slides",
  "pdf_viewer_2_pdf_info": "If you only have the slides only as a PDF file on your filesystem, you must first publish it under a public URL, which you then specify here. It is important that the PDF can also be accessed cross-domain using <a href='https://en.wikipedia.org/wiki/Cross-origin_resource_sharing' target='_blank'>CORS</a>. Developers familiar with <a href='https://github.com/about/' target='_blank'>GitHub</a> can use <a href='https://pages.github.com/' target='_blank'>GitHub Pages</a>. Via GitHub Pages the PDF can be published for free and CORS is already set there by default.",
  "pdf_viewer_2_text_denied": "Message: Access Denied",
  "pdf_viewer_2_text_denied_info": "Message that appears in the case of a password-protected PDF when you have entered an incorrect password.",
  "pdf_viewer_2_text_download": "Tooltip: Download Slides",
  "pdf_viewer_2_text_download_info": "Tooltip that appears when you move the mouse cursor over the \"Download Slides\" button.",
  "pdf_viewer_2_text_first": "Tooltip: First Slide",
  "pdf_viewer_2_text_first_info": "Tooltip that appears when you move the mouse cursor over the \"First Slide\" button.",
  "pdf_viewer_2_text_jump": "Tooltip: Jump to Slide",
  "pdf_viewer_2_text_jump_info": "Tooltip that appears when you move the mouse cursor over the input field that let you jump to a specific slide.",
  "pdf_viewer_2_text_last": "Tooltip: Last Slide",
  "pdf_viewer_2_text_last_info": "Tooltip that appears when you move the mouse cursor over the \"Last Slide\" button.",
  "pdf_viewer_2_text_next": "Tooltip: Next Slide",
  "pdf_viewer_2_text_next_info": "Tooltip that appears when you move the mouse cursor over the \"Next Slide\" button.",
  "pdf_viewer_2_text_prev": "Tooltip: Previous Slide",
  "pdf_viewer_2_text_prev_info": "Tooltip that appears when you move the mouse cursor over the \"Previous Slide\" button.",
  "pdf_viewer_2_text_protected": "Message: Protected Slides",
  "pdf_viewer_2_text_protected_info": "Message that appears in the case of a password-protected PDF.",
  "preview": "Preview",
  "preview_title": "App Preview",
  "resource": "What should be added?",
  "resource_info": "What should be added?",
  "resource_app": "App",
  "resource_app_input": "HTML Embed Code of the App",
  "resource_app_input_info": "Enter the HTML embed code of an app that has already been created in the Digital Makerspace.",
  "resource_image": "Image",
  "resource_image_input": "URL of the Image File",
  "resource_image_input_info": "Enter the URL of an image file. If you only have the image as a file on your filesystem, you must first publish it under a public URL, which you then specify here.",
  "resource_video": "Video",
  "resource_video_input": "URL of the Video File",
  "resource_video_input_info": "Enter the URL of a video file. If you only have the video as a file on your filesystem, you must first publish it under a public URL, which you then specify here.",
  "resource_youtube": "YouTube",
  "resource_youtube_input": "URL of the YouTube Video",
  "resource_youtube_input_info": "Enter the web address of a YouTube video here.",
  "section_basis": "Basis",
  "section_commentary": "Commentary",
  "section_labels": "Labels",
  "section_slides": "Slides",
  "settings_button": "Slide Settings",
  "settings_title": "The slide can be extended with an audio or a description. In addition, the commenting for this slide can be deactivated if necessary.",
  "slide_audio": "Audio",
  "slide_audio_info": "Enter the URL of an audio. If you only have the audio as a file on your filesystem, you must first publish it under a public URL, which you then specify here.",
  "slide_commentary": "Commentary",
  "slide_commentary_info": "The commenting for this slide can be switched off.",
  "slide_content": "Content",
  "slide_content_info": "Enter the HTML embed code of an app or the URL to an image file, a video file or a YouTube video.",
  "slide_description": "Description",
  "slide_description_info": "This text is displayed below the slide as a slide description. Alternatively, the HTML embed code of a separate app that has already been created in the Digital Makerspace can pasted here. This app will then be displayed instead of a slide description.",
  "submit": "Submit",
  "text_comments": "Tooltip: Slide Comments",
  "text_comments_info": "Tooltip that appears when you move the mouse cursor over the \"Show/Hide Slide Comments\" button.",
  "text_description": "Tooltip: Slide Description",
  "text_description_info": "Tooltip that appears when you move the mouse cursor over the \"Show/Hide Slide Description\" button."
};

/**
 * german texts and labels for "Q&A Slidecast" builder
 * @type {Object}
 */
const builder_de = {
  "add_left": "Fügt vor dieser Folie eine App, ein Bild oder ein Video hinzu.",
  "add_right": "Fügt nach dieser Folie eine App, ein Bild oder ein Video hinzu.",
  "add_title": "Folien erweitern",
  "comment": "..kommentiert werden",
  "comment_info": "Wenn aktiviert, gibt es unter jeder Folie einen Kommentarbereich für Fragen und Antworten zur Folie. Die Kommentierung kann für bestimmte Folien auch deaktiviert werden. Im Reiter \"Kommentierung\" können noch weitere Einstellungen vorgenommen werden.",
  "confirm": "Bestätigen",
  "delete": "Folie löschen",
  "description": "..optionale Beschreibung haben",
  "description_info": "Wenn aktiviert, kann für jede Folie optional eine individuelle Beschreibung hinterlegt werden, die dann unter der Folie angezeigt wird. Statt einem Text kann auch eine separate App angegeben werden.",
  "edit_title": "Folieneinstellungen",
  "headline": "Folien können..",
  "pdf_viewer_2_downloadable": "..heruntergeladen werden",
  "pdf_viewer_2_downloadable_info": "Wenn aktiviert, gibt es in der Navigationsleiste einen Button, über den die Folien als PDF heruntergeladen werden können. Außerdem kann die aktuelle Folie per Rechtsklick als Bild gespeichert werden. Sie können den Download der Folien über die Weboberfläche verhindern, indem Sie dieses Feld deaktivieren.",
  "pdf_viewer_2_pdf": "URL der Folien",
  "pdf_viewer_2_pdf_info": "Wenn Sie die Folien nur als PDF-Datei auf Ihrem Dateisystem haben, müssen Sie es zunächst unter einer öffentlichen URL veröffentlichen, die Sie dann hier angeben. Wichtig ist, dass das PDF auch domainübergreifend über <a href='https://de.wikipedia.org/wiki/Cross-Origin_Resource_Sharing' target='_blank'>CORS</a> zugänglich ist. Entwickler, die mit <a href='https://github.com/about/' target='_blank'>GitHub</a> vertraut sind, können <a href='https://pages.github.com/' target='_blank'>GitHub Pages</a> verwenden. Über GitHub Pages kann das PDF kostenlos veröffentlicht werden und CORS ist dort bereits standardmäßig eingestellt.",
  "pdf_viewer_2_text_denied": "Meldung: Zugriff verweigert",
  "pdf_viewer_2_text_denied_info": "Meldung, die bei einem passwortgeschützten PDF erscheint, nachdem ein falsches Passwort eingegeben wurde.",
  "pdf_viewer_2_text_download": "Button-Tooltip: Folien herunterladen",
  "pdf_viewer_2_text_download_info": "Tooltip, der erscheint, wenn der Mauszeiger über den Button \"Folien herunterladen\" bewegt wird.",
  "pdf_viewer_2_text_first": "Button-Tooltip: Erste Folie",
  "pdf_viewer_2_text_first_info": "Tooltip, der erscheint, wenn der Mauszeiger über den Button \"Erste Folie\" bewegt wird.",
  "pdf_viewer_2_text_jump": "Button-Tooltip: Zu einer bestimmten Folie springen",
  "pdf_viewer_2_text_jump_info": "Tooltip, der erscheint, wenn der Mauszeiger über das Eingabefeld bewegt wird, mit dem man zu einer bestimmten Folie springt.",
  "pdf_viewer_2_text_last": "Button-Tooltip: Letzte Folie",
  "pdf_viewer_2_text_last_info": "Tooltip, der erscheint, wenn der Mauszeiger über den Button \"Letzte Folie\" bewegt wird.",
  "pdf_viewer_2_text_next": "Button-Tooltip: Nächste Folie",
  "pdf_viewer_2_text_next_info": "Tooltip, der erscheint, wenn der Mauszeiger über den Button \"Nächste Folie\" bewegt wird.",
  "pdf_viewer_2_text_prev": "Button-Tooltip: Vorherige Folie",
  "pdf_viewer_2_text_prev_info": "Tooltip, der erscheint, wenn der Mauszeiger über den Button \"Vorherige Folie\" bewegt wird.",
  "pdf_viewer_2_text_protected": "Meldung: Geschützte Folien",
  "pdf_viewer_2_text_protected_info": "Meldung, die bei einem passwortgeschützten PDF erscheint.",
  "preview": "Vorschau",
  "preview_title": "Vorschau der App",
  "resource": "Was soll hinzugefügt werden?",
  "resource_info": "Was soll hinzugefügt werden?",
  "resource_app": "App",
  "resource_app_input": "HTML-Einbettungscode der App",
  "resource_app_input_info": "Geben Sie hier den HTML-Einbettungscode einer bereits im Digital Makerspace erstellten App an.",
  "resource_image": "Bild",
  "resource_image_input": "URL der Bilddatei",
  "resource_image_input_info": "Geben Sie die URL einer Bilddatei ein. Wenn Sie das Bild nur als Datei auf Ihrem Dateisystem haben, müssen Sie es zunächst unter einer öffentlichen URL veröffentlichen, die Sie dann hier angeben.",
  "resource_video": "Video",
  "resource_video_input": "URL der Videodatei",
  "resource_video_input_info": "Geben Sie die URL einer Videodatei ein. Wenn Sie das Video nur als Datei auf Ihrem Dateisystem haben, müssen Sie es zunächst unter einer öffentlichen URL veröffentlichen, die Sie dann hier angeben.",
  "resource_youtube": "YouTube",
  "resource_youtube_input": "URL des YouTube-Videos",
  "resource_youtube_input_info": "Geben Sie hier die Webadresse eines YouTube-Videos ein.",
  "section_basis": "Grundlage",
  "section_commentary": "Kommentierung",
  "section_labels": "Texte",
  "section_slides": "Folien",
  "settings_button": "Folieneinstellungen",
  "settings_title": "Die Folie kann um ein Audio oder eine Beschreibung erweitert werden. Zudem kann bei Bedarf die Kommentierung für diese Folie deaktiviert werden.",
  "slide_audio": "Audio",
  "slide_audio_info": "Geben Sie die URL einer Audiodatei ein. Wenn Sie das Audio nur als Datei auf Ihrem Dateisystem haben, müssen Sie es zunächst unter einer öffentlichen URL veröffentlichen, die Sie dann hier angeben.",
  "slide_commentary": "Kommentierung",
  "slide_commentary_info": "Die Kommentierung für diese Folie kann ausgeschaltet werden.",
  "slide_content": "Inhalt",
  "slide_content_info": "Geben Sie hier den HTML-Einbettungscode einer App oder die URL zu einer Bilddatei, einer Videodatei oder einem YouTube-Video an.",
  "slide_description": "Beschreibung",
  "slide_description_info": "Dieser Text wird unter der Folie als Folienbeschreibung angezeigt. Alternativ kann hier auch der HTML-Einbettungscode einer separaten App, die bereits im Digital Makerspace erstellt wurde, eingefügt werden. Diese App wird dann anstelle einer Folienbeschreibung angezeigt.",
  "submit": "Abschicken",
  "text_comments": "Button-Tooltip: Folienkommentare",
  "text_comments_info": "Tooltip, der erscheint, wenn der Mauszeiger über den Button zum Ein-/Ausblenden der Folienkommentare bewegt wird.",
  "text_description": "Button-Tooltip: Folienbeschreibung",
  "text_description_info": "Tooltip, der erscheint, wenn der Mauszeiger über den Button zum Ein-/Ausblenden der Folienbeschreibung bewegt wird."
};

/**
 * example for app state data
 * @type {Object}
 */
const example = {
  "comment": [ "ccm.component", "https://ccmjs.github.io/tkless-components/comment/versions/ccm.comment-7.0.0.min.js", { "text": comment_de } ],
  "ignore": { "slides": slides_de },
  "pdf_viewer": [ "ccm.start", "https://ccmjs.github.io/tkless-components/pdf_viewer/versions/ccm.pdf_viewer-7.0.0.min.js", {
    "downloadable": true,
    "pdf": "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/demo/de/slides.pdf",
    "text": viewer_de
  } ],
  "text": slidecast_de
};

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "comment_builder.1": "./../config_builder/ccm.config_builder.js",
  "comment_builder.2.src.1": "./../config_builder/resources/comment/resources.mjs#basic",
  "css": [ "ccm.load",
    [  // serial
      "./../libs/bootstrap-5/css/bootstrap.css",
      "./../qa_slidecast_builder/resources/styles.css"
    ],
    "./../libs/bootstrap-5/css/bootstrap-icons.css",
    { "url": "./../libs/bootstrap-5/css/bootstrap-fonts.css", "context": "head" }
  ],
  "data": {
    "store": [ "ccm.store", { "app": example } ],
    "key": "app"
  },
  "defaults": {
    "pdf_viewer.2": {
      "downloadable": true,
      "pdf": "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/demo/en/slides.pdf",
      "text": viewer_en
    },
    "text": slidecast_en
  },
  "helper.1": "./../modules/helper.mjs",
  "html.1": "./../qa_slidecast_builder/resources/templates.mjs",
  "logger": [ "ccm.instance", "./../log/ccm.log.js", [ "ccm.get", "./../log/resources/configs.js", "greedy" ] ],
  "onfinish": { "log": true },
  "text": builder_en
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "defaults": {
    "pdf_viewer.2": {
      "downloadable": true,
      "pdf": "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/demo/de/slides.pdf",
      "text": viewer_de,
    },
    "text": slidecast_de
  },
  "text": builder_de
};
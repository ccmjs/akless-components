/**
 * @overview data-based resources of ccmjs-based web component for building an image map
 * @author André Kless <andre.kless@web.de> 2022
 * @license The MIT License (MIT)
 */

/**
 * german texts and labels
 * @type {Object}
 */
export const de = {
  "add_area": "Neuen Bereich hinzufügen",
  "area_app": "App-URL oder Einbettungscode",
  "area_app_info": "Wenn angeben, wird, wenn der Bereich anklickt wird, die entsprechende App angezeigt.",
  "area_image": "Bilddatei des Bereichs",
  "area_image_info": "Web-URL unter der die Bilddatei für den Bereich ist.",
  "area_info": "Tooltip des Bereichs",
  "area_info_info": "Dieser Text wird beim Bereich als Beschreibung angezeigt, wenn der Mauszeiger darüber ist.",
  "areas": "Platzierung von Bereichen auf der Karte",
  "areas_info": "Benutze den Button, um eine neuen Bereich auf der Karte hinzuzufügen. Ziehe den Bereich anschließend per Drag'n'Drop an die gewünschte Stelle auf der Karte. Durch einen Doppelklick auf den Bereich können weitere Einstellungen vorgenommen werden.",
  "back": "Beschriftung für Zurück-Button",
  "back_info": "Beschriftung für den Button, über den man wieder zurück zur Karte gelangt",
  "confirm": "Alle Bereiche auf der Karte werden entfernt. Sind Sie sicher?",
  "dark": "Dark Mode",
  "dark_auto": "Automatisch",
  "dark_false": "Aus",
  "dark_info": "Im Dark Mode erscheint die Bildkarte in einem dunklen Layout, was gesünder für die Augen und die Batterie ist. Ob ein Dark Mode bevorzugt wird, kann auch automatisch über das Betriebssystem des App-Nutzers ermittelt werden.",
  "dark_true": "Ein",
  "delete_areas": "Alle Bereiche entfernen",
  "height": "Höhe der Karte",
  "height_info": "Die Höhe der Karte in Pixel. Wird hier kein Wert angegeben, richtet sich die Höhe nach der Breite, so dass das Größenverhältnis der Bilddatei erhalten bleibt.",
  "image": "Bilddatei der Karte",
  "image_info": "Web-URL unter der die Bilddatei für die Karte ist.",
  "info": "Infotext zur Karte",
  "info_info": "Dieser Text wird über der Bildkarte als Beschreibung angezeigt.",
  "modal_cancel": "Abbrechen",
  "modal_delete": "Löschen",
  "modal_submit": "Bestätigen",
  "modal_title": "Einstellungen für den Bereich",
  "preview": "Vorschau",
  "preview_title": "Vorschau der App",
  "submit": "Abschicken",
  "width": "Breite der Karte",
  "width_info": "Die Breite der Karte in Pixel."
};

/**
 * english texts and labels
 * @type {Object}
 */
export const en = {
  "add_area": "Add new Area",
  "area_app": "App URL or Embed Code",
  "area_app_info": "If specified, when the area is clicked, the corresponding app will be displayed.",
  "area_image": "Image File of the Area",
  "area_image_info": "Web URL of the image file for the area.",
  "area_info": "Area Tooltip",
  "area_info_info": "This text is displayed as a description for the area when the mouse pointer is over it.",
  "areas": "Placement of Areas on the Map",
  "areas_info": "Use the button to add a new area on the map. Then drag and drop the area to the desired location on the map. By double-clicking on the area, the settings for the area can be adjusted.",
  "back": "Caption for 'Back to Map' Button",
  "back_info": "Caption for the button that takes you back to the map from the app view.",
  "confirm": "All areas on the map will be removed. Are you sure?",
  "dark": "Dark Mode",
  "dark_auto": "Automatically",
  "dark_false": "Off",
  "dark_info": "In Dark Mode, the image map appears in a dark layout, which is healthier for the eyes and the battery. Whether a dark mode is preferred can also be determined automatically via the app user's operating system.",
  "dark_true": "On",
  "delete_areas": "Remove all Areas",
  "height": "Height of the Map",
  "height_info": "The height of the map in pixels. If no value is specified here, the height depends on the width, so that the aspect ratio of the image file is preserved.",
  "image": "Image File of the Map",
  "image_info": "Web URL of the image file for the map.",
  "info": "Info Text for the Map",
  "info_info": "This text is displayed above the map as a description.",
  "modal_cancel": "Cancel",
  "modal_delete": "Delete",
  "modal_submit": "Submit",
  "modal_title": "Settings for the Area",
  "preview": "Preview",
  "preview_title": "App Preview",
  "submit": "Submit",
  "width": "Width of the Map",
  "width_info": "The width of the map in pixels."
};

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "css": [ "ccm.load",
    [
      "./../libs/bootstrap-5/css/bootstrap.css",
      "./../libs/bootstrap-5/css/bootstrap-dark.css",
      "./../config_builder/resources/styles.css",
      "./../image_map_builder/resources/styles.css"
    ],
    "./../libs/bootstrap-5/css/bootstrap-icons.min.css",
    { "url": "./../libs/bootstrap-5/css/bootstrap-fonts.min.css", "context": "head" }
  ],
  "dark": false,
  "data": {},
  "helper.1": "./../modules/helper.mjs",
  "html.1": "./../image_map_builder/resources/templates.mjs",
  "image_map.1": "./../image_map/ccm.image_map.js",
  "lang": [ "ccm.start", "./../../../lang/ccm.lang.js", {
    "translations": { "de": de, "en": en }
  } ],
  "libs": [ "ccm.load",
    "./../libs/bootstrap-5/js/bootstrap.bundle.min.js",
    "./../libs/moveable/moveable.min.js"
  ],
//"logger": [ "ccm.instance", "./../log/ccm.log.js", [ "ccm.get", "./../log/resources/configs.js", "greedy" ] ],
//"onchange": event => console.log( 'onchange', event ),
  "onfinish": { "log": true },
//"onstart": event => { console.log( 'onstart', event ); return event.config; },
  "text": de,
  "tool": [ "ccm.component", "./../image_map/ccm.image_map.js", [ "ccm.load", "./../image_map/resources/resources.mjs#test" ] ]
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "dark": "auto",
  "ignore": {},
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.min.js", {
    "translations": { "de": de, "en": en }
  } ],
  "onfinish": { "log": true },
  "text": de
};

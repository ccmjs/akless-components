/**
 * @overview data-based resources of ccmjs-based web component for building an image map
 * @author André Kless <andre.kless@web.de> 2022
 * @license The MIT License (MIT)
 */

/**
 * configuration for used ccm.submit.js
 * @type {Object}
 */
export const submit_config = {
  "entries": [
    "<legend class='text-primary'>Festlegung der Karte</legend>",
    {
      "label": "Bild-URL",
      "name": "image",
      "type": "url",
      "info": "Webadresse der Grafik für die Bildkarte, auf der Apps platziert werden."
    },
    {
      "label": "Infotext",
      "name": "info",
      "type": "textarea",
      "info": "Infotext zur Bildkarte, der in der Infobox angezeigt wird, wenn sich der Mauszeiger über keiner App-Region befindet. Der Text kann auch HTML zur Schriftformatierung enthalten."
    },
    "<legend class='text-primary'>Zu platzierende Apps</legend>",
    {
      "name": "ignore.areas",
      "type": "several",
      "items": [
        {
          "label": "App-URL oder Einbettungscode",
          "name": "app",
          "type": "text",
          "info": "Jede App aus dem Digital Makerspace kann hier platziert werden. Geben Sie dafür die App-URL oder den Einbettungscode der App an."
        },
        {
          "label": "Bild-URL",
          "name": "image",
          "type": "url",
          "info": "Webadresse der Grafik, die auf der Karte die App repräsentieren soll."
        },
        {
          "label": "Infotext",
          "name": "info",
          "type": "textarea",
          "info": "Infotext zur App-Region, der in der Infobox angezeigt wird, wenn sich der Mauszeiger über der App-Region befindet. Der Text kann auch HTML zur Schriftformatierung enthalten."
        },
        {
          "label": "Größe",
          "name": "size",
          "type": "number",
          "min": 1,
          "info": "Wie groß soll die App-Region auf der Karte dargestellt werden? (1-1000)"
        },
        {
          "label": "Ordnungsnummer",
          "name": "order",
          "type": "number",
          "min": 0,
          "info": "Hier können Sie festlegen, welche App-Regionen im Vordergrund und welche im Hintergrund angezeigt werden. Eine App-Region mit einer höheren Ordnungsnummer wird vor einer App-Region mit einer niedrigeren Ordnungsnummer angezeigt."
        }
      ]
    },
    "<legend class='text-primary'>Platzierung der App-Regionen auf der Bildkarte</legend>",
  ]
};

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "css.1": "./../image_map_builder/resources/styles.css",
  "data": {},
  "helper.1": "./../modules/helper.mjs",
  "html.1": "./../image_map_builder/resources/templates.html",
  "ignore": {},
  "image_map.1": "./../image_map/ccm.image_map.js",
  "logger": [ "ccm.instance", "./../log/ccm.log.js", [ "ccm.get", "./../log/resources/configs.js", "greedy" ] ],
  "onchange": event => console.log( 'onchange', event ),
  "onstart": event => { console.log( 'onstart', event ); return event.config; },
  "submit": [ "ccm.component", "./../submit/ccm.submit.js", submit_config ],
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "ignore": {}
};

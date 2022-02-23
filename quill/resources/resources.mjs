/**
 * @overview data-based resources of ccmjs-based web component for a Quill Rich Text Editor
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "buttons": [
    {
      "inner": "<svg viewBox='0 0 18 18'><path class='ql-stroke' d='M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3'></path></svg>",
      "onclick": event => {
        const { index, length } = event.instance.quill.selection.savedRange;
        const selectedText = event.quill.getText( index, length );
        const newText = selectedText.toUpperCase();
        event.instance.quill.deleteText( index, length );
        event.instance.quill.insertText( index, newText );
        event.instance.quill.setSelection( index, newText.length );
      }
    }
  ],
  "css": [ "ccm.load", [
    "./../libs/quill-1/quill.snow.css",
    "./../quill/resources/styles.css"
  ] ],
//"data": { "value": "<ccm-app component=\"https://ccmjs.github.io/eild/mc/ccm.mc.min.js\" src=\"[&quot;ccm.get&quot;,{&quot;name&quot;:&quot;dms2-configs&quot;,&quot;url&quot;:&quot;https://ccm2.inf.h-brs.de&quot;},[&quot;mc&quot;,&quot;1643700693147X19795855069461665&quot;]]\"></ccm-app><p><br></p>" },
  "embed": {
    "icon": "<img src='./../dms/resources/icon-18.png' title='Über dieses Icon kann eine App aus dem Digital Makerspace eingefügt werden.'>",
    "prompt": "Einbettungscode oder App-URL:"
  },
  "helper.1": "./../modules/helper.mjs",
  "html": true,
  "onchange": event => console.log( 'onchange', event.instance.getValue() ),
  "onstart": event => console.log( 'onstart', event.instance.getValue() )
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {};
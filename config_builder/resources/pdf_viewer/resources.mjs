/**
 * @overview data-based resources for building a PDF viewer builder
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

/**
 * basic configuration
 * @type {Object}
 */
const basic = {
  "id": "pvb",
  "text": {
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
    "text_protected_info": "Message that appears in the case of a password-protected PDF.",
    "text_user": "Required Account",
    "text_user_info": "Here you can set whether the PDF should only be displayed for people who log in with a specific account.<ul class=\"m-0 pl-4\"><li><b>Digital Makerspace Account:</b> The user must log in with a Digital Makerspace account.</li><li><b>H-BRS FB02 Account:</b> The user has to authenticate with an account from the Department of Computer Sciences at Hochschule Bonn-Rhein-Sieg University of Applied Sciences.</li></ul>"
  },
  "tool": [ "ccm.component", "https://ccmjs.github.io/tkless-components/pdf_viewer/versions/ccm.pdf_viewer-7.0.0.js" ]
};

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const local = {
  "css": [ "ccm.load",
    [  // serial
      "./../../../libs/bootstrap-5/css/bootstrap.css",
      "./../styles.css"
    ],
    "./../../../libs/bootstrap-5/css/bootstrap-icons.css",
    { "url": "./../../../libs/bootstrap-5/css/bootstrap-fonts.css", "context": "head" }
  ],
  "html": [ "ccm.load", "./templates.mjs" ],
  "src": basic
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/config_builder/resources/pdf_viewer/templates.mjs" ],
  "src": basic
};
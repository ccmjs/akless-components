/**
 * @overview ccmjs-based web component for selectize
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (19.11.2021)
 */

( () => {
  const component = {
    name: 'selectize',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.1.1.min.js',
    config: {
//    "create": true,
//    "create_on_blur": true,
      "css": [ "ccm.load", [
        "https://ccmjs.github.io/akless-components/libs/selectize-0/selectize.css",
        "https://ccmjs.github.io/akless-components/selectize/resources/styles.css"
      ] ],
      "items": [],
      "libs": [ "ccm.load", [
        "https://ccmjs.github.io/akless-components/libs/jquery-3/jquery.min.js",
        "https://ccmjs.github.io/akless-components/libs/selectize-0/selectize.min.js",
        [
          "https://ccmjs.github.io/akless-components/libs/selectize-0/remove_button-plugin.min.js",
          [
            "https://ccmjs.github.io/akless-components/libs/jquery-ui-1/jquery-ui-sortable.min.js",
            "https://ccmjs.github.io/akless-components/libs/selectize-0/drag_drop-plugin.min.js"
          ]
        ]
      ] ],
//    "onchange": items => console.log( items ),
      "options": [],
//    "placeholder": "Please enter here...",
//    "plugins": [ "drag_drop", "remove_button" ]
    },
    Instance: function () {
      let selectize;
      this.start = async () => {
        this.element.innerHTML = '<select multiple style="font-family: Arial,sans-serif">';
        selectize = jQuery( this.element.querySelector( 'select' ) ).selectize( {
          create: this.create,
          createOnBlur: this.create_on_blur,
          items: this.items,
          labelField: 'value',
          options: this.options.map( option => { return { value: option } } ),
          placeholder: this.placeholder,
          plugins: this.plugins,
          onChange: this.onchange
        } );
      };
      this.getValue = () => [ ...( selectize.items || [] ) ];
    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
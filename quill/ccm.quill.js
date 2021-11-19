/**
 * @overview ccmjs-based web component for quill
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 */

( () => {
  const component = {
    name: 'quill',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.1.1.min.js',
    config: {
      "css": [ "ccm.load", [
        "https://ccmjs.github.io/akless-components/libs/quill-1/quill.snow.min.css",
        "https://ccmjs.github.io/akless-components/quill/resources/styles.css"
      ] ],
//    "data": { "ops": [ { "insert": "Hello, World!\n" } ] },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.8.0.min.mjs" ],
      "libs": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/quill-1/quill.min.js" ],
//    "onchange": instance => console.log( instance.getValue() ),
      "options": { "theme": "snow" },
      "shadow": "none"
    },
    Instance: function () {
      let $;
      this.start = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );
        this.quill = new Quill( this.element, this.options );
        this.data && this.quill.setContents( await $.dataset( this.data ) );
        this.onchange && this.quill.on( 'text-change', () => this.onchange( this ) );
      };
      this.getHTML = () => this.quill.root.innerHTML;
      this.getValue = () => this.quill.getContents();
    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
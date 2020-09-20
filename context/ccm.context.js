/**
 * @overview ccm component for visualization of a ccm context
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (18.09.2020)
 */
( () => {
  const component = {
    name: 'context',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.0.0.js',
    config: {
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/context/resources/styles.css" ],
      "dark": true,
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-6.0.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/context/resources/templates.mjs" ],
      "instance": [ "ccm.instance", "https://ccmjs.github.io/akless-components/blank_blank/ccm.blank_blank.js" ]
    },
    Instance: function () {
      let $;
      this.init = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );
      }
      this.start = async () => {
        this.dark && this.element.setAttribute( 'dark', '' );
        $.render( $.html( this.html.main, this.ccm.context.root( this.instance ) ), this.element );
      }
    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
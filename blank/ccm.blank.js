/**
 * @overview example for a simple ccmjs-based web component that just renders "Hello, World!"
 * @author André Kless <andre.kless@web.de> 2017-2018, 2021
 * @license The MIT License (MIT)
 */

( () => {
  const component = {
    name: 'blank',
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',
    config: { name: 'World' },
    Instance: function () {
      this.start = async () => {
        this.element.innerHTML = 'Hello, ' + this.name + '!';
      };
    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
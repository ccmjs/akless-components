/**
 * @overview example ccm component for reusing any number of ccm instances of the same component
 * @author André Kless <andre.kless@web.de> 2017-2018
 * @license The MIT License (MIT)
 */

( () => {

  const component = {

    name: 'multi_blank',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config:  {
      component_obj: [ "ccm.component", "../blank/ccm.blank.js" ],
      times: 3
    },

    Instance: function () {

      this.start = async () => {

        this.element.innerHTML = '';

        for ( let i = 1; i <= this.times; i++ )
          this.element.appendChild( ( await this.component_obj.start() ).root );

      }

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
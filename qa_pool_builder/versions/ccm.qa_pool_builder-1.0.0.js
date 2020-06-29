/**
 * @overview ccm component for generating a "Q&A Pool" app configuration
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 * @version 1.0.0
 * @changes
 * version 1.0.0 (30.06.2020)
 */

( () => {
  const component = {
    name: 'qa_pool_builder', version: [ 1, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.5.3.js',
    config: {
      css: [ 'ccm.load', 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css' ]
    },
    Instance: function () {
      let $;
      this.start = async () => this.element.innerHTML = `
<style>
#element {
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  padding: 0 20px;
  background-color: white;
}
</style>
<h2><span>Settings </span><small class="text-primary">Q&amp;A Pool</small></h2>
<p><span>There are no settings that you have to make.</span><br><span>You can click directly on 'Create as New' below.</span></p>
      `;
      this.getValue = () => {
        const key = this.ccm.helper.generateKey();
        return {
          "live_poll": {
            "url": "https://ccmjs.github.io/akless-components/live_poll/versions/ccm.live_poll-2.4.0.js",
            "store": [ "ccm.store", { "url": "wss://ccm2.inf.h-brs.de", "name": "qa_" + key + "_live_poll" } ],
            "results": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "qa_" + key + "_live_poll_results" } ],
            "password": "teacher"
          },
          "quiz": {
            "url": "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.1.0.js",
            "store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "qa_" + key + "_quiz" } ]
          },
          "data": {
            "store": [ "ccm.store", { "name": "qa_pool_" + key, "url": "https://ccm2.inf.h-brs.de" } ],
            "key": key
          }
        };
      };
    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
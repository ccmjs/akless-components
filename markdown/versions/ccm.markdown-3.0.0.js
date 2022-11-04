'use strict';

/**
 * @overview <i>ccmjs</i>-based web component for displaying content defined via Markdown.
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @author André Kless <andre.kless@h-brs.de> 2022
 * @license The MIT License (MIT)
 * @version 3.0.0
 * @changes
 * version 3.0.0 (04.11.2022): reimplementation by akless
 */

( () => {

  /**
   * <i>ccmjs</i>-based web component for displaying content defined via Markdown.
   * @namespace WebComponent
   * @type {object}
   * @property {string} name - Unique identifier of the component.
   * @property {number[]} [version] - Version of the component according to Semantic Versioning 2.0 (default: latest version).
   * @property {string} ccm - URL of the (interchangeable) ccmjs version used at the time of publication.
   * @property {app_config} config - Default app configuration.
   * @property {Class} Instance - Class from which app instances are created.
   */
  const component = {
    name: 'markdown',
    version: [ 3, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.4.2.min.js',
    config: {
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/markdown/resources/styles-v1.min.css" ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.4.0.min.mjs" ],
      "html": { "tag": "main" },
      "input": "# Hello Markdown!",
      "lib": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/showdown-2/showdown.min.js" ],
//    "onready": event => console.log( event ),
//    "onstart": event => console.log( event )
    },
    /**
     * @class
     * @memberOf WebComponent
     */
    Instance: function () {

      /**
       * Shortcut to helper functions
       * @private
       * @type {Object.<string,function>}
       */
      let $;

      /**
       * When the instance is created, when all dependencies have been resolved and before the dependent sub-instances are initialized and ready. Allows dynamic post-configuration of the instance.
       * @async
       * @readonly
       * @function
       */
      this.init = async () => {

        // Merge all helper functions and offer them via a single variable.
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // Interpret Light DOM.
        if ( this.inner?.innerText?.trim() ) this.input = this.inner.innerText.trim();

      };

      /**
       * When the instance is created and after all dependent sub-instances are initialized and ready. Allows the first official actions of the instance that should only happen once.
       * @async
       * @readonly
       * @function
       */
      this.ready = async () => {

        // Trigger 'ready' event
        this.onready && await this.onready( { instance: this } );

      };

      /**
       * Starts the app and renders the content in the webpage area.
       * @async
       * @readonly
       * @function
       */
      this.start = async () => {

        // Render Markdown as HTML in the webpage area.
        $.setContent( this.element, $.html( this.html ) );
        $.setContent( this.element.querySelector( 'main' ), new showdown.Converter().makeHtml( this.input ) );

        // Trigger 'start' event
        this.onstart && await this.onstart( { instance: this } );

      }

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();

/**
 * App configuration.
 * @typedef {object} app_config
 * @prop {array} css - CSS dependencies.
 * @prop {array} helper - Dependency on helper functions.
 * @prop {string} input - Markdown
 * @prop {array} lib - Dependency on library that converts Markdown to HTML.
 * @prop {function} [onready] - Is called once before the first start of the app.
 * @prop {function} [onstart] - When the app has finished starting.
 */

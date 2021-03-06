/**
 * @overview ccmjs-baed web component for a "Highchart.js" chart
 * @author André Kless <andre.kless@web.de> 2017-2019, 2021
 * @copyright Copyright (c) 2017-2019, 2021 André Kless
 * @license
 * Creative Commons Attribution-NonCommercial 3.0: https://creativecommons.org/licenses/by-nc/3.0/
 * Only for not-for-profit educational use.
 *
 * This ccmjs-based web component uses „Highcharts JS“: https://www.highcharts.com
 * Make sure that you have a valid license of „Highcharts JS“ before using this ccmjs-based web component.
 *
 * The developer André Kless of this component has a valid license of „Highcharts JS“ for not-for-profit educational use for the following product(s): Highcharts, Highstock, Highmaps
 * @version latest (3.0.4)
 * @changes
 * version 3.0.4 (23.04.2021):
 * - uses ccmjs v26.3.1 as default
 * - uses helper.mjs v7.2.0 as default
 * version 3.0.3 (05.03.2021):
 * - uses ccmjs v26.1.1 as default
 * - uses helper.mjs v7.0.0 as default
 * - updated minified component line
 * version 3.0.2 (16.10.2019):
 * - bug fix for component ready function
 * - uses ccmjs v24.0.4 as default
 * version 3.0.1 (10.10.2019):
 * - uses ccmjs v24.0.1 as default
 * version 3.0.0 (22.01.2019):
 * - "Highchart.js" library is executed only once
 * - URL to "Highchart.js" can be changed via global component namespace and no more via instance configuration
 * (for older version changes see ccm.highchart-2.0.1.js)
 */

( () => {

  const component = {
    name: 'highchart',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.3.1.js',
    config: {
      "data": {},
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.2.0.mjs" ],
      "html": { "id": "chart", "style": "%%" },
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "settings": {},
      "style": "min-width: 400px; max-width: 800px; min-height: 400px; max-height: 800px; margin: 0 auto"
    },

    ready: async function () {

      // make sure that "Highchart.js" library is executed only once
      !window.Highcharts && await this.ccm.load( this.ccm.components[ component.index ].lib || 'https://ccmjs.github.io/akless-components/libs/highcharts/highcharts.js' );

    },

    Instance: function () {

      let $, data;

      this.ready = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // determine data to be visualized
        data = await $.dataset( this.data );

        // convert data to array
        if ( $.isObject( data ) ) {
          const arr = [];
          for ( const key in data )
            arr.push( [ key, data[ key ] ] );
          data = arr;
        }

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( data ) );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html, this.style ) );

        /**
         * contains chart
         * @type {Element}
         */
        const chart_elem = this.element.querySelector( '#chart' );

        // render chart
        this.chart = Highcharts.chart( chart_elem, $.clone( this.settings ) );

        // resize chart
        await $.sleep( 1 );
        this.chart.redraw();

      };

      /**
       * returns visualized data
       * @returns {Object} current result data
       */
      this.getValue = () => $.clone( data );

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
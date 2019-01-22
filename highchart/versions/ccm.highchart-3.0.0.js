/**
 * @overview ccm component for rendering a "Highchart.js" chart
 * @author André Kless <andre.kless@web.de> 2017-2019
 * @copyright Copyright (c) 2017-2019 Andre Kless
 * @license
 * Creative Commons Attribution-NonCommercial 3.0: https://creativecommons.org/licenses/by-nc/3.0/
 * Only for not-for-profit educational use.
 *
 * This ccm component uses „Highcharts JS“: https://www.highcharts.com
 * Make sure that you have a valid license of „Highcharts JS“ before using this ccm component.
 *
 * The developer Andre Kless of this component has a valid license of „Highcharts JS“ for not-for-profit educational use for the following product(s): Highcharts, Highstock, Highmaps
 * @version latest (3.0.0)
 * @changes
 * version 3.0.0 (22.01.2019):
 * - "Highchart.js" library is executed only once
 * - URL to "Highchart.js" can be changed via global component namespace and no more via instance configuration
 * version 2.0.1 (16.01.2019):
 * - uses ccm v19.0.0
 * version 2.0.0 (27.10.2018)
 * - uses ccm v18.0.7
 * - removed privatization of instance members
 * - removed chart type switcher
 * - reduced chart specific config parameters
 * - added default chart size
 * version 1.0.0 (21.12.2017)
 */

( function () {

  const component = {

    name: 'highchart',

    version: [ 3, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-19.0.0.js',

    config: {

      "html": { "id": "chart", "style": "%%" },
      "data": {},
      "settings": {},
      "style": "min-width: 400px; max-width: 800px; min-height: 400px; max-height: 800px; margin: 0 auto"

  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ]

    },

    ready: async function () {

      // make sure that "Highchart.js" library is executed only once
      !window.Highcharts && await this.ccm.load( this.ccm.components[ component.index ].lib || 'https://ccmjs.github.io/akless-components/libs/highcharts/highcharts.js' );

    },

    Instance: function () {

      let $, data;

      this.ready = async () => {

        // set shortcut to help functions
        $ = self.ccm.helper;

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
        $.wait( 1, () => this.chart.redraw() );

      };

      /**
       * returns visualized data
       * @returns {Object} current result data
       */
      this.getValue = () => data;

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
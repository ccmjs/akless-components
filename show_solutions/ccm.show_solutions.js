/**
 * @overview ccm component for rendering a list of all submitted solutions
 * @author André Kless <andre.kless@web.de> 2018-2019
 * @license The MIT License (MIT)
 * @version latest (2.0.0)
 * @changes
 * version 2.0.0 (03.04.2019)
 * - uses ccm v20
 * - removed privatization of instance members
 * version 1.0.0 (17.05.2018)
 */

( function () {

  const component = {

    name: 'show_solutions',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {
      "data": {
        "store": [ "ccm.store" ],
        "key": {}
      },
      "message": "Nothing to display."
    },

    Instance: function () {

      let $;

      /**
       * submitted solutions
       * @type {Object[]}
       */
      let solutions;

      this.start = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // clear own website area
        $.setContent( this.element, '' );

        // get submitted solutions
        solutions = await $.dataset( this.data );

        // no given solutions? => render message that there is nothing to display
        if ( !Array.isArray( solutions ) || solutions.length === 0 ) return $.setContent( this.element, this.message );

        /**
         * headlines of table columns
         * @type {string[]}
         */
        let table_head = {};

        let col_settings = [];

        const mapping = [];

        // iterate over each submitted solution
        solutions.map( ( solution, i ) => {

          // remove not relevant solution properties
          delete solution.created_at; delete solution.updated_at; delete solution._; delete solution.key;
          mapping[ i ] = solution.key;

          if ( Object.keys( solution ).length > Object.keys( table_head ).length ) table_head = Object.keys( solution );

          col_settings.push( { "disabled": true, type: "textarea" } );

        } );

        // render list of submitted solutions
        this.target.start( {
          root: this.element,
          data: solutions,
          table_head: table_head,
          table_col: Object.keys( table_head ).length,
          col_settings: col_settings,
          submit: false
        } );

      };

      /**
       * returns the current result data
       * @returns {Object[]} current result data
       */
      this.getValue = () => $.clone( solutions );

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
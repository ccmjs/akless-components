/**
 * @overview ccm component for rendering a point list of an user
 * @author André Kless <andre.kless@web.de> 2018-2019
 * @license The MIT License (MIT)
 * @version latest (2.0.0)
 * @changes
 * version 2.0.0 (03.04.2019)
 * - uses ccm v20
 * - removed privatization of instance members
 * version 1.0.0 (20.04.2018)
 */

( function () {

  const component = {

    name: 'show_points',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {
      "html": {
        "id": "main",
        "inner": [
          { "id": "header", "inner": "Point list of %user%" },
          { "id": "point_list" },
          { "id": "footer", "inner": "Sum of points: %points%" }
        ]
      },
      "store": [ "ccm.store" ],
      "moment": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/moment/moment.js" ],
      "mapping": {},
      "message": "Nothing to display."
    },

    Instance: function () {

      let $;

      /**
       * user points
       * @type {Array}
       */
      const points = [];

      this.start = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        /** @type {string} */
        const user = this.user && this.user.isLoggedIn() ? this.user.data().user : this.user;

        // get submitted solutions
        const solutions = this.store.get( { _id: { $regex: '^' + user + ',' } } );

        // no given solutions? => render message that there is nothing to display
        if ( !Array.isArray( solutions ) || solutions.length === 0 ) return $.setContent( this.element, this.message );

        /**
         * sum of points
         * @type {number}
         */
        let sum = 0;

        // iterate over each submitted solution
        solutions.forEach( solution => {

          /** @type {string} */
          const task = solution.key[ 1 ];

          // not correct user or no mapping for this task or no 'created_at' information? => skip this solution
          if ( solution.key[ 0 ] !== user || !this.mapping[ task ] || !solution.created_at ) return;

          /**
           * points for current task
           * @type {number}
           */
          const task_points = !this.mapping[ task ].deadline || moment( this.mapping[ task ].deadline ).isAfter( solution.created_at ) ? this.mapping[ task ].points : 0;

          // check deadline and give points for this task
          points.push( [ task, task_points ] );

          // add points to sum
          sum += task_points;

        } );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html, { user: user, points: sum.toString() } ) );

        // render point list of user
        this.target.start( { root: this.element.querySelector( '#point_list' ), data: points, table_head: [ 'task', 'points' ] } );

      };

      /**
       * returns the current result data
       * @returns {Object[]} current result data
       */
      this.getValue = () => $.clone( points );

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
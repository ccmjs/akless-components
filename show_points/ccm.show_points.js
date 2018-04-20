/**
 * @overview ccm component for rendering a point list of an user
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 */

{
  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'show_points',

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {Object}
     */
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
      "moment": [ "ccm.load", "../libs/moment/moment.js" ],
      "mapping": {},
      "message": "Nothing to display."

    },

    /**
     * for creating instances out of this component
     * @constructor
     */
    Instance: function () {

      /**
       * own reference for inner functions
       * @type {Instance}
       */
      const self = this;

      /**
       * privatized instance members
       * @type {object}
       */
      let my;

      /**
       * shortcut to help functions
       * @type {Object.<string,function>}
       */
      let $;

      /**
       * user points
       * @type {Array}
       */
      const points = [];

      /**
       * is called once after all dependencies are solved and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.init = callback => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        callback();
      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = callback => {

        /** @type {string} */
        const user = self.user && self.user.isLoggedIn() ? self.user.data().user : my.user;

        // get submitted solutions
        my.store.get( { _id: { $regex: '^' + user + ',' } }, solutions => {

          // no given solutions?
          if ( !Array.isArray( solutions ) || solutions.length === 0 ) {

            // render message that there is nothing to display
            $.setContent( self.element, my.message );

            // perform callback and abort
            return callback && callback();

          }

          /**
           * sum of points
           * @type {number}
           */
          let sum = 0;

          // iterate over each submitted solution
          solutions.map( solution => {

            /** @type {string} */
            const task = solution.key[ 1 ];

            // not correct user or no mapping for this task or no 'created_at' information? => skip this solution
            if ( solution.key[ 0 ] !== user || !my.mapping[ task ] || !solution.created_at ) return;

            /**
             * points for current task
             * @type {number}
             */
            const task_points = !my.mapping[ task ].deadline || moment( my.mapping[ task ].deadline ).isAfter( solution.created_at ) ? my.mapping[ task ].points : 0;

            // check deadline and give points for this task
            points.push( [ task, task_points ] );

            // add points to sum
            sum += task_points;

          } );

          // render content
          $.setContent( self.element, $.html( my.html, { user: user, points: sum.toString() } ) );

          // render point list of user
          my.target.start( { root: self.element.querySelector( '#point_list' ), data: points, table_head: [ 'task', 'points' ] }, () => callback && callback() );

        } );

      };

      /**
       * returns the current result data
       * @returns {Object[]} current result data
       */
      this.getValue = () => $.clone( points );

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}
/**
 * @overview ccmjs-based web component for multiply table training
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (01.05.2021)
 */

( () => {

  const component = {
    name: 'multiply_table_trainer',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.4.0.js',
    config: {
      "color": "#007bff",
      "commutative": true,
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
          "https://ccmjs.github.io/akless-components/team_project_analytics/resources/styles.css"
        ]
      ],
      "data": {},
      "feedback": 1,
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.2.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/multiply_table_trainer/resources/templates.mjs" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "min": [ 1, 1, 1 ],
      "max": [ 10, 10, 100 ],
      "onfinish": { "log": true },
//    "onstart": instance => { ... }
      "operator": "∙",
      "timer": 3
    },

    Instance: function () {

      let $, current, input, equations = {}, progress_bar, points = 0, results = [], nr;

      this.ready = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // prepare equations
        for ( let i = this.min[ 0 ]; i <= this.max[ 0 ]; i++ )
          for ( let j = this.min[ 1 ]; j <= this.max[ 1 ]; j++ ) {
            const operands = [ i, j ];
            equations[ this.commutative ? operands.sort() : operands ] = this.commutative ? $.shuffleArray( $.clone( operands ) ) : operands;
          }
        equations = $.shuffleArray( Object.values( equations ) );

        // set initial result data
        results = {
          correct: 0,
          total: equations.length,
          sections: Array.from( { length: equations.length } )
        };

        // show first equation
        nr = 0; next();

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( equations ) );

        // trigger 'onstart' callback
        this.onstart && await this.onstart( this );

      };

      /**
       * returns current result data
       * @returns {Object}
       */
      this.getValue = () => $.clone( results );

      /** shows next equation */
      const next = () => {

        // finish after all equations
        nr++; if ( nr > equations.length ) return $.onFinish( this );

        // render equation
        this.html.render( this.html.main( this, equations[ nr - 1 ] ), this.element );

        // prepare input field
        if ( !input ) input = this.element.querySelector( 'input' );
        input.value = ''; input.disabled = false;
        this.element.querySelector( 'input' ).focus();

        // start progress bar
        if ( !progress_bar ) {
          progress_bar = this.element.querySelector( '.progress-bar' );
          progress_bar.style.animationDuration = this.timer + 's';
        }
        progress_bar.style.backgroundColor = this.color;
        progress_bar.classList.remove( 'run' );
        void progress_bar.offsetWidth;
        progress_bar.classList.add( 'run' );

        // show feedback when progress bar finishes
        window.setTimeout( feedback, this.timer * 1000 );
      };

      const feedback = () => {
        const value = input.value;
        const [ a, b ] = equations[ nr - 1 ];
        const correct = a * b === parseInt( value );
        input.disabled = true;
        this.element.querySelector( '.progress-bar' ).style.backgroundColor = correct ? 'limegreen' : 'red' ;
        correct && points++;
        results.sections[ nr - 1 ] = correct;
        this.html.render( this.html.main( this, equations[ nr - 1 ] ), this.element );
        window.setTimeout( next, this.feedback * 1000 );
      };

    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
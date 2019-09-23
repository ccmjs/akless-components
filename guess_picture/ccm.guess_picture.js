/**
 * @overview ccm component for a guess picture game
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (18.09.2019)
 */

( () => {

  const component = {

    name: 'guess_picture',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-22.6.1.js',

    config: {
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/guess_picture/resources/styles.css" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/guess_picture/resources/templates.html" ],
      "interval": 1500,
      "max_width": 500,
      "picture": "https://akless.github.io/akless/resources/sheep.png",
//    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
//    "onfinish": { "log": true },
      "size": 4,
      "solution": [ "Schaf", "Sheep" ],
//    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]
    },

    Instance: function () {

      let $, results, intervalID;

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // adjust solution word
        this.solution = this.solution.map( solution => solution.toUpperCase().trim() );

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // reset result data
        results = { correct: this.size * this.size, total: this.size * this.size - 1, sections: [] };

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        /** when game is finished */
        const finish = () => {

          // stop time interval
          clearInterval( intervalID );

          // remove all overlay tiles
          [ ...this.element.querySelectorAll( '.tile' ) ].forEach( tile => tile.classList.add( 'free' ) );

          // disable input field
          this.element.querySelector( '#solution input' ).disabled = true;

          // user can not reach more than maximum of points
          if ( results.points > results.total ) results.points = results.total;

          // show reached points
          $.append( this.element.querySelector( '#main' ), $.html( this.html.result, { points: results.correct, total: results.total } ) );

          // translate content
          this.lang && this.lang.translate();

          // perform finish actions
          this.onfinish && $.onFinish( this );

        };

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, {

          /** image URL of the hidden picture */
          picture: this.picture,

          /** when user input has changed */
          check: event => {

            /**
             * adjusted user input
             * @type {string}
             */
            const value = event.target.value.toUpperCase().trim();

            // remove visual feedback
            const list = event.target.classList;
            list.remove( 'correct' );
            list.remove( 'wrong' );

            // no user input? => abort
            if ( !value ) return;

            /**
             * checks correctness of user input
             * @returns {boolean}
             */
            const isCorrect = () => {
              for ( let i = 0; i < this.solution.length; i++ )
                if ( value === this.solution[ i ] ) return true;
            };

            // check correctness of user input and give visual feedback
            if ( isCorrect() ) {
              list.add( 'correct' );
              finish();
            }
            else
              list.add( 'wrong' );

          }
        } ) );

        // render language area
        if ( this.lang ) { $.append( this.element.querySelector( '#top' ), this.lang.root ); this.lang.start(); }

        // render login/logout area
        if ( this.user ) $.append( this.element.querySelector( '#top' ), this.user.root );

        // consider maximum width
        if ( this.max_width ) this.element.querySelector( '#game' ).style.maxWidth = this.max_width + 'px';

        // setup tiles
        const inside = this.element.querySelector( '#inside' );
        let size = '';
        [ ...Array( this.size * this.size ) ].forEach( () => $.append( inside, $.html( this.html.tile ) ) );
        [ ...Array( this.size ) ].forEach( () => size += 'auto ' );
        inside.style[ 'grid-template-columns' ] = size;
        inside.style[ 'grid-template-rows'    ] = size;

        /**
         * contains overlay tiles
         * @type {Element[]}
         */
        const tiles = [ ...this.element.querySelectorAll( '.tile' ) ];

        // start time interval
        intervalID = window.setInterval( () => {

          // app has no DOM contact? => abort interval
          if ( !$.hasDomContact( this ) ) return clearInterval( intervalID );

          // picture is complete visible? => finish game
          if ( !tiles.length ) return finish();

          // let a random tile disappear
          const i = Math.floor( Math.random() * tiles.length );
          tiles[ i ].classList.add( 'free' );
          tiles.splice( i, 1 );

          // loose a point
          results.correct--;

        }, this.interval );

        // focus input field for solution
        this.element.querySelector( '#solution input' ).focus();

        // translate content
        this.lang && this.lang.translate();

      };

      this.getValue = () => results;

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
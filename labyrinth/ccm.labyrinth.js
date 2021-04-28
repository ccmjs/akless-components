/**
 * @overview ccmjs-based web component for labyrinth
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (28.04.2021)
 */

( () => {

  const component = {
    name: 'labyrinth',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.4.0.js',
    config: {
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/log_analytics/resources/styles.css" ],
      "data": { "x": 4, "y": 4 },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.2.0.mjs" ],
//    "onstart": instance => { ... },
      "walls": [
        [ 0, 1, 0, 0, 1, 0, 0, 0, 1, 1 ],
        [ 0, 0, 0, 0, 1, 1, 1, 0, 0, 1 ],
        [ 1, 0, 1, 0, 0, 0, 1, 1, 0, 0 ],
        [ 0, 0, 0, 1, 0, 0, 0, 0, 0, 1 ],
        [ 1, 0, 1, 0, 0, 1, 1, 0, 0, 0 ],
        [ 0, 0, 0, 0, 1, 0, 1, 0, 1, 0 ],
        [ 0, 1, 1, 0, 1, 0, 0, 0, 1, 0 ],
        [ 0, 0, 1, 0, 0, 1, 0, 1, 0, 1 ],
        [ 0, 1, 0, 1, 0, 0, 0, 1, 0, 0 ],
        [ 0, 0, 0, 0, 0, 1, 0, 0, 0, 1 ]
      ]
    },

    Instance: function () {

      let $, dataset;

      this.start = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // get player position
        if ( !dataset ) dataset = await $.dataset( this.data );

        // render player
        $.setContent( this.element, { id: 'player', class: 'field' } );

        // render walls
        for ( let y = 0; y < this.walls.length; y++ )
          for ( let x = 0; x < this.walls[ y ].length; x++ )
            if ( this.walls[ y ][ x ] ) {
              const wall = $.html( { id: 'wall', class: 'field' } );
              wall.style.left = ( x * 10 ) + '%';
              wall.style.top = ( y * 10 ) + '%';
              $.append( this.element, wall );
            }

        // add controls
        this.element.addEventListener( 'keydown', event => {
          switch ( event.key ) {
            case 'ArrowLeft': dataset.x > 0 && !this.walls[ dataset.y ][ dataset.x - 1 ] && dataset.x--; break;
            case 'ArrowRight': dataset.x < 9 && !this.walls[ dataset.y ][ dataset.x + 1 ] && dataset.x++; break;
            case 'ArrowUp': dataset.y > 0 && !this.walls[ dataset.y - 1 ][ dataset.x ] && dataset.y--; break;
            case 'ArrowDown': dataset.y < 9 && !this.walls[ dataset.y + 1 ][ dataset.x ] && dataset.y++; break;
          }
          render();
        } );

        // update player position
        render();

        // trigger 'onstart' callback
        this.onstart && await this.onstart( this );

      };

      /**
       * returns the visualized data
       * @returns {Object}
       */
      this.getValue = () => $.clone( dataset );

      /** renders the player on the correct position */
      const render = () => {
        const player = this.element.querySelector( '#player' );
        player.style.left = ( dataset.x * 10 ) + '%';
        player.style.top = ( dataset.y * 10 ) + '%';
      };

    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
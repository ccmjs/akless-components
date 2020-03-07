/**
 * @overview ccm component for math pyramids
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (06.03.2020)
 */

( () => {

  const component = {

    name: 'math_pyramid',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.1.0.js',

    config: {
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/math_pyramid/resources/styles.css" ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.0.2.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/math_pyramid/resources/templates.html" ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onchange": event => console.log( event ),
  //  "onfinish": { "log": true },
  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]
    },

    Instance: function () {

      let $;

      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper );

      };

      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main ) );

        // build pyramid
        const pyramid = this.element.querySelector( '#pyramid' );
        let brick;
        for ( let i = 0; i < this.numbers.length; i++ ) {
          for ( let k = 0, j = this.numbers.length - 1 - i; j < this.numbers.length; j++ ) {
            if ( i === this.numbers.length - 1 )
              $.append( pyramid, brick = $.html( { class: 'disabled', inner: this.numbers[ k ] } ) );
            else
              $.append( pyramid, brick = $.html( { contenteditable: true, oncopy: 'return false', oncut: 'return false', onpaste: 'return false', onkeypress: event => {
                const char = String.fromCharCode( event.which );
                if ( isNaN( char ) || char === '0' && !event.target.innerText ) event.preventDefault();
              } } ) );
            brick.style.gridColumnStart = this.numbers.length - i + 2 * k++;
          }
          brick.style.gridRowStart = i + 1;
        }
        pyramid.style.gridTemplateColumns = `repeat( ${ this.numbers.length * 2 }, ${ this.numbers.length / 2 }em )`;
        pyramid.style.gridTemplateRows = `repeat( ${ this.numbers.length }, auto )`;

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
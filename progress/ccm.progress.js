/**
 * @overview ccm component for progress indication
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (04.03.2020)
 */

( () => {

  const component = {

    name: 'progress',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.1.0.js',

    config: {
      "apps": 2,
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/progress/resources/styles.css" ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.0.2.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/progress/resources/templates.html" ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onchange": event => console.log( event ),
  //  "onfinish": { "log": true },
      "realtime": true,
      "results": [],
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

        this.user && await this.user.login();

        this.realtime && await $.asyncForEach( this.results, async result => {
          let store = result.store.source();
          if ( !store.url || !store.url.startsWith( 'http' ) ) return;
          store.url = store.url.replace( 'http', 'ws' );
          store.parent = this;
          store.onchange = message => message.key.toString() === [ result.key, this.user.data().key ].toString() && this.start();
          await this.ccm.store( store );
        } );

      };

      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        let correct = 0;

        await $.asyncForEach( this.results, async result => {
          result.login = result.user = true;
          result = await $.dataset( result );
          correct += result.correct * 100 / result.total;
        } );
        correct = Math.floor( correct / this.apps );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, { points: correct } ) );

        const goal = correct * this.element.querySelector( '#feedback' ).offsetWidth / 100; //parseInt( self.element.querySelector( '#progress-bar' ).style.width, 10);
        let width = 1;
        let id = setInterval( () => {
          if ( width >= goal || !this.element.querySelector( '#progress-bar' ) )
            clearInterval( id );
          else {
            width++;
            this.element.querySelector( '#progress-bar' ).style.width = width + 'px';
            const progress = Math.floor( width * correct / goal );
            $.setContent( this.element.querySelector( '#points' ), progress );
            $.setContent( this.element.querySelector( '#badget' ), progress >= 50 ? ( progress >= 75 ? ( progress < 100 ? 'Silver' : 'Gold' ) : 'Bronze' ) : '' );
          }
        }, 10 );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
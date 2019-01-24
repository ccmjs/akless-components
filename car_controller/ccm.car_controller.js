/**
 * @overview ccm component for idento.one car controller
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (24.01.2019)
 */

( function () {

  const component = {

    name: 'car_controller',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {

      "html": {
        "id": "main",
        "inner": [
          { "tag": "select" },
          {
            "tag": "button",
            "inner": "Left",
            "onclick": "%onleft%"
          },
          {
            "tag": "button",
            "inner": "Right",
            "onclick": "%onright%"
          },
          {
            "tag": "button",
            "inner": "Forward",
            "onclick": "%onforward%"
          },
          {
            "tag": "button",
            "inner": "Backward",
            "onclick": "%onbackward%"
          },
          {
            "tag": "button",
            "inner": "Stop",
            "onclick": "%onstop%"
          },
          {
            "tag": "button",
            "inner": "Start",
            "onclick": "%onstart%"
          },
          { "id": "tx" },
          { "id": "tx2" },
          { "id": "command" },
          { "id": "led" }
        ]
      },
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/car_controller/resources/default.css" ],
      "cars": 2,
      "api": {
        "status": "/car/status",
        "insert": "/car/insert",
        "command": "/car/command"
      }

  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "idento" ] ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ]

    },

    Instance: function () {

      let $;

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // login user, if not logged in
        this.user && await this.user.login();

        // render main HTML structure
        $.setContent( this.element, $.html( this.html, {
          onleft:     () => this.send( 'LEFT'     ),
          onright:    () => this.send( 'RIGHT'    ),
          onforward:  () => this.send( 'FORWARD'  ),
          onbackward: () => this.send( 'BACKWARD' ),
          onstop:     () => this.send( 'LOCK'     ),
          onstart:    () => this.send( 'UNLOCK'   )
        } ) );

        // add car entries
        for ( let i = 1; i <= this.cars; i++ )
          $.append( this.element.querySelector( 'select' ), $.html( { tag: 'option', inner: 'CAR-' + ( '000' + i ).slice( -3 ) } ) );

        // start interval for checking car status
        setInterval( async () => {

          /**
           * selected car
           * @type {string}
           */
          const car = this.element.querySelector( 'select' ).value;

          const result = await this.ccm.load( {
            url: this.api.status,
            params: { port: car }
          } );

          console.log( result );
          $.setContent( this.element.querySelector( 'led' ), result === 'ON' ? 'ON': 'OFF' );

        }, 6000 );

      };

      /**
       * sends a command to selected car
       * @param {string} command
       * @returns {Promise<void>}
       */
      this.send = async command => {

        // login user, if not logged in
        this.user && await this.user.login();

        let result;

        /**
         * selected car
         * @type {string}
         */
        const car = this.element.querySelector( 'select' ).value;

        result = await this.ccm.load( {
          url: this.api.insert,
          params: {
            Name: car,
            Command: command
          }
        } );

        console.log( result );
        $.setContent( this.element.querySelector( '#tx' ), result.Tx );

        result = await this.ccm.load( {
          url: this.api.command,
          params: {
            tx: result.Tx,
            car: car
          }
        } );

        console.log( result );
        $.setContent( this.element.querySelector( '#tx2'     ), result.Tx );
        $.setContent( this.element.querySelector( '#command' ), command   );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
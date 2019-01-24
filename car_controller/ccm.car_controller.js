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
          {
            "id": "grid",
            "inner": [
              {
                "id": "label",
                "inner": [ "Blockchain Test Cockpit" ]
              },
              {
                "id": "car",
                "inner": {
                  "tag": "select",
                  "onchange": "%onchange%"
                },
              },
              {
                "id": "status",
                "inner": {}
              },
              {
                "id": "start",
                "inner": {
                  "class": "button",
                  "inner": "&#9658;",
                  "onclick": "%onstart%"
                }
              },
              {
                "id": "up",
                "inner": {
                  "class": "button",
                  "inner": { "inner": "&#9650;" },
                  "onclick": "%onforward%"
                }
              },
              {
                "id": "left",
                "inner": {
                  "class": "button",
                  "inner": { "inner": "&#9664;" },
                  "onclick": "%onleft%"
                }
              },
              {
                "id": "right",
                "inner": {
                  "class": "button",
                  "inner": { "inner": "&#9654;" },
                  "onclick": "%onright%"
                }
              },
              {
                "id": "down",
                "inner": {
                  "class": "button",
                  "inner": { "inner": "&#9660;" },
                  "onclick": "%onbackward%"
                }
              },
              {
                "id": "stop",
                "inner": {
                  "class": "button",
                  "inner": "&#9724;",
                  "onclick": "%onstop%"
                }
              },
              {
                "id": "log",
                "inner": [
                  { "id": "tx" },
                  { "id": "command" }
                ]
              }
            ]
          }
        ]
      },
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/car_controller/resources/default.css" ],
      "cars": 3,
      "api": {
        "status": "https://dev-car.idento.one/car/status",
        "insert": "https://dev-car.idento.one/car/insert",
        "command": "https://dev-car.idento.one/car/command"
      },
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "idento" ] ]
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ]

    },

    Instance: function () {

      let $, online;

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // login user, if not logged in
        this.user && await this.user.login();

        /**
         * checks car status
         * @returns {Promise<void>}
         */
        const checkStatus = async () => {

          /**
           * selected car
           * @type {string}
           */
          const car = this.element.querySelector( 'select' ).value;

          // request car status
          const result = await this.ccm.load( {
            url: this.api.status,
            params: {
              port: car,
              token: this.user ? this.user.data().token : ''
            }
          } );

          // set online status
          online = result.body === 'ON';

          // show status
          this.element.querySelector( '#status' ).style = 'background-color:' + ( online ? 'limegreen': 'darkred' );

        };

        // render main HTML structure
        $.setContent( this.element, $.html( this.html, {
          onchange:   checkStatus,
          onleft:     () => this.send( 'LEFT'     ),
          onright:    () => this.send( 'RIGHT'    ),
          onforward:  () => this.send( 'FORWARD'  ),
          onbackward: () => this.send( 'BACKWARD' ),
          onstop:     () => this.send( 'LOCK'     ),
          onstart:    () => this.send( 'UNLOCK'   )
        } ) );

        // add car entries
        for ( let i = 1; i <= this.cars; i++ )
          $.append( this.element.querySelector( 'select' ), $.html( { tag: 'option', inner: 'CAR-' + ( '000' + i ).slice( -3 ), value: 11001 + i * 1000 } ) );

        // start interval for checking car status
        await checkStatus();
        setInterval( checkStatus, 6000 );

      };

      /**
       * sends a command to selected car
       * @param {string} command
       * @returns {Promise<void>}
       */
      this.send = async command => {

        // car not online? => abort
        if ( !online ) return;

        // login user, if not logged in
        this.user && await this.user.login();

        let result;

        /**
         * selected car
         * @type {string}
         */
        const car = this.element.querySelector( 'select' ).value;

        // send blockchain request
        result = await this.ccm.load( {
          url: this.api.insert,
          params: {
            Name: car,
            Command: command,
            token: this.user ? this.user.data().token : ''
          }
        } );

        // show transaction ID
        $.setContent( this.element.querySelector( '#tx' ), result.Tx );

        // send car request
        result = await this.ccm.load( {
          url: this.api.command,
          params: {
            tx: result.Tx,
            car: car
          },
          token: this.user ? this.user.data().token : ''
        } );

        // show succeeded command
        $.setContent( this.element.querySelector( '#command' ), command );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
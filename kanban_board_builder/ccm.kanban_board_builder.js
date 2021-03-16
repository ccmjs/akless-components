/**
 * @overview ccmjs-based web component for building a kanban board
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (26.02.2021)
 */

( () => {

  const component = {
    name: 'kanban_board_builder',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.1.1.js',
    config: {
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
          [  // parallel
            "https://ccmjs.github.io/akless-components/libs/selectize-0/selectize.css",
            "https://ccmjs.github.io/akless-components/kanban_board_builder/resources/default.css"
          ]
        ]
      ],
  //  "data": { "store": [ "ccm.store" ] },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.0.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_board_builder/resources/templates.mjs" ],
      "ignore": {
        "layout": {
          "white": {
            "key": "white",
            "title": "White",
            "value": [ 'ccm.load', 'https://ccmjs.github.io/akless-components/kanban_card/resources/default.css' ]
          },
          "gold": {
            "key": "gold",
            "title": "Gold",
            "value": [ 'ccm.load', 'https://ccmjs.github.io/akless-components/kanban_card/resources/gold.css' ]
          },
          "blue": {
            "key": "blue",
            "title": "Blue",
            "value": [ 'ccm.load', 'https://ccmjs.github.io/akless-components/kanban_card/resources/blue.css' ]
          }
        },
        "defaults": {
          "ignore": {
            "card": {
              "component": "https://ccmjs.github.io/akless-components/kanban_card/versions/ccm.kanban_card-4.0.0.js",
              "config": {
                "css": [ 'ccm.load', 'https://ccmjs.github.io/akless-components/kanban_card/resources/blue.css' ]
              }
            }
          },
          "data": {
            "store": [ "ccm.store", { "name": "kanban_board-data", "url": "wss://ccm2.inf.h-brs.de" } ]
          },
          "members": [ "John", "Jane", "Jake" ],
          "permissions": null,
          "priorities": [ "A", "B", "C" ],
          "user": null
        }
      },
      "libs": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/jquery-3/jquery.min.js",
          [  // parallel
            "https://ccmjs.github.io/akless-components/libs/bootstrap-4/js/bootstrap.bundle.min.js",
            [  // serial
              "https://ccmjs.github.io/akless-components/libs/selectize-0/selectize.min.js",
              [  // parallel
                "https://ccmjs.github.io/akless-components/libs/selectize-0/remove_button-plugin.min.js",
                [  // serial
                  "https://ccmjs.github.io/akless-components/libs/jquery-ui-1/jquery-ui-sortable.min.js",
                  "https://ccmjs.github.io/akless-components/libs/selectize-0/drag_drop-plugin.min.js"
                ]
              ]
            ]
          ]
        ]
      ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "preview": "Preview",
  //  "onfinish": { "restart": true },
      "shadow": "none",
      "submit": "Submit",
      "tool": [ "ccm.component", "https://ccmjs.github.io/akless-components/kanban_board/versions/ccm.kanban_board-4.0.0.js" ]
    },

    Instance: function () {
      let $, kanban_board_config;

      this.ready = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );  // set shortcut to help functions
        delete this.tool.config.parent;                                            // remove no needed parent reference
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );      // logging of 'ready' event
      };

      this.start = async () => {

        kanban_board_config = await $.dataset( this.data );                                    // get existing app configuration data
        if ( !kanban_board_config.data ) kanban_board_config[ 'data.key' ] = $.generateKey();  // new kanban_board? => set unique key

        // get initial app configuration (priority order: [high] this.data -> this.defaults -> this.tool.config [low])
        kanban_board_config = await $.integrate( kanban_board_config, await $.integrate( this.ignore.defaults, this.tool.config ) );

        this.logger && this.logger.log( 'start', $.clone( kanban_board_config ) );  // logging of 'start' event
        this.render( kanban_board_config );                                         // render main HTML template
        jQuery( '[data-toggle=popover]' ).popover();                                // initialize popovers for info icons

        // prepare input fields for lanes, members and priorities
        selectize( '#kbb-lanes', kanban_board_config.lanes, 'Individual List of Lanes' );
        selectize( '#kbb-members', kanban_board_config.members, 'Individual List of Members' );
        selectize( '#kbb-priorities', kanban_board_config.priorities, 'Individual List of Priorities' );

        // listen to change events of the input fields
        this.element.querySelectorAll( '*[name]' ).forEach( input => input.addEventListener( 'change', () => this.render() ) );

        // update app preview in modal dialog
        jQuery( '#kbb-preview' ).on( 'show.bs.modal', () => this.tool.start( Object.assign( this.getValue(), { root: this.element.querySelector( '#kbb-preview-body' ) } ) ) );

        // listen to submit event of the HTML form
        this.submit && this.element.querySelector( 'form' ).addEventListener( 'submit', event => {
          event.preventDefault();
          const result_data = this.getValue();                                 // get result data
          this.logger && this.logger.log( 'finish', $.clone( result_data ) );  // logging of 'finish' event
          $.onFinish( this, result_data );                                     // trigger finish actions
        } );

      };

      /**
       * renders the main HTML template
       * @param {Object} [config = this.getValue()] - app configuration
       */
      this.render = ( config = this.getValue() ) => {
        this.html.render( this.html.main( config, this ), this.element );
      }

      /**
       * returns current result data
       * @returns {Object} app configuration
       */
      this.getValue = () => {
        const config = Object.assign( kanban_board_config, $.formData( this.element ) );
        config.ignore.card.config.css = this.ignore.layout[ config.layout ].value;
        delete config.layout;
        return config;
      };

      /**
       * prepares an input field for selectize
       * @param {string} selector - selector to select the input field
       * @param {string[]} items - initial selected items
       * @param {string} placeholder - placeholder of the input field
       */
      const selectize = ( selector, items, placeholder ) => {
        jQuery( this.element.querySelector( selector ) ).selectize( {
          create: true,
          items: items,
          labelField: 'value',
          options: items && items.map( item => { return { value: item } } ),
          placeholder: placeholder,
          plugins: [ 'drag_drop', 'remove_button' ]
        } );
      };

    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
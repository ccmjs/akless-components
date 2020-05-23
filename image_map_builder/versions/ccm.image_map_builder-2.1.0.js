/**
 * @overview ccm component for building image maps
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 * @version 2.1.0
 * @changes
 * version 2.1.0 (24.05.2020):
 * - added grid positioning
 * version 2.0.0 (12.05.2020):
 * - removed default image from config
 * - uses ccm.image_map.js v2.0.0 as default
 * - component can also be used as app builder for quest maps
 * - added input field to set order number of an area
 * (for older version changes see ccm.image_map-1.0.2.js)
 */

( () => {

  const component = {

    name: 'image_map_builder', version: [ 2, 1, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.5.2.js',

    config: {
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/image_map_builder/resources/styles.css" ],
      "convert": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/json2json.mjs", "import": "upload2data" } ],
      "data": {},
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-5.1.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/image_map_builder/resources/templates.html" ],
      "image_map": [ "ccm.component", "https://ccmjs.github.io/akless-components/image_map/versions/ccm.image_map-2.0.0.js" ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onchange": instance => console.log( instance.getValue() ),
      "submit": [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-8.1.1.js", {
        "entries": [
          "<div class='pb-2 mt-4 mb-4 border-bottom'><h2>Settings <small class='text-primary'>Image Map</small></h2></div>",
          "<legend class='text-primary'>Map</legend>",
          {
            "label": "Image",
            "name": "image",
            "type": "image_upload",
            "info": "Image of the map."
          },
          {
            "label": "Info",
            "name": "info",
            "type": "textarea",
            "info": "Info text of the image map that will be displayed in the info box when no other area is hovered (could be any HTML)"
          },
          "<legend class='text-primary'>Areas</legend>",
          {
            "name": "ignore.areas",
            "type": "several",
            "items": [
              {
                "label": "Image",
                "name": "image",
                "type": "image_upload",
                "info": "Image of the area."
              },
              {
                "label": "Size",
                "name": "size",
                "type": "number",
                "min": 1,
                "info": "Image size of the area."
              },
              {
                "label": "Order Number",
                "name": "order",
                "type": "number",
                "min": 0,
                "info": "Here you can specify which areas are shown in the foreground and which in the background. An area with a higher order number is shown in front of an area with a lower order number."
              },
              {
                "label": "Info",
                "name": "info",
                "type": "textarea",
                "info": "Info text of the area that will be displayed in the info box when the area is hovered (could be any HTML)."
              },
              {
                "label": "App",
                "name": "action",
                "type": "app",
                "info": "App URL of the app that starts when clicking on the area."
              }
            ]
          },
          "<legend class='text-primary'>Advanced Settings</legend>",
          {
            "label": "Back Button",
            "name": "back",
            "type": "text",
            "info": "Caption of the 'Back to App' button"
          },
          "<legend class='text-primary'>Placement of Areas</legend>",
        ],
        "image_upload": [ "ccm.component", "https://ccmjs.github.io/tkless-components/file_upload/versions/ccm.file_upload-4.1.1.js", {
          "clear_button": true,
          "data": { "store": [ "ccm.store" ] },
          "data_type": "image",
          "upload_button": true
        } ]
      } ]
    },

    Instance: function () {

      let $, config = {};

      this.ready = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper );                 // set shortcut to help functions
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );  // logging of 'ready' event
      };

      this.start = async () => {

        // load initial app configuration and set default values
        config = await $.dataset( this.data );
        if ( !config.ignore ) config.ignore = {};
        if ( !config.ignore.areas ) config.ignore.areas = [];

        this.logger && this.logger.log( 'start', $.clone( config ) );  // logging of 'start' event
        $.setContent( this.element, $.html( this.html.main ) );        // render main HTML structure

        // render submit builder
        const submit = await this.submit.start( {
          root: this.element.querySelector( '#submit' ),
          data: {
            store: [ 'ccm.store', { app: $.clone( config ) } ],
            key: 'app'
          },
          'ignore.defaults': this.ignore && this.ignore.defaults,
          onchange: async () => {
            const results = submit.getValue();
            if ( results.image_map )
              results.image_map[ 2 ].image = this.convert( results.image_map[ 2 ].image ) || config.image_map[ 2 ].image;
            else
              results.image = this.convert( results.image ) || config.image;
            results.ignore.areas.forEach( ( area, i ) => {
              area.image = this.convert( area.image ) || config.ignore.areas[ i ] && config.ignore.areas[ i ].image;
              area.x = config.ignore.areas[ i ] && config.ignore.areas[ i ].x || 0;
              area.y = config.ignore.areas[ i ] && config.ignore.areas[ i ].y || 0;
              if ( !area.size ) area.size = 5; if ( !area.x ) area.x = 0; if ( !area.y ) area.y = 0;
            } );
            config = await $.integrate( results, config );
            await placement();
            this.onchange && this.onchange( this );
          }
        } );

        /** renders area placement */
        const placement = async () => {
          const copy = $.clone( config );
          copy.ignore.areas.forEach( area => {
            if ( area.x === undefined ) area.x = area.y = 1;
            delete area.precondition_visible;
            delete area.precondition_enabled;
            delete area.postcondition;
            delete area.action;
          } );
          let image_map = await this.image_map.start( Object.assign( {}, copy, { root: this.element.querySelector( '#placement' ), user: null } ) );
          if ( image_map.getImageMap ) image_map = image_map.getImageMap();
          const draggable = ( element, i ) => {
            let x = 0, y = 0, left = element.offsetLeft, top = element.offsetTop, new_left, new_top, grid;
            element.style.backgroundColor = 'rgba( 255, 255, 255, 0.5 )';
            element.onmousedown = event => {
              grid = parseInt( this.element.querySelector( '#grid' ).value );
              event.preventDefault();
              x = event.clientX;
              y = event.clientY;
              const width  = image_map.element.querySelector( '#map' ).clientWidth;
              const height = image_map.element.querySelector( '#map' ).clientHeight;
              image_map.element.onmousemove = event => {
                event.preventDefault();
                left = ( left - ( x - event.clientX ) );
                top  = ( top  - ( y - event.clientY ) );
                if ( left >= 0 && left <= width - element.clientWidth  ) {
                  new_left = left - left % grid;
                  element.style.left = new_left + 'px';
                }
                if ( top >= 0 && top <= height - element.clientHeight ) {
                  new_top = top - top % grid;
                  element.style.top = new_top + 'px';
                }
                x = event.clientX;
                y = event.clientY;
              };
              image_map.element.onmouseup = () => {
                image_map.element.onmouseup = null;
                image_map.element.onmousemove = null;
                config.ignore.areas[ i ].x = Math.round( new_left / width  * 1000 );
                config.ignore.areas[ i ].y = Math.round( new_top  / height * 1000 );
                element.style.left  = ( config.ignore.areas[ i ].x / 10 ) + "%";
                element.style.top   = ( config.ignore.areas[ i ].y / 10 ) + "%";
                element.style.width = ( config.ignore.areas[ i ].width / 10 ) + "%";
                this.onchange && this.onchange( this );
              };
            };
          };
          image_map.element.querySelectorAll( '.area' ).forEach( draggable );
        };

        // render area placement
        await placement();

      };

      /**
       * returns current result data (app configuration)
       * @returns {Object} result data
       */
      this.getValue = () => $.clone( config );

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
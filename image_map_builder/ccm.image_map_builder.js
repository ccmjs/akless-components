/**
 * @overview ccm component for building image maps
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 * @version latest (1.0.2)
 * @changes
 * version 1.0.2 (22.03.2020):
 * - uses ccm v25.5.2
 * - uses helper.mjs v5.1.0 as default
 * - uses ccm.image_map.js v1.1.0 as default
 * - uses ccm.submit.js v8.1.1 as default
 * - bug fix for loading of initial app configuration
 * version 1.0.1 (22.03.2020):
 * - uses ccm v25.1.0
 * - uses helper.mjs v4.1.0 as default
 * - uses ccm.submit.js v8.0.0 as default
 * version 1.0.0 (05.02.2020)
 */

( () => {

  const component = {

    name: 'image_map_builder',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.5.2.js',

    config: {
      "convert": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/json2json.mjs", "import": "upload2data" } ],
      "data": {},
      "default_image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-5.1.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/image_map_builder/resources/templates.html" ],
      "image_map": [ "ccm.component", "https://ccmjs.github.io/akless-components/image_map/versions/ccm.image_map-1.1.0.js" ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onchange": instance => console.log( instance.getValue() ),
      "submit": [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-8.1.1.js", {
        "entries": [
          "<div class='pb-2 mt-4 mb-4 border-bottom'><h2>Settings <small class='text-primary'>Image Map</small></h2></div>",
          "<legend class='text-primary'>Map</legend>",
          {
            "label": "Image",
            "name": "data.image",
            "type": "image_upload",
            "info": "Image of the map."
          },
          {
            "label": "Info",
            "name": "data.info",
            "type": "textarea",
            "info": "Info text of the image map that will be displayed in the info box when no other area is hovered (could be any HTML)"
          },
          "<legend class='text-primary'>Areas</legend>",
          {
            "name": "data.areas",
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
        "ignore": {
          "defaults": {
            "back": "← Back to Map"
          }
        },
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

      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper );

      };

      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // load initial app configuration
        config = await $.dataset( this.data );
        config.data = await $.dataset( config.data );
        if ( !config.data.areas ) config.data.areas = [];

        // no image for map or area? => use default image
        if ( !config.data.image ) config.data.image = this.default_image;
        config.data.areas && config.data.areas.forEach( area => area.image = area.image || this.default_image );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( config ) );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main ) );

        // render submit builder
        const submit = await this.submit.start( {
          root: this.element.querySelector( '#submit' ),
          data: {
            store: [ 'ccm.store', { app: $.clone( config ) } ],
            key: 'app'
          },
          onchange: async () => {
            const results = submit.getValue();
            results.data.image = this.convert( results.data.image ) || config.data.image;
            results.data.areas.forEach( ( area, i ) => {
              area.image = this.convert( area.image ) || ( config.data.areas[ i ] ? config.data.areas[ i ].image : this.default_image );
              area.x = config.data.areas[ i ] && config.data.areas[ i ].x || 0;
              area.y = config.data.areas[ i ] && config.data.areas[ i ].y || 0;
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
          copy.data.areas.forEach( area => {
            if ( area.x === undefined ) area.x = area.y = 1;
            delete area.action;
          } );
          const image_map = await this.image_map.start( Object.assign( {}, copy, { root: this.element.querySelector( '#placement' ) } ) );
          const draggable = ( element, i ) => {
            let x = 0, y = 0, left, top;
            element.onmousedown = event => {
              event.preventDefault();
              x = event.clientX;
              y = event.clientY;
              const width  = image_map.element.querySelector( '#map' ).clientWidth;
              const height = image_map.element.querySelector( '#map' ).clientHeight;
              image_map.element.onmousemove = event => {
                event.preventDefault();
                left = ( element.offsetLeft - ( x - event.clientX ) );
                top  = ( element.offsetTop  - ( y - event.clientY ) );
                if ( left >= 0 && left <= width  - element.clientWidth  ) element.style.left = left + 'px';
                if ( top  >= 0 && top  <= height - element.clientHeight ) element.style.top  = top  + 'px';
                x = event.clientX;
                y = event.clientY;
              };
              image_map.element.onmouseup = () => {
                image_map.element.onmouseup = null;
                image_map.element.onmousemove = null;
                config.data.areas[ i ].x = Math.round( left / width  * 100 );
                config.data.areas[ i ].y = Math.round( top  / height * 100 );
                element.style.left = config.data.areas[ i ].x + "%";
                element.style.top  = config.data.areas[ i ].y + "%";
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
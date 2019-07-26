/**
 * @overview ccm component for managing an app
 * @author André Kless <andre.kless@web.de> 2019
 * @license MIT License
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (26.07.2019)
 */

( () => {

  const component = {

    name: 'app_manager',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-22.2.1.js',

    config: {
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/app_manager/resources/styles.css" ],
//    "component_manager": [ "ccm.component", "https://ccmjs.github.io/akless-components/component_manager/ccm.component_manager-3.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/component_manager/resources/resources.js", "demo" ] ],
      "data": { "store": [ "ccm.store" ] },
      "default_icon": "https://ccmjs.github.io/akless-components/dms/resources/img/default.png",
//    "handover_app": [ "ccm.component", "https://ccmjs.github.io/akless-components/handover_app/versions/ccm.handover_app-1.0.0.js" ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/helper.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/app_manager/resources/templates.html" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
//    "rating": [ "ccm.component", ... },
//    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]
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

        // get app dataset
        const dataset = await $.dataset( this.data );

        // adjust app dataset
        if ( !dataset.icon ) dataset.icon = this.default_icon;
        dataset.tags = dataset.tags.join( ', ' );
        if ( dataset.language ) dataset.language = dataset.language.toUpperCase();

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, $.integrate( $.clone( dataset ), {
          create_similar_app: async () => {
            //showComponent( $.getIndex( event.data.path ).replace( /\./g, '-' ), await $.solveDependency( config ) )
          },
          fullscreen: () => this.helper.fullscreen( this.element.querySelector( '#app' ) )
        } ) ) );

        // remove no needed areas
        if ( !this.component_manager ) $.removeElement( this.element.querySelector( '#button'      ) );
        if ( !dataset.abstract       ) $.removeElement( this.element.querySelector( '#abstract'    ) );
        if ( !dataset.description    ) $.removeElement( this.element.querySelector( '#description' ) );

        // render app
        await this.ccm.start( dataset.path, {
          key: [ 'ccm.get', dataset.source[ 0 ], dataset.source[ 1 ] ],
          parent: this,
          root: this.element.querySelector( '#app' )
        } );

        // render handover of the app
        if ( this.handover_app )
          await this.handover_app.start( {
            root: this.element.querySelector( '#handover' ),
            component_url: dataset.path,
            data: {
              store: [ "ccm.store", dataset.source[ 0 ] ],
              key: dataset.source[ 1 ]
            }
          } );
        else $.removeElement( this.element.querySelector( '#section-handover' ) );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
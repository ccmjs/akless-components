/**
 * @overview ccmjs-based web component for a flying app window
 * @author André Kless <andre.kless@web.de> 2018-2019, 2022
 * @license The MIT License (MIT)
 * @version 2.0.0
 * @changes
 * version 2.0.0 (07.01.2022): reimplementation
 * (for older version changes see ccm.window-1.0.0.js)
 */

( () => {
  const component = {
    name: 'window',
    version: [ 2, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.1.2.min.js',
    config: {
      "app": [ "ccm.start", "https://ccmjs.github.io/akless-components/blank/ccm.blank.js" ],
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap.min.css",
          "https://ccmjs.github.io/akless-components/window/resources/styles.min.css"
        ],
        "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap-icons.min.css",
        { "url": "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap-fonts.min.css", "context": "head" },
      ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.0.0.min.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/window/resources/templates.mjs" ],
//    "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.0.0.min.js" ],
      "libs": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/moveable/moveable.min.js" ],
      "text": [ "ccm.load", "https://ccmjs.github.io/akless-components/window/resources/resources.mjs#en" ],
      "url": "https://ccmjs.github.io/akless-components/window/versions/ccm.window-2.0.0.min.js"
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        /**
         * contains all event handlers
         * @type {Object.<string,Function>}
         */
        const events = {

          /** when the close button is clicked */
          onClose: () => {
            $.remove( this.root );
            $.remove( document.body.querySelector( '.moveable-control-box' ) );
          }

        };

        // render main HTML structure
        this.html.render( this.html.main( this.text, events ), this.element );

        // translate content
        this.lang && this.lang.translate();

        // render language selection
        this.lang && !this.lang.getContext() && $.setContent( this.element.querySelector( '#lang' ), this.lang.root );

        // render app in flying window
        $.setContent( this.element.querySelector( 'main' ), this.app.root );

        // set bookmarklet script
        this.element.querySelector( '#bookmarklet' ).setAttribute( 'href', $.bookmarklet( this.component.url || this.url, JSON.parse( this.config ) ) );

        // make window moveable and resizable
        await $.sleep( 100 );
        new Moveable( document.body, {
          target: this.element,
          dragTarget: this.element.querySelector( '.draggable' ),
          draggable: true,
          resizable: true,
          hideDefaultLines: true,
          origin: false,
          renderDirections: [ 'e' ]
        } ).on( 'drag', ( { target, left, top } ) => {
          target.style.left = `${ left }px`;
          target.style.top = `${ top }px`;
        } ).on( 'resize', ( { target, width, height, delta } ) => {
          delta[ 0 ] && ( target.style.width = `${ width }px` );
          delta[ 1 ] && ( target.style.height = `${ height }px` );
        } );

      };

    }

  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
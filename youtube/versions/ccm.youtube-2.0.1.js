/**
 * @overview ccm component for rendering a [YouTube Player]{@link https://developers.google.com/youtube/iframe_api_reference}
 * @author André Kless <andre.kless@web.de> 2016, 2018-2019
 * @license The MIT License (MIT)
 * @version 2.0.1
 * @changes
 * version 2.0.1 (06.04.2019):
 * - uses ccm v20.0.0
 * version 2.0.0 (13.10.2018):
 * - uses ccm v18.0.5
 * - removed privatization of instance members
 * version 1.0.0 (10.01.2018)
 */

( function () {

  const component = {

    name: 'youtube', version: [ 2, 0, 1 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',

    config: {

      "html": {
        "id": "player",
        "inner": { "id": "iframe" }
      },
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/youtube/resources/default.css" ],
      "video": "bHQqvYy5KYo"

  //  "height",                     {number} height - player height (default: 390)
  //  "width",                      {number} width - player width (default: 640)
  //  "vars",                       {object} params - [player parameter]{@link https://developers.google.com/youtube/player_parameters#Parameters}
  //  "onReady",                    {function} onReady - [onReady]{@link https://developers.google.com/youtube/iframe_api_reference#onReady} callback
  //  "onStateChange",              {function} onStateChange - [onStateChange]{@link https://developers.google.com/youtube/iframe_api_reference#onStateChange} callback
  //  "onPlaybackQualityChange",    {function} onPlaybackQualityChange - [onPlaybackQualityChange]{@link https://developers.google.com/youtube/iframe_api_reference#onPlaybackQualityChange} callback
  //  "onPlaybackRateChange",       {function} onPlaybackRateChange - [onPlaybackRateChange]{@link https://developers.google.com/youtube/iframe_api_reference#onPlaybackRateChange} callback
  //  "onError",                    {function} onError - [onError]{@link https://developers.google.com/youtube/iframe_api_reference#onError} callback
  //  "onApiChange",                {function} onApiChange - [onApiChange]{@link https://developers.google.com/youtube/iframe_api_reference#onApiChange} callback
  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ]

    },

    ready: () => new Promise( resolve => {

      // set global ready callback of YouTube iFrame API
      window.onYouTubeIframeAPIReady = resolve;

      // load YouTube iFrame API
      this.ccm.load( { url: 'https://www.youtube.com/iframe_api', type: 'js' } );

    } ),

    Instance: function () {

      let $;

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

        // prepare YouTube Player settings
        this.settings = $.privatize( this, 'video', 'height', 'width', 'vars' );
        $.renameProperty( this.settings, 'video', 'videoId' );
        $.renameProperty( this.settings, 'var', 'playerVars' );

        /**
         * sets a YouTube Player event
         * @param {string} name - event name
         */
        const setEvent = name => {

          // set event in YouTube Player settings
          this.settings.events[ name ] = event => {

            // logging of YouTube Player event
            this.logger && this.logger.log( name, event.data === null ? undefined : event.data );

            // perform individual event-specific callback
            this[ name ] && this[ name ]( event );

            // ending of video? => perform 'finish' callback
            name === 'onStateChange' && event.data === 0 && $.onFinish( this );

          };

        };

        // prepare the YouTube Player event listeners
        this.settings.events = {};
        setEvent( 'onReady' );
        setEvent( 'onStateChange' );
        setEvent( 'onPlaybackQualityChange' );
        setEvent( 'onPlaybackRateChange' );
        setEvent( 'onError' );
        setEvent( 'onApiChange' );

      };

      this.start = async () => {

        // render main HTML structure
        $.setContent( this.element, $.html( this.html ) );

        // embed YouTube Player
        this.player = new YT.Player( this.element.querySelector( '#iframe' ), this.settings );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
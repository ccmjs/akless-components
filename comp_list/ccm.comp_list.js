/**
 * @overview <i>ccm</i> component for rendering a component list
 * @author André Kless <andre.kless@web.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

  var ccm_version = '9.0.0';
  var ccm_url     = 'https://akless.github.io/ccm/ccm.min.js';

  var component_name = 'comp_list';
  var component_obj  = {

    name: component_name,

    config: {

      comp_info: [ 'ccm.component', 'https://akless.github.io/ccm-components/comp_info/ccm.comp_info.min.js', { compact: true } ],
      comp_info_configs: [
        [ "ccm.get", "https://akless.github.io/ccm-components/comp_info/resources/comp_info_configs.min.js", "cloze" ]
      ]

    },

    Instance: function () {

      var self = this;
      var my;           // contains privatized instance members

      this.ready = function ( callback ) {

        // privatize all possible instance members
        my = self.ccm.helper.privatize( self );

        callback();
      };

      this.start = function ( callback ) {

        var element = document.createDocumentFragment();

        var counter = 1;
        my.comp_info_configs.map( render );
        check();

        function render( config ) {

          var child = document.createElement( 'div' );
          element.appendChild( child );
          counter++;
          my.comp_info.start( config, function ( instance ) {
            element.replaceChild( instance.root, child );
            check();
          } );

        }

        function check() {
          counter--;
          if ( counter !== 0 ) return;

          if ( callback ) callback();
        }

      };

    }

  };

  var namespace = window.ccm && ccm.components[ component_name ]; if ( namespace ) { if ( namespace.ccm_version ) ccm_version = namespace.ccm_version; if ( namespace.ccm_url ) ccm_url = namespace.ccm_url; }
  if ( !window.ccm || !ccm[ ccm_version ] ) { var tag = document.createElement( 'script' ); document.head.appendChild( tag ); tag.onload = register; tag.src = ccm_url; } else register();
  function register() { ccm[ ccm_version ].component( component_obj ); }
}() );
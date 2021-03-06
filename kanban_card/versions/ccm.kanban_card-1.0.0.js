/**
 * @overview ccm-based web component for kanban card
 * @author André Kless <andre.kless@web.de> 2016-2017
 * @license The MIT License (MIT)
 * @version 1.0.0
 * version 1.0.0 (19.10.2017)
 */

( function () {

  var component = {

    name: 'kanban_card',
    version: [ 1, 0, 0 ],

    ccm: {
      url: 'https://ccmjs.github.io/ccm/versions/ccm-11.5.0.js',
      integrity: 'sha384-7lrORUPPd2raLsrPJYo0Arz8csPcGzgyNbKOr9Rx3k0ECU0T8BP+B1ejo8+wmUzh',
      crossorigin: 'anonymous'
    },

    config: {
      "html": {
        "wrapper": {
          "id": "wrapper",
          "inner": [
            {
              "tag": "header",
              "inner": [
                {
                  "tag": "section",
                  "id": "title",
                  "inner": [
                    { "id": "status" },
                    {
                      "class": "value",
                      "inner": "%title%",
                      "contenteditable": "%editable%",
                      "oninput": "%input_title%"
                    }
                  ]
                },
                {
                  "tag": "section",
                  "id": "owner",
                  "inner": [
                    {
                      "class": "value",
                      "inner": "%owner%",
                      "contenteditable": "%editable%",
                      "onfocus": "%focus_owner%"
                    },
                    { "class": "fa fa-user" }
                  ]
                }
              ]
            },
            {
              "tag": "main",
              "inner": {
                "tag": "section",
                "id": "summary",
                "inner": {
                  "class": "value",
                  "inner": "%summary%",
                  "contenteditable": "%editable%",
                  "oninput": "%input_summary%"
                }
              }
            },
            {
              "tag": "footer",
              "inner": [
                {
                  "tag": "section",
                  "id": "priority",
                  "inner": {
                    "class": "value",
                    "inner": "%priority%",
                    "contenteditable": "%editable%",
                    "onfocus": "%focus_priority%"
                  }
                },
                {
                  "tag": "section",
                  "id": "deadline",
                  "inner": [
                    {
                      "class": "value",
                      "inner": "%deadline%",
                      "contenteditable": "%editable%",
                      "onfocus": "%focus_deadline%"
                    },
                    { "class": "fa fa-calendar-check-o" }
                  ]
                }
              ]
            }
          ]
        }
      },
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_card/resources/default.css" ],
      "icons": [
        "ccm.load",
        {
          "context": "head",
          "url": "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css",
          "integrity": "sha384-XdYbMnZ/QjLh6iI4ogqCTaIjrFk87ip+ekIjefZch0Y+PvJ8CDYtEs1ipDmPorQ+",
          "crossorigin": "anonymous"
        },
        {
          "url": "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css",
          "integrity": "sha384-XdYbMnZ/QjLh6iI4ogqCTaIjrFk87ip+ekIjefZch0Y+PvJ8CDYtEs1ipDmPorQ+",
          "crossorigin": "anonymous"
        }
      ],
      "data": {
        "store": [ "ccm.store", {} ],
        "permission_settings": { "access": "group" }
      },
      "editable": true,
      "members": [ "John", "Jane" ],
      "priorities": [ "A", "B", "C" ]
    },

    Instance: function () {

      var self = this;
      var my;           // contains privatized instance members

      this.init = function ( callback ) {

        // listen to datastore change event => update own content
        if ( self.data.store ) self.data.store.onchange = function ( dataset ) {

          if ( !my || !my.dataset || dataset.key !== my.data.key ) return;

          my.dataset = dataset;

          Object.keys( my.dataset ).map( refresh );

          function refresh( prop ) {

            var elem = self.element.querySelector( '#' + prop + ' .value' );
            if ( elem && elem.innerHTML !== my.dataset[ prop ] ) elem.innerHTML = my.dataset[ prop ];

          }

        };

        callback();
      };

      this.ready = function ( callback ) {

        // privatize all possible instance members
        my = self.ccm.helper.privatize( self );

        callback();
      };

      this.start = function ( callback ) {

        if ( self.logger ) self.logger.log( 'start' );

        self.ccm.helper.dataset( my.data, function ( dataset ) {

          var restored;
          my.dataset = dataset;

          self.ccm.helper.setContent( self.element, self.ccm.helper.html( my.html.wrapper, self.ccm.helper.integrate( {

            title:    '',
            owner:    '',
            summary:  '',
            priority: '',
            deadline: '',

            editable: !!my.editable,

            input_title:    function () { empty ( this ); update( 'title', this.innerHTML ); },
            focus_owner:    function () { select( this, true ); },
            input_summary:  function () { empty ( this ); update( 'summary', this.innerHTML ); },
            focus_priority: function () { select( this, false ); },
            focus_deadline: function () { input ( this ); }

          }, self.ccm.helper.clone( my.dataset ), true ) ) );

          empty( self.element.querySelector( '#title .value' ) );
          empty( self.element.querySelector( '#summary .value' ) );

          if ( callback ) callback();

          function empty( elem ) {

            if ( elem.innerHTML.trim().replace( /<br>|<div>|<\/div>/g, '' ) === '' ) elem.innerHTML = '';

          }

          function update( prop, value ) {

            if ( self.user ) self.user.login( proceed ); else proceed();

            function proceed() {

              if ( self.logger ) self.logger.log( 'change', { prop: prop, value: value } );
              status();
              my.dataset[ prop ] = value.trim();
              if ( self.user && !my.dataset._ ) my.dataset._ = self.ccm.helper.integrate( { creator: self.user.data().id, group: self.ccm.helper.transformStringArray( my.members ) }, my.data.permission_settings );
              if ( my.data.store ) my.data.store.set( my.dataset, status ); else status( true );

              function status( finished ) {

                self.ccm.helper.setContent( self.element.querySelector( '#status' ), finished ? '' : self.ccm.helper.loading( self ) );

              }

            }

          }

          function select( elem, owner_or_prio ) {

            restored = false;

            var entries = [ { tag: 'option' } ];

            my[ owner_or_prio ? 'members' : 'priorities' ].map( function ( entry ) {

              entries.push( { tag: 'option', inner: entry, selected: entry === my.dataset[ owner_or_prio ? 'owner' : 'priority' ] || '' } );

            } );

            elem.parentNode.replaceChild( self.ccm.helper.protect( self.ccm.helper.html( { tag: 'select', inner: entries, onchange: onChange, onblur: onBlur } ) ), elem );

            self.element.querySelector( 'select' ).focus();

            function onChange() {

              elem.innerHTML = this.value;
              restore( 'select', elem );
              update( owner_or_prio ? 'owner' : 'priority', this.value );

            }

            function onBlur() {

              restore( 'select', elem );

            }

          }

          function input( elem ) {

            restored = false;

            elem.parentNode.replaceChild( self.ccm.helper.protect( self.ccm.helper.html( { tag: 'input', type: 'date', value: my.dataset.deadline || '', oninput: onInput, onblur: onBlur } ) ), elem );

            self.element.querySelector( 'input' ).focus();

            function onInput() {

              elem.innerHTML = this.value;
              restore( 'input', elem );
              update( 'deadline', this.value );

            }

            function onBlur() {

              restore( 'input', elem );

            }

          }

          function restore( tag, elem ) {

            if ( restored ) return;

            var select = self.element.querySelector( tag );
            var parent = select.parentNode;

            restored = true;
            parent.replaceChild( elem, select );

          }

        } );

      };

    }

  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );
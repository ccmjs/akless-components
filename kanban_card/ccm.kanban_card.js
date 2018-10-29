/**
 * @overview ccm component for kanban card
 * @author André Kless <andre.kless@web.de> 2016-2018
 * @license The MIT License (MIT)
 * @version latest (2.0.0)
 */

( function () {

  const component = {

    name: 'kanban_card',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {

      "html": {
        "id": "main",
        "inner": [
          {
            "tag": "header",
            "inner": [
              {
                "id": "title",
                "inner": [
                  {
                    "class": "value",
                    "inner": "%title%",
                    "contenteditable": "%editable%",
                    "oninput": "%input_title%"
                  },
                  { "id": "status" }
                ]
              },
              {
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
                "id": "priority",
                "inner": {
                  "class": "value",
                  "inner": "%priority%",
                  "contenteditable": "%editable%",
                  "onfocus": "%focus_priority%"
                }
              },
              {
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
      },
      "css": [ "ccm.load", "../kanban_card/resources/default.css" ],
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
      "data": {},
      "editable": true,
      "members": [ "John", "Jane" ],
      "priorities": [ "A", "B", "C" ]

  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ]

    },

    Instance: function () {

      let $, data;

      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // listen to datastore changes => restart
        if ( $.isObject( this.data ) && $.isDatastore( this.data.store ) ) this.data.store.onchange = this.start;

      };

      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // get kanban card data
        data = await $.dataset( this.data );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( data ) );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html, $.integrate( {

          title:    '',
          owner:    '',
          summary:  '',
          priority: '',
          deadline: '',

          editable: !!this.editable,

          input_title:    function () { empty ( this ); update( 'title', this.innerHTML ); },
          focus_owner:    function () { select( this, true ); },
          input_summary:  function () { empty ( this ); update( 'summary', this.innerHTML ); },
          focus_priority: function () { select( this, false ); },
          focus_deadline: function () { input ( this ); }

        }, data, true ) ) );

        empty( this.element.querySelector( '#title .value' ) );
        empty( this.element.querySelector( '#summary .value' ) );

        const self = this;

        /**
         * makes sure that an empty element is really empty
         * @param {Element} elem
         */
        function empty( elem ) {

          if ( elem.innerHTML.trim().replace( /<br>|<div>|<\/div>/g, '' ) === '' ) elem.innerHTML = '';

        }

        /**
         * updates value of a changed kanban card property
         * @param {string} prop - changed kanban card property
         * @param {string} value - changed kanban card value
         * @returns {Promise}
         */
        async function update( prop, value ) {

          // has user instance? => login
          self.user && await self.user.login();

          // update kanban card data
          status( false );
          data[ prop ] = value.trim();
          $.isObject( self.data ) && $.isDatastore( self.data.store ) && await self.data.store.set( data );
          status( true );

          // logging of 'change' event
          self.logger && self.logger.log( 'change', { prop: prop, value: value } );

          // perform individual 'change' callback
          self.onchange && self.onchange.call( { prop: prop, value: value } );

          /**
           * adds or removes loading icon
           * @param {boolean} finished
           */
          function status( finished ) {

            $.setContent( self.element.querySelector( '#status' ), finished ? '' : $.loading( self ) );

          }

        }

        /**
         * shows selector box for choosing owner or priority of kanban card
         * @param {Element} elem - focused element for owner/priority
         * @param {boolean} owner_or_prio - true: owner, false: priority
         */
        function select( elem, owner_or_prio ) {

          /**
           * initial selector box entries
           * @type {Object[]}
           */
          const entries = [ { tag: 'option' } ];

          // add selector box entry for each owner/priority
          self[ owner_or_prio ? 'members' : 'priorities' ].forEach( entry => entries.push( { tag: 'option', inner: entry, selected: entry === data[ owner_or_prio ? 'owner' : 'priority' ] || '' } ) );

          // replace element for owner/priority with selector box
          $.replace( $.html( { tag: 'select', inner: entries, onchange: onChange } ), elem );

          // focus selector box
          self.element.querySelector( 'select' ).focus();

          /** when selector box value has changed */
          function onChange() {

            // replace selector box with new value
            elem.innerHTML = this.value;

            // update changed kanban card value
            update( owner_or_prio ? 'owner' : 'priority', this.value );

          }

        }

        /**
         * shows input field for choosing deadline of kanban card
         * @param {Element} elem - focused element for deadline
         */
        function input( elem ) {

          // replace element for deadline with input field
          $.replace( $.html( { tag: 'input', type: 'date', value: data.deadline || '', oninput: onInput } ), elem );

          // focus input field
          self.element.querySelector( 'input' ).focus();

          /** when input field value has changed */
          function onInput() {

            // replace input field with new value
            elem.innerHTML = this.value;

            // update changed kanban card value
            update( 'deadline', this.value );

          }

        }

        /**
         * returns current result data
         * @returns {Object} current kanban card data
         */
        this.getValue = () => data;

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
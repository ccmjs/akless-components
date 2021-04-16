/**
 * @overview ccmjs-based web component for a kanban card
 * @author André Kless <andre.kless@web.de> 2016-2021
 * @license The MIT License (MIT)
 * @version 4.1.1
 * @changes
 * version 4.1.1 (16.04.2021)
 * - uses ccmjs v26.3.1 as default
 * version 4.1.0 (26.03.2021)
 * - onchange callback is also triggered on realtime updates
 * - uses ccmjs v26.2.1 as default
 * - uses helper.mjs v7.1.0 as default
 * version 4.0.1 (15.03.2021)
 * - uses input field and textarea for focused title and summary instead of contenteditable
 * - uses ccmjs v26.2.0 as default
 * version 4.0.0 (19.02.2021)
 * - uses ccmjs v26.1.1 as default
 * - uses helper.mjs v7.0.0 as default
 * - updated minified component line
 * - bugfix for realtime update
 * - realtime update does not cause an extra request
 * version 4.0.0 (19.02.2021)
 * - uses ccmjs v26.1.1 as default
 * - uses helper.mjs v6.0.1 as default
 * - updated minified component line
 * - bugfix for realtime update
 * - realtime update does not cause an extra request
 * (for older version changes see ccm.kanban_card-3.0.0.js)
 */

( () => {

  const component = {
    name: 'kanban_card',
    version: [ 4, 1, 1 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.3.1.js',
    config: {
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_card/resources/default.css" ],
      "data": { "store": [ "ccm.store" ] },
      "editable": true,
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.1.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_card/resources/templates-v2.html" ],
      "icon": {
        "owner": "https://ccmjs.github.io/akless-components/kanban_card/resources/owner.svg",
        "deadline": "https://ccmjs.github.io/akless-components/kanban_card/resources/deadline.svg"
      },
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "members": [ "John", "Jane" ],
//    "onchange": event => console.log( event ),
      "priorities": [ "A", "B", "C" ],
//    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js" ]
    },

    Instance: function () {

      let $, card_data;

      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // listen to datastore changes => update own content
        this.data.store.onchange = async priodata => {
          if ( priodata.key !== this.data.key ) return;
          await this.refresh( priodata );
          this.onchange && this.onchange( { instance: this, extern: true } );
        };

      };

      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        $.setContent( this.element, $.loading() );                   // clear content and show loading icon
        card_data = await $.dataset( this.data );                    // get already existing kanban card data
        this.logger && this.logger.log( 'start', this.getValue() );  // logging of 'start' event

        // render main HTML structure
        $.setContent( this.element, $.html( this.html, await $.integrate( {

          title:    '',
          owner:    '',
          summary:  '',
          priority: '',
          deadline: '',

          icon_owner: this.icon.owner,
          icon_deadline: this.icon.deadline,

          editable: !!this.editable && $.hasPermission( card_data, this.user, 'set' ),

          onfocus_title:    event => input( event.target, true ),
          onfocus_owner:    event => select( event.target, true ),
          onfocus_summary:  event => textarea( event.target ),
          onfocus_priority: event => select( event.target, false ),
          onfocus_deadline: event => input( event.target, false )

        }, card_data, true ) ) );

      };

      /**
       * returns current result data
       * @returns {Object} local kanban card data
       */
      this.getValue = () => $.clone( card_data );

      /**
       * updates frontend and local data after a card change
       * @param {Object} [priodata] - updated kanban card data (default: local data)
       * @returns {Promise<void>}
       */
      this.refresh = async ( priodata = card_data ) => ( !priodata.last_change || !( await this.updateCardProperty( priodata.last_change.prop, priodata.last_change.value, true ) ) ) && await this.start();

      /**
       * updates a card property in local data, frontend and/or datastore
       * @param {string} prop - card property
       * @param {string} value - new value for card property
       * @param {boolean} [elem] - update in frontend
       * @param {boolean} [store] - update in datastore
       * @returns {Promise<boolean>} succeed
       */
      this.updateCardProperty = async ( prop, value, elem, store ) => {
        value = value.trim();
        switch ( prop ) {
          case 'title':
          case 'owner':
          case 'summary':
          case 'priority':
          case 'deadline':
            card_data[ prop ] = value;
            if ( elem ) {
              elem = this.element.querySelector( `#${prop} .value` );
              if ( elem ) elem.innerHTML = value;
            }
            if ( !store || !this.data.store || !$.hasPermission( card_data, this.user, 'set' ) ) return true;
            card_data.last_change = { prop: prop, value: value };
            try { await this.data.store.set( $.filterProperties( card_data, 'key', prop, 'last_change' ) ); } catch ( e ) { return false; }
            delete card_data.last_change;
            this.logger && this.logger.log( 'change', { prop: prop, value: value, data: $.clone( card_data ) } );
            this.onchange && await this.onchange( { prop: prop, value: value, element: this.element.querySelector( `#${prop}` ), instance: this } );
            return true;
          default:
            return false;
        }
      };

      /**
       * shows selector box for choosing owner or priority of kanban card
       * @param {Element} elem - focused element for owner/priority
       * @param {boolean} owner_or_prio - true: owner, false: priority
       */
      const select = ( elem, owner_or_prio ) => {
        const entries = [ { tag: 'option' } ];
        this[ owner_or_prio ? 'members' : 'priorities' ].forEach( entry => entries.push( { tag: 'option', inner: entry, selected: entry === card_data[ owner_or_prio ? 'owner' : 'priority' ] || '' } ) );
        $.replace( elem, $.html( {
          tag: 'select',
          inner: entries,
          onchange: event => this.updateCardProperty( owner_or_prio ? 'owner' : 'priority', event.target.value, true, true ),
          onblur: event => { $.replace( event.target, elem ); elem.innerText = event.target.value; }
        } ) );
        this.element.querySelector( 'select' ).focus();
      };

      /**
       * shows input field for choosing title or deadline of kanban card
       * @param {Element} elem - focused element for title/deadline
       * @param {boolean} title_or_deadline - true: title, false: deadline
       */
      const input = ( elem, title_or_deadline ) => {
        $.replace( elem, $.html( {
          tag: 'input',
          type: title_or_deadline ? 'text' : 'date',
          value: card_data[ title_or_deadline ? 'title' : 'deadline' ] || '',
          oninput: event => this.updateCardProperty( title_or_deadline ? 'title' : 'deadline', event.target.value, true, true ),
          onblur: event => { $.replace( event.target, elem ); elem.innerText = event.target.value; }
        } ) );
        this.element.querySelector( 'input' ).focus();
        this.element.querySelector( 'input' ).select();
      };

      /**
       * shows textarea field for choosing summary of kanban card
       * @param {Element} elem - focused element for summary
       */
      const textarea = elem => {
        $.replace( elem, $.html( {
          tag: 'textarea',
          inner: card_data.summary || '',
          oninput: event => this.updateCardProperty( 'summary', event.target.value, true, true ),
          onblur: event => { $.replace( event.target, elem ); elem.innerText = event.target.value; }
        } ) );
        this.element.querySelector( 'textarea' ).focus();
        this.element.querySelector( 'textarea' ).select();
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
/**
 * @overview ccm-based web component for kanban card
 * @author André Kless <andre.kless@web.de> 2016-2021
 * @license The MIT License (MIT)
 * @version 4.0.0
 * @changes
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
    version: [ 4, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.1.1.js',
    config: {
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_card/resources/default.css" ],
      "data": { "store": [ "ccm.store" ] },
      "editable": true,
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-6.0.1.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_card/resources/templates.html" ],
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

        // listen to datastore changes for realtime update
        if ( this.data.store ) this.data.store.onchange = priodata => priodata.key === this.data.key && this.refresh( priodata );

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

          oninput_title:    event => this.updateCardProperty( 'title', event.target.innerText.replace( /\n/g, '' ), false, true ),
          onblur_title:     event => event.target.innerHTML = card_data.title || '',
          onfocus_owner:    event => select( event.target, true ),
          oninput_summary:  event => this.updateCardProperty( 'summary', event.target.innerText.replace( /\n/g, '' ), false, true ),
          onblur_summary:   event => event.target.innerHTML = card_data.summary || '',
          onfocus_priority: event => select( event.target, false ),
          onfocus_deadline: event => input( event.target )

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
       * shows input field for choosing deadline of kanban card
       * @param {Element} elem - focused element for deadline
       */
      const input = elem => {
        $.replace( elem, $.html( {
          tag: 'input',
          type: 'date',
          value: card_data.deadline || '',
          oninput: event => this.updateCardProperty( 'deadline', event.target.value, true, true ),
          onblur: event => { $.replace( event.target, elem ); elem.innerText = event.target.value; }
        } ) );
        this.element.querySelector( 'input' ).focus();
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
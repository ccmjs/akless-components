/**
 * @overview ccm component for kanban boards
 * @author André Kless <andre.kless@web.de> 2016-2018, 2020
 * @license The MIT License (MIT)
 * @version latest (3.0.0)
 * @changes
 * version 3.0.0 (04.04.2020):
 * - uses ccm v25.2.1
 * - uses helper.mjs v4.2.1 as default
 * - uses HTML templates via templates.html
 * - improved realtime update
 * - changed for logging and 'onchange' callback
 * - added public instance methods for get, add, delete and move a card
 * (for older version changes see ccm.kanban_board-2.0.2.js)
 */

( () => {

  const component = {

    name: 'kanban_board',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.2.1.js',

    config: {
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_board/resources/default.css" ],
      "permissions": { "access": "all" },
      "data": { "store": [ "ccm.store" ], "key": "test" },
      "del": "Do you really want to delete this card?",
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.2.1.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/kanban_board/resources/templates.html" ],
//    "ignore": { "card": { "component": "https://ccmjs.github.io/akless-components/kanban_card/ccm.kanban_card.js", "config": {} } },
      "lanes": [ "ToDo", "Doing", "Done" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.3.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
//    "onchange": event => console.log( event ),
//    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.4.0.js" ]
    },

    Instance: function () {

      let $, dataset;

      this.ready = async () => {

        $ = Object.assign( {}, this.ccm.helper, this.helper );                 // set shortcut to help functions
        this.data.store.onchange = this.refresh;                               // listen to datastore changes for realtime update
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );  // logging of 'ready' event

      };

      this.start = async () => {

        // get user-dependent app data
        dataset = await $.dataset( this.data );

        // set initial lanes
        if ( !dataset.lanes ) dataset.lanes = [];
        for ( let i = 0; i < this.lanes.length; i++ )
          if ( !dataset.lanes[ i ] )
            dataset.lanes[ i ] = { cards: [] };

        this.logger && this.logger.log( 'start', this.getValue() );                        // logging of 'start' event
        $.setContent( this.element, $.html( this.html.main, { onreload: this.start } ) );  // render main HTML structure

        // realtime kanban board? => remove refresh button
        if ( this.data.store.source().url && this.data.store.source().url.startsWith( 'ws' ) )
          $.remove( this.element.querySelector( '#reload' ) );

        // render login/logout area
        if ( this.user ) {
          $.append( this.element.querySelector( '#top' ), this.user.root );
          this.user.start();
        }

        // create and append HTML structure for each lane
        for ( let i = 0; i < this.lanes.length; i++ ) {

          /**
           * HTML structure of the lane
           * @type {Element}
           */
          const lane_elem = $.html( this.html.lane, this.lanes[ i ] );

          // append prepared lane HTML structure to main HTML structure
          this.element.querySelector( '#lanes' ).appendChild( lane_elem );

          // create and append HTML structure for each card
          for ( let j = 0; j < dataset.lanes[ i ].cards.length; j++ )
            await this.addCardElement( i, this.getCardData( i, j ) );

          // append button for create a new card to first lane
          if ( this.ignore && this.ignore.card && i === 0 ) lane_elem.appendChild( $.html( this.html.add, this.addCard ) );

        }

      };

      /**
       * updates frontend and local data after a card change
       * @param {Object} [priodata] - updated user-dependent app data (default: local data)
       * @returns {Promise<void>}
       */
      this.refresh = async ( priodata = dataset ) => {

        const last_change = priodata.last_change;  // information about last change
        if ( !last_change ) return this.start();   // no information about last change? => restart

        let card;
        switch ( last_change.event ) {

          case 'add':
            const cards = dataset.lanes[ 0 ].cards.length;           // get number of cards in the first lane
            if ( cards !== last_change.cards ) return this.start();  // wrong number of cards? => restart
            this.addCardElement( 0, last_change.app );               // add card in first lane in frontend
            this.addCardData( last_change.app );                     // add card in first lane local data
            break;

          case 'move':
            card = this.getCardData( last_change.from[ 0 ], last_change.from[ 1 ] );            // get card data
            if ( $.stringify( card ) !== $.stringify( last_change.app ) ) return this.start();  // wrong card at this position? => restart
            this.moveCardElement( last_change.from, last_change.to );                           // move card in frontend
            this.moveCardData( last_change.from, last_change.to );                              // move card in local data
            break;

          case 'del':
            card = this.getCardData( last_change.lane, last_change.card );                      // get card data
            if ( $.stringify( card ) !== $.stringify( last_change.app ) ) return this.start();  // wrong card at this position? => restart
            this.deleteCardElement( last_change.lane, last_change.card );                       // remove card in frontend
            this.deleteCardData( last_change.lane, last_change.card );                          // delete card in local data
            break;

          default:
            return this.start();  // restart (then all data is consistent again)
        }

      };

      /**
       * returns current result data
       * @returns {Object}
       */
      this.getValue = () => $.clone( dataset );

      /**
       * adds a new card in the first lane
       * @returns {Promise<void>}
       */
      this.addCard = async () => {

        // prepare app configuration for new card
        const config = $.clone( this.ignore.card.config || {} );
        if ( $.isObject( config.data ) && config.data.store ) config.data.key = $.generateKey();

        // create card
        dataset.last_change = { event: 'add', cards: dataset.lanes[ 0 ].cards.length, app: [ 'ccm.instance', this.ignore.card.component, config ] };
        await this.refresh();
        this.data.store && await this.data.store.set( dataset );

        // logging of 'add' event and trigger of 'onchange' callback
        this.logger && this.logger.log( 'add' );
        this.onchange && this.onchange.call( this );

      };

      /**
       * adds a card in the first lane in local data
       * @param {Array} card - app dependency of the card
       * @returns {Promise<void>}
       */
      this.addCardData = async card => dataset.lanes[ 0 ].cards.push( $.clone( card ) );

      /**
       * adds a card in the first lane in frontend
       * @param {number} lane - lane index
       * @param {Array} card - app dependency of the card
       * @returns {Promise<void>}
       */
      this.addCardElement = async ( lane, card ) => {

        // adjust instance configuration in app dependency
        card = $.clone( card );
        card[ 2 ] = await $.solveDependency( card[ 2 ] );
        card[ 2 ] = $.clone( card[ 2 ] || {} );
        card[ 2 ].parent = this;

        // render card (root element of the card instance is the card element and the drop zone)
        card = await $.solveDependency( card );
        await card.start();
        card = card.root;
        card.classList.add( 'card' );
        this.element.querySelectorAll( '.cards' )[ lane ].appendChild( card );

        // set drag'n'drop functionality of the card
        makeDraggable.call( this, card );
        makeDroppable.call( this, card );

        // set functionality for removing a card via double click
        card.addEventListener( 'dblclick', async event => {

          if ( !confirm( this.del ) ) return;                // run confirm dialog
          const pos = this.getCardPosition( event.target );  // get card position
          await this.deleteCard( pos[ 0 ], pos[ 1 ] );       // delete card

        } );

        /**
         * makes a card draggable
         * @param {Element} card_elem - card element
         */
        function makeDraggable( card_elem ) {

          // activate draggable functionality
          card_elem.draggable = true;

          // set draggable start event
          card_elem.addEventListener( 'dragstart', event => {

            /**
             * card position
             * @type {Array}
             */
            const pos = this.getCardPosition( event.target );

            // remember original position of card
            event.dataTransfer.setData( 'text', pos.join( ',' ) );

            // add a drop zone under the last card of each lane as additional droppable area
            this.element.querySelectorAll( '.cards' ).forEach( cards_elem => {
              const drop_zone = $.html( { class: 'drop_zone' } );
              drop_zone.style.width  = event.target.offsetWidth  + 'px';
              drop_zone.style.height = event.target.offsetHeight + 'px';
              makeDroppable.call( this, drop_zone );
              cards_elem.appendChild( drop_zone );
            } );

          } );

          // set draggable end event => remove all drop zones
          card_elem.addEventListener( 'dragend', () => this.element.querySelectorAll( '.drop_zone' ).forEach( $.remove ) );

        }

        /**
         * makes an element droppable for cards
         * @param {Element} elem - element
         */
        function makeDroppable( elem ) {

          // allow droppable functionality
          elem.addEventListener( 'dragover', event => event.preventDefault() );

          // set droppable event
          elem.addEventListener( 'drop', async event => {

            /**
             * original position of dropped card
             * @type {number[]}
             */
            const from = event.dataTransfer.getData( 'text' ).split( ',' ).map( value => parseInt( value ) );

            /**
             * target card position
             * @type {number[]}
             */
            const to = this.getCardPosition( event.target );

            // is original position identical to target position? => abort
            if ( from[ 0 ] === to[ 0 ] && ( from[ 1 ] === to[ 1 ] || from[ 1 ] === to[ 1 ] - 1 ) ) return;

            // move card
            await this.moveCard( from, to );

          } );

        }

      };

      /**
       * deletes a card in a lane
       * @param {number} lane - lane index
       * @param {number} card - card index
       * @returns {Promise<void>}
       */
      this.deleteCard = async ( lane, card ) => {

        /**
         * card data (app dependency)
         * @type {Array}
         */
        const app = this.getCardData( lane, card );

        // delete card
        dataset.last_change = { event: 'del', lane: lane, card: card, app: app };
        await this.refresh();
        this.data.store && await this.data.store.set( dataset );

        // logging of 'del' event and trigger of 'onchange' callback
        this.logger && this.logger.log( 'del', { lane: lane, card: card, app: $.clone( app ) } );
        this.onchange && this.onchange( { event: 'del', lane: lane, card: card, app: $.clone( app ), instance: this } );

      };

      /**
       * deletes a card in a lane in local data
       * @param {number} lane - lane index
       * @param {number} card - card index
       */
      this.deleteCardData = ( lane, card ) => dataset.lanes[ lane ].cards.splice( card, 1 );

      /**
       * deletes a card in a lane in frontend
       * @param {number} lane - lane index
       * @param {number} card - card index
       */
      this.deleteCardElement = ( lane, card ) => $.remove( this.getCardElement( lane, card ) );

      /**
       * gets the data of a card of a lane
       * @param {number} lane - lane index
       * @param {number} card - card index
       * @returns {Array} card data (app dependency)
       */
      this.getCardData = ( lane, card ) => $.clone( dataset.lanes[ lane ].cards[ card ] );

      /**
       * gets the element of a card of a lane
       * @param {number} lane - lane index
       * @param {number} card - card index
       * @returns {Element}
       */
      this.getCardElement = ( lane, card ) => this.element.querySelectorAll( '.lane' )[ lane ].querySelectorAll( '.card' )[ card ];

      /**
       * gets the position of a card
       * @param {Element} card - card element
       * @returns {number[]}
       * @example [ 1, 3 ]
       */
      this.getCardPosition = card => {

        /**
         * lane that contains the card
         * @param {Element}
         */
        const lane = card.closest( '.lane' );

        return [ [ ...lane.parentNode.children ].indexOf( lane ), [ ...card.parentNode.children ].indexOf( card ) ];
      };

      /**
       * moves a card to another position
       * @param {number[]} from - card position
       * @param {number[]} to - destination position
       */
      this.moveCard = async ( from, to ) => {

        /**
         * card data
         * @type {Object}
         */
        const card = this.getCardData( from[ 0 ], from[ 1 ] );

        // move card
        dataset.last_change = { event: 'move', from: from, to: to, app: card };
        await this.refresh();
        await this.data.store.set( dataset );

        // logging of 'move' event and trigger of 'onchange' callback
        this.logger && this.logger.log( 'move', { from: from, to: to, data: $.clone( card ) } );
        this.onchange && this.onchange( { event: 'move', from: from, to: to, data: $.clone( card ), instance: this } );

      };

      /**
       * moves a card to another position in local data
       * @param {number[]} from - card position
       * @param {number[]} to - destination position
       */
      this.moveCardData = ( from, to ) => {

        const card = this.getCardData( from[ 0 ], from[ 1 ] );        // get card data
        dataset.lanes[ from[ 0 ] ].cards[ from[ 1 ] ] = null;         // mark original position as removed
        dataset.lanes[ to[ 0 ] ].cards.splice( to[ 1 ], 0, card );    // add card at new position
        if ( this.getCardData( from[ 0 ], from[ 1 ] ) ) from[ 1 ]++;  // has original position changed through shift? => correct original position
        dataset.lanes[ from[ 0 ] ].cards.splice( from[ 1 ], 1 );      // delete original position completely

      };

      /**
       * moves a card to another position in frontend
       * @param {number[]} from - card position
       * @param {number[]} to - destination position
       */
      this.moveCardElement = ( from, to ) => {

        from = this.getCardElement( from[ 0 ], from[ 1 ] );        // get card element
        const dest = this.getCardElement( to[ 0 ], to[ 1 ] - 1 );  // get destination
        if ( dest )
          dest.parentNode.insertBefore( from, dest.nextSibling );
        else
          $.prepend( this.element.querySelectorAll( '.cards' )[ to[ 0 ] ], from );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
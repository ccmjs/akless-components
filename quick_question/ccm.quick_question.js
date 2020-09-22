/**
 * @overview ccm component for quick questions
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (22.09.2020)
 */

( () => {

  const component = {

    name: 'quick_question',

    ccm: './resources/ccm.js',

    config: {
      "convert": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/json2json.mjs#quick_question2highchart" ],
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/quick_question/resources/styles.css" ],
      "diagram": [ "ccm.component", "https://ccmjs.github.io/akless-components/highchart/versions/ccm.highchart-3.0.2.js" ],
      "store": { "store": [ "ccm.store" ] },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-6.0.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/quick_question/resources/templates.mjs" ],
      "icon": {
        "yes": "YES",
        "neither": "DON'T KNOW",
        "no": "NO",
        "like": "LIKE",
        "add": "ADD",
        "confirm": "CONFIRM",
        "share": "SHARE",
        "cancel": "CANCEL",
        "report": "REPORT"
      },
      "text": {
        "title": "Bürgervotum",
        "add_title": "Hier kannst du eine neue Frage stellen:",
        "add_placeholder": "...was möchtest du wissen?",
        "prev": "Vorherige Frage:",
        "next": "Nächste Frage:",
        "yes": "Ja",
        "neither": "Weiß nicht",
        "no": "Nein",
        "like": "Wichtige Frage",
        "add": "Frage stellen",
        "confirm": "Bestätigen",
        "share": "Frage teilen",
        "cancel": "Abbrechen",
        "report": "Frage melden"
      },
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js" ]
    },

    Instance: function () {

      let $, prev, next, add = false;

      this.start = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        /**
         * unique key of logged in user
         * @type {string}
         */
        const user = this.user.getValue().key;

        // random selection of next question
        next = await this.store.get( ( 1 + Math.floor( Math.random() * await this.store.count() ) ).toString() );

        /**
         * when the question is answered by the user
         * @type {Function}
         * @returns {Promise<void>}
         */
        const finish = async () => {
          await this.store.set( next );  // update data of answered question
          prev = next;                   // current question is now previous question
          this.start();                  // restart => shows next question
        };

        /**
         * contains callbacks for click events
         * @type {Object.<string,Function>}
         */
        const event = {
          yes: () => {
            next.voting.yes[ user ] = true;
            delete next.voting.neither[ user ];
            delete next.voting.no[ user ];
            finish();
          },
          neither: () => {
            delete next.voting.yes[ user ];
            next.voting.neither[ user ] = true;
            delete next.voting.no[ user ];
            finish();
          },
          no: () => {
            delete next.voting.yes[ user ];
            delete next.voting.neither[ user ];
            next.voting.no[ user ] = true;
            finish();
          },
          like: () => {
            next.likes[ user ] = true;
            this.store.set( next );
          },
          add: () => {
            add = true;
            this.start();
          },
          confirm: () => console.log( 'TODO' ),
          share: () => console.log( 'TODO' ),
          cancel: () => {
            add = false;
            this.start();
          },
          report: () => console.log( 'TODO' )
        };

        // render content in webpage area via lit-html template
        $.render( $.html( this.html.main, this, event, next, prev, add ), this.element );

        // render diagram for results of previous question
        prev && await this.diagram.start( {
          root: this.element.querySelector( 'section#prev article' ),
          style: '',
          settings: this.convert( {
            title: this.text.prev,
            subtitle: prev.text,
            categories: [ this.text.yes, this.text.no, this.text.neither ],
            data: [ Object.keys( prev.voting.yes ).length, Object.keys( prev.voting.no ).length, Object.keys( prev.voting.neither ).length ]
          } )
        } );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
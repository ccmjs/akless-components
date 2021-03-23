/**
 * @overview ccmjs-based web component for ER model training
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (23.03.2021)
 */

( () => {

  const component = {
    name: 'er_trainer',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.2.0.js',
    config: {
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
          "https://ccmjs.github.io/akless-components/er_trainer/resources/default.css"
        ]
      ],
//    "data": { "store": [ "ccm.store" ] },
      "default": {
        "entity": "e",
        "format": "svg",
        "notation": "crow",
        "path": "https://ccmjs.github.io/akless-components/er_trainer/resources/",
        "relation": "r"
      },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.0.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/er_trainer/resources/templates.mjs" ],
      "notations": {
        "abrial": {
          "key": "abrial",
          "title": "Abrial",
          "swap": true
        },
        "arrow": {
          "key": "arrow",
          "title": "Pfeilnotation"
        },
        "chen": {
          "key": "chen",
          "title": "Chen"
        },
        "crow": {
          "key": "crow",
          "title": "Krähenfuß"
        },
        "uml": {
          "key": "uml",
          "title": "UML"
        }
      },
//    "phrases": [],
      "text": {
        "abort": "Abbrechen",
        "current_state": "Sie haben %% von %% Phrasen richtig beantwortet!",
        "entity1": "Entity 1",
        "entity2": "Entity 2",
        "finish": "Beenden",
        "heading": "Bitte wählen Sie den zu der Phrase passenden Beziehungstyp in der Auswahlbox aus!",
        "input1": "Auswahl 1:",
        "input2": "Auswahl 2:",
        "label": "Notation:",
        "legend": "Legende",
        "next": "Weiter",
        "phrase": "Phrase [%%]:",
        "selection": [ "1", "c", "n", "cn" ],
        "submit": "Antworten"
      },
      "title": "ER-Trainer"
    },

    Instance: function () {

      let $, dataset;

      this.start = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // get already existing app state data
        dataset = Object.assign( await $.dataset( this.data ), {
          correct: 0,
          notation: this.default.notation,
          sections: [],
          total: this.phrases.length
        } );

        // render main HTML template
        this.html.render( this.html.main( this, dataset, 1 ), this.element );

      };

      /**
       * returns current result data
       * @returns {Object}
       */
      this.getValue = () => $.clone( dataset );

    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
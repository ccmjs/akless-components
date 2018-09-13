/**
 * @overview ccm component for component manager
 * @author André Kless <andre.kless@web.de>, 2018
 * @license MIT License
 */

( function () {

  const component = {

    name: 'component_manager',

    version: [ 1, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.0.0.js',

    config: {
      "html": {
        "main": {
          "id": "main",
          "inner": [
            {
              "id": "header",
              "inner": [
                {
                  "id": "header-left",
                  "inner": {
                    "tag": "img",
                    "src": "%icon%"
                  }
                },
                {
                  "id": "header-right",
                  "inner": [
                    {
                      "id": "header-top",
                      "inner": [
                        {
                          "tag": "span",
                          "id": "header-title",
                          "inner": "%title%"
                        },
                        {
                          "tag": "span",
                          "id": "header-version",
                          "inner": "%version%"
                        }
                      ]
                    },
                    {
                      "id": "header-developer",
                      "inner": "%developer%"
                    },
                    {
                      "id": "header-rating"
                    },
                    {
                      "id": "header-abstract",
                      "inner": "%abstract%"
                    }
                  ]
                }
              ]
            },
            { "id": "menu" }
          ]
        }
      },
      "css": [ "ccm.load",
        "https://ccmjs.github.io/akless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap/css/font-face.css" },
        "https://ccmjs.github.io/akless-components/component_manager/resources/default.css"
      ],
      "data": {},   // TODO: proof of empty state
      "menu": [ "ccm.component", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.1.0.js", {
        "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/menu/resources/configs.js", "bootstrap" ],
        "root": "name"
      } ],
      "details": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.0.js", {
        "inner": {
          "inner": [
            { "tag": "br" },
            {
              "tag": "table",
              "class": "table table-striped",
              "inner": {
                "tag": "tbody",
                "inner": [
                  {
                    "tag": "tr",
                    "inner": [
                      {
                        "tag": "th",
                        "inner": "Title"
                      },
                      {
                        "tag": "td",
                        "inner": "%title%"
                      }
                    ]
                  },
                  {
                    "tag": "tr",
                    "inner": [
                      {
                        "tag": "th",
                        "inner": "Name"
                      },
                      {
                        "tag": "td",
                        "inner": "%key%"
                      }
                    ]
                  },
                  {
                    "tag": "tr",
                    "inner": [
                      {
                        "tag": "th",
                        "inner": "Version"
                      },
                      {
                        "tag": "td",
                        "inner": "%version%"
                      }
                    ]
                  },
                  {
                    "tag": "tr",
                    "inner": [
                      {
                        "tag": "th",
                        "inner": "URL"
                      },
                      {
                        "tag": "td",
                        "inner": {
                          "tag": "a",
                          "target": "_blank",
                          "href": "%url%",
                          "inner": "%url%"
                        }
                      }
                    ]
                  },
                  {
                    "tag": "tr",
                    "inner": [
                      {
                        "tag": "th",
                        "inner": "Developer"
                      },
                      {
                        "tag": "td",
                        "inner": "%developer%"
                      }
                    ]
                  },
                  {
                    "tag": "tr",
                    "inner": [
                      {
                        "tag": "th",
                        "inner": "Website"
                      },
                      {
                        "tag": "td",
                        "inner": {
                          "tag": "a",
                          "target": "_blank",
                          "href": "%website%",
                          "inner": "%website%"
                        }
                      }
                    ]
                  },
                  {
                    "tag": "tr",
                    "inner": [
                      {
                        "tag": "th",
                        "inner": "License"
                      },
                      {
                        "tag": "td",
                        "inner": "%license%"
                      }
                    ]
                  }
                ]
              }
            }
          ]
        },
        "css": [ "ccm.load",
          "https://ccmjs.github.io/akless-components/libs/bootstrap/css/bootstrap.css",
          { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap/css/font-face.css" }
        ]
      } ],
      "rating": [ "ccm.component", "https://ccmjs.github.io/tkless-components/star_rating/versions/ccm.star_rating-3.0.0.js", { "root": "name" } ],
      "rating_result": [ "ccm.component", "https://ccmjs.github.io/tkless-components/star_rating_result/versions/ccm.star_rating_result-3.0.0.js", { "root": "name", "detailed": true } ],
      "commentary": [ "ccm.component", "https://ccmjs.github.io/tkless-components/comment/versions/ccm.comment-4.0.0.js" ],
      "builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/crud_app/versions/ccm.crud_app-3.0.0.js", { "store": [ "ccm.store" ] } ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "entries": [
        {
          "title": "Details",
          "content": { "id": "details" }
        },
        {
          "title": "Rating",
          "content": {
            "inner": [
              { "id": "rating_result" },
              { "tag": "hr" },
              { "tag": "h3", "inner": "Your Rating:" },
              { "id": "rating" }
            ]
          }
        },
        {
          "title": "Comments",
          "disabled": true,
          "content": { "id": "commentary" }
        },
        {
          "title": "Demo",
          "content": {
            "style": "margin: 1em;",
            "inner": [
              { "id": "demo", "class": "well well-sm" },
              { "id": "menu" }
            ]
          }
        },
        {
          "title": "Create App",
          "content": {
            "style": "margin: 1em;",
            "inner": [
              { "id": "builder", "class": "well well-sm" },
              { "id": "menu" }
            ]
          }
        }
      ],
      "component_icon": "https://ccmjs.github.io/akless-components/dms/resources/component.png"
    },

    Instance: function () {

      let $;

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        /**
         * component dataset
         * @type {Object}
         */
        const dataset = await $.dataset( this.data );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        $.setContent( this.element, $.html( this.html.main, {
          icon: this.component_icon,
          title: dataset.title,
          version: dataset.version,
          developer: dataset.developer,
          abstract:  dataset.abstract
        } ) );

        if ( !this.rating && !this.rating_result ) this.entries[ 1 ].disabled = true;
        if ( !dataset.ignore || !dataset.ignore.  demos || !dataset.ignore.  demos.length ) this.entries[ 3 ].disabled = true;
        if ( !dataset.ignore || !dataset.ignore.builder || !dataset.ignore.builder.length ) this.entries[ 4 ].disabled = true;
        await this.menu.start( {
          data: { entries: this.entries },
          selected: 1,
          onclick: async event => {
            switch ( event.nr ) {
              case 1:
                await this.details.start( {
                  root: event.content.querySelector( '#details' ),
                  placeholder: dataset
                } );
                break;
              case 2:
                await this.rating_result.start( {
                  root: event.content.querySelector( '#rating_result' ),
                  data: { store: [ 'ccm.store' ] }
                } );
                await this.rating.start( {
                  root: event.content.querySelector( '#rating' ),
                  data: { store: [ 'ccm.store' ] },
                  user: self.user
                } );
                break;
              case 4:
                if ( dataset.ignore.demos.length === 1 ) {
                  const instance = await this.ccm.start( dataset.url, dataset.ignore.demos[ 0 ] );
                  $.setContent( event.content.querySelector( '#demo' ), instance.root );
                  $.removeElement( event.content.querySelector( '#menu' ) );
                }
                break;
              case 5:
                if ( dataset.ignore.builder.length === 1 ) {
                  await this.builder.start( {
                    root: event.content.querySelector( '#builder' ),
                    builder: [ 'ccm.component', dataset.ignore.builder[ 0 ].url, dataset.ignore.builder[ 0 ].config ],
                    url: dataset.url,
                    'store.1.name': dataset.key
                  } );
                  $.removeElement( event.content.querySelector( '#menu' ) );
                }
                break;
            }
          }
        } );

      };
    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
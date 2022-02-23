/**
 * @overview ccmjs-based web component for a Quill Rich Text Editor
 * @author André Kless <andre.kless@web.de> 2021-2022
 * @license The MIT License (MIT)
 * @version 2.0.0
 * @changes
 * version 2.0.0 (23.02.2022):
 * - uses ccmjs v27.3.1 as default
 * - uses helper.mjs v8.1.0
 * - define of custom buttons
 * - alternative HTML mode
 * - added optional button for embed an app
 * - changed parameter of 'onstart' callback
 * version 1.0.0 (22.11.2021)
 */

( () => {
  const component = {
    name: 'quill',
    version: [ 2, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.3.1.min.js',
    config: {
      "css": [ "ccm.load", [
        "https://ccmjs.github.io/akless-components/libs/quill-1/quill.snow.min.css",
        "https://ccmjs.github.io/akless-components/quill/resources/styles.css"
      ] ],
//    "data": { "ops": [ { "insert": "Hello, World!\n" } ] },
//    "embed": {
//      "icon": "<img src='https://ccmjs.github.io/akless-components/dms/resources/icon-18.png' title='Über dieses Icon kann eine App aus dem Digital Makerspace eingefügt werden.'>",
//      "prompt": "Einbettungscode oder App-URL:"
//    },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.1.0.min.mjs" ],
//    "html": true,
      "libs": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/quill-1/quill.min.js" ],
//    "onchange": event => console.log( event.instance.getValue() ),
//    "onstart": event => console.log( event.instance.getValue() ),
      "options": { "theme": "snow" },
      "shadow": "none"
    },
    Instance: function () {
      let $;
      this.start = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );
        this.quill = new Quill( this.element, this.options );
        if ( this.data ) {
          const data = await $.dataset( this.data );
          this.html ? this.setHTML( data.value ) : this.quill.setContents( data );
        }
        this.onchange && this.quill.on( 'text-change', () => this.onchange( { instance: this } ) );
        if ( this.buttons ) {
          const format = $.html( { tag: 'span', class: 'ql-formats' } );
          this.buttons.forEach( button => {
            const onclick = button.onclick;
            button.onclick = event => { event.instance = this; onclick( event ) };
            button.tag = 'button';
            format.appendChild( $.html( button ) );
          } );
          this.quill.getModule( 'toolbar' ).container.appendChild( format );
        }
        if ( this.html && this.embed ) {
          startApps();
          const format = $.html( { tag: 'span', class: 'ql-formats' } );
          this.quill.getModule( 'toolbar' ).container.appendChild( format );
          format.appendChild( $.html( {
            tag: 'button',
            inner: this.embed.icon,
            onclick: async () => {
              const range = this.quill.getSelection( true );
              const input = prompt( this.embed.prompt );
              const app = await $.appDependency( input );
              if ( !app ) return;
              this.quill.insertEmbed( range.index, 'embed-app', app, Quill.sources.USER );
              this.quill.setSelection( range.index + 1, Quill.sources.SILENT );
              startApps();
            }
          } ) );
          const BlockEmbed = Quill.import( 'blots/block/embed' );
          class EmbedContent extends BlockEmbed {
            static create( app ) {
              const node = super.create( app );
              node.setAttribute( 'component', app[ 1 ] );
              node.setAttribute( 'src', JSON.stringify( app[ 2 ] ) );
              return node;
            }
          }
          EmbedContent.blotName = 'embed-app';
          EmbedContent.tagName = 'ccm-app';
          Quill.register( EmbedContent, true );
        }
        this.onstart && await this.onstart( { instance: this } );
      };
      this.getValue = () => this.html ? { value: this.getHTML() } : this.quill.getContents();
      this.getHTML = () => this.quill.root.innerHTML;
      this.setHTML = html => this.quill.root.innerHTML = html;
      const startApps = () => {
        this.quill.root.querySelectorAll( 'ccm-app' ).forEach( app => {
          if ( app.innerHTML ) return;
          app.appendChild( $.loading() );
          this.ccm.start( app.getAttribute( 'component' ), { root: app, src: JSON.parse( app.getAttribute( 'src' ) ) } );
        } );
      };
    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
/**
 * @overview HTML templates for building a "Q&A Slidecast"
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render, use, checkbox, text, buttons, modal } from 'https://ccmjs.github.io/akless-components/config_builder/resources/templates.mjs';
export { render };

/**
 * returns the main HTML template
 * @param {Object} config - initial app configuration
 * @param {Object} builder - app builder instance
 * @param {Object.<string,Function>} events - contains all event handlers
 * @returns {TemplateResult} main HTML template
 */
export function main( config, builder, events ) {
  const id = builder.id;
  use( config, builder, events, id );
  return html`
    <form @submit=${ events.onSubmit }>

      <!-- Sections -->
      <nav class="btn-group m-2 d-flex" role="group">
        <input type="radio" class="btn-check" name="section" id="${ id }-nav-basis" autocomplete="off" value="basis" checked @change=${ events.onChange }>
        <label class="btn btn-outline-primary" for="${ id }-nav-basis">${ builder.text.section_basis }</label>

        <input type="radio" class="btn-check" name="section" id="${ id }-nav-slides" autocomplete="off" value="slides" @change=${ events.onChange } ?disabled=${ !config.pdf_viewer[ 2 ].pdf || !config.pdf_viewer[ 2 ].pdf.endsWith( '.pdf' ) }>
        <label class="btn btn-outline-primary" for="${ id }-nav-slides">${ builder.text.section_slides }</label>

        <input type="radio" class="btn-check" name="section" id="${ id }-nav-commentary" autocomplete="off" value="commentary" @change=${ events.onChange } ?disabled=${ !config.comment }>
        <label class="btn btn-outline-primary" for="${ id }-nav-commentary">${ builder.text.section_commentary }</label>

        <input type="radio" class="btn-check" name="section" id="${ id }-nav-labels" autocomplete="off" value="labels" @change=${ events.onChange }>
        <label class="btn btn-outline-primary" for="${ id }-nav-labels">${ builder.text.section_labels }</label>
      </nav>

      <!-- Section: Basis -->
      <section id="${ id }-basis" class="mx-2" ?data-hidden=${ builder.section !== 'basis' }>
        ${ text( { prop: 'pdf_viewer.2.pdf', type: 'url' } ) }
        ${ builder.text.headline }
        ${ checkbox( { prop: 'pdf_viewer.2.downloadable', switcher: true } ) }
        ${ checkbox( { prop: 'comment', switcher: true } ) }
        ${ checkbox( { prop: 'description', switcher: true } ) }
      </section>

      <!-- Section: Slides -->
      <section id="${ id }-slides" class="mx-2 border" ?data-hidden=${ builder.section !== 'slides' }></section>

      <!-- Section: Commentary -->
      <section id="${ id }-commentary" class="mx-2 border" ?data-hidden=${ builder.section !== 'commentary' }></section>

      <!-- Section: Tooltips -->
      <section id="${ id }-labels" class="mx-2" ?data-hidden=${ builder.section !== 'labels' }>
        ${ text( 'pdf_viewer.2.text.first' ) }
        ${ text( 'pdf_viewer.2.text.prev' ) }
        ${ text( 'pdf_viewer.2.text.next' ) }
        ${ text( 'pdf_viewer.2.text.last' ) }
        ${ text( 'pdf_viewer.2.text.jump' ) }
        ${ text( { prop: 'pdf_viewer.2.text.download', hidden: !config.downloadable } ) }
        ${ text( 'text.comments' ) }
        ${ text( 'text.description' ) }
        ${ text( 'pdf_viewer.2.text.protected' ) }
        ${ text( 'pdf_viewer.2.text.denied' ) }
      </section>

      <nav class="d-grid mt-2">
        <button type="button" class="btn btn-info rounded-0" data-bs-toggle="modal" data-bs-target="#${ id }-preview" ?data-hidden=${ !builder.text.preview } @click=${ events.onPreview }>
          ${ builder.text.preview }
        </button>
        <button class="btn btn-primary rounded-0" type="submit" ?data-hidden=${ !builder.onfinish || !builder.text.submit }>
          ${ builder.text.submit }
        </button>
      </nav>
    </form>
    ${ modal() }
  `;

}
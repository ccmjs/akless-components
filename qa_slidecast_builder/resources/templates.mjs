/**
 * @overview HTML templates for building a "Q&A Slidecast"
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render, use, heading, text, textarea, checkbox, buttons, modal } from 'https://ccmjs.github.io/akless-components/config_builder/resources/templates.mjs';
export { render };

/**
 * returns the main HTML template
 * @param {Object} config - initial app configuration
 * @param {Object} builder - app builder instance
 * @param {Object.<string,Function>} events - contains all event handlers
 * @returns {TemplateResult}
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

        <input type="radio" class="btn-check" name="section" id="${ id }-nav-slides" autocomplete="off" value="slides" @change=${ events.onChange } ?disabled=${ !config.pdf_viewer[ 2 ].pdf }>
        <label class="btn btn-outline-primary" for="${ id }-nav-slides">${ builder.text.section_slides }</label>

        <input type="radio" class="btn-check" name="section" id="${ id }-nav-commentary" autocomplete="off" value="commentary" @change=${ events.onChange } ?disabled=${ !config.comment }>
        <label class="btn btn-outline-primary" for="${ id }-nav-commentary">${ builder.text.section_commentary }</label>

        <input type="radio" class="btn-check" name="section" id="${ id }-nav-labels" autocomplete="off" value="labels" @change=${ events.onChange }>
        <label class="btn btn-outline-primary" for="${ id }-nav-labels">${ builder.text.section_labels }</label>
      </nav>

      <!-- Section: Basis -->
      <section id="${ id }-basis" class="mx-3 mt-3" ?data-hidden=${ builder.section !== 'basis' }>
        ${ text( { prop: 'pdf_viewer.2.pdf', type: 'url' } ) }
        <div class="mb-3">
          ${ builder.text.headline }
          ${ checkbox( { prop: 'pdf_viewer.2.downloadable', switcher: true } ) }
          ${ checkbox( { prop: 'comment', switcher: true } ) }
          ${ checkbox( { prop: 'description', switcher: true } ) }
        </div>
      </section>

      <!-- Section: Slides -->
      <section id="${ id }-slides" ?data-hidden=${ builder.section !== 'slides' }>
        <article id="${ id }-viewer"></article>
        <nav class="mx-2 mb-3 text-center">
          <button class="btn m-1 btn-primary" title="${ builder.text.expand_left }" data-bs-toggle="modal" data-bs-target="#${ id }-expand" @click=${ events.onExpandLeft }>
            <i class="bi bi-caret-left-fill"></i>
            <i class="bi bi-plus-square-fill"></i>
          </button>
          <button class="btn m-1 btn-primary" title="${ builder.text.settings_button_title }" data-bs-toggle="modal" data-bs-target="#${ id }-settings" @click=${ events.onClickSlideSettings }>
            <i class="bi bi-gear-fill"></i> ${ builder.text.settings_button }
          </button>
          <button class="btn m-1 btn-primary" title="${ builder.text.expand_right }" data-bs-toggle="modal" data-bs-target="#${ id }-expand" @click=${ events.onExpandRight }>
            <i class="bi bi-plus-square-fill"></i>
            <i class="bi bi-caret-right-fill"></i>
          </button>
        </nav>
      </section>

      <!-- Section: Commentary -->
      <section id="${ id }-commentary" class="mx-2 mb-2 border" ?data-hidden=${ builder.section !== 'commentary' }></section>

      <!-- Section: Labels -->
      <section id="${ id }-labels" class="mx-3 mt-3 mb-4" ?data-hidden=${ builder.section !== 'labels' }>
        ${ text( 'pdf_viewer.2.text.first' ) }
        ${ text( 'pdf_viewer.2.text.prev' ) }
        ${ text( 'pdf_viewer.2.text.next' ) }
        ${ text( 'pdf_viewer.2.text.last' ) }
        ${ text( 'pdf_viewer.2.text.jump' ) }
        ${ text( 'pdf_viewer.2.text.protected' ) }
        ${ text( 'pdf_viewer.2.text.denied' ) }
        ${ text( { prop: 'pdf_viewer.2.text.download', hidden: !config.pdf_viewer[ 2 ].downloadable } ) }
        ${ text( { prop: 'text.comments', hidden: !config.comment } ) }
        ${ text( { prop: 'text.description', hidden: !config.description } ) }
      </section>

      ${ buttons( !config.pdf_viewer[ 2 ].pdf ) }
    </form>
    ${ modal() }
    ${ modalExpandSlides() }
    ${ modalSlideSettings() }
  `;

  /**
   * returns the HTML template of the modal dialog for expanding the slides
   * @returns {TemplateResult}
   */
  function modalExpandSlides() {
    return html`
      <form id="${ id }-expand-form" @submit=${ events.onExpandSubmit }>
        <div class="modal" id="${ id }-expand" tabindex="-1" aria-labelledby="${ id }-expand-title" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="${ id }-expand-title">${ builder.text.expand_title }</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body m-3">
                <input type="hidden" name="index">
                ${ heading( 'expand' ) }
                ${ radio( 'app' ) }
                ${ radio( 'image' ) }
                ${ radio( 'video' ) }
                ${ radio( 'youtube' ) }
                ${ input( 'app' ) }
                ${ input( 'image' ) }
                ${ input( 'video' ) }
                ${ input( 'youtube' ) }
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">${ builder.text.confirm }</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    `;

    /**
     * returns the HTML template for a radio button entry
     * @returns {TemplateResult}
     */
    function radio( key ) {
      const helper = name => builder.element.querySelectorAll( '.' + id + '-expand' ).forEach( element => element.classList.contains( id + '-' + name ) ? delete element.dataset.hidden : element.dataset.hidden = true );
      return html`
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="expand" id="${ id }-expand-${ key }-heading" value="${ key }" @change=${ () => helper( key ) }>
          <label class="form-check-label" for="${ id }-expand-${ key }-heading">${ builder.text[ 'expand_' + key ] }</label>
        </div>
      `;
    }

    /**
     * returns the HTML template for a text input entry
     * @returns {TemplateResult}
     */
    function input( key ) {
      return html`
        <div class="mt-3 ${ id }-expand ${ id }-${ key }" data-hidden>
          ${ heading( 'expand_' + key + '_input' ) }
          <input type="text" name="${ key }" class="form-control" id="${ id }-expand-${ key }">
        </div>
      `;
    }

  }

  /**
   * returns the HTML template of the modal dialog for slide settings
   * @returns {TemplateResult}
   */
  function modalSlideSettings() {
    return html`
      <form id="${ id }-settings-form" @submit=${ events.onSubmitSlideSettings }>
        <div class="modal" id="${ id }-settings" tabindex="-1" aria-labelledby="${ id }-settings-title" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="${ id }-settings-title">${ builder.text.settings_title }</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body m-3">
                <div id="${ id }-settings-content">
                  ${ text( 'slide.content' ) }
                </div>
                ${ text( 'slide.audio' ) }
                ${ textarea( { prop: 'slide.description', hidden: !config.description } ) }
                ${ checkbox( { prop: 'slide.commentary', switcher: true, hidden: !config.comment } ) }
              </div>
              <div class="modal-footer justify-content-between">
                <button type="button" id="${ id }-settings-delete" class="btn btn-danger" data-bs-dismiss="modal" @click=${ events.onDelete }>${ builder.text.delete }</button>
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">${ builder.text.confirm }</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    `;
  }

}
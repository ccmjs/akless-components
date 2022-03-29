/**
 * @overview HTML templates for building a slidecast with commentary
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render, use, text, select, heading, buttons, modal } from 'https://ccmjs.github.io/akless-components/config_builder/resources/templates.mjs';
export { render };

/**
 * returns the main HTML template
 * @param {Object} config - initial app configuration
 * @param {Object} builder - app builder instance
 * @param {Object.<string,Function>} events - contains all event handlers
 * @returns {TemplateResult}
 */
export function main( config, builder, events ) {
  const id = builder.component.name;
  use( config, builder, events, id );
  return html`
    <header id="${ id }-header" class="d-flex justify-content-end align-items-center px-3"></header>
    <form id="${ id }-form" @submit=${ events.onSubmitMap }>
      <div class="m-3 mb-0">
        ${ text( { prop: 'image', type: 'url' } ) }
        ${ text( { prop: 'width', type: 'number' } ) }
        ${ text( { prop: 'height', type: 'number' } ) }
        ${ heading( 'info' ) }
        <div class="mb-2" id="${ id }-map-info"></div>
        ${ text( { prop: 'back' } ) }
        ${ select( { prop: 'dark', options: [
          { value: false },
          { value: true },
          { value: 'auto' }
        ] } ) }
        <h5 class="pt-2" data-lang="areas">${ builder.text.areas }</h5>
        <p data-lang="areas_info">${ builder.text.areas_info }</p>
        <button class="btn btn-primary btn-sm" type="button" @click=${ events.onAddArea }><i class="bi bi-plus"></i> <span data-lang="add_area">${ builder.text.add_area }</span></button>
        <button class="btn btn-danger btn-sm ms-1" type="button" @click=${ events.onDeleteAreas }><i class="bi bi-trash-fill"></i> <span data-lang="delete_areas">${ builder.text.delete_areas }</span></button>
      </div>
      <div class="m-2 mt-0" id="${ id }-placement"></div>
      ${ buttons() }
    </form>
    ${ modal() }
    <form @submit=${ events.onSubmitArea }>
      <div class="modal" id="${ id }-modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" data-lang="modal_title">${ builder.text.modal_title }</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-3">
              ${ text( { prop: 'area.image', type: 'url' } ) }
              ${ heading( 'area_info' ) }
              <div class="mb-2" id="${ id }-area-info"></div>
              ${ text( { prop: 'area.app' } ) }
              <input type="hidden" name="nr">
            </div>
            <div class="modal-footer d-flex justify-content-between">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" data-lang="modal_cancel">${ builder.text.modal_cancel }</button>
              <button type="button" class="btn btn-danger" id="${ id }-delete" data-bs-dismiss="modal" @click=${ events.onDeleteArea } data-lang="modal_delete">${ builder.text.modal_delete }</button>
              <button type="submit" class="btn btn-success" data-lang="modal_submit">${ builder.text.modal_submit }</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  `;
}

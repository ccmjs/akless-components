/**
 * @overview HTML templates for building a commentary builder
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render, use, heading, checkbox, text, buttons, modal } from 'https://ccmjs.github.io/akless-components/config_builder/resources/templates.mjs';
export { render };

/**
 * returns the main HTML template
 * @param {Object} config - initial app configuration
 * @param {Object} builder - app builder instance
 * @param {Object.<string,Function>} events - contains all event handlers
 * @returns {TemplateResult} main HTML template
 */
export function main( config, builder, events ) {
  const id = builder.component.name;
  use( config, builder, events, id );
  return html`
    <form @submit=${ events.onSubmit }>
      <div class="accordion accordion-flush" id="${ id }-accordion">

        <!-- General Settings -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="${ id }-general-heading">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#${ id }-general" aria-expanded="true" aria-controls="${ id }-general">
              ${ builder.text.general }
            </button>
          </h2>
          <div id="${ id }-general" class="accordion-collapse collapse show" aria-labelledby="${ id }-general-heading" data-bs-parent="#${ id }-accordion">
            <div class="accordion-body">

              <!-- Sorting of Comments -->
              <div class="mb-3">
                ${ heading( 'sort' ) }
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="sort" value="true" id="${ id }-sort-date" ?checked=${ config.sort }>
                  <label class="form-check-label" for="${ id }-sort-date">
                    ${ builder.text.sort_by_date }
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="sort" value="false" id="${ id }-sort-rating" ?checked=${ !config.sort }>
                  <label class="form-check-label" for="${ id }-sort-rating">
                    ${ builder.text.sort_by_rating }
                  </label>
                </div>
              </div>

              <!-- Default User Picture -->
              <div class="mb-3">
                ${ heading( 'picture' ) }
                <div class="d-flex">
                  <div class="flex-fill">
                    <input type="url" name="picture" class="form-control" id="${ id }-picture" .value=${ config.picture } @change=${ events.onChange }>
                  </div>
                  <div class="ms-2">
                    <img src="${ config.picture }" width="48" height="48" class="rounded-circle">
                  </div>
                </div>
              </div>

              <!-- User Authentication -->
              <div class="mb-3">
                ${ heading( 'user' ) }
                <select name="user" class="form-select" aria-label="${ builder.text.user }">
                  ${ Object.values( builder.ignore.mapping.user ).map( obj => html`<option value="${ obj.key }" ?selected=${ JSON.stringify( config.user ) === JSON.stringify( obj.value ) }>${ obj.title }</option>` ) }
                </select>
              </div>

            </div>
          </div>
        </div>

        <!-- Controls -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="${ id }-controls-heading">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${ id }-controls" aria-expanded="true" aria-controls="${ id }-controls">
              ${ builder.text.controls }
            </button>
          </h2>
          <div id="${ id }-controls" class="accordion-collapse collapse" aria-labelledby="${ id }-controls-heading" data-bs-parent="#${ id }-accordion">
            <div class="accordion-body">
              ${ checkbox( { prop: 'controls.sort', switcher: true } ) }
              ${ checkbox( { prop: 'controls.edit', switcher: true } ) }
              ${ checkbox( { prop: 'controls.delete', switcher: true } ) }
              ${ checkbox( { prop: 'controls.recycle', switcher: true, disabled: !config.controls.delete } ) }
              ${ checkbox( { prop: 'controls.answer', switcher: true } ) }
              ${ checkbox( { prop: 'controls.like', switcher: true } ) }
              ${ checkbox( { prop: 'controls.dislike', switcher: true } ) }
              ${ checkbox( { prop: 'controls.heart', switcher: true } ) }
              ${ checkbox( { prop: 'controls.report', switcher: true } ) }
            </div>
          </div>
        </div>

        <!-- Texts and Labels -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="${ id }-labels-heading">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${ id }-labels" aria-expanded="false" aria-controls="${ id }-labels">
              ${ builder.text.labels }
            </button>
          </h2>
          <div id="${ id }-labels" class="accordion-collapse collapse" aria-labelledby="${ id }-labels-heading" data-bs-parent="#${ id }-accordion">
            <div class="accordion-body">
              ${ text( 'text.comments') }
              ${ text( { prop: 'text.sort_by_date', hidden: !config.controls.sort } ) }
              ${ text( { prop: 'text.sort_by_rating', hidden: !config.controls.sort } ) }
              ${ text( { prop: 'text.picture', hidden: !config.picture } ) }
              ${ text( 'text.write_comment' ) }
              ${ text( 'text.submit' ) }
              ${ text( { prop: 'text.edit', hidden: !config.controls.edit } ) }
              ${ text( { prop: 'text.updated', hidden: !config.controls.edit } ) }
              ${ text( { prop: 'text.delete', hidden: !config.controls.delete } ) }
              ${ text( { prop: 'text.deleted', hidden: !config.controls.delete } ) }
              ${ text( { prop: 'text.recycle', hidden: !config.controls.delete || !config.controls.recycle } ) }
              ${ text( { prop: 'text.like', hidden: !config.controls.like } ) }
              ${ text( { prop: 'text.dislike', hidden: !config.controls.dislike } ) }
              ${ text( { prop: 'text.heart', hidden: !config.controls.heart } ) }
              ${ text( { prop: 'text.report', hidden: !config.controls.report } ) }
              ${ text( { prop: 'text.answer', hidden: !config.controls.answer } ) }
              ${ text( { prop: 'text.write_answer', hidden: !config.controls.answer } ) }
              ${ text( { prop: 'text.answers', hidden: !config.controls.answer } ) }
            </div>
          </div>
        </div>

      </div>
      ${ buttons() }
    </form>
    ${ modal() }
  `;

}
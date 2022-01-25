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
      <header class="d-flex justify-content-end align-items-center border-bottom px-3"></header>
      <main class="p-3">

        <!-- Sorting of Comments -->
        <div class="mb-3">
          ${ heading( 'sort' ) }
          <div class="form-check">
            <input class="form-check-input" type="radio" name="sort" value="true" id="${ id }-sort-date" ?checked=${ config.sort }>
            <label class="form-check-label" for="${ id }-sort-date" data-lang="sort_by_date">
              ${ builder.text.sort_by_date }
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="sort" value="false" id="${ id }-sort-rating" ?checked=${ !config.sort }>
            <label class="form-check-label" for="${ id }-sort-rating" data-lang="sort_by_rating">
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

        <!-- Controls -->
        <div class="lead" data-lang="controls">${ builder.text.controls }</div>
        ${ checkbox( { prop: 'controls.sort', switcher: true } ) }
        ${ checkbox( { prop: 'controls.edit', switcher: true } ) }
        ${ checkbox( { prop: 'controls.delete', switcher: true } ) }
        ${ checkbox( { prop: 'controls.recycle', switcher: true, disabled: !config.controls.delete } ) }
        ${ checkbox( { prop: 'controls.answer', switcher: true } ) }
        ${ checkbox( { prop: 'controls.like', switcher: true } ) }
        ${ checkbox( { prop: 'controls.dislike', switcher: true } ) }
        ${ checkbox( { prop: 'controls.heart', switcher: true } ) }
        ${ checkbox( { prop: 'controls.report', switcher: true } ) }

      </main>
      ${ buttons() }
    </form>
    ${ modal() }
  `;

}

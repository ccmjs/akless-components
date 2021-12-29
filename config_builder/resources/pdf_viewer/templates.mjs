/**
 * @overview HTML templates for building a PDF viewer builder
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
  const id = builder.component.name;
  use( config, builder, events, id );
  return html`
    <header class="d-flex justify-content-end align-items-center p-2 bg-dark" ?data-hidden=${ !builder.lang }></header>
    <form @submit=${ events.onSubmit }>
      <div class="accordion accordion-flush" id="${ id }-accordion">

        <!-- General Settings -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="${ id }-general-heading">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#${ id }-general" aria-expanded="true" aria-controls="${ id }-general" data-lang="general">
              ${ builder.text.general }
            </button>
          </h2>
          <div id="${ id }-general" class="accordion-collapse collapse show" aria-labelledby="${ id }-general-heading" data-bs-parent="#${ id }-accordion">
            <div class="accordion-body">
              ${ text( { prop: 'pdf', type: 'url' } ) }
              ${ checkbox( { prop: 'downloadable', switcher: true } ) }
            </div>
          </div>
        </div>

        <!-- Texts and Labels -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="${ id }-labels-heading">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${ id }-labels" aria-expanded="false" aria-controls="${ id }-labels" data-lang="labels">
              ${ builder.text.labels }
            </button>
          </h2>
          <div id="${ id }-labels" class="accordion-collapse collapse" aria-labelledby="${ id }-labels-heading" data-bs-parent="#${ id }-accordion">
            <div class="accordion-body">
              ${ text( 'text.first' ) }
              ${ text( 'text.prev' ) }
              ${ text( 'text.next' ) }
              ${ text( 'text.last' ) }
              ${ text( 'text.jump' ) }
              ${ text( { prop: 'text.download', hidden: !config.downloadable } ) }
              ${ text( 'text.protected' ) }
              ${ text( 'text.denied' ) }
            </div>
          </div>
        </div>
      </div>
      ${ buttons() }
    </form>
    ${ modal() }
  `;

}
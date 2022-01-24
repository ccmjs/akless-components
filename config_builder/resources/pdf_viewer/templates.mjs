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
    <form @submit=${ events.onSubmit }>
      <header class="d-flex justify-content-end align-items-center border-bottom px-3"></header>
      <main>
          <div class="p-3">
            ${ text( { prop: 'pdf', type: 'url' } ) }
            ${ checkbox( { prop: 'downloadable', switcher: true } ) }
          </div>
      </main>
      ${ buttons() }
    </form>
    ${ modal() }
  `;

}
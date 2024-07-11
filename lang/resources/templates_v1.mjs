/**
 * @overview HTML templates of ccmjs-based web component for multilingualism
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render } from 'https://ccmjs.github.io/akless-components/libs/lit/lit.min.js';
export { render };

/**
 * main HTML template
 * @param {Object.<string,string>} languages - selectable languages
 * @param {string} active - active language
 * @param {Function} onChange - when another language is selected
 * @example main( { de: 'German', en: 'English' }, 'en', lang => {} )
 * @returns {TemplateResult}
 */
export function main( app ) {
  return html`
    <select @change=${ event => app.switch( event.target.value ) }>
      ${ Object.keys( app.languages[app.active] ).map( lang => html`
        <option .selected=${ lang === app.active } value="${ lang.toLowerCase() }">
          ${ lang.toUpperCase() } - ${ app.languages[app.active][ lang ] }
        </option>
      ` ) }
    </select>
  `;
}
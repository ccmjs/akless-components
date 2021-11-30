/**
 * @overview HTML templates of ccmjs-based web component for vocabulary
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render } from 'https://ccmjs.github.io/akless-components/libs/lit/lit.js';
export { render };

/**
 * returns the main HTML template
 * @param {Object} data - app state data
 * @param {Object.<string,Function>} events - contains all event handlers
 * @returns {TemplateResult} main HTML template
 */
export function main( data, events ) {
  data.translations = data.translations.filter( translation => translation.toString() !== ',' );
  data.translations.push( [ '', '' ] );
  return html`
    <table class="table">
      <thead>
        <tr>
          <th scope="col">
            <input .value="${ data.languages[ 0 ] }" placeholder="Sprache eingeben..." @change=${ event => events.onChangeLanguage( event.target.value, 0 ) }>
          </th>
          <th scope="col">
            <input .value="${ data.languages[ 1 ] }" placeholder="Sprache eingeben..." @change=${ event => events.onChangeLanguage( event.target.value, 1 ) }>
          </th>
        </tr>
      </thead>
      <tbody>
        ${ data.translations.map( translation ) }
      </tbody>
    </table>
  `;

  /**
   * returns the HTML template for a row in the vocabulary table
   * @param {[string,string]} [values] - vocabulary word with translation
   * @param {number} i - vocabulary index
   * @returns {TemplateResult}
   */
  function translation( [ word, translation ], i ) {
    return html`
      <tr>
        <td>
          <input placeholder="Vokabel eingeben..." .value="${ word }" @change=${ event => events.onChangeVocabulary( event.target.value.trim(), 0, i ) }>
        </td>
        <td>
          <input placeholder="Übersetzung eingeben..." .value="${ translation }" @change=${ event => events.onChangeVocabulary( event.target.value.trim(), 1, i ) }>
        </td>
      </tr>
    `;
  }
}
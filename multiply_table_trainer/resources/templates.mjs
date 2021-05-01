/**
 * @overview HTML templates of ccmjs-based web component for multiply table training
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render, repeat } from 'https://ccmjs.github.io/akless-components/libs/lit/lit.js';
export { render };

/**
 * returns the main HTML template
 * @param {Object} instance
 * @param {number[]} operands - operands of current equation
 * @returns {TemplateResult} main HTML template
 */
export function main( instance, [ a, b ] ) {
  const results = instance.getValue().sections;
  return html`
    <div>
      <span>${ a } ${ instance.operator } ${ b }</span><span>&nbsp;= <input type="number" min="${ instance.min[ 2 ] }" max="${ instance.max[ 2 ] }"></span>
    </div>
    <div class="progress bordered rounded m-4">
      <div class="progress-bar" role="progressbar"></div>
    </div>
    <div id="points">
      ${ repeat( results, ( result, i ) => i, result => {
        if ( result === undefined )
          return html`
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-circle text-primary" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            </svg>
          `;
        else
          return html`
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-${ result ? 'success' : 'danger' }" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="8"/>
            </svg>
          `;
      } ) }
    </div>
  `;
}

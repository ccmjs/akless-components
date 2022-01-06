/**
 * @overview HTML templates of ccmjs-based web component for a flying app window
 * @author André Kless <andre.kless@web.de> 2022
 * @license The MIT License (MIT)
 */

import { html, render } from 'https://ccmjs.github.io/akless-components/libs/lit/lit.min.js';
export { render };

/**
 * main HTML template
 * @param {Object.<string,string>} text - contains static texts
 * @param {Object.<string,Function>} events - contains all event handlers
 * @returns {TemplateResult}
 */
export function main( text, events ) {
  return html`
    <header class="d-flex justify-content-between bg-light border rounded-top text-dark">
      <div class="p-1 text-nowrap">Flying App</div>
      <div class="draggable"></div>
      <nav class="px-1 d-flex align-items-center">
        <div id="lang"></div>
        <i class="bi bi-x-square" title="${ text.tooltip_close }" data-lang="tooltip_close-title" @click=${ events.onClose }></i>
      </nav>
    </header>
    <main class="border border-top-0 bg-white"></main>
  `;
}

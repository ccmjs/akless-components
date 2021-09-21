/**
 * @overview HTML templates of ccmjs-based web component for kanban board analytics
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render } from 'https://ccmjs.github.io/akless-components/libs/lit/lit.js';
export { render };

/**
 * returns the main HTML template
 * @param {Function} onReload - callback when reload icon is clicked
 * @returns {TemplateResult} main HTML template
 */
export function main( onReload ) {
  return html`
    <div id="reload" @click="${onReload}" title="Reload">↻</div>
    <section id="lanes"></section>
    <section id="members"></section>
  `;
}

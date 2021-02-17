/**
 * @overview HTML templates of ccm component for robot rally boardgames
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html } from 'https://unpkg.com/lit-html';

/**
 * returns the main HTML template
 * @returns {TemplateResult} main HTML template
 */
export function main() {
  return html`
    <section>
      <h1>DIZZY HIGHWAY</h1>
      <div id="board" class="board-13-10"></div>
    </section>
  `;
}

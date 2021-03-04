/**
 * @overview HTML templates of ccmjs-based web component for robot rally boardgames
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render } from 'https://esm.run/lit-html';
export { render };

/**
 * returns the main HTML template
 * @returns {TemplateResult} main HTML template
 */
export function main() {
  return html`
    <section>
      <div>
        <div>
          <h1>RACETRACK: DIZZY HIGHWAY</h1>
        </div>
        <div id="board" class="board-13-10"></div>
      </div>
      <div>
        <h1>ROBOT CHAT</h1>
        <div id="chat"></div>
      </div>
    </section>
  `;
}

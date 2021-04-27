/**
 * @overview HTML templates of ccmjs-based web component for log analytics
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render, repeat } from 'https://ccmjs.github.io/akless-components/libs/lit/lit.js';
export { render };

/**
 * returns the main HTML template
 * @returns {string} main HTML template
 */
export const main = `
  <div id="refresh" onclick="%%" title="Refresh">↻</div>
  <nav></nav>
`;

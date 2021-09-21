/**
 * @overview HTML templates of ccmjs-based web component for a fill-in-the-blank text
 * @author André Kless <andre.kless@web.de> 2020-2021
 */

import { html, render } from 'https://ccmjs.github.io/akless-components/libs/lit/lit.js';
export { render };

/**
 * returns the HTML template for the start button
 * @param {string} caption - caption of the button
 * @param {Function} onClick - callback when button is clicked
 * @returns {TemplateResult} HTML template for start button
 */
export function startButton( caption, onClick ) {
  return html`
    <div id="start">
      <button @click="${onClick}">${caption}</button>
    </div>
  `;
}

/**
 * returns the main HTML template
 * @param {Object} instance - fill-in-the blanks instance
 * @param {Object} keywords - predefined answers for text gaps
 * @returns {TemplateResult} main HTML template
 */
export function main( instance, keywords ) {
  return html`
    <div id="main">
      <div class="row" id="keywords" ?data-hidden=${!keywords}>
        ${keywords && keywords.map( keyword => html`
          <div class="keyword"><span @click="${event => event.target.classList.toggle( 'marked' )}">${instance.helper.escapeHTML( keyword )}</span></div>
        ` )}
      </div>
      <div class="row" id="box">
        <div id="text"></div>
        <div id="buttons"></div>
      </div>
      <div id="conclusion"></div>
    </div>
  `;
}

/**
 * returns the HTML template for an input field
 * @param {string} [value=''] - initial value
 * @param {string} [placeholder=''] - placeholder value
 * @param {number} [size=10] - size of input field
 * @param {number|string} [maxlength=''] - maximum length of solution word
 * @param {Function} onInput - callback for 'oninput' event
 * @param {Function} onChange - callback for 'onchange' event
 * @returns {TemplateResult} HTML template for input field
 */
export function inputField( value = '', placeholder = '', size = 10, maxlength = '', onInput, onChange ) {
  return html`<input type="text" size="${size}" maxlength="${maxlength}" autocorrect="off" autocapitalize="none" placeholder="${placeholder}" .value="${value}" @input="${onInput}" @change="${onChange}">`;
}

/**
 * returns the HTML template for the buttons
 * @param {Function} [onReset] - when 'Reset' button is clicked
 * @param {Function} [onFeedback] - when 'Feedback' button is clicked
 * @param {Function} [onRetry] - when 'Retry' button is clicked
 * @param {Function} [onFinish] - when 'Finish' button is clicked
 * @returns {TemplateResult} HTML template for the buttons
 */
export function buttons( instance, onReset, onFeedback, onRetry, onFinish ) {
  return html`
    <div id="reset" ?data-hidden=${!onReset}>
      <button @click="${onReset}">${instance.captions.reset}</button>
    </div>
    <div id="feedback" ?data-hidden=${!onFeedback}>
      <button @click="${onFeedback}">${instance.captions.feedback}</button>
    </div>
    <div id="retry" ?data-hidden=${!onRetry}>
      <button @click="${onRetry}">${instance.captions.retry}</button>
    </div>
    <div id="finish" ?data-hidden=${!onFinish}>
      <button @click="${onFinish}">${instance.captions.finish}</button>
    </div>
    <div id="timer" ?data-hidden=${!instance.time || ( !instance.onfinish && !instance.feedback ) || !onFinish}></div>
  `;
}

/**
 * returns the HTML template for conclusion area
 * @param {number} points - points scored
 * @param {number} [total] - maximum achievable number of points (default: hidden progress bar)
 */
export function conclusion( points, total ) {
  return html`
    <div class="${total ? 'meter' : ''}">
      <div>${points + ' / ' + total}</div>
      <span style="width: ${points / total * 100}%"></span>
    </div>
  `;
}

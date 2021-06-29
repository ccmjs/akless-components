/**
 * @overview HTML templates of ccmjs-based web component for multiple choice
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render, repeat, unsafeHTML } from 'https://ccmjs.github.io/akless-components/libs/lit/lit.js';
export { render };

/**
 * returns the HTML template for a question
 * @param {Object} instance - ccmjs-based instance for multiple choice
 * @param {Object.<string,Function>} events - contains all event handlers
 * @returns {TemplateResult} HTML template for the data table
 */
export function question( instance, events ) {
  const data = instance.getValue();
  const question = data.questions[ data.nr - 1 ];
  if ( !question ) return html``;
  return html`
    <form class="p-2">
      <div>
        <span class="badge bg-info text-dark">
          ${ instance.text.question.replace( /%nr%/g, data.nr ).replace( /%total%/g, instance.questions.length ) }
        </span>
      </div>
      <div class="my-2">
        <div class="alert alert-secondary" role="alert">
          ${ instance.escape ? question.text : unsafeHTML( question.text ) }
        </div>
      </div>
      <div class="border border-bottom-0">
        ${ repeat( question.answers, answer => answer.key, answerTemplate ) }
      </div>
      <div class="py-3">
        <button type="submit" class="btn btn-primary btn-sm" .disabled="${ question.input }" @click="${ events.onSubmit }">${ instance.text.submit }</button>
        <button type="button" class="btn btn-primary btn-sm" .disabled="${ !question.input || data.nr === instance.questions.length }" @click="${ events.onNext }">${ instance.text.next }</button>
        <button type="button" class="btn btn-primary btn-sm" .disabled="${ !question.input || data.nr !== instance.questions.length }" @click="${ events.onFinish }">${ instance.text.finish }</button>
      </div>
    </form>
  `;

  /**
   * returns the HTML template for an answer
   * @param {Object} answer - answer data
   * @param {number} i - answer index
   * @returns {TemplateResult} HTML template for the data table
   */
  function answerTemplate( answer, i ) {
    const nr = i + 1;
    return html`
      <div class="p-2 d-flex justify-content-between align-items-center border-bottom answer${ instance.feedback && question.input && ' ' + ( question.input[ i ] === '' ? 'none' : question.input[ i ] === question.solution[ i ] ? 'correct' : 'wrong' ) || '' }">
        <div class="d-flex align-items-center">
          <div class="icon">${ icon() }</div>
          <div class="mx-2">${ instance.escape ? answer.text : unsafeHTML( answer.text ) }</div>
        </div>
        <div class="ms-2">
          <div class="btn-group btn-group-sm" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" class="btn-check" name="input.${ nr - 1 }" value="true" id="answer-${ nr }-1" autocomplete="off" .disabled="${ question.input }" ?checked="${ question.input && question.input[ i ] === true }">
            <label class="btn btn-outline-success" for="answer-${ nr }-1">${ instance.text.buttons[ 0 ] }</label>
            <input type="radio" class="btn-check middle" name="input.${ nr - 1 }" value="" id="answer-${ nr }-2" autocomplete="off" .disabled="${ question.input }" ?checked="${ !question.input || question.input[ i ] === '' }">
            <label class="btn btn-outline-secondary" for="answer-${ nr }-2">${ instance.text.buttons[ 1 ] }</label>
            <input type="radio" class="btn-check" name="input.${ nr - 1 }" value="false" id="answer-${ nr }-3" autocomplete="off" .disabled="${ question.input }" ?checked="${ question.input && question.input[ i ] === false }">
            <label class="btn btn-outline-danger" for="answer-${ nr }-3">${ instance.text.buttons[ 2 ] }</label>
          </div>
        </div>
      </div>
    `;

    /**
     * returns the HTML template for the icon of the answer
     * @returns {*}
     */
    function icon() {
      if ( !instance.feedback || !question.input )
        return html`<span class="badge rounded-pill bg-primary">${ nr }</span>`;
      if ( question.input[ i ] === '' )
        return html`<svg xmlns="http://www.w3.org/2000/svg" height="24"></svg>`;
      if ( question.input[ i ] === question.solution[ i ] )
        return html`
          <svg xmlns="http://www.w3.org/2000/svg" height="24" fill="currentColor" class="bi bi-check-lg text-success" viewBox="0 0 16 16">
            <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
          </svg>
        `;
      else
        return html`
          <svg xmlns="http://www.w3.org/2000/svg" height="24" fill="currentColor" class="bi bi-x-lg text-danger" viewBox="0 0 16 16">
            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
          </svg>
        `;
    }
  }
}

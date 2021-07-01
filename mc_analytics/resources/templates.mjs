/**
 * @overview HTML templates of ccmjs-based web component for multiple choice analytics
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render, repeat } from 'https://ccmjs.github.io/akless-components/libs/lit/lit.js';
export { render };

/**
 * returns main HTML template
 * @returns {string} main HTML template
 */
export const main = `
  <div id="refresh" onclick="%%" title="%%">↻</div>
  <div id="data"></div>
`;

/**
 * returns the HTML template for the question-focused data table
 * @param {Object} instance - ccmjs-based instance for multiple choice analytics
 * @returns {TemplateResult} HTML template for question-focused data table
 */
export function table( instance ) {
  const questions = instance.toQuestions();
  return html`
    <table class="table table-hover mb-0 border-top">
      <tbody>
        ${ repeat( Object.values( questions ).filter( question => question.total ).sort( instance.sort.question ), question => question.key, question => questionTemplate( question ) ) }
      </tbody>
    </table>
    <div class="d-grid bg-info">
      <button id="points-chart" class="btn btn-info" type="button">&empty; ${ instance.text.points }</button>
    </div>
  `;

  /**
   * returns the HTML template for a question in the data table
   * @param {Object} question - question data
   * @returns {TemplateResult} HTML template for a question in the data table
   */
  function questionTemplate( question ) {
    return html`
    <tr class="bg-light question" data-key="${ question.key }">
      <th title="${ instance.text.question }">
        <div class="d-flex align-items-center">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-question-square text-primary" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
            </svg>
          </div>
          <div class="ms-2 text-wrap">${ instance.helper.cleanHTML( question.text ) }</div>
        </div>
      </th>
      <td>
        <span title="${ instance.text.diagram }">
          <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#question-chart">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-line" viewBox="0 0 16 16">
              <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z"/>
            </svg>
          </button>
        </span>
      </td>
      <td>
        <span title="${ instance.text.sum }">
          <b class="text-dark me-1 sum">∑</b>
          <span>${ question.total }</span>
        </span>
      </td>
      <td>
        <span title="${ instance.text.average }">
          <b class="text-primary me-1 average">&empty;</b>
          <span>${ Math.round( question.points.average * 10 ) / 10 }</span>
        </span>
      </td>
    </tr>
    ${ repeat( Object.values( question.answers ).sort( instance.sort.answer ), answer => answer.key, answerTemplate ) }
  `;
  }

  /**
   * returns the HTML template for an answer in the data table
   * @param {Object} answer - answer data
   * @returns {TemplateResult} HTML template for an answer in the data table
   */
  function answerTemplate( answer ) {
    return html`
    <tr class="answer" data-key="${ answer.key }">
      <td title="${ instance.text.answer }">
        <div class="d-flex align-items-center">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square text-warning" viewBox="0 0 16 16">
              <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
              <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
            </svg>
          </div>
          <div class="ms-2 text-wrap">${ instance.helper.cleanHTML( answer.text ) }</div>
        </div>
      </td>
      <td>
        <span title="${ instance.text.solution }">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-${ answer.solution ? 'success' : 'danger' }" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8"/>
          </svg>
        </span>
      </td>
      <td>
        <span title="${ instance.text.correct }">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check text-success" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
          </svg>
          <span>${ answer.correct }</span>
        </span>
      </td>
      <td>
        <span title="${ instance.text.wrong }">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x text-danger" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
          <span>${ answer.wrong }</span>
        </span>
      </td>
    </tr>
  `;
  }

}

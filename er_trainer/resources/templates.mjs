/**
 * @overview HTML templates of ccmjs-based web component for ER model training
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render } from 'https://esm.run/lit-html';
export { render };

/**
 * returns the main HTML template
 * @param {Object} app - app instance
 * @param {Object} data - app state data
 * @param {number} nr - number of current phrase
 * @returns {TemplateResult} main HTML template
 */
export function main( app, data, nr ) {
  let { entity = app.default.entity, format = app.default.format, path = app.default.path + data.notation + '/', relation = app.default.relation, swap } = app.notations[ data.notation ];
  const phrase = app.phrases[ nr - 1 ];
  const state = data.sections[ nr - 1 ];
  return html`
    <h1 class="mx-3">${app.title}</h1>
    <header class="bg-light border rounded-top d-flex flex-wrap justify-content-between align-items-center p-2">
      <div class="p-2 pr-3">${app.text.heading}</div>
      <div class="d-flex align-items-center text-nowrap px-2">
        <div>
          <div class="d-flex align-items-center">
            <label for="notation-input" class="m-0 text-nowrap"><b>${app.text.label}</b></label>
            <select id="notation-input" class="form-control ml-2">
              ${Object.values(app.notations).map(({key,title})=>html`<option value="${key}">${title}</option>`)}
            </select>
          </div>
        </div>
        <div class="ml-2">
          <button class="btn btn-link">${app.text.legend}</button>
        </div>
      </div>
    </header>
    <main class="border rounded-bottom border-top-0 d-flex justify-content-center px-4 py-2">
      <div>
        <div class="lead text-nowrap px-2 py-3">
          <b>${app.ccm.helper.html(app.text.phrase,nr.toString())}</b>
          <span class="text-wrap">${phrase.text}</span>
        </div>
        <div class="px-2 py-3">
          <div class="d-flex justify-content-between lead">
            <div>${app.text.entity1}</div>
            <div>${app.text.entity2}</div>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="border rounded p-3">
              ${phrase.relationship[0]}
            </div>
            <div>
              <img src="${path+(state?state.input[swap?1:0]:entity)+'.'+format}">
            </div>
            <div class="relation">
              <img src="${path+relation+'.'+format}">
              ${phrase.relationship[1]}
            </div>
            <div>
              <img src="${path+(state?state.input[swap?0:1]:entity)+'.'+format}">
            </div>
            <div class="border rounded p-3">
              ${phrase.relationship[2]}
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center px-2 py-3">
          <div class="d-flex align-items-center">
            <label for="input1" class="m-0 text-nowrap"><b>${app.text.input1}</b></label>
            <select id="input1" class="form-control ml-2">
              ${app.text.selection.map(caption=>html`<option value="${caption}">${caption}</option>`)}
            </select>
          </div>
          <div class="d-flex align-items-center">
            <label for="input2" class="m-0 text-nowrap"><b>${app.text.input2}</b></label>
            <select id="input2" class="form-control ml-2">
              ${app.text.selection.map(caption=>html`<option value="${caption}">${caption}</option>`)}
            </select>
          </div>
        </div>
        <div class="d-flex justify-content-center flex-wrap px-2 py-3">
          <button class="btn btn-outline-danger m-1">${app.text.abort}</button>
          <button class="btn btn-primary m-1">${app.text.submit}</button>
          <button class="btn btn-secondary m-1">${app.text.next}</button>
          <button class="btn btn-success m-1">${app.text.finish}</button>
        </div>
        <div class="text-center px-2 pb-2">
          <small id="current_state">${app.ccm.helper.html(app.text.current_state,data.correct.toString(),data.total.toString())}</small>
        </div>
      </div>
    </main>
  `;
}

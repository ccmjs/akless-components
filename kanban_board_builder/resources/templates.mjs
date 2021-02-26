/**
 * @overview HTML templates of ccmjs-based web component for building a kanban board
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render } from 'https://esm.run/lit-html';
export { render };

/**
 * returns the main HTML template
 * @param {Object} config - initial app configuration
 * @param {Object} builder - app builder instance
 * @returns {TemplateResult} main HTML template
 */
export function main( config, builder ) {
  return html`
    <form>

      <!-- Lanes -->
      <div class="form-group">
        <label for="kbb-lanes">Lanes</label>
        <span type="button" data-toggle="collapse" data-target="#kbb-info-lanes" aria-expanded="false" aria-controls="kbb-info-lanes">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
        </span>
        <div class="collapse" id="kbb-info-lanes">
          <div class="bg-info text-light rounded p-2">
            Title of the lanes between which Kanban cards can be moved.
          </div>
        </div>
        <select multiple name="lanes" id="kbb-lanes"></select>
      </div>

      <!-- Members -->
      <div class="form-group">
        <label for="kbb-members">Members</label>
        <span type="button" data-toggle="collapse" data-target="#kbb-info-members" aria-expanded="false" aria-controls="kbb-info-members">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
        </span>
        <div class="collapse" id="kbb-info-members">
          <div class="bg-info text-light rounded p-2">
            A kanban card can be assigned to a person. Here you can specify for new cards which people are available. Mostly these are the names of the team members.
          </div>
        </div>
        <select multiple name="members" id="kbb-members"></select>
      </div>

      <!-- Priorities -->
      <div class="form-group">
        <label for="kbb-priorities">Priorities</label>
        <span type="button" data-toggle="collapse" data-target="#kbb-info-priorities" aria-expanded="false" aria-controls="kbb-info-priorities">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
        </span>
        <div class="collapse" id="kbb-info-priorities">
          <div class="bg-info text-light rounded p-2">
            A priority can be set for a card. Here you can determine which priorities in new cards are available.
          </div>
        </div>
        <select multiple name="priorities" id="kbb-priorities"></select>
      </div>

      <!-- Card Layout -->
      <div class="form-group">
        <label for="kbb-layout">Card Layout</label>
        <span type="button" data-toggle="collapse" data-target="#kbb-info-layout" aria-expanded="false" aria-controls="kbb-info-layout">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
        </span>
        <div class="collapse" id="kbb-info-layout">
          <div class="bg-info text-light rounded p-2">
            You can choose between different layouts for new kanban cards.
          </div>
        </div>
        <div>
          ${ Object.values( builder.ignore.layout ).map( obj => html`
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="layout" id="kbb-layout-${obj.key}" value="${obj.key}" ?checked=${JSON.stringify(config.ignore.card.config.css||[]).includes(obj.key)}>
              <label class="form-check-label" for="kbb-layout-${obj.key}">${obj.title}</label>
            </div>
          ` ) }
        </div>
      </div>
      
      <!-- Preview Button -->
      <button type="button" class="btn btn-info" data-toggle="modal" data-target="#kbb-preview" ?data-hidden=${!builder.preview}>${builder.preview}</button>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary" ?data-hidden=${!builder.onfinish || !builder.submit}>${builder.submit}</button>
    </form>
    
    <!-- Modal: Preview -->
    <div class="modal fade" id="kbb-preview" tabindex="-1" aria-labelledby="App Preview" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
  
          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title">App Preview</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
  
          <!-- Modal Body -->
          <div id="kbb-preview-body" class="modal-body p-0">
            <div class="d-flex justify-content-center align-items-center spinner">
              <div class="spinner-border text-success" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

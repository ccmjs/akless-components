/**
 * @overview HTML templates of ccmjs-based web component for building a chat
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
  const toolbar = JSON.stringify( config.editor[ 2 ].settings.modules.toolbar ) || '';
  return html`
    <form>

      <!-- Layout
      <div class="form-group">
        <label for="cb-css">Layout</label>
        <span type="button" data-toggle="collapse" data-target="#cb-info-css" aria-expanded="false" aria-controls="cb-info-css">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
        </span>
        <div class="collapse" id="cb-info-css">
          <div class="bg-info text-light rounded p-2">
            Choose the layout for your chat. Click the preview button below to see how it looks.
          </div>
        </div>
        <select class="form-control" name="css" id="cb-css">
          ${ Object.values( builder.ignore.css ).map( obj => html`<option value="${obj.key}" ?selected=${JSON.stringify(config.css) === JSON.stringify(obj.value)}>${obj.title}</option>` )}
        </select>
      </div>
      -->

      <!-- User Authentication -->
      <div class="form-group">
        <label for="cb-user">User Authentication</label>
        <span type="button" data-toggle="collapse" data-target="#cb-info-user" aria-expanded="false" aria-controls="cb-info-user">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
        </span>
        <div class="collapse" id="cb-info-user">
          <div class="bg-info text-light rounded p-2">
            Select here how a user must authenticate in order to be able to write messages in the chat.
            <ul class="m-0 pl-4">
              <li><b>Guest Mode:</b> The user can authenticate with any username and without a password.</li>
              <li><b>Digital Makerspace Account:</b> The user must log in with a Digital Makerspace account.</li>
              <li><b>H-BRS FB02 Account:</b> The user has to authenticate with a account from the Department of Computer Sciences at Hochschule Bonn-Rhein-Sieg University of Applied Sciences.</li>
              <li><b>H-BRS FB02 Account with Pseudonym:</b> The same as the previous option, but the username is replaced with a pseudonym.</li>
              <li><b>One-time Pseudonym:</b> The user is automatically logged in with a one-time pseudonym. Each login returns a different pseudonym.</li>
            </ul>
          </div>
        </div>
        <select class="form-control" name="user" id="cb-user">
          ${ Object.values( builder.ignore.user ).map( obj => html`<option value="${obj.key}" ?selected=${JSON.stringify(config.user) === JSON.stringify(obj.value)}>${obj.title}</option>` )}
        </select>
      </div>

      <!-- Formatting Options -->
      <div class="form-group">
        <label for="cb-toolbar">Formatting Options</label>
        <span type="button" data-toggle="collapse" data-target="#cb-info-toolbar" aria-expanded="false" aria-controls="cb-info-toolbar">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
        </span>
        <div class="collapse" id="cb-info-toolbar">
          <div class="bg-info text-light rounded p-2">
            Select the formatting options that users have when writing a new message.
          </div>
        </div>
        <div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="cb-bold" name="toolbar.bold" ?checked=${toolbar.includes('bold')}>
            <label class="form-check-label" for="cb-bold">Bold</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="cb-italic" name="toolbar.italic" ?checked=${toolbar.includes('italic')}>
            <label class="form-check-label" for="cb-italic">Italic</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="cb-strike" name="toolbar.strike" ?checked=${toolbar.includes('strike')}>
            <label class="form-check-label" for="cb-strike">Strike</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="cb-link" name="toolbar.link" ?checked=${toolbar.includes('link')}>
            <label class="form-check-label" for="cb-link">Link</label>
          </div>
        </div>
      </div>

      <!-- Language -->
      <div class="form-group">
        <label for="cb-language">Language</label>
        <span type="button" data-toggle="collapse" data-target="#cb-info-language" aria-expanded="false" aria-controls="cb-info-language">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
        </span>
        <div class="collapse" id="cb-info-language">
          <div class="bg-info text-light rounded p-2">
            Defines the language in which buttons and time stamps are displayed.
            In the case of multilingualism, you can switch between languages in the app.
          </div>
        </div>
        <div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="language" id="cb-language-en" value="en" ?checked=${config.hide_lang && config.lang[ 2 ].active === 'en'}>
            <label class="form-check-label" for="cb-language-en">English</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="language" id="cb-language-de" value="de" ?checked=${config.hide_lang && config.lang[ 2 ].active === 'de'}>
            <label class="form-check-label" for="cb-language-de">German</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="language" id="cb-language-lang" value="lang" ?checked=${!config.hide_lang}>
            <label class="form-check-label" for="cb-language-lang">Multilingual</label>
          </div>
        </div>
      </div>

      <!-- Preview Button -->
      <button type="button" class="btn btn-info" data-toggle="modal" data-target="#cb-preview" ?data-hidden=${!builder.preview}>${builder.preview}</button>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary" ?data-hidden=${!builder.onfinish || !builder.submit}>${builder.submit}</button>
    </form>
    
    <!-- Modal: Preview -->
    <div class="modal fade" id="cb-preview" tabindex="-1" aria-labelledby="App Preview" aria-hidden="true">
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
          <div id="cb-preview-body" class="modal-body p-0">
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

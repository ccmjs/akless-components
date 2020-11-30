/**
 * @overview HTML templates of ccm component for building a fill-in-the-blank text
 * @author André Kless <andre.kless@web.de> 2020
 */

import { html } from 'https://unpkg.com/lit-html';

/**
 * returns the main HTML template
 * @param {Object} config - initial app configuration
 * @param {Object} builder - app builder instance
 * @returns {TemplateResult} main HTML template
 */
export function main( config, builder ) {
  return html`
    <form>
      <div class="accordion" id="cb-accordion">

        <!-- Text Editor -->
        <div class="card">
          <div class="card-header p-1" id="cb-editor-heading">
            <h2 class="mb-0">
              <button class="btn btn-lg btn-block text-left" type="button" data-toggle="collapse" data-target="#cb-editor-collapse" aria-expanded="true" aria-controls="cb-editor-collapse">
                Text Editor
              </button>
            </h2>
          </div>
          <div id="cb-editor-collapse" class="collapse show" aria-labelledby="cb-editor-heading" data-parent="#cb-accordion">
            <div class="card-body">
              <div id="editor"></div>
            </div>
          </div>
        </div>

        <!-- General Settings -->
        <div class="card">
          <div class="card-header p-1" id="cb-general-heading">
            <h2 class="mb-0">
              <button class="btn btn-lg btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#cb-general-collapse" aria-expanded="false" aria-controls="cb-general-collapse">
                General Settings
              </button>
            </h2>
          </div>
          <div id="cb-general-collapse" class="collapse" aria-labelledby="cb-general-heading" data-parent="#cb-accordion">
            <div class="card-body">

              <!-- Blank Gaps -->
              <div class="form-group">
                <input type="checkbox" name="blank" id="cb-blank" ?checked=${config.blank}>
                <label class="form-check-label pl-1" for="cb-blank">
                  Blank Gaps
                </label>
              </div>

              <!-- Provided Answers -->
              <div class="form-group">
                <label for="cb-keywords">Provided Answers</label>
                <select class="form-control" name="keywords" id="cb-keywords">
                  <option value="" ?selected=${!config.keywords}>None</option>
                  <option value="true" ?selected=${config.keywords === true}>Auto generated</option>
                  <option value="manually" ?selected=${Array.isArray( config.keywords )}>Manually</option>
                </select>
                <div ?hidden=${!Array.isArray( config.keywords )}>
                  <select multiple name="tags" id="cb-tags"></select>
                </div>
              </div>

              <!-- Character for Marking a Text Gap -->
              <div class="form-group">
                <label for="cb-mark-btn">Character for Marking a Text Gap</label>
                <input type="text" name="mark" maxlength="1" class="form-control" id="cb-mark-btn" value="${config.mark}" required>
              </div>

              <!-- Time Limit -->
              <div class="form-group">
                <label for="cb-time">Time Limit</label>
                <input type="number" min="0" placeholder="in seconds, default: no limit" name="time" class="form-control" id="cb-time" value="${config.time}">
              </div>

              <!-- Start Button -->
              <div class="form-group">
                <input type="checkbox" name="start_button" id="cb-start" ?checked=${config.start_button}>
                <label class="form-check-label pl-1" for="cb-start">
                  Start Button
                </label>
              </div>

              <!-- Caption of Start Button -->
              <div class="form-group" ?hidden=${!config.start_button}>
                <label for="cb-start-btn">Caption of Start Button</label>
                <input type="text" name="captions.start" class="form-control" id="cb-start-btn" value="${config.captions.start}">
              </div>

              <!-- Reset Button -->
              <div class="form-group">
                <input type="checkbox" name="reset" id="cb-reset" ?checked=${config.onreset !== false}>
                <label class="form-check-label pl-1" for="cb-reset">
                  Reset Button
                </label>
              </div>

              <!-- Caption of Reset Button -->
              <div class="form-group" ?hidden=${config.onreset === false}>
                <label for="cb-reset-btn">Caption of Reset Button</label>
                <input type="text" name="captions.reset" class="form-control" id="cb-reset-btn" value="${config.captions.reset}">
              </div>
            </div>
          </div>
        </div>

        <!-- Visual Feedback -->
        <div class="card">
          <div class="card-header p-1" id="cb-feedback-heading">
            <h2 class="mb-0">
              <button class="btn btn-lg btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#cb-feedback-collapse" aria-expanded="false" aria-controls="cb-feedback-collapse">
                Visual Feedback
              </button>
            </h2>
          </div>
          <div id="cb-feedback-collapse" class="collapse" aria-labelledby="cb-feedback-heading" data-parent="#cb-accordion">
            <div class="card-body">

              <!-- Enable Feedback -->
              <div class="form-group">
                <input type="checkbox" name="feedback" id="cb-feedback" ?checked=${config.feedback}>
                <label class="form-check-label pl-1" for="cb-feedback">
                  Enable Feedback
                </label>
              </div>

              <!-- Caption of Feedback Button -->
              <div class="form-group" ?hidden=${!config.feedback}>
                <label for="cb-feedback-btn">Caption of Feedback Button</label>
                <input type="text" name="captions.feedback" class="form-control" id="cb-feedback-btn" value="${config.captions.feedback}">
              </div>

              <!-- Allow Retry -->
              <div class="form-group" ?hidden=${!config.feedback}>
                <input type="checkbox" name="retry" id="cb-retry" ?checked=${config.retry}>
                <label class="form-check-label pl-1" for="cb-retry">
                  Allow Retry
                </label>
              </div>

              <!-- Caption of Retry Button -->
              <div class="form-group" ?hidden=${!config.feedback || !config.retry}>
                <label for="cb-retry-btn">Caption of Retry Button</label>
                <input type="text" name="captions.retry" class="form-control" id="cb-retry-btn" value="${config.captions.retry}">
              </div>

              <!-- Show Solutions -->
              <div class="form-group" ?hidden=${!config.feedback}>
                <input type="checkbox" name="solutions" id="cb-solutions" ?checked=${config.solutions}>
                <label class="form-check-label pl-1" for="cb-solutions">
                  Show Solutions
                </label>
              </div>
              
              <!-- Show Progress Bar -->
              <div class="form-group" ?hidden=${!config.feedback}>
                <input type="checkbox" name="progress_bar" id="cb-progress-bar" ?checked=${config.progress_bar}>
                <label class="form-check-label pl-1" for="cb-progress-bar">
                  Show Progress Bar
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Finish Actions -->
        <div class="card">
          <div class="card-header p-1" id="cb-finish-heading">
            <h2 class="mb-0">
              <button class="btn btn-lg btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#cb-finish-collapse" aria-expanded="false" aria-controls="cb-finish-collapse">
                Finish Actions
              </button>
            </h2>
          </div>
          <div id="cb-finish-collapse" class="collapse" aria-labelledby="cb-finish-heading" data-parent="#cb-accordion">
            <div class="card-body">

              <!-- Enable Finish Actions -->
              <div class="form-group">
                <input type="checkbox" name="finish" id="cb-finish" ?checked=${config.onfinish}>
                <label class="form-check-label pl-1" for="cb-finish">
                  Enable Finish Actions
                </label>
              </div>

              <!-- Caption of Finish Button -->
              <div class="form-group" ?hidden=${!config.onfinish}>
                <label for="cb-finish-btn">Caption of Finish Button</label>
                <input type="text" name="captions.finish" class="form-control" id="cb-finish-btn" value="${config.captions.finish}">
              </div>

              <!-- Confirmation Dialog -->
              <div class="form-group" ?hidden=${!config.onfinish}>
                <label for="cb-confirm">Confirmation Dialog</label>
                <input type="text" name="onfinish.confirm" placeholder="optional" class="form-control" id="cb-confirm" value="${config.onfinish && config.onfinish.confirm || ''}">
              </div>

              <!-- Save submitted Solutions -->
              <div class="form-group" ?hidden=${!config.onfinish}>
                <label for="cb-store">Save submitted Solutions</label>
                <select class="form-control" name="store" id="cb-store">
                  <option value="" ?selected=${config.onfinish && !config.onfinish.store}>None</option>
                  <option value="collective" ?selected=${config.onfinish && config.onfinish.store === true && !config.onfinish.store.user}>Collective Solution</option>
                  <option value="user" ?selected=${config.onfinish && config.onfinish.store === true && config.data.user}>User Specific</option>
                  <option value="unique" ?selected=${config.onfinish && builder.ccm.helper.isObject( config.onfinish.store ) && !config.onfinish.store.unique}>User Specific without Modify</option>
                </select>
              </div>

              <!-- User Authentication -->
              <div class="form-group" ?hidden=${!config.onfinish || !config.onfinish.store || ( !config.data || !config.data.user ) && ( !builder.ccm.helper.isObject( config.onfinish.store ) || !config.onfinish.store.user )}>
                <label for="cb-user">User Authentication</label>
                <select class="form-control" name="user" id="cb-user">
                  <option value="guest">Guest Mode</option>
                  <option value="cloud">DMS Account</option>
                  <option value="hbrsinfkaul">H-BRS FB02 Account</option>
                  <option value="hbrsinfpseudo">H-BRS FB02 Account with Pseudonym</option>
                  <option value="pseudo">One-time Pseudonym</option>
                </select>
              </div>

              <!-- Success Message -->
              <div class="form-group" ?hidden=${!config.onfinish || !config.onfinish.store || ( !config.data || !config.data.user ) && ( !builder.ccm.helper.isObject( config.onfinish.store ) || !config.onfinish.store.user )}>
                <label for="cb-success">Success Message</label>
                <input type="text" name="onfinish.alert" placeholder="optional" class="form-control" id="cb-success" value="${config.onfinish && config.onfinish.alert || ''}">
              </div>

              <!-- Next Content -->
              <div class="form-group" ?hidden=${!config.onfinish}>
                <label for="cb-render">Next Content</label>
                <select class="form-control" name="render" id="cb-render">
                  <option value="clear" ?selected=${config.onfinish && ( config.onfinish.clear || !config.onfinish.restart && !config.onfinish.render )}>Clear Content</option>
                  <option value="restart" ?selected=${config.onfinish && config.onfinish.restart}>Restart App</option>
                  <option value="app" ?selected=${config.onfinish && config.onfinish.render}>Show other App</option>
                </select>
              </div>

              <!-- Embed Code of the App -->
              <div class="form-group" ?hidden=${!config.onfinish || !config.onfinish.render}>
                <label for="cb-app">Embed Code of App</label>
                <input type="text" name="app" class="form-control" id="cb-app">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Preview Button -->
      <button type="button" class="btn btn-info btn-block mt-0" data-toggle="modal" data-target="#cb-preview" ?data-hidden=${!builder.preview}>${builder.preview}</button>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary btn-block mt-0" ?data-hidden=${!builder.onfinish || !builder.submit}>${builder.submit}</button>
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

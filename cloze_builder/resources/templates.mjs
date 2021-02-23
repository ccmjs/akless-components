/**
 * @overview HTML templates of ccm component for building a fill-in-the-blank text
 * @author André Kless <andre.kless@web.de> 2020-2021
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
      <div class="accordion" id="cb-accordion">

        <!-- Gap Text -->
        <div class="card">
          <div class="card-header p-1" id="cb-editor-heading">
            <h2 class="mb-0">
              <button class="btn btn-lg btn-block text-left" type="button" data-toggle="collapse" data-target="#cb-editor-collapse" aria-expanded="true" aria-controls="cb-editor-collapse">
                Gap Text
              </button>
            </h2>
          </div>
          <div id="cb-editor-collapse" class="collapse show" aria-labelledby="cb-editor-heading" data-parent="#cb-accordion">
            <div class="card-body">
              <span type="button" data-toggle="collapse" data-target="#cb-info-text" aria-expanded="false" aria-controls="cb-info-text">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
              </span>
              <div class="collapse" id="cb-info-text">
                <div class="bg-info text-light rounded p-2">
                  Blanks are added with an asterix (*) in front and behind the correct word/phrase.
                  Alternative answers are separated with a forward slash (/), e.g. “Hello, *World/Earth*!”.
                  If you would like to show only certain letters of the solution word, put these letters into round brackets within the asterixs.
                  In the following example, the three letters “o, r, d” of the solution word are already given in the text gap: “Hello, *W(or)l(d)*!”.
                </div>
              </div>
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
                <span type="button" data-toggle="collapse" data-target="#cb-info-blank" aria-expanded="false" aria-controls="cb-info-blank">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-blank">
                  <div class="bg-info text-light rounded p-2">
                    The length of the gaps can be displayed in a standard-length format or according to the number of characters of each word.
                    If Blank Gaps is selected, no characters of the gap will be displayed.
                  </div>
                </div>
              </div>

              <!-- Layout -->
              <div class="form-group">
                <label for="cb-css">Layout</label>
                <span type="button" data-toggle="collapse" data-target="#cb-info-css" aria-expanded="false" aria-controls="cb-info-css">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-css">
                  <div class="bg-info text-light rounded p-2">
                    Choose between a layout format for your fill-in-the-blank exercise.
                  </div>
                </div>
                <select class="form-control" name="css" id="cb-css">
                  ${ Object.values( builder.ignore.css ).map( obj => html`<option value="${obj.key}" ?selected=${JSON.stringify(config.css) === JSON.stringify(obj.value)}>${obj.title}</option>` )}
                </select>
              </div>

              <!-- Provided Answers -->
              <div class="form-group">
                <label for="cb-keywords">Provided Answers</label>
                <span type="button" data-toggle="collapse" data-target="#cb-info-keywords" aria-expanded="false" aria-controls="cb-info-keywords">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-keywords">
                  <div class="bg-info text-light rounded p-2">
                    Select whether the solution i.e. the words for the fill-in-the-blanks are already provided or if the users should enter the missing words.
                    A list can be generated automatically or manually.
                  </div>
                </div>
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
                <span type="button" data-toggle="collapse" data-target="#cb-info-mark" aria-expanded="false" aria-controls="cb-info-mark">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-mark">
                  <div class="bg-info text-light rounded p-2">
                    Select which character should be used to mark gaps in the text.
                  </div>
                </div>
                <input type="text" name="mark" maxlength="1" class="form-control" id="cb-mark-btn" value="${config.mark}" required>
              </div>

              <!-- Time Limit -->
              <div class="form-group">
                <label for="cb-time">Time Limit</label>
                <span type="button" data-toggle="collapse" data-target="#cb-info-time" aria-expanded="false" aria-controls="cb-info-time">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-time">
                  <div class="bg-info text-light rounded p-2">
                    Specify the number of seconds available to solve the fill-in-the-blank exercise.
                    The remaining number of seconds is then displayed visually.
                    When the time is up, the exercise is submitted automatically.
                    If you do not specify a time limit, no time limit is set.
                  </div>
                </div>
                <input type="number" min="0" placeholder="in seconds, default: no limit" name="time" class="form-control" id="cb-time" value="${config.time}">
              </div>

              <!-- Start Button -->
              <div class="form-group">
                <input type="checkbox" name="start_button" id="cb-start" ?checked=${config.start_button}>
                <label class="form-check-label pl-1" for="cb-start">
                  Start Button
                </label>
                <span type="button" data-toggle="collapse" data-target="#cb-info-start_button" aria-expanded="false" aria-controls="cb-info-start_button">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-start_button">
                  <div class="bg-info text-light rounded p-2">
                    If you select this option, the fill-in-the-blank exercise is only displayed after clicking the start button.
                    If this option is enabled, the caption of the start button can be adjusted via the lower input field.
                  </div>
                </div>
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
                <span type="button" data-toggle="collapse" data-target="#cb-info-reset" aria-expanded="false" aria-controls="cb-info-reset">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-reset">
                  <div class="bg-info text-light rounded p-2">
                    If you select this option, the fill-in-the-blank exercise can be reset with a reset button.
                    If this option is enabled, the caption of the reset button can be adjusted via the lower input field.
                  </div>
                </div>
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
                <span type="button" data-toggle="collapse" data-target="#cb-info-feedback" aria-expanded="false" aria-controls="cb-info-feedback">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-feedback">
                  <div class="bg-info text-light rounded p-2">
                    If enabled, there is a feedback button that provides direct feedback on the correctness of the user input.
                    If this option is enabled, the caption of the feedback button can be adjusted via the lower input field.
                  </div>
                </div>
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
                <span type="button" data-toggle="collapse" data-target="#cb-info-retry" aria-expanded="false" aria-controls="cb-info-retry">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-retry">
                  <div class="bg-info text-light rounded p-2">
                    If enabled, the user inputs can be corrected after a feedback via a retry button.
                    If this option is enabled, the caption of the retry button can be adjusted via the lower input field.
                  </div>
                </div>
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
                <span type="button" data-toggle="collapse" data-target="#cb-info-solutions" aria-expanded="false" aria-controls="cb-info-solutions">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-solutions">
                  <div class="bg-info text-light rounded p-2">
                    If activated, the feedback will reveal the correct solutions.
                  </div>
                </div>
              </div>
              
              <!-- Show Progress Bar -->
              <div class="form-group" ?hidden=${!config.feedback}>
                <input type="checkbox" name="progress_bar" id="cb-progress-bar" ?checked=${config.progress_bar}>
                <label class="form-check-label pl-1" for="cb-progress-bar">
                  Show Progress Bar
                </label>
                <span type="button" data-toggle="collapse" data-target="#cb-info-progress_bar" aria-expanded="false" aria-controls="cb-info-progress_bar">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-progress_bar">
                  <div class="bg-info text-light rounded p-2">
                    If enabled, the achieved result is also displayed as a progress bar during feedback.
                  </div>
                </div>
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
                <span type="button" data-toggle="collapse" data-target="#cb-info-finish" aria-expanded="false" aria-controls="cb-info-finish">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-finish">
                  <div class="bg-info text-light rounded p-2">
                    If enabled, there is a finish button for which individual actions such as saving solutions and displaying another app can be set.
                    If this option is enabled, the caption of the finish button can be adjusted via the lower input field.
                  </div>
                </div>
              </div>

              <!-- Caption of Finish Button -->
              <div class="form-group" ?hidden=${!config.onfinish}>
                <label for="cb-finish-btn">Caption of Finish Button</label>
                <input type="text" name="captions.finish" class="form-control" id="cb-finish-btn" value="${config.captions.finish}">
              </div>

              <!-- Save submitted Solutions -->
              <div class="form-group" ?hidden=${!config.onfinish}>
                <label for="cb-store">Save submitted Solutions</label>
                <span type="button" data-toggle="collapse" data-target="#cb-info-store" aria-expanded="false" aria-controls="cb-info-store">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-store">
                  <div class="bg-info text-light rounded p-2">
                    The results are stored on the server of the computer science department of the Bonn-Rhein-Sieg University of Applied Sciences.
                    <ul class="m-0 pl-4">
                      <li><b>Collective Solution:</b> Everyone is working on a common solution. When the app is started, the last submitted solution is restored.</li>
                      <li><b>User Specific:</b> Each user has their own solution that is restored when the app starts. Anyone can correct their submitted solution afterwards. A user must log in to submit a solution.</li>
                      <li><b>User Specific without Override:</b> The same as the previous option, except that each submitted solution is saved separately. Previously submitted solutions will not be overwritten. A user must log in to submit a solution.</li>
                    </ul>
                  </div>
                </div>
                <select class="form-control" name="store" id="cb-store">
                  <option value="" ?selected=${config.onfinish && !config.onfinish.store}>None</option>
                  <option value="collective" ?selected=${config.onfinish && config.onfinish.store === true && !config.onfinish.store.user}>Collective Solution</option>
                  <option value="user" ?selected=${config.onfinish && config.onfinish.store === true && config.data.user}>User Specific</option>
                  <option value="unique" ?selected=${config.onfinish && builder.ccm.helper.isObject( config.onfinish.store ) && config.onfinish.store.unique}>User Specific without Override</option>
                </select>
              </div>

              <!-- User Authentication -->
              <div class="form-group" ?hidden=${!config.onfinish || !config.onfinish.store || ( !config.data || !config.data.user ) && ( !builder.ccm.helper.isObject( config.onfinish.store ) || !config.onfinish.store.user )}>
                <label for="cb-user">User Authentication</label>
                <span type="button" data-toggle="collapse" data-target="#cb-info-user" aria-expanded="false" aria-controls="cb-info-user">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-user">
                  <div class="bg-info text-light rounded p-2">
                    Choose here how a user has to authenticate when submitting a solution.
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

              <!-- Confirmation Dialog -->
              <div class="form-group" ?hidden=${!config.onfinish || !config.onfinish.store}>
                <label for="cb-confirm">Confirmation Dialog</label>
                <span type="button" data-toggle="collapse" data-target="#cb-info-confirm" aria-expanded="false" aria-controls="cb-info-confirm">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-confirm">
                  <div class="bg-info text-light rounded p-2">
                    If active, the user must explicitly confirm before saving a solution.
                    To activate this, specify the text that will be displayed to the user in the confirm dialog.
                  </div>
                </div>
                <input type="text" name="onfinish.confirm" placeholder="optional" class="form-control" id="cb-confirm" value="${config.onfinish && config.onfinish.confirm || ''}">
              </div>

              <!-- Success Message -->
              <div class="form-group" ?hidden=${!config.onfinish || !config.onfinish.store}>
                <label for="cb-success">Success Message</label>
                <span type="button" data-toggle="collapse" data-target="#cb-info-alert" aria-expanded="false" aria-controls="cb-info-alert">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-alert">
                  <div class="bg-info text-light rounded p-2">
                    Here you can specify a message that will be displayed to the user when the submitted solution has been saved successfully.
                  </div>
                </div>
                <input type="text" name="onfinish.alert" placeholder="optional" class="form-control" id="cb-success" value="${config.onfinish && config.onfinish.alert || ''}">
              </div>

              <!-- Next Content -->
              <div class="form-group" ?hidden=${!config.onfinish}>
                <label for="cb-render">Next Content</label>
                <span type="button" data-toggle="collapse" data-target="#cb-info-render" aria-expanded="false" aria-controls="cb-info-render">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-render">
                  <div class="bg-info text-light rounded p-2">
                    Specify which content should be displayed next after a solution has been submitted.
                  </div>
                </div>
                <select class="form-control" name="render" id="cb-render">
                  <option value="clear" ?selected=${config.onfinish && ( config.onfinish.clear || !config.onfinish.restart && !config.onfinish.render )}>Clear Content</option>
                  <option value="restart" ?selected=${config.onfinish && config.onfinish.restart}>Restart App</option>
                  <option value="app" ?selected=${config.onfinish && config.onfinish.render}>Show other App</option>
                </select>
              </div>

              <!-- Embed Code of the App -->
              <div class="form-group" ?hidden=${!config.onfinish || !config.onfinish.render}>
                <label for="cb-app">Embed Code of App</label>
                <span type="button" data-toggle="collapse" data-target="#cb-info-app" aria-expanded="false" aria-controls="cb-info-app">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-app">
                  <div class="bg-info text-light rounded p-2">
                    Enter the embed code of the app that should be displayed after submitting a solution.
                    The app must be an app created in the Digital Makerspace.
                  </div>
                </div>
                <input type="text" name="app" class="form-control" id="cb-app" value="${config.onfinish && config.onfinish.render && config.onfinish.render.component && builder.helper.embedCode( config.onfinish.render.component, config.onfinish.render.config ) || ''}">
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

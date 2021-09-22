/**
 * @overview HTML templates for building a PDF viewer builder
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render, unsafeHTML } from 'https://ccmjs.github.io/akless-components/libs/lit/lit.js';
export { render };

/**
 * returns the main HTML template
 * @param {Object} config - initial app configuration
 * @param {Object} builder - app builder instance
 * @param {Object.<string,Function>} events - contains all event handlers
 * @returns {TemplateResult} main HTML template
 */
export function main( config, builder, events ) {
  return html`
    <form @submit=${ events.onSubmit }>
      <div class="accordion accordion-flush" id="pvb-accordion">

        <!-- General Settings -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="pvb-general-heading">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#pvb-general" aria-expanded="true" aria-controls="pvb-general">
              ${ builder.text.general }
            </button>
          </h2>
          <div id="pvb-general" class="accordion-collapse collapse show" aria-labelledby="pvb-general-heading" data-bs-parent="#pvb-accordion">
            <div class="accordion-body">

              <!-- PDF URL -->
              <div class="mb-3">
                <div class="heading">
                  <label for="pvb-pdf" class="form-label">
                    ${ builder.text.pdf }
                  </label>
                  <button class="btn btn-inline btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#pvb-pdf-info" aria-expanded="false" aria-controls="pvb-pdf-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-info-circle-fill text-info" viewBox="0 0 16 16">
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                    </svg>
                  </button>
                </div>
                <div class="collapse info" id="pvb-pdf-info">
                  <div class="card card-body bg-info p-2">
                    <small>${ unsafeHTML( builder.text.pdf_info ) }</small>
                  </div>
                </div>
                <input type="url" name="pdf" class="form-control" id="pvb-pdf" .value=${ config.pdf }>
              </div>

              <!-- Downloadable -->
              <div class="form-check form-switch heading">
                <input class="form-check-input" type="checkbox" name="downloadable" id="pvb-downloadable" ?checked=${ config.downloadable }>
                <label class="form-check-label ps-2" for="pvb-downloadable">${ builder.text.downloadable }</label>
                <button class="btn btn-inline btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#pvb-downloadable-info" aria-expanded="false" aria-controls="pvb-downloadable-info">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-info-circle-fill text-info" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                  </svg>
                </button>
              </div>
              <div class="collapse info" id="pvb-downloadable-info">
                <small class="card card-body bg-info p-2">
                  ${ builder.text.downloadable_info }
                </small>
              </div>

            </div>
          </div>
        </div>

        <!-- Texts and Labels -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="pvb-labels-heading">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#pvb-labels" aria-expanded="false" aria-controls="pvb-labels">
              ${ builder.text.labels }
            </button>
          </h2>
          <div id="pvb-labels" class="accordion-collapse collapse" aria-labelledby="pvb-labels-heading" data-bs-parent="#pvb-accordion">
            <div class="accordion-body">

              <!-- Tooltip: First Page -->
              <div class="mb-3">
                <div class="heading">
                  <label for="pvb-first" class="form-label">
                    ${ builder.text.first }
                  </label>
                  <button class="btn btn-inline btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#pvb-first-info" aria-expanded="false" aria-controls="pvb-first-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-info-circle-fill text-info" viewBox="0 0 16 16">
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                    </svg>
                  </button>
                </div>
                <div class="collapse info" id="pvb-first-info">
                  <small class="card card-body bg-info p-2">
                    ${ builder.text.first_info }
                  </small>
                </div>
                <input type="text" name="text.first" class="form-control" id="pvb-first" .value=${ config.text.first }>
              </div>

              <!-- Tooltip: Previous Page -->
              <div class="mb-3">
                <div class="heading">
                  <label for="pvb-prev" class="form-label">
                    ${ builder.text.prev }
                  </label>
                  <button class="btn btn-inline btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#pvb-prev-info" aria-expanded="false" aria-controls="pvb-prev-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-info-circle-fill text-info" viewBox="0 0 16 16">
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                    </svg>
                  </button>
                </div>
                <div class="collapse info" id="pvb-prev-info">
                  <small class="card card-body bg-info p-2">
                    ${ builder.text.prev_info }
                  </small>
                </div>
                <input type="text" name="text.prev" class="form-control" id="pvb-prev" .value=${ config.text.prev }>
              </div>

              <!-- Tooltip: Next Page -->
              <div class="mb-3">
                <div class="heading">
                  <label for="pvb-next" class="form-label">
                    ${ builder.text.next }
                  </label>
                  <button class="btn btn-inline btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#pvb-next-info" aria-expanded="false" aria-controls="pvb-next-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-info-circle-fill text-info" viewBox="0 0 16 16">
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                    </svg>
                  </button>
                </div>
                <div class="collapse info" id="pvb-next-info">
                  <small class="card card-body bg-info p-2">
                    ${ builder.text.next_info }
                  </small>
                </div>
                <input type="text" name="text.next" class="form-control" id="pvb-next" .value=${ config.text.next }>
              </div>

              <!-- Tooltip: Last Page -->
              <div class="mb-3">
                <div class="heading">
                  <label for="pvb-last" class="form-label">
                    ${ builder.text.last }
                  </label>
                  <button class="btn btn-inline btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#pvb-last-info" aria-expanded="false" aria-controls="pvb-last-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-info-circle-fill text-info" viewBox="0 0 16 16">
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                    </svg>
                  </button>
                </div>
                <div class="collapse info" id="pvb-last-info">
                  <small class="card card-body bg-info p-2">
                    ${ builder.text.last_info }
                  </small>
                </div>
                <input type="text" name="text.last" class="form-control" id="pvb-last" .value=${ config.text.last }>
              </div>

              <!-- Tooltip: Jump to Page -->
              <div class="mb-3">
                <div class="heading">
                  <label for="pvb-jump" class="form-label">
                    ${ builder.text.jump }
                  </label>
                  <button class="btn btn-inline btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#pvb-jump-info" aria-expanded="false" aria-controls="pvb-jump-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-info-circle-fill text-info" viewBox="0 0 16 16">
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                    </svg>
                  </button>
                </div>
                <div class="collapse info" id="pvb-jump-info">
                  <small class="card card-body bg-info p-2">
                    ${ builder.text.jump_info }
                  </small>
                </div>
                <input type="text" name="text.jump" class="form-control" id="pvb-jump" .value=${ config.text.jump }>
              </div>

              <!-- Tooltip: Download PDF -->
              <div class="mb-3" ?data-hidden=${ !config.downloadable }>
                <div class="heading">
                  <label for="pvb-download" class="form-label">
                    ${ builder.text.download }
                  </label>
                  <button class="btn btn-inline btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#pvb-download-info" aria-expanded="false" aria-controls="pvb-download-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-info-circle-fill text-info" viewBox="0 0 16 16">
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                    </svg>
                  </button>
                </div>
                <div class="collapse info" id="pvb-download-info">
                  <small class="card card-body bg-info p-2">
                    ${ builder.text.download_info }
                  </small>
                </div>
                <input type="text" name="text.download" class="form-control" id="pvb-download" .value=${ config.text.download }>
              </div>

              <!-- Message: Protected PDF -->
              <div class="mb-3">
                <div class="heading">
                  <label for="pvb-protected" class="form-label">
                    ${ builder.text.protected }
                  </label>
                  <button class="btn btn-inline btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#pvb-protected-info" aria-expanded="false" aria-controls="pvb-protected-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-info-circle-fill text-info" viewBox="0 0 16 16">
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                    </svg>
                  </button>
                </div>
                <div class="collapse info" id="pvb-protected-info">
                  <small class="card card-body bg-info p-2">
                    ${ builder.text.protected_info }
                  </small>
                </div>
                <input type="text" name="text.protected" class="form-control" id="pvb-protected" .value=${ config.text.protected }>
              </div>

              <!-- Message: Access Denied -->
              <div class="mb-3">
                <div class="heading">
                  <label for="pvb-denied" class="form-label">
                    ${ builder.text.denied }
                  </label>
                  <button class="btn btn-inline btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#pvb-denied-info" aria-expanded="false" aria-controls="pvb-denied-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-info-circle-fill text-info" viewBox="0 0 16 16">
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                    </svg>
                  </button>
                </div>
                <div class="collapse info" id="pvb-denied-info">
                  <small class="card card-body bg-info p-2">
                    ${ builder.text.denied }
                  </small>
                </div>
                <input type="text" name="text.denied" class="form-control" id="pvb-denied" .value=${ config.text.denied }>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="d-grid">
        <button type="button" class="btn btn-info rounded-0" data-bs-toggle="modal" data-bs-target="#pvb-preview" ?data-hidden=${ !builder.text.preview } @click=${ () => events.onPreview() }>
          ${ builder.text.preview }
        </button>
        <button class="btn btn-primary rounded-0" type="submit" ?data-hidden=${ !builder.onfinish || !builder.text.submit }>
          ${ builder.text.submit }
        </button>
      </div>
    </form>

    <!-- Modal: Preview -->
    <div class="modal fade" id="pvb-preview" tabindex="-1" aria-labelledby="pvb-preview-title" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="pvb-preview-title">${ builder.text.preview_title }</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body"></div>
        </div>
      </div>
    </div>
  `;

}
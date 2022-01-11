/**
 * @overview HTML templates of ccmjs-based web component for an app handover
 * @author André Kless <andre.kless@web.de> 2022
 * @license The MIT License (MIT)
 */

import { html, render } from 'https://ccmjs.github.io/akless-components/libs/lit/lit.min.js';
export { render };

/**
 * main HTML template
 * @returns {TemplateResult}
 */
export function main( config, text, events ) {
  return html`
    <header></header>
    <main>
      <div class="d-flex">
        <div class="me-2 w-100">
          <div id="embed" class="input-group my-2 flex-nowrap" ?data-hidden=${ !config.embed }>
            <span class="input-group-text" data-lang="embed">${ text.embed }</span>
            <input type="text" class="form-control bg-white" .value="${ config.embed }" readonly aria-label="${ text.embed }">
            <button class="btn btn-success" type="button" title="${ text.copy }" data-lang="copy-title" @click=${ () => events.onCopy( 'embed' ) }>
              <i class="bi bi-clipboard-plus"></i>
            </button>
          </div>
          <div id="url" class="input-group my-2 flex-nowrap" ?data-hidden=${ !config.url }>
            <span class="input-group-text" data-lang="url">${ text.url }</span>
            <input type="text" class="form-control bg-white" .value="${ config.url }" readonly aria-label="${ text.url }">
            <button class="btn btn-success" type="button" title="${ text.copy }" data-lang="copy-title" @click=${ () => events.onCopy( 'url' ) }>
              <i class="bi bi-clipboard-plus"></i>
            </button>
          </div>
        </div>
        <div id="qr_code" ?data-hidden=${ !config.qr_code }></div>
      </div>
      <div class="text-center mt-1">
        <button type="button" class="btn btn-primary m-1" ?data-hidden=${ !config.html } @click=${ events.onHTML }>
          <i class="bi bi-download"></i>
          <span data-lang="html">${ text.html }</span>
        </button>
        <button type="button" class="btn btn-danger m-1" ?data-hidden=${ !config.scorm } @click=${ events.onSCORM }>
          <i class="bi bi-download"></i>
          <span data-lang="scorm">${ text.scorm }</span>
        </button>
        <button type="button" class="btn btn-warning m-1" ?data-hidden=${ !config.ibook } @click=${ events.oniBook }>
          <i class="bi bi-download"></i>
          <span data-lang="ibook">${ text.ibook }</span>
        </button>
        <a id="bookmarklet" class="btn btn-secondary m-1" ?data-hidden=${ !config.bookmarklet }>
          <i class="bi bi-bookmark"></i>
          <span data-lang="bookmarklet">${ text.bookmarklet }</span>
        </a>
      </div>
    </main>
  `;
}

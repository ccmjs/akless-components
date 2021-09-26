/**
 * @overview HTML templates for building an app configuration
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render, unsafeHTML } from 'https://ccmjs.github.io/akless-components/libs/lit/lit.js';
export { html, render, unsafeHTML };

let config, builder, events, id;
export const use = ( _config, _builder, _events, _id ) => { config = _config; builder = _builder; events = _events; id = _id; };

/**
 * returns the HTML template for a heading of an input element
 * @param {string} key
 * @returns {TemplateResult}
 */
export function heading( key  ) {
  return html`
    <div class="heading">
      <label for="${ id }-${ key }" class="form-label">
        ${ builder.text[ key ] }
      </label>
      <button class="btn btn-inline btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#${ id }-${ key }-info" aria-expanded="false" aria-controls="${ id }-${ key }-info">
        <i class="bi bi-info-circle-fill text-info"></i>
      </button>
    </div>
    <div class="collapse info" id="${ id }-${ key }-info">
      <small class="card card-body bg-info p-2">
        ${ unsafeHTML( builder.text[ key + '_info' ] ) }
      </small>
    </div>
  `;
}

/**
 * returns the HTML template for an input element
 * @param {Object|string} setup
 * @param {string} setup.prop - configuration property
 * @param {string} [setup.value = config.prop] - initial property value
 * @param {string} [setup.key = prop] - used key for this property
 * @param {string} [setup.type = 'text'] - input type
 * @param {boolean} [setup.disabled] - input element is disabled
 * @param {boolean} [setup.hidden] - hole template is hidden
 * @returns {TemplateResult}
 */
export function text( setup ) {
  let { prop, value, key = prop, type = 'text', disabled, hidden } = typeof setup === 'string' ? { prop: setup } : setup;
  if ( !value ) value = builder.ccm.helper.deepValue( config, prop );
  key = key.replaceAll( '.', '_' );
  return html`
    <div class="mb-3" ?data-hidden=${ hidden }>
      ${ heading( key ) }
      <input type="${ type }" name="${ prop }" class="form-control" id="${ id }-${ key }" .value=${ value } ?disabled=${ disabled } @change=${ events.onChange }>
    </div>
  `;
}

/**
 * returns the HTML template for a checkbox element
 * @param {Object|string} setup
 * @param {string} setup.prop - configuration property
 * @param {string|number|boolean} [setup.value = config.prop] - initial property value
 * @param {string} [setup.key = prop] - used key for this property
 * @param {boolean} [setup.switcher] - show checkbox as switch
 * @param {boolean} [setup.disabled] - checkbox is disabled
 * @param {boolean} [setup.hidden] - hole template is hidden
 * @returns {TemplateResult}
 */
export function checkbox( setup ) {
  let { prop, value, key = prop, switcher, disabled, hidden } = typeof setup === 'string' ? { prop: setup } : setup;
  if ( !value ) value = builder.ccm.helper.deepValue( config, prop );
  key = key.replaceAll( '.', '_' );
  return html`  
    <div class="form-check heading ${ switcher ? ' form-switch' : '' }" ?data-hidden=${ hidden }>
      <input class="form-check-input" type="checkbox" name="${ prop }" id="${ id }-${ key }" ?checked=${ value } ?disabled=${ disabled } @change=${ events.onChange }>
      <label class="form-check-label ps-2" for="${ id }-${ key }">${ builder.text[ key ] }</label>
      <button class="btn btn-inline btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#${ id }-${ key }-info" aria-expanded="false" aria-controls="${ id }-${ key }-info">
        <i class="bi bi-info-circle-fill text-info"></i>
      </button>
    </div>
    <div class="collapse info" id="${ id }-${ key }-info">
      <small class="card card-body bg-info p-2">
        ${ builder.text[ key + '_info' ] }
      </small>
    </div>
  `;
}

/**
 * returns the HTML template for the preview and submit button
 * @returns {TemplateResult}
 */
export function buttons() {
  return html`
    <div class="d-grid">
      <button type="button" class="btn btn-info rounded-0" data-bs-toggle="modal" data-bs-target="#${ id }-preview" ?data-hidden=${ !builder.text.preview } @click=${ events.onPreview }>
        ${ builder.text.preview }
      </button>
      <button class="btn btn-primary rounded-0" type="submit" ?data-hidden=${ !builder.onfinish || !builder.text.submit }>
        ${ builder.text.submit }
      </button>
    </div>
  `;
}

/**
 * returns the HTML template for the modal dialog that shows the preview
 * @returns {TemplateResult}
 */
export function modal() {
  return html`
    <div class="modal fade" id="${ id }-preview" tabindex="-1" aria-labelledby="${ id }-preview-title" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="${ id }-preview-title">${ builder.text.preview_title }</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body"></div>
        </div>
      </div>
    </div>
  `;
}
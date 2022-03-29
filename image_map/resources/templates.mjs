/**
 * @overview HTML templates of ccmjs-based web component for an image map
 * @author André Kless <andre.kless@web.de> 2022
 */

/**
 * returns the HTML template for the map
 * @param {Object} map_data
 * @returns {string}
 */
export function map( { image, width, height, info = '' } ) {
  return `
    <div class="m-2${ info ? '' : ' d-none' }" id="info">${ info }</div>
    <div class="border rounded m-2" id="map">
      <img src="${ image }" style="width: ${ width }px${ height ? '; height: ' + height + 'px' : '' }">
    </div>
  `;
}

/**
 * returns the HTML template for an image area
 * @param {Object} area_data
 * @returns {string}
 */
export function area( { disabled, height, image, info, size = 8, width = size, x = 0, y = 0 } ) {
  return `
    <div class="area${ disabled ? ' disabled' : '' }" style="position: absolute; left: ${ x }px; top: ${ y }px; width: ${ width }px; ${ height ? 'height: ' + height + 'px' : '' }"${ info ? ' title="' + info.replaceAll( '"', "'" ) + '"' : '' } data-bs-toggle="tooltip" data-bs-placement="top">
      <img src="${ image }">
    </div>
  `;
}

/**
 * returns the HTML template for a clicked app region
 * @param {Object} button_data - data for the 'back to map' button
 * @returns {string}
 */
export function app( { caption } ) {
  return `
    <div>
      <div class="m-2" id="back">
        <button class="btn btn-secondary btn-sm" type="button">${ caption }</button>
      </div>
      <div id="app"></div>
    </div>
  `;
}

/**
 * @overview HTML templates of ccmjs-based web component for a robot rally boardgame
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render, repeat } from 'https://ccmjs.github.io/akless-components/libs/lit/lit.min.js';
export { render };

/**
 * returns the HTML template that lets the user choose a robot
 * @param {Object[]} robots - robots data
 * @param {string} path - path to resource files
 * @param {Function} onSelectedRobot - when a robot has been selected
 * @returns {TemplateResult}
 */
export function chooseRobot( robots, path, onSelectedRobot ) {
  return html`
    <section id="choose_robot">
      <h1>Wähle deinen Roboter:</h1>
      <div>
        ${ repeat( Object.values( robots ), robot => robot.id, robot => html`
          <article @click=${ () => onSelectedRobot( robot.id ) }>
            <img src="${ path + 'images/robots/' + robot.id + '/selection.jpg' }">
          </article>
      ` ) }
      </div>
    </section>
  `;
}

/**
 * returns the HTML template that lets the user choose a racetrack
 * @param {Object[]} racetracks - racetracks data
 * @param {string} path - path to resource files
 * @param {number} size - field size (in px)
 * @param {Function} onSelectedRacetrack - when a racetrack has been selected
 * @returns {TemplateResult}
 */
export function chooseRacetrack( racetracks, path, size, onSelectedRacetrack ) {
  return html`
    <section id="choose_racetrack">
      <h1>Wähle die Rennstrecke:</h1>
      <div>
        ${ racetracks.map( ( { name, board }, i ) => html`
          <article>
            <h2>${ name }</h2>
            <div class="board" style="grid-template-columns: repeat( ${ board[ 0 ].length }, ${ size }px ); grid-template-rows: repeat( ${ board.length }, ${ size }px );" @click=${ () => onSelectedRacetrack( i + 1 ) }>
              ${ board.map( row => row.map( field_id => field( field_id, path ) ) ) }
            </div>
          </article>
        ` ) }
      </div>
    </section>
  `;
}

/**
 * returns the HTML template for the game board
 * @param {string[][]} board - fields data of the game board
 * @param {Object[]} objects - fields data of the game board
 * @param {string} path - path to resource files
 * @param {number} size - field size (in px)
 * @returns {TemplateResult}
 */
export function board( board, objects, path, size ) {
  return html`
    <main>
      <div id="opponents">
        <article>
          <img src="${ path }images/robots/HULKX/selection.jpg" width="${ size * 5 }">
        </article>
        <article>
          <img src="${ path }images/robots/HAMER/selection.jpg" width="${ size * 5 }">
        </article>
        <article>
          <img src="${ path }images/robots/SMASH/selection.jpg" width="${ size * 5 }">
        </article>
        <article>
          <img src="${ path }images/robots/ZOOMB/selection.jpg" width="${ size * 5 }">
        </article>
        <article>
          <img src="${ path }images/robots/SPINB/selection.jpg" width="${ size * 5 }">
        </article>
      </div>
      <div>
        <article class="board" style="padding: ${ size }px; grid-template-columns: repeat( ${ board[ 0 ].length }, ${ size }px ); grid-template-rows: repeat( ${ board.length }, ${ size }px );">
          ${ board.map( row => row.map( field_id => field( field_id, path ) ) ) }
        </article>
        <article style="text-align: center">
          <img src="${ path }images/robots/TWONK/selection.jpg" width="${ size * 10 }">
        </article>
      </div>
      <aside>
        <h2>ROBOT CHAT</h2>
        <div id="chat"></div>
      </aside>
    </main>
  `;
}

/**
 * returns the HTML template for a racetrack field
 * @param {string} id - field ID
 * @param {string} path - path to resource files
 * @returns {TemplateResult}
 */
function field( id, path ) {
  return id === '_____' ? html`<div class="field"></div>` : html`<div class="field" style="background-image: url( ${ path + 'images/fields/' + id + '.jpg' } )"></div>`;
}

/**
 * returns the HTML template for an object placed on the game board
 * @param {Object} obj - object data
 * @param {string} path - path to resource files
 * @returns {TemplateResult}
 */
function object( obj, path ) {
  return html`<img src="${ path + 'images/objects/' + obj.type + ( obj.nr || '' ) + '.png' }" class="obj" width="${ obj.width }" height="${ obj.height }" style="transform: rotate( ${ ( obj.direction || 0 ) * 90 }deg )"></img>`;
}
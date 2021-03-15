/**
 * @overview HTML templates of ccmjs-based web component for visualization of a ccm context
 * @author André Kless <andre.kless@web.de> 2020-2021
 * @license The MIT License (MIT)
 */

import { html, render, repeat } from 'https://ccmjs.github.io/akless-components/libs/lit/lit.js';
export { render };

export const main = instance => html`
  <div class="level">
    <div class="instance">
      <div title="${instance.config}">
        <div>
          <div><i>ccmjs</i> Version:</div>
          <div>${instance.ccm.version()}</div>
        </div>
        <div>
          <div>Component Name:</div>
          <div>${instance.component.name}</div>
        </div>
        <div>
          <div>Component Version:</div>
          <div>${instance.component.version||'latest'}</div>
        </div>
        <div>
          <div>Instance ID:</div>
          <div>${instance.id}</div>
        </div>
      </div>
    </div>
    <div class="children">
      ${repeat(Object.values(instance.children),child=>child.id,child=>main(child))}
    </div>
  </div>
`;
/**
 * @overview HTML templates of ccm component for visualization of a ccm context
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 */

import { html } from 'https://unpkg.com/lit-html'
import { repeat } from 'https://unpkg.com/lit-html/directives/repeat.js'

export const main = instance => html`
  <div class="level">
    <div class="instance">
      <div>
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
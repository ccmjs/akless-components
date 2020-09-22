/**
 * @overview HTML templates of ccm component for quick questions
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 */

import { html } from 'https://unpkg.com/lit-html';

export const main = ( instance, event, next, prev, add ) => html`
  <header>
    <h1>${instance.text.title}</h1>
  </header>
  <main>
    <section id="add" ?data-hidden=${!add}>
      <article>
        <h1>${instance.text.add_title}</h1>
        <div contenteditable>${instance.text.add_placeholder}</div>
      </article>
    </section>
    <section id="prev" ?data-hidden=${add||!prev}>
      <article></article>
    </section>
    <section id="next" ?data-hidden=${add}>
      <article>
        <h1 ?data-hidden=${!prev}>${instance.text.next}</h1>
        <p>${next && next.text}</p>
        <nav>
          <div title="${instance.text.yes}" @click=${event.yes}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64" height="64" viewBox="0 0 512 512" style=" fill:#000000;"><path fill="#32BEA6" d="M504.1,256C504.1,119,393,7.9,256,7.9C119,7.9,7.9,119,7.9,256C7.9,393,119,504.1,256,504.1C393,504.1,504.1,393,504.1,256z"></path><path fill="#FFF" d="M392.6,172.9c-5.8-15.1-17.7-12.7-30.6-10.1c-7.7,1.6-42,11.6-96.1,68.8c-22.5,23.7-37.3,42.6-47.1,57c-6-7.3-12.8-15.2-20-22.3C176.7,244.2,152,229,151,228.4c-10.3-6.3-23.8-3.1-30.2,7.3c-6.3,10.3-3.1,23.8,7.2,30.2c0.2,0.1,21.4,13.2,39.6,31.5c18.6,18.6,35.5,43.8,35.7,44.1c4.1,6.2,11,9.8,18.3,9.8c1.2,0,2.5-0.1,3.8-0.3c8.6-1.5,15.4-7.9,17.5-16.3c0.1-0.2,8.8-24.3,54.7-72.7c37-39.1,61.7-51.5,70.3-54.9c0.1,0,0.1,0,0.3,0c0,0,0.3-0.1,0.8-0.4c1.5-0.6,2.3-0.8,2.3-0.8c-0.4,0.1-0.6,0.1-0.6,0.1l0-0.1c4-1.7,11.4-4.9,11.5-5C393.3,196.1,397,184.1,392.6,172.9z"></path></svg>
          </div>
          <button title="${instance.text.neither}" @click=${event.neither}>${instance.icon.neither}</button>
          <div title="${instance.text.no}" @click=${event.no}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64" height="64" viewBox="0 0 512 512" style=" fill:#000000;"><path fill="#E04F5F" d="M504.1,256C504.1,119,393,7.9,256,7.9C119,7.9,7.9,119,7.9,256C7.9,393,119,504.1,256,504.1C393,504.1,504.1,393,504.1,256z"></path><path fill="#FFF" d="M285,256l72.5-84.2c7.9-9.2,6.9-23-2.3-31c-9.2-7.9-23-6.9-30.9,2.3L256,222.4l-68.2-79.2c-7.9-9.2-21.8-10.2-31-2.3c-9.2,7.9-10.2,21.8-2.3,31L227,256l-72.5,84.2c-7.9,9.2-6.9,23,2.3,31c4.1,3.6,9.2,5.3,14.3,5.3c6.2,0,12.3-2.6,16.6-7.6l68.2-79.2l68.2,79.2c4.3,5,10.5,7.6,16.6,7.6c5.1,0,10.2-1.7,14.3-5.3c9.2-7.9,10.2-21.8,2.3-31L285,256z"></path></svg>
          </div>
        </nav>
      </article>
      <article>
        <nav>
          <div title="${instance.text.like}" @click=${event.like}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64" height="64" viewBox="0 0 50 50" style=" fill:#000000;"><path d="M25,2C12.318,2,2,12.318,2,25c0,12.683,10.318,23,23,23c12.683,0,23-10.317,23-23C48,12.318,37.683,2,25,2z M32.7,36.4\tl-7.7-5l-7.7,5l2.3-8.9l-7.1-5.8l9.2-0.5l3.3-8.6l3.3,8.6l9.2,0.5l-7.1,5.8L32.7,36.4z"></path></svg>
          </div>
        </nav>
      </article>
    </section>
  </main>
  <footer>
    <nav>
      <button title="${instance.text.add}" @click=${event.add} ?data-hidden=${add}>${instance.icon.add}</button>
      <button disabled title="${instance.text.confirm}" @click=${event.confirm} ?data-hidden=${!add}>${instance.icon.confirm}</button>
      <div disabled title="${instance.text.share}" @click=${event.share}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64" height="64" viewBox="0 0 512 512" style=" fill:#000000;"><path fill="#25B7D3" d="M7.9,256C7.9,119,119,7.9,256,7.9C393,7.9,504.1,119,504.1,256c0,137-111.1,248.1-248.1,248.1C119,504.1,7.9,393,7.9,256z"></path><path fill="#FFF" d="M154.4 203.09999999999997A53.8 53.8 0 1 0 154.4 310.7 53.8 53.8 0 1 0 154.4 203.09999999999997zM318.7 107.39999999999999A53.8 53.8 0 1 0 318.7 215 53.8 53.8 0 1 0 318.7 107.39999999999999zM318.7 297A53.8 53.8 0 1 0 318.7 404.6 53.8 53.8 0 1 0 318.7 297z"></path><g><path fill="#FFF" d="M222.1 112.2H251V302.3H222.1z" transform="rotate(59.786 236.552 207.272)"></path></g><g><path fill="#FFF" d="M141.5 288.5H331.6V317.4H141.5z" transform="rotate(30.214 236.576 302.965)"></path></g></svg>
      </div>
      <button title="${instance.text.cancel}" @click=${event.cancel} ?data-hidden=${!add}>${instance.icon.cancel}</button>
      <button disabled title="${instance.text.report}" @click=${event.report} ?data-hidden=${add}>${instance.icon.report}</button>
    </nav>
  </footer>
`;
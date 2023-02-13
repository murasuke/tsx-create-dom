import { h, JsxFragmentFactory } from './dom-generator.js';
import { StrongAnchor } from './StrongAnchor.js';

document.addEventListener('DOMContentLoaded', (event) => {
  const input = (
    <input type="text" id="text1" value="text1" />
  ) as HTMLInputElement;
  const elements = (
    <>
      <div style={{ backgroundColor: '#ccf' }}>
        <h2 style={{ fontStyle: 'italic' }}>
          jsxから自作関数でDOMに変換するサンプル
        </h2>
        <div id="div1" className="classname1">
          {input}
          <button onclick={() => (input.value = new Date().toString())}>
            show textbox value
          </button>
        </div>
      </div>
      <StrongAnchor
        href="https://babeljs.io/docs/en/babel-standalone"
        target="_blank"
      >
        babel/standalone
      </StrongAnchor>
    </>
  );

  const app: HTMLElement = document.getElementById('app');
  app.appendChild(elements);
});

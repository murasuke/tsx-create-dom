import { h, JsxFragmentFactory } from './dom-generator.js';

document.addEventListener('DOMContentLoaded', (event) => {
  let count = 0;
  let Counter = (<div>Count: {count}</div>) as HTMLDivElement;
  // 内部のTextを書き換える
  const handleInc = () => {
    Counter.innerText = `Count: ${++count}`;
  };

  const elements = (
    <>
      {Counter}
      <button onclick={handleInc}>Increment</button>
      <button onclick={handleDec}>Decrement</button>
    </>
  );

  // 新しい<div>タグを作り、元と入れ替える
  function handleDec() {
    const replace = (<div>Count: {--count}</div>) as HTMLDivElement;
    elements.replaceChild(replace, Counter);
    Counter = replace;
  }

  const app: HTMLElement = document.getElementById('app');
  app.appendChild(elements);
});

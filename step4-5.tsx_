// 属性を再帰的に省略可能にするユーティリティー
export type NestedPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer R>
    ? Array<NestedPartial<R>>
    : NestedPartial<T[K]>;
};

// type DeepPartial<T> = {
//   [P in keyof T]?: T[P] extends Array<infer U>
//     ? Array<DeepPartial<U>>
//     : T[P] extends ReadonlyArray<infer UU>
//     ? ReadonlyArray<DeepPartial<UU>>
//     : DeepPartial<T[P]>;
// };

// type NestedPartial<T> = {
//   [K in keyof T]?: T[K] extends Array<infer R>
//     ? Array<NestedPartial<R>>
//     : T[K] extends unknown
//     ? unknown
//     : NestedPartial<T[K]>;
// };

// jsxの型定義
declare global {
  namespace JSX {
    interface IntrinsicElements extends NestedPartial<HTMLElementTagNameMap> {}
  }
}

/**
 * DOMに変換する関数
 * ・React.createElement()や、hyperscript()のようにDOMを生成する関数
 *   tag: タグ名
 *   props: タグの属性
 *   children: 子要素
 * 変換サンプル
 * ・h('div')
 *    ⇒ <div></div>
 * ・h('div',null, 'text')
 *    ⇒ <div>text</div>
 */
function h(tag, props, ...children) {
  if (typeof tag === 'function') {
    // 先頭が大文字のタグは関数に変換されるためそのまま呼び出す
    return tag(props, children);
  }

  // elementを作成
  const elm = document.createElement(tag);
  // 属性を追加
  for (const prop in props) {
    if (prop === 'style') {
      // styleの追加
      for (const s in props[prop]) {
        elm.style[s] = props[prop][s];
      }
    } else if (/^on\w+/.test(prop)) {
      // イベントハンドラの追加
      elm.addEventListener(prop.substring(2), props[prop], false);
    } else {
      // 上記以外の属性を追加
      elm.setAttribute(prop, props[prop]);
    }
  }

  // 子要素の追加
  if (Array.isArray(children)) {
    // 入れ子の配列を平坦化
    const flatten = children.flat(20);
    for (const child of flatten) {
      if (typeof child === 'string') {
        // 文字列の場合、TextNodeを追加
        elm.appendChild(document.createTextNode(child));
      } else {
        // 上記以外はNodeをそのまま追加(先に子側が生成され、それが渡される)
        elm.appendChild(child);
      }
    }
  }
  return elm;
}

// <>～</>(Fragment)変換用
// tsconfigの「"jsxFragmentFactory": "JsxFragmentFactory"」で指定した関数
function JsxFragmentFactory(
  props: NestedPartial<HTMLElement> /*HTMLElement*/,
  ...children: (HTMLElement | string)[]
) {
  const d = document.createElement('div');
  return <div {...props}>{children}</div>;
}

function Strong(
  props: NestedPartial<HTMLElement>,
  ...children: (HTMLElement | string)[]
) {
  return <strong {...props}>{children}</strong>;
}
function StrongAnchor(
  props: NestedPartial<HTMLAnchorElement>,
  children: (HTMLElement | string)[]
) {
  return (
    <Strong>
      <a {...props}>【{children}】</a>：
      <span style={{ fontStyle: 'italic' }}>Italic</span>
    </Strong>
  );
}

const elements = (
  <>
    <div style={{ backgroundColor: '#ccf' }}>
      <h2 style={{ fontStyle: 'italic' }}>
        jsxから自作関数でDOMに変換するサンプル
      </h2>
      <div id="div1" className="classname1">
        <input type="text" id="text1" value="text1" />
        <button
          onclick={() =>
            alert((document.getElementById('text1') as HTMLInputElement).value)
          }
        >
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

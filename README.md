# jsxで生成したDOMをjQueryで使うサンプル

## はじめに

jsxは便利な反面、最終的なDOM化はライブラリ(ReactやVue)が勝手にやってくれます。
しかし、jsxをjQueryと組み合わせて使う方法が見つかりませんでした。

* やりたいことは下記のように、文字列で追加するのをやめて、jsxで追加することです(第1章)
```javascript
// jQueryで追加する場合
 $('#app').append('<p><strong>要素の追加テストです。</strong></p>');
```

```javascript
// jsxで追加する場合
 $('#app').append(<p><strong>要素の追加テストです。</strong></p>);
```

* jsxではjsxで型のチェックができないため、tsx化＋タグの型チェックも行います(第2章)



## 第1章 jsxで生成したDOMをjQueryで追加する

jsxをbabelでトランスパイルすると、標準では`React.createElement()`の呼び出しに変換されます。
  ⇒ Reactが読み込まれていないと実行ができないため、コンパイルオプションを変更します

* 変換前
```javascript
const dom = <p><strong>要素の追加テストです。</strong></p>;
console.log(dom)
```

* 変換後(babel)
```javascript
var dom = /*#__PURE__*/React.createElement("p", null,
            /*#__PURE__*/React.createElement("strong", null, "要素の追加テストです。")
            );
console.log(dom);
```

* やること
  * `React.createElement()` を `h()`に変更する
  * DOMを生成する`h(tag, props, ...children)`関数を作る




それを独自のDOM生成関数でやってみます。
簡単に実行できるように`babel/standalone`を使い、１htmlファイルのみのプログラムです



### ①[babel/standalone](https://babeljs.io/docs/en/babel-standalone)を使い、jsxをコンパイルできる環境を設定する(1つのHTMLファイル内で)

```html
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script>
    Babel.registerPreset('jsx', {
      presets: [
        [Babel.availablePresets['env']]
      ],
      plugins: [
          [
            Babel.availablePlugins['transform-react-jsx'],
            {pragma:'h', pragmaFrag: 'div'},
          ]
      ],
    });
  </script>
```

### ①DOMを生成する`h(tag, props, ...children)`関数を作る
* ③jsxからDOMを生成して画面に表示し、下記を確認する
  * classやidなど属性が反映されていること
  * styleが反映されること
  * clickなどのイベントが動作すること

DOMに変換する関数仕様（React.createElement()や、hyperscript()のようにDOMを生成する関数）

* h(tag, props, ...children)
  * tag: タグ名
  * props: タグの属性
  * children: 子要素

変換サンプル
``` html
・h('div')
   ⇒ <div></div>
・h('div',null, 'text')
   ⇒ <div>text</div>
・h('div',{id: 'divid'}, 'text')
   ⇒ <div style="color: red;">text</div>
・h('div',{style: {backgroundColor: 'red'}}, 'text')
   ⇒ <div style="background-color: red;">text</div>
・h('div',{style: {'background-color': 'red'}}, 'text', h('span', {}, 'span tag'))
   ⇒ <div style="background-color: red;">text<span>span tag</span></div>
```

* DOM生成関数
```javascript

function h(tag, props, ...children) {
  const elm = document.createElement(tag);
  for (const prop in props) {
    if (prop === 'style') {
      for (const s in props[prop]) {
        elm.style[s] = props[prop][s];
      }
    } else if (/^on\w+/.test(prop)) {
      elm.addEventListener(prop.substring(2), props[prop], false);
    } else {
      elm.setAttribute(prop, props[prop]);
    }
  }

  if (Array.isArray(children)) {
    for (const child of children) {
      if (typeof child === 'string') {
        elm.appendChild(document.createTextNode(child));
      } else {
        elm.appendChild(child);
      }
    }
  }
  return elm;
}
```




## ③jsxからDOMを生成して画面に表示し、下記を確認する


```html
<body>
  <div id="app"></div>
  <script type="text/babel" data-presets="jsx" >
    const elements = (
      <>
        <div style={{ backgroundColor: '#ccf' }}>
          <h2 style={{"font-style":"italic"}}>jsxから自作関数でDOMに変換するサンプル</h2>
          <div id="div1" className="classname1">
            <input type="text" id="text1" value="text1" />
            <button onclick={() => alert(document.getElementById('text1').value)}>
              show textbox value
            </button>
          </div>
        </div>
        <a href="https://npm.im/hyperscript" target="_blank">
          open hyperscript page
        </a>
      </>
    );

    document.getElementById('app').appendChild(elements);
  </script>
</body>
```

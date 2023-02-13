var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
function h(tag, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    if (typeof tag === 'function') {
        // 先頭が大文字のタグは関数に変換されるためそのまま呼び出す
        return tag(props, children);
    }
    // elementを作成
    var elm = document.createElement(tag);
    // 属性を追加
    for (var prop in props) {
        if (prop === 'style') {
            // styleの追加
            for (var s in props[prop]) {
                elm.style[s] = props[prop][s];
            }
        }
        else if (/^on\w+/.test(prop)) {
            // イベントハンドラの追加
            elm.addEventListener(prop.substring(2), props[prop], false);
        }
        else {
            // 上記以外の属性を追加
            elm.setAttribute(prop, props[prop]);
        }
    }
    // 子要素の追加
    if (Array.isArray(children)) {
        // 入れ子の配列を平坦化
        var flatten = children.flat(20);
        for (var _a = 0, flatten_1 = flatten; _a < flatten_1.length; _a++) {
            var child = flatten_1[_a];
            if (typeof child === 'string') {
                // 文字列の場合、TextNodeを追加
                elm.appendChild(document.createTextNode(child));
            }
            else {
                // 上記以外はNodeをそのまま追加(先に子側が生成され、それが渡される)
                elm.appendChild(child);
            }
        }
    }
    return elm;
}
// <>～</>(Fragment)変換用
// tsconfigの「"jsxFragmentFactory": "JsxFragmentFactory"」で指定した関数
function JsxFragmentFactory(props /*HTMLElement*/) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    var d = document.createElement('div');
    return h("div", __assign({}, props), children);
}
function Strong(props) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    return h("strong", __assign({}, props), children);
}
function StrongAnchor(props, children) {
    return (h(Strong, null,
        h("a", __assign({}, props),
            "\u3010",
            children,
            "\u3011"),
        "\uFF1A",
        h("span", { style: { fontStyle: 'italic' } }, "Italic")));
}
var elements = (h(JsxFragmentFactory, null,
    h("div", { style: { backgroundColor: '#ccf' } },
        h("h2", { style: { fontStyle: 'italic' } }, "jsx\u304B\u3089\u81EA\u4F5C\u95A2\u6570\u3067DOM\u306B\u5909\u63DB\u3059\u308B\u30B5\u30F3\u30D7\u30EB"),
        h("div", { id: "div1", className: "classname1" },
            h("input", { type: "text", id: "text1", value: "text1" }),
            h("button", { onclick: function () {
                    return alert(document.getElementById('text1').value);
                } }, "show textbox value"))),
    h(StrongAnchor, { href: "https://babeljs.io/docs/en/babel-standalone", target: "_blank" }, "babel/standalone")));
var app = document.getElementById('app');
app.appendChild(elements);
export {};

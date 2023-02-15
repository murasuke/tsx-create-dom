import { h, JsxFragmentFactory } from './dom-generator.js';
import { StrongAnchor } from './StrongAnchor.js';
document.addEventListener('DOMContentLoaded', function (event) {
    var input = (h("input", { type: "text", id: "text1", value: "text1" }));
    var elements = (h(JsxFragmentFactory, null,
        h("div", { style: { backgroundColor: '#ccf' } },
            h("h2", { style: { fontStyle: 'italic' } }, "jsx\u304B\u3089\u81EA\u4F5C\u95A2\u6570\u3067DOM\u306B\u5909\u63DB\u3059\u308B\u30B5\u30F3\u30D7\u30EB"),
            h("div", { id: "div1", className: "classname1" },
                input,
                h("button", { onclick: function () { return alert(input.value); } }, "show textbox value"))),
        h(StrongAnchor, { href: "https://babeljs.io/docs/en/babel-standalone", target: "_blank" }, "babel/standalone")));
    var app = document.getElementById('app');
    app.appendChild(elements);
});

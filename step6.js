import { h, JsxFragmentFactory } from './dom-generator.js';
document.addEventListener('DOMContentLoaded', function (event) {
    var count = 0;
    var Counter = (h("div", null,
        "Count: ",
        count));
    // 内部のTextを書き換える
    var handleInc = function () {
        Counter.innerText = "Count: ".concat(++count);
    };
    var elements = (h(JsxFragmentFactory, null,
        Counter,
        h("button", { onclick: handleInc }, "Increment"),
        h("button", { onclick: handleDec }, "Decrement")));
    // 新しい<div>タグを作り、元と入れ替える
    function handleDec() {
        var replace = (h("div", null,
            "Count: ",
            --count));
        elements.replaceChild(replace, Counter);
        Counter = replace;
    }
    var app = document.getElementById('app');
    app.appendChild(elements);
});

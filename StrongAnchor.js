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
import { h } from './dom-generator.js';
import { Strong } from './Strong.js';
export function StrongAnchor(props, children) {
    return (h(Strong, null,
        h("a", __assign({}, props),
            "\u3010",
            children,
            "\u3011"),
        "\uFF1A",
        h("span", { style: { fontStyle: 'italic' } }, "Italic")));
}

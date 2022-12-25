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
 * ・h('div',{id: 'divid'}, 'text')
 *    ⇒ <div style="color: red;">text</div>
 * ・h('div',{style: {backgroundColor: 'red'}}, 'text')
 *    ⇒ <div style="background-color: red;">text</div>
 * ・h('div',{style: {'background-color': 'red'}}, 'text', h('span', {}, 'span tag'))
 *    ⇒ <div style="background-color: red;">text<span>span tag</span></div>
 */
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

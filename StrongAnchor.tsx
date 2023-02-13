import { NestedPartial } from './jsx-global.d.js';
import { h } from './dom-generator.js';
import { Strong } from './Strong.js';

export function StrongAnchor(
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

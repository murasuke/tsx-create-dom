import { NestedPartial } from './jsx-global.d.js';
import { h } from './dom-generator.js';

export function Strong(
  props: NestedPartial<HTMLElement>,
  ...children: (HTMLElement | string)[]
) {
  return <strong {...props}>{children}</strong>;
}

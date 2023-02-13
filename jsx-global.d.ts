// 属性を再帰的に省略可能にするユーティリティー
export type NestedPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer R>
    ? Array<NestedPartial<R>>
    : NestedPartial<T[K]>;
};

// jsxの型定義
declare global {
  namespace JSX {
    interface IntrinsicElements extends NestedPartial<HTMLElementTagNameMap> {}
  }
}

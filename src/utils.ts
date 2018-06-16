import { VNode } from 'snabbdom/vnode';
import { style } from 'typestyle';
import { TypeStyle } from 'typestyle/lib/internal/typestyle';

import { Style, StyledVNodeData } from './types';

export const callStyleFn = (css: Style | Style[], instance: TypeStyle | undefined = undefined): string => {
  const styleFn = instance ? instance.style : style;
  return Array.isArray(css) ? styleFn(...css) : styleFn(css);
};

export const updateVNode = (vnode: VNode, instance: TypeStyle | undefined = undefined, setClass: boolean = true): void => {
  const data: StyledVNodeData = vnode.data as StyledVNodeData;

  if (data.css) {
    const hashedClass = callStyleFn(data.css, instance);
    if (setClass) {
      data.class = data.class || {};
      data.class[hashedClass] = true;
    }
  }
};

export const traverseVNode = (node: VNode, nodeMutator: (node: VNode) => void): void => {
  nodeMutator(node);
  if (node.children) {
    node.children.forEach((child) => traverseVNode(child as VNode, nodeMutator));
  }
};

export function* alternateFirstInvocation(first: () => any, subsequent: () => any) {
  yield first();
  while (true) {
    yield subsequent();
  }
}

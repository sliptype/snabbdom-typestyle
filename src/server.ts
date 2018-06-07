import { VNode } from 'snabbdom/vnode';
import { createTypeStyle, getStyles, style } from 'typestyle';
import { TypeStyle } from 'typestyle/lib/internal/typestyle';

import { StyledVNodeData } from './types';
import { isVNode, updateVNode } from './utils';

export const serverSideCssModule = (node: VNode, attributes: Map<string, number | string>): void =>
  updateVNode(node, (name, value) => attributes.set(name, value));

export const collectStyles = (node: VNode): string => {
  const instance = createTypeStyle();
  traverseVNode(node, instance);
  return instance.getStyles();
};

const traverseVNode = (node: string | VNode, instance: TypeStyle) => {
  if (isVNode(node)) {
    const data: StyledVNodeData = node.data as StyledVNodeData;

    if (data.css) {
      instance.style(data.css);
    }

    if (node.children) {
      node.children.forEach((child) => traverseVNode(child, instance));
    }
  }
};

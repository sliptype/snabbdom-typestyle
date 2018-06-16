import { VNode } from 'snabbdom/vnode';
import { createTypeStyle, getStyles, style } from 'typestyle';
import { TypeStyle } from 'typestyle/lib/internal/typestyle';

import { StyledVNodeData } from './types';
import { traverseVNode, updateVNode } from './utils';

export const serverSideCssModule = (node: VNode, attributes: Map<string, number | string>): void =>
  updateVNode(node);

const nodeMutator = (instance: TypeStyle) => (node: VNode): void => updateVNode(node, instance, false);

export const collectStyles = (node: VNode): string => {
  const instance = createTypeStyle();
  traverseVNode(node, nodeMutator(instance));
  return instance.getStyles();
};

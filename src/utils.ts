import { VNode } from 'snabbdom/vnode';
import { style } from 'typestyle';

import { StyledVNodeData } from './types';

export const isVNode = (vNode: string | VNode): vNode is VNode => {
  return (vNode as string).length === undefined;
};

export const updateVNode = (node: VNode, attributeAccessor: (attribute: string, className: string) => void): void => {
  const data: StyledVNodeData = node.data as StyledVNodeData;

  if (data.css) {
    data.props = data.props || {};

    const styleClass = style(data.css);
    const oldClassName = data.props.className || '';
    const newClassName = `${oldClassName} ${styleClass}`.trim();

    attributeAccessor('class', newClassName);
  }
};

export function* alternateFirstInvocation(first: () => any, subsequent: () => any) {
  yield first();
  while (true) {
    yield subsequent();
  }
}

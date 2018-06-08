import { VNode } from 'snabbdom/vnode';
import { style } from 'typestyle';

import { StyledVNodeData } from './types';

export const makeClassName = (oldClassName: string, newClassName: string): string => {
  return `${oldClassName} ${newClassName}`.trim();
};

export const updateVNode = (node: VNode, attributeAccessor: (attribute: string, className: string) => void): void => {
  const data: StyledVNodeData = node.data as StyledVNodeData;

  if (data.css) {
    data.props = data.props || {};
    attributeAccessor('class', makeClassName(data.props.className || '', style(data.css)));
  }
};

export function* alternateFirstInvocation(first: () => any, subsequent: () => any) {
  yield first();
  while (true) {
    yield subsequent();
  }
}

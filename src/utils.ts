import { VNode } from 'snabbdom/vnode';
import { style } from 'typestyle';

import { StyledVNodeData } from './types';

const makeClassName = (oldClassName: string, newClassName: string): string => {
  return `${oldClassName} ${newClassName}`.trim();
};

export const updateVNode = (node: VNode, attributeAccessor: (attribute: string, className: string) => void): void => {
  const data: StyledVNodeData = node.data as StyledVNodeData;

  if (data.css) {
    let previousClassName;

    if (data.props && data.props.className) {
      previousClassName = data.props.className;
    } else if (node.sel) {
      const dotIdx = node.sel.indexOf('.');
      if (dotIdx >= 0) {
        previousClassName = node.sel.slice(dotIdx + 1);
      }
    }

    attributeAccessor('class', makeClassName(previousClassName || '', style(data.css)));
  }
};

export function* alternateFirstInvocation(first: () => any, subsequent: () => any) {
  yield first();
  while (true) {
    yield subsequent();
  }
}

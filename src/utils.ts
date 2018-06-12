import { VNode } from 'snabbdom/vnode';
import { style } from 'typestyle';

import { StyledVNodeData } from './types';

export const updateVNode = (vnode: VNode): void => {
  const data: StyledVNodeData = vnode.data as StyledVNodeData;

  if (data.css) {
    data.class = data.class || {};
    data.class[style(data.css)] = true;
  }
};

export function* alternateFirstInvocation(first: () => any, subsequent: () => any) {
  yield first();
  while (true) {
    yield subsequent();
  }
}

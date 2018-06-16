import { VNode } from 'snabbdom/vnode';
import { style } from 'typestyle';

import { StyledVNodeData } from './types';

export const updateVNode = (vnode: VNode): void => {
  const data: StyledVNodeData = vnode.data as StyledVNodeData;

  if (data.css) {
    data.class = data.class || {};
    const hashedClass = Array.isArray(data.css) ? style(...data.css) : style(data.css);
    data.class[hashedClass] = true;
  }
};

export function* alternateFirstInvocation(first: () => any, subsequent: () => any) {
  yield first();
  while (true) {
    yield subsequent();
  }
}

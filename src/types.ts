import { VNodeData } from 'snabbdom/vnode';
import { types } from 'typestyle';

export interface StyledVNodeData extends VNodeData {
  css?: types.NestedCSSProperties;
}

export type Style = types.NestedCSSProperties;

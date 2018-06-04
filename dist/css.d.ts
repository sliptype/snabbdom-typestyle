import { Module } from 'snabbdom/modules/module';
import { VNodeData } from 'snabbdom/vnode';
import { types } from 'typestyle';
export interface StyledVNodeData extends VNodeData {
    css?: types.NestedCSSProperties;
}
export declare type Style = types.NestedCSSProperties;
export declare const cssModule: Module;
export default cssModule;

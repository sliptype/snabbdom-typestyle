import { Module } from 'snabbdom/modules/module';
import { VNode, VNodeData } from 'snabbdom/vnode';
import { types } from 'typestyle';
export interface StyledVNodeData extends VNodeData {
    css?: types.NestedCSSProperties;
}
export declare type Style = types.NestedCSSProperties;
export declare const cssModule: Module;
export default cssModule;
export declare const serverSideCssModule: (node: VNode, attributes: Map<string, string | number>) => void;
export declare const collectStyles: (node: VNode) => string;

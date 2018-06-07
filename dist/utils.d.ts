import { VNode } from 'snabbdom/vnode';
export declare const isVNode: (vNode: string | VNode) => vNode is VNode;
export declare const updateVNode: (node: VNode, attributeAccessor: (attribute: string, className: string) => void) => void;
export declare function alternateFirstInvocation(first: () => any, subsequent: () => any): IterableIterator<any>;

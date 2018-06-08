import { VNode } from 'snabbdom/vnode';
export declare const makeClassName: (oldClassName: string, newClassName: string) => string;
export declare const updateVNode: (node: VNode, attributeAccessor: (attribute: string, className: string) => void) => void;
export declare function alternateFirstInvocation(first: () => any, subsequent: () => any): IterableIterator<any>;

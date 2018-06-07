import { Module } from 'snabbdom/modules/module';
import { VNode } from 'snabbdom/vnode';
import { updateVNode } from './utils';

const updateDOM = (oldNode: VNode, newNode: VNode): void => {
  if (newNode.elm) {
    const elm: Element = newNode.elm as Element;
    updateVNode(newNode, (name, value) => elm.setAttribute(name, value));
  }
};

export const cssModule = {
  create: updateDOM,
  update: updateDOM,
} as Module;

export default cssModule;

import { Module } from 'snabbdom/modules/module';
import { VNode } from 'snabbdom/vnode';
import { setStylesTarget } from 'typestyle';
import { StylesTarget } from 'typestyle/lib/internal/typestyle';

import { updateVNode } from './utils';

const updateDOM = (oldNode: VNode, newNode: VNode): void => {
  if (newNode.elm) {
    const elm: Element = newNode.elm as Element;
    updateVNode(newNode, (name, value) => elm.setAttribute(name, value));
  }
};

export const makeClientSideCssModule = (styleElementSelector: string | undefined = undefined): Module => {
  if (typeof styleElementSelector !== 'undefined') {
    const target = document.querySelector(styleElementSelector) as StylesTarget;
    setStylesTarget(target);
  }

  return {
    create: updateDOM,
    update: updateDOM,
  } as Module;
};

export const cssModule = makeClientSideCssModule();

export default cssModule;

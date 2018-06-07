import { Module } from 'snabbdom/modules/module';
import { VNode } from 'snabbdom/vnode';
import { setStylesTarget } from 'typestyle';
import { StylesTarget } from 'typestyle/lib/internal/typestyle';

import { alternateFirstInvocation, updateVNode } from './utils';

const removeServersideStyles = (styleElementSelector: string) => {
  const previousStyleTarget = document.querySelector(styleElementSelector);

  if (previousStyleTarget) {
    previousStyleTarget.remove();
  }
};

const makeDomUpdater = (styleElementSelector: string | undefined = undefined) => (oldNode: VNode, newNode: VNode): void => {
  if (newNode.elm) {
    const elm: Element = newNode.elm as Element;
    updateVNode(newNode, (name, value) => elm.setAttribute(name, value));
  }

  if (typeof styleElementSelector !== 'undefined') {
    removeServersideStyles(styleElementSelector);
  }
};

export const makeModule = (styleElementSelector: string | undefined = undefined): Module => {

  // Serverside styles are only removed the first time updateDOM is called
  const domUpdater = alternateFirstInvocation(() => makeDomUpdater(styleElementSelector), () => makeDomUpdater());
  const updateDOM = (oldNode: VNode, newNode: VNode) => domUpdater.next().value(oldNode, newNode);

  return {
    create: updateDOM,
    update: updateDOM,
  } as Module;
};

export default makeModule();

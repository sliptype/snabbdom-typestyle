import { Module } from 'snabbdom/modules/module';
import { VNode } from 'snabbdom/vnode';
import { setStylesTarget } from 'typestyle';
import { StylesTarget } from 'typestyle/lib/internal/typestyle';

import { alternateFirstInvocation, updateVNode } from './utils';

const removeElement = (styleElementSelector: string) => {
  const previousStyleTarget = document.querySelector(styleElementSelector);

  if (previousStyleTarget) {
    previousStyleTarget.remove();
  }
};

const makeDomUpdater = (styleElementSelector: string | undefined = undefined) => (oldNode: VNode, newNode: VNode): void => {
  updateVNode(newNode);

  if (typeof styleElementSelector !== 'undefined') {
    removeElement(styleElementSelector);
  }
};

export const makeModule = (styleElementSelector: string | undefined = undefined): Module => {

  // Serverside styles are only removed the first time updateDOM is called
  const domUpdater = alternateFirstInvocation(() => makeDomUpdater(styleElementSelector), () => makeDomUpdater());
  const updateDOM = (oldNode: VNode, newNode: VNode) => domUpdater.next().value(oldNode, newNode);

  return {
    create: updateDOM,
    update: updateDOM
  } as Module;
};

export default makeModule();

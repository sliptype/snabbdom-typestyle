import { Attrs } from 'snabbdom/modules/attributes';
import { Module } from 'snabbdom/modules/module';
import { VNode, VNodeData } from 'snabbdom/vnode';
import { createTypeStyle, getStyles, style, types } from 'typestyle';
import { TypeStyle } from 'typestyle/lib/internal/typestyle';

/*
  Types
 */

export interface StyledVNodeData extends VNodeData {
  css?: types.NestedCSSProperties;
}

export type Style = types.NestedCSSProperties;

/*
  Utilities
 */

const isVNode = (vNode: string | VNode): vNode is VNode => {
  return (vNode as string).length === undefined;
};

const updateVNode = (node: VNode, attributeAccessor: (attribute: string, className: string) => void): void => {
  const data: StyledVNodeData = node.data as StyledVNodeData;

  if (data.css) {
    data.props = data.props || {};

    const styleClass = style(data.css);
    const oldClassName = data.props.className || '';
    const newClassName = `${oldClassName} ${styleClass}`.trim();

    attributeAccessor('class', newClassName);
  }
};

/*
  Client-side
 */

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

/*
  Server-side
 */

export const serverSideCssModule = (node: VNode, attributes: Map<string, number | string>): void =>
  updateVNode(node, (name, value) => attributes.set(name, value));

export const collectStyles = (node: VNode): string => {
  const instance = createTypeStyle();
  traverseVNode(node, instance);
  return instance.getStyles();
};

const traverseVNode = (node: string | VNode, instance: TypeStyle) => {
  if (isVNode(node)) {
    const data: StyledVNodeData = node.data as StyledVNodeData;

    if (data.css) {
      instance.style(data.css);
    }

    if (node.children) {
      node.children.forEach((child) => traverseVNode(child, instance));
    }
  }
};

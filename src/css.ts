import { Attrs } from 'snabbdom/modules/attributes';
import { Module } from 'snabbdom/modules/module';
import { VNode, VNodeData } from 'snabbdom/vnode';
import { style, types } from 'typestyle';

export interface StyledVNodeData extends VNodeData {
  css?: types.NestedCSSProperties;
}

export type Style = types.NestedCSSProperties;

const updateStyle = (oldNode: VNode, newNode: VNode) => {

  const data: StyledVNodeData = newNode.data as StyledVNodeData;

  if (data.css) {

    data.props = data.props || {};

    const styleClass = style(data.css);
    const oldClassName = data.props.className || '';
    const newClassName = `${oldClassName} ${styleClass}`;

    if (newNode.elm) {
      const elm: Element = newNode.elm as Element;
      elm.setAttribute('class', newClassName);
    }
  }
};

export const styleModule = {
  create: updateStyle,
  update: updateStyle,
} as Module;

export default styleModule;

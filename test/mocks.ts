import { h } from 'snabbdom';

export const styleElementSelector = () => '#styles';

export const css = () => ({
  color: 'blue'
});

export const oldClassName = () => 'test';

export const vNode = () => h('div', {
    css: css(),
    props: {
      className: oldClassName()
    }
  });

export const vNodeWithElm = () => {
  const node = vNode();
  node.elm = {
    setAttribute: jest.fn();
  };

  return node;
};

export const vNodeWithChildren = (quantity) => {
  const node = vNode();
  node.children = [];

  for (let i = 0; i < quantity; i++) {
    node.children.push(vNode());
  }

  return node;
};

export const blankVNode = () => h('div');

export const typestyleInstance = () => ({
  getStyles: jest.fn(),
  style: jest.fn()
});

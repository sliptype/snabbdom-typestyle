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

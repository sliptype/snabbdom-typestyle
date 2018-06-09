import { h } from 'snabbdom';

export const styleElementSelector = () => '#styles';

export const oldClassName = () => 'oldClassName';

export const hashedClassName = () => 'oldClassName f1mb383g';

export const collectedStyles = () => '.f1jvcvsh{color:red}.f1mb383g{color:blue}';

export const css = () => ({
  color: 'blue'
});

export const blankVNode = () => h('div');

export const vNode = (alternateCss) => h('div', {
    css: alternateCss || css(),
    props: {
      className: oldClassName()
    }
  });

export const vNodeWithElm = () => {
  const node = vNode();
  node.elm = {};

  node.elm.setAttribute = jest.fn((name, value) => {
    node.elm[name] = value;
  });

  return node;
};

export const vNodeWithChildren = (childQuantity) => {
  const node = vNode();
  const child = vNode();
  child.children = [
    vNode({
      color: 'red'
    }),
    vNode()
  ];

  node.children = [
    child,
    vNode()
  ];

  return node;
};

export const childrenQuantity = () => 4;

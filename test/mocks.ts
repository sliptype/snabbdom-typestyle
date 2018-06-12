import { h } from 'snabbdom';

export const styleElementSelector = () => '#styles';

export const hashedClassName = () => 'f1mb383g';

export const collectedStyles = () => '.f1jvcvsh{color:red}.f1mb383g{color:blue}';

export const css = () => ({
  color: 'blue'
});

export const vNode = (alternateCss) => h('div', {
    css: alternateCss || css()
  });
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

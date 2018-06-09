import * as typestyle from 'typestyle';
import * as server from '../src/server';
import * as utils from '../src/utils';
import * as mocks from './mocks';

describe('traverseVNode', () => {

  const instance;

  beforeEach(() => {
    instance = mocks.typestyleInstance();
  });

  it('calls style if the node has css', () => {
    server.traverseVNode(mocks.vNode(), instance);
    expect(instance.style.mock.calls.length).toBe(1);
    expect(instance.style.mock.calls[0][0]).toEqual(mocks.css());
  });

  it('doesn\'t call style if the node doesn\'t have css', () => {
    server.traverseVNode(mocks.blankVNode(), instance);
    expect(instance.style.mock.calls.length).toBe(0);
  });

  it('calls traverseVNode for each child', () => {
    server.traverseVNode = jest.fn(server.traverseVNode);
    const childQuantity = Math.floor(Math.random() * 100);
    const node = mocks.vNodeWithChildren(childQuantity);

    server.traverseVNode(node, instance);
    expect(server.traverseVNode.mock.calls.length).toBe(childQuantity + 1);
  });

  it('doesn\'t call traverseVNode if the node doesn\'t have children', () => {
    server.traverseVNode = jest.fn(server.traverseVNode);
    server.traverseVNode(mocks.blankVNode(), instance);
    expect(server.traverseVNode.mock.calls.length).toBe(1);
  });
});

describe('serverSideCssModule', () => {
  it('calls updateVNode', () => {
    utils.updateVNode = jest.fn();
    server.serverSideCssModule(mocks.vNode(), mocks.vNode());
    expect(utils.updateVNode.mock.calls.length).toBe(1);
  });
});

describe('collectStyles', () => {

  it('creates a typestyle instance', () => {
    typestyle.createTypeStyle = jest.fn(mocks.typestyleInstance);
    server.collectStyles(mocks.vNode());
    expect(typestyle.createTypeStyle.mock.calls.length).toBe(1);
  });

  it('calls traverseVNode', () => {
    server.traverseVNode = jest.fn(mocks.typestyleInstance);
    server.collectStyles(mocks.vNode());
    expect(server.traverseVNode.mock.calls.length).toBe(1);
  });

});

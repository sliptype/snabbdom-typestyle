import { h } from 'snabbdom';
import { VNode } from 'snabbdom/vnode';
import { style } from 'typestyle';
import * as client from '../src/client';
import * as utils from '../src/utils';
import * as mocks from './mocks';

jest.mock('typestyle');

describe('removeElement', () => {

  it('removes an element given a selector', () => {

    const element = document.createElement('style');
    element.id = 'styles';
    document.head.appendChild(element);

    client.removeElement(mocks.styleElementSelector());
    expect(document.head.contains(element)).toBe(false);
  });

  it('doesn\'t error when not given a selector', () => {
    client.removeElement();
  });
});

describe('makeDomUpdater', () => {
  it('calls updateVNode when passed a VNode with an element', () => {
    utils.updateVNode = jest.fn();
    client.makeDomUpdater()(mocks.vNodeWithElm(), mocks.vNodeWithElm();
    expect(utils.updateVNode.mock.calls.length).toBe(1);
  });

  it('does not call updateVNode when create is passed a VNode without an element', () => {
    utils.updateVNode = jest.fn();
    client.makeDomUpdater()(mocks.vNode(), mocks.vNode();
    expect(utils.updateVNode.mock.calls.length).toBe(0);
  });

  it('passes removeElement the style element selector when create is called', () => {
    client.removeElement = jest.fn();
    client.makeDomUpdater(mocks.styleElementSelector())(mocks.vNode(), mocks.vNode();
    expect(client.removeElement.mock.calls.length).toBe(1);
    expect(client.removeElement.mock.calls[0][0]).toBe(mocks.styleElementSelector());
  });

});

describe('makeModule', () => {

  const module;

  beforeEach(() => {
    module = client.makeModule(mocks.styleElementSelector());
  });

  it('returns a module that calls that performs the same function on create and update', () => {
    expect(module.update).toEqual(module.create);
  });

  it('calls makeDomUpdater with the styleElementSelector', () => {
    const spy = jest.fn();
    client.makeDomUpdater = () => spy;
    module.create(mocks.vNodeWithElm(), mocks.vNodeWithElm());
    expect(spy.mock.calls.length).toBe(1);
  });
});

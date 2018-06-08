import * as utils from '../src/utils';
import { style } from 'typestyle';
import { h } from 'snabbdom';
import { VNode } from 'snabbdom/vnode';

jest.mock('typestyle');

describe('alternateFirstInvocation', () => {

  it('initially yields the invocation of the first argument', () => {
    const generator = utils.alternateFirstInvocation(() => 1, () => 2);
    const result = generator.next().value;
    expect(result).toBe(1);
  });

  it('subsequently yields the invocation of the second argument', () => {
    const generator = utils.alternateFirstInvocation(() => 1, () => 2);
    generator.next();
    const result = generator.next().value;
    expect(result).toBe(2);
  });

  it('subsequently yields the invocation of the second argument ad infinitum', () => {
    const generator = utils.alternateFirstInvocation(() => 1, () => 2);
    for (let i = 0; i < Math.random() * 100; i++) {
      generator.next();
    }
    const result = generator.next().value;
    expect(result).toBe(2);
  });
});

describe('makeClassName', () => {

  it('concatenates', () => {
    const result = utils.makeClassName('a', 'b');
    expect(result).toBe('a b');
  });

  it('strips white space', () => {
    const result = utils.makeClassName('', 'b');
    expect(result).toBe('b');
  });
});

describe('updateVNode', () => {

  const css;
  const oldClassName;
  const attributeAccessor;

  beforeEach(() => {
    css = {
      color: 'blue',
    };

    oldClassName = 'test';
    const vNode = h('div', { css, props: { className: oldClassName} });
    attributeAccessor = jest.fn();
    utils.makeClassName = jest.fn(() => 'className');

    utils.updateVNode(vNode, attributeAccessor);
  });

  it('calls style with the vnode css', () => {
    expect(style.mock.calls[0][0]).toEqual(css);
  });

  it('calls makeClassName with old classname and new classname', () => {
    const newClassName = style.mock.results[0].value;
    expect(utils.makeClassName.mock.calls[0][0]).toBe(oldClassName);
    expect(utils.makeClassName.mock.calls[0][1]).toBe(newClassName);
  });

  it('calls attributeAccessor with the className', () => {
    expect(attributeAccessor.mock.calls[0][0]).toBe('class');
    expect(attributeAccessor.mock.calls[0][1]).toBe('className');
  });
});

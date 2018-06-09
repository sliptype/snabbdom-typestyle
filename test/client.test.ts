import * as typestyle from 'typestyle';
import * as client from '../src/client';
import * as mocks from './mocks';

describe('makeModule', () => {

  describe('returns a snabbdom module that', () => {

    const module;

    beforeEach(() => {
      module = client.makeModule(mocks.styleElementSelector());
    });

    it('performs the same function on create and update', () => {
      expect(module.update).toEqual(module.create);
    });

    it('calls style on create', () => {
      typestyle.style = jest.fn(typestyle.style);
      module.create(mocks.vNodeWithElm(), mocks.vNodeWithElm());
      expect(typestyle.style.mock.calls.length).toBe(1);
    });

    it('updates the className on create', () => {
      const node = mocks.vNodeWithElm();
      module.create(mocks.vNodeWithElm(), node);
      expect(node.elm.class).toBe(mocks.hashedClassName());
    });

    it('removes a given style element on create', () => {
      const element = document.createElement('style');
      element.id = mocks.styleElementSelector().replace('#', '');
      document.head.appendChild(element);

      module.create(mocks.vNodeWithElm(), mocks.vNodeWithElm());
      expect(document.head.contains(element)).toBe(false);
    });
  });
});

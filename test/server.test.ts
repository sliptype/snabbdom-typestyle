import * as typestyle from 'typestyle';
import * as server from '../src/server';
import * as utils from '../src/utils';
import * as mocks from './mocks';

describe('serverSideCssModule', () => {
  it('updates the class attribute', () => {
    const attributes = new Map();
    server.serverSideCssModule(mocks.vNode(), attributes);
    expect(attributes.get('class')).toBe(mocks.hashedClassName());
  });
});

describe('collectStyles', () => {
  it('returns the aggregated styles for all nodes', () => {
    const result = server.collectStyles(mocks.vNodeWithChildren());
    expect(result).toBe(mocks.collectedStyles());
  });
});

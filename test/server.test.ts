import * as server from '../src/server';
import * as mocks from './mocks';

describe('serverSideCssModule', () => {
  it('updates the class', () => {
    const node = mocks.vNode();
    const attributes = new Map();
    server.serverSideCssModule(node, attributes);
    expect(node.data.class[mocks.hashedClassName()]).toBe(true);
  });
});

describe('collectStyles', () => {
  it('returns the aggregated styles for all nodes', () => {
    const result = server.collectStyles(mocks.vNodeWithChildren());
    expect(result).toBe(mocks.collectedStyles());
  });
});

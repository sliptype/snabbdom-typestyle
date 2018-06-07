import { Module } from 'snabbdom/modules/module';
import { default as cssModule, makeModule } from './client';

export * from './types';
export * from './server';

export const makeClientSideCssModule = makeModule;
export default cssModule;

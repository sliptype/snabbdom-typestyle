import { Module } from 'snabbdom/modules/module';
import { default as cssModule } from './client';
export * from './types';
export * from './server';
export declare const makeClientSideCssModule: (styleElementSelector?: string | undefined) => Module;
export default cssModule;

# Snabbdom TypeStyle

[![npm](https://img.shields.io/npm/v/snabbdom-typestyle.svg)](https://www.npmjs.com/package/snabbdom-typestyle) [![CircleCI](https://img.shields.io/circleci/project/github/sliptype/snabbdom-typestyle.svg)](https://circleci.com/gh/sliptype/snabbdom-typestyle) [![Code Climate](https://img.shields.io/codeclimate/maintainability/sliptype/snabbdom-typestyle.svg)](https://codeclimate.com/github/sliptype/snabbdom-typestyle) [![Code Climate](https://img.shields.io/codeclimate/coverage/sliptype/snabbdom-typestyle.svg)](https://codeclimate.com/github/sliptype/snabbdom-typestyle)  [![license](https://img.shields.io/github/license/sliptype/snabbdom-typestyle.svg)](https://github.com/sliptype/snabbdom-typestyle/blob/master/LICENSE)

Maintainable, scalable, and elegant styling with [Snabbdom](https://github.com/snabbdom/snabbdom) + [TypeStyle](https://github.com/typestyle/typestyle)
* All the power and benefits of [TypeStyle](https://github.com/typestyle/typestyle)
* Internal handling of classname mapping
* Server-side rendering support

## Installation

```bash
npm install snabbdom-typestyle
```

## Usage

Simply pass `css` to your [Snabbdom](https://github.com/snabbdom/snabbdom) virtual node!

```js
  import { Style } from 'snabbdom-typestyle';

  function view() {

      const buttonStyle: Style = {
          color: 'blue'
      };

      return (
          <button css={ buttonStyle }>
              My Button
          </button>
      );
  }
```
The **CssModule** is essentially a wrapper around [TypeStyle style](https://typestyle.github.io/#/core/-style-) and can be passed either a single `NestedCssProperties` or an array of `NestedCssProperties` (or `Style`, which is an alias provided by [snabbdom-typestyle](https://github.com/sliptype/snabbdom-typestyle)).

Make sure to pass the **CssModule** *before* the **ClassModule** when initializing [Snabbdom](https://github.com/snabbdom/snabbdom).

```js
  import { init } from 'snabbdom';
  import CssModule from 'snabbdom-typestyle';
  import ClassModule from 'snabbdom/modules/class';

  const modules = [
    CssModule,
    ClassModule
  ];

  const patch = init(modules);
```

Or, if you are using [Cycle.js](https://github.com/cyclejs/cyclejs) pass `modules` in the options of `makeDOMdriver`.
```js
run(main, { DOM: makeDOMDriver('#root', { modules }) });
```

For examples, take a look at [this fork](https://github.com/sliptype/todomvc-cycle) of the Cycle.js Todo-MVC implementation which uses [snabbdom-typestyle](https://github.com/sliptype/snabbdom-typestyle).

## Server-side Rendering
To use `snabbdom-typestyle` in a server-side rendered environment, initialize [Snabbdom](https://github.com/snabbdom/snabbdom) with the `serverSideCssModule`.

```js
import { serverSideCssModule, collectStyles } from 'snabbdom-typestyle';
import modulesForHTML from 'snabbdom-to-html/modules';
import { h } from 'snabbdom';

const modules = [
  serverSideCssModule,
  modulesForHTML.class
];

const patch = init(modules);
```

When you are rendering your html, you can grab the styles via `collectStyles(node: VNode): String`.

```js
h('style#styles', collectStyles(vtree));
```

Then, on the client-side, pass a selector for the style element rendered by the server to `makeClientSideCssModule(styleElementSelector: string | undefined)`. 

Doing this avoids duplication of the style element when the application is hydrated.

```js
import { makeClientSideCssModule } from 'snabbdom-typestyle';
import ClassModule from 'snabbdom/modules/class';

const modules = [
  makeClientSideCssModule('#styles'),
  ClassModule
];
```

Take a look at the [Cycle.js example here](https://github.com/sklingler93/cyclejs/tree/master/examples/advanced/isomorphic)

## License

MIT

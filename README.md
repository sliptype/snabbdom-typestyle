# Snabbdom TypeStyle
Use [TypeStyle](https://github.com/typestyle/typestyle) with [Snabbdom](https://github.com/snabbdom/snabbdom)!
* All the power and benefits of TypeStyle
* Classname mapping is handled internally

## Installation

With [`npm`](https://www.npmjs.com/) do:

```bash
npm install snabbdom-typestyle
```

## Usage

Simply pass `css` to your snabbdom virtual node!

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
The css module is essentially a wrapper around [TypeStyle style](https://typestyle.github.io/#/core/-style-) and accepts the same arguments: Any number of `NestedCssProperties`

Make sure to pass the CSS module, along with the Props and Attributes modules, when initializing snabbdom

```js
  import { init } from 'snabbdom';
  import PropsModule from 'snabbdom/modules/props';
  import AttrsModule from 'snabbdom/modules/attributes';
  import CssModule from 'snabbdom-typestyle';

  const modules: Array<Module> = [
    PropsModule,
    AttrsModule,
    CssModule
  ];

  const patch = init(modules);
```

OR, if you are using [Cycle.js](https://github.com/cyclejs/cyclejs) pass `modules` to `makeDOMdriver`
```js
  run(main, {
      DOM: makeDOMDriver('#root', { modules })
    });
```

## Serverside Rendering
To use `snabbdom-typestyle` in a serverside rendered environment, initialize snabbdom with the `serverSideCssModule`

```js
import { serverSideCssModule, collectStyles } from 'snabbdom-typestyle';
import modulesForHTML from 'snabbdom-to-html/modules';
import { html, head, title, body, div, script, style, makeHTMLDriver } from '@cycle/dom';
import { h } from 'snabbdom';

const modules = [
  modulesForHTML.attributes,
  modulesForHTML.props,
  modulesForHTML.class,
  modulesForHTML.style,
  serverSideCssModule
];

const patch = init(modules);
```

Then, when you are rendering your html, you can grab the styles via `collectStyles(node: VNode): String`

```js
collectStyles(vtree)
```

Take a look at the [Cycle.js example here](https://github.com/sklingler93/cyclejs/tree/master/examples/advanced/isomorphic)

## License

MIT

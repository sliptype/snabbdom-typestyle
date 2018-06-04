# Snabbdom TypeStyle
💎 Snabbdom module for [TypeStyle](https://github.com/typestyle/typestyle)

Key Features:
* All the power and benefits of TypeStyle
* className mapping is handled internally

# Installation

```
npm install --save snabbdom-typestyle
```

# Usage


Pass the CSS module, along with the Props and Attributes modules, when initializing snabbdom:

```
  import { init } from 'snabbdom';
  import PropsModule from 'snabbdom/modules/props';
  import AttrsModule from 'snabbdom/modules/attributes';
  import CssModule from 'snabbdom-typestyle';

  const modules = [
    PropsModules,
    AttrsModule,
    CssModule
  ];

  const patch = init(modules);
```

OR, if you are using [Cycle.js](https://github.com/cyclejs/cyclejs) pass `modules` to `makeDOMdriver` like so:
```
  run(main, {
      DOM: makeDOMDriver('#root', { modules })
    });
```

Pass `css` to your snabbdom virtual node like so:

```
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

# Serverside Rendering

🚧 Under construction
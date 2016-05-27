[![By:Economist](
  https://img.shields.io/badge/By-Economist-e3120b.svg?style=flat-square
)](
  http://www.economist.com/
)[![Build Status](
  https://img.shields.io/npm/v/@economist%2Fcomponent-accordion.svg?style=flat-square
)](
  https://www.npmjs.com/package/@economist%2Fcomponent-accordion
)[![Build Status](
  https://img.shields.io/travis/economist-components/component-accordion/master.svg?style=flat-square
)](
  https://travis-ci.org/economist-components/component-accordion/branches
)[![Coverage Status](
  https://img.shields.io/coveralls/economist-components/component-accordion/master.svg?style=flat-square
)](
  https://coveralls.io/github/economist-components/component-accordion?branch=master
)

# Accordion
> Collapse a series of panels, when one of those panels is expanded

## Usage

**This component expects an ES6 environment**, and so if you are using this in an app,
you should drop in a polyfill library - it has been tested with [babel-polyfill] but
[core-js] or [es6-shim] may also work.

[babel-polyfill]: https://babeljs.io/docs/usage/polyfill/
[core-js]: https://www.npmjs.com/package/core-js
[es6-shim]: https://www.npmjs.com/package/es6-shim

The default export is a React Component, so you can simply import the component and use
it within some JSX, like so:

```js
import { Accordion, Panel } from '@economist/component-accordion';

return (
  <Accordion>
    <Panel header={<h2>Search Engines</h2>}>
      <a href="http://google.com">Google</a>
      <a href="http://bing.com">Bing</a>
      <a href="http://yahoo.com">Yahoo</a>
    </Panel>
  </Accordion>
);
```

For more examples on usage, see [`src/example.es6`](./src/example.es6).

## Install

```bash
npm i -S @economist/component-accordion
```

## Run tests

```bash
npm test
```

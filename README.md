# goodgraphics

[![npm version](https://badge.fury.io/js/goodgraphics.svg)](https://badge.fury.io/js/goodgraphics)

A library for creating svgs. Learn more at [goodgraphics.xyz/about](https://goodgraphics.xyz/about).

Pros

- chainable api
- zero dependencies
- made with ❤️

Cons

- none! :)

### Install

```
npm i goodgraphics
```

### Use

```js
const svg = new Graphic({
  attributes: {
    fill: 'white',
    style: 'background: #1b1b1b',
  },
});

svg.circle('50%', '50%', 50).draw();
```

## Methods

### class Graphic () { }

`constructor({attributes, height, width, target})` - tk

tk

### draw() { }

tk

### remove() { }

tk

### redraw() { }

tk

### circle(x, y, d, opts) { }

tk

### rect(x, y, height, width, opts) { }

tk

### square(x, y, size, opts) { }

tk

### line() { }

tk

### polyline() { }

tk

### map(number, inMin, inMax, outMin, outMax) { }

tk

### spline() { }

tk

### times(number, draw) { }

tk

### grid(cols, rows, draw) { }

tk

# goodgraphics

[![npm version](https://badge.fury.io/js/goodgraphics.svg)](https://badge.fury.io/js/goodgraphics)

A library for creating svgs. Learn more at [goodgraphics.xyz/about](https://goodgraphics.xyz/about).

Pros

- chainable api
- zero dependencies
- made with ❤️

Cons

- none! :)

## Table of contents

- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)

## Usage

### Install

npm

```
npm i goodgraphics
```

unpkg

```
<script src="https://unpkg.com/goodgraphics"></script>
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

## API

### `new Graphic(options)`

Creates a new instance for all drawing methods. `options` is a JavaScript object with the following properties:

- `@param {String} container` Selector or DOM element used as container for the SVG. Defaults to 'body'.
- `@param {Number} height` Height of the svg. Defaults to 200.
- `@param {Number} width` Width of the svg. Defaults to 200.
- `@param {Object} attributes` tk.

### `draw()`

Draws the svg.

### `remove()`

Removes the svg.

### `redraw()`

Re-draws the svg.

### `circle(x, y, radius, opts)`

- `@param {String | Number} x` The x position for the shape.
- `@param {String | Number} y` The y position for the shape.
- `@param {String | Number} radius` The radius of the shape.
- `@param {String | Number} opts` tk.

### `ellipse(x, y, width, height, opts)`

- `@param {String | Number} x` The x position for the shape.
- `@param {String | Number} y` The y position for the shape.
- `@param {String | Number} width` The width of the shape.
- `@param {String | Number} height` The height of the shape.
- `@param {String | Number} opts` tk.

### `rect(x, y, width, height, opts)`

- `@param {String | Number} x` The x position for the shape.
- `@param {String | Number} y` The y position for the shape.
- `@param {String | Number} width` The width of the shape.
- `@param {String | Number} height` The height of the shape.
- `@param {String | Number} opts` tk.

### `square(x, y, size, opts)`

- `@param {String | Number} x` The x position for the shape.
- `@param {String | Number} y` The y position for the shape.
- `@param {String | Number} size` The size of the square.
- `@param {String | Number} opts` tk.

### `line(x1, y1, x2, y2, opts)`

- `@param {String | Number} x1` The x position of the start of the line.
- `@param {String | Number} y1` The y position of the start of the line.
- `@param {String | Number} x2` The x position of the end of the line.
- `@param {String | Number} y2` The y position of the end of the line.
- `@param {String | Number} opts` tk.

### `polyline()`

tk

### `group(draw, opts)`

- `@param {Function} draw` The draw function. Called with the arguments tk.
- `@param {String | Number} opts` tk.

### `map(number, inMin, inMax, outMin, outMax)`

Maps a value from one range to another.

- `@param {Number} number` The number to map.
- `@param {Number} inMin` The min for the first range.
- `@param {Number} inMax` The max for the first range.
- `@param {Number} outMin` The min for the second range.
- `@param {Number} outMax` The max for the second range.

### `spline()`

tk

### `times(number, draw)`

Runs the draw function x number of times.

- `@param {Number} number` The number of times to run the loop.
- `@param {Function} draw` The draw function. Called with the arguments tk.

### `grid(cols, rows, draw)`

tk

## Contributing

All contributors and all contributions both big and small are welcome in this project.

# goodgraphics

[![npm version](https://badge.fury.io/js/goodgraphics.svg)](https://badge.fury.io/js/goodgraphics)

A library for creating svgs. Explore the API reference below and read the [Getting Started](https://observablehq.com/@romellogoodman/getting-started-with-goodgraphics-js?collection=@romellogoodman/good-graphics) guide for a quick walkthrough. For more examples please visit [goodgraphics.xyz](http://goodgraphics.xyz/)

## Table of contents

- [Usage](#usage)
- [API Reference](#api)
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

svg.circle('50%', '50%', 50);

svg.draw();
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

### `polyline(points, opts)`

- `@param {Array [Strings]} points` Series of points on the line.
- `@param {String | Number} opts` tk.

### `path(d, opts)`

- `@param {Array [Strings]} d` tk.
- `@param {String | Number} opts` tk.

## Helper Functions

### `add(str)`

- `@param {String} str` The string to add.

```js
// TODO: how to use tk
```

### `setAttributes(attributes)`

Update the global attributes for the svg.

- `@param {Object} attributes` An object of attributes.

### `markup()`

- `@return {String}` The html markup for the svg.

### `group(draw, opts)`

- `@param {Function} draw` The draw function. Called with the arguments tk.
- `@param {String | Number} opts` tk.

```js
// TODO: how to use tk
```

### `times(number, draw)`

Runs the draw function x number of times.

- `@param {Number} number` The number of times to run the loop.
- `@param {Function} draw` The draw function. Called with the arguments tk.

```js
// TODO: how to use tk
```

### `grid(options, draw)`

Draw items across a grid. `options` is A JavaScript object with the following properties:

- `@param {Function} draw` The draw function. Called with the arguments tk.
- `@param {Object} options` A JavaScript object with the following properties:
- `@param {Number} options.columns` The number of columns.
- `@param {Number} options.rows` The number of rows.
- `@param {Number} options.height` Height of the svg. Defaults to svg's height.
- `@param {Number} options.width` Width of the svg. Defaults to svg's width.
- `@param {Number} options.margin` tk. Defaults to 0.

tk

```js
// TODO: how to use tk
```

## Non-Chainable API Methods

The following are not chainable.

### `save(fileName, isPng)`

Save the svg as a png.

- `@param {String} fileName` The name of the file name.
- `@param {Boolean} fileName` Save the file as a `.svg` or `.png`.

### `map(number, inMin, inMax, outMin, outMax)`

Maps a value from one range to another.

- `@param {Number} number` The number to map.
- `@param {Number} inMin` The min for the first range.
- `@param {Number} inMax` The max for the first range.
- `@param {Number} outMin` The min for the second range.
- `@param {Number} outMax` The max for the second range.

### `random(min, max)`

Get a random number between two numbers.

- `@param {Number} min` The min of the range.
- `@param {Number} max` The max of the range.

### `spline(points, tension, close, callback) {)`

- `@param {Array [Object]} points` Series of points with an x and y value. Defaults to `[]`.
- `@param {Number} tension` tk. Defaults to `1`.
- `@param {Boolean} close` tk. Defaults to `false`
- `@param {Func} callback` tk.

```js
// TODO: how to use tk
```

## Contributing

All contributors and all contributions both big and small are welcome in this project.

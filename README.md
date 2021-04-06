# goodgraphics

[![npm version](https://badge.fury.io/js/goodgraphics.svg)](https://badge.fury.io/js/goodgraphics)

A library for creating SVGs. Explore the API reference below and check out these [Good Graphics Examples](https://observablehq.com/collection/@romellogoodman/good-graphics-examples). This project is part of [goodgraphics.xyz](http://goodgraphics.xyz/)

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

### Templates

For a more light-weight solution you can fork any of the following templates and get started quicker:

- [Observable Template](https://observablehq.com/@romellogoodman/goodgraphics-template)
- [Glitch Template](https://glitch.com/edit/#!/goodgraphics-template)
- [CodeSandbox Template](https://codesandbox.io/s/good-graphics-template-vc099?file=/index.html)
- [CodePen Template](https://codepen.io/romellogoodman/pen/bGBaZem)

## API

### `new Graphic(options)`

Creates a new instance for all drawing methods. `options` is a JavaScript object with the following properties:

- `@param {String} container` Selector or DOM element used as container for the SVG. Defaults to 'body'.
- `@param {Number} height` Height of the svg. Defaults to 200.
- `@param {Number} width` Width of the svg. Defaults to 200.
- `@param {String} viewBox` viewbox of the svg. Defaults to `0 0 width height`.
- `@param {Object} attributes` Key value pairs of attributes to apply to the tag.

### `draw()`

Draws the svg.

### `remove()`

Removes the svg.

### `redraw()`

Re-draws the svg.

### `circle(x, y, radius, attributes)`

- `@param {String | Number} x` The x position for the shape.
- `@param {String | Number} y` The y position for the shape.
- `@param {String | Number} radius` The radius of the shape.
- `@param {Object} attributes` Key value pairs of attributes to apply to the tag.

### `ellipse(x, y, width, height, attributes)`

- `@param {String | Number} x` The x position for the shape.
- `@param {String | Number} y` The y position for the shape.
- `@param {String | Number} width` The width of the shape.
- `@param {String | Number} height` The height of the shape.
- `@param {Object} attributes` Key value pairs of attributes to apply to the tag.

### `rect(x, y, width, height, attributes)`

- `@param {String | Number} x` The x position for the shape.
- `@param {String | Number} y` The y position for the shape.
- `@param {String | Number} width` The width of the shape.
- `@param {String | Number} height` The height of the shape.
- `@param {Object} attributes` Key value pairs of attributes to apply to the tag.

### `square(x, y, size, attributes)`

- `@param {String | Number} x` The x position for the shape.
- `@param {String | Number} y` The y position for the shape.
- `@param {String | Number} size` The size of the square.
- `@param {Object} attributes` Key value pairs of attributes to apply to the tag.

### `line(x1, y1, x2, y2, attributes)`

- `@param {String | Number} x1` The x position of the start of the line.
- `@param {String | Number} y1` The y position of the start of the line.
- `@param {String | Number} x2` The x position of the end of the line.
- `@param {String | Number} y2` The y position of the end of the line.
- `@param {Object} attributes` Key value pairs of attributes to apply to the tag.

### `polyline(points, attributes)`

- `@param {Array [Strings]} points` Series of points on the line.
- `@param {Object} attributes` Key value pairs of attributes to apply to the tag.

### `path(commands, attributes)`

- `@param {Array Strings} commands` An array of path commands.
- `@param {Object} attributes` Key value pairs of attributes to apply to the tag.

## Helper Functions

### `add(str)`

- `@param {String} str` The string to add. Note, this is sort of a "cheat" function.

### `setAttributes(attributes)`

Update the global attributes for the svg.

- `@param {Object} attributes` Key value pairs of attributes to apply to main tag

### `markup()`

- `@return {String}` The html markup for the svg.

### `group(draw, attributes)`

- `@param {Function} draw` The draw function.
- `@param {Object} attributes` Key value pairs of attributes to apply to the tag.

```js
svg.group(() => {
  svg.circle('50%', '50%', '10%');
});

svg.draw();
```

### `groupStart(attributes)`

Start the group by adding the opening tags

- `@param {Object} attributes` Key value pairs of attributes to apply to the tag.

### `groupEnd()`

End the group by adding the closing tags

### `times(number, draw, attributes)`

Runs the draw function x number of times.

- `@param {Number} number` The number of times to run the loop.
- `@param {Function} draw` The draw function.
- `@param {Object} attributes` Key value pairs of attributes to apply to the tag.

```js
const numberOfCircles = 4;

svg.times(numberOfCircles, (index) => {
  svg.circle(`${(index + 1) * 20}%`, '50%', '10%');
});

svg.draw();
```

### `grid(options, draw, attributes)`

Draw items across a grid. `options` is A JavaScript object with the following properties:

- `@param {Function} draw` The draw function.
- `@param {Object} options` A JavaScript object with the following properties:
- `@param {Number} options.columns` The number of columns.
- `@param {Number} options.rows` The number of rows.
- `@param {Number} options.height` Height of the svg. Defaults to svg's height.
- `@param {Number} options.width` Width of the svg. Defaults to svg's width.
- `@param {Number} options.margin` Margin between the edges and the grid. Defaults to 0.
- `@param {String | Number} options.x` The x position for the grid.
- `@param {String | Number} options.y` The y position for the grid.
- `@param {Object} attributes` Key value pairs of attributes to apply to the tag.

```js
svg.grid({columns: 2, rows: 2, margin: 20}, (item) => {
  const {posX, posY, cellWidth} = item;

  svg.square(posX, posY, cellWidth);
});

svg.draw();
```

### `save(fileName, isPng)`

Save the svg as a png.

- `@param {String} fileName` The name of the file name.
- `@param {Boolean} fileName` Save the file as a `.svg` or `.png`.

### lerp(a, b, percent)

Find the middle number between two numbers.

```js
lerp(0, 100, 0.5); // returns 50
```

### lerpColor()

Find the middle color between two (hex format) colors.

```js
lerpColor('#000000', '#ffffff', 0.5); // returns #7F7F7F
```

### degrees(radians)

Convert a number radians to degrees

### radians(degrees)

Convert a number degrees to radians

### constrain(amount, min, max)

Constrain a number between two numbers;

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

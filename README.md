# goodvg

A library for scripting html. [Learn more](https://mellogood.substack.com/p/goodgraphicsjs) about this library.

## Use

```js
const svg = new Graphic({
  attributes: {
    fill: "white",
    style: "background: #1b1b1b",
  },
});

svg.circle("50%", "50%", 50);
```

## Graphic API

### `new Graphic(options)`

Creates a new instance for all drawing methods. `options` is a JavaScript object with the following properties:

- `@param {String} container` Selector or DOM element used as container for the SVG. Defaults to 'body'.
- `@param {Number} height` Height of the svg. Defaults to 200.
- `@param {Number} width` Width of the svg. Defaults to 200.
- `@param {String} viewBox` viewbox of the svg. Defaults to `0 0 width height`.
- `@param {Object} attributes` Key value pairs of attributes to apply to the tag.
- `@param {Object} template` The type of Graphic, Options: `html`, `svg` (Default).

### `draw()`

Draws the svg.

### `remove()`

Removes the svg.

### `redraw()`

Re-draws the svg.

### `empty()`

Empties the markup and resets the Graphic's contents.

## HTML Element/Tag API

### `$tag(content, attributes)`

The library supports a majorty of html tags as the primary interface. For all of them we attempt to guess the location of where to add the tag in either the head or body. These functions are a wrapper around `this.head` and `this.body`. Note: In the future we might need to add functionality to allow people to choose the location.

- `@param {String} content` The content of the element.
- `@param {Object} attributes` Key value pairs of attributes to apply to the tag.

To nest elements pass content as a function.

```js
const page = new SCRIPT();

page.ul(() => {
  page.li([
    //
    page.span("item"),
    page.span("1"),
  ]);

  page.li("item 2");

  page.li("item 3");
});
```

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

### `triangle(x, y, height, attributes)`

NOTE: Using translate in `attributes.transform` might collide with the translation that the shape naturally does.

- `@param {String | Number} x` The x position for the shape.
- `@param {String | Number} y` The y position for the shape.
- `@param {String | Number} size` The size of the triangle.
- `@param {Object} attributes` Key value pairs of attributes to apply to the tag.

### `polygon(points, attributes)`

- `@param {Array [Strings]} points` Series of points to form the shape.
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

### `group(draw, attributes)`

Group the markup into a div or g element based on the Graphic's template.

- `@param {Function} draw` The draw function.
- `@param {Object} attributes` Key value pairs of attributes to apply to the tag.

```js
svg.group(() => {
  svg.circle("50%", "50%", "10%");
});

svg.draw();
```

### `head(content)` and `body(content)`

### `setAttributes(attributes)`

Update the global attributes for the Graphic in the top-level svg ot html tag.

Manually add markup to `this.content.$location`. Note, this is sort of a "cheat/catch-all" function.

## Helper Functions

### `times(number, draw, attributes)`

Runs the draw function x number of times.

- `@param {Number} number` The number of times to run the loop.
- `@param {Function} draw` The draw function.
- `@param {Object} attributes` Key value pairs of attributes to apply to the tag.

```js
const numberOfCircles = 4;

svg.times(numberOfCircles, (index) => {
  svg.circle(`${(index + 1) * 20}%`, "50%", "10%");
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
svg.grid({ columns: 2, rows: 2, margin: 20 }, (item) => {
  const { posX, posY, cellWidth } = item;

  svg.square(posX, posY, cellWidth);
});

svg.draw();
```

### `markup()`

- `@return {String}` The html markup for the Graphic.

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

### `lerp(a, b, percent)`

Find the middle number between two numbers.

```js
lerp(0, 100, 0.5); // returns 50
```

### `lerpColor()`

Find the middle color between two (hex format) colors.

```js
lerpColor("#000000", "#ffffff", 0.5); // returns #7F7F7F
```

### `degrees(radians)`

Convert a number radians to degrees

### `radians(degrees)`

Convert a number degrees to radians

## Contributing

All contributors and all contributions both big and small are welcome in this project.

## Author

[Romello Goodman](https://www.romellogoodman.com/)

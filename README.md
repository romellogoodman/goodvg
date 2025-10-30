# goodvg

A simple, chainable JavaScript library for creating SVG and HTML graphics. [Learn more](https://mellogood.substack.com/p/goodgraphicsjs) about this library.

## Quick Start

```js
const svg = new Graphic({
  attributes: {
    fill: "white",
    style: "background: #1b1b1b",
  },
});

svg.circle("50%", "50%", 50);

svg.draw();
```

## API Reference

### Constructor

#### `new Graphic(options)`

Creates a new Graphic instance.

**Parameters:**
- `options` (Object) - Configuration options
  - `container` (string) - CSS selector for the container element (default: `'body'`)
  - `width` (number) - Width of the graphic (default: `1200`)
  - `height` (number) - Height of the graphic (default: `1200`)
  - `viewBox` (string) - SVG viewBox attribute (default: `'0 0 {width} {height}'`)
  - `template` (string) - Template type: `'svg'` or `'html'` (default: `'svg'`)
  - `attributes` (Object) - Additional attributes for the root element

**Example:**
```js
const svg = new Graphic({
  container: '#my-container',
  width: 800,
  height: 600,
  attributes: {
    fill: 'none',
    stroke: 'black'
  }
});
```

### Core Methods

#### `draw()`
Renders the graphic to the DOM container.

**Returns:** `Graphic` instance for chaining

#### `remove()`
Removes the graphic from the DOM.

**Returns:** `Graphic` instance for chaining

#### `redraw()`
Removes and redraws the graphic.

**Returns:** `Graphic` instance for chaining

#### `empty()`
Clears all content from the graphic.

**Returns:** `Graphic` instance for chaining

#### `markup()`
Returns the complete HTML/SVG markup as a string.

**Returns:** `string`

#### `setAttributes(attributes)`
Sets or updates attributes on the root element.

**Parameters:**
- `attributes` (Object) - Attributes to set or merge

**Returns:** `Graphic` instance for chaining

### Content Methods

#### `head(str)`
Adds content to the head section (for SVG: defs, styles, etc.)

**Parameters:**
- `str` (string) - Content to add

**Returns:** `Graphic` instance for chaining

**Example:**
```js
svg.head('<style>.my-class { fill: red; }</style>');
```

#### `body(str)`
Adds raw content to the body section.

**Parameters:**
- `str` (string) - Content to add

**Returns:** `Graphic` instance for chaining

### Shape Methods

All shape methods support method chaining and accept an optional `attributes` parameter for additional SVG attributes like `fill`, `stroke`, `stroke-width`, `class`, etc.

#### `circle(x, y, radius, attributes)`
Draws a circle.

**Parameters:**
- `x` (number) - X-coordinate of the center
- `y` (number) - Y-coordinate of the center
- `radius` (number) - Radius of the circle
- `attributes` (Object) - Additional SVG attributes

**Example:**
```js
svg.circle(100, 100, 50, { fill: 'red', stroke: 'black' });
```

#### `ellipse(x, y, width, height, attributes)`
Draws an ellipse.

**Parameters:**
- `x` (number) - X-coordinate of the center
- `y` (number) - Y-coordinate of the center
- `width` (number) - Horizontal radius (rx)
- `height` (number) - Vertical radius (ry)
- `attributes` (Object) - Additional SVG attributes

#### `rect(x, y, width, height, attributes)`
Draws a rectangle.

**Parameters:**
- `x` (number) - X-coordinate of the top-left corner
- `y` (number) - Y-coordinate of the top-left corner
- `width` (number) - Width of the rectangle
- `height` (number) - Height of the rectangle
- `attributes` (Object) - Additional SVG attributes

#### `square(x, y, size, attributes)`
Draws a square (convenience method).

**Parameters:**
- `x` (number) - X-coordinate of the top-left corner
- `y` (number) - Y-coordinate of the top-left corner
- `size` (number) - Width and height of the square
- `attributes` (Object) - Additional SVG attributes

#### `triangle(x, y, size, attributes)`
Draws an equilateral triangle.

**Parameters:**
- `x` (number) - X-coordinate of the center
- `y` (number) - Y-coordinate of the center
- `size` (number) - Size of the triangle (base width)
- `attributes` (Object) - Additional SVG attributes

#### `line(x1, y1, x2, y2, attributes)`
Draws a line.

**Parameters:**
- `x1`, `y1` (number) - Start point coordinates
- `x2`, `y2` (number) - End point coordinates
- `attributes` (Object) - Additional SVG attributes

**Example:**
```js
svg.line(0, 0, 100, 100, { stroke: 'blue', 'stroke-width': 2 });
```

#### `path(d, attributes)`
Draws a path using SVG path commands.

**Parameters:**
- `d` (string) - SVG path data (e.g., `"M 10 10 L 20 20"`)
- `attributes` (Object) - Additional SVG attributes

#### `polyline(points, attributes)`
Draws a polyline (series of connected lines).

**Parameters:**
- `points` (Array|string) - Array of `[x, y]` coordinates or string of points
- `attributes` (Object) - Additional SVG attributes

#### `polygon(points, attributes)`
Draws a polygon (closed shape).

**Parameters:**
- `points` (Array|string) - Array of `[x, y]` coordinates or string of points
- `attributes` (Object) - Additional SVG attributes

#### `group(content, attributes)`
Creates a group element (SVG `<g>` or HTML `<div>`).

**Parameters:**
- `content` (Function|string) - Content to nest within the group
- `attributes` (Object) - Additional attributes for the group

**Example:**
```js
svg.group(() => {
  svg.circle(50, 50, 25);
  svg.circle(150, 50, 25);
}, { transform: 'rotate(45)' });
```

### Save Methods

#### `save(fileName, isPng, opts)`
Saves the graphic as SVG or PNG.

**Parameters:**
- `fileName` (string) - Name for the downloaded file
- `isPng` (boolean) - Whether to save as PNG (`true`) or SVG (`false`)
- `opts` (Object) - Options for PNG export
  - `width` (number) - Width for PNG (default: 2x graphic width)
  - `height` (number) - Height for PNG (default: 2x graphic height)

**Example:**
```js
// Save as SVG
svg.save('my-graphic.svg', false);

// Save as PNG with custom size
svg.save('my-graphic.png', true, { width: 2400, height: 2400 });
```

#### `saveSVG(fileName, svgText, opts)`
Saves the graphic as an SVG file.

#### `savePNG(fileName, svgText, opts)`
Saves the graphic as a PNG file.

## Examples

### Basic Shapes
```js
const svg = new Graphic({ width: 800, height: 600 });

svg
  .circle(100, 100, 50, { fill: 'red' })
  .rect(200, 50, 100, 100, { fill: 'blue' })
  .triangle(400, 100, 80, { fill: 'green' })
  .draw();
```

### Using Styles
```js
const svg = new Graphic({
  attributes: {
    style: {
      background: '#1b1b1b',
      border: '1px solid white'
    }
  }
});

svg
  .circle(400, 300, 100, {
    fill: 'yellow',
    stroke: 'orange',
    'stroke-width': 5
  })
  .draw();
```

### Method Chaining
```js
const svg = new Graphic();

svg
  .empty()
  .setAttributes({ fill: 'none', stroke: 'black', 'stroke-width': 2 })
  .line(0, 300, 1200, 300)
  .line(600, 0, 600, 1200)
  .circle(600, 300, 200)
  .redraw();
```

### Using Groups
```js
const svg = new Graphic();

svg.group(() => {
  svg.circle(200, 200, 50);
  svg.circle(300, 200, 50);
  svg.circle(250, 150, 50);
}, {
  fill: 'purple',
  transform: 'translate(100, 100)'
});

svg.draw();
```

### Custom Styles in Head
```js
const svg = new Graphic();

svg.head(`
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
    </linearGradient>
  </defs>
`);

svg
  .rect(100, 100, 200, 200, { fill: 'url(#gradient)' })
  .draw();
```

### Saving Graphics
```js
const svg = new Graphic();

svg
  .circle(600, 300, 200, { fill: 'coral' })
  .draw();

// Download as SVG
document.querySelector('#save-svg').addEventListener('click', () => {
  svg.save('my-circle.svg', false);
});

// Download as PNG
document.querySelector('#save-png').addEventListener('click', () => {
  svg.save('my-circle.png', true, { width: 3600, height: 2400 });
});
```

## Contributing

All contributors and all contributions both big and small are welcome in this project.

## Author

[Romello Goodman](https://www.romellogoodman.com/)

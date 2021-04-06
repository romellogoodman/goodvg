/**
 ********************
 * Utils
 ********************
 */

const className = 'goodgraphics';

const convertAttributes = (attribs = {}) => {
  let result = '';

  Object.keys(attribs).forEach((attrib) => {
    const property = attribs[attrib];

    result += ` ${attrib}="${property}"`;
  });

  return result;
};

const downloadURL = (name, url) => {
  const link = document.createElement('a');

  link.download = name;
  link.href = url;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default class Graphic {
  constructor({attributes, container, height, width, viewBox} = {}) {
    const funcs = [
      'add',
      'circle',
      'constrain',
      'degrees',
      'draw',
      'ellipse',
      'group',
      'groupEnd',
      'groupStart',
      'lerp',
      'lerpColor',
      'line',
      'map',
      'markup',
      'path',
      'polyline',
      'radians',
      'random',
      'rect',
      'redraw',
      'remove',
      'save',
      'savePNG',
      'saveSVG',
      'setAttributes',
      'spline',
      'square',
      'times',
    ];

    funcs.forEach((func) => {
      this[func] = this[func].bind(this);
    });

    this.contents = [];
    this.height = height || 200;
    this.width = width || 200;
    this.viewBox = viewBox || `0 0 ${width} ${height}`;
    this.container = container || 'body';
    this.attributes = attributes || {};
  }

  /**
   * Main Functions
   */

  draw() {
    if (typeof window === 'undefined' || !window || !window.document) return;

    const container = document.querySelector(this.container);

    if (container) {
      container.innerHTML = this.markup();
    } else {
      console.log('WARN: no container');
    }

    return this;
  }

  add(str) {
    this.contents.push(str);

    return this;
  }

  remove() {
    const selector = `${this.container} .goodgraphics`;
    const element = document.querySelector(selector);

    if (element) {
      element.remove();
    } else {
      console.log(
        `WARN: unable to remove element. Check your selector: ${selector}`
      );
    }

    return this;
  }

  redraw() {
    this.remove();
    this.draw();

    return this;
  }

  /**
   * Shapes Functions
   */

  circle(x, y, radius, opts = {}) {
    this.add(
      `<circle
        cx="${x}" cy="${y}"
        r="${radius}"
        ${convertAttributes(opts)}
      />`
    );

    return this;
  }

  ellipse(x, y, width, height, opts = {}) {
    this.add(
      `<ellipse
        cx="${x}" cy="${y}"
        rx="${width}" ry="${height}"
        ${convertAttributes(opts)}
      />`
    );
  }

  rect(x, y, width, height, opts = {}) {
    this.add(
      `<rect
        x="${x}" y="${y}"
        height="${height}" width="${width}"
        ${convertAttributes(opts)}
      />`
    );

    return this;
  }

  square(x, y, size, opts = {}) {
    this.rect(x, y, size, size, opts);

    return this;
  }

  path(d, opts = {}) {
    this.add(`<path d="${d}" ${convertAttributes(opts)}/>`);

    return this;
  }

  line(x1, y1, x2, y2, opts = {}) {
    this.add(
      `<line
        x1="${x1}" y1="${y1}"
        x2="${x2}" y2="${y2}"
        ${convertAttributes(opts)}
      />`
    );

    return this;
  }

  polyline(points, opts = {}) {
    this.add(`<polyline points="${points}" ${convertAttributes(opts)} />`);

    return this;
  }

  group(draw, opts = {}) {
    this.add(`<g ${convertAttributes(opts)}>`);

    draw();

    this.add('</g>');

    return this;
  }

  groupStart(opts = {}) {
    this.add(`<g ${convertAttributes(opts)}>`);

    return this;
  }

  groupEnd() {
    this.add('</g>');

    return this;
  }

  setAttributes(attributes = {}) {
    this.attributes = {...this.attributes, ...attributes};

    return this;
  }

  /**
   * Loop Functions
   */
  times(number, draw, opts = {}) {
    this.groupStart(opts);

    for (let index = 0; index < number; index++) {
      draw(index);
    }

    this.groupEnd();

    return this;
  }

  grid(
    {
      x,
      y,
      columns,
      rows,
      height = this.height,
      width = this.width,
      margin = 0,
    } = {},
    draw,
    opts = {}
  ) {
    const at = {};

    if (x && y && !opts.transform) {
      at.transform = `translate(${x}, ${y})`;
    }

    this.groupStart({...opts, ...at});

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const halfMargin = margin / 2;
        const posX = this.map(col, 0, columns, halfMargin, width - halfMargin);
        const posY = this.map(row, 0, rows, halfMargin, height - halfMargin);
        const cellHeight = (height - margin) / rows;
        const cellWidth = (width - margin) / columns;

        draw({
          colIndex: col,
          rowIndex: row,
          posX,
          posY,
          cellHeight,
          cellWidth,
        });
      }
    }

    this.groupEnd();

    return this;
  }

  /**
   * Helper Functions
   */

  markup() {
    return `
      <svg
        xmlns="http://www.w3.org/2000/svg" class="${className}"
        height="${this.height}" width="${this.width}"
        viewBox="${this.viewBox}"
        ${convertAttributes(this.attributes)}
      >
        ${this.contents.join('\n')}
      </svg>
      `;
  }

  save(fileName, isPng, opts = {}) {
    const svg = document.querySelector(`${this.container} .${className}`);
    const svgText = `data:image/svg+xml;utf8,${encodeURIComponent(
      svg.outerHTML
    )}`;

    if (isPng) {
      this.savePNG(fileName, svgText, opts);
    } else {
      this.saveSVG(fileName, svgText, opts);
    }
  }

  saveSVG(fileName, svgText, opts = {}) {
    const link = document.createElement('a');

    link.setAttribute('href', svgText);
    link.setAttribute('download', fileName);

    link.style.display = 'none';
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }

  savePNG(fileName, svgText, opts = {}) {
    const img = new Image();

    img.onload = function () {
      const canvas = document.createElement('canvas');
      const height = opts.height || this.height * 2;
      const width = opts.width || this.width * 2;

      canvas.height = height;
      canvas.width = width;

      canvas.getContext('2d').drawImage(img, 0, 0, width, height);

      const url = canvas.toDataURL('image/png');

      downloadURL(fileName, url);
    };

    // NOTE: Another way to encode the svg
    // const xml = new XMLSerializer().serializeToString(svg);
    // const svg64 = btoa(xml); //for utf8: btoa(unescape(encodeURIComponent(xml)))
    // const b64start = 'data:image/svg+xml;base64,';
    // const b64start = 'data:image/svg+xml;charset=utf-8,';
    // const image64 = b64start + svg64;
    // img.src = image64;

    img.src = svgText;
  }

  // Math helpers
  lerp(a, b, percent) {
    return a * (1 - percent) + b * percent;
  }

  constrain(amount, min, max) {
    if (amount < min) return min;
    if (amount > max) return max;

    return amount;
  }

  radians(degrees) {
    return (degrees / 360) * (Math.PI * 2);
  }

  degrees(radians) {
    return (radians / (Math.PI * 2)) * 360;
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Map a number from one range to another range
   * https://gist.github.com/xposedbones/75ebaef3c10060a3ee3b246166caab56
   */
  map(number, inMin, inMax, outMin, outMax) {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  /**
   * Taken from https://gist.github.com/rosszurowski/67f04465c424a9bc0dae
   * A linear interpolator for hexadecimal colors
   *
   * @param {String} colorA
   * @param {String} colorB
   * @param {Number} amount
   * @returns {String}
   */
  lerpColor(colorA, colorB, amount) {
    const ah = parseInt(colorA.replace(/#/g, ''), 16);
    const ar = ah >> 16;
    const ag = (ah >> 8) & 0xff;
    const ab = ah & 0xff;
    const bh = parseInt(colorB.replace(/#/g, ''), 16);
    const br = bh >> 16;
    const bg = (bh >> 8) & 0xff;
    const bb = bh & 0xff;
    const rr = ar + amount * (br - ar);
    const rg = ag + amount * (bg - ag);
    const rb = ab + amount * (bb - ab);

    return (
      '#' +
      (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1)
    );
  }

  /**
   * Generate a smooth continuous curve based on the points, using bezier curves.
   * spline() will return an svg path-data string. The arguments are (points, tension, close).
   * Play with tension and check out the effect!
   * https://github.com/georgedoescode/splinejs/blob/main/spline.js
   */
  spline(points = [], tension = 1, close = false, callback) {
    function formatPoints(points, close) {
      points = [...points];
      // so that coords can be passed as objects or arrays
      if (!Array.isArray(points[0])) {
        points = points.map(({x, y}) => [x, y]);
      }

      if (close) {
        const lastPoint = points[points.length - 1];
        const secondToLastPoint = points[points.length - 2];

        const firstPoint = points[0];
        const secondPoint = points[1];

        points.unshift(lastPoint);
        points.unshift(secondToLastPoint);

        points.push(firstPoint);
        points.push(secondPoint);
      }

      return points.flat();
    }

    points = formatPoints(points, close);

    const size = points.length;
    const last = size - 4;

    const startPointX = close ? points[2] : points[0];
    const startPointY = close ? points[3] : points[1];

    let path = 'M' + [startPointX, startPointY];

    if (callback) {
      callback('MOVE', [startPointX, startPointY]);
    }

    const startIteration = close ? 2 : 0;
    const maxIteration = close ? size - 4 : size - 2;
    const inc = 2;

    for (let i = startIteration; i < maxIteration; i += inc) {
      const x0 = i ? points[i - 2] : points[0];
      const y0 = i ? points[i - 1] : points[1];

      const x1 = points[i + 0];
      const y1 = points[i + 1];

      const x2 = points[i + 2];
      const y2 = points[i + 3];

      const x3 = i !== last ? points[i + 4] : x2;
      const y3 = i !== last ? points[i + 5] : y2;

      const cp1x = x1 + ((x2 - x0) / 6) * tension;
      const cp1y = y1 + ((y2 - y0) / 6) * tension;

      const cp2x = x2 - ((x3 - x1) / 6) * tension;
      const cp2y = y2 - ((y3 - y1) / 6) * tension;

      path += 'C' + [cp1x, cp1y, cp2x, cp2y, x2, y2];

      if (callback) {
        callback('CURVE', [cp1x, cp1y, cp2x, cp2y, x2, y2]);
      }
    }

    return path;
  }
}

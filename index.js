import {convertAttributes} from './utils';

export default class Graphic {
  constructor({attributes, container, height, width} = {}) {
    // const helpers = {map, spline, times};

    // Object.keys(helpers).forEach((helper) => {
    //   this[helper] = (...opts) => {
    //     helpers[helper](opts);

    //     return this;
    //   };
    // });

    const funcs = [
      'add',
      'circle',
      'draw',
      'grid',
      'line',
      'map',
      'polyline',
      'rect',
      'redraw',
      'remove',
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
    this.container = container || 'body';
    this.attributes = attributes || {};
  }

  /**
   * Main Functions
   */

  draw() {
    const container = document.querySelector(this.container);
    const getMarkup = (contents) => {
      return `
      <svg
        xmlns="http://www.w3.org/2000/svg" class="goodgraphics"
        height="${this.height}" width="${this.width}"
        ${convertAttributes(this.attributes)}
      >
        ${contents.join('\n')}
      </svg>
      `;
    };

    if (container) {
      container.innerHTML = getMarkup(this.contents);
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
    document.querySelector(`${this.container} .goodgraphics`).remove();

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

  circle(x, y, d, opts = {}) {
    this.add(
      `<circle
        cx="${x}" cy="${y}"
        r=${d / 2}
        ${convertAttributes(opts)}
      />`
    );

    return this;
  }

  rect(x, y, height, width, opts = {}) {
    this.add(
      `<rect
        x="${x}px" y="${y}px"
        height="${height}px" width="${width}px"
        ${convertAttributes(opts)}
      />`
    );

    return this;
  }

  square(x, y, size, opts = {}) {
    this.rect(x, y, size, size, opts);

    return this;
  }

  line() {
    console.log('line');
    this.add('line');

    return this;
  }

  polyline() {
    console.log('polyline');
    this.add('polyline');

    return this;
  }

  /**
   * Helper Functions
   */

  /**
   * Map a number from one range to another range
   * https://gist.github.com/xposedbones/75ebaef3c10060a3ee3b246166caab56
   */
  map(number, inMin, inMax, outMin, outMax) {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  spline() {
    console.log('spline tk');

    return this;
  }

  times(number, draw) {
    for (let x = 0; x < number; x++) {
      draw(this, x);
    }

    return this;
  }

  // TODO: implement? - height, width, margin, draw
  grid(cols, rows, draw) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // const halfMargin = margin / 2
        // const posX = map(colIndex, 0, columns, halfMargin, height - halfMargin)
        // const posY  = map(rowIndex, 0, rows, halfMargin, width - halfMargin)
        // const cellHeight = (height - margin) / rows
        // const cellWidth = (width - margin) / columns

        draw(this, {col, row});
      }
    }

    return this;
  }
}

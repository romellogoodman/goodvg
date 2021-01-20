import {convertAttributes, downloadURL} from './utils';

const className = 'goodgraphics';

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
      'ellipse',
      'group',
      'grid',
      'line',
      'map',
      'polyline',
      'rect',
      'redraw',
      'remove',
      'save',
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
        xmlns="http://www.w3.org/2000/svg" class="${className}"
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
        r=${radius}
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

    draw(this);

    this.add('</g>');

    return this;
  }

  /**
   * Loop Functions
   */

  times(number, draw) {
    for (let x = 0; x < number; x++) {
      draw(this, x);
    }

    return this;
  }

  grid(
    {columns, rows, height = this.height, width = this.width, margin = 0} = {},
    draw
  ) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const halfMargin = margin / 2;
        const posX = this.map(col, 0, columns, halfMargin, height - halfMargin);
        const posY = this.map(row, 0, rows, halfMargin, width - halfMargin);
        const cellHeight = (height - margin) / rows;
        const cellWidth = (width - margin) / columns;

        draw(this, {
          posX,
          posY,
          cellHeight,
          cellWidth,
        });
      }
    }

    return this;
  }

  /**
   * Helper Functions
   */

  save(fileName) {
    const svg = document.querySelector(`${this.container} .${className}`);
    const img = new Image();

    img.onload = function () {
      const canvas = document.createElement('canvas');
      const height = this.height * 2;
      const width = this.width * 2;

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

    img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svg.outerHTML)}`;
  }

  /**
   * Map a number from one range to another range
   * https://gist.github.com/xposedbones/75ebaef3c10060a3ee3b246166caab56
   */
  map(number, inMin, inMax, outMin, outMax) {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  spline() {
    return [];
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

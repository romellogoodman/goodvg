import tags from './tags';

const funcsToBind = [
  'body',
  'circle',
  'constructTag',
  'constructTemplate',
  'degrees',
  'draw',
  'ellipse',
  'empty',
  'grid',
  'group',
  'head',
  'lerp',
  'lerpColor',
  'line',
  'map',
  'markup',
  'path',
  'polygon',
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
  'square',
  'times',
  'triangle',
  ...tags.head,
  ...tags.body,
];

const className = 'goodgraphics';

const convertAttributes = (attributes = {}) => {
  if (attributes.style && typeof attributes.style === 'object') {
    attributes.style = convertAttributes(attributes.style);
  }

  let result = '';

  Object.keys(attributes).forEach((attrib) => {
    const property = attributes[attrib];

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

class Graphic {
  constructor(options) {
    const {attributes, container, height, width, template, viewBox} =
      options || {};

    this.attributes = attributes || {};
    this.container = container || 'body';
    this.contents = {head: [], body: []};
    this.template = template || 'svg';

    this.height = height || 1200;
    this.width = width || 1200;
    this.viewBox = viewBox || `0 0 ${this.width} ${this.height}`;

    // Create the functions for each tag
    const createTagAPI = (location, list) => {
      list.forEach((tag) => {
        this[tag] = (content, attributes = {}) => {
          this.constructTag({attributes, content, location, tag});
        };
      });
    };

    createTagAPI('head', tags.head);
    createTagAPI('body', tags.body);

    // Bind functions to this
    funcsToBind.forEach((func) => {
      this[func] = this[func].bind(this);
    });
  }

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

  remove() {
    const selector = `${this.container} .${className}`;
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

  empty() {
    this.contents = {head: [], body: []};

    return this;
  }

  head(str) {
    this.contents.head.push(str);

    return this;
  }

  body(str) {
    this.contents.body.push(str);

    return this;
  }

  constructTag({attributes: maybeAttributes = {}, content, location, tag}) {
    const isContentObject = typeof content === 'object';
    const isContentFunction = typeof content === 'function';
    let attributes = isContentObject ? content : maybeAttributes;

    const strAttributes = convertAttributes(attributes);
    const startTag = `<${tag} ${strAttributes}>`;
    const endTag = `</${tag}>`;
    const selfClosingTag = `<${tag} ${strAttributes} />`;

    if (!content || isContentObject) {
      this.contents[location].push(selfClosingTag);
    } else if (isContentFunction) {
      this.contents[location].push(startTag);

      content();

      this.contents[location].push(endTag);
    } else {
      this.contents[location].push(`${startTag}${content}${endTag}`);
    }
  }

  constructTemplate() {
    const {head, body} = this.contents || {};

    switch (this.template) {
      case 'html':
        return `
<html class="${className}" ${convertAttributes(this.attributes)}>
  <head>
    ${head.join('\n')}
  </head>
  <body>
    ${body.join('\n')}
  </body>
</html>`;
      case 'svg':
        return `
<svg
  xmlns="http://www.w3.org/2000/svg"
  height="${this.height}" width="${this.width}"
  viewBox="${this.viewBox}"
  class="${className}"
  ${convertAttributes(this.attributes)}
>
  ${head.join('\n')}
  ${body.join('\n')}
</svg>`;
      default:
        return head + body;
    }
  }

  markup() {
    const markup = this.constructTemplate();

    return markup;
  }

  setAttributes(attributes = {}) {
    this.attributes = {...this.attributes, ...attributes};

    return this;
  }

  /***
   * Special Tags Functions
   */

  circle(x, y, radius, attributes = {}) {
    this.constructTag({
      attributes: {...attributes, cx: x, cy: y, r: radius},
      location: 'body',
      tag: 'circle',
    });

    return this;
  }

  ellipse(x, y, width, height, attributes = {}) {
    this.constructTag({
      attributes: {...attributes, cx: x, cy: y, rx: width, ry: height},
      location: 'body',
      tag: 'ellipse',
    });
  }

  rect(x, y, width, height, attributes = {}) {
    this.constructTag({
      attributes: {...attributes, x, y, width, height},
      location: 'body',
      tag: 'rect',
    });

    return this;
  }

  square(x, y, size, attributes = {}) {
    this.rect(x, y, size, size, attributes);

    return this;
  }

  triangle(x, y, size, attributes = {}) {
    const height = size * (Math.sqrt(3) / 2);
    const points = [
      [0, -height / 2],
      [-size / 2, height / 2],
      [size / 2, height / 2],
      [0, -height / 2],
    ];

    this.polyline(points, {
      ...attributes,
      transform: `${opts.transform || ''} translate(${x} ${y})`,
    });

    return this;
  }

  path(d, attributes = {}) {
    this.constructTag({
      attributes: {...attributes, d},
      location: 'body',
      tag: 'path',
    });

    return this;
  }

  line(x1, y1, x2, y2, attributes = {}) {
    this.constructTag({
      attributes: {
        ...attributes,
        x1,
        x2,
        y1,
        y2,
      },
      location: 'body',
      tag: 'line',
    });

    return this;
  }

  polyline(points, attributes = {}) {
    this.constructTag({
      attributes: {...attributes, points},
      location: 'body',
      tag: 'polyline',
    });

    return this;
  }

  polygon(points, attributes = {}) {
    this.constructTag({
      attributes: {...attributes, points},
      location: 'body',
      tag: 'polygon',
    });
  }

  group(content, attributes = {}) {
    this.constructTag({
      attributes: {...attributes},
      content,
      location: 'body',
      tag: this.template === 'svg' ? 'g' : 'div',
    });
  }

  /**
   * Loop Functions
   */
  times(number, draw, attributes = {}) {
    this.group(() => {
      for (let index = 0; index < number; index++) {
        draw(index);
      }
    }, attributes);

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
    attributes = {}
  ) {
    const at = {};

    if ((x || x === 0) && (y || y === 0) && !attributes.transform) {
      at.transform = `translate(${x}, ${y})`;
    }

    this.group(
      () => {
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < columns; col++) {
            const halfMargin = margin / 2;
            const posX = this.map(
              col,
              0,
              columns,
              halfMargin,
              width - halfMargin
            );
            const posY = this.map(
              row,
              0,
              rows,
              halfMargin,
              height - halfMargin
            );
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
      },
      {...attributes, ...at}
    );

    return this;
  }

  /**
   * Helper Functions
   */

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
}

export default Graphic;

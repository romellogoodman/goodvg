/**
 * List of methods that need to be bound to the Graphic instance
 * @type {string[]}
 */
const funcsToBind = [
  "body",
  "circle",
  "constructTag",
  "constructTemplate",
  "draw",
  "ellipse",
  "empty",
  "group",
  "head",
  "line",
  "markup",
  "path",
  "polygon",
  "polyline",
  "rect",
  "redraw",
  "remove",
  "save",
  "savePNG",
  "saveSVG",
  "setAttributes",
  "square",
  "triangle",
];

/**
 * Class name used for the root SVG or HTML element
 * @type {string}
 */
const CLASSNAME = "goodvg";

/**
 * Converts an attributes object into an HTML attribute string
 * @param {Object} [attributes={}] - Object containing HTML attributes
 * @param {Object|string} [attributes.style] - Style attributes (can be object or string)
 * @returns {string} String of HTML attributes formatted as 'key="value"'
 */
const convertAttributes = (attributes = {}) => {
  if (attributes.style && typeof attributes.style === "object") {
    const styleString = Object.keys(attributes.style).reduce(
      (result, attrib) => {
        const property = attributes.style[attrib];

        result += ` ${attrib}: ${property};`;

        return result;
      },
      ""
    );

    attributes.style = styleString;
  }

  let attributesString = Object.keys(attributes).reduce((result, attrib) => {
    const property = attributes[attrib];

    result += ` ${attrib}="${property}"`;

    return result;
  }, "");

  return attributesString;
};

/**
 * Downloads a file by creating a temporary link element and triggering a click
 * @param {string} name - The filename for the download
 * @param {string} url - The data URL to download
 */
const downloadURL = (name, url) => {
  const link = document.createElement("a");

  link.download = name;
  link.href = url;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * A simple library for creating SVG and HTML graphics with a chainable API
 * @class
 */
class Graphic {
  /**
   * Creates a new Graphic instance
   * @param {Object} [options] - Configuration options
   * @param {Object} [options.attributes] - Additional attributes for the root element
   * @param {string} [options.container='body'] - CSS selector for the container element
   * @param {number} [options.height=1200] - Height of the graphic
   * @param {number} [options.width=1200] - Width of the graphic
   * @param {string} [options.template='svg'] - Template type ('svg' or 'html')
   * @param {string} [options.viewBox] - SVG viewBox attribute (defaults to '0 0 width height')
   */
  constructor(options) {
    const { attributes, container, height, width, template, viewBox } =
      options || {};

    this.attributes = attributes || {};
    this.container = container || "body";
    this.contents = { head: [], body: [] };
    this.template = template || "svg";

    this.height = height || 1200;
    this.width = width || 1200;
    this.viewBox = viewBox || `0 0 ${this.width} ${this.height}`;

    // Bind functions to this
    funcsToBind.forEach((func) => {
      this[func] = this[func].bind(this);
    });
  }

  /**
   * Renders the graphic to the DOM container
   * @returns {Graphic} The Graphic instance for method chaining
   */
  draw() {
    if (typeof window === "undefined" || !window || !window.document) return;

    const container = document.querySelector(this.container);

    if (container) {
      container.innerHTML = this.markup();
    } else {
      console.warn("no container");
    }

    return this;
  }

  /**
   * Removes the graphic from the DOM
   * @returns {Graphic} The Graphic instance for method chaining
   */
  remove() {
    const selector = `${this.container} .${CLASSNAME}`;
    const element = document.querySelector(selector);

    if (element) {
      element.remove();
    } else {
      console.warn(
        `unable to remove element. Check your selector: ${selector}`
      );
    }

    return this;
  }

  /**
   * Removes and redraws the graphic
   * @returns {Graphic} The Graphic instance for method chaining
   */
  redraw() {
    this.remove();
    this.draw();

    return this;
  }

  /**
   * Clears all content from the graphic
   * @returns {Graphic} The Graphic instance for method chaining
   */
  empty() {
    this.contents = { head: [], body: [] };

    return this;
  }

  /**
   * Adds content to the head section (for SVG: defs, styles, etc.)
   * @param {string} str - The content to add to the head
   * @returns {Graphic} The Graphic instance for method chaining
   */
  head(str) {
    this.contents.head.push(str);

    return this;
  }

  /**
   * Adds content to the body section (main content area)
   * @param {string} str - The content to add to the body
   * @returns {Graphic} The Graphic instance for method chaining
   */
  body(str) {
    this.contents.body.push(str);

    return this;
  }

  /**
   * Constructs an HTML/SVG tag and adds it to the specified location
   * @param {Object} options - Tag construction options
   * @param {Object} [options.attributes={}] - HTML attributes for the tag
   * @param {string|Function|Object} [options.content] - Tag content (string, function, or attributes object)
   * @param {string} options.location - Where to add the tag ('head' or 'body')
   * @param {string} options.tag - The HTML/SVG tag name
   */
  constructTag({ attributes: maybeAttributes = {}, content, location, tag }) {
    const isContentObject = typeof content === "object";
    const isContentFunction = typeof content === "function";
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

  /**
   * Constructs the final HTML/SVG template based on the template type
   * @returns {string} The complete HTML/SVG markup
   */
  constructTemplate() {
    const { head, body } = this.contents || {};

    switch (this.template) {
      case "html":
        return `
  <html class="${CLASSNAME}" ${convertAttributes(this.attributes)}>
    <head>
      ${head.join("\n")}
    </head>
    <body>
      ${body.join("\n")}
    </body>
  </html>`;
      case "svg":
        return `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="${this.height}" width="${this.width}"
    viewBox="${this.viewBox}"
    class="${CLASSNAME}"
    ${convertAttributes(this.attributes)}
  >
    ${head.join("\n")}
    ${body.join("\n")}
  </svg>`;
      default:
        return head + body;
    }
  }

  /**
   * Returns the complete markup for the graphic
   * @returns {string} The complete HTML/SVG markup
   */
  markup() {
    const markup = this.constructTemplate();

    return markup;
  }

  /**
   * Sets or updates attributes on the root element
   * @param {Object} [attributes={}] - Attributes to set or merge
   * @returns {Graphic} The Graphic instance for method chaining
   */
  setAttributes(attributes = {}) {
    this.attributes = { ...this.attributes, ...attributes };

    return this;
  }

  /***
   * Special Tags Functions
   */

  /**
   * Draws a circle
   * @param {number} x - The x-coordinate of the center
   * @param {number} y - The y-coordinate of the center
   * @param {number} radius - The radius of the circle
   * @param {Object} [attributes={}] - Additional SVG attributes
   * @returns {Graphic} The Graphic instance for method chaining
   */
  circle(x, y, radius, attributes = {}) {
    this.constructTag({
      attributes: { ...attributes, cx: x, cy: y, r: radius },
      location: "body",
      tag: "circle",
    });

    return this;
  }

  /**
   * Draws an ellipse
   * @param {number} x - The x-coordinate of the center
   * @param {number} y - The y-coordinate of the center
   * @param {number} width - The horizontal radius (rx)
   * @param {number} height - The vertical radius (ry)
   * @param {Object} [attributes={}] - Additional SVG attributes
   * @returns {Graphic} The Graphic instance for method chaining
   */
  ellipse(x, y, width, height, attributes = {}) {
    this.constructTag({
      attributes: { ...attributes, cx: x, cy: y, rx: width, ry: height },
      location: "body",
      tag: "ellipse",
    });

    return this;
  }

  /**
   * Draws a rectangle
   * @param {number} x - The x-coordinate of the top-left corner
   * @param {number} y - The y-coordinate of the top-left corner
   * @param {number} width - The width of the rectangle
   * @param {number} height - The height of the rectangle
   * @param {Object} [attributes={}] - Additional SVG attributes
   * @returns {Graphic} The Graphic instance for method chaining
   */
  rect(x, y, width, height, attributes = {}) {
    this.constructTag({
      attributes: { ...attributes, x, y, width, height },
      location: "body",
      tag: "rect",
    });

    return this;
  }

  /**
   * Draws a square (convenience method for rect with equal width and height)
   * @param {number} x - The x-coordinate of the top-left corner
   * @param {number} y - The y-coordinate of the top-left corner
   * @param {number} size - The width and height of the square
   * @param {Object} [attributes={}] - Additional SVG attributes
   * @returns {Graphic} The Graphic instance for method chaining
   */
  square(x, y, size, attributes = {}) {
    this.rect(x, y, size, size, attributes);

    return this;
  }

  /**
   * Draws an equilateral triangle
   * @param {number} x - The x-coordinate of the center
   * @param {number} y - The y-coordinate of the center
   * @param {number} size - The size of the triangle (base width)
   * @param {Object} [attributes={}] - Additional SVG attributes
   * @returns {Graphic} The Graphic instance for method chaining
   */
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
      transform: `${attributes.transform || ""} translate(${x} ${y})`,
    });

    return this;
  }

  /**
   * Draws a path using SVG path commands
   * @param {string} d - The SVG path data (e.g., "M 10 10 L 20 20")
   * @param {Object} [attributes={}] - Additional SVG attributes
   * @returns {Graphic} The Graphic instance for method chaining
   */
  path(d, attributes = {}) {
    this.constructTag({
      attributes: { ...attributes, d },
      location: "body",
      tag: "path",
    });

    return this;
  }

  /**
   * Draws a line
   * @param {number} x1 - The x-coordinate of the start point
   * @param {number} y1 - The y-coordinate of the start point
   * @param {number} x2 - The x-coordinate of the end point
   * @param {number} y2 - The y-coordinate of the end point
   * @param {Object} [attributes={}] - Additional SVG attributes
   * @returns {Graphic} The Graphic instance for method chaining
   */
  line(x1, y1, x2, y2, attributes = {}) {
    this.constructTag({
      attributes: {
        ...attributes,
        x1,
        x2,
        y1,
        y2,
      },
      location: "body",
      tag: "line",
    });

    return this;
  }

  /**
   * Draws a polyline (series of connected lines)
   * @param {Array|string} points - Array of [x, y] coordinates or string of points
   * @param {Object} [attributes={}] - Additional SVG attributes
   * @returns {Graphic} The Graphic instance for method chaining
   */
  polyline(points, attributes = {}) {
    this.constructTag({
      attributes: { ...attributes, points },
      location: "body",
      tag: "polyline",
    });

    return this;
  }

  /**
   * Draws a polygon (closed shape)
   * @param {Array|string} points - Array of [x, y] coordinates or string of points
   * @param {Object} [attributes={}] - Additional SVG attributes
   * @returns {Graphic} The Graphic instance for method chaining
   */
  polygon(points, attributes = {}) {
    this.constructTag({
      attributes: { ...attributes, points },
      location: "body",
      tag: "polygon",
    });

    return this;
  }

  /**
   * Creates a group element (SVG <g> or HTML <div>)
   * @param {Function|string} content - Content to nest within the group or attributes object
   * @param {Object} [attributes={}] - Additional attributes for the group
   * @returns {Graphic} The Graphic instance for method chaining
   */
  group(content, attributes = {}) {
    this.constructTag({
      attributes: { ...attributes },
      content,
      location: "body",
      tag: this.template === "svg" ? "g" : "div",
    });

    return this;
  }

  /**
   * Helper Functions
   */

  /**
   * Saves the graphic as SVG or PNG
   * @param {string} fileName - The name for the downloaded file
   * @param {boolean} [isPng=false] - Whether to save as PNG (true) or SVG (false)
   * @param {Object} [opts={}] - Options for PNG export
   * @param {number} [opts.width] - Width for PNG export (defaults to 2x the graphic width)
   * @param {number} [opts.height] - Height for PNG export (defaults to 2x the graphic height)
   */
  save(fileName, isPng, opts = {}) {
    const svg = document.querySelector(`${this.container} .${CLASSNAME}`);
    const svgText = `data:image/svg+xml;utf8,${encodeURIComponent(
      svg.outerHTML
    )}`;

    if (isPng) {
      this.savePNG(fileName, svgText, opts);
    } else {
      this.saveSVG(fileName, svgText, opts);
    }
  }

  /**
   * Saves the graphic as an SVG file
   * @param {string} fileName - The name for the downloaded file
   * @param {string} svgText - The data URL of the SVG
   * @param {Object} [opts={}] - Additional options (currently unused)
   */
  saveSVG(fileName, svgText, opts = {}) {
    const link = document.createElement("a");

    link.setAttribute("href", svgText);
    link.setAttribute("download", fileName);

    link.style.display = "none";
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }

  /**
   * Saves the graphic as a PNG file
   * @param {string} fileName - The name for the downloaded file
   * @param {string} svgText - The data URL of the SVG
   * @param {Object} [opts={}] - Options for PNG export
   * @param {number} [opts.width] - Width for the PNG (defaults to 2x the graphic width)
   * @param {number} [opts.height] - Height for the PNG (defaults to 2x the graphic height)
   */
  savePNG(fileName, svgText, opts = {}) {
    const img = new Image();

    img.onload = function () {
      const canvas = document.createElement("canvas");
      const height = opts.height || this.height * 2;
      const width = opts.width || this.width * 2;

      canvas.height = height;
      canvas.width = width;

      canvas.getContext("2d").drawImage(img, 0, 0, width, height);

      const url = canvas.toDataURL("image/png");

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
}

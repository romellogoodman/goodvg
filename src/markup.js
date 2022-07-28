import tags from './tags';

/**
 * Util Functions
 */

const convertAttributes = (attribs = {}) => {
  let result = '';

  Object.keys(attribs).forEach((attrib) => {
    const property = attribs[attrib];

    result += ` ${attrib}="${property}"`;
  });

  return result;
};

class Markup {
  constructor({container, fontSize} = {}) {
    const funcs = [
      'body',
      'buildMarkup',
      'comment',
      'draw',
      'empty',
      'head',
      'markup',
      'redraw',
      'remove',
      ...tags.head,
      ...tags.body,
    ];

    // Create the functions for each tag
    const createTagAPI = (location, list) => {
      list.forEach((tag) => {
        this[tag] = (content, attributes = {}) => {
          this[location].push({tag, content, attributes});
        };
      });
    };

    this._head = [];
    this._body = [];
    createTagAPI('_head', tags.head);
    createTagAPI('_body', tags.body);

    // Bind functions to this
    funcs.forEach((func) => {
      if (this[func]) {
        this[func] = this[func].bind(this);
      }
    });

    this.fontSize = fontSize || 16;
    this.container = container || 'html';
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

  remove() {
    const selector = `${this.container} .hypertextscriptinglanguage`;
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
    this._head = [];
    this._body = [];

    return this;
  }

  head(tag, content, attributes = {}) {
    this._head.push({tag, content, attributes});

    return this;
  }

  body(tag, content, attributes = {}) {
    this._body.push({tag, content, attributes});

    return this;
  }

  comment(content) {
    this._head.unshift(`<!-- ${content} -->`);
  }

  buildMarkup(listOfMarkup) {
    const createNestedHTML = (list) => {
      const nestedList = list.reduce((result, item) => {
        if (Array.isArray(item.content)) {
          // Access the result and pull the last x items
          item.content = new Array(item.content.length)
            .fill(null)
            .map(() => result.pop())
            .reverse();
        }

        result.push(item);

        return result;
      }, []);

      return nestedList;
    };
    const createElements = (list) => {
      const elements = list.reduce((result, item) => {
        const {tag, content, attributes} = item;

        if (!content) {
          result.push(`<${tag} ${convertAttributes(attributes)} />`);
        } else if (Array.isArray(content)) {
          result.push(
            `<${tag} ${convertAttributes(attributes)}>${createElements(
              content
            ).join('\n')}</${tag}>`
          );
        } else {
          result.push(
            `<${tag} ${convertAttributes(attributes)}>${content}</${tag}>`
          );
        }

        return result;
      }, []);

      return elements;
    };

    const nestedMarkup = createNestedHTML(listOfMarkup);
    const markup = createElements(nestedMarkup);

    return markup.join('\n');
  }

  markup() {
    return `
      <html class="hypertextscriptinglanguage" style="font-size: ${
        this.fontSize
      }px;">
        <head>
          ${this.buildMarkup(this._head)}
        </head>
        <body>
          ${this.buildMarkup(this._body)}
        </body>
      </html>
      `;
  }
}

export default Markup;

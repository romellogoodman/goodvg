const Graphic = require('../dist/goodgraphics.js');

const svg = new Graphic({
  attributes: {
    fill: 'white',
    style: 'background: #1b1b1b',
  },
});

svg.circle('50%', '50%', '25%');

svg.draw();

const html = svg.markup();

module.exports = html;

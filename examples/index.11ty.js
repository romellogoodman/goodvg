const fs = require('fs');
const {Markup} = require('../dist/goodgraphics.js');

const page = new Markup();

let files = fs.readdirSync('./examples');

files = files.filter((name) => {
  return name.includes('11ty.js') && !name.includes('index');
});

page.title('goodgraphics.js');

page.h1('Good Graphics Examples');

for (const fileIndex in files) {
  const file = files[fileIndex];
  const url = `./${file.replace('.11ty.js', '')}`;

  page.a([page.p(url)], {href: url});
}

page.draw();

const html = page.markup();

module.exports = html;

const Graphic = require('../dist/goodgraphics.js');

const page = new Graphic({template: 'html'});

page.style(`
body {
  background: papayawhip;
}

.title {
  color: pink;
}
`);

page.title('hello world');

page.h1(
  `
goodbye world
`,
  {class: 'title'}
);

page.p(`
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed leo sed sem malesuada ullamcorper. Pellentesque ultrices felis eu neque scelerisque, et hendrerit ipsum vestibulum.
`);

page.ul(() => {
  page.li(() => {
    page.span('hello');
    page.span('world');
  });

  page.li('item 2');
  page.li('item 3');
});

const html = page.markup();

module.exports = html;

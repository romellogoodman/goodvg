/****************************************
 * On Snapshoting Functions
 *
 * I have decided to use snapshotting. By capturing the output of
 * svg.markup we can ensure that the functionality does not change
 * without completely reimplementing said functionality in this file.
 *
 * Also, need to test the following functions:
 * - degrees
 * - draw
 * - lerpColor
 * - radians
 * - random
 * - redraw
 * - remove
 * - save
 * - savePNG
 * - saveSVG
 * - spline
 ****************************************
 */

const {Graphic} = require('../src/index').default;

describe('circle', () => {
  test('should match snapshot', () => {
    const svg = new Graphic();

    svg.circle(0, 0, 200);

    expect(svg.markup()).toMatchSnapshot();
  });
});

describe('ellipse', () => {
  test('should match snapshot', () => {
    const svg = new Graphic();

    svg.ellipse(0, 0, 200, 400);

    expect(svg.markup()).toMatchSnapshot();
  });
});

describe('group', () => {
  test('should match snapshot', () => {
    const svg = new Graphic();

    svg.group(() => {
      svg.circle(0, 0, 10);
    });

    expect(svg.markup()).toMatchSnapshot();
  });
});

describe('groupStart and groupEnd', () => {
  test('should match snapshot', () => {
    const svg = new Graphic();

    svg.groupStart();

    svg.circle(0, 0, 10);

    svg.groupEnd();

    expect(svg.markup()).toMatchSnapshot();
  });
});

describe('times', () => {
  test('should loop x times', () => {
    const svg = new Graphic();

    svg.times(5, (index) => svg.add(index));

    expect(svg.contents).toMatchSnapshot();
  });
});

describe('line', () => {
  test('should match snapshot', () => {
    const svg = new Graphic();

    svg.line(0, 0, 200, 200);

    expect(svg.markup()).toMatchSnapshot();
  });
});

describe('markup', () => {
  test('should match snapshot', () => {
    const svg = new Graphic();

    expect(svg.markup()).toMatchSnapshot();
  });
});

describe('path', () => {
  test('should match snapshot', () => {
    const svg = new Graphic();

    svg.path('M 10 10 H 90 V 90 H 10 L 10 10');

    expect(svg.markup()).toMatchSnapshot();
  });
});

describe('polygon', () => {
  test('should match snapshot', () => {
    const svg = new Graphic();

    svg.polygon('0,100 50,25 50,75 100,0');

    expect(svg.markup()).toMatchSnapshot();
  });
});

describe('polyline', () => {
  test('should match snapshot', () => {
    const svg = new Graphic();

    svg.polyline('0,100 50,25 50,75 100,0');

    expect(svg.markup()).toMatchSnapshot();
  });
});

describe('rect', () => {
  test('should match snapshot', () => {
    const svg = new Graphic();

    svg.rect(0, 0, 200, 400);

    expect(svg.markup()).toMatchSnapshot();
  });
});

describe('square', () => {
  test('should match snapshot', () => {
    const svg = new Graphic();

    svg.square(0, 0, 200);

    expect(svg.markup()).toMatchSnapshot();
  });
});

describe('triangle', () => {
  test('should match snapshot', () => {
    const svg = new Graphic();

    svg.triangle(0, 0, 100);

    expect(svg.markup()).toMatchSnapshot();
  });
});

/****************************************
 * Other and Util Functions
 ****************************************
 */

describe('constructor', () => {
  test('should snapshot defaults', () => {
    const {
      attributes,
      container,
      contents,
      height,
      viewBox,
      width,
    } = new Graphic();
    const constructorObj = {
      attributes,
      container,
      contents,
      height,
      viewBox,
      width,
    };

    expect(constructorObj).toMatchSnapshot();
  });

  test('should override values', () => {
    const attributes = {};
    const container = '.container';
    const height = 400;
    const width = 400;
    const svg = new Graphic({
      attributes,
      container,
      height,
      width,
    });

    expect(svg.attributes).toEqual(attributes);
    expect(svg.container).toEqual(container);
    expect(svg.height).toEqual(height);
    expect(svg.viewBox).toEqual(`0 0 ${width} ${height}`);
    expect(svg.width).toEqual(width);
  });

  test('should override viewBox', () => {
    const viewBox = '0 0 1000 100';
    const svg = new Graphic({viewBox});

    expect(svg.viewBox).toEqual(viewBox);
  });
});

describe('setAttributes', () => {
  test('should set this.attributes', () => {
    const svg = new Graphic();
    const attributes = {foo: 'bar'};

    svg.setAttributes(attributes);

    expect(svg.attributes).toEqual(attributes);
  });
});

describe('add', () => {
  test('should add to this.contents', () => {
    const svg = new Graphic();
    const markup = '<circle />';

    svg.add(markup);

    expect(svg.contents).toEqual([markup]);
  });
});

describe('empty', () => {
  test('should empty this.contents', () => {
    const svg = new Graphic();

    svg.add('<circle />');

    expect(svg.contents).toHaveLength(1);

    svg.empty();

    expect(svg.contents).toEqual([]);
  });
});

describe('bigger', () => {
  test('should return bigger number', () => {
    const svg = new Graphic();

    expect(svg.bigger(100, 101)).toEqual(101);
  });
});

describe('smaller', () => {
  test('should return smaller number', () => {
    const svg = new Graphic();

    expect(svg.smaller(100, 101)).toEqual(100);
  });
});

describe('constrain', () => {
  test('should constrain within max and min', () => {
    const svg = new Graphic();
    const min = 10;
    const max = 100;

    expect(svg.constrain(0, min, max)).toEqual(min);
    expect(svg.constrain(1000, min, max)).toEqual(max);
    expect(svg.constrain(min * 2, min, max)).toEqual(min * 2);
  });
});

describe('lerp', () => {
  test('should return a percentage of the range', () => {
    const svg = new Graphic();

    expect(svg.lerp(0, 100, 0.1)).toEqual(10);
    expect(svg.lerp(0, 100, 0.5)).toEqual(50);
    expect(svg.lerp(0, 100, 0.9)).toEqual(90);
  });
});

describe('map', () => {
  test('should map between the two ranges', () => {
    const svg = new Graphic();

    expect(svg.map(5, 0, 10, 0, 100)).toEqual(50);
  });
});

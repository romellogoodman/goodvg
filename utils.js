const validAttributes = {
  fill: 'fill',
  stroke: 'stroke',
  strokeWidth: 'stroke-width',
  style: 'style',
  transform: 'transform',
};

export const convertAttributes = (attribs = {}) => {
  let result = '';

  Object.keys(attribs).forEach((attrib) => {
    const property = attribs[attrib];
    const validAttrib = validAttributes[attrib];

    if (validAttrib) result += ` ${validAttrib}="${property}"`;
  });

  return result;
};

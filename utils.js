const validAttributes = {
  fill: 'fill',
  style: 'style',
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

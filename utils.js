const validAttributes = {
  clipPath: 'clip-path',
  fill: 'fill',
  stroke: 'stroke',
  strokeDasharray: 'stroke-dasharray',
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

export const downloadURL = (name, url) => {
  const link = document.createElement('a');

  link.download = name;
  link.href = url;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

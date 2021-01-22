export const convertAttributes = (attribs = {}) => {
  let result = '';

  Object.keys(attribs).forEach((attrib) => {
    const property = attribs[attrib];

    result += ` ${attrib}="${property}"`;
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

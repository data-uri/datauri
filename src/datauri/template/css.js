const TAB = '    ';
const SIZE_PROPS = key => /(width|height|background\-size)/g.test(key);
const PROP_VALUE =
  (size, key) => (key === 'background-size') ?
    `${size.width}px ${size.height}px`
    :`${size[key]}px`;
const PROP_SIZE = (...prop) => `${TAB}${prop[1]}: ${PROP_VALUE.apply(null, prop)};`;
const BASE_CSS = (data) => [
  '',
  `.${data.className.replace(/\s+/gi, '_')} {`,
  `${TAB}background-image: url('${data.background}');`
];
const SIZE =
  data => Object.keys(data).filter(SIZE_PROPS).map(PROP_SIZE.bind(null, data.dimensions));

module.exports = data => BASE_CSS(data).concat(SIZE(data), ['}']).join('\n');

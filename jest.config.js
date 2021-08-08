// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

process.env.DATAURI_REQUIRE_PATH = path.resolve(__dirname, 'lib/datauri/index.js');
process.env.DATAURI_CSS_PATH = path.resolve(__dirname, 'lib/datauri/css.js');

module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'js']
};

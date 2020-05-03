const path = require("path");

process.env.DATAURI_REQUIRE_PATH = path.resolve(__dirname, "lib/datauri/sync.js");

module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'js']
}

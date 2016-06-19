const factory = require('./factory');

Object.defineProperties(factory, {
  format: {
    value: require('./format')
  },
  sync: {
    get: () => require('./sync')
  },
  stream: {
    get: () => require('./stream')()
  }
});

module.exports = factory;

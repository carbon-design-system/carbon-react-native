const path = require('node:path');

module.exports = {
  dependencies: {
    '@carbon/react-native': {
      root: path.join(__dirname, '..'),
    },
  },
  assets: ['../src/assets/fonts/'],
};

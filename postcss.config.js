const autoprefixer = require('autoprefixer');
// const sprite = require('postcss-sprites');

module.exports = {
  ident: 'postcss',
  plugins: [
    // sprite(),
    autoprefixer(),
  ],
};

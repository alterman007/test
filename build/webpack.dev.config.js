const webpack = require('webpack');
module.exports = {
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

const { isDevMode } = require('./utils/env');

const babelConfig = {
  'presets': [
    '@babel/preset-env',
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  'plugins': [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-async-to-generator',
    ['@babel/plugin-proposal-decorators', {
      'legacy': true,
    }],
    '@babel/plugin-proposal-class-properties',
  ],
};

if (isDevMode) {
  babelConfig.plugins.unshift('react-hot-loader/babel');
}

module.exports = babelConfig;

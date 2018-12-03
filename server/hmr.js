const querystring = require('querystring');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../build/webpack.config');

const heartbeat = 1000;
const hotPath = '/webpack-hmr';

const hotMiddlewareScript = 'webpack-hot-middleware/client?' + querystring.stringify({
  path: hotPath,
  timeout: heartbeat * 2,
}, null, null, { encodeURIComponent: (s) => s });

module.exports = (app) => {
  configWebpackEntryForHMR(config);
  // configWebpackPluginForHMR(config);

  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    logLevel: 'error',
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: hotPath,
    heartbeat,
  }));
};

function addServerAndClientToString(str) {
  return [str, hotMiddlewareScript];
}

function addServerAndClientToArray(array) {
  return array.concat(hotMiddlewareScript);
}

function configWebpackEntryForHMR(config) {
  const { entry } = config;
  if (typeof entry === 'string') {
    config.entry = addServerAndClientToString(entry);
  } else if (Array.isArray(entry)) {
    config.entry = addServerAndClientToArray(entry);
  } else {
    for (let key in entry) {
      if (entry.hasOwnProperty(key) === false) {
        continue;
      }
      if (typeof entry[key] === 'string') {
        config.entry[key] = addServerAndClientToString(entry[key]);
      } else if (Array.isArray(entry[key])) {
        config.entry[key] = addServerAndClientToArray(entry[key]);
      } else {
        console.error(`Properties of the entry object should be either strings or Array<string>.`);
      }
    }
  }
}

// function configWebpackPluginForHMR(config) {
//   const nameModulePlugin = new webpack.NamedModulesPlugin();
//   const hmrPlugin = new webpack.HotModuleReplacementPlugin();

//   config.plugins = addPlugin(config.plugins, hmrPlugin);
//   config.plugins = addPlugin(config.plugins, nameModulePlugin);
// }

// function addPlugin(plugins, newPlugin) {
//   if (typeof plugins === 'undefined' || plugins === null) {
//     return [newPlugin];
//   }

//   const foundPlugin = plugins.some((plugin) => {
//     return plugin.constructor.name === newPlugin.constructor.name;
//   });

//   if (foundPlugin === false) {
//     return plugins.concat(newPlugin);
//   }
// }

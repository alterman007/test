const path = require('path');
const express = require('express');
const serveFavicon = require('serve-favicon');

const proxyMiddleware = require('http-proxy-middleware');
const historyAPIFallbackMiddleware = require('connect-history-api-fallback');
const opn = require('opn');

const proxyConfig = require('../build/proxy');
const historyAPIConfig = require('../build/historyAPIFallback');

const { isDevMode, PORT } = require('../utils/env');

const app = express();

app.use(serveFavicon(path.join(__dirname, '../favicon.ico')));
app.use('/assets', express.static(path.join(__dirname, './assets')));
for (let context in proxyConfig) {
  app.use(proxyMiddleware(context, proxyConfig[context]));
}
app.use(historyAPIFallbackMiddleware(historyAPIConfig));

if (isDevMode) {
  const hmr = require('./hmr');
  hmr(app);
} else {
  app.use('/project', express.static(path.join(process.cwd(), 'dist')));
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));

opn(`http://127.0.0.1:${PORT}/`);

module.exports = {
  '/event-img': {
    target: 'https://api.gitlab.com',
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: {
      '^/event-img/api/user': '/api/user',
    },
    headers: {
      Cookie: '...',
    },
  },
};

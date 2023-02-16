const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
    })
  );
  app.use(
    '/pipapi',
    createProxyMiddleware({
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
        pathRewrite: {
          '^/pipapi': '/api'
        }
      })
  )
};

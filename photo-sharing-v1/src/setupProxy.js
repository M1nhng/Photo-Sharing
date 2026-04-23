const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function setupProxy(app) {
  const target = process.env.REACT_APP_API_URL;

  if (!target) {
    return;
  }

  app.use(
    "/api",
    createProxyMiddleware({
      target,
      changeOrigin: true,
      secure: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};

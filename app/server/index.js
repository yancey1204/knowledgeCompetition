const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');

const isProd = process.env.NODE_ENV === 'production';
const PORT = isProd ? process.env.PORT : 8080;        // set our PORT
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddlwware = require('webpack-hot-middleware');
const historyFallback = require('connect-history-api-fallback');
const webpackConfig = isProd
  ? require('../../build/webpack.prod.conf')
  : require('../../build/webpack.dev.conf');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('./routers'));

if (!isProd) {
  const compiler = webpack(webpackConfig);
  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false,
    },
  });

  const hotMiddleware = webpackHotMiddlwware(compiler);
  // force page reload when html-webpack-plugin template changes
  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
      hotMiddleware.publish({ action: 'reload' });
      cb();
    });
  });
  // handle fallback for HTML5 history API
  app.use(historyFallback());
  app.use(devMiddleware);
  app.use(hotMiddleware);
}

app.use(express.static('dist'));
app.use('/data', express.static('app/server/data'));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

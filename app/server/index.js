const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');

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
// const mongoose = require('mongoose');

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

  // serve webpack bundle output
  app.use(devMiddleware);

  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware);
}

app.use(express.static('dist'));

// configure app to use bodyParser()
// this will let us get the data from a POST
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // ROUTES FOR OUR API
// // =============================================================================
// const router = express.Router();              // get an instance of the express Router

// // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
// router.get('/', (req, res) => {
//   res.send(path.resolve(__dirname, '../../dist/index.html'));
// });

// router.route('/bears')
//   // create a bear (accessed at POST http://localhost:8080/api/bears)
//   .post((req, res) => {
//     let bear = new Bear();      // create a new instance of the Bear model
//     bear.name = req.body.name;  // set the bears name (comes from the request)

//     // save the bear and check for errors
//     bear.save(function(err) {
//       if (err)
//         res.send(err);

//         res.json({ message: 'Bear created!' });
//       });

// });

// // more routes for our API will happen here

// // REGISTER OUR ROUTES -------------------------------
// // all of our routes will be prefixed with /api
// app.use('/api', router);

app.listen(PORT, () => {
  /*eslint-disable*/
  console.log(`Example app listening on port ${PORT}`);
  /*eslint-enable*/
});

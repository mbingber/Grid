/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const util = require('util');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  var message = chalk.blue(util.inspect(req.ip));
  message += util.format(chalk.magenta(' %s %s'), req.method, req.path);
  if (Object.keys(req.query).length) message += chalk.yellow(' QUERY RECEIVED\n') + chalk.cyan(util.inspect(req.query));
  if (Object.keys(req.body).length) {
    if(req.path.slice(0, 9) === '/api/play') message += chalk.cyan(' BODY RECEIVED\n') + chalk.yellow(util.inspect(req.body));
    else {
      if(Object.keys(req.body).length > 2) message += chalk.cyan(' BODY RECEIVED\n') + chalk.yellow(util.inspect(req.body));
      else message += util.format(chalk.cyan(' %s: %s'), 'BODY', util.inspect(req.body));
    }
  } 
  util.log(message);
  next();
});

app.use('/api', require('./routes'));

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '../dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.use(function (err, req, res, next) {
    console.error(err)
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const proxy = require('http-proxy-middleware');
const compression = require('compression');
const app = express();
const port = process.env.PORT || 2001;

app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use(
  '/api/:id',
  proxy({
    target: 'http://ec2-13-52-96-109.us-west-1.compute.amazonaws.com:8080',
    changeOrigin: true
  })
);

app.listen(port, () => {
  console.log(`server running at: port: ${port}`);
});

'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const fs = require('fs');

const _u = require('./common/util');
const weixin = require('./common/weixin');

const accessLog = fs.createWriteStream('./logs/morgan.access.log');
app.use(morgan('short', {stream: accessLog}));
app.use(morgan('dev'));

app.get('/', function(req, res) {
  weixin.getAccessToken((err, token) => {
    if (err) {
      return res.status(500).send('err occured');
    }
    res.send(token);
  });
});

app.listen(3333);

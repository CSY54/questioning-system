'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');
const logger = require('morgan');
const morganBody = require('morgan-body');
const fs = require('fs');
require('dotenv').config();

const app = express();

app.set('trust proxy', 1);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if (process.env.LOG_TO_FILE == 1) {
  const accessLogStream = fs.createWriteStream(
      path.join(__dirname, 'access.log'), {
        flags: 'a',
      });
  morganBody(app, {
    logReqUserAgent: false,
    logResponseBody: false,
    stream: accessLogStream,
  });
} else {
  app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(cookieParser());
app.use('/img', express.static(path.join(__dirname, 'public/images')));
app.use('/css', express.static(path.join(__dirname, 'public/stylesheets')));
app.use(helmet());

const _2hr = 1000 * 60 * 60 * 2;
app.use(session({
  name: 'session',
  secret: process.env.SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  httpOnly: false,
  cookie: {
    expires: new Date(Date.now() + _2hr),
    maxAge: _2hr,
  },
}));

app.use('/api', require('./routes/api'));
app.use('/admin', require('./routes/admin'));
app.use('/', require('./routes/index'));

app.use(function(req, res) {
  res.redirect('/');
});

app.listen(process.env.PORT || 3000);

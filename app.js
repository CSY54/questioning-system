'use strict';

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var helmet = require('helmet');

var app = express();

app.set('trust proxy', 1);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use('/img', express.static(path.join(__dirname, 'public/images')));
app.use('/css', express.static(path.join(__dirname, 'public/stylesheets')));
app.use(helmet());

var _2hr = 1000 * 60 * 60 * 2;
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

app.listen(process.env.PORT || 3000, () => {
	console.log(`[+] Listening on http://localhost:${process.env.PORT || 3000}`);
});

'use strict';

var router = require('express').Router();
var moment = require('moment');
var crypto = require('crypto');

var db = require('../db');

router.get('/', (req, res) => {
	if (!req.session.is_admin) {
		res.redirect('/admin/login');
		return;
	}
	res.redirect('/admin/management');
});

router.get('/login', (req, res) => {
	if (req.session.is_admin) {
		res.redirect('/admin');
		return;
	}
	res.render('layout', {
		page: 'login',
	});
});

router.get('/management', (req, res) => {
	if (!req.session.is_admin) {
		res.redirect('/admin');
		return;
	}

	let csrf_token = crypto.randomBytes(16).toString('hex');
	console.log(csrf_token);
	req.session.csrf_token = csrf_token;

	new Promise((resolve, reject) => {
		let qry = 'SELECT * FROM questions';
		db.query(qry, (err, rows) => {
			if (err) reject(err);
			resolve(rows);
		});
	}).then((rows) => {
		for (let i = 0; i < rows.length; i++) {
			rows[i].time = moment(rows[i].time).format('YYYY-MM-DD HH:mm:ss');
		}
		res.render('layout', {
			page: 'admin',
			data: {
				questions: rows,
				csrf_token: csrf_token,
			},
		});
	}).catch((err) => {
		res.render('layout', {
			page: 'admin',
			data: {
				error: err,
				csrf_token: csrf_token,
			},
		});
	});
});

module.exports = router;

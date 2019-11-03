'use strict';

var router = require('express').Router();
var moment = require('moment');

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
			},
		});
	}).catch((err) => {
		res.render('layout', {
			page: 'admin',
			data: {
				error: err,
			},
		});
	});
});

module.exports = router;

'use strict';

var router = require('express').Router();
var svgCaptcha = require('svg-captcha');

var db = require('../db');

router.get('/captcha', (req, res) => {
	let captcha = svgCaptcha.create({
		ignoreChars: 'Oo0l1I',
		size: 4,
		noise: 3,
		background: '#fff',
	});
	req.session.captcha = captcha.text;
	res.type('svg');
	res.status(200).send(captcha.data);
});

router.post('/submit', (req, res) => {
	let username = req.body.username;
	let pid = req.body.problem;
	let contents = req.body.contents;
	let captcha = req.body.captcha;

	if (!req.session.captcha || captcha !== req.session.captcha) {
		res.json({
			success: false,
			error: 'Captcha not matched!',
		});
		return;
	}

	// check if all fields are valid
	if (!username || !contents || !pid) {
		res.json({
			success: false,
			error: 'Please fill all fields.',
		});
		return;
	}

	if (!(0 < username.length && username.length <= 16)) {
		res.json({
			success: false,
			error: 'Username must be shorter than 16 characters.',
		});
		return;
	}

	if (!Array('A', 'B', 'C', 'D', 'E', 'F').includes(pid)) {
		res.json({
			success: false,
			error: 'Problem ID not valid.',
		});
		return;
	}

	if (!(0 < contents.length && contents.length <= 1024)) {
		res.json({
			success: false,
			error: 'The contents must be shorter than 1024 characters.',
		});
		return;
	}

	new Promise((resolve, reject) => {
		let qry = 'INSERT INTO questions VALUES (NULL, :username, :contents, :pid, now())';
		let param = {
			username: username,
			contents: contents,
			pid: pid,
		};
		db.query(qry, param, (err) => {
			if (err) reject(new Error('An error occurred, please contact the administrator.'));
			resolve();
		});
	}).then(() => {
		res.json({
			success: true,
		});
	}).catch((err) => {
		res.json({
			success: false,
			error: err.message,
		});
	});
});

router.post('/login', (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	let captcha = req.body.captcha;

	if (!req.session.captcha || captcha !== req.session.captcha) {
		res.json({
			success: false,
			error: 'Captcha not matched.',
		});
	} else if (username !== process.env.ADMIN_USER || password !== process.env.ADMIN_PASS) {
		res.json({
			success: false,
			error: 'Invalid username or password.',
		});
	} else {
		req.session.is_admin = true;
		res.json({
			success: true,
		});
	}
});

router.get('/logout', (req, res) => {
	req.session.destroy(() => {
		res.redirect('/admin');
	});
});

router.post('/delete', (req, res) => {
	if (!req.session.is_admin) {
		res.redirect('/admin');
		return;
	}

	let csrf_token = req.body.csrf_token;
	let id = req.body.id;

	if (csrf_token != req.session.csrf_token) {
		res.redirect('/api/logout');
		return;
	}

	new Promise((resolve, reject) => {
		let qry = 'DELETE FROM questions WHERE id=:id';
		let param = {
			id: id,
		};
		db.query(qry, param, (err, rows) => {
			if (err) reject();
			resolve(rows.affectedRows);
		});
	}).then((cnt) => {
		res.json({
			success: true,
			cnt: cnt,
		});
	}).catch(() => {
		res.json({
			success: false,
			error: 'An error occurred, please try again or contact the admin.',
		});
	});
});

module.exports = router;

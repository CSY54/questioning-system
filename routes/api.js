'use strict';

const router = require('express').Router();
const svgCaptcha = require('svg-captcha');

const db = require('../db');

router.get('/captcha', (req, res) => {
  const captcha = svgCaptcha.create({
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
  const username = req.body.username;
  const pid = req.body.problem;
  const contents = req.body.contents;
  const captcha = req.body.captcha;

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

  if (!['A', 'B', 'C', 'D', 'E', 'F'].includes(pid)) {
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
    const qry = 'INSERT INTO questions VALUES'+
        '(NULL, :username, :contents, :pid, now())';
    const param = {
      username: username,
      contents: contents,
      pid: pid,
    };
    db.query(qry, param, (err) => {
      if (err) reject(new Error());
      resolve();
    });
  }).then(() => {
    res.json({
      success: true,
    });
  }).catch((err) => {
    res.json({
      success: false,
      error: 'An error occurred, please contact the administrator.',
    });
  });
});

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const captcha = req.body.captcha;

  if (!req.session.captcha || captcha !== req.session.captcha) {
    res.json({
      success: false,
      error: 'Captcha not matched.',
    });
  } else if (username !== process.env.ADMIN_USER ||
      password !== process.env.ADMIN_PASS) {
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

  const _csrf = req.body._csrf;
  const id = req.body.id;

  if (!req.session._csrf || _csrf != req.session._csrf) {
    res.redirect('/api/logout');
    return;
  }

  new Promise((resolve, reject) => {
    const qry = 'DELETE FROM questions WHERE id=:id';
    const param = {
      id: id,
    };
    db.query(qry, param, (err, rows) => {
      if (err) reject(new Error());
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

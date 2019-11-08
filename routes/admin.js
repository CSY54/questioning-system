'use strict';

const router = require('express').Router();
const moment = require('moment');
const crypto = require('crypto');

const db = require('../db');

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

  const _csrf = crypto.randomBytes(16).toString('hex');
  console.log(_csrf);
  req.session._csrf = _csrf;

  new Promise((resolve, reject) => {
    const qry = 'SELECT * FROM questions';
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
        _csrf: _csrf,
      },
    });
  }).catch((err) => {
    res.render('layout', {
      page: 'admin',
      data: {
        error: err,
        _csrf: _csrf,
      },
    });
  });
});

module.exports = router;

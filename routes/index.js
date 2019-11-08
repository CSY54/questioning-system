'use strict';

const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('layout', {
    page: 'index',
  });
});

router.get('/submitted', (req, res) => {
  res.render('layout', {
    page: 'submitted',
  });
});

module.exports = router;

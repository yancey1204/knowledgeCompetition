const express = require('express');
require('./../config/mongoose');

const router = express.Router();

router.use('/api', require('./catalog.route'));
router.use('/api', require('./bear.route'));

router.get('/', (req, res) => {
  res.send('Home page');
});

router.get('/about', (req, res) => {
  res.send('Learn about us');
});

module.exports = router;

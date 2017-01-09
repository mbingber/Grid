const express = require('express');
const router = express.Router();
const db = require('../firebase/db');

const userRouter = require('./user');

router.use(function(req, res, next) {
  req.db = db;
  next();
});

router.use('/user', userRouter);

router.use(function (req, res) {
  res.status(404).end();
});

module.exports = router;
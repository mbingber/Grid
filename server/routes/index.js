const express = require('express');
const router = express.Router();
const db = require('../firebase/db');

const userRouter = require('./user');

router.use((req, res, next) => {
  req.db = db;
  next();
});

router.use('/user', userRouter);

module.exports = router;
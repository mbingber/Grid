const express = require('express');
const router = express.Router();

router.post('/username', (req, res, next) => {
  req.db.ref(`/users/${req.body.uid}/username`)
    .set(req.body.username)
    .then(() => {
      res.send(200);
      res.end();
    });
});

module.exports = router;
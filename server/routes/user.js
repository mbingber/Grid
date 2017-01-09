const express = require('express');
const router = express.Router();

router.post('/username', function(req, res, next) {
  req.db.ref('/users/' + req.body.uid + '/username')
    // .set(req.body.username)
    // .then(function() {
    //   res.send(200);
    //   res.end();
    // }, function(err) {
    // 	console.log(err)
    // });
    .once('value')
    .then(function(nameSnp) {
    	console.log('!!!!!!!', nameSnp.val());
    	res.send(nameSnp.val());
    }, next);
});

module.exports = router;
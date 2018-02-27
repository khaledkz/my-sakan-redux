var express = require('express');
var router = express.Router();


ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
      return next();
  } else {
      //req.flash('error_msg','You are not logged in');
      res.redirect('/login');
  }
}


/* GET home page. */
router.get('/', ensureAuthenticated,function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

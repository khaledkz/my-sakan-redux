const express = require('express');
const router = express.Router();
const AuthenticationDb = require('../../../db-client/account/account');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new LocalStrategy(

      (username, password, done) => {

            cb = (err, user) => {
                  //step one check if there is err
                  if (err) { return done(err); }
                  //step two check if there is user same user entered
                  if (!user) {
                        return done(null, false);
                  }
                  //step three check if the password is match 
                  cb = (err, isMatch) => {

                        if (err) throw err

                        if (isMatch) {
                              return done(null, user);
                        } else {
                              return done(null, false);
                        }
                  }

                  bcrypt.compare(password, user.password, cb);
            }

            AuthenticationDb.findUser(username, cb);
      }
));

// FaceBook 



passport.use(new FacebookStrategy({
      clientID: '2013185912235171',
      clientSecret: '03b2fd1c36fbcadc97793dcd64acac7e',
      callbackURL: "http://localhost:4000/auth/facebook/callback" 
},
       (accessToken, refreshToken, profile, done) =>{
      
               cb=(err,user)=>{
                  if(err) throw err
                  if(user){
                        return done(null, user);
                  }else{
                        cb=(err)=>{
                              if (err) throw err 
                              return done(null);
                        }
                        
                        AuthenticationDb.saveFaceBookUser(profile.id,cb);
                  }
            }
            AuthenticationDb.findFaceBookUser(profile.id, cb);
                
      }
));


passport.serializeUser(function (user, done) {
      done(null, user.id);
});

passport.deserializeUser((id, done) => {

      cb = (err, user) => {
            done(err, user);
      }
      AuthenticationDb.findSingleUser(id, cb);

});




// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/login'
      })
);

//If your application needs extended permissions, they can be requested by setting the scope option.

// router.get('/auth/facebook',
//   passport.authenticate('facebook', { scope: ['email'] })
// );

// Multiple permissions can be specified as an array.

// app.get('/auth/facebook',
//   passport.authenticate('facebook', { scope: ['read_stream', 'publish_actions'] })
// );


router.get('/login', (req, res, next) => {
      res.render('add-login', { layout: false });
});

router.get('/create-account', (req, res, next) => {
      res.render('add-create-account', { layout: false });
});

router.post('/login',
      passport.authenticate('local', {
            successRedirect: '/', failureRedirect: '/login'
      })
);

router.post('/login/client-side', (req, res, next) => {
      const query=req.body;
      console.log(query)
      cb = (err, user) => {
            console.log(user)
            //step one check if there is err
            if (err) { res.json({authenticated:false}); }
            //step two check if there is user same user entered
            if (!user) {
                  return res.json({authenticated:false});
            }
            //step three check if the password is match 
            cb = (err, isMatch) => {
                   if (err) res.json({authenticated:false});

                  if (isMatch) {
                        return  res.json({authenticated:true});
                  } else {
                        return  res.json({authenticated:false});
                  }
            }

            bcrypt.compare(query.password, user.password, cb);
      }
       AuthenticationDb.findUser(query.username, cb);

})
router.post('/create-account', (req, res, next) => {

      const query = req.body;

      cb = () => {
            res.redirect('/');
      }
      AuthenticationDb.saveUser(query, cb);
})

router.get('/logout', function (req, res) {
      req.logout();
      res.redirect('/');
});

module.exports = router;
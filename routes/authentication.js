const User = require('../models/user'); // Import User Model Schema
const config = require('../config/database'); // Import database configuration

module.exports = (router, passport) => {
    router.post('/register', function (req, res, next) {
        passport.authenticate('local-signup', function (err, user, info) {
            if (err) {
                res.json({ success: false, message: info })
            } else {
                if (!user) {
                    res.json({ success: false, message: info })
                } else {
                    res.json({ success: true, message: info })
                }
            }
        })(req, res, next);
    });

    // process the login form
    router.post('/login', function (req, res, next) {
        passport.authenticate('local-login', function (err, user, info) {
            if (err) {
                res.json({ success: false, message: info })
            } else {
                if (!user) {
                    res.json({ success: false, message: info })
                } else {

                    res.json({ success: true, message: info })
                }
            }
        })(req, res, next);
    });

    router.get('/logout', (req, res) => {
        req.logout();
        req.session=null;
        res.clearCookie('connect.sid');
        console.log(req.session);
        console.log(req.cookies);
        res.json({success:true,message:'You were successfully log out'});
    });

    router.get('/isAuthenticated', function (req, res) {
        if (req.isAuthenticated()) {
            res.json({ success: true, message: req.user })
        } else {
            console.log(req.session);
            res.json({ success: false, message: 'You are not autheticated' })
        }

    });
    // send to google to do the authentication
    router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    // the callback after google has authenticated the user
    router.get('/auth/google/callback', function (req, res, next) {
        passport.authenticate('google', function (err, user, info) {
            if (err) {
                console.log(err);
                res.json({ success: false, message: info })
            } else {
                console.log(user)
                if (!user) {
                    res.json({ success: false, message: info })
                } else {
                        console.log(req.isAuthenticated());
                    res.redirect('http://localhost:4200/register');
                }
            }
        })(req, res, next);
    });
        
    router.get('/successjson', function (req, res) {
        res.json({ message: 'success' });
    });

    router.get('/failurejson', function (req, res) {
        res.json({ message: 'hello' });
    });
    return router;
}
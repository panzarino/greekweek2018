var express = require('express');
var router = express.Router();

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

router.post('/login', function(req, res) {
    var con = req.con;
    con.query('SELECT username, password FROM user WHERE username = ?',
        req.body.username, function(err, results) {
            if(err) {
              res.error(400);
            };
            if(results[0]['password'] == req.body.password) {
                console.log('Correct Password');
                //Generate Session
                req.session.regenerate(function(err) {
                    if(err) throw err;
                    req.session.loggedIn = true;
                    req.session.username = req.body.username;
                    res.send("Correct Password");
                });
            }else{
                console.log('Incorrect Password');
                res.error(400);
            }
        });
});

router.post('/register', function(req, res) {
    var con = req.con;
    con.query('INSERT INTO user(username, password) VALUES(?, ?)',
        req.body.username, req.body.password function(err, results) {
        if(err) throw err;
        console.log('User Created');
        //Generate Session
        req.session.regenerate(function(err) {
            if(err) {
              res.error(400);
            };
            req.session.loggedIn = true;
            req.session.username = req.body.username;
            res.send("User Created");
        });
    });
});

router.get('/logout', function(req,res) {
    console.log('Logout');
    req.session.destroy(function(err){
        if(err) {
          res.error(400);
        };
        res.send('Logged Out');
    });
});

module.exports = router;

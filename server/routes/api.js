var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//POSTS

router.post('/newpost', function(req, res) {
    console.log()
    console.log(req.session.userid);
    var q = 'INSERT INTO post (title, content, type, owner) VALUES ('
        +mysql.escape(req.body.title)+','
        +mysql.escape(req.body.content)+','
        +mysql.escape(parseInt(req.body.type))+','
        +mysql.escape(req.session.userid)+');';
    console.log(q);
    req.conn.query(q, function (err, results) {
        if(err) {
            res.status(400);
        };
        console.log(results);
        console.log('Post Created');
        res.send('Post Created');
    });
});

router.get('/allposts', function(req, res) {
    var q = 'SELECT p.title, p.content, p.type, p.owner, u.username FROM ' +
        'post p inner join user u on p.owner = u.id;';
   req.conn.query(q,
       function(err, results) {
        if(err) {
            res.status(400);
        }
        res.send(results);
   });
});

//USERS

router.post('/login', function(req, res) {
    console.log(req.body.username);
    var q = 'SELECT id, username, password FROM user WHERE username = '
        +mysql.escape(req.body.username)+';';
    console.log(q);
    console.log(q);
    console.log(q);

    req.conn.query(q, function(err, results) {
            if(err) {
              res.status(400);
            };
            console.log(results);
            if(results && results[0]['password'] == req.body.password) {
                console.log('Correct Password');
                //Generate Session
                var uid = results[0]['id'];
                console.log(uid);

                req.session.regenerate(function(err) {
                    if(err) throw err;
                    req.session.loggedIn = true;
                    req.session.username = req.body.username;
                    console.log(uid);
                    req.session.userid = uid;
                    res.send("Correct Password");
                });
            }else{
                console.log('Incorrect Password');
                res.status(400);
            }
        });
});

router.post('/register', function(req, res) {
    var conn = req.conn;
    console.log('A');
    conn.query('INSERT INTO user(username, password) VALUES('
    +mysql.escape(req.body.username)+','
    +mysql.escape(req.body.password)+')',
    function(err, results) {
        if(err) {
            console.error(err);
            res.status(400);
        };
        console.log(results);
        console.log('User Created');
        //Generate Session
        req.session.regenerate(function(err) {
            if(err) {
              res.status(400);
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
          res.status(400);
        };
        res.send('Logged Out');
    });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    var contents = fs.readFileSync('../template/index.html', 'utf8');
    //res.render('index', { title: 'Express' });
    res.send(contents);
});

module.exports = router;

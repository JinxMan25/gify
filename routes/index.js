var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var child_process = require('child_process');
var fs = require('fs-extra');
var util = require('util');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/video', function(req, res, next){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err,fields,files){
    console.log(files);
  });
});

module.exports = router;

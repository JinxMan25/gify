var express = require('express');
var router = express.Router();
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/get_video', function(req, res, next){
  var form = new formidable.IncomingForm();

  form.parse(req, function(err,fields,files){
    if (err){
      return next(err);
    }
  });
  form.on("end", function(fields,files){
    if (this.openedFiles.length == 0){
      return next(new Error ("You forgot the video!"));
    }
  });
});

module.exports = router;

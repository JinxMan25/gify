var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var child_process = require('child_process');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/get_video', function(req, res, next){
  var data = {}
  var startTime;
  var resolution;
  var remainingTime;
  var form = new formidable.IncomingForm();


  form.parse(req, function(err,fields,files){
    if (err){
      return next(err);
    } else {
    startTime = fields.starttime;
    remainingTime = fields.endtime;
    resolution = fields.resolution;
    }
  });
  form.on("end", function(fields,files){
    if (this.openedFiles.length == 0){
      return next(new Error ("You forgot the video!"));
    }
    var tmp_loc = this.openedFiles[0].path;
    var date = Date.now();
    var file_name = this.openedFiles[0].name;
    var img_url = 'static/images/' + date + '-' + file_name;
    
    child_process.exec('.././convert_to_gif.sh ../temp_videos/' + file_name + ' ' + res + ' ' + startTime + ' ' + remainingTime + ' ';

    

    date['img_url'] = img_url;
  });
});

module.exports = router;

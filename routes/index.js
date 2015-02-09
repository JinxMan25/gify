var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var child_process = require('child_process');
var fs = require('fs-extra');
var Q = require('q');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/video', function(req, res, next){
  var form = new formidable.IncomingForm();

  form.parse(req, function(err,fields,files){
    if (err){
      return next(err);
    }
  });
  form.on("end", function(fields, files){
    if (this.openedFiles.length == 0){
      return next(new Error ("You forgot the video!"));
    }
    var startTime = "00:00:30";
    var time = "5";
    var file = this.openedFiles[0].name;

    var date = Date.now();

    var video_file_loc = './static/temp/' + date + '-' + this.openedFiles[0].name;
    var gif_name = date + this.openedFiles[0].name.replace(/\.\w+/g, "");
    var tmp_loc = this.openedFiles[0].path;
    var img_url = './static/images/' + date + '-' + gif_name;
    promiseCopy(tmp_loc, video_file_loc, startTime, time, gif_name)


  });

  /*form.on("end", function(fields,files){
    var tmp_loc = this.openedFiles[0].path;
    var file_name = this.openedFiles[0].name;
    
    child_process.exec('.././convert_to_gif.sh ../temp_videos/' + file_name + ' ' + res + ' ' + startTime + ' ' + remainingTime + ' ');

    

    date['img_url'] = img_url;
  });*/
});

var promiseCopy = function(tmp, new_loc, beginning, length, name){
  fs.copy(tmp, new_loc,function(err){
    var deferred = Q.defer();
    if (err){
      console.log(err);
    } else {
      console.log('Uploaded');
      convert(new_loc, beginning, length, name);
    }
  });
}
var convert = function(file, start, remaining, name){
  child_process.exec('./convert_to_gif.sh ' + file + ' ' + start + ' ' + remaining + ' ' + name, function(err, data){
    if (err){
      console.log(err);
    } else {
    console.log(data);
    }
  });
}

  router.get('/test', function(req,res,next){
    child_process.exec('ls', function(err, data){
      console.log(err);
      console.log(data);
    });
  });

module.exports = router;

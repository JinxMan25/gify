var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var child_process = require('child_process');
var fs = require('fs-extra');

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
    data['title'] = fields.title;
  });
  console.log(data);
  form.on("end", function(fields, files){
    if (this.openedFiles.length == 0){
      return next(new Error ("You forgot the video!"));
    }
    var file = this.openedFiles[0].name;
    var date = Date.now();
    var video_file_loc = './static/temp/' + date + '-' + this.openedFiles[0].name;
    var gif_name = this.openedFiles[0].name.replace(/\.\w+/g, "");
    var tmp_loc = this.openedFiles[0].path;
    var img_url = './static/images/' + date + '-' + gif_name;

    fs.copy(tmp_loc, video_file_loc,function(err){
      if (err){
        console.log(err);
      } else {
        console.log(file + ' was uploaded ');
      }
    });
  });

  /*form.on("end", function(fields,files){
    var tmp_loc = this.openedFiles[0].path;
    var file_name = this.openedFiles[0].name;
    
    child_process.exec('.././convert_to_gif.sh ../temp_videos/' + file_name + ' ' + res + ' ' + startTime + ' ' + remainingTime + ' ');

    

    date['img_url'] = img_url;
  });*/
});

  router.get('/test', function(req,res,next){
    child_process.exec('./test.sh', function(err, data){
      console.log(err);
      console.log(data);
    });
  });

module.exports = router;

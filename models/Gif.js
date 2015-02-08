var mongoose = require('mongoose');

var GifSchema = new mongoose.Schema({
  file: String,
});

mongoose.model("Gif", GifSchema);

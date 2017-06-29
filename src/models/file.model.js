// Load the mongoose package
const mongoose = require('mongoose');

//Create the File Schema
const FileSchema = new mongoose.Schema({
  title: String,
  author: String,
  pages: String,
  created_at: { type: Date, default: Date.now },
  deleted: {type: Boolean, default: false},
});

//Make the new mongoose schema in a mongoose model and register it
const File = mongoose.model('File', FileSchema);

//export the model
module.exports = File;

//Seed the database
File.count({}, function(err, count) {
  if (err) {
    throw err;
  }

  if (count > 0) return ;

  const files = require('./file.seed.json');
  File.create(files, function(err, newFiles) {
    if (err) {
      throw err;
    }
    console.log("DB seeded")
  });
});

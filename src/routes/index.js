//src/routes/index.js

// Routing and controllers for HTTP
const router = require('express').Router(); //pulls in express
const mongoose = require('mongoose'); //pulls in mongoose

const FILES = [
  {id: 'a', title: 'The Eye of the World', author: 'Robert Jordan', pages: '782'},
  {id: 'b', title: 'The Great Hunt', author: 'Robert Jordan', pages: '681'},
  {id: 'c', title: 'The Dragon Reborn', author: 'Robert Jordan', pages: '675'},
  {id: 'd', title: 'The Shados Rising', author: 'Robert Jordan', pages: '981'},
  {id: 'e', title: 'The Fires of Heaven', author: 'Robert Jordan', pages: '963'},
];

router.use('/doc', function(req, res, next) {
  res.end('Documentation http://expressjs.com/');
});

//List handler - the GET endpoint
router.get('/file', function(req, res, next) {
  mongoose.model('File').find({}, function(err, files) {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }

    res.json(files);
  });
});

// Create handler - the POST endpoint
router.post('/file', function(req, res, next) {
  const File = mongoose.model('File');
  const fileData = {
    title: req.body.title, //body references body in body-parser because express is handling it for you
    author: req.body.author,
    pages: req.body.pages
  };

  File.create(fileData, function(err, newFile) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(newFile);
  });
});

// Update handler - the PUT endpoint
router.put('/file/:fileId', function(req, res, next) {
  const {fileId} = req.params;
  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  file.title = req.body.title;
  file.description = req.body.author;
  file.pages = req.body.pages;
  res.json(file);
});

// Delete handler - the DELETE endpoint
router.delete('/file/:fileId', function(req, res, next) {
  res.end(`Deleting file '${req.params.fileId}'`);
});

// Read handler - the second GET endpoint
router.get('/file/:fileId', function(req, res, next) {
  const {fileId} = req.params;
  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  res.json(file);
});

//export the Router so that it can be used in other files
module.exports = router;

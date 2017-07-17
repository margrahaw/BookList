//src/routes/index.js

// Routing and controllers for HTTP
const router = require('express').Router(); //pulls in express
const mongoose = require('mongoose'); //pulls in mongoose

router.use('/doc', function(req, res, next) {
  res.end('Documentation http://expressjs.com/');
});

//List handler - the GET endpoint
router.get('/file', function(req, res, next) {
  mongoose.model('File').find({deleted: {$ne: true}}, function(err, files) {
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
    pages: req.body.pages,
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
  const File = mongoose.model('File');
  const bookId = req.params.fileId;

  File.findById(bookId, function(err, file) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    if (!file) {
      return res.status(404).json({message: "There is no file with that ID"});
    }

    file.title = req.body.title;
    file.author = req.body.author;
    file.pages = req.body.pages;

    file.save(function(err, savedFile) {
      res.json(savedFile);
    })
  })
});

// Delete handler - the DELETE endpoint
router.delete('/file/:fileId', function(req, res, next) {
  const File = mongoose.model('File');
  const bookId = req.params.fileId;

  File.findById(bookId, function(err, book) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    if (!book) {
      return res.status(404).json({message: "Book not found"});
    }

    book.deleted = true;

    book.save(function(err, deletedBook) {
      res.json(deletedBook);
    })
  })
});

//export the Router so that it can be used in other files
module.exports = router;

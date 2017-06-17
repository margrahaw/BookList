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
  const {fileId} = req.params;
  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  res.json(file);
});

// Create handler - the POST endpoint
router.post('/file', function(req, res, next) {
  const newId = '' + FILES.length;
  const data = req.body;
  data.id = newId;

  FILES.push(data);
  res.status(201).json(data);
});

// Update handler - the PUT endpoint
router.put('/file/:fileId', function(req, res, next) {
  const {fileId} = req.params;
  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  file.title = req.body.title;
  file.description = req.body.description;
  res.json(file);
});

// Delete handler - the DELETE endpoint
router.delete('/file/:fileId', function(req, res, next) {
  res.end(`Deleting file '${req.params.fileId}'`);
});

// Read handler - the second GET endpoint
router.get('/file/:fileId', function(req, res, next) {
  res.end(`Reading file '${req.params.fileId}'`);
});

//export the Router so that it can be used in other files
module.exports = router;

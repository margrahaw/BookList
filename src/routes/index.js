//src/routes/index.js

// Routing and controllers for HTTP
const router = require('express').Router();

const FILES = [
  {id: 'a', title: 'cutecat1.jpg', description: 'A cute cat'},
  {id: 'b', title: 'uglycat1.jpg', description: 'Just kidding, all cats are cute'},
  {id: 'c', title: 'total_recall_poster.jpg', description: 'Quaid, start the reactor...'},
  {id: 'd', title: 'louisville_coffee.txt', description: 'Coffee shop ratings'},
];

router.use('/doc', function(req, res, next) {
  res.end('Documentation http://expressjs.com/');
});

//List handler
router.get('/file', function(req, res, next) {
  const {fileId} = req.params;
  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  res.json(file);
});

// Create handler
router.post('/file', function(req, res, next) {
  const newId = '' + FILES.length;
  const data = req.body;
  data.id = newId;

  FILES.push(data);
  res.status(201).json(data);
});

// Update handler
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

// Delete handler
router.delete('/file/:fileId', function(req, res, next) {
  res.end(`Deleting file '${req.params.fileId}'`);
});

// Read handler
router.get('/file/:fileId', function(req, res, next) {
  res.end(`Reading file '${req.params.fileId}'`);
});

module.exports = router;

// src/server.js
'use strict';

// Require necessary modules
const path        = require("path");
const bodyParser  = require("body-parser");
const express     = require("express");
const config      = require("./config");
const router      = require('./routes');



// Creates the application object
const app = express();

// Handle static files
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.use(function(req, res, next) {
  console.log("req.body BEFORE parsing", req.body);
  next();
})

app.use(bodyParser.json());

app.use(function(req, res, next) {
  console.log("req.body AFTER parsing", req.body);
  next();
})

app.use('/api', router);


// Starts the server and logs what port the app is running on
app.listen(config.port, function(){
  console.log(`${config.appName} is listening on port ${config.port}!`);
});

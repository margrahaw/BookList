'use strict';

const express = require("express");
// const config = require("./config");
const app = express();

app.use('/doc', function(req, res, next) {
  res.end('Documentation http://expressjs.com/');
});

app.use(function(req, res, next){
  res.end("Hello World!");
});

app.listen(3000, function(){
  console.log("The server has been created by the impressive MG!");
});

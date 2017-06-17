// src/server.js
'use strict';

// Require necessary modules
const path        = require("path"); // Adds a reference to Node's path module
const bodyParser  = require("body-parser"); // Parses the content of the body
const express     = require("express"); // Adds the express module which is a dependency as listed in the package.json file
const mongoose    = require("mongoose"); // Connects to mongo through the mongoose libary
const config      = require("./config"); // Adds the local files in the config folder
const router      = require('./routes'); // Adds the local files in the routes folder

// Connect to MongoDB and create/use the database as configured
mongoose.connect(`mongodb://${config.db.host}/${config.db.dbName}`);

// Import all models
require('./models/file.model.js');

// Creates the application object
const app = express();

// Handle static files
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath)); // Searches the public directory for a file that matches the requested path

// Tell the app to use body-parser
app.use(bodyParser.json());

// Tell the app to use an /api endpoint
app.use('/api', router);


// Starts the server and logs what port the app is running on
app.listen(config.port, function(){
  console.log(`${config.appName} is listening on port ${config.port}!`);
});

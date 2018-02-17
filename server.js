const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// initialize express application to respond to client requests
var app = express();
var port = 3000;

// set up body parser package to parse data
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// add routing functionality
require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

// start listening on the specified port
app.listen(port, () => { console.log('listening...') });


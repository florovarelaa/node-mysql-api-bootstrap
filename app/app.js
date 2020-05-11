const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/index.js');

let app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

module.exports = app;
const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user.routes');

let app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

userRoutes(app);

module.exports = app;
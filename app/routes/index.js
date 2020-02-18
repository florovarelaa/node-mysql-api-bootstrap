const express = require('express');

const userRoutes = require('./user.routes');

let app = express();

app.use('/', userRoutes);

module.exports = app;
const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./app/routes/user.routes');

let app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
    res.json({ message: 'root..' });
});

userRoutes(app);

app.listen(3000);
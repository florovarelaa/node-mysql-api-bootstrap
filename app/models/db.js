const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

//create a connection to the database
const connection = mysql.createConnection(dbConfig);

//open the MySQL connection
connection.connect( error => {
    if (error) {
        console.log('error', error)
        throw error;
    }
    console.log('Succesfully connected to the database.');
});

module.exports = connection;
var mysql = require("mysql");
const express = require("express");
const app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "NewPassword",
    database: 'hajj_database',
});

module.exports = connection;
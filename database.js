var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    user:"root",
    password:"1234",
    database:'hajj_database',
});

    connection.connect(function(err){
        if(err) 
        console.log(err);
        else console.log("dataBase connected!");
    })
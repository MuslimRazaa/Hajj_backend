var express = require("express");
var app = express();
var connection = require("./database");

const db = require("./models")

const {User} = require("./models")



app.get('/', function(req, res){
    res.send("my first backend project , backchodi nahi..");
});
app.get('/select', function(req, res){
    res.send("/select ~ ~ my first backend project , backchodi nahi..");
});
app.get('/insert', function(req, res){
    User.create({
        firstName: "Ali ALi",
        email: "Ali@gshok.com",
        password:"NewPassword"
    }).catch((err) =>{
        if (err){
            console.log(err)
        }
    })
});
app.get('/delete', function(req, res){
    res.send("/delete ~ ~ my first backend project , backchodi nahi..");
});


db.sequelize.sync().then((req) =>{

app.listen(3000, function(){
    console.log("app listening on port 3000, hapy hacking");
    connection.connect(function(err){
        if(err) throw err;
        else console.log("dataBase connected!");
    })
});
});


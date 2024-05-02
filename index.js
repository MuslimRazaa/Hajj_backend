var express = require("express");
var app = express();
app.use(express.json());

var connection = require("./database");

const db = require("./models")

const {User} = require("./models")



// app.get('/', function(req, res){
//     res.send("my first backend project ,..");
// });
app.get('/select', function(req, res){
    res.send("/select ~ ~ my first backend project ..");
});
app.post('/insert', function(req, res){
    console.log('body',req.body)
    User.create({
        firstName: "Clara",
        email: "calara@gshok.com",
        password:"NewPassword"
    })
    .then(() => {
        res.send("inserted successfully")
    })
    .catch((err) =>{
        res.send("error in insertion")
        if (err){
            console.log(err)
        }
    })
    
});
app.get('/delete', function(req, res){
    res.send("/delete ~ ~ my first backend project.");
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


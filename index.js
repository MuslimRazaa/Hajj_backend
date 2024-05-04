var express = require("express");
var app = express();
app.use(express.json());

var connection = require("./database");

const db = require("./models")

const {User} = require("./models");
const {AddPackage} = require("./models");



// app.get('/', function(req, res){
//     res.send("my first backend project ,..");
// });

console.log(AddPackage, "pacckk"); // Check if AddPackage is defined and imported

app.get('/select', function(req, res){
    res.send("/select ~ ~ my first backend project ..");
});
app.post('/insert', function(req, res){
    console.log('body',req.body)
    User.create({
        firstName: req.body.firstName,
        email: req.body.email,
        password:req.body.password,
        roleId: req.body.roleId,
        packageId: req.body.packageId,
        deletedAt: req.body.deletedAt,
        deletedBy: req.body.deletedBy,
        createdBy:req.body.createdBy,
        updatedBy: req.body.updatedBy,
        isDeleted: req.body.isDeleted,
    })
    .then(() => {
        res.send("User Added successfully")
    })
    .catch((err) =>{
    console.error(err); // Log the error
    res.status(500).send("Error in insertion of package"); // Send an error response with status code 500
})
    
});
app.post('/AddPackage', function(req, res){
    console.log('body',req.body)
    AddPackage.create({
        packageName: req.body.packageName,
        availiblity: req.body.availiblity,
        from: req.body.from,
        to: req.body.to,
        startDestination: req.body.startDestination,
        finalDestination: req.body.finalDestination,
        price: req.body.price,
        currency: req.body.currency,
        packageEssentials: req.body.packageEssentials,
        travelInformation:req.body.travelInformation,
        extra: req.body.extra,
        isDeleted: req.body.isDeleted,
    })
    .then(() => {
        res.send("package Added successfully")
    })
    .catch((err) =>{
        res.send(err, "error in insertion")
        if (err){
            console.log(err)
        }
    })
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


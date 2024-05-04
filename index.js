var express = require("express");
var app = express();
app.use(express.json());

var connection = require("./database");

const db = require("./models")

const {User} = require("./models");

// Import the Package model and pass sequelize
const PackageModel = require("./models/Package");
const Package = PackageModel(db.sequelize, db.Sequelize); // Pass sequelize and DataTypes to the Package model

// ------------


app.get('/getUser/:id', function(req, res){
    const userId = req.params.id; // Get the user ID from the request parameters
    User.findByPk(userId) // Find the user by primary key (assuming your primary key field is named 'id')
        .then(user => {
            if (!user) {
                res.status(404).send('User not found'); // If user is not found, send a 404 response
            } else {
                res.json(user); // Send the user data as JSON response
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error'); // If an error occurs, send a 500 response
        });
});

app.post('/addUser', function(req, res){
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
})
    
});

app.post('/addPackage', function(req, res) {
  const packageData = req.body; // Get the package data from the request body
  console.log(Package, "my packageeeee"); // Add this line to check the value of Package
    Package.create({
        packageName: packageData.packageName,
        availiblity: packageData.availiblity,
        from: packageData.from,
        to: packageData.to,
        startDestination: packageData.startDestination,
        finalDestination: packageData.finalDestination,
        price: packageData.price,
        currency: packageData.currency,
        packageEssentials: packageData.packageEssentials,
        travelInformation: packageData.travelInformation,
        extra: packageData.extra,
        isDeleted: packageData.isDeleted,
        deletedAt: packageData.deletedAt,
        deletedBy: packageData.deletedBy,
        createdBy:packageData.createdBy,
        updatedBy: packageData.updatedBy,
    })
    .then((package) => {
        res.send("Package added successfully: " + JSON.stringify(package));
    })
    .catch((err) => {
        console.error("Error adding package:", err);
        res.status(500).send("Error adding package");
    });
});

app.get('/getPackage/:id', function(req, res){
    const packageId = req.params.id; // Get the package ID from the request parameters
    Package.findByPk(packageId) // Find the package by primary key
        .then(package => {
            if (!package) {
                res.status(404).send('Package not found'); // If package is not found, send a 404 response
            } else {
                res.json(package); // Send the package data as JSON response
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error'); // If an error occurs, send a 500 response
        });
});


db.sequelize.sync().then((req) =>{

app.listen(3000, function(){
    console.log("app listening on port 3000, hapy hacking");
    connection.connect(function(err){
        if(err) throw console.log(err);
        else console.log("dataBase connected!");
    })
});
});
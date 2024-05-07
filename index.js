var express = require("express");
var app = express();
app.use(express.json());
app.set("view engine", "ejs");
let ejs = require('ejs');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path')
var connection = require("./database");
const bcrypt = require("bcrypt")
const db = require("./models")
const {User} = require("./models");
const cookieParser = require("cookie-parser")

// Import the Package model and pass sequelize
const PackageModel = require("./models/Package");
const Package = PackageModel(db.sequelize, db.Sequelize); // Pass sequelize and DataTypes to the Package model


// ------------
app.use(cookieParser());

app.post('/uploadImage', upload.single('file'), function (req, res, next) {
    // Check if a file was uploaded successfully
    if (!req.file) {
        // If no file was uploaded, return an error response
        return res.status(400).send('Error uploading file');
    }
    
    // If a file was uploaded successfully, return a success response
    console.log("file uploaded")
    return res.json(req.file);
});


app.post('/addUser', function(req, res){
    console.log('body',req.body)
    const {email , password} = req.body;
    bcrypt.hash(password, 10).then((hash) =>{
User.create({
        firstName: req.body.firstName,
        email: email,
        password: hash,
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
    res.status(500).send(err); // Send an error response with status code 500
})
    })  
});

app.post("/login", async(req, res)=>{
    const {email , password} = req.body;

    const user = await User.findOne({where: {email: email}});
    if(!user) res.status(400).json({error: "user doesn't exist"});
    console.log(email, "emaillll"); // Logging the email variable
    const dbPassword = user.password; // Use user.password instead of User.password
    bcrypt.compare(password, dbPassword).then((match) =>{
        if(!match){
            res.status(400).json({error: "Incorrect Email and Password"})
        }else {
            res.json("LOGGED IN SUCCESSFULLY!!")
        }
    });
});


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
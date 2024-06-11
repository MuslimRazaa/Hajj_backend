const express = require("express");
const app = express();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');
const connection = require("./database");
const bcrypt = require("bcrypt");
const db = require("./models");
const { User } = require("./models");
const cookieParser = require("cookie-parser");
const { createToken, validateToken } = require('./JWT');
const PackageModel = require("./models/Package");
const cors = require('cors');
const Package = PackageModel(db.sequelize, db.Sequelize);

app.use(express.json());
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(cors());

app.post('/uploadImage', upload.array('files', 10), function (req, res, next) {
    // Check if files were uploaded successfully
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('Error uploading files');
    }
    
    // If files were uploaded successfully, return a success response
    console.log("files uploaded");
    return res.json(req.files);
});

app.post('/addUser', function(req, res){
    const {email , password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        User.create({
            firstName: req.body.firstName,
            email: email,
            password: hash,
            roleId: req.body.roleId,
            packageId: req.body.packageId,
            deletedAt: req.body.deletedAt,
            deletedBy: req.body.deletedBy,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy,
            isDeleted: req.body.isDeleted,
        })
        .then(() => {
            res.send("User Added successfully");
        })
        .catch((err) =>{
            console.error(err);
            res.status(500).send(err);
        });
    });
});

app.post("/login", async(req, res) => {
    const {email , password} = req.body;
    const user = await User.findOne({where: {email: email}});
    if (!user) return res.status(400).json({error: "User doesn't exist"});
    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
        if (!match) {
            res.status(400).json({error: "Incorrect Email and Password"});
        } else {
            const accessToken = createToken(user);
            res.cookie("access-token", accessToken, { maxAge: 60*60 });
            res.json("LOGGED IN SUCCESSFULLY!!");
        }
    });
});

app.get('/getUser/:id', function(req, res){
    const userId = req.params.id;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                res.status(404).send('User not found');
            } else {
                res.json(user);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

app.post('/addPackage', function(req, res) {
    const packageData = req.body;
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
        createdBy: packageData.createdBy,
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

app.get('/getPackage/:id', validateToken, function(req, res){
    const packageId = req.params.id;
    Package.findByPk(packageId)
        .then(package => {
            if (!package) {
                res.status(404).send('Package not found');
            } else {
                res.json(package);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

app.get('/getAllPackages', function(req, res) {
    Package.findAll()
        .then(packages => {
            res.json(packages);
        })
        .catch(err => {
            console.error("Error fetching packages:", err);
            res.status(500).send("Error fetching packages");
        });
});

app.put('/updatePackage/:id', function(req, res) {
    const packageId = req.params.id;
    const updatedData = req.body;
    Package.findByPk(packageId)
        .then(package => {
            if (!package) {
                res.status(404).send('Package not found');
            } else {
                return package.update(updatedData);
            }
        })
        .then(updatedPackage => {
            res.send("Package updated successfully: " + JSON.stringify(updatedPackage));
        })
        .catch(err => {
            console.error("Error updating package:", err);
            res.status(500).send("Error updating package");
        });
});



db.sequelize.sync().then((req) => {
    app.listen(3000, function(){
        console.log("app listening on port 3000, happy hacking");
        connection.connect(function(err){
            if(err) throw console.log(err);
            else console.log("database connected!");
        });
    });
});

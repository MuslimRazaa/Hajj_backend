const { EmptyResultError } = require("sequelize")

module.exports =(sequelize, Datatypes) =>{
    const User = sequelize.define("User", {
        firstName:{
            type: Datatypes.STRING,
            allowWNull: false,
            validate:{
                notEmpty: true
            },
        },
        email:{
            type: Datatypes.STRING,
            allowWNull: false,
            validate:{
                notEmpty: true
            },
        },
        password:{
            type: Datatypes.STRING,
            allowWNull: false,
            validate:{
                notEmpty: true
            },
        },
    
    });
    return User;
};
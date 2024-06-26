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
        roleId:{
            type: Datatypes.INTEGER,
            allowWNull: false,
            validate:{
                notEmpty: true
            },
        },
        packageId:{
            type: Datatypes.INTEGER,
            allowWNull: true,
            validate:{
                notEmpty: false
            },
        },
         deletedAt:{
            type: Datatypes.DATE,
            allowWNull: false,
            validate:{
                notEmpty: false
            },
        },
         deletedBy:{
            type: Datatypes.INTEGER,
            allowWNull: false,
            validate:{
                notEmpty: false
            },
        },
         createdBy:{
            type: Datatypes.INTEGER,
            allowWNull: false,
            validate:{
                notEmpty: true
            },
        },
         updatedBy:{
            type: Datatypes.INTEGER,
            allowWNull: false,
            validate:{
                notEmpty: false
            },
        },
        isDeleted:{
            type: Datatypes.BOOLEAN,
            allowWNull: false,
            defaultValue: false // Set default value to true or false as needed

        },
    });
    return User;
};
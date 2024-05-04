const { EmptyResultError } = require("sequelize")

module.exports =(sequelize, Datatypes) =>{
    const Package = sequelize.define("Package", {
        packageName:{
            type: Datatypes.STRING,
            allowWNull: false,
            validate:{
                notEmpty: true
            },
        },
        availiblity:{
            type: Datatypes.BOOLEAN,
            allowWNull: false,
            validate:{
                notEmpty: true
            },
        },
        from:{
            type: Datatypes.STRING,
            allowWNull: false,
            validate:{
                notEmpty: true
            },
        },
        to:{
            type: Datatypes.INTEGER,
            allowWNull: false,
            validate:{
                notEmpty: true
            },
        },
        startDestination:{
            type: Datatypes.STRING,
            allowWNull: true,
            validate:{
                notEmpty: false
            },
        },
         finalDestination:{
            type: Datatypes.STRING,
            allowWNull: false,
            validate:{
                notEmpty: false
            },
        },
         price:{
            type: Datatypes.INTEGER,
            allowWNull: false,
            validate:{
                notEmpty: false
            },
        },
         currency:{
            type: Datatypes.STRING,
            allowWNull: false,
            validate:{
                notEmpty: true
            },
        },
         packageEssentials:{
            type: Datatypes.STRING,
            allowWNull: false,
            validate:{
                notEmpty: false
            },
        },
        travelInformation:{
            type: Datatypes.STRING,
            allowWNull: false,

        },
        extra:{
            type: Datatypes.STRING,
            allowWNull: false,

        },
        roomType:{
            type: Datatypes.STRING,
            allowWNull: false,

        },
        deletedAt:{
            type: Datatypes.DATE,
            allowWNull: false,

        },
        createdBy:{
            type: Datatypes.INTEGER,
            allowWNull: false,

        },
        updatedBy:{
            type: Datatypes.INTEGER,
            allowWNull: false,

        },
        deletedBy:{
            type: Datatypes.INTEGER,
            allowWNull: false,

        },
        isDeleted:{
            type: Datatypes.BOOLEAN,
            allowWNull: false,
            defaultValue: false // Set default value to true or false as needed

        },
    });
    return Package;
};
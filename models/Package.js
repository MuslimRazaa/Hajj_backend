'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Package.init({
    packageName: DataTypes.STRING,
    availiblity: DataTypes.BOOLEAN,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    startDestination: DataTypes.STRING,
    finalDestination: DataTypes.STRING,
    price: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    packageEssentials: DataTypes.STRING, // Corrected attribute name
    travelInformation: DataTypes.STRING,
    extra: DataTypes.STRING,
    roomType: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    deletedBy: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Package',
  });
  return Package;
};
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 queryInterface.addColumn('Users', 'packageId', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    queryInterface.addColumn('Users', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true
    });
    queryInterface.addColumn('Users', 'deletedBy', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    queryInterface.addColumn('Users', 'createdBy', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    queryInterface.addColumn('Users', 'updatedBy', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    queryInterface.addColumn('Users', 'isDeleted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false 
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

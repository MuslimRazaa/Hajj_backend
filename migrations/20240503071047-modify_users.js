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


// 'deletedAt','deletedBy','createdBy','updatedBy', 'isDeleted',
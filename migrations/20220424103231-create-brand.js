'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Brands', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      brandName: {
        type: Sequelize.STRING
      },
      image:{
        type: DataTypes.ARRAY(DataTypes.STRING)
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Brands');
  }
};
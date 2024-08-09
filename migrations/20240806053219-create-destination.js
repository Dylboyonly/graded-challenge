'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Destinations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      MainImage: {
        type: Sequelize.STRING,
        allowNull:false
      },
      Overview: {
        type: Sequelize.STRING,
        allowNull:false
      },
      OverviewImg: {
        type: Sequelize.STRING,
        allowNull:false
      },
      Culture: {
        type: Sequelize.STRING,
        allowNull:false
      },
      CultureImg: {
        type: Sequelize.STRING,
        allowNull:false
      },
      Food: {
        type: Sequelize.STRING,
        allowNull:false
      },
      FoodImg: {
        type: Sequelize.STRING,
        allowNull:false
      },
      Site: {
        type: Sequelize.STRING,
        allowNull:false
      },
      SiteImg: {
        type: Sequelize.STRING,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Destinations');
  }
};
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Houses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.BIGINT
      },
      landarea: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.TEXT
      },
      lat: {
        type: Sequelize.DOUBLE
      },
      long: {
        type: Sequelize.DOUBLE
      },
      numfloor: {
        type: Sequelize.INTEGER
      },
      bedroom: {
        type: Sequelize.INTEGER
      },
      bathroom: {
        type: Sequelize.INTEGER
      },
      carport: {
        type: Sequelize.BOOLEAN
      },
      garden: {
        type: Sequelize.BOOLEAN
      },
      kitchen: {
        type: Sequelize.BOOLEAN
      },
      yard: {
        type: Sequelize.BOOLEAN
      },
      livingroom: {
        type: Sequelize.BOOLEAN
      },
      diningroom: {
        type: Sequelize.BOOLEAN
      },
      foundation: {
        type: Sequelize.STRING
      },
      wall: {
        type: Sequelize.ENUM('Bata Ringan', 'Bata Berat', 'Plaster', 'Aci', 'Kayu', 'Baja')
      },
      floortype: {
        type: Sequelize.STRING
      },
      floorlength: {
        type: Sequelize.INTEGER
      },
      sanitary: {
        type: Sequelize.ENUM('Shower', 'Bathub', 'Closet Duduk', 'Closet Jongkok')
      },
      jamb: {
        type: Sequelize.STRING
      },
      ceiling: {
        type: Sequelize.STRING
      },
      roof: {
        type: Sequelize.STRING
      },
      electricity: {
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
            schema: 'public'
          },
          key: 'id',
          as: 'UserId'
        }
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Houses');
  }
};
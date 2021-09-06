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
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      type: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      price: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      landarea: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      certificate: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      address: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      lat: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      long: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      images: Sequelize.JSON,
      numfloor: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      bedroom: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      bathroom: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      carport: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      garden: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      kitchen: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      yard: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      livingroom: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      diningroom: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      foundation: {
        type: Sequelize.STRING(25)
      },
      wall: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      floortype: {
        type: Sequelize.STRING(25)
      },
      floorlength: {
        type: Sequelize.INTEGER
      },
      sanitary: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      jamb: {
        type: Sequelize.STRING(25)
      },
      ceiling: {
        type: Sequelize.STRING(25)
      },
      roof: {
        type: Sequelize.STRING(25)
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
        },
        allowNull: false,
        onDelete: 'CASCADE'
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
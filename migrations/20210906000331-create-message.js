'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.TEXT
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
      HouseId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Houses',
            schema: 'public'
          },
          key: 'id',
          as: 'HouseId'
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
    await queryInterface.dropTable('Messages');
  }
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.User, {
        foreignKey: 'UserId',
        onDelete: 'CASCADE'
      })
      Message.belongsTo(models.House, {
        foreignKey: 'HouseId',
        onDelete: 'CASCADE'
      })
    }
  };
  Message.init({
    message: DataTypes.TEXT,
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    HouseId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
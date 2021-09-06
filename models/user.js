'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(House, {
        foreignKey: 'UserId',
      })
      User.hasMany(Message, {
        foreignKey: 'UserId',
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lastName: DataTypes.STRING(50),
    role: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    phone: DataTypes.STRING(20)
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
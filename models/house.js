'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class House extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      House.belongsTo(models.User, {
        foreignKey: 'UserId',
        onDelete: 'CASCADE'
      })
      House.hasMany(models.Message, {
        foreignKey: 'HouseId',
      })
    }
  };
  House.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    type: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    price: {
      allowNull: false,
      type: DataTypes.BIGINT
    },
    landarea: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    certificate: {
      allowNull: false,
      type: DataTypes.STRING(20)
    },
    address: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    lat: {
      allowNull: false,
      type: DataTypes.DOUBLE
    },
    long: {
      allowNull: false,
      type: DataTypes.DOUBLE
    },
    images: DataTypes.JSON,
    numfloor: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    bedroom: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    bathroom: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    carport: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    garden: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    kitchen: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    yard: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    livingroom: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    diningroom: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    foundation: DataTypes.STRING(25),
    wall: DataTypes.ARRAY(DataTypes.STRING),
    floortype: DataTypes.STRING(25),
    floorlength: DataTypes.INTEGER,
    sanitary: DataTypes.ARRAY(DataTypes.STRING),
    jamb: DataTypes.STRING(25),
    ceiling: DataTypes.STRING(25),
    roof: DataTypes.STRING(25),
    electricity: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'House',
  });
  return House;
};
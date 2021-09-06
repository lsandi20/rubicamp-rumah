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
      House.belongsTo(User, {
        foreignKey: 'UserId',
        onDelete: 'CASCADE'
      })
      House.hasMany(Message, {
        foreignKey: 'HouseId',
      })
    }
  };
  House.init({
    name: DataTypes.STRING,
    type: DataTypes.INTEGER,
    price: DataTypes.BIGINT,
    landarea: DataTypes.INTEGER,
    address: DataTypes.TEXT,
    lat: DataTypes.DOUBLE,
    long: DataTypes.DOUBLE,
    numfloor: DataTypes.INTEGER,
    bedroom: DataTypes.INTEGER,
    bathroom: DataTypes.INTEGER,
    carport: DataTypes.BOOLEAN,
    garden: DataTypes.BOOLEAN,
    kitchen: DataTypes.BOOLEAN,
    yard: DataTypes.BOOLEAN,
    livingroom: DataTypes.BOOLEAN,
    diningroom: DataTypes.BOOLEAN,
    foundation: DataTypes.STRING,
    wall: DataTypes.ENUM('Bata Ringan', 'Bata Berat', 'Plaster', 'Aci', 'Kayu', 'Baja'),
    floortype: DataTypes.STRING,
    floorlength: DataTypes.INTEGER,
    sanitary: DataTypes.ENUM('Shower', 'Bathub', 'Closet Duduk', 'Closet Jongkok'),
    jamb: DataTypes.STRING,
    ceiling: DataTypes.STRING,
    roof: DataTypes.STRING,
    electricity: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'House',
  });
  return House;
};
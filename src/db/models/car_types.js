'use strict';
const commonOptionSequelize = require('../utils/commonSequelizeOption')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class car_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  car_types.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }, seat: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue:1
    }, 
    serial_user_car_rental_show: {
        type: DataTypes.INTEGER,
    }
}, {
    sequelize,
    modelName: 'car_types',
    tableName:'car_types',
    ...commonOptionSequelize
  });
  return car_types;
};
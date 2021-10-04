'use strict';
const commonOptionSequelize = require('../utils/commonSequelizeOption')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class car_color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  car_color.init({
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    car_type_id: {
        type: DataTypes.INTEGER,
    }
}, {
    sequelize,
    modelName: 'car_color',
  });
  return car_color;
};
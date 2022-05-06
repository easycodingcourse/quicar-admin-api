'use strict';
const {
  Model
} = require('sequelize');
const commonSequelizeOption = require('../utils/commonSequelizeOption');
module.exports = (sequelize, DataTypes) => {
  class car_model extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  car_model.init({
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    car_type_id: {
        type: DataTypes.INTEGER,
    }
}, {
    sequelize,
    modelName: 'car_model',
    tableName:'car_model',
    ...commonSequelizeOption
  });
  return car_model;
};
'use strict';
const commonOptionSequelize = require('../utils/commonSequelizeOption')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class car_year extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  car_year.init({
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    car_type_id: {
        type: DataTypes.INTEGER,
    },
    car_model_id: {
        type: DataTypes.INTEGER,
    }, 
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
}, {
    sequelize,
    modelName: 'car_year',
    tableNameL:'car_year',
    ...commonOptionSequelize
  });
  return car_year;
};
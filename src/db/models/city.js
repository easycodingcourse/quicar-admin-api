'use strict';
const commonOptionSequelize = require('../utils/commonSequelizeOption')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class city extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  city.init({
      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      bn_name: {
          type: DataTypes.STRING,
      },
      district_id: {
          type: DataTypes.INTEGER,
      },
      status: {
          type: DataTypes.INTEGER,
          defaultValue: 1
      },

  }, {
    sequelize,
    modelName: 'city',
    tableName:'city',
    ...commonOptionSequelize
  });
  return city;
};
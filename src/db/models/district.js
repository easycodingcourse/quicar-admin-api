'use strict';
const {
  Model
} = require('sequelize');
const commonSequelizeOption = require('../utils/commonSequelizeOption');
module.exports = (sequelize, DataTypes) => {
  class district extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  district.init({
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bn_name: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },

  }, {
    sequelize,
    modelName: 'district',
    tableName:'district',
    ...commonSequelizeOption
  });
  return district;
};
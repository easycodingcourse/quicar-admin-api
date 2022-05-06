'use strict';
const commonOptionSequelize = require('../../../utils/commonSequelizeOption')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasOne(models.ride_list)
    }
  };
  users.init({
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      
    },
    dob: {
      type: DataTypes.DATE,
    },
    balance: {
      type: DataTypes.DECIMAL(20, 2),
      defaultValue: 0,
    },
    cash_back_balance: {
      type: DataTypes.DECIMAL(20, 2),
      defaultValue: 0,
    },
    nid: {
      type: DataTypes.DECIMAL(20, 2),
      unique: true,
    },
    account_status: {
      type: DataTypes.STRING(),
      defaultValue: 1,
    },
    img: {
      type: DataTypes.STRING(),

      get() {
        const img = this.getDataValue('img');
        return img ? "https://quicarbd.com/mobileapi/user/api/user_photo/"+img : null;
      }
    },
    rating: {
      type: DataTypes.DECIMAL(10, 1),
      defaultValue: 1.5,
    },
    login_otp: {
      type: DataTypes.STRING(),
    },
  }, {
    sequelize,
    modelName: 'users',
    tableName:"users",
    ...commonOptionSequelize
  });
  return users;
};
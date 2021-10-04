'use strict';
const {
  Model
} = require('sequelize');
const commonSequelizeOption = require('../utils/commonSequelizeOption');
module.exports = (sequelize, DataTypes) => {
  class drivers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      drivers.hasOne(models.ride_biting,{foreignKey:'driver_id'})
    }
  };
  drivers.init({
    name: DataTypes.STRING,
    email:{
      type:DataTypes.STRING,
      unique:true
    },
    phone :{
      type:DataTypes.STRING,
      unique:true
    },
    dob:{
      type:DataTypes.STRING
    },
    c_status:{
      type:DataTypes.STRING,
      defaultValue:0
    },
    owner_id:{
      type:DataTypes.STRING
    },
    license:{
      type:DataTypes.STRING
    },
    license:{
      type:DataTypes.DATE
    },
    car_id:{
      type:DataTypes.STRING
    },
    nid:{
      type:DataTypes.STRING
    },
    account_status:{
      type:DataTypes.STRING,
      defaultValue:0
    },
    district_id:{
      type:DataTypes.INTEGER
    },
    city_id:{
      type:DataTypes.INTEGER
    },
    address:{
      type:DataTypes.STRING
    },
    driver_photo:{
      type:DataTypes.STRING
    },
    nid_font_pic:{
      type:DataTypes.STRING
    },
    nid_back_pic:{
      type:DataTypes.STRING
    },
    license_font_pic:{
      type:DataTypes.STRING
    },
    license_back_pic:{
      type:DataTypes.STRING
    },
    rating:{
      type:DataTypes.STRING
    }

  }, {
    sequelize,
    modelName: 'drivers',
    tableName:'drivers',
    ...commonSequelizeOption
  });
  return drivers;
};
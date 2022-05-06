'use strict';
const {
  Model
} = require('sequelize');
const commonSequelizeOption = require('../utils/commonSequelizeOption');
module.exports = (sequelize, DataTypes) => {
  class owners extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      owners.hasOne(models.ride_biting,{foreignKey:'owner_id'})
    }
  };
  owners.init({
    name: {
      type:DataTypes.STRING
    },
    email: {
      type:DataTypes.STRING,
      unique:true
    },
    phone: {
      type:DataTypes.STRING,
      unique:true
    },
    account_type: {
      type:DataTypes.INTEGER
    },
    dob: {
      type:DataTypes.STRING
    },
    current_balance: {
      type: DataTypes.DECIMAL(20, 2),
      defaultValue: 0,
    },
    nid: {
      type: DataTypes.STRING
    },
    n_key: {
      type: DataTypes.TEXT
    },
    account_status: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    is_block: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    block_reason: {
      type: DataTypes.STRING
    },
    
    service_location_district: {
      type: DataTypes.STRING
    },
    service_location_city: {
      type: DataTypes.STRING
    },
    img: {
      type: DataTypes.STRING
    },
    nid_font_pic: {
      type: DataTypes.TEXT
    },
    nid_back_pic: {
      type: DataTypes.TEXT
    },
    rating: {
      type: DataTypes.STRING
    },
    bidding_percent: {
      type: DataTypes.DECIMAL(20,2)
    },
    car_package_charge: {
      type: DataTypes.DECIMAL(20,2)
    },
    hotel_package_charge: {
      type: DataTypes.DECIMAL(20,2)
    },
    travel_package_charge: {
      type: DataTypes.DECIMAL(20,2)
    },
    
    
  }, {
    sequelize,
    modelName: 'owners',
    tableName:'owners',
    ...commonSequelizeOption
  });
  return owners;
};
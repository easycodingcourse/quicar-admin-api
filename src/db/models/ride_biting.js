'use strict';
const commonOptionSequelize = require('../utils/commonSequelizeOption')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ride_biting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ride_biting.belongsTo(models.ride_list,{foreignKey:'ride_id'})
      ride_biting.belongsTo(models.owners,{foreignKey:'owner_id',as:'owner_info'})
      ride_biting.belongsTo(models.cars,{foreignKey:'car_id',as:'car_info'})
      ride_biting.belongsTo(models.drivers,{foreignKey:'driver_id',as:'driver_info'})
    }
  };
  ride_biting.init({
            
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ride_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bit_amount: {
        type: DataTypes.DOUBLE(20, 2),
        allowNull: false,
    },
    quicar_charge: {
        type: DataTypes.DOUBLE(20, 2),
        allowNull: false,
    },
    you_get: {
        type: DataTypes.DOUBLE(20, 2),
        allowNull: false,
    },
    driver_id: {
        type: DataTypes.INTEGER
    },
    car_id: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.INTEGER
    },
    cancel_reason: {
        type: DataTypes.STRING
    },
    ride_start_time: {
        type: DataTypes.DATE
    },
    ride_finished_time: {
        type: DataTypes.DATE
    },
    seen_by_user: {
        type: DataTypes.INTEGER
    },



}, {
    sequelize,
    modelName: 'ride_biting',
    tableName:'ride_biting',
    ...commonOptionSequelize
  });
  return ride_biting;
};
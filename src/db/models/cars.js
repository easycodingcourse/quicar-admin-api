'use strict';
const {
  Model
} = require('sequelize');
const commonSequelizeOption = require('../utils/commonSequelizeOption');
module.exports = (sequelize, DataTypes) => {
  class cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cars.hasOne(models.ride_biting,{foreignKey:'car_id',as:"car_info"})
    }
  };
  cars.init({
    carType: {
      type: DataTypes.STRING
    }, 
    carBrand: {
      type: DataTypes.STRING
    }, 
    carModel: {
      type: DataTypes.STRING
    },
    carYear: {
      type: DataTypes.STRING
    },
    carColor: {
      type: DataTypes.STRING
    },
    carClass: {
      type: DataTypes.STRING
    },
    fuelType: {
      type: DataTypes.STRING
    },
    carRegisterNumber: {
      type: DataTypes.STRING
    },
    sit_capacity: {
      type: DataTypes.STRING
    },
    owner_id: {
      type: DataTypes.INTEGER
    },
    carImage: {
      type: DataTypes.TEXT
    },
    carSmartCardFont: {
      type: DataTypes.TEXT
    },
    carSmartCardBack: {
      type: DataTypes.TEXT
    },
    taxToken_image: {
      type: DataTypes.TEXT
    },
    fitnessCertificate: {
      type: DataTypes.TEXT
    },
    insurancePaper_path: {
      type: DataTypes.TEXT
    },
    tax_expired_date: {
      type: DataTypes.DATE
    },
    fitness_expired_date: {
      type: DataTypes.DATE
    },
    registration_expired_date: {
      type: DataTypes.DATE
    },
    insurance_expired_date: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    current_status: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    isBooking: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    bookingTime: {
      type: DataTypes.DATE
    },
    status_message: {
      type: DataTypes.STRING
    },
    verify: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    

  }, {
    sequelize,
    modelName: 'cars',
    tableName: 'cars',
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  });
  return cars;
};
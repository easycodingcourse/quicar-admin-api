'use strict';
const commonOptionSequelize = require('../utils/commonSequelizeOption')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ride_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      ride_list.belongsTo(models.users)
      ride_list.belongsTo(models.city,{foreignKey:'starting_city',as:'startingCity'})
      ride_list.belongsTo(models.city,{foreignKey:'destination_city',as:'destinationCity'})
      ride_list.belongsTo(models.district,{foreignKey:'starting_district',as:'startingDistrict'})
      ride_list.belongsTo(models.district,{foreignKey:'destination_district',as:'destinationDistrict'})
      ride_list.belongsTo(models.car_types,{foreignKey:'car_type',as:'carType'})
      ride_list.belongsTo(models.users,{foreignKey:'user_id',as:'userInfo'})

      ride_list.hasMany(models.ride_biting,{foreignKey: 'ride_id',as:'ride_biding_list'})

    }
  };
  ride_list.init({
    starting_city: {
        type: DataTypes.INTEGER(),
        allowNull: false,
    },
    startig_area: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    user_location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    destination_district: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    destination_city: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    destination_area: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    car_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, 
    extra_note: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, 
    rown_way: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, 
    return_time_for_round_way: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    start_time: {
        type: DataTypes.DATE,
        // allowNull defaults to true
    },
    start_time_for_complete: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.INTEGER,
        comment: '0=pending;1=waiting for bit ,2=cancel request,3=start_request,4=bit_accepted,5=completed',
        defaultValue: 0
    },
    booking_id: {
        type: DataTypes.STRING,
    },
    payment_status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    tnx_id: {
        type: DataTypes.STRING,
        unique: true,
    },
    payment_complete_time: {
        type: DataTypes.DATE(),
    },
    cancel_by: {
        type: DataTypes.INTEGER
    },
    cancel_reason: {
        type: DataTypes.STRING,

    },
    cancel_seen: {
        type: DataTypes.STRING,
    }, 
    user_id: {
        type: DataTypes.INTEGER,
    }, 
    staring_date: {
        type: DataTypes.DATEONLY,
    }, 
    starting_time: {
        type: DataTypes.TIME,
    }, 
    accepted_ride_bitting_id: {
        type: DataTypes.INTEGER,
    }, 
    accepted_bitting_time: {
        type: DataTypes.DATE,
    }, 
    cancellation_bit_id: {
        type: DataTypes.INTEGER,
    }, 
    cancellation_id: {
        type: DataTypes.INTEGER,
    }, 
    cancellation_time: {
        type: DataTypes.DATE,
    }, 
    car_all_cost_bear: {
        type: DataTypes.INTEGER,
    }, 
    driver_cost_bear: {
        type: DataTypes.INTEGER,
    }, 
    review_give: {
        type: DataTypes.INTEGER,
    }, 
    ride_visiable_time: {
        type: DataTypes.DATE,
    }, 
    max_request: {
        type: DataTypes.INTEGER,
    }, 
    people: {
        type: DataTypes.INTEGER,
    },
    // Model attributes are defined here

}, {
    sequelize,
    modelName: 'ride_list',
    tableName:'ride_list',
    ...commonOptionSequelize
  });
  return ride_list;
};
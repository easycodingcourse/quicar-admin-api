'use strict';

const commonOptionSequelize = require('../utils/commonSequelizeOption')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class adminlists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  adminlists.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      profile: {
        type: DataTypes.STRING,
      },
      uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: 'admin',
        comment: "admin,moderator,employer,visitor"
      },
      accessList: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "list of access menu "
      },
      jwt: {
        type: DataTypes.TEXT
      }
    }
    , {
      sequelize,
      modelName: 'adminlists',
      tableName:"adminlists",
      ...commonOptionSequelize,
      paranoid:true,
      deletedAt:'deleted_at'
    });
  return adminlists;
};
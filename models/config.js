'use strict';
const datenow = Math.floor(new Date().getTime() / 1000)
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class config extends Model {
    static associate(models) {
      // define association here
    }
  }
  config.init({
    id : {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      defaultValue: null
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.BIGINT.UNSIGNED,
      defaultValue: datenow
    },
    updated_at: {
      type: DataTypes.BIGINT.UNSIGNED,
      defaultValue: datenow
    }
  }, {
    sequelize,
    modelName: 'config',
    freezeTableName: true,
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['key']
      }
    ]
  });
  return config;
};
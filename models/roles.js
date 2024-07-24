'use strict';
const datenow = Math.floor(new Date().getTime() / 1000)
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    static associate(models) {
      // define association here
    }
  }
  roles.init({
    id : {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      defaultValue: null
    },
    name: {
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
    modelName: 'roles',
    freezeTableName: true,
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ]
  });
  return roles;
};
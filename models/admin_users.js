'use strict';
const datenow = Math.floor(new Date().getTime() / 1000)
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin_users extends Model {
    static associate(models) {
      // define association here
    }
  }
  admin_users.init({
    id : {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      defaultValue: null
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
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
    modelName: 'admin_users',
    freezeTableName: true,
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ]
  });
  return admin_users;
};
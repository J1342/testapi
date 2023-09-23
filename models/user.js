"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;
exports.model = model;
var _sequelize = require("sequelize");
class User extends _sequelize.Model {
  static associate(models) {
    this.hasMany(models.FederatedCredential, {
      sourceKey: 'id',
      foreignKey: 'user_id',
      as: 'credentials'
    });
  }
}
exports.User = User;
function model(sequelize, DataTypes) {
  User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: new DataTypes.STRING(),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'users',
    sequelize,
    timestamps: false
  });
  return User;
}
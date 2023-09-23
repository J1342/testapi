"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FederatedCredential = void 0;
exports.model = model;
var _sequelize = require("sequelize");
class FederatedCredential extends _sequelize.Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  }
}
exports.FederatedCredential = FederatedCredential;
function model(sequelize, DataTypes) {
  FederatedCredential.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    provider: {
      type: new DataTypes.STRING(),
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'federated_credentials',
    sequelize,
    timestamps: false
  });
  return FederatedCredential;
}
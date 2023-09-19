"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Author = void 0;
exports.model = model;
var _sequelize = require("sequelize");
class Author extends _sequelize.Model {
  static associate(models) {
    this.belongsToMany(models.Book, {
      through: models.AuthorBook,
      foreignKey: 'AuthorId'
    });
  }
}
exports.Author = Author;
function model(sequelize, DataTypes) {
  Author.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'authors',
    sequelize,
    timestamps: false
  });
  return Author;
}
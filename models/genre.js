"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Genre = void 0;
exports.model = model;
var _sequelize = require("sequelize");
class Genre extends _sequelize.Model {
  static associate(models) {
    this.hasMany(models.Book, {
      sourceKey: 'id',
      foreignKey: 'genreId',
      as: 'books'
    });
  }
}
exports.Genre = Genre;
function model(sequelize, types) {
  Genre.init({
    id: {
      type: _sequelize.DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new _sequelize.DataTypes.STRING(128),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'genres',
    timestamps: false
  });
  return Genre;
}
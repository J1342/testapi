"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Book = void 0;
exports.model = model;
var _sequelize = require("sequelize");
class Book extends _sequelize.Model {
  static associate(models) {
    this.belongsTo(models.Genre, {
      foreignKey: 'genreId'
    });
    this.belongsToMany(models.Author, {
      through: models.AuthorBook,
      foreignKey: 'BookId'
    });
  }
}
exports.Book = Book;
function model(sequelize, types) {
  Book.init({
    id: {
      type: _sequelize.DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: new _sequelize.DataTypes.STRING(128),
      allowNull: false
    },
    publicationDate: {
      type: _sequelize.DataTypes.DATE,
      allowNull: true
    },
    editOffice: {
      type: new _sequelize.DataTypes.STRING(256),
      allowNull: true
    }
  }, {
    tableName: 'books',
    sequelize,
    timestamps: false
  });
  return Book;
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthorBook = void 0;
exports.model = model;
var _sequelize = require("sequelize");
class AuthorBook extends _sequelize.Model {}
exports.AuthorBook = AuthorBook;
function model(sequelize, DataTypes) {
  AuthorBook.init({
    AuthorId: {
      type: DataTypes.INTEGER
    },
    BookId: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false,
    sequelize,
    tableName: 'author_book'
  });
  return AuthorBook;
}
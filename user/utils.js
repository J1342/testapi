"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = generateToken;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function generateToken(user) {
  let token = _jsonwebtoken.default.sign({
    id: user.id
  }, process.env.API_SECRET, {
    expiresIn: 86400
  });
  return token;
}
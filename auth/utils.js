"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function pbkdf2Async(password, salt) {
  return new Promise((res, rej) => {
    _crypto.default.pbkdf2(password, salt, 310000, 32, 'sha256', (err, key) => {
      err ? rej(null) : res(key);
    });
  });
}
var _default = pbkdf2Async;
exports.default = _default;
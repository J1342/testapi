"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("../user/utils");
var _utils2 = _interopRequireDefault(require("./utils"));
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function register(username, password, email = null, role, db) {
  let salt = _crypto.default.randomBytes(16);
  let user = null;
  let hashedPassword = await (0, _utils2.default)(password, salt);
  if (!hashedPassword) {
    user = {
      error: true,
      message: 'password error'
    };
  }
  try {
    let dbuser = await db.User.create({
      username: username,
      password: hashedPassword.toString('hex'),
      email: email ? email : '',
      salt: salt.toString('hex'),
      role: role
    });
    let token = (0, _utils.generateToken)(dbuser);
    user = {
      id: dbuser.id,
      email: dbuser.email,
      username: dbuser.username,
      token: token,
      message: 'user created',
      error: false
    };
  } catch (e) {
    user = {
      error: true,
      message: "user wasn't created"
    };
  }
  return user;
}
var _default = register;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _passport = _interopRequireDefault(require("passport"));
var _passportLocal = _interopRequireDefault(require("passport-local"));
var _models = _interopRequireDefault(require("../models"));
var _crypto = _interopRequireDefault(require("crypto"));
var _express = _interopRequireDefault(require("express"));
var _signin = _interopRequireDefault(require("../api/paths/auth/signin"));
var _admin = _interopRequireDefault(require("../api/paths/auth/signup/admin"));
var _user = _interopRequireDefault(require("../api/paths/auth/signup/user"));
var _utils = require("../user/utils");
var _utils2 = _interopRequireDefault(require("../auth/utils"));
var _registration_middleware = require("../middlewares/registration_middleware");
var _login_middleware = require("../middlewares/login_middleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
_passport.default.use(new _passportLocal.default(async function verify(username, password, cb) {
  let user = null;
  let dbuser = null;
  let error = {
    error: true,
    message: "Incorrect username or password."
  };
  try {
    dbuser = await _models.default.User.findOne({
      where: {
        username: username
      }
    });
    if (dbuser) {
      let token = (0, _utils.generateToken)(dbuser);
      user = {
        id: dbuser.id,
        email: dbuser.email,
        username: dbuser.username,
        token: token,
        message: 'user authenticated',
        error: false
      };
    } else {
      return cb(null, error);
    }
  } catch (e) {
    return cb(null, error);
  }
  let hashedPassword = await (0, _utils2.default)(password, new Buffer(dbuser.salt, 'hex'));
  if (!hashedPassword) {
    return cb(null, error);
  }
  if (!_crypto.default.timingSafeEqual(new Buffer(dbuser.password, 'hex'), hashedPassword)) {
    return cb(null, error);
  }
  return cb(null, user);
}));
_passport.default.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user);
  });
});
_passport.default.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
router.post('/signup/admin/', _registration_middleware.registrationValidation, _registration_middleware.registerMiddleware, _admin.default.POST);
router.post('/signup/user/', _registration_middleware.registrationValidation, _registration_middleware.registerMiddleware, _user.default.POST);
router.post('/signin/', _login_middleware.loginValidation, _login_middleware.loginMiddleware, _passport.default.authenticate('local', {
  failureRedirect: '/login',
  failureMessage: true
}), _signin.default.POST);
var _default = router;
exports.default = _default;
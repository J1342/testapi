"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _passportGoogleOidc = _interopRequireDefault(require("passport-google-oidc"));
var _models = _interopRequireDefault(require("../models"));
var _login = _interopRequireDefault(require("../api/paths/oauth/login"));
var _utils = require("../user/utils");
var _user = require("../user");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let router = _express.default.Router();
require('dotenv').config();
_passport.default.use(new _passportGoogleOidc.default({
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: '/oauth/redirect/google',
  scope: ['profile']
}, async function verify(issuer, profile, cb) {
  let user = null;
  let dbuser = null;
  let error = {
    error: true,
    message: "Authentication failed."
  };
  try {
    let federated_credential = await _models.default.FederatedCredential.findOne({
      where: {
        provider: issuer,
        subject: profile.id
      }
    });
    if (!federated_credential) {
      dbuser = await _models.default.User.create({
        username: profile.displayName,
        role: _user.UserTypes.user
      });
      federated_credential = await _models.default.FederatedCredential.create({
        user_id: dbuser.id,
        provider: issuer,
        subject: profile.id
      });
    } else {
      dbuser = await _models.default.User.findOne({
        where: {
          id: federated_credential.user_id
        }
      });
    }
    let token = (0, _utils.generateToken)(dbuser);
    user = {
      id: dbuser.id,
      email: dbuser.email,
      username: dbuser.username,
      token: token,
      message: 'user authenticated',
      error: false
    };
    return cb(null, user);
  } catch (e) {
    console.log(e);
    return cb(null, error);
  }
}));
router.get('/login/federated/google', _passport.default.authenticate('google'));
router.get('/login', _login.default.GET);
router.get('/redirect/google', _passport.default.authenticate('google', {
  failureRedirect: '/login'
}), async function (req, res) {
  if (req.user.error) {
    res.status(422).json(req.user);
  } else {
    res.json(req.user);
  }
});
var _default = router;
exports.default = _default;
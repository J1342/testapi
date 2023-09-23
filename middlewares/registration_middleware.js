"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerMiddleware = registerMiddleware;
exports.registrationValidation = void 0;
var _expressValidator = require("express-validator");
var _models = _interopRequireDefault(require("../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const registrationValidation = [(0, _expressValidator.check)("username", "username is required").not().isEmpty().isLength({
  min: 3
}).withMessage("username must be at least 3 characters long"), (0, _expressValidator.check)("email", "email is required").not().isEmpty().isEmail().withMessage("email is invalid"), (0, _expressValidator.check)("password", "password is required").not().isEmpty().isLength({
  min: 6
}).withMessage("password must be at least 6 characters long"), (0, _expressValidator.check)("confirmPassword", "password confirmation is required").not().isEmpty().custom((value, {
  req
}) => {
  if (value !== req.body.password) {
    throw new Error("Passwords do not match");
  }
  return true;
})];
exports.registrationValidation = registrationValidation;
async function registerMiddleware(req, res, next) {
  const errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }
  let potentialUser = await _models.default.User.findOne({
    where: {
      username: req.body.username
    }
  });
  if (potentialUser) {
    return res.status(422).json({
      message: 'user already exists',
      error: true
    });
  }
  next();
}
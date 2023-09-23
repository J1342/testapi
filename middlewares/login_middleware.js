"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginMiddleware = loginMiddleware;
exports.loginValidation = void 0;
var _expressValidator = require("express-validator");
const loginValidation = [(0, _expressValidator.check)("username", "username is required").not().isEmpty(), (0, _expressValidator.check)("password", "password is required").not().isEmpty()];
exports.loginValidation = loginValidation;
async function loginMiddleware(req, res, next) {
  const errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }
  next();
}
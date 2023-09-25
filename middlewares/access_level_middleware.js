"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accessLevelMiddleware = accessLevelMiddleware;
var _user = require("../user");
async function accessLevelMiddleware(req, res, next) {
  if ('user' in req && req.user.role == _user.UserTypes.admin) {
    next();
  } else {
    return res.status(422).json({
      error: "admin acess required"
    });
  }
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _models = _interopRequireDefault(require("../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function verifyToken(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    _jsonwebtoken.default.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, async function (err, decode) {
      if (err) {
        console.log(err);
        req.user = undefined;
      }
      try {
        let user = await _models.default.User.findOne({
          where: {
            id: decode.id
          }
        });
        req.user = user;
        next();
      } catch (e) {
        res.status(500).send('error');
      }
    });
  } else {
    res.status(500).send('error');
  }
}
var _default = verifyToken;
exports.default = _default;
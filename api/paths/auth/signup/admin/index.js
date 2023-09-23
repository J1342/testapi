"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = _interopRequireDefault(require("../../../../../models"));
var _user = require("../../../../../user");
var _register = _interopRequireDefault(require("../../../../../auth/register"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let operations = {
  POST
};
async function POST(req, res) {
  let user = await (0, _register.default)(req.body.username, req.body.password, req.body.email, _user.UserTypes.admin, _models.default);
  res.json(user);
}
POST.apiDoc = {
  summary: "Sign up.",
  operationId: "signUp",
  consumes: ["application/json"],
  parameters: [{
    in: "body",
    name: '',
    schema: {
      $ref: "#/definitions/SignUpData"
    }
  }],
  responses: {
    200: {
      description: "Signed Up",
      schema: {
        type: "object",
        $ref: "#/definitions/User"
      }
    },
    422: {
      description: "Auth errors",
      schema: {
        type: "object",
        $ref: "#/definitions/AuthErrors"
      }
    }
  }
};
var _default = operations;
exports.default = _default;
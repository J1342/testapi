"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
let operations = {
  POST
};
function POST(req, res) {
  res.json(req.user);
}
POST.apiDoc = {
  summary: "Sign in.",
  operationId: "signIn",
  consumes: ["application/json"],
  parameters: [{
    in: "body",
    name: '',
    schema: {
      $ref: "#/definitions/SignInData"
    }
  }],
  responses: {
    200: {
      description: "Signed In",
      schema: {
        type: "object",
        $ref: "#/definitions/User"
      }
    },
    400: {
      description: "Bad Request"
    }
  }
};
var _default = operations;
exports.default = _default;
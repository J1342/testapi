"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let router = _express.default.Router();
const operations = {
  GET
};
async function GET(req, res) {
  res.send(`
        <html>
           <head>
           </head>
           <body>
                <h1>Sign in</h1>
                <a class="button google" href="/oauth/login/federated/google">
                Sign in with Google</a>
           </body>
        </html>
        `);
}
GET.apiDoc = {
  summary: "Oauth providers authentication.",
  operationId: "getOauthToken",
  consumes: ["application/json"],
  responses: {
    200: {
      description: "Access granted",
      schema: {
        type: "object",
        $ref: "#/definitions/User"
      }
    },
    422: {
      description: "Auth error",
      schema: {
        type: "object",
        $ref: "#/definitions/AuthenticationError"
      }
    }
  }
};
var _default = operations;
exports.default = _default;
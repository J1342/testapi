"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
let operations = {
  GET
};
async function GET(req, res) {
  res.download(`${__dirname}/download.txt`);
}
GET.apiDoc = {
  summary: "Download book.",
  operationId: "downloadBook",
  parameters: [{
    name: "Authorization",
    in: "header",
    description: "JWT access token",
    required: true,
    type: "string"
  }],
  responses: {
    200: {
      description: "File of book."
    }
  }
};
var _default = operations;
exports.default = _default;
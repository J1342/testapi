"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = _interopRequireDefault(require("../../../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let operations = {
  GET
};
async function GET(req, res) {
  try {
    let genre = await _models.default.Genre.findByPk(req.params.id, {
      include: {
        model: _models.default.Book,
        as: 'books'
      }
    });
    if (!genre) {
      res.status(404).send();
    }
    res.json(genre);
  } catch (e) {
    res.status(500).send();
  }
}
GET.apiDoc = {
  summary: "Fetch one genre.",
  operationId: "fetchOneGenre",
  consumes: ["application/json"],
  parameters: [{
    in: "query",
    name: "id",
    type: "number"
  }, {
    name: "Authorization",
    in: "header",
    description: "JWT access token",
    required: true,
    type: "string"
  }],
  responses: {
    200: {
      description: "Fetch one genre",
      schema: {
        type: "object",
        $ref: "#/definitions/Genre"
      }
    },
    404: {
      description: "Not Found"
    },
    500: {
      description: "Server error"
    }
  }
};
var _default = operations;
exports.default = _default;
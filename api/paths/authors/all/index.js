"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = _interopRequireDefault(require("../../../../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let operations = {
  GET
};
async function GET(req, res) {
  try {
    let authors = await _models.default.Author.findAll({
      include: _models.default.Book
    });
    if (!authors) {
      res.status(404).send();
    }
    res.json(authors);
  } catch (e) {
    res.status(500).send();
  }
}
GET.apiDoc = {
  summary: "Fetch list of authors.",
  operationId: "getAuthors",
  parameters: [{
    name: "Authorization",
    in: "header",
    description: "JWT access token",
    required: true,
    type: "string"
  }],
  responses: {
    200: {
      description: "List of authors.",
      schema: {
        type: "array",
        items: {
          $ref: "#/definitions/AuthorAndBooks"
        }
      }
    },
    500: {
      description: "Internal Server Error"
    },
    404: {
      description: "Not found"
    }
  }
};
var _default = operations;
exports.default = _default;
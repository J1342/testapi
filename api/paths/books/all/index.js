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
    let books = await _models.default.Book.findAll({
      include: _models.default.Author
    });
    if (!books) {
      res.status(404).send();
    }
    res.json(books);
  } catch (e) {
    res.status(500).send();
  }
}
GET.apiDoc = {
  summary: "Fetch list of books.",
  operationId: "getBooks",
  parameters: [{
    name: "Authorization",
    in: "header",
    description: "JWT access token",
    required: true,
    type: "string"
  }],
  responses: {
    200: {
      description: "List of books.",
      schema: {
        type: "array",
        items: {
          $ref: "#/definitions/BookAndAuthors"
        }
      }
    },
    500: {
      description: "Internal Server Error"
    },
    404: {
      description: "Not Found"
    }
  }
};
var _default = operations;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = _interopRequireDefault(require("../../../../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let operations = {
  POST
};
async function POST(req, res) {
  try {
    let book = await _models.default.Book.create(req.body, {
      include: [_models.default.Author]
    });
    if ('authors' in req.body) {
      for (let author of req.body.authors) {
        let authorItem = await _models.default.Author.create(author);
        await book.addAuthor(authorItem);
      }
    }
    book = await _models.default.Book.findAll({
      where: {
        id: book.id
      },
      include: _models.default.Author
    });
    res.json(book);
  } catch (e) {
    res.status(400).send();
  }
}
POST.apiDoc = {
  summary: "Create book(admin role required).",
  operationId: "createBook",
  consumes: ["application/json"],
  parameters: [{
    in: "body",
    name: '',
    schema: {
      $ref: "#/definitions/BookAndAuthors"
    }
  }, {
    name: "Authorization",
    in: "header",
    description: "JWT access token",
    required: true,
    type: "string"
  }],
  responses: {
    200: {
      description: "Created",
      schema: {
        type: "object",
        $ref: "#/definitions/BookAndAuthors"
      }
    },
    400: {
      description: "Bad Request"
    }
  }
};
var _default = operations;
exports.default = _default;
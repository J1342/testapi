"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = _interopRequireDefault(require("../../../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let operations = {
  GET,
  POST,
  PUT,
  DELETE
};
async function GET(req, res) {
  try {
    let authors = await _models.default.Author.findByPk(req.params.id, {
      include: _models.default.Book
    });
    res.json(authors);
  } catch (e) {
    res.status(404).send();
  }
}
async function POST(req, res) {
  try {
    let author = await _models.default.Author.create(req.body, {
      include: [_models.default.Book]
    });
    if ('books' in req.body) {
      for (let book of req.body.books) {
        let bookItem = await _models.default.Book.create(book);
        await author.addBook(bookItem);
      }
    }
    author = await _models.default.Author.findAll({
      where: {
        id: author.id
      },
      include: _models.default.Book
    });
    res.json(author);
  } catch (e) {
    res.status(400).send();
  }
}
async function PUT(req, res) {
  try {
    let author = await _models.default.Author.findByPk(req.params.id);
    for (let key in req.body) {
      if (key != 'id') {
        author[key] = req.body[key];
      }
    }
    author.save();
    res.json(author);
  } catch (e) {
    res.status(400).send();
  }
}
async function DELETE(req, res) {
  try {
    await _models.default.Author.destroy({
      where: {
        id: Number(req.params.id)
      }
    });
    res.send(`Author with id ${req.params.id} is destroyed.`);
  } catch (e) {
    res.status(404).send();
  }
}
GET.apiDoc = {
  summary: "Fetch one author.",
  operationId: "fetchOneAuthor",
  consumes: ["application/json"],
  parameters: [{
    in: "query",
    name: "id",
    type: "number"
  }],
  responses: {
    200: {
      description: "Fetch one author",
      schema: {
        type: "object",
        $ref: "#/definitions/AuthorAndBooks"
      }
    },
    404: {
      description: "Not Found"
    }
  }
};
POST.apiDoc = {
  summary: "Create author.",
  operationId: "createAuthor",
  consumes: ["application/json"],
  parameters: [{
    in: "body",
    name: '',
    schema: {
      $ref: "#/definitions/AuthorAndBooks"
    }
  }],
  responses: {
    200: {
      description: "Created",
      schema: {
        type: "object",
        $ref: "#/definitions/AuthorAndBooks"
      }
    },
    400: {
      description: "Bad Request"
    }
  }
};
PUT.apiDoc = {
  summary: "Update author.",
  operationId: "updateAuthor",
  consumes: ["application/json"],
  parameters: [{
    in: "query",
    name: "id",
    type: "number"
  }, {
    in: "body",
    name: '',
    schema: {
      $ref: "#/definitions/Author"
    }
  }],
  responses: {
    200: {
      description: "Updated",
      schema: {
        type: "object",
        $ref: "#/definitions/Author"
      }
    },
    400: {
      description: "Bad Request"
    }
  }
};
DELETE.apiDoc = {
  summary: "Delete author.",
  operationId: "deleteAuthor",
  consumes: ["application/json"],
  parameters: [{
    in: "query",
    name: "id",
    type: "number"
  }],
  responses: {
    200: {
      description: "Deleted",
      schema: {
        type: "string"
      }
    },
    404: {
      description: "Not Found"
    }
  }
};
var _default = operations;
exports.default = _default;
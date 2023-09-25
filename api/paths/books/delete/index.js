"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = _interopRequireDefault(require("../../../../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let operations = {
  DELETE
};
async function DELETE(req, res) {
  try {
    await _models.default.Book.destroy({
      where: {
        id: Number(req.params.id)
      }
    });
    res.send(`Book with id ${req.params.id} is destroyed.`);
  } catch (e) {
    res.status(404).send();
  }
}
DELETE.apiDoc = {
  summary: "Delete book(admin role required).",
  operationId: "deleteBook",
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
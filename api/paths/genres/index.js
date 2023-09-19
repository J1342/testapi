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
    res.json(genre);
  } catch (e) {
    console.log(e);
    res.status(404).send();
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
  }],
  responses: {
    201: {
      description: "Fetch one genre",
      schema: {
        type: "object",
        $ref: "#/definitions/Genre"
      }
    },
    404: {
      description: "Not Found"
    }
  }
};
var _default = operations;
exports.default = _default;
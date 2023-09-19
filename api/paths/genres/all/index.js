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
    let genres = await _models.default.Genre.findAll({
      include: {
        model: _models.default.Book,
        as: 'books'
      }
    });
    res.json(genres);
  } catch (e) {
    res.status(500).send();
  }
}
GET.apiDoc = {
  summary: "Fetch list of genres.",
  operationId: "getGenres",
  responses: {
    200: {
      description: "List of genres.",
      schema: {
        type: "array",
        items: {
          $ref: "#/definitions/Genre"
        }
      }
    }
  }
};
var _default = operations;
exports.default = _default;
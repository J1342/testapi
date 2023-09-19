"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _book_router = _interopRequireDefault(require("./routes/book_router"));
var _author_router = _interopRequireDefault(require("./routes/author_router"));
var _genre_router = _interopRequireDefault(require("./routes/genre_router"));
var _expressOpenapi = require("express-openapi");
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
const port = process.env.PORT || 8000;
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
(0, _expressOpenapi.initialize)({
  app,
  apiDoc: require("./api/api-doc"),
  paths: "./api/paths"
});
app.use("/api-documentation", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(null, {
  swaggerOptions: {
    url: "http://localhost:3030/api-docs"
  }
}));
app.get('/', (req, res) => {
  res.send('Welcome to Express & TypeScript Server');
});
app.use('/books', _book_router.default);
app.use('/authors', _author_router.default);
app.use('/genres', _genre_router.default);
app.listen(3030, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
var _default = app;
exports.default = _default;
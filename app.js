"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _book_router = _interopRequireDefault(require("./routes/book_router"));
var _author_router = _interopRequireDefault(require("./routes/author_router"));
var _genre_router = _interopRequireDefault(require("./routes/genre_router"));
var _auth_routes = _interopRequireDefault(require("./routes/auth_routes"));
var _oauth_router = _interopRequireDefault(require("./routes/oauth_router"));
var _expressOpenapi = require("express-openapi");
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _passport = _interopRequireDefault(require("passport"));
var _token_middleware = _interopRequireDefault(require("./middlewares/token_middleware"));
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
    url: `http://localhost:3030/api-docs`
  }
}));
require("dotenv").config();
const config = require(__dirname + '/config/config.json')['development'];
const Sequelize = require('sequelize');
var SequelizeStore = require("connect-session-sequelize")(_expressSession.default.Store);
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const myStore = new SequelizeStore({
  db: sequelize
});
app.use((0, _expressSession.default)({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: myStore
}));
myStore.sync();
app.use(_passport.default.authenticate('session'));
app.get('/', (req, res) => {
  res.send('Welcome to Express & TypeScript Server');
});
app.use('/books', _token_middleware.default, _book_router.default);
app.use('/authors', _token_middleware.default, _author_router.default);
app.use('/genres', _token_middleware.default, _genre_router.default);
app.use('/auth', _auth_routes.default);
app.use('/oauth', _oauth_router.default);
app.listen(3030, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
var _default = app;
exports.default = _default;
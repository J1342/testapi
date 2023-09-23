"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _books = _interopRequireDefault(require("../api/paths/books"));
var _all = _interopRequireDefault(require("../api/paths/books/all"));
var _download = _interopRequireDefault(require("../api/paths/books/download"));
var _access_level_middleware = require("../middlewares/access_level_middleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var router = _express.default.Router();
router.get('/download', _download.default.GET);
router.get('/all', _all.default.GET);
router.get('/:id', _books.default.GET);
router.post('/create', _access_level_middleware.accessLevelMiddleware, _books.default.POST);
router.put('/update/:id', _access_level_middleware.accessLevelMiddleware, _books.default.PUT);
router.delete('/delete/:id', _access_level_middleware.accessLevelMiddleware, _books.default.DELETE);
var _default = router;
exports.default = _default;
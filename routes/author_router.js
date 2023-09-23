"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _authors = _interopRequireDefault(require("../api/paths/authors"));
var _all = _interopRequireDefault(require("../api/paths/authors/all"));
var _access_level_middleware = require("../middlewares/access_level_middleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var router = _express.default.Router();
router.get('/all', _all.default.GET);
router.get('/:id', _authors.default.GET);
router.post('/create', _access_level_middleware.accessLevelMiddleware, _authors.default.POST);
router.put('/update/:id', _access_level_middleware.accessLevelMiddleware, _authors.default.PUT);
router.delete('/delete/:id', _access_level_middleware.accessLevelMiddleware, _authors.default.DELETE);
var _default = router;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _authors = _interopRequireDefault(require("../api/paths/authors"));
var _all = _interopRequireDefault(require("../api/paths/authors/all"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var router = _express.default.Router();
router.get('/all', _all.default.GET);
router.get('/:id', _authors.default.GET);
router.post('/create', _authors.default.POST);
router.put('/update/:id', _authors.default.PUT);
router.delete('/delete/:id', _authors.default.DELETE);
var _default = router;
exports.default = _default;
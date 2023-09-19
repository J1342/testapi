"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _genres = _interopRequireDefault(require("../api/paths/genres"));
var _all = _interopRequireDefault(require("../api/paths/genres/all"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var router = _express.default.Router();
router.get('/all', _all.default.GET);
router.get('/:id', _genres.default.GET);
var _default = router;
exports.default = _default;
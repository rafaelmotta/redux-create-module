"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = createModule;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createModule(name, initial, handler) {
  var reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initial;
    var action = arguments[1];

    var _action$type$split = action.type.split("/"),
        _action$type$split2 = _slicedToArray(_action$type$split, 2),
        module = _action$type$split2[0],
        type = _action$type$split2[1];

    if (module === name) {
      return handler[type] ? handler[type](state, action) : state;
    } else {
      return handler[action.type] ? handler[action.type](state, action) : state;
    }
  };
  var actions = Object.keys(handler).reduce(function (acc, key) {
    return Object.assign(acc, _defineProperty({}, key, function () {
      var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return { type: name + "/" + key, payload: payload };
    }));
  }, {});
  var types = Object.keys(handler).reduce(function (acc, key) {
    return Object.assign({}, acc, _defineProperty({}, key, name + "/" + key));
  }, {});
  return { reducer: reducer, actions: actions, types: types };
}
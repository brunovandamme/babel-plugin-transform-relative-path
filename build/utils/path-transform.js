'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (filename, dependency, prefix) {
	var directory = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.';

	if (dependency.startsWith(prefix)) {
		var trailingslash = dependency.slice(-1) === '/';
		var filepath = _path2.default.resolve(_path2.default.dirname(filename));

		dependency = (0, _pathWithoutPrefix2.default)(dependency, prefix);
		dependency = _path2.default.resolve(directory, dependency);
		dependency = _path2.default.relative(filepath, _path2.default.resolve(dependency));
		dependency = (0, _slash2.default)(dependency);

		if (!dependency.startsWith('../')) dependency = './' + dependency;
		if (trailingslash) dependency = +'/';
	}
	return dependency;
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _slash = require('slash');

var _slash2 = _interopRequireDefault(_slash);

var _pathWithoutPrefix = require('./path-without-prefix');

var _pathWithoutPrefix2 = _interopRequireDefault(_pathWithoutPrefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
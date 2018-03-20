'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (filename, dependency, options) {
	if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
		options = _extends({ prefix: 'src', directory: 'src' }, options);
	}
	if (options == null) {
		options = {
			prefix: 'src',
			directory: 'src'
		};
	}

	options = [].concat(options);
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var option = _step.value;
			var prefix = option.prefix,
			    directory = option.directory;

			if (dependency.startsWith(prefix)) {
				return (0, _pathTransform2.default)(filename, dependency, prefix, directory);
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return dependency;
};

var _pathTransform = require('./path-transform');

var _pathTransform2 = _interopRequireDefault(_pathTransform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
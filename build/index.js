'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _pathSubstitutePrefix = require('./utils/path-substitute-prefix');

var _pathSubstitutePrefix2 = _interopRequireDefault(_pathSubstitutePrefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var types = _ref.types;

	var traverseExpression = function traverseExpression(type, arg) {
		if (type.isStringLiteral(arg)) {
			return arg;
		}

		if (type.isBinaryExpression(arg)) {
			return traverseExpression(type, arg.left);
		}

		return null;
	};

	var visitor = {
		CallExpression: function CallExpression(path, state) {
			var args = path.node.arguments;
			if (args.length != null && args.length !== 0) {
				var firstArg = traverseExpression(types, args[0]);
			}

			if (path.node.callee.name === 'require' || path.node.callee.type === 'Import') {
				var _args = path.node.arguments;
				if (!_args.length) {
					return;
				}

				var _firstArg = traverseExpression(types, _args[0]);
				if (_firstArg) {
					_firstArg.value = (0, _pathSubstitutePrefix2.default)(state.file.opts.filename, _firstArg.value, state.opts);
				}
			}
		},
		ImportDeclaration: function ImportDeclaration(path, state) {
			path.node.source.value = (0, _pathSubstitutePrefix2.default)(state.file.opts.filename, path.node.source.value, state.opts);
		},
		ExportNamedDeclaration: function ExportNamedDeclaration(path, state) {
			if (path.node.source) {
				path.node.source.value = (0, _pathSubstitutePrefix2.default)(state.file.opts.filename, path.node.source.value, state.opts);
			}
		},
		ExportAllDeclaration: function ExportAllDeclaration(path, state) {
			if (path.node.source) {
				path.node.source.value = (0, _pathSubstitutePrefix2.default)(state.file.opts.filename, path.node.source.value, state.opts);
			}
		}
	};
	return {
		visitor: {
			Program: function Program(path, state) {
				path.traverse(visitor, state);
			}
		}
	};
};
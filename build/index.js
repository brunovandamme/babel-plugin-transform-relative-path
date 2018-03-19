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
			if (path.node.callee.name !== 'require') {
				return;
			}

			var args = path.node.arguments;
			if (!args.length) {
				return;
			}

			var firstArg = traverseExpression(types, args[0]);

			if (firstArg) {
				firstArg.value = (0, _pathSubstitutePrefix2.default)(state.file.opts.filename, firstArg.value, state.opts);
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
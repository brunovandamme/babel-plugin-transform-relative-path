import path from 'path';
import slash from 'slash';

function pathWithoutPrefix (filename, prefix) {
	if (filename.startsWith(prefix)) {
		filename = filename.slice(prefix.length);
		if (filename.startsWith('/')) {
			filename = filename.slice(1);
		}
	}
	return filename;
}

function transform (filename, dependency, prefix) {
	var directory = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.';

	if (dependency.startsWith(prefix)) {
		var trailingslash = dependency.slice(-1) === '/';
		var filepath = path.resolve(path.dirname(filename));

		dependency = pathWithoutPrefix(dependency, prefix);
		dependency = path.resolve(directory, dependency);
		dependency = path.relative(filepath, path.resolve(dependency));
		dependency = slash(dependency);

		if (!dependency.startsWith('../')) dependency = './' + dependency;
		if (trailingslash) dependency = +'/';
	}
	return dependency;
}

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function substitute (filename, dependency, options) {
	if (Object.keys(options).length === 0) {
		options = { "/": "." };
	}

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = Object.entries(options)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var _ref = _step.value;

			var _ref2 = _slicedToArray(_ref, 2);

			var prefix = _ref2[0];
			var directory = _ref2[1];

			if (dependency.startsWith(prefix)) {
				return transform(filename, dependency, prefix, directory);
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
}

var index = (function (_ref) {
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
		CallExpression: function CallExpression(path$$1, state) {
			if (path$$1.node.callee.name === 'require' || path$$1.node.callee.type === 'Import') {
				var args = path$$1.node.arguments;
				if (!args.length) {
					return;
				}

				var firstArg = traverseExpression(types, args[0]);
				if (firstArg) {
					firstArg.value = substitute(state.file.opts.filename, firstArg.value, state.opts);
				}
			}
		},
		ImportDeclaration: function ImportDeclaration(path$$1, state) {
			path$$1.node.source.value = substitute(state.file.opts.filename, path$$1.node.source.value, state.opts);
		},
		ExportNamedDeclaration: function ExportNamedDeclaration(path$$1, state) {
			if (path$$1.node.source) {
				path$$1.node.source.value = substitute(state.file.opts.filename, path$$1.node.source.value, state.opts);
			}
		},
		ExportAllDeclaration: function ExportAllDeclaration(path$$1, state) {
			if (path$$1.node.source) {
				path$$1.node.source.value = substitute(state.file.opts.filename, path$$1.node.source.value, state.opts);
			}
		}
	};
	return {
		visitor: {
			Program: function Program(path$$1, state) {
				path$$1.traverse(visitor, state);
			}
		}
	};
});

export default index;

import substitute from './utils/path-substitute-prefix';

export default ({ types }) => {
	const traverseExpression = (type, arg) => {
		if (type.isStringLiteral(arg)) {
			return arg;
		}

		if (type.isBinaryExpression(arg)) {
			return traverseExpression(type, arg.left);
		}

		return null;
	};

	const visitor = {
		CallExpression(path, state) {
			if (path.node.callee.name !== 'require') {
				return;
			}

			const args = path.node.arguments;
			if (!args.length) {
				return;
			}

			const firstArg = traverseExpression(types, args[0]);

			if (firstArg) {
				firstArg.value = substitute(state.file.opts.filename, firstArg.value, state.opts);
			}
		},
		ImportDeclaration(path, state) {
			path.node.source.value = substitute(
				state.file.opts.filename,
				path.node.source.value,
				state.opts
			);
		},
		ExportNamedDeclaration(path, state) {
			if (path.node.source) {
				path.node.source.value = substitute(
					state.file.opts.filename,
					path.node.source.value,
					state.opts
				);
			}
		},
		ExportAllDeclaration(path, state) {
			if (path.node.source) {
				path.node.source.value = substitute(
					state.file.opts.filename,
					path.node.source.value,
					state.opts
				);
			}
		},
	};
	return {
		visitor: {
			Program(path, state) {
				path.traverse(visitor, state);
			},
		},
	};
};

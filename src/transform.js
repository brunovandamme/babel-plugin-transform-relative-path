// @ts-check

import fs from 'fs';
import path from 'path';
import resolve from 'resolve';

/**
 *
 * @param {string} filename The path of the file that has the import/require statement
 * @param {string} dependency The string describing the location of the import/require
 * @param {Object<string, string>} options A mapping between prefixes and directories
 * @returns {string}
 */
export default function(filename, dependency, options = { '/': '.' }) {
	for (let prefix in options) {
		let directory = options[prefix];
		let match = dependency.startsWith(prefix);
		if (match) {
			let postfix = dependency.slice(prefix.length);

			let prefixHasSeperator = prefix.endsWith(path.sep);
			let postfixHasSeperator = postfix.startsWith(path.sep);

			let fullmatch = postfix.length === 0;
			let partialmatch = prefixHasSeperator || postfixHasSeperator;
			if (fullmatch || partialmatch) {
				let transform;
				if (postfixHasSeperator) {
					transform = postfix.slice(path.sep.length);
				} else {
					transform = postfix;
				}

				let absolutePath = fs.realpathSync(filename);
				let absoluteDirectory = path.dirname(absolutePath);
				let dependencyPath = path.resolve(directory, transform);
				let dependencyResolvedPath = resolve.sync(dependencyPath, { preserveSymlinks: false });
				let dependencyAbsolutePath = fs.realpathSync(dependencyResolvedPath);

				let relativePath = path.relative(absoluteDirectory, dependencyAbsolutePath);
				if (!relativePath.startsWith('.') && !relativePath.startsWith(path.sep)) {
					relativePath = `.${path.sep}${relativePath}`;
				}

				if (!relativePath.endsWith(path.sep) && transform.endsWith(path.sep)) {
					relativePath = `${relativePath}${path.sep}`;
				}

				return relativePath;
			}
		}
	}

	return dependency;
}

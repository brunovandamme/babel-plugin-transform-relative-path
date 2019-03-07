// @ts-check

import path from 'path';
import escape from 'escape-string-regexp';

/**
 *
 * @param {string} filename The filename of the file that contains the import/require statement
 * @param {string} dependency The path from the import/require statement
 * @param {Object<string, string>} options A mapping between prefixes and substitutions
 */
export default function(filename, dependency, options) {
	if (Object.keys(options).length === 0) {
		options = { [path.sep]: '.' };
	}

	for (let [prefix, directory] of Object.entries(options)) {
		let trailingslash = prefix.endsWith(path.sep);

		let match;
		if (trailingslash) {
			match = dependency.match(new RegExp(`^${escape(prefix)}`));
		} else {
			match = dependency.match(new RegExp(`^${escape(prefix)}($|${escape(path.sep)})`));
		}

		if (match) {
			let filepath = path.resolve(path.dirname(filename));

			dependency = dependency.replace(new RegExp(`^${escape(prefix)}/?`), '');
			dependency = path.resolve(directory, dependency);
			dependency = path.relative(filepath, dependency);

			if (!dependency.startsWith('.') && !dependency.startsWith(path.sep)) {
				dependency = `.${path.sep}${dependency}`;
			}
			if (trailingslash) {
				dependency = `${dependency}${path.sep}`;
			}
		}
	}
	return dependency;
}

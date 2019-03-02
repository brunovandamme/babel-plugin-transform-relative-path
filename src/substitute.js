import fs from 'fs';
import path from 'path';

let pathWithoutPrefix = (filename, prefix) => {
	if (filename.startsWith(prefix)) {
		filename = filename.slice(prefix.length);
		if (filename.startsWith('/')) {
			filename = filename.slice(1);
		}
	}
	return filename;
};

export default function(filename, dependency, prefix, directory = '.') {
	// When a package is building and is accessed through symlinks,
	// the directory (which is a non-symlink containing path)
	// should resolve relative to the non-symlink filename.
	// Therefore to support symlinks, we "normalize" the filename first
	filename = fs.realpathSync(filename);

	let trailingslash = dependency.endsWith(path.sep);
	let filepath = path.resolve(path.dirname(filename));

	dependency = pathWithoutPrefix(dependency, prefix);
	dependency = path.resolve(directory, dependency);
	dependency = path.relative(filepath, path.resolve(dependency));

	if (dependency.startsWith('.') === false && dependency.startsWith(path.sep) === false) {
		dependency = '.' + path.sep + dependency;
	}
	if (trailingslash && dependency.endsWith(path.sep) === false) {
		dependency += path.sep;
	}

	return dependency;
}

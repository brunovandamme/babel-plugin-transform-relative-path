import path from 'path';
import slash from 'slash';
import pathWithoutPrefix from './path-without-prefix';

export default function(filename, dependency, prefix, directory = '.') {
	if (dependency.startsWith(prefix)) {
		let trailingslash = dependency.slice(-1) === '/';
		let filepath = path.resolve(path.dirname(filename));

		dependency = pathWithoutPrefix(dependency, prefix);
		dependency = path.resolve(directory, dependency);
		dependency = path.relative(filepath, path.resolve(dependency));
		dependency = slash(dependency);

		if (!dependency.startsWith('../')) dependency = `./${dependency}`;
		if (trailingslash) dependency = +'/';
	}
	return dependency;
}

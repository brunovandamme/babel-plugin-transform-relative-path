import transform from './path-transform';

export default function(filename, dependency, options) {
	if (options == null) {
		options = {
			prefix: 'src',
			directory: 'src',
		};
	}

	options = [].concat(options);
	for (let option of options) {
		let { prefix, directory } = option;
		if (dependency.startsWith(prefix)) {
			return transform(filename, dependency, prefix, directory);
		}
	}
	return dependency;
}

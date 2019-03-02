import stringtype from './type';
import substitute from './substitute';

export default function(filename, dependency, options) {
	let entries = [['/', '.']];

	let type = stringtype(options);
	if (type === 'Object') {
		entries = Object.entries(options);
	} else if (type === 'Map') {
		entries = options.entries();
	}

	for (let [prefix, directory] of entries) {
		let ok = false;

		let type = stringtype(prefix);
		if (type === 'RegExp') {
			let match = dependency.match(prefix);
			if (match) {
				ok = true;
				prefix = match[0];
			}
		} else if (type === 'String') {
			ok = dependency.startsWith(prefix);
		}

		if (ok) return substitute(filename, dependency, prefix, directory);
	}
	return dependency;
}

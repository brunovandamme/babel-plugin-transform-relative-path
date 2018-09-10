import transform from "./path-transform";

export default function(filename, dependency, options) {
	if (Object.keys(options).length === 0) {
		options = { "/": "." };
	}

	for (let [prefix, directory] of Object.entries(options)) {
		if (dependency.startsWith(prefix)) {
			return transform(filename, dependency, prefix, directory);
		}
	}
	return dependency;
}

export default function(filename, prefix) {
	if (filename.startsWith(prefix)) {
		filename = filename.slice(prefix.length);
		if (filename.startsWith('/')) {
			filename = filename.slice(1);
		}
	}
	return filename;
}

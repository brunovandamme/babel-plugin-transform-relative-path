import path from 'path';

import Buckler from 'buckler';
import substitute from '../src/utils/path-substitute-prefix';

let snapshot = Buckler();

let root = path.join(process.cwd(), 'index.js');
let  = path.join(process.cwd(), 'path', 'to', 'file', 'index.js');

snapshot('root-slash-defaults.json', () => {
	return substitute(root, '/');
});

snapshot('root-slash-mapslashtofoo.json', () => {
	return substitute(root, '/', {
		'/': 'foo',
	});
});

snapshot('root-slashfoo-mapslashtobar.json', () => {
	return substitute(root, '/foo', {
		'/': 'bar',
	});
});

snapshot('pathfile-slash-mapslashtofoo.json', () => {
	return substitute(pathfile, '/', {
		'/': 'foo',
	});
});

snapshot('pathfile-slash-defaults.json', () => {
	return substitute(pathfile, '/');
});

snapshot('pathfile-slashfoo-mapslashtobar.json', () => {
	return substitute(pathfile, '/foo', {
		'/': 'bar',
	});
});

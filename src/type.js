export default object => {
	let type = Object.prototype.toString.call(object);
	let match = type.match(/\[object\s(.+)\]/);
	if (match) {
		return match[1];
	} else {
		return;
	}
};

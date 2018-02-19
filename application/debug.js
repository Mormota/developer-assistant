module.exports = debug = (message) => {
	console.log('\x1b[35m%s\x1b[0m', '[ Dev Tool ]', message);
}
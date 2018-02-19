module.exports = debug = (message) => {
	console.log(`%c[Dev Tool log]`, 'color: magenta; font-weight: bold;' ,`${message}`);
}
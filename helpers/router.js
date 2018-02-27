const router = (windows, route) => {
	windows.webContents.send('router', route);
	windows.show();
}

module.exports = router
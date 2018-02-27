const app = require('express')();

const serverPorts = require('./serverPorts')

let server = []

const liveServer = {
	start: (portPos, route) => {
		app.use((req, res) => res.sendFile('/Users/balazs/Documents/Github/developer-assitant/windows/mainWindow.html'))
		server[portPos] = app.listen(serverPorts[portPos])
		require('electron').shell.openExternal(`http://localhost:${serverPorts[portPos]}`)
	},
	stop: (port) => {
		if(serverPorts.indexOf(port) !== -1) {
			server[serverPorts.indexOf(port)].close()
		} else {
			server[port].close()
		}
	}
}

module.exports = liveServer